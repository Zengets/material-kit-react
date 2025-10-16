import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Tabs,
  Tab,
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Divider,
  Alert,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type StorageType = 'local' | 'oss' | 's3';

type SystemSettings = {
  // 邮件配置
  emailHost: string;
  emailPort: number;
  emailUser: string;
  emailPassword: string;
  emailFrom: string;
  emailEnabled: boolean;

  // 短信配置
  smsProvider: string;
  smsApiKey: string;
  smsApiSecret: string;
  smsEnabled: boolean;

  // 文件存储
  storageType: StorageType;
  storageEndpoint: string;
  storageAccessKey: string;
  storageSecretKey: string;
  storageBucket: string;

  // 安全策略
  passwordMinLength: number;
  passwordRequireSpecialChar: boolean;
  passwordRequireNumber: boolean;
  passwordExpireDays: number;
  loginMaxAttempts: number;
  captchaEnabled: boolean;

  // 系统参数
  pageSize: number;
  uploadMaxSize: number;
  sessionTimeout: number;

  // 功能开关
  featureProjectManagement: boolean;
  featureWorkflow: boolean;
  featureBI: boolean;
  featureAIAssistant: boolean;
};

const defaultSettings: SystemSettings = {
  emailHost: 'smtp.example.com',
  emailPort: 587,
  emailUser: 'system@example.com',
  emailPassword: '',
  emailFrom: 'system@example.com',
  emailEnabled: true,

  smsProvider: '阿里云',
  smsApiKey: '',
  smsApiSecret: '',
  smsEnabled: false,

  storageType: 'local',
  storageEndpoint: '',
  storageAccessKey: '',
  storageSecretKey: '',
  storageBucket: '',

  passwordMinLength: 8,
  passwordRequireSpecialChar: true,
  passwordRequireNumber: true,
  passwordExpireDays: 90,
  loginMaxAttempts: 5,
  captchaEnabled: true,

  pageSize: 20,
  uploadMaxSize: 10,
  sessionTimeout: 30,

  featureProjectManagement: true,
  featureWorkflow: true,
  featureBI: true,
  featureAIAssistant: false,
};

// ----------------------------------------------------------------------

