import { CONFIG } from 'src/config-global';

import { ProjectDashboardView } from 'src/sections/project-management/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`项目总览 - ${CONFIG.appName}`}</title>

      <ProjectDashboardView />
    </>
  );
}

