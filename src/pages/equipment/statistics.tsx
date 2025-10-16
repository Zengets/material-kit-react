import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type DeviceUtilization = {
  deviceId: string;
  deviceName: string;
  totalHours: number;
  usedHours: number;
  utilizationRate: number;
  bookingCount: number;
  avgRating: number;
};

type DepartmentStats = {
  department: string;
  bookingCount: number;
  totalHours: number;
};

type TimeStats = {
  date: string;
  bookingCount: number;
  usageHours: number;
};

const MOCK_DEVICE_UTILIZATION: DeviceUtilization[] = [
  {
    deviceId: 'DEV001',
    deviceName: '高精度三维扫描仪',
    totalHours: 720,
    usedHours: 612,
    utilizationRate: 85,
    bookingCount: 156,
    avgRating: 4.8,
  },
  {
    deviceId: 'DEV002',
    deviceName: '电子显微镜',
    totalHours: 744,
    usedHours: 670,
    utilizationRate: 90,
    bookingCount: 203,
    avgRating: 4.9,
  },
  {
    deviceId: 'DEV003',
    deviceName: '激光切割机',
    totalHours: 600,
    usedHours: 450,
    utilizationRate: 75,
    bookingCount: 128,
    avgRating: 4.6,
  },
  {
    deviceId: 'DEV004',
    deviceName: '高性能计算集群',
    totalHours: 744,
    usedHours: 700,
    utilizationRate: 94,
    bookingCount: 89,
    avgRating: 4.7,
  },
  {
    deviceId: 'DEV005',
    deviceName: '光谱分析仪',
    totalHours: 480,
    usedHours: 288,
    utilizationRate: 60,
    bookingCount: 72,
    avgRating: 4.5,
  },
  {
    deviceId: 'DEV006',
    deviceName: '3D打印机',
    totalHours: 660,
    usedHours: 528,
    utilizationRate: 80,
    bookingCount: 145,
    avgRating: 4.7,
  },
];

const MOCK_DEPARTMENT_STATS: DepartmentStats[] = [
  {
    department: '机械工程学院',
    bookingCount: 245,
    totalHours: 856,
  },
  {
    department: '材料科学学院',
    bookingCount: 189,
    totalHours: 672,
  },
  {
    department: '计算机学院',
    bookingCount: 156,
    totalHours: 1248,
  },
  {
    department: '化学学院',
    bookingCount: 134,
    totalHours: 536,
  },
  {
    department: '工业设计系',
    bookingCount: 98,
    totalHours: 392,
  },
];

const MOCK_TIME_STATS: TimeStats[] = [
  { date: '10-01', bookingCount: 45, usageHours: 180 },
  { date: '10-02', bookingCount: 52, usageHours: 208 },
  { date: '10-03', bookingCount: 48, usageHours: 192 },
  { date: '10-04', bookingCount: 38, usageHours: 152 },
  { date: '10-05', bookingCount: 42, usageHours: 168 },
  { date: '10-06', bookingCount: 35, usageHours: 140 },
  { date: '10-07', bookingCount: 28, usageHours: 112 },
  { date: '10-08', bookingCount: 50, usageHours: 200 },
  { date: '10-09', bookingCount: 55, usageHours: 220 },
  { date: '10-10', bookingCount: 48, usageHours: 192 },
];

// ----------------------------------------------------------------------

