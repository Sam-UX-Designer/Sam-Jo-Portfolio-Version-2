import { useSyncExternalStore } from 'react';

/**
 * The world state the island renders.
 *
 * A port of the app's own store (apps/web/lib/store.ts) with the same rule:
 * it is a projection of the event log and nothing else. There is no action
 * that sets an agent to `working`; the only way an agent changes state is
 * `apply(event)`. The app backs this with zustand; the site has no need for
 * the dependency, so this is the same reducer behind useSyncExternalStore.
 */

export type AgentState =
  | 'idle'
  | 'planning'
  | 'spawning'
  | 'working'
  | 'waiting'
  | 'needs_input'
  | 'completed'
  | 'error';

export type TaskState = 'pending' | 'blocked' | 'assigned' | 'running' | 'succeeded' | 'failed' | 'awaiting_approval' | 'cancelled';

interface Base {
  seq: number;
  goalId: string;
  at: string;
}

export type WorldEvent =
  | (Base & { type: 'goal.state_changed'; state: string; error: string | null })
  | (Base & {
      type: 'plan.created';
      interpretation: string;
      tasks: { taskId: string; title: string; agentKey: string; dependsOn: string[] }[];
    })
  | (Base & { type: 'task.state_changed'; taskId: string; state: TaskState; error: string | null })
  | (Base & {
      type: 'agent.state_changed';
      agentKey: string;
      taskId: string | null;
      state: AgentState;
      activity: string;
      error: string | null;
    })
  | (Base & {
      type: 'task.progress';
      taskId: string;
      agentKey: string;
      completedSteps: number;
      totalSteps: number | null;
      confidence: 'measured' | 'estimated';
      /** What the step was, in plain words. Part of the app's protocol too. */
      note: string | null;
    })
  | (Base & {
      type: 'tool.called';
      taskId: string;
      agentKey: string;
      toolId: string;
      summary: string;
      outcome: 'succeeded' | 'failed' | 'denied';
    })
  | (Base & {
      type: 'goal.completed';
      summary: string;
      artifacts: { artifactId: string; title: string; kind: string }[];
    });

export interface AgentView {
  key: string;
  state: AgentState;
  activity: string;
  taskId: string | null;
  error: string | null;
  since: number;
}

export interface TaskView {
  id: string;
  title: string;
  agentKey: string;
  state: TaskState;
  dependsOn: string[];
  completedSteps: number;
  totalSteps: number | null;
  confidence: 'measured' | 'estimated';
  /** The last step the agent reported. */
  note: string | null;
  error: string | null;
}

export interface ActivityEntry {
  seq: number;
  agentKey: string;
  toolId: string;
  summary: string;
  outcome: 'succeeded' | 'failed' | 'denied';
  at: string;
}

export interface RouteView {
  id: number;
  agentKey: string;
}

export interface WorldState {
  goalId: string | null;
  goalPrompt: string | null;
  goalState: string;
  goalError: string | null;
  interpretation: string | null;
  summary: string | null;
  agents: Record<string, AgentView>;
  tasks: Record<string, TaskView>;
  activity: ActivityEntry[];
  artifacts: { artifactId: string; title: string; kind: string }[];
  lastSeq: number;
  /** Which agent the detail panel is showing. Client-only, never from an event. */
  selectedAgent: string | null;
  /** Dispatches from the hub still being animated. */
  routes: RouteView[];
}

const idleAgent = (key: string): AgentView => ({
  key,
  state: 'idle',
  activity: 'Waiting for work',
  taskId: null,
  error: null,
  since: Date.now(),
});

const EMPTY: WorldState = {
  goalId: null,
  goalPrompt: null,
  goalState: 'submitted',
  goalError: null,
  interpretation: null,
  summary: null,
  agents: {},
  tasks: {},
  activity: [],
  artifacts: [],
  lastSeq: -1,
  selectedAgent: null,
  routes: [],
};

