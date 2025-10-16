import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { zhCN } from 'date-fns/locale/zh-CN';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { getAssetUrl } from 'src/utils/get-asset-url';

// ----------------------------------------------------------------------

type ApprovalTemplate = {
  id: string;
  name: string;
  approvers: string[];
  description: string;
};

type BookingConflict = {
  startTime: string;
  endTime: string;
  user: string;
};

const APPROVAL_TEMPLATES: ApprovalTemplate[] = [
  {
    id: 'T1',
    name: '标准审批流程',
    approvers: ['设备管理员', '实验室主任'],
    description: '适用于常规设备预约',
  },
  {
    id: 'T2',
    name: '快速审批流程',
    approvers: ['设备管理员'],
    description: '适用于短时间使用（<2小时）',
  },
  {
    id: 'T3',
    name: '高级审批流程',
    approvers: ['设备管理员', '实验室主任', '学院领导'],
    description: '适用于长期使用或特殊项目',
  },
];

const MOCK_DEVICE = {
  deviceId: 'DEV001',
  name: '高精度三维扫描仪',
  model: 'Artec Eva',
  location: { campus: '东校区', lab: '工程实验室A301' },
  image: getAssetUrl('assets/images/cover/cover-1.webp'),
};

const steps = ['填写预约信息', '选择审批流程', '确认提交'];

// ----------------------------------------------------------------------

