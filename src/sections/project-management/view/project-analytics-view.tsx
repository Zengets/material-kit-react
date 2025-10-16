import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ProjectAnalyticsView() {
  const stats = [
    {
      title: '项目总数',
      value: '188',
      icon: 'solar:home-angle-bold-duotone' as const,
      color: 'primary',
      change: '+12%',
    },
    {
      title: '活跃项目',
      value: '24',
      icon: 'eva:trending-up-fill' as const,
      color: 'success',
      change: '+8%',
    },
    {
      title: '参与企业',
      value: '32',
      icon: 'solar:bell-bing-bold-duotone' as const,
      color: 'warning',
      change: '+5%',
    },
    {
      title: '项目投资',
      value: '¥2.4M',
      icon: 'solar:cart-3-bold' as const,
      color: 'error',
      change: '+15%',
    },
  ];

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        数据分析
      </Typography>

      <Grid container spacing={3}>
        {/* 统计卡片 */}
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h3" sx={{ mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'success.main',
                        fontWeight: 600,
                      }}
                    >
                      {stat.change} 较上月
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${stat.color}.lighter`,
                    }}
                  >
                    <Iconify icon={stat.icon} width={32} color={`${stat.color}.main`} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* 项目进度分布 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                项目进度分布
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  图表将在此处显示
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 项目类型分布 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                项目类型分布
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  图表将在此处显示
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 月度项目趋势 */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                月度项目趋势
              </Typography>
              <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  图表将在此处显示
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

