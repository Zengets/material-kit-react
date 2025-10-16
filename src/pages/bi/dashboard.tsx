import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type KPIMetric = {
  metricId: string;
  metricName: string;
  value: string;
  changeRate: number;
  updateTime: string;
  icon: 'solar:cart-3-bold' | 'solar:home-angle-bold-duotone' | 'solar:settings-bold-duotone' | 'solar:check-circle-bold' | 'solar:share-bold';
  color: 'primary' | 'info' | 'warning' | 'success' | 'error';
};

// Mock data
const mockKPIData: KPIMetric[] = [
  {
    metricId: '1',
    metricName: '项目总数',
    value: '156',
    changeRate: 12.5,
    updateTime: '2025-10-12',
    icon: 'solar:cart-3-bold',
    color: 'primary',
  },
  {
    metricId: '2',
    metricName: '培训总数',
    value: '2,345',
    changeRate: 8.3,
    updateTime: '2025-10-12',
    icon: 'solar:home-angle-bold-duotone',
    color: 'info',
  },
  {
    metricId: '3',
    metricName: '企业数量',
    value: '89',
    changeRate: -2.1,
    updateTime: '2025-10-12',
    icon: 'solar:settings-bold-duotone',
    color: 'warning',
  },
  {
    metricId: '4',
    metricName: '课程完成率',
    value: '87.6%',
    changeRate: 5.2,
    updateTime: '2025-10-12',
    icon: 'solar:check-circle-bold',
    color: 'success',
  },
  {
    metricId: '5',
    metricName: '满意度',
    value: '4.8',
    changeRate: 3.1,
    updateTime: '2025-10-12',
    icon: 'solar:share-bold',
    color: 'error',
  },
];

// ----------------------------------------------------------------------

export function BIDashboardPage() {
  const navigate = useNavigate();
  const [dimension, setDimension] = useState('all');

  const handleViewTrends = (metricId: string) => {
    navigate(`/bi/trends?metricId=${metricId}`);
  };

  return (
    <>
      <Helmet>
        <title>BI 总览 - BI 数据分析</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">BI 数据分析总览</Typography>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>数据维度</InputLabel>
            <Select
              value={dimension}
              label="数据维度"
              onChange={(e) => setDimension(e.target.value)}
            >
              <MenuItem value="all">全部</MenuItem>
              <MenuItem value="institution">按机构</MenuItem>
              <MenuItem value="enterprise">按企业</MenuItem>
              <MenuItem value="project">按项目</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* KPI 指标卡 */}
        <Grid container spacing={3} mb={5}>
          {mockKPIData.map((metric) => (
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={metric.metricId}>
              <Card
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[8],
                  },
                }}
                onClick={() => handleViewTrends(metric.metricId)}
              >
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: (theme) => (theme.palette[metric.color] as any)?.lighter || theme.palette.grey[200],
                      color: (theme) => (theme.palette[metric.color] as any)?.main || theme.palette.grey[800],
                    }}
                  >
                    <Iconify icon={metric.icon} width={28} />
                  </Box>

                  <Stack spacing={0.5}>
                    <Typography variant="h4">{metric.value}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {metric.metricName}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Iconify
                      icon={
                        metric.changeRate >= 0
                          ? 'eva:trending-up-fill'
                          : 'eva:trending-down-fill'
                      }
                      width={20}
                      sx={{
                        color: metric.changeRate >= 0 ? 'success.main' : 'error.main',
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: metric.changeRate >= 0 ? 'success.main' : 'error.main',
                      }}
                    >
                      {Math.abs(metric.changeRate)}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      vs 上期
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 操作按钮 */}
        <Stack direction="row" spacing={2} mb={3}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="eva:search-fill" />}
            onClick={() => navigate('/bi/trends')}
          >
            查看详细趋势
          </Button>
        </Stack>

        {/* 趋势图表区域 */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" mb={3}>
            数据趋势
          </Typography>
          <Box
            sx={{
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.neutral',
              borderRadius: 1,
            }}
          >
            <Stack alignItems="center" spacing={2}>
              <Iconify icon="solar:chart-2-bold-duotone" width={80} sx={{ color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">
                趋势图表区域（可集成 ECharts 或 Recharts）
              </Typography>
            </Stack>
          </Box>
        </Card>

        {/* 快捷入口 */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
              onClick={() => navigate('/bi/trends')}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                  }}
                >
                  <Iconify icon="solar:chart-2-bold-duotone" width={32} />
                </Box>
                <Box>
                  <Typography variant="h6">趋势分析</Typography>
                  <Typography variant="body2" color="text.secondary">
                    查看各项指标的变化趋势
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
              onClick={() => navigate('/bi/ranking')}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'warning.lighter',
                    color: 'warning.main',
                  }}
                >
                  <Iconify icon="solar:star-bold" width={32} />
                </Box>
                <Box>
                  <Typography variant="h6">绩效排名</Typography>
                  <Typography variant="body2" color="text.secondary">
                    查看各维度的绩效排名
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
              onClick={() => navigate('/bi/report')}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'success.lighter',
                    color: 'success.main',
                  }}
                >
                  <Iconify icon="solar:document-text-bold" width={32} />
                </Box>
                <Box>
                  <Typography variant="h6">数据报告</Typography>
                  <Typography variant="body2" color="text.secondary">
                    生成和下载数据报告
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </DashboardContent>
    </>
  );
}

export default function Page() {
  return <BIDashboardPage />;
}
