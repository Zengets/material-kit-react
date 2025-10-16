import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface IndividualStep1Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
}

export function IndividualStep1({ formData, updateFormData, onNext }: IndividualStep1Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = () => {
    // 这里可以添加表单验证逻辑
    onNext();
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="账号（登录名）"
            placeholder="4-32位字母/数字/下划线"
            value={formData.username}
            onChange={(e) => updateFormData('username', e.target.value)}
            helperText="字母/数字/下划线，长度4-32位"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="email"
            label="邮箱（用于验证/通知）"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            helperText="用于接收验证邮件和重要通知"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="tel"
            label="手机号（用于短信验证）"
            placeholder="请输入11位手机号"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            helperText="用于接收短信验证码"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="密码"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
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
            helperText="最小8位，包含大小写字母、数字、特殊字符中至少两类"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            label="确认密码"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
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
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="邀请码/合作码"
            placeholder="如有邀请码请填写"
            value={formData.inviteCode}
            onChange={(e) => updateFormData('inviteCode', e.target.value)}
            helperText="用于关联机构或获得特别权限"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button fullWidth size="large"  color="inherit" variant="contained" onClick={handleNext}>
            下一步
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
