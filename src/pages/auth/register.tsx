import { useSearchParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { RegisterView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function Page() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'individual';

  return (
    <>
      <title>{`注册 - ${CONFIG.appName}`}</title>

      <RegisterView type={type as 'individual' | 'organization'} />
    </>
  );
}
