import { Helmet } from 'react-helmet-async';

import { _myCourses } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import { MyLearningView } from 'src/sections/training/view';

// ----------------------------------------------------------------------

export default function Page() {
  const stats = {
    totalCourses: 6,
    completedCourses: 2,
    totalHours: 120,
    certificates: 2,
  };

  return (
    <>
      <Helmet>
        <title>{`我的学习 - ${CONFIG.appName}`}</title>
      </Helmet>

      <MyLearningView courses={_myCourses} stats={stats} />
    </>
  );
}

