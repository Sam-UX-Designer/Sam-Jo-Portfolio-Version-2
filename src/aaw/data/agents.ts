/**
 * The agent roster, as the app defines it.
 *
 * Source: Sam-UX-Designer/ai-agents-world, packages/shared/src/agents/
 * registry.ts and tools.ts. Names, roles, colours, station positions and tool
 * lists are copied as they are there, so every agent on this site stands where
 * it stands in the product and can do what it can do in the product. Update
 * both together.
 *
 * Nothing on the page is hardcoded to this list: sections render whatever is
 * here, so a new agent added below shows up everywhere on its own.
 */

export type ToolEffect =
  | 'read'
  | 'analyse'
  | 'draft'
  | 'external_send'
  | 'external_write'
  | 'destructive'
  | 'financial';

export interface ToolSpec {
  id: string;
  label: string;
  effect: ToolEffect;
  /** The integration that provides it. */
  integration: string;
}

export const TOOLS: Record<string, ToolSpec> = {
  'gmail.search': { id: 'gmail.search', label: 'Search mail', effect: 'read', integration: 'gmail' },
  'gmail.read': { id: 'gmail.read', label: 'Read a message', effect: 'read', integration: 'gmail' },
  'gmail.draft': { id: 'gmail.draft', label: 'Draft a reply', effect: 'draft', integration: 'gmail' },
  'gmail.send': { id: 'gmail.send', label: 'Send mail', effect: 'external_send', integration: 'gmail' },
  'slack.list_channels': { id: 'slack.list_channels', label: 'List channels', effect: 'read', integration: 'slack' },
  'slack.read_messages': { id: 'slack.read_messages', label: 'Read a channel', effect: 'read', integration: 'slack' },
  'slack.summarise_thread': { id: 'slack.summarise_thread', label: 'Read a thread', effect: 'analyse', integration: 'slack' },
  'slack.post_message': { id: 'slack.post_message', label: 'Post to Slack', effect: 'external_send', integration: 'slack' },
  'gcal.list_events': { id: 'gcal.list_events', label: 'Check the calendar', effect: 'read', integration: 'google-calendar' },
  'gcal.find_free': { id: 'gcal.find_free', label: 'Find free time', effect: 'analyse', integration: 'google-calendar' },
  'gcal.create_event': { id: 'gcal.create_event', label: 'Create an event', effect: 'external_write', integration: 'google-calendar' },
  'gcal.delete_event': { id: 'gcal.delete_event', label: 'Delete an event', effect: 'destructive', integration: 'google-calendar' },
};

/** Reading, researching, analysing and drafting run without asking. */
export const isAutonomous = (effect: ToolEffect) =>
  effect === 'read' || effect === 'analyse' || effect === 'draft';

export interface Agent {
  key: string;
  name: string;
  role: string;
  /** First paragraph of the agent's standing instructions. */
  expertise: string;
  accent: string;
  /** The agent's station in the island artwork, as fractions of its size. */
  station: [number, number];
  /** The robot's box in the artwork's own pixels, where the artwork has one. */
  robot?: [number, number, number, number];
  toolIds: string[];
}

/** The island artwork's native size. Robot boxes are measured against it. */
export const ISLAND_ART = { width: 1672, height: 941 } as const;

export const ORCHESTRATOR: Agent = {
  key: 'orchestrator',
  name: 'Orchestrator',
  role: 'Understands your goal and coordinates the departments',
  expertise:
    'Turns one goal into a plan the department agents can run, then assembles their results into one answer. It plans, delegates and writes the final answer; it never calls tools itself.',
  accent: '#4DA3FF',
  station: [0.502, 0.332],
  toolIds: [],
};

