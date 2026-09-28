/**
 * The integration catalogue, as the app defines it.
 *
 * Source: Sam-UX-Designer/ai-agents-world, packages/shared/src/agents/
 * integrations.ts. `available` means Connect completes a real sign-in today;
 * `planned` means it is listed in the app but cannot be connected yet. The
 * site says exactly that and nothing more. Update both together.
 *
 * The repository has no brand logos for these yet (apps/web/public/tools is
 * empty), so this site shows the same lettermark tiles the app shows.
 */

export type IntegrationStatus = 'available' | 'planned';

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: IntegrationStatus;
}

export const INTEGRATIONS: Integration[] = [
  { id: 'gmail', name: 'Gmail', description: 'Send, read and manage emails.', category: 'Communication', status: 'available' },
  { id: 'google-calendar', name: 'Google Calendar', description: 'Manage your schedule and events.', category: 'Productivity', status: 'available' },
  { id: 'slack', name: 'Slack', description: 'Team communication and collaboration.', category: 'Communication', status: 'available' },
  { id: 'google-drive', name: 'Google Drive', description: 'Store and access files.', category: 'Storage', status: 'planned' },
  { id: 'notion', name: 'Notion', description: 'Read and write to your workspace.', category: 'Productivity', status: 'planned' },
  { id: 'figma', name: 'Figma', description: 'Create and manage design files.', category: 'Design', status: 'planned' },
  { id: 'github', name: 'GitHub', description: 'Manage repositories and code.', category: 'Development', status: 'planned' },
  { id: 'linear', name: 'Linear', description: 'Track and manage product issues.', category: 'Productivity', status: 'planned' },
  { id: 'meta', name: 'Meta', description: 'Manage ads and social media.', category: 'Marketing', status: 'planned' },
  { id: 'x', name: 'X', description: 'Post and manage content.', category: 'Marketing', status: 'planned' },
  { id: 'youtube', name: 'YouTube', description: 'Upload and manage videos.', category: 'Marketing', status: 'planned' },
  { id: 'hubspot', name: 'HubSpot', description: 'Manage CRM and marketing.', category: 'Marketing', status: 'planned' },
  { id: 'salesforce', name: 'Salesforce', description: 'Manage customer data.', category: 'Finance', status: 'planned' },
  { id: 'airtable', name: 'Airtable', description: 'Organize and manage data.', category: 'Productivity', status: 'planned' },
  { id: 'zapier', name: 'Zapier', description: 'Automate workflows between apps.', category: 'Other', status: 'planned' },
];

export const integrationById = (id: string) => INTEGRATIONS.find((i) => i.id === id);
