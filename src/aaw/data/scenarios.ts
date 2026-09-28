/**
 * Preview plans: what the Orchestrator does with a goal on this website.
 *
 * On the site there is no server and no live AI, so a goal is routed the way
 * the app's own demo server routes it (apps/api/scripts/demo.ts, `planFor`):
 * a few words decide which agents the goal reaches, and only those agents
 * work. Every agent named here exists in the app, at its real station.
 *
 * The results are sample results, written for the general case. The page says
 * so wherever one is shown. A real run, with live AI and the visitor's own
 * tools, starts after sign-up.
 *
 * The use cases section renders from this same list, so a goal shown there
 * and the same goal typed into the hero always tell the same story.
 */

export interface PreviewTask {
  id: string;
  title: string;
  agentKey: string;
  dependsOn: string[];
  /** Steps the agent reports while it works. */
  steps: string[];
}

export interface Scenario {
  id: string;
  match: RegExp;
  /** The Orchestrator's reading of the goal. */
  interpretation: string;
  tasks: PreviewTask[];
  /** Integrations these agents would use once connected. */
  tools: string[];
  /** The deliverable's name, shown as the saved result. */
  artifact: string;
  /** One line for the use cases section: what comes back. */
  outcome: string;
  /** The sample result, as the answer card shows it. */
  result: string;
}

const NO_TOOLS =
  'Preview run: no tools are connected on this website, so the agents worked from your goal alone.';

