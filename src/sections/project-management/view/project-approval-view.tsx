import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ProjectApprovalView() {
  const [currentTab, setCurrentTab] = useState(0);

  const approvals = [
    {
      id: '1',
      title: '人工智能应用开发项目申请',
      applicant: '张三',
      company: '科技有限公司',
      type: '项目申请',
      status: 'pending',
      date: '2024-01-15',
    },
    {
      id: '2',
      title: '智能制造设备采购申请',
      applicant: '李四',
      company: '制造企业',
      type: '设备申请',
      status: 'pending',
      date: '2024-01-14',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待审核';
      case 'approved':
        return '已通过';
      case 'rejected':
        return '已驳回';
      default:
        return status;
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        审核中心
      </Typography>

      <Card sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          sx={{ px: 2, bgcolor: 'background.neutral' }}
        >
          <Tab label="待审核 (8)" />
          <Tab label="已通过 (156)" />
          <Tab label="已驳回 (12)" />
        </Tabs>
      </Card>

      <Grid container spacing={3}>
        {approvals.map((approval) => (
          <Grid size={{ xs: 12 }} key={approval.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                    }}
                  >
                    <Iconify icon="solar:pen-bold" width={28} />
                  </Avatar>

                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="h6">{approval.title}</Typography>
                      <Chip
                        label={getStatusText(approval.status)}
                        color={getStatusColor(approval.status)}
                        size="small"
                      />
                      <Chip label={approval.type} size="small" variant="outlined" />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <Iconify icon="solar:share-bold" width={16} sx={{ mr: 0.5 }} />
                        申请人：{approval.applicant}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Iconify icon="solar:bell-bing-bold-duotone" width={16} sx={{ mr: 0.5 }} />
                        企业：{approval.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Iconify icon="solar:clock-circle-outline" width={16} sx={{ mr: 0.5 }} />
                        申请时间：{approval.date}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<Iconify icon="solar:check-circle-bold" />}
                      >
                        通过
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<Iconify icon="mingcute:close-line" />}
                      >
                        驳回
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Iconify icon="solar:eye-bold" />}
                      >
                        查看详情
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
}

