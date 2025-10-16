import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ProjectDashboardView() {
  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}>
        <Typography variant="h4">项目总览</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          新建项目
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* 统计卡片 */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    24
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    进行中项目
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
                    bgcolor: 'primary.lighter',
                  }}
                >
                  <Iconify icon="solar:home-angle-bold-duotone" width={32} color="primary.main" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    8
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    待审核项目
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
                    bgcolor: 'warning.lighter',
                  }}
                >
                  <Iconify icon="solar:clock-circle-outline" width={32} color="warning.main" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    156
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    已完成项目
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
                    bgcolor: 'success.lighter',
                  }}
                >
                  <Iconify icon="solar:check-circle-bold" width={32} color="success.main" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    32
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    合作企业
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
                    bgcolor: 'info.lighter',
                  }}
                >
                  <Iconify icon="solar:bell-bing-bold-duotone" width={32} color="info.main" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 快速操作 */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                快速操作
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    sx={{ py: 2 }}
                  >
                    创建项目申请
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Iconify icon="solar:share-bold" />}
                    sx={{ py: 2 }}
                  >
                    邀请团队成员
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Iconify icon="solar:pen-bold" />}
                    sx={{ py: 2 }}
                  >
                    查看项目报告
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Iconify icon="eva:trending-up-fill" />}
                    sx={{ py: 2 }}
                  >
                    数据统计分析
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 最近项目 */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                最近项目
              </Typography>
              <Typography variant="body2" color="text.secondary">
                项目列表将在此处显示...
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

