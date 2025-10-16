import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// ----------------------------------------------------------------------

interface OrganizationStep4Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function OrganizationStep4({ formData, updateFormData, onSubmit, onBack }: OrganizationStep4Props) {
  const handleSubmit = () => {
    // 这里可以添加表单验证逻辑
    onSubmit();
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel>预估用户量</InputLabel>
            <Select
              value={formData.expectedUsers}
              label="预估用户量"
              onChange={(e) => updateFormData('expectedUsers', e.target.value)}
            >
              <MenuItem value="1-10">1-10人</MenuItem>
              <MenuItem value="11-50">11-50人</MenuItem>
              <MenuItem value="51-100">51-100人</MenuItem>
              <MenuItem value="101-500">101-500人</MenuItem>
              <MenuItem value="501-1000">501-1000人</MenuItem>
              <MenuItem value="1000+">1000人以上</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="机构简介"
            placeholder="请简要介绍您的机构..."
            value={formData.serviceDescription}
            onChange={(e) => updateFormData('serviceDescription', e.target.value)}
            helperText="用于了解您的机构背景和服务内容"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="联系人"
            value={formData.contactPerson}
            onChange={(e) => updateFormData('contactPerson', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="联系人职务"
            value={formData.contactPosition}
            onChange={(e) => updateFormData('contactPosition', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack direction="row" spacing={2}>
            <Button fullWidth size="large" variant="outlined" color="inherit" onClick={onBack}>
              上一步
            </Button>
            <Button fullWidth size="large" variant="contained" color="inherit" onClick={handleSubmit}>
              提交注册
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
