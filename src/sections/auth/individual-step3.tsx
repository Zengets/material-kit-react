import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

// ----------------------------------------------------------------------

interface IndividualStep3Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function IndividualStep3({
  formData,
  updateFormData,
  onSubmit,
  onBack,
}: IndividualStep3Props) {
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = () => {
    // 这里可以添加表单验证逻辑
    onSubmit();
  };

  const handleSendCode = () => {
    // 这里处理发送验证码逻辑
    console.log(
      '发送验证码到:',
      formData.verificationMethod === 'email' ? formData.email : formData.phone
    );
  };

  return (
    <Box>
      <Stack spacing={3}>
        <FormControl component="fieldset">
          <FormLabel component="legend">验证方式</FormLabel>
          <RadioGroup
            value={formData.verificationMethod}
            onChange={(e) => updateFormData('verificationMethod', e.target.value)}
          >
            <FormControlLabel
              value="email"
              control={<Radio />}
              label={`邮箱验证 (${formData.email || '未填写'})`}
            />
            <FormControlLabel
              value="phone"
              control={<Radio />}
              label={`短信验证 (${formData.phone || '未填写'})`}
            />
          </RadioGroup>
        </FormControl>

        <Box>
          <Button
            variant="outlined"
            onClick={handleSendCode}
            disabled={!formData.email && !formData.phone}
          >
            发送验证码
          </Button>
          <TextField
            fullWidth
            label="验证码"
            placeholder="请输入6位验证码"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            sx={{ mt: 1 }}
          />
        </Box>

        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.termsAccepted}
                onChange={(e) => updateFormData('termsAccepted', e.target.checked)}
              />
            }
            label={
              <Typography variant="body2">
                我已阅读并同意
                <Link href="#" target="_blank">
                  《用户协议》
                </Link>
                和
                <Link href="#" target="_blank">
                  《隐私政策》
                </Link>
              </Typography>
            }
          />
        </Box>

        <Stack direction="row" spacing={2}>
          <Button fullWidth size="large" variant="outlined"  color="inherit" onClick={onBack}>
            上一步
          </Button>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="inherit"
            onClick={handleSubmit}
            disabled={!formData.termsAccepted}
          >
            完成注册
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
