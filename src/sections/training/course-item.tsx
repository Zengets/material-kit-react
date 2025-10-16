import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type ICourseItem = {
  id: string;
  courseId: string;
  title: string;
  coverUrl: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  orgName: string;
  duration: number;
  format: 'online' | 'offline';
  startDate: string | number | null;
  capacity: number;
  enrolledCount: number;
  tags: string[];
  price: number | null;
  rating: number;
  description: string;
  totalViews: number;
  totalStudents: number;
};

export function CourseItem({ sx, course, ...other }: CardProps & { course: ICourseItem }) {
  const isEnrolled = false; // 这里可以根据实际情况判断是否已报名
  const isFavorite = false; // 这里可以根据实际情况判断是否已收藏

  const renderCover = (
    <Box
      sx={{
        position: 'relative',
        pt: 'calc(100% * 3 / 4)',
      }}
    >
      <Box
        component="img"
        alt={course.title}
        src={course.coverUrl}
        sx={{
          top: 0,
          width: 1,
          height: 1,
          objectFit: 'cover',
          position: 'absolute',
        }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'background.paper' },
        }}
      >
        <Iconify
          icon={(isFavorite ? 'solar:heart-bold' : 'solar:heart-outline') as any}
          color={isFavorite ? 'error.main' : 'text.secondary'}
        />
      </IconButton>
      <Chip
        label={course.format === 'online' ? '线上' : '线下'}
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          bgcolor: course.format === 'online' ? 'info.main' : 'warning.main',
          color: 'white',
        }}
      />
    </Box>
  );

  const renderInstructor = (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
      <Avatar alt={course.instructorName} src={course.instructorAvatar} sx={{ width: 32, height: 32 }} />
      <Box>
        <Typography variant="subtitle2" noWrap>
          {course.instructorName}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {course.orgName}
        </Typography>
      </Box>
    </Stack>
  );

  const renderTitle = (
    <Typography
      variant="subtitle1"
      sx={{
        height: 48,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        mb: 1,
      }}
    >
      {course.title}
    </Typography>
  );

  const renderInfo = (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Rating value={course.rating} readOnly size="small" precision={0.1} />
        <Typography variant="caption" color="text.secondary">
          ({course.rating.toFixed(1)})
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Iconify icon={'solar:clock-circle-outline' as any} width={16} />
          <Typography variant="caption" color="text.secondary">
            {course.duration}学时
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Iconify icon={'solar:users-group-rounded-outline' as any} width={16} />
          <Typography variant="caption" color="text.secondary">
            {course.enrolledCount}/{course.capacity}人
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
        {course.tags.slice(0, 2).map((tag) => (
          <Chip key={tag} label={tag} size="small" variant="outlined" />
        ))}
      </Stack>
    </Stack>
  );

  const renderFooter = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box>
        {course.price === null ? (
          <Typography variant="h6" color="success.main">
            免费
          </Typography>
        ) : (
          <Typography variant="h6" color="error.main">
            ¥{fNumber(course.price)}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          开课时间: {fDate(course.startDate)}
        </Typography>
      </Box>
      <Button
        variant={isEnrolled ? 'outlined' : 'contained'}
        size="small"
        startIcon={<Iconify icon={(isEnrolled ? 'solar:book-outline' : 'solar:add-circle-outline') as any} />}
      >
        {isEnrolled ? '进入课程' : '立即报名'}
      </Button>
    </Stack>
  );

  return (
    <Card sx={sx} {...other}>
      {renderCover}
      <Box sx={{ p: 3 }}>
        {renderInstructor}
        {renderTitle}
        {renderInfo}
        {renderFooter}
      </Box>
    </Card>
  );
}

