import { CONFIG } from 'src/config-global';

import { ProjectListView } from 'src/sections/project-management/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`项目列表 - ${CONFIG.appName}`}</title>

      <ProjectListView />
    </>
  );
}

