import { useState, useCallback } from 'react';

import Step from '@mui/material/Step';
import Card from '@mui/material/Card';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

import { useRouter } from 'src/routes/hooks';

import { OrganizationStep1 } from './organization-step1';
import { OrganizationStep2 } from './organization-step2';
import { OrganizationStep3 } from './organization-step3';
import { OrganizationStep4 } from './organization-step4';

// ----------------------------------------------------------------------

const steps = ['机构信息', '管理员信息', '资质上传', '业务信息'];

export function OrganizationRegisterForm() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: 机构基本信息
    orgName: '',
    orgShortName: '',
    orgType: '',
    creditCode: '',
    industry: '',
    province: '',
    city: '',
    address: '',
    website: '',
    
    // Step 2: 管理员/联系人
    adminFullName: '',
    adminPhone: '',
    adminEmail: '',
    adminUsername: '',
    adminPassword: '',
    adminConfirmPassword: '',
    
    // Step 3: 资质与证照
    businessLicense: null,
    organizationCertificate: null,
    legalPersonId: null,
    
    // Step 4: 业务信息
    expectedUsers: '',
    serviceDescription: '',
    contactPerson: '',
    contactPosition: '',
  });

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleSubmit = useCallback(() => {
    // 这里处理注册提交逻辑
    console.log('机构注册数据:', formData);
    router.push('/sign-in');
  }, [formData, router]);

  const updateFormData = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <OrganizationStep1
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <OrganizationStep2
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <OrganizationStep3
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <OrganizationStep4
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
