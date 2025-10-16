import { CONFIG } from 'src/config-global';

import { ProjectApprovalView } from 'src/sections/project-management/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`审核中心 - ${CONFIG.appName}`}</title>

      <ProjectApprovalView />
    </>
  );
}

