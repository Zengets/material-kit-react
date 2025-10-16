import type { WorkspacesPopoverProps } from './components/workspaces-popover';
import { getAssetUrl } from 'src/utils/get-asset-url';

// ----------------------------------------------------------------------

export const _workspaces: WorkspacesPopoverProps['data'] = [
  {
    id: 'team-1',
    name: 'Team 1',
    plan: 'Free',
    logo: getAssetUrl('assets/icons/workspaces/logo-1.webp'),
  },
  {
    id: 'team-2',
    name: 'Team 2',
    plan: 'Pro',
    logo: getAssetUrl('assets/icons/workspaces/logo-2.webp'),
  },
  {
    id: 'team-3',
    name: 'Team 3',
    plan: 'Pro',
    logo: getAssetUrl('assets/icons/workspaces/logo-3.webp'),
  },
];