export default function SettingsPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    console.log('保存系统设置', settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  const handleTestEmail = () => {
    console.log('发送测试邮件');
    // 实际项目中这里会发送测试邮件
  };

  const handleTestSMS = () => {
    console.log('发送测试短信');
    // 实际项目中这里会发送测试短信
  };

  return (
    <>
      <Helmet>
        <title>系统设置 - 系统设置</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">系统基础设置</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={handleReset}>
              重置
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="solar:diskette-bold" />} onClick={handleSave}>
              保存设置
            </Button>
          </Stack>
        </Stack>

        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            系统设置保存成功！
          </Alert>
        )}

        <Card>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            sx={{ px: 3, pt: 3, borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="邮件服务" icon={<Iconify icon="solar:letter-bold" />} iconPosition="start" />
            <Tab label="短信服务" icon={<Iconify icon="solar:phone-bold" />} iconPosition="start" />
            <Tab label="文件存储" icon={<Iconify icon="solar:folder-bold" />} iconPosition="start" />
            <Tab label="安全策略" icon={<Iconify icon="solar:shield-check-bold" />} iconPosition="start" />
            <Tab label="系统参数" icon={<Iconify icon="solar:settings-bold" />} iconPosition="start" />
            <Tab label="功能开关" icon={<Iconify icon="solar:widget-bold" />} iconPosition="start" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* 邮件服务配置 */}
            {currentTab === 0 && (
              <Stack spacing={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailEnabled}
                      onChange={(e) => setSettings({ ...settings, emailEnabled: e.target.checked })}
                    />
                  }
                  label="启用邮件服务"
                />
                <TextField
                  label="SMTP服务器"
                  value={settings.emailHost}
                  onChange={(e) => setSettings({ ...settings, emailHost: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="端口"
                  type="number"
                  value={settings.emailPort}
                  onChange={(e) => setSettings({ ...settings, emailPort: Number(e.target.value) })}
                  fullWidth
                />
                <TextField
                  label="用户名"
                  value={settings.emailUser}
                  onChange={(e) => setSettings({ ...settings, emailUser: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="密码"
                  type="password"
                  value={settings.emailPassword}
                  onChange={(e) => setSettings({ ...settings, emailPassword: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="发件人地址"
                  value={settings.emailFrom}
                  onChange={(e) => setSettings({ ...settings, emailFrom: e.target.value })}
                  fullWidth
                />
                <Button variant="outlined" startIcon={<Iconify icon="solar:letter-bold" />} onClick={handleTestEmail}>
                  发送测试邮件
                </Button>
              </Stack>
            )}

            {/* 短信服务配置 */}
            {currentTab === 1 && (
              <Stack spacing={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.smsEnabled}
                      onChange={(e) => setSettings({ ...settings, smsEnabled: e.target.checked })}
                    />
                  }
                  label="启用短信服务"
                />
                <FormControl fullWidth>
                  <InputLabel>短信服务商</InputLabel>
                  <Select
                    value={settings.smsProvider}
                    label="短信服务商"
                    onChange={(e) => setSettings({ ...settings, smsProvider: e.target.value })}
                  >
                    <MenuItem value="阿里云">阿里云</MenuItem>
                    <MenuItem value="腾讯云">腾讯云</MenuItem>
                    <MenuItem value="华为云">华为云</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="API Key"
                  value={settings.smsApiKey}
                  onChange={(e) => setSettings({ ...settings, smsApiKey: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="API Secret"
                  type="password"
                  value={settings.smsApiSecret}
                  onChange={(e) => setSettings({ ...settings, smsApiSecret: e.target.value })}
                  fullWidth
                />
                <Button variant="outlined" startIcon={<Iconify icon="solar:phone-bold" />} onClick={handleTestSMS}>
                  发送测试短信
                </Button>
              </Stack>
            )}

            {/* 文件存储配置 */}
            {currentTab === 2 && (
              <Stack spacing={3}>
                <FormControl fullWidth>
                  <InputLabel>存储类型</InputLabel>
                  <Select
                    value={settings.storageType}
                    label="存储类型"
                    onChange={(e) => setSettings({ ...settings, storageType: e.target.value as StorageType })}
                  >
                    <MenuItem value="local">本地存储</MenuItem>
                    <MenuItem value="oss">阿里云OSS</MenuItem>
                    <MenuItem value="s3">AWS S3</MenuItem>
                  </Select>
                </FormControl>

                {settings.storageType !== 'local' && (
                  <>
                    <TextField
                      label="Endpoint"
                      value={settings.storageEndpoint}
                      onChange={(e) => setSettings({ ...settings, storageEndpoint: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Access Key"
                      value={settings.storageAccessKey}
                      onChange={(e) => setSettings({ ...settings, storageAccessKey: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Secret Key"
                      type="password"
                      value={settings.storageSecretKey}
                      onChange={(e) => setSettings({ ...settings, storageSecretKey: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Bucket"
                      value={settings.storageBucket}
                      onChange={(e) => setSettings({ ...settings, storageBucket: e.target.value })}
                      fullWidth
                    />
                  </>
                )}
              </Stack>
            )}

            {/* 安全策略 */}
            {currentTab === 3 && (
              <Stack spacing={3}>
                <Typography variant="subtitle2">密码策略</Typography>
                <TextField
                  label="密码最小长度"
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => setSettings({ ...settings, passwordMinLength: Number(e.target.value) })}
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.passwordRequireSpecialChar}
                      onChange={(e) => setSettings({ ...settings, passwordRequireSpecialChar: e.target.checked })}
                    />
                  }
                  label="要求包含特殊字符"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.passwordRequireNumber}
                      onChange={(e) => setSettings({ ...settings, passwordRequireNumber: e.target.checked })}
                    />
                  }
                  label="要求包含数字"
                />
                <TextField
                  label="密码过期天数"
                  type="number"
                  value={settings.passwordExpireDays}
                  onChange={(e) => setSettings({ ...settings, passwordExpireDays: Number(e.target.value) })}
                  fullWidth
                  helperText="0 表示永不过期"
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2">登录安全</Typography>
                <TextField
                  label="最大登录失败次数"
                  type="number"
                  value={settings.loginMaxAttempts}
                  onChange={(e) => setSettings({ ...settings, loginMaxAttempts: Number(e.target.value) })}
                  fullWidth
                  helperText="超过此次数将锁定账号"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.captchaEnabled}
                      onChange={(e) => setSettings({ ...settings, captchaEnabled: e.target.checked })}
                    />
                  }
                  label="启用验证码"
                />
              </Stack>
            )}

            {/* 系统参数 */}
            {currentTab === 4 && (
              <Stack spacing={3}>
                <TextField
                  label="默认分页大小"
                  type="number"
                  value={settings.pageSize}
                  onChange={(e) => setSettings({ ...settings, pageSize: Number(e.target.value) })}
                  fullWidth
                />
                <TextField
                  label="上传文件大小限制 (MB)"
                  type="number"
                  value={settings.uploadMaxSize}
                  onChange={(e) => setSettings({ ...settings, uploadMaxSize: Number(e.target.value) })}
                  fullWidth
                />
                <TextField
                  label="会话超时时间 (分钟)"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: Number(e.target.value) })}
                  fullWidth
                />
              </Stack>
            )}

            {/* 功能开关 */}
            {currentTab === 5 && (
              <Stack spacing={3}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  通过功能开关可以快速启用或禁用特定模块功能
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.featureProjectManagement}
                      onChange={(e) => setSettings({ ...settings, featureProjectManagement: e.target.checked })}
                    />
                  }
                  label={
                    <Stack>
                      <Typography variant="subtitle2">项目管理模块</Typography>
                      <Typography variant="caption" color="text.secondary">
                        包括项目列表、协作、审批等功能
                      </Typography>
                    </Stack>
                  }
                />
                <Divider />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.featureWorkflow}
                      onChange={(e) => setSettings({ ...settings, featureWorkflow: e.target.checked })}
                    />
                  }
                  label={
                    <Stack>
                      <Typography variant="subtitle2">工作流模块</Typography>
                      <Typography variant="caption" color="text.secondary">
                        包括流程设计器、审批流程等功能
                      </Typography>
                    </Stack>
                  }
                />
                <Divider />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.featureBI}
                      onChange={(e) => setSettings({ ...settings, featureBI: e.target.checked })}
                    />
                  }
                  label={
                    <Stack>
                      <Typography variant="subtitle2">BI数据分析模块</Typography>
                      <Typography variant="caption" color="text.secondary">
                        包括数据趋势、排名、报告等功能
                      </Typography>
                    </Stack>
                  }
                />
                <Divider />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.featureAIAssistant}
                      onChange={(e) => setSettings({ ...settings, featureAIAssistant: e.target.checked })}
                    />
                  }
                  label={
                    <Stack>
                      <Typography variant="subtitle2">AI智能助手</Typography>
                      <Typography variant="caption" color="text.secondary">
                        启用AI智能客服和智能推荐功能
                      </Typography>
                    </Stack>
                  }
                />
              </Stack>
            )}
          </Box>
        </Card>
      </Container>
    </>
  );
}

