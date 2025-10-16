import { CONFIG } from 'src/config-global';

import { ProjectCollaborationView } from 'src/sections/project-management/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`项目协作 - ${CONFIG.appName}`}</title>

      <ProjectCollaborationView />
    </>
  );
}

