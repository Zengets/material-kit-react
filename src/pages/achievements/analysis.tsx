import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type StatCard = {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'error' | 'info';
};

type FieldData = {
  field: string;
  achievementCount: number;
  conversionCount: number;
  conversionRate: number;
  totalAmount: number;
};

type OrgData = {
  org: string;
  achievementCount: number;
  conversionCount: number;
  conversionRate: number;
  totalAmount: number;
};

type RegionData = {
  region: string;
  achievementCount: number;
  conversionCount: number;
  totalAmount: number;
  hotIndex: number;
};

type TrendData = {
  month: string;
  conversionCount: number;
  amount: number;
};

const STAT_CARDS: StatCard[] = [
  {
    title: '成果总数',
    value: '1,248',
    change: '+12.5%',
    trend: 'up',
    icon: 'solar:pen-bold',
    color: 'primary',
  },
  {
    title: '转化成功',
    value: '386',
    change: '+18.2%',
    trend: 'up',
    icon: 'solar:check-circle-bold',
    color: 'success',
  },
  {
    title: '转化率',
    value: '30.9%',
    change: '+3.2%',
    trend: 'up',
    icon: 'eva:trending-up-fill',
    color: 'info',
  },
  {
    title: '成交金额',
    value: '¥2.8亿',
    change: '+25.6%',
    trend: 'up',
    icon: 'solar:cart-3-bold',
    color: 'warning',
  },
];

const FIELD_DATA: FieldData[] = [
  {
    field: '人工智能',
    achievementCount: 285,
    conversionCount: 98,
    conversionRate: 34.4,
    totalAmount: 8500,
  },
  {
    field: '新材料',
    achievementCount: 234,
    conversionCount: 82,
    conversionRate: 35.0,
    totalAmount: 7200,
  },
  {
    field: '生物医药',
    achievementCount: 198,
    conversionCount: 65,
    conversionRate: 32.8,
    totalAmount: 6800,
  },
  {
    field: '新能源',
    achievementCount: 176,
    conversionCount: 58,
    conversionRate: 33.0,
    totalAmount: 5900,
  },
  {
    field: '电子信息',
    achievementCount: 165,
    conversionCount: 48,
    conversionRate: 29.1,
    totalAmount: 4200,
  },
  {
    field: '智能制造',
    achievementCount: 142,
    conversionCount: 35,
    conversionRate: 24.6,
    totalAmount: 3100,
  },
];

const ORG_DATA: OrgData[] = [
  {
    org: '人工智能学院',
    achievementCount: 156,
    conversionCount: 58,
    conversionRate: 37.2,
    totalAmount: 4800,
  },
  {
    org: '材料科学学院',
    achievementCount: 142,
    conversionCount: 52,
    conversionRate: 36.6,
    totalAmount: 4200,
  },
  {
    org: '生命科学学院',
    achievementCount: 128,
    conversionCount: 45,
    conversionRate: 35.2,
    totalAmount: 3900,
  },
  {
    org: '机械工程学院',
    achievementCount: 118,
    conversionCount: 38,
    conversionRate: 32.2,
    totalAmount: 3200,
  },
  {
    org: '电子信息学院',
    achievementCount: 105,
    conversionCount: 32,
    conversionRate: 30.5,
    totalAmount: 2800,
  },
];

const REGION_DATA: RegionData[] = [
  {
    region: '北京',
    achievementCount: 285,
    conversionCount: 95,
    totalAmount: 8200,
    hotIndex: 95,
  },
  {
    region: '上海',
    achievementCount: 248,
    conversionCount: 82,
    totalAmount: 7100,
    hotIndex: 88,
  },
  {
    region: '深圳',
    achievementCount: 215,
    conversionCount: 75,
    totalAmount: 6500,
    hotIndex: 85,
  },
  {
    region: '广州',
    achievementCount: 168,
    conversionCount: 52,
    totalAmount: 4200,
    hotIndex: 72,
  },
  {
    region: '杭州',
    achievementCount: 152,
    conversionCount: 48,
    totalAmount: 3800,
    hotIndex: 68,
  },
  {
    region: '成都',
    achievementCount: 128,
    conversionCount: 34,
    totalAmount: 2900,
    hotIndex: 58,
  },
];

const TREND_DATA: TrendData[] = [
  { month: '2024-04', conversionCount: 28, amount: 1850 },
  { month: '2024-05', conversionCount: 32, amount: 2100 },
  { month: '2024-06', conversionCount: 35, amount: 2350 },
  { month: '2024-07', conversionCount: 38, amount: 2600 },
  { month: '2024-08', conversionCount: 42, amount: 2950 },
  { month: '2024-09', conversionCount: 45, amount: 3200 },
];

// ----------------------------------------------------------------------

