import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { fDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type MyCourse = {
  id: string;
  title: string;
  coverUrl: string;
  instructorName: string;
  instructorAvatar: string;
  progress: number;
  lastStudyDate: string | number | null;
  remainingTasks: number;
  isCompleted: boolean;
  duration: number;
  tags: string[];
};

type Props = {
  courses: MyCourse[];
  stats: {
    totalCourses: number;
    completedCourses: number;
    totalHours: number;
    certificates: number;
  };
};

export function MyLearningView({ courses, stats }: Props) {
  const inProgressCourses = courses.filter((c) => !c.isCompleted);
  const completedCourses = courses.filter((c) => c.isCompleted);

  const renderStats = (
    <Grid container spacing={3} sx={{ mb: 5 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Iconify icon={'solar:book-outline' as any} width={48} sx={{ color: 'primary.main', mb: 2 }} />
          <Typography variant="h3">{stats.totalCourses}</Typography>
          <Typography variant="body2" color="text.secondary">
            已报名课程
          </Typography>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Iconify icon={'solar:diploma-verified-outline' as any} width={48} sx={{ color: 'success.main', mb: 2 }} />
          <Typography variant="h3">{stats.completedCourses}</Typography>
          <Typography variant="body2" color="text.secondary">
            已完成课程
          </Typography>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Iconify icon={'solar:clock-circle-outline' as any} width={48} sx={{ color: 'warning.main', mb: 2 }} />
          <Typography variant="h3">{stats.totalHours}</Typography>
          <Typography variant="body2" color="text.secondary">
            学习时长(小时)
          </Typography>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Iconify icon={'solar:medal-star-outline' as any} width={48} sx={{ color: 'error.main', mb: 2 }} />
          <Typography variant="h3">{stats.certificates}</Typography>
          <Typography variant="body2" color="text.secondary">
            获得证书
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );

  const renderCourseCard = (course: MyCourse) => (
    <Card key={course.id}>
      <Stack direction="row" spacing={2} sx={{ p: 3 }}>
        <Box
          component="img"
          src={course.coverUrl}
          sx={{
            width: 160,
            height: 120,
            borderRadius: 1,
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" noWrap>
                {course.title}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                <Avatar src={course.instructorAvatar} sx={{ width: 24, height: 24 }} />
                <Typography variant="body2" color="text.secondary">
                  {course.instructorName}
                </Typography>
              </Stack>
            </Box>

            <Stack direction="row" spacing={1}>
              {course.tags.slice(0, 2).map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Stack>

            <Box>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  学习进度
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {course.progress}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={course.progress}
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="text.secondary">
                上次学习: {fDate(course.lastStudyDate)}
              </Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<Iconify icon={'solar:play-circle-outline' as any} />}
              >
                继续学习
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">我的学习</Typography>
        <Button
          variant="outlined"
          startIcon={<Iconify icon={'solar:download-outline' as any} />}
        >
          导出学习报告
        </Button>
      </Box>

      {renderStats}

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          进行中的课程 ({inProgressCourses.length})
        </Typography>
        <Stack spacing={2}>
          {inProgressCourses.map((course) => renderCourseCard(course))}
        </Stack>
      </Box>

      <Divider sx={{ my: 5 }} />

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h5">
            已完成的课程 ({completedCourses.length})
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {completedCourses.map((course) => (
            <Grid key={course.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Box
                  component="img"
                  src={course.coverUrl}
                  sx={{
                    width: 1,
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" noWrap sx={{ mb: 1 }}>
                    {course.title}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar src={course.instructorAvatar} sx={{ width: 24, height: 24 }} />
                    <Typography variant="caption" color="text.secondary">
                      {course.instructorName}
                    </Typography>
                  </Stack>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<Iconify icon={'solar:diploma-outline' as any} />}
                  >
                    查看证书
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardContent>
  );
}

