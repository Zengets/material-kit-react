import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

import { useRouter } from 'src/routes/hooks';

import { IndividualStep1 } from './individual-step1';
import { IndividualStep2 } from './individual-step2';
import { IndividualStep3 } from './individual-step3';

// ----------------------------------------------------------------------

const steps = ['账号信息', '个人信息', '验证与协议'];

export function IndividualRegisterForm() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: 账号信息
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    inviteCode: '',

    // Step 2: 个人信息
    fullName: '',
    idNumber: '',
    organizationId: '',
    orgName: '',
    position: '',
    department: '',
    address: '',

    // Step 3: 验证与协议
    verificationMethod: 'email',
    termsAccepted: false,
    captcha: '',
  });

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleSubmit = useCallback(() => {
    // 这里处理注册提交逻辑
    console.log('注册数据:', formData);
    router.push('/sign-in');
  }, [formData, router]);

  const updateFormData = useCallback((field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <IndividualStep1
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <IndividualStep2
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <IndividualStep3
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{ p: 4, width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        sx={{
          mb: 4,
          '& .MuiStepIcon-root.Mui-completed': {
            color: 'black',
          },
          '& .MuiStepIcon-root.Mui-active': {
            color: 'black',
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent()}
    </Card>
  );
}