export default function AchievementAnalysisPage() {
  const [timeRange, setTimeRange] = useState('year');

  return (
    <>
      <Helmet>
        <title>转化分析 - 成果转化管理系统</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            转化数据分析
          </Typography>
          <Stack direction="row" spacing={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>时间范围</InputLabel>
              <Select
                value={timeRange}
                label="时间范围"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="month">本月</MenuItem>
                <MenuItem value="quarter">本季度</MenuItem>
                <MenuItem value="year">本年度</MenuItem>
                <MenuItem value="all">全部</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              导出报表
            </Button>
          </Stack>
        </Box>

        {/* Stat Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {STAT_CARDS.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: (theme) => `${theme.palette[stat.color].main}14`,
                        color: `${stat.color}.main`,
                      }}
                    >
                      <Iconify icon={stat.icon as any} width={24} />
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Iconify
                        icon={
                          stat.trend === 'up'
                            ? 'eva:arrow-ios-upward-fill'
                            : 'eva:arrow-ios-downward-fill'
                        }
                        width={20}
                        color={stat.trend === 'up' ? 'success.main' : 'error.main'}
                      />
                      <Typography
                        variant="caption"
                        color={stat.trend === 'up' ? 'success.main' : 'error.main'}
                      >
                        {stat.change}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography variant="h4">{stat.value}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Trend Chart */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            转化趋势
          </Typography>
          <Stack spacing={2}>
            {TREND_DATA.map((data, index) => (
              <Box key={index}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: 80 }}>
                    {data.month}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(data.conversionCount / 50) * 100}
                      sx={{ height: 24, borderRadius: 1 }}
                    />
                  </Box>
                  <Typography variant="body2" fontWeight="medium" sx={{ minWidth: 60 }}>
                    {data.conversionCount}项
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
                    ¥{data.amount}万
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Card>

        {/* Field Analysis */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            按领域统计
          </Typography>
          <Stack spacing={2}>
            {FIELD_DATA.map((field, index) => (
              <Box key={index}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: 100 }}>
                    {field.field}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={field.conversionRate}
                      color={field.conversionRate >= 33 ? 'success' : 'primary'}
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ minWidth: 60 }}>
                    {field.conversionRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                    {field.conversionCount}/{field.achievementCount}
                  </Typography>
                  <Typography variant="body2" fontWeight="medium" sx={{ minWidth: 100 }}>
                    ¥{(field.totalAmount / 10000).toFixed(2)}亿
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Card>

        <Grid container spacing={3}>
          {/* Organization Analysis */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                按机构统计（Top 5）
              </Typography>
              <Stack spacing={3}>
                {ORG_DATA.map((org, index) => (
                  <Box key={index}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: index < 3 ? 'primary.main' : 'grey.300',
                          color: index < 3 ? 'white' : 'text.secondary',
                          fontWeight: 'bold',
                          fontSize: 14,
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {org.org}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          转化率 {org.conversionRate}% · {org.conversionCount}/
                          {org.achievementCount}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="medium">
                        ¥{(org.totalAmount / 10000).toFixed(2)}亿
                      </Typography>
                    </Stack>
                    {index < ORG_DATA.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Stack>
            </Card>
          </Grid>

          {/* Region Analysis */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                按地区统计
              </Typography>
              <Stack spacing={3}>
                {REGION_DATA.map((region, index) => (
                  <Box key={index}>
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" fontWeight="medium">
                          {region.region}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Iconify icon="eva:trending-up-fill" width={16} color="warning.main" />
                          <Typography variant="caption" color="warning.main">
                            热度 {region.hotIndex}
                          </Typography>
                        </Stack>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={region.hotIndex}
                        color={region.hotIndex >= 80 ? 'warning' : 'primary'}
                        sx={{ height: 6, borderRadius: 1 }}
                      />
                      <Stack direction="row" spacing={2}>
                        <Typography variant="caption" color="text.secondary">
                          成果 {region.achievementCount}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          转化 {region.conversionCount}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          金额 ¥{(region.totalAmount / 10000).toFixed(2)}亿
                        </Typography>
                      </Stack>
                    </Stack>
                    {index < REGION_DATA.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>

        {/* Summary Insights */}
        <Card sx={{ p: 3, mt: 3, bgcolor: 'info.lighter' }}>
          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'info.main',
                color: 'white',
              }}
            >
              <Iconify icon="mingcute:add-line" width={24} />
            </Box>
            <Stack spacing={1} sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                数据洞察
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • 人工智能和新材料领域转化率最高，分别达到34.4%和35.0%
                <br />
                • 北京、上海、深圳三地成果转化最活跃，占总金额的77.3%
                <br />
                • 近6个月转化数量和金额呈稳定增长趋势，月均增长率约12%
                <br />• 人工智能学院和材料科学学院表现突出，转化率超过36%
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </DashboardContent>
    </>
  );
}

