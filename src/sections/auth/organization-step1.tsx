import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// ----------------------------------------------------------------------

interface OrganizationStep1Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
}

export function OrganizationStep1({ formData, updateFormData, onNext }: OrganizationStep1Props) {
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
            label="机构全称"
            value={formData.orgName}
            onChange={(e) => updateFormData('orgName', e.target.value)}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="机构简称"
            value={formData.orgShortName}
            onChange={(e) => updateFormData('orgShortName', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth required>
            <InputLabel>机构类型</InputLabel>
            <Select
              value={formData.orgType}
              label="机构类型"
              onChange={(e) => updateFormData('orgType', e.target.value)}
            >
              <MenuItem value="school">学校</MenuItem>
              <MenuItem value="enterprise">企事业</MenuItem>
              <MenuItem value="government">政府</MenuItem>
              <MenuItem value="social">社会机构</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="所属行业"
            value={formData.industry}
            onChange={(e) => updateFormData('industry', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="统一社会信用代码/组织机构代码"
            value={formData.creditCode}
            onChange={(e) => updateFormData('creditCode', e.target.value)}
            helperText="根据政策/地区要求填写"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="省份"
            value={formData.province}
            onChange={(e) => updateFormData('province', e.target.value)}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="城市"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="详细地址"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="官网地址"
            placeholder="https://example.com"
            value={formData.website}
            onChange={(e) => updateFormData('website', e.target.value)}
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