/** Agent states that mean "this one is doing something right now". */
export const ACTIVE_STATES: AgentState[] = ['planning', 'spawning', 'working'];

let state: WorldState = EMPTY;
let routeId = 0;
const listeners = new Set<() => void>();

const set = (next: WorldState) => {
  state = next;
  listeners.forEach((l) => l());
};

function reduce(current: WorldState, event: WorldEvent): WorldState {
  // Ordering is enforced here, once. A late frame is dropped, never applied.
  if (event.seq <= current.lastSeq) return current;
  const base = { ...current, lastSeq: event.seq };

  switch (event.type) {
    case 'goal.state_changed':
      return { ...base, goalState: event.state, goalError: event.error };

    case 'plan.created': {
      const tasks = { ...current.tasks };
      const agents = { ...current.agents };
      for (const task of event.tasks) {
        tasks[task.taskId] = {
          id: task.taskId,
          title: task.title,
          agentKey: task.agentKey,
          state: 'pending',
          dependsOn: task.dependsOn,
          completedSteps: 0,
          totalSteps: null,
          confidence: 'measured',
          note: null,
          error: null,
        };
        agents[task.agentKey] ??= idleAgent(task.agentKey);
      }
      return { ...base, interpretation: event.interpretation, tasks, agents };
    }

    case 'agent.state_changed': {
      const previous = current.agents[event.agentKey] ?? idleAgent(event.agentKey);
      // A dispatch to animate: only on the edge into an active state, and
      // never for the Orchestrator, which is the hub the line leaves from.
      const dispatched =
        event.agentKey !== 'orchestrator' &&
        ACTIVE_STATES.includes(event.state) &&
        !ACTIVE_STATES.includes(previous.state);
      return {
        ...base,
        routes: dispatched ? [...current.routes, { id: ++routeId, agentKey: event.agentKey }] : current.routes,
        agents: {
          ...current.agents,
          [event.agentKey]: {
            ...previous,
            state: event.state,
            activity: event.activity,
            taskId: event.taskId,
            error: event.error,
            since: previous.state === event.state ? previous.since : Date.parse(event.at),
          },
        },
      };
    }

    case 'task.state_changed': {
      const task = current.tasks[event.taskId];
      if (!task) return base;
      return { ...base, tasks: { ...current.tasks, [event.taskId]: { ...task, state: event.state, error: event.error } } };
    }

    case 'task.progress': {
      const task = current.tasks[event.taskId];
      if (!task) return base;
      return {
        ...base,
        tasks: {
          ...current.tasks,
          [event.taskId]: {
            ...task,
            completedSteps: event.completedSteps,
            totalSteps: event.totalSteps,
            confidence: event.confidence,
            note: event.note,
          },
        },
      };
    }

    case 'tool.called':
      return {
        ...base,
        activity: [
          {
            seq: event.seq,
            agentKey: event.agentKey,
            toolId: event.toolId,
            summary: event.summary,
            outcome: event.outcome,
            at: event.at,
          },
          ...current.activity,
        ].slice(0, 200),
      };

    case 'goal.completed':
      return { ...base, goalState: 'completed', summary: event.summary, artifacts: [...event.artifacts] };
  }
}

export const world = {
  get: () => state,
  apply: (event: WorldEvent) => set(reduce(state, event)),
  beginGoal: (goalId: string, prompt: string) => set({ ...EMPTY, goalId, goalPrompt: prompt, lastSeq: -1 }),
  clearRoute: (id: number) => set({ ...state, routes: state.routes.filter((r) => r.id !== id) }),
  selectAgent: (selectedAgent: string | null) => set({ ...state, selectedAgent }),
  reset: () => set({ ...EMPTY }),
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

/** Read one slice of the world. Re-renders only when that slice changes. */
export function useWorld<T>(selector: (s: WorldState) => T): T {
  return useSyncExternalStore(
    world.subscribe,
    () => selector(state),
    () => selector(state),
  );
}