export default function EquipmentStatisticsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [sortBy, setSortBy] = useState('utilizationRate');

  const handleExport = () => {
    console.log('导出报表');
    // TODO: 实现导出功能
  };

  const sortedDevices = [...MOCK_DEVICE_UTILIZATION].sort((a, b) => {
    if (sortBy === 'utilizationRate') return b.utilizationRate - a.utilizationRate;
    if (sortBy === 'bookingCount') return b.bookingCount - a.bookingCount;
    if (sortBy === 'avgRating') return b.avgRating - a.avgRating;
    return 0;
  });

  const totalBookings = MOCK_DEVICE_UTILIZATION.reduce((sum, d) => sum + d.bookingCount, 0);
  const totalUsedHours = MOCK_DEVICE_UTILIZATION.reduce((sum, d) => sum + d.usedHours, 0);
  const avgUtilization =
    MOCK_DEVICE_UTILIZATION.reduce((sum, d) => sum + d.utilizationRate, 0) /
    MOCK_DEVICE_UTILIZATION.length;
  const avgRating =
    MOCK_DEVICE_UTILIZATION.reduce((sum, d) => sum + d.avgRating, 0) /
    MOCK_DEVICE_UTILIZATION.length;

  const renderSummaryCards = (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: 'primary.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon={"solar:calendar-outline" as any} width={32} sx={{ color: 'primary.main' }} />
            </Box>
            <Box>
              <Typography variant="h4">{totalBookings}</Typography>
              <Typography variant="body2" color="text.secondary">
                总预约次数
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: 'success.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon={"solar:clock-circle-outline" as any} width={32} sx={{ color: 'success.main' }} />
            </Box>
            <Box>
              <Typography variant="h4">{totalUsedHours}</Typography>
              <Typography variant="body2" color="text.secondary">
                总使用时长（小时）
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: 'warning.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon={"solar:chart-outline" as any} width={32} sx={{ color: 'warning.main' }} />
            </Box>
            <Box>
              <Typography variant="h4">{avgUtilization.toFixed(1)}%</Typography>
              <Typography variant="body2" color="text.secondary">
                平均利用率
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: 'info.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon={"solar:star-outline" as any} width={32} sx={{ color: 'info.main' }} />
            </Box>
            <Box>
              <Typography variant="h4">{avgRating.toFixed(1)}</Typography>
              <Typography variant="body2" color="text.secondary">
                平均满意度
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );

  const renderDeviceUtilization = (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h6">设备利用率统计</Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>排序方式</InputLabel>
          <Select value={sortBy} label="排序方式" onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="utilizationRate">按利用率</MenuItem>
            <MenuItem value="bookingCount">按预约次数</MenuItem>
            <MenuItem value="avgRating">按满意度</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack spacing={3}>
        {sortedDevices.map((device) => (
          <Box key={device.deviceId}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" fontWeight="medium">
                {device.deviceName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {device.utilizationRate}%
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={device.utilizationRate}
              sx={{
                height: 8,
                borderRadius: 1,
                mb: 1,
                bgcolor: 'background.neutral',
                '& .MuiLinearProgress-bar': {
                  bgcolor:
                    device.utilizationRate >= 80
                      ? 'success.main'
                      : device.utilizationRate >= 60
                        ? 'warning.main'
                        : 'error.main',
                },
              }}
            />

            <Stack direction="row" spacing={3}>
              <Typography variant="caption" color="text.secondary">
                预约 {device.bookingCount} 次
              </Typography>
              <Typography variant="caption" color="text.secondary">
                使用 {device.usedHours}/{device.totalHours} 小时
              </Typography>
              <Typography variant="caption" color="text.secondary">
                评分 {device.avgRating.toFixed(1)}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Card>
  );

  const renderDepartmentStats = (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        机构使用统计
      </Typography>

      <Stack spacing={2}>
        {MOCK_DEPARTMENT_STATS.map((dept, index) => (
          <Box key={dept.department}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: index === 0 ? 'primary.lighter' : 'background.neutral',
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight="medium">
                  {dept.department}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  预约 {dept.bookingCount} 次 · {dept.totalHours} 小时
                </Typography>
              </Box>
              <Typography variant="h6" color="primary.main">
                {dept.totalHours}h
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Card>
  );

  const renderTimeChart = (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h6">使用趋势</Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>时间范围</InputLabel>
          <Select
            value={timeRange}
            label="时间范围"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">本周</MenuItem>
            <MenuItem value="month">本月</MenuItem>
            <MenuItem value="quarter">本季度</MenuItem>
            <MenuItem value="year">本年</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* 简单的柱状图可视化 */}
      <Stack spacing={2}>
        {MOCK_TIME_STATS.map((stat) => (
          <Box key={stat.date}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 50 }}>
                {stat.date}
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={0.5}>
                  <Box
                    sx={{
                      width: `${(stat.bookingCount / 60) * 100}%`,
                      height: 24,
                      bgcolor: 'primary.main',
                      borderRadius: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" color="white">
                      {stat.bookingCount}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>
                {stat.usageHours}h
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" spacing={3}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            平均每日预约
          </Typography>
          <Typography variant="h6">
            {(MOCK_TIME_STATS.reduce((sum, s) => sum + s.bookingCount, 0) / MOCK_TIME_STATS.length).toFixed(1)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            平均每日使用
          </Typography>
          <Typography variant="h6">
            {(MOCK_TIME_STATS.reduce((sum, s) => sum + s.usageHours, 0) / MOCK_TIME_STATS.length).toFixed(1)}h
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            峰值预约
          </Typography>
          <Typography variant="h6">
            {Math.max(...MOCK_TIME_STATS.map((s) => s.bookingCount))}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );

  const renderSatisfactionTrend = (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        满意度趋势
      </Typography>

      <Stack spacing={3}>
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2">5星</Typography>
            <Typography variant="body2" color="text.secondary">
              75%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={75}
            sx={{
              height: 8,
              borderRadius: 1,
              bgcolor: 'background.neutral',
              '& .MuiLinearProgress-bar': { bgcolor: 'success.main' },
            }}
          />
        </Box>

        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2">4星</Typography>
            <Typography variant="body2" color="text.secondary">
              20%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={20}
            sx={{
              height: 8,
              borderRadius: 1,
              bgcolor: 'background.neutral',
              '& .MuiLinearProgress-bar': { bgcolor: 'info.main' },
            }}
          />
        </Box>

        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2">3星</Typography>
            <Typography variant="body2" color="text.secondary">
              4%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={4}
            sx={{
              height: 8,
              borderRadius: 1,
              bgcolor: 'background.neutral',
              '& .MuiLinearProgress-bar': { bgcolor: 'warning.main' },
            }}
          />
        </Box>

        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2">2星</Typography>
            <Typography variant="body2" color="text.secondary">
              1%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={1}
            sx={{
              height: 8,
              borderRadius: 1,
              bgcolor: 'background.neutral',
              '& .MuiLinearProgress-bar': { bgcolor: 'error.main' },
            }}
          />
        </Box>

        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2">1星</Typography>
            <Typography variant="body2" color="text.secondary">
              0%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={0}
            sx={{
              height: 8,
              borderRadius: 1,
              bgcolor: 'background.neutral',
              '& .MuiLinearProgress-bar': { bgcolor: 'error.dark' },
            }}
          />
        </Box>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="caption" color="text.secondary">
            总评价数
          </Typography>
          <Typography variant="h6">{totalBookings}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            平均评分
          </Typography>
          <Typography variant="h6">{avgRating.toFixed(1)}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            满意度
          </Typography>
          <Typography variant="h6" color="success.main">
            95%
          </Typography>
        </Box>
      </Stack>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>使用统计 - 设备共享平台</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h4">设备使用统计</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon={"solar:download-outline" as any} />}
            onClick={handleExport}
          >
            导出报表
          </Button>
        </Stack>

        {renderSummaryCards}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              {renderDeviceUtilization}
              {renderTimeChart}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              {renderDepartmentStats}
              {renderSatisfactionTrend}
            </Stack>
          </Grid>
        </Grid>
      </DashboardContent>
    </>
  );
}

