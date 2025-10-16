import { Helmet } from 'react-helmet-async';

import { _experts } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import { ExpertsView } from 'src/sections/training/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`讲师管理 - ${CONFIG.appName}`}</title>
      </Helmet>

      <ExpertsView experts={_experts} />
    </>
  );
}

