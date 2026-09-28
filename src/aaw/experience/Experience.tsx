import { useCallback, useEffect, useRef, useState } from 'react';
import { ActiveAgents, CommandBar, TaskInProgress, World } from './World';
import Chrome from './Chrome';
import { AgentPanel, Answer, TaskDetail } from './Panels';
import Gate, { type GateReason } from './Gate';
import { cancelPreview } from './engine';
import { useWorld, world } from './store';

/**
 * The AI Agents World Home screen, live, as the hero.
 *
 * Laid out like the app's Home page (apps/web/app/world/page.tsx): the island
 * as the environment, the chrome floating over it, the working agents or the
 * one you asked about on the right, and the answer and the command bar as one
 * column at the bottom.
 */
export default function Experience({ className = '' }: { className?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [taskOpen, setTaskOpen] = useState(false);
  const [gate, setGate] = useState<GateReason | null>(null);
  const selected = useWorld((s) => s.selectedAgent);
  const goalId = useWorld((s) => s.goalId);
  const goalState = useWorld((s) => s.goalState);
  const running = goalId !== null && goalState !== 'completed';

  useEffect(
    () => () => {
      cancelPreview();
      world.reset();
    },
    [],
  );

  // Clearing the answer closes the detail that was about it.
  useEffect(() => {
    if (!goalId) setTaskOpen(false);
  }, [goalId]);

  const onNext = useCallback(() => setGate(running ? 'running' : 'next'), [running]);
  const onGate = useCallback((reason: 'save' | 'rename') => setGate(reason), []);
  const closeGate = useCallback(() => setGate(null), []);

  return (
    <div ref={stage} className={`aw-ui aw-stage relative overflow-hidden bg-[#04070D] ${className}`}>
      <World stage={stage} />
      <Chrome />

      {selected ? (
        <div className="agent-dock">
          <AgentPanel onGate={onGate} />
        </div>
      ) : (
        <ActiveAgents />
      )}

      {taskOpen && <TaskDetail onClose={() => setTaskOpen(false)} />}

      <div className="composer">
        <TaskInProgress onOpen={() => setTaskOpen((o) => !o)} />
        <Answer onGate={onGate} />
        <CommandBar onGate={onNext} />
      </div>

      {gate && <Gate reason={gate} onClose={closeGate} />}
    </div>
  );
}
