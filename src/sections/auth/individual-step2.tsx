import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

interface IndividualStep2Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function IndividualStep2({ formData, updateFormData, onNext, onBack }: IndividualStep2Props) {
  const handleNext = () => {
    // 这里可以添加表单验证逻辑
    onNext();
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="姓名"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="身份证号/证件号"
            placeholder="仅在需要实名认证时填写"
            value={formData.idNumber}
            onChange={(e) => updateFormData('idNumber', e.target.value)}
            helperText="敏感信息，仅用于实名认证"
          />
        </Grid>

        {/* <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="所属机构"
            placeholder="可以搜索现有机构或填写'无'"
            value={formData.orgName}
            onChange={(e) => updateFormData('orgName', e.target.value)}
            helperText="自动联动机构管理员审批或加入机构"
          />
        </Grid> */}

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="职务/职位"
            value={formData.position}
            onChange={(e) => updateFormData('position', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="部门"
            value={formData.department}
            onChange={(e) => updateFormData('department', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="地址/地区"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack direction="row" spacing={2}>
            <Button fullWidth size="large" variant="outlined"  color="inherit" onClick={onBack}>
              上一步
            </Button>
            <Button fullWidth size="large" variant="contained"  color="inherit" onClick={handleNext}>
              下一步
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
