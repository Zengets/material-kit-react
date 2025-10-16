import { CONFIG } from 'src/config-global';

import { ProjectAnalyticsView } from 'src/sections/project-management/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`数据分析 - ${CONFIG.appName}`}</title>

      <ProjectAnalyticsView />
    </>
  );
}

