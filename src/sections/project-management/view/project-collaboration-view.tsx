import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import AvatarGroup from '@mui/material/AvatarGroup';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ProjectCollaborationView() {
  const teams = [
    {
      id: '1',
      name: 'AI应用开发团队',
      project: '人工智能应用开发项目',
      members: 8,
      status: '进行中',
    },
    {
      id: '2',
      name: '智能制造团队',
      project: '智能制造实训基地项目',
      members: 12,
      status: '进行中',
    },
  ];

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}>
        <Typography variant="h4">项目协作</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          创建团队
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* 团队列表 */}
        {teams.map((team) => (
          <Grid size={{ xs: 12, md: 6 }} key={team.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'primary.main',
                      mr: 2,
                    }}
                  >
                    <Iconify icon="solar:share-bold" width={24} />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{team.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {team.project}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: 'success.lighter',
                      color: 'success.dark',
                    }}
                  >
                    <Typography variant="caption" fontWeight={600}>
                      {team.status}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AvatarGroup max={4}>
                      <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
                      <Avatar sx={{ width: 32, height: 32 }}>B</Avatar>
                      <Avatar sx={{ width: 32, height: 32 }}>C</Avatar>
                      <Avatar sx={{ width: 32, height: 32 }}>D</Avatar>
                    </AvatarGroup>
                    <Typography variant="body2" color="text.secondary">
                      {team.members} 成员
                    </Typography>
                  </Box>
                  <Button size="small" variant="outlined">
                    查看详情
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* 协作工具 */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                协作工具
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Iconify icon="solar:chat-round-dots-bold" />}
                    sx={{ py: 2 }}
                  >
                    团队讨论
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Iconify icon="solar:pen-bold" />}
                    sx={{ py: 2 }}
                  >
                    共享文档
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Iconify icon="solar:clock-circle-outline" />}
                    sx={{ py: 2 }}
                  >
                    日程安排
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Iconify icon="solar:eye-bold" />}
                    sx={{ py: 2 }}
                  >
                    视频会议
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

