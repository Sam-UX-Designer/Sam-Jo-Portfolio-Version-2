import { route, PREVIEW_NOTE, type PreviewTask, type Scenario } from '../data/scenarios';
import { world, type AgentState, type TaskState, type WorldEvent } from './store';

/**
 * The preview run.
 *
 * Emits the same events, in the same order, that the app's runtime emits for
 * a real goal (apps/api/src/runtime/orchestration.ts): the Orchestrator reads
 * the goal, a plan is created, agents are dispatched wave by wave as their
 * inputs are ready, each reports progress, and the Orchestrator puts the
 * results together. The island reacts to these events exactly as it does in
 * the app, because it is the same store and the same components.
 *
 * What differs is where the plan and the words come from: the routing in
 * data/scenarios.ts rather than live AI, and no tool calls, because a visitor
 * has connected no tools. The app does not offer an agent a tool that is not
 * connected, so none is shown being used.
 */

const PLANNING_MS = 2200;
const HANDOFF_MS = 450;
const STEP_MS = 1150;
const SYNTH_MS = 1700;

let timers: number[] = [];
let seq = 0;
let goalId = '';

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    timers.push(window.setTimeout(resolve, ms));
  });

type Emit = Omit<WorldEvent, 'seq' | 'goalId' | 'at'>;

function emit(event: Emit, forGoal: string) {
  // A run that was cleared or replaced stops talking to the world.
  if (forGoal !== goalId) return;
  world.apply({ ...event, seq: seq++, goalId: forGoal, at: new Date().toISOString() } as WorldEvent);
}

const agentState = (g: string, agentKey: string, taskId: string | null, state: AgentState, activity: string) =>
  emit({ type: 'agent.state_changed', agentKey, taskId, state, activity, error: null } as Emit, g);

const taskState = (g: string, taskId: string, state: TaskState) =>
  emit({ type: 'task.state_changed', taskId, state, error: null } as Emit, g);

/** Group tasks into waves: each wave holds tasks whose inputs are all ready. */
function waves(tasks: PreviewTask[]): PreviewTask[][] {
  const done = new Set<string>();
  const left = [...tasks];
  const out: PreviewTask[][] = [];
  while (left.length) {
    const ready = left.filter((t) => t.dependsOn.every((d) => done.has(d)));
    if (ready.length === 0) break;
    out.push(ready);
    ready.forEach((t) => {
      done.add(t.id);
      left.splice(left.indexOf(t), 1);
    });
  }
  return out;
}

async function runTask(g: string, task: PreviewTask) {
  agentState(g, task.agentKey, task.id, 'spawning', `Starting: ${task.title}`);
  taskState(g, task.id, 'assigned');
  await wait(HANDOFF_MS);

  agentState(g, task.agentKey, task.id, 'working', task.title);
  taskState(g, task.id, 'running');

  for (let i = 0; i < task.steps.length; i++) {
    await wait(STEP_MS);
    emit(
      {
        type: 'task.progress',
        taskId: task.id,
        agentKey: task.agentKey,
        completedSteps: i + 1,
        // Unknown ahead of time in the app, so never a percentage here either.
        totalSteps: null,
        confidence: 'measured',
        note: task.steps[i],
      } as Emit,
      g,
    );
  }
  await wait(STEP_MS * 0.6);

  taskState(g, task.id, 'succeeded');
  agentState(g, task.agentKey, task.id, 'completed', 'Finished');
}

/** Start a goal. Returns the scenario it was routed to. */
export function runPreview(prompt: string): Scenario {
  cancelPreview();
  const scenario = route(prompt);
  goalId = `preview-${Date.now()}`;
  seq = 0;
  const g = goalId;

  world.beginGoal(g, prompt);

  void (async () => {
    emit({ type: 'goal.state_changed', state: 'planning', error: null } as Emit, g);
    agentState(g, 'orchestrator', null, 'planning', 'Reading your goal');
    await wait(PLANNING_MS);

    emit(
      {
        type: 'plan.created',
        interpretation: scenario.interpretation,
        tasks: scenario.tasks.map((t) => ({ taskId: t.id, title: t.title, agentKey: t.agentKey, dependsOn: t.dependsOn })),
      } as Emit,
      g,
    );
    agentState(
      g,
      'orchestrator',
      null,
      'waiting',
      scenario.tasks.length === 1 ? 'Coordinating 1 task' : `Coordinating ${scenario.tasks.length} tasks`,
    );
    emit({ type: 'goal.state_changed', state: 'executing', error: null } as Emit, g);

    for (const wave of waves(scenario.tasks)) {
      // One agent with two tasks in the same wave works them one after the
      // other, as a single agent does; different agents work in parallel.
      const byAgent = new Map<string, PreviewTask[]>();
      wave.forEach((t) => byAgent.set(t.agentKey, [...(byAgent.get(t.agentKey) ?? []), t]));
      await Promise.all(
        [...byAgent.values()].map(async (list) => {
          for (const task of list) await runTask(g, task);
        }),
      );
    }

    emit({ type: 'goal.state_changed', state: 'synthesising', error: null } as Emit, g);
    agentState(g, 'orchestrator', null, 'working', 'Putting the results together');
    await wait(SYNTH_MS);

    agentState(g, 'orchestrator', null, 'completed', 'Done');
    emit(
      {
        type: 'goal.completed',
        summary: `${scenario.result}\n\n${PREVIEW_NOTE}`,
        artifacts: [{ artifactId: `${g}-result`, title: scenario.artifact, kind: 'report' }],
      } as Emit,
      g,
    );
  })();

  return scenario;
}

export function cancelPreview() {
  timers.forEach((t) => window.clearTimeout(t));
  timers = [];
  goalId = '';
}
