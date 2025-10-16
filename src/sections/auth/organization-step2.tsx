import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface OrganizationStep2Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function OrganizationStep2({
  formData,
  updateFormData,
  onNext,
  onBack,
}: OrganizationStep2Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = () => {
    // 这里可以添加表单验证逻辑
    onNext();
  };

  return (
    <Box>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="管理员姓名"
          value={formData.adminFullName}
          onChange={(e) => updateFormData('adminFullName', e.target.value)}
          required
        />

        <TextField
          fullWidth
          type="tel"
          label="管理员手机号"
          placeholder="用于短信验证"
          value={formData.adminPhone}
          onChange={(e) => updateFormData('adminPhone', e.target.value)}
          required
        />

        <TextField
          fullWidth
          type="email"
          label="管理员邮箱"
          placeholder="用于邮箱验证与通知"
          value={formData.adminEmail}
          onChange={(e) => updateFormData('adminEmail', e.target.value)}
          required
        />

        <TextField
          fullWidth
          label="管理员登录账号"
          value={formData.adminUsername}
          onChange={(e) => updateFormData('adminUsername', e.target.value)}
          required
        />

        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label="管理员密码"
          value={formData.adminPassword}
          onChange={(e) => updateFormData('adminPassword', e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          required
        />

        <TextField
          fullWidth
          type={showConfirmPassword ? 'text' : 'password'}
          label="确认密码"
          value={formData.adminConfirmPassword}
          onChange={(e) => updateFormData('adminConfirmPassword', e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          required
        />

        <Stack direction="row" spacing={2}>
          <Button fullWidth size="large" variant="outlined" color="inherit" onClick={onBack}>
            上一步
          </Button>
          <Button fullWidth size="large" variant="contained" color="inherit" onClick={handleNext}>
            下一步
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