export const SCENARIOS: Scenario[] = [
  {
    id: 'launch',
    match: /product launch|launch plan|launch (a |an |our |my )?(new )?(product|app|feature)|go[- ]to[- ]market|\bgtm\b|new product/i,
    interpretation:
      'Research the market, shape the positioning and the creative direction, check the budget, then bring it together as one launch plan.',
    tasks: [
      { id: 't1', title: 'Research the market and competitors', agentKey: 'general', dependsOn: [], steps: ['Listing comparable products', 'Noting how each one is positioned'] },
      { id: 't2', title: 'Write the positioning', agentKey: 'marketing', dependsOn: ['t1'], steps: ['Choosing the audience', 'Writing the one-line promise'] },
      { id: 't3', title: 'Set the creative direction', agentKey: 'design', dependsOn: ['t2'], steps: ['Picking the hero message', 'Defining the visual style'] },
      { id: 't4', title: 'Draft the launch budget', agentKey: 'finance', dependsOn: ['t1'], steps: ['Splitting spend by channel', 'Setting a reserve'] },
    ],
    tools: ['slack', 'gmail', 'figma'],
    artifact: 'Launch plan',
    outcome: 'A launch plan: positioning, creative direction, budget and timeline.',
    result: `Launch plan ready.

Positioning
Lead with the one problem your product removes, for the audience that feels it most. Write it as a sentence a customer would repeat to a friend.

Creative direction
One hero message, one product shot, one proof point. Reuse them on the site, in the announcement and on social, so the launch reads as one moment.

Budget
Weight spend toward the first two weeks, when attention is highest, and keep a reserve for whichever channel shows early traction.

Timeline
Week 1: final message and assets. Week 2: brief the team and partners. Week 3: launch. Week 4: follow up and measure.

Needs you
Announcements and posts wait for your approval. Nothing goes out on its own.`,
  },
  {
    id: 'design-system',
    match: /design system|\bdesign\b|\bui\b|\bux\b|\bbrand\b|\blogo\b|prototype|figma|interface|wireframe/i,
    interpretation:
      'Define the foundations, specify the core components, then plan how the system moves into code.',
    tasks: [
      { id: 't1', title: 'Define the foundations', agentKey: 'design', dependsOn: [], steps: ['Setting colour roles and type scale', 'Choosing spacing and radius'] },
      { id: 't2', title: 'Specify the core components', agentKey: 'design', dependsOn: ['t1'], steps: ['Listing components and states'] },
      { id: 't3', title: 'Plan the handoff to code', agentKey: 'development', dependsOn: ['t2'], steps: ['Mapping tokens to variables', 'Ordering the build'] },
    ],
    tools: ['figma', 'github', 'slack'],
    artifact: 'Design system plan',
    outcome: 'Foundations, core components with states, and a handoff plan for code.',
    result: `Design system plan ready.

Foundations
Colour by role, not by name: background, surface, text, accent, success, warning, danger. One type scale with five sizes. Spacing on a 4 and 8 grid. One corner radius rule for controls and one for surfaces.

Core components
Button, input, select, checkbox, card, navigation, modal and toast. Each one with default, hover, focus, pressed, disabled, loading and error states.

Handoff
Tokens become variables, so design and code share one source of truth. Build foundations first, then the components the product uses most.

Needs you
A review of the foundations before components start, so every later decision rests on the right base.`,
  },
  {
    id: 'campaign',
    match: /campaign|marketing|audience|positioning|\bads\b|newsletter|social media|content plan/i,
    interpretation: 'Draft the campaign brief, then sketch the visual direction around it.',
    tasks: [
      { id: 't1', title: 'Draft the campaign brief', agentKey: 'marketing', dependsOn: [], steps: ['Choosing the audience', 'Writing the core message'] },
      { id: 't2', title: 'Sketch the visual direction', agentKey: 'design', dependsOn: ['t1'], steps: ['Picking one visual idea'] },
    ],
    tools: ['slack', 'gmail', 'meta'],
    artifact: 'Campaign brief',
    outcome: 'A campaign brief: audience, message, channels and how to measure it.',
    result: `Campaign brief ready.

Audience
One specific group, described by the problem they have rather than by demographics.

Message
One promise, one proof point, one call to action. Every asset repeats the same three.

Channels
Two channels you can run well, not five you run thinly. Start where the audience already spends time.

Measure
Pick the one number that says it worked before the campaign starts.

Needs you
Posts and emails wait for your approval before anything goes out.`,
  },
  {
    id: 'insights',
    match: /insights?|\busers?\b|customers?|feedback|survey|churn|retention/i,
    interpretation: 'Find what the conversations and the numbers say about your users.',
    tasks: [
      { id: 't1', title: 'Gather what customers are saying', agentKey: 'sales', dependsOn: [], steps: ['Grouping requests and complaints'] },
      { id: 't2', title: 'Check the numbers behind it', agentKey: 'finance', dependsOn: [], steps: ['Looking at the last month of signals'] },
    ],
    tools: ['gmail', 'slack'],
    artifact: 'User insights brief',
    outcome: 'The themes in what users say, checked against the numbers.',
    result: `User insights brief ready.

What to read
Customer email and support threads, sales call notes and the Slack channels where feedback lands.

What to look for
What people ask for most, where they get stuck, what they compare you with, and what makes them stay.

How it comes back
Five themes at most, each with how often it appears, two real quotes and the revenue it touches, so the loudest request is not mistaken for the biggest one.

Connect Gmail and Slack and the Sales Agent reads your real conversations instead of working from the goal alone.`,
  },
  {
    id: 'project',
    match: /(organi[sz]e|plan|manage|run) (a |my |our |this )?(side )?project|side project/i,
    interpretation: 'Break the project into milestones and list what it needs to succeed.',
    tasks: [
      { id: 't1', title: 'Break it into milestones', agentKey: 'operations', dependsOn: [], steps: ['Ordering the work', 'Setting checkpoints'] },
      { id: 't2', title: 'List what the project needs', agentKey: 'general', dependsOn: [], steps: ['Collecting tools, people and decisions'] },
    ],
    tools: ['google-calendar', 'notion'],
    artifact: 'Project plan',
    outcome: 'Milestones, owners and the decisions to make first.',
    result: `Project plan ready.

Milestones
1. Define done: one sentence on what finished looks like.
2. First usable version: the smallest thing you could show someone.
3. Feedback round: two or three people, one week.
4. Finish and share.

What it needs
The decisions that block everything else, the tools you will use, and one weekly check-in on your calendar.

Needs you
Adding the check-ins to your calendar asks you first.`,
  },
  {
    id: 'schedule',
    match: /schedule|calendar|inbox|e-?mails?|agenda|my week|meetings|organi[sz]e/i,
    interpretation: 'Review the inbox and the calendar, and flag what needs attention.',
    tasks: [
      { id: 't1', title: 'Review this week’s email', agentKey: 'operations', dependsOn: [], steps: ['Sorting what needs a reply'] },
      { id: 't2', title: 'Check the calendar', agentKey: 'operations', dependsOn: [], steps: ['Looking for clashes and gaps'] },
    ],
    tools: ['gmail', 'google-calendar'],
    artifact: 'Weekly plan',
    outcome: 'Replies to send, clashes to fix and focus time protected.',
    result: `Your week, organised.

First
Reply to what is waiting on you, oldest first. Anything that can wait gets a draft, not a reply.

Calendar
Fix clashes before they happen, keep two focus blocks of at least 90 minutes, and batch short calls into one afternoon.

Every day
Two short inbox passes, one before lunch and one before you stop.

Needs you
Moving or deleting an event always asks you first, every time.

Connect Gmail and Google Calendar and the Operations Agent works on your real week.`,
  },
  {
    id: 'sales',
    match: /sales|meeting with|call with|prospect|\blead\b|account|deal|pitch|client/i,
    interpretation: 'Research the company, then prepare a brief for the meeting.',
    tasks: [
      { id: 't1', title: 'Research the company', agentKey: 'general', dependsOn: [], steps: ['Summarising what they do'] },
      { id: 't2', title: 'Prepare the account brief', agentKey: 'sales', dependsOn: ['t1'], steps: ['Checking past conversations', 'Writing questions to ask'] },
    ],
    tools: ['gmail', 'google-calendar', 'salesforce'],
    artifact: 'Meeting brief',
    outcome: 'An account brief, questions to ask and a drafted follow-up.',
    result: `Meeting brief ready.

Goal of the meeting
One clear next step, agreed before the call ends.

What we know
What they do, who is joining, and every past conversation with them.

Questions to ask
What made this a priority now? What does success look like in three months? Who else needs to say yes?

After the call
A follow-up email is drafted. It is never sent without your approval.`,
  },
  {
    id: 'report',
    match: /report|operations|\bops\b|process|kpis?|metrics|dashboard|workflows?/i,
    interpretation: 'Collect this week’s updates and numbers, then write one report.',
    tasks: [
      { id: 't1', title: 'Collect this week’s updates', agentKey: 'operations', dependsOn: [], steps: ['Reading team updates'] },
      { id: 't2', title: 'Summarise the numbers', agentKey: 'finance', dependsOn: [], steps: ['Comparing with last week'] },
    ],
    tools: ['slack', 'gmail', 'airtable'],
    artifact: 'Operations report',
    outcome: 'Highlights, numbers, blockers and next week in one report.',
    result: `Operations report ready.

Highlights
The three things that moved this week, in one line each.

Numbers
Each figure with the period it covers and the change from last week. No number without a date range.

Blockers
What is stuck, what it costs to leave it, and who can clear it.

Next week
The top three priorities, each with an owner.

Needs you
Posting the report to Slack asks you first.`,
  },
  {
    id: 'hiring',
    match: /hir(e|ing)|onboard|interview|job (post|description)|recruit|candidate/i,
    interpretation: 'Write the role brief, then plan a fair interview loop.',
    tasks: [
      { id: 't1', title: 'Write the role brief', agentKey: 'hr', dependsOn: [], steps: ['Defining the outcomes for the role'] },
      { id: 't2', title: 'Plan the interview loop', agentKey: 'hr', dependsOn: ['t1'], steps: ['Choosing stages and scorecards'] },
    ],
    tools: ['gmail', 'google-calendar'],
    artifact: 'Hiring plan',
    outcome: 'A role brief and an interview loop with scorecards.',
    result: `Hiring plan ready.

Role brief
The three outcomes this person owns in their first six months, then the skills those outcomes need.

Interview loop
A short intro call, one practical exercise, a team conversation and a final chat. Every interviewer scores against the same written criteria.

Needs you
Invites to candidates wait for your approval.`,
  },
  {
    id: 'engineering',
    match: /\bcode\b|\bbug\b|\bapi\b|engineering|technical|deploy|architecture|refactor|release notes/i,
    interpretation: 'Research the options, then scope the technical work.',
    tasks: [
      { id: 't1', title: 'Research the options', agentKey: 'general', dependsOn: [], steps: ['Comparing approaches'] },
      { id: 't2', title: 'Scope the technical work', agentKey: 'development', dependsOn: ['t1'], steps: ['Breaking it into shippable pieces', 'Naming the risks'] },
    ],
    tools: ['github', 'linear', 'slack'],
    artifact: 'Technical brief',
    outcome: 'Options compared, work scoped and risks named.',
    result: `Technical brief ready.

Options
Two or three approaches, each with what it costs to build, to run and to undo.

Scope
The work broken into pieces that can ship on their own, smallest first.

Risks
What could break, how you would notice, and who can unblock it.

Needs you
The choice between options. The brief recommends one and says why.`,
  },
  {
    id: 'trip',
    match: /\btrip\b|travel|vacation|holiday|flights?|hotels?|itinerary/i,
    interpretation: 'Research the destination, estimate the budget, then draft an itinerary.',
    tasks: [
      { id: 't1', title: 'Research the destination', agentKey: 'general', dependsOn: [], steps: ['Checking seasons and areas to stay'] },
      { id: 't2', title: 'Estimate the budget', agentKey: 'finance', dependsOn: [], steps: ['Adding travel, stay and daily costs'] },
      { id: 't3', title: 'Draft the itinerary', agentKey: 'operations', dependsOn: ['t1'], steps: ['Grouping days by area'] },
    ],
    tools: ['google-calendar', 'gmail'],
    artifact: 'Trip plan',
    outcome: 'An itinerary, a budget and the bookings to confirm.',
    result: `Trip plan ready.

Itinerary
Days grouped by area so no day is spent crossing town. One slow day for every three busy ones.

Budget
Travel, stay, food and a buffer of about ten percent, per day and in total.

Bookings to confirm
Flights and the first two nights first. Anything that charges your card waits for your approval.`,
  },
  {
    id: 'purchase',
    match: /\bbuy\b|purchase|best .+ (for|under)|which .+ should i|laptop|\bphone\b|camera|\bcar\b/i,
    interpretation: 'Compare the options, then check the total cost of each.',
    tasks: [
      { id: 't1', title: 'Compare the options', agentKey: 'general', dependsOn: [], steps: ['Listing what matters for this purchase'] },
      { id: 't2', title: 'Check the total cost', agentKey: 'finance', dependsOn: ['t1'], steps: ['Adding running costs'] },
    ],
    tools: ['gmail'],
    artifact: 'Purchase comparison',
    outcome: 'Options compared on what matters, with the full cost of each.',
    result: `Purchase comparison ready.

What matters
The three things that decide this purchase for you, in order. Everything else is a tie-breaker.

Options
A short list of three, each scored on those three things.

Full cost
Price plus what it costs to run, repair and replace over the years you will own it.

Needs you
The final choice. Nothing is bought on your behalf.`,
  },
  {
    id: 'presentation',
    match: /presentation|\bdeck\b|slides|keynote|\btalk\b/i,
    interpretation: 'Outline the story, then set the look of the slides.',
    tasks: [
      { id: 't1', title: 'Outline the story', agentKey: 'general', dependsOn: [], steps: ['Finding the one message', 'Ordering the sections'] },
      { id: 't2', title: 'Set the slide style', agentKey: 'design', dependsOn: ['t1'], steps: ['Choosing type and layout rules'] },
    ],
    tools: ['google-drive', 'slack'],
    artifact: 'Presentation outline',
    outcome: 'A story outline and a simple slide style to build on.',
    result: `Presentation outline ready.

The one message
The sentence you want people to repeat afterwards. Every slide supports it or goes.

Outline
Why now, the problem, what changes, the proof, what you are asking for.

Slide style
One idea per slide, large type, one visual each, and the same layout for every section divider.`,
  },
  {
    id: 'research',
    match: /research|competitors?|market|compare|analy[sz]e|trends?|topic|learn about/i,
    interpretation: 'Research the topic, then compare what was found in one brief.',
    tasks: [
      { id: 't1', title: 'Research the topic', agentKey: 'general', dependsOn: [], steps: ['Collecting the main sources', 'Noting where they disagree'] },
      { id: 't2', title: 'Compare the findings', agentKey: 'marketing', dependsOn: ['t1'], steps: ['Putting them side by side'] },
    ],
    tools: ['slack', 'gmail', 'notion'],
    artifact: 'Research brief',
    outcome: 'A research brief: what was found, how it compares, what it means.',
    result: `Research brief ready.

What to compare
Who they serve, what they promise, how they charge, and where they are strong or thin.

What comes back
A side-by-side view, the three differences that matter most, and what it means for your next decision.

What your team knows
Connect Slack and Gmail and the agents add what your own team has already said about it.`,
  },
  {
    id: 'budget',
    match: /budget|revenue|spend|\bcosts?\b|pricing|financ|invoice|runway|forecast/i,
    interpretation: 'Build one budget view from the numbers you have.',
    tasks: [
      { id: 't1', title: 'Build the budget view', agentKey: 'finance', dependsOn: [], steps: ['Grouping spend by category', 'Checking the period each number covers'] },
    ],
    tools: ['gmail', 'airtable'],
    artifact: 'Budget view',
    outcome: 'One budget view with every number dated and explained.',
    result: `Budget view ready.

Structure
Income, fixed costs, variable costs and one-off costs, each for the same period.

Rules it follows
Every number shows the period it covers and where it came from. Gaps are named, never filled with a guess.

Needs you
Anything that moves money always asks you first. No setting turns that off.`,
  },
];

/** Anything without a specialist goes to the General Agent, as one task. */
export const GENERAL: Scenario = {
  id: 'general',
  match: /.^/,
  interpretation: 'Answer this directly. No specialist needed.',
  tasks: [{ id: 't1', title: 'Answer the question', agentKey: 'general', dependsOn: [], steps: ['Thinking it through'] }],
  tools: [],
  artifact: 'Answer',
  outcome: 'A direct answer from the General Agent.',
  result: `The General Agent took this one.

It needs no specialist, so the Orchestrator did not wake anyone else. That is how most small goals run: one agent, one answer, no noise.

In this preview the answer itself is not written by live AI. With a free account, the General Agent answers it for real, and uses your tools when it needs them.`,
};

export const PREVIEW_NOTE = NO_TOOLS;

/** The same routing for every goal, wherever it was typed. */
export function route(goal: string): Scenario {
  return SCENARIOS.find((s) => s.match.test(goal)) ?? GENERAL;
}

/** The goals the app suggests under its own command bar. */
export const SUGGESTIONS = [
  'Plan a product launch',
  'Find insights about our users',
  'Organize my schedule',
  'Create a design system',
];
