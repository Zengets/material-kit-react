import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ----------------------------------------------------------------------

interface OrganizationStep3Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function OrganizationStep3({ formData, updateFormData, onNext, onBack }: OrganizationStep3Props) {
  const [uploadedFiles, setUploadedFiles] = useState<{
    businessLicense: File | null;
    organizationCertificate: File | null;
    legalPersonId: File | null;
  }>({
    businessLicense: null,
    organizationCertificate: null,
    legalPersonId: null,
  });

  const handleFileUpload = (field: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [field]: file }));
    updateFormData(field, file);
  };

  const handleNext = () => {
    // 这里可以添加表单验证逻辑
    onNext();
  };

  const renderFileUpload = (field: string, label: string, description: string) => (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Button
          variant="outlined"
          component="label"
          fullWidth
        >
          选择文件
          <input
            type="file"
            hidden
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFileUpload(field, file);
              }
            }}
          />
        </Button>
        {uploadedFiles[field as keyof typeof uploadedFiles] && (
          <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
            已上传: {(uploadedFiles[field as keyof typeof uploadedFiles] as File)?.name}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          资质与证照上传
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          支持格式：PDF、JPG、PNG、DOC、DOCX，单文件最大10MB
        </Typography>

        {renderFileUpload(
          'businessLicense',
          '营业执照',
          '请上传有效的营业执照扫描件'
        )}

        {renderFileUpload(
          'organizationCertificate',
          '组织机构证书',
          '如学校办学许可证等机构资质证书'
        )}

        {renderFileUpload(
          'legalPersonId',
          '法人身份证件',
          '负责人身份证件扫描件（按需上传）'
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          * 上传文件将用于身份验证和资质审核，我们会严格保护您的隐私信息
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="inherit"
            onClick={onBack}
          >
            上一步
          </Button>
          <Button
            fullWidth
            size="large"
             color="inherit"
            variant="contained"
            onClick={handleNext}
          >
            下一步
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
