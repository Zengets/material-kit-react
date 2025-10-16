import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type TrendData = {
  metricId: string;
  metricName: string;
  currentValue: string;
  changeRate: string;
};

const mockMetrics = [
  { id: '1', name: '项目总数' },
  { id: '2', name: '培训总数' },
  { id: '3', name: '企业数量' },
  { id: '4', name: '课程完成率' },
  { id: '5', name: '满意度' },
];

const mockTrendData: TrendData = {
  metricId: '1',
  metricName: '项目总数',
  currentValue: '156',
  changeRate: '+12.5%',
};

// ----------------------------------------------------------------------

export function BITrendsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedMetric, setSelectedMetric] = useState('1');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [compareMode, setCompareMode] = useState<'yoy' | 'mom'>('yoy');

  useEffect(() => {
    const metricId = searchParams.get('metricId');
    if (metricId) {
      setSelectedMetric(metricId);
    }
  }, [searchParams]);

  const handleMetricChange = (event: any) => {
    setSelectedMetric(event.target.value);
  };

  const handleTimeRangeChange = (_event: React.MouseEvent<HTMLElement>, newValue: 'week' | 'month' | 'year' | null) => {
    if (newValue !== null) {
      setTimeRange(newValue);
    }
  };

  const handleCompareModeChange = (_event: React.MouseEvent<HTMLElement>, newValue: 'yoy' | 'mom' | null) => {
    if (newValue !== null) {
      setCompareMode(newValue);
    }
  };

  const currentMetric = mockMetrics.find((m) => m.id === selectedMetric) || mockMetrics[0];
  const { currentValue, changeRate } = mockTrendData;

  return (
    <>
      <Helmet>
        <title>趋势分析 - BI 数据分析</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="text"
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
              onClick={() => navigate('/bi/dashboard')}
            >
              返回总览
            </Button>
            <Typography variant="h4">趋势分析</Typography>
          </Stack>
        </Stack>

        <Card sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>选择指标</InputLabel>
                <Select value={selectedMetric} label="选择指标" onChange={handleMetricChange}>
                  {mockMetrics.map((metric) => (
                    <MenuItem key={metric.id} value={metric.id}>
                      {metric.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  时间区间
                </Typography>
                <ToggleButtonGroup
                  value={timeRange}
                  exclusive
                  onChange={handleTimeRangeChange}
                  size="small"
                  fullWidth
                >
                  <ToggleButton value="week">周</ToggleButton>
                  <ToggleButton value="month">月</ToggleButton>
                  <ToggleButton value="year">年</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  对比模式
                </Typography>
                <ToggleButtonGroup
                  value={compareMode}
                  exclusive
                  onChange={handleCompareModeChange}
                  size="small"
                  fullWidth
                >
                  <ToggleButton value="yoy">同比</ToggleButton>
                  <ToggleButton value="mom">环比</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Grid>
          </Grid>
        </Card>

        {/* 当前指标概览 */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">{currentMetric.name}</Typography>
            <Stack direction="row" alignItems="baseline" spacing={2}>
              <Typography variant="h3">{currentValue}</Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Iconify
                  icon={Number(changeRate) >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
                  width={24}
                  sx={{ color: Number(changeRate) >= 0 ? 'success.main' : 'error.main' }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: Number(changeRate) >= 0 ? 'success.main' : 'error.main',
                  }}
                >
                  {changeRate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {compareMode === 'yoy' ? '同比' : '环比'}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* 操作按钮 */}
        <Stack direction="row" spacing={2} mb={3}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Iconify icon="eva:download-fill" />}
          >
            导出数据
          </Button>
        </Stack>

        {/* 趋势图表 */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" mb={3}>
            趋势图
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
                趋势折线图区域（可集成 ECharts 或 Recharts）
              </Typography>
            </Stack>
          </Box>
        </Card>

        {/* 数据详情 */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" mb={3}>
            数据详情
          </Typography>
          <Stack spacing={2}>
            {[
              { period: '2025年10月', value: '156', change: '+12.5%', isPositive: true },
              { period: '2025年9月', value: '139', change: '+8.2%', isPositive: true },
              { period: '2025年8月', value: '128', change: '+5.1%', isPositive: true },
              { period: '2025年7月', value: '122', change: '-2.3%', isPositive: false },
              { period: '2025年6月', value: '125', change: '+10.5%', isPositive: true },
            ].map((item, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  p: 2,
                  bgcolor: 'background.neutral',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body1">{item.period}</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h6">{item.value}</Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Iconify
                      icon={item.isPositive ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
                      width={20}
                      sx={{ color: item.isPositive ? 'success.main' : 'error.main' }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: item.isPositive ? 'success.main' : 'error.main' }}
                    >
                      {item.change}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Card>
      </DashboardContent>
    </>
  );
}

export default function Page() {
  return <BITrendsPage />;
}
