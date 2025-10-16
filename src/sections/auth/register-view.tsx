import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

import { IndividualRegisterForm } from './individual-register-form';
import { OrganizationRegisterForm } from './organization-register-form';

// ----------------------------------------------------------------------

type RegisterType = 'individual' | 'organization';

interface RegisterViewProps {
  type: RegisterType;
}

export function RegisterView({ type }: RegisterViewProps) {
  const router = useRouter();
  const [registerType, setRegisterType] = useState<RegisterType>(type);

  const handleBackToSignIn = useCallback(() => {
    router.push('/sign-in');
  }, [router]);

  const renderTypeSelector = (
    <Card sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        选择注册类型
      </Typography>

      <Stack spacing={2} direction="row">
        <Button
          fullWidth
          variant={registerType === 'individual' ? 'contained' : 'outlined'}
          color="inherit"
          onClick={() => setRegisterType('individual')}
          startIcon={<Iconify icon="solar:shield-keyhole-bold-duotone" />}
        >
          个人用户注册
        </Button>

        <Button
          fullWidth
          color="inherit"
          variant={registerType === 'organization' ? 'contained' : 'outlined'}
          onClick={() => setRegisterType('organization')}
          startIcon={<Iconify icon="solar:home-angle-bold-duotone" />}
        >
          机构/单位注册
        </Button>
      </Stack>
    </Card>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">注册账号</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          已有账号？
          <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={handleBackToSignIn}>
            立即登录
          </Link>
        </Typography>
      </Box>

      {renderTypeSelector}

      {registerType === 'individual' ? <IndividualRegisterForm /> : <OrganizationRegisterForm />}
    </>
  );
}