export const DEPARTMENTS: Agent[] = [
  {
    key: 'hr',
    name: 'HR Agent',
    role: 'People, hiring and everything the team needs',
    expertise: 'Hiring, onboarding, leave, reviews and the questions employees are nervous to ask twice.',
    accent: '#F472B6',
    station: [0.31, 0.299],
    robot: [507, 233, 80, 104],
    toolIds: ['gmail.search', 'gmail.read', 'gmail.draft', 'gmail.send', 'gcal.list_events', 'gcal.find_free', 'gcal.create_event', 'slack.read_messages', 'slack.post_message'],
  },
  {
    key: 'finance',
    name: 'Finance Agent',
    role: 'Spend, revenue and the numbers behind them',
    expertise: 'Spend, revenue, invoices, runway and the reporting around them. Always shows its arithmetic and the period a number covers.',
    accent: '#34D399',
    station: [0.379, 0.619],
    robot: [600, 559, 56, 92],
    toolIds: ['gmail.search', 'gmail.read', 'gmail.draft', 'gcal.list_events', 'slack.read_messages'],
  },
  {
    key: 'marketing',
    name: 'Marketing Agent',
    role: 'Positioning, campaigns and the story',
    expertise: 'Positioning, campaigns, content and how the product is described to people who have never seen it.',
    accent: '#A78BFA',
    station: [0.258, 0.477],
    robot: [383, 420, 58, 76],
    toolIds: ['gmail.search', 'gmail.read', 'gmail.draft', 'gmail.send', 'slack.read_messages', 'slack.post_message'],
  },
  {
    key: 'sales',
    name: 'Sales Agent',
    role: 'Pipeline, deals and customer conversations',
    expertise: 'Pipeline, outreach, follow-ups and deal state. Leads with what needs action today.',
    accent: '#FB923C',
    station: [0.61, 0.266],
    robot: [1041, 209, 56, 94],
    toolIds: ['gmail.search', 'gmail.read', 'gmail.draft', 'gmail.send', 'gcal.list_events', 'gcal.find_free', 'gcal.create_event', 'slack.read_messages'],
  },
  {
    key: 'operations',
    name: 'Operations Agent',
    role: 'Process, logistics and keeping things running',
    expertise: 'Process, scheduling, vendors, logistics and the day-to-day mechanics of the business running.',
    accent: '#38BDF8',
    station: [0.636, 0.559],
    robot: [1086, 503, 56, 86],
    toolIds: ['gmail.search', 'gmail.read', 'gmail.draft', 'gmail.send', 'gcal.list_events', 'gcal.find_free', 'gcal.create_event', 'gcal.delete_event', 'slack.read_messages', 'slack.post_message'],
  },
  {
    key: 'general',
    name: 'General Agent',
    role: 'Questions, brainstorming and anything without a specialist',
    expertise: 'Questions, brainstorming, explanations, quick lookups, drafting, and small tasks that would be absurd to route through a department.',
    accent: '#60A5FA',
    station: [0.74, 0.266],
    toolIds: ['gmail.search', 'gmail.read', 'gmail.draft', 'slack.read_messages', 'slack.post_message'],
  },
  {
    key: 'development',
    name: 'Development Agent',
    role: 'Shipping, code and engineering delivery',
    expertise: 'What is being built, what is blocked, what shipped and what broke. Concrete about state.',
    accent: '#22D3EE',
    station: [0.69, 0.432],
    robot: [1110, 385, 48, 78],
    toolIds: ['gmail.search', 'gmail.read', 'slack.read_messages', 'slack.post_message', 'gcal.list_events'],
  },
  {
    key: 'design',
    name: 'Design Agent',
    role: 'Product design, UX and the interface',
    expertise: 'Flows, interface, usability and design system consistency. Separates what is broken from what is merely taste.',
    accent: '#F0ABFC',
    station: [0.788, 0.455],
    toolIds: ['gmail.search', 'gmail.read', 'gmail.draft', 'slack.read_messages', 'slack.post_message'],
  },
];

export const AGENTS: Agent[] = [ORCHESTRATOR, ...DEPARTMENTS];

export const agentByKey = (key: string) => AGENTS.find((a) => a.key === key);

/** The integrations an agent can reach, derived from its tools. */
export const integrationsOf = (agent: Agent) =>
  [...new Set(agent.toolIds.map((id) => TOOLS[id]?.integration).filter(Boolean))] as string[];

/** Where each agent's picture is. Design has none yet; it shows its initial. */
export const MASCOT_KEYS = new Set([
  'orchestrator',
  'hr',
  'finance',
  'marketing',
  'sales',
  'operations',
  'general',
  'development',
]);

export const mascotSrc = (key: string) => `/assets/ai-agents-world/mascots/${key}-256.webp`;
