import { CONFIG } from 'src/config-global';

import { SignInView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`登录 - ${CONFIG.appName}`}</title>

      <SignInView />
    </>
  );
}