export default function EquipmentBookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const deviceId = searchParams.get('deviceId') || 'DEV001';

  const [activeStep, setActiveStep] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [purpose, setPurpose] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('T1');
  const [conflicts, setConflicts] = useState<BookingConflict[]>([]);
  const [showConflictWarning, setShowConflictWarning] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const checkConflicts = useCallback(() => {
    // 模拟冲突检测
    if (startTime && endTime) {
      const mockConflicts: BookingConflict[] = [];
      
      // 模拟：如果选择的时间在工作日的10:00-12:00，会有冲突
      const hour = startTime.getHours();
      if (hour >= 10 && hour < 12) {
        mockConflicts.push({
          startTime: '2024-10-15 10:00',
          endTime: '2024-10-15 12:00',
          user: '李明',
        });
      }

      setConflicts(mockConflicts);
      setShowConflictWarning(mockConflicts.length > 0);
    }
  }, [startTime, endTime]);


  const handleNext = () => {
    if (activeStep === 0) {
      checkConflicts();
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log('提交预约申请:', {
      deviceId,
      startTime,
      endTime,
      purpose,
      template: selectedTemplate,
    });
    setSuccessDialogOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessDialogOpen(false);
    navigate('/equipment/usage');
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return startTime && endTime && purpose.trim() !== '' && !showConflictWarning;
      case 1:
        return selectedTemplate !== '';
      case 2:
        return true;
      default:
        return false;
    }
  };

  const renderDeviceInfo = (
    <Card sx={{ p: 3, mb: 3 }}>
      <Stack direction="row" spacing={2}>
        <Box
          component="img"
          src={MOCK_DEVICE.image}
          sx={{
            width: 120,
            height: 120,
            borderRadius: 2,
            objectFit: 'cover',
          }}
          onError={(e) => {
            e.currentTarget.src = getAssetUrl('assets/placeholder.svg');
          }}
        />
        <Stack spacing={1} flexGrow={1}>
          <Typography variant="h5">{MOCK_DEVICE.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            型号：{MOCK_DEVICE.model}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={"solar:map-point-bold" as any} width={16} sx={{ color: 'text.disabled' }} />
            <Typography variant="body2" color="text.secondary">
              {MOCK_DEVICE.location.campus} - {MOCK_DEVICE.location.lab}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );

  const renderStep1 = (
    <Stack spacing={3}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhCN}>
        <DateTimePicker
          label="开始时间"
          value={startTime}
          onChange={(newValue) => {
            setStartTime(newValue as Date | null);
            setShowConflictWarning(false);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
            },
          }}
        />

        <DateTimePicker
          label="结束时间"
          value={endTime}
          onChange={(newValue) => {
            setEndTime(newValue as Date | null);
            setShowConflictWarning(false);
          }}
          minDateTime={startTime || undefined}
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
            },
          }}
        />
      </LocalizationProvider>

      {startTime && endTime && (
        <Alert severity="info" icon={<Iconify icon={"solar:clock-circle-outline" as any} />}>
          预约时长：
          {Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))} 小时
        </Alert>
      )}

      {showConflictWarning && conflicts.length > 0 && (
        <Alert severity="warning">
          <Typography variant="subtitle2" gutterBottom>
            时间冲突警告
          </Typography>
          {conflicts.map((conflict, index) => (
            <Typography key={index} variant="body2">
              • {conflict.startTime} - {conflict.endTime} 已被 {conflict.user} 预约
            </Typography>
          ))}
          <Typography variant="body2" sx={{ mt: 1 }}>
            请选择其他时间段
          </Typography>
        </Alert>
      )}

      <TextField
        label="使用目的"
        multiline
        rows={4}
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        placeholder="请详细说明设备使用目的、项目背景等..."
        required
        fullWidth
      />

      <Button variant="outlined" startIcon={<Iconify icon={"solar:paperclip-outline" as any} />} fullWidth>
        上传附件（可选）
      </Button>
    </Stack>
  );

  const renderStep2 = (
    <Stack spacing={3}>
      <Alert severity="info">
        根据您的预约时长和设备类型，系统推荐使用以下审批流程
      </Alert>

      <FormControl fullWidth>
        <InputLabel>选择审批模板</InputLabel>
        <Select
          value={selectedTemplate}
          label="选择审批模板"
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          {APPROVAL_TEMPLATES.map((template) => (
            <MenuItem key={template.id} value={template.id}>
              {template.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {APPROVAL_TEMPLATES.map((template) => (
        <Card
          key={template.id}
          sx={{
            p: 3,
            cursor: 'pointer',
            border: (theme) =>
              selectedTemplate === template.id
                ? `2px solid ${theme.palette.primary.main}`
                : '2px solid transparent',
            '&:hover': {
              boxShadow: (theme) => theme.customShadows.z8,
            },
          }}
          onClick={() => setSelectedTemplate(template.id)}
        >
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">{template.name}</Typography>
              {selectedTemplate === template.id && (
                <Iconify icon={"solar:check-circle-bold" as any} color="primary.main" width={24} />
              )}
            </Stack>

            <Typography variant="body2" color="text.secondary">
              {template.description}
            </Typography>

            <Divider />

            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                审批流程
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {template.approvers.map((approver, index) => (
                  <Stack key={index} direction="row" alignItems="center" spacing={0.5}>
                    <Chip label={approver} size="small" color="primary" variant="outlined" />
                    {index < template.approvers.length - 1 && (
                      <Iconify icon={"solar:arrow-right-outline" as any} width={16} />
                    )}
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Card>
      ))}
    </Stack>
  );

  const renderStep3 = (
    <Stack spacing={3}>
      <Alert severity="success">
        请仔细核对预约信息，确认无误后提交
      </Alert>

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          预约信息确认
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              设备名称
            </Typography>
            <Typography variant="body2">{MOCK_DEVICE.name}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              开始时间
            </Typography>
            <Typography variant="body2">
              {startTime?.toLocaleString('zh-CN')}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              结束时间
            </Typography>
            <Typography variant="body2">
              {endTime?.toLocaleString('zh-CN')}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              使用时长
            </Typography>
            <Typography variant="body2">
              {startTime && endTime
                ? `${Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))} 小时`
                : '-'}
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              使用目的
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: '60%', textAlign: 'right' }}>
              {purpose}
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              审批流程
            </Typography>
            <Typography variant="body2">
              {APPROVAL_TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              审批人
            </Typography>
            <Stack spacing={0.5} alignItems="flex-end">
              {APPROVAL_TEMPLATES.find((t) => t.id === selectedTemplate)?.approvers.map(
                (approver, index) => (
                  <Typography key={index} variant="body2">
                    {index + 1}. {approver}
                  </Typography>
                )
              )}
            </Stack>
          </Stack>

        </Stack>
      </Card>

      <Alert severity="warning">
        <Typography variant="body2">
          • 预约提交后，将通过短信/邮件/站内消息通知您审批进度
        </Typography>
        <Typography variant="body2">
          • 请在预约时间前15分钟到达实验室
        </Typography>
        <Typography variant="body2">
          • 如需取消预约，请提前24小时申请
        </Typography>
      </Alert>
    </Stack>
  );

  return (
    <>
      <Helmet>
        <title>设备预约 - 设备共享平台</title>
      </Helmet>

      <DashboardContent maxWidth="md">
        <Button
          startIcon={<Iconify icon={"solar:arrow-left-bold" as any} />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          返回
        </Button>

        <Typography variant="h4" sx={{ mb: 3 }}>
          设备预约申请
        </Typography>

        {renderDeviceInfo}

        <Card sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ minHeight: 400 }}>
            {activeStep === 0 && renderStep1}
            {activeStep === 1 && renderStep2}
            {activeStep === 2 && renderStep3}
          </Box>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<Iconify icon={"solar:arrow-left-bold" as any} />}
            >
              上一步
            </Button>

            <Box sx={{ flexGrow: 1 }} />

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!isStepValid()}
                startIcon={<Iconify icon="eva:checkmark-fill" />}
              >
                提交预约
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid()}
                endIcon={<Iconify icon={"solar:arrow-right-bold" as any} />}
              >
                下一步
              </Button>
            )}
          </Stack>
        </Card>
      </DashboardContent>

      {/* 成功对话框 */}
      <Dialog open={successDialogOpen} onClose={handleSuccessClose}>
        <DialogContent sx={{ textAlign: 'center', py: 5 }}>
          <Iconify
            icon={"solar:check-circle-bold" as any}
            color="success.main"
            width={80}
            sx={{ mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            预约申请提交成功！
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            您的预约申请已提交，我们将尽快处理并通知您审批结果
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              预约编号：BK{Date.now().toString().slice(-8)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              您可以在&ldquo;使用记录&rdquo;页面查看审批进度
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button variant="outlined" onClick={() => navigate('/equipment/list')}>
            返回列表
          </Button>
          <Button variant="contained" onClick={handleSuccessClose}>
            查看我的预约
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

