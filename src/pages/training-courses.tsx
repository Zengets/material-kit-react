import { Helmet } from 'react-helmet-async';

import { _courses } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import { CoursesView } from 'src/sections/training/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`课程库 - ${CONFIG.appName}`}</title>
      </Helmet>

      <CoursesView courses={_courses} />
    </>
  );
}

