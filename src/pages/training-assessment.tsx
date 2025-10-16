import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { _exams, _certificates } from 'src/_mock';

import { AssessmentView } from 'src/sections/training/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`考核与证书 - ${CONFIG.appName}`}</title>
      </Helmet>

      <AssessmentView exams={_exams} certificates={_certificates} />
    </>
  );
}

