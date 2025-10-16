import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Expert = {
  id: string;
  expertId: string;
  name: string;
  avatarUrl: string;
  org: string;
  title: string;
  domain: string;
  experience: string;
  courses: string[];
  rating: number;
  status: '待认证' | '审核拒绝' | '已认证';
  totalCourses: number;
  totalStudents: number;
  bio: string;
};

type Props = {
  experts: Expert[];
};

export function ExpertsView({ experts }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '待认证':
        return 'warning';
      case '审核拒绝':
        return 'error';
      case '已认证':
        return 'success';
      default:
        return 'default';
    }
  };

  const renderExpertCard = (expert: Expert) => (
    <Card key={expert.id}>
      <Box sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              src={expert.avatarUrl}
              sx={{ width: 80, height: 80 }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                <Box>
                  <Typography variant="h6" noWrap>
                    {expert.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {expert.title}
                  </Typography>
                </Box>
                <Chip
                  label={expert.status}
                  color={getStatusColor(expert.status)}
                  size="small"
                />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <Iconify icon={'solar:buildings-outline' as any} width={16} />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {expert.org}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Rating value={expert.rating} readOnly size="small" precision={0.1} />
                <Typography variant="caption" color="text.secondary">
                  ({expert.rating.toFixed(1)})
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Chip
              label={expert.domain}
              size="small"
              variant="outlined"
              color="primary"
            />
            <Chip
              label={`${expert.experience}经验`}
              size="small"
              variant="outlined"
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {expert.bio}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  授课数量
                </Typography>
                <Typography variant="h6">{expert.totalCourses}</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  学员总数
                </Typography>
                <Typography variant="h6">{expert.totalStudents}</Typography>
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Iconify icon={'solar:eye-outline' as any} />}
            >
              查看详情
            </Button>
            {expert.status === '已认证' && (
              <Button
                variant="contained"
                fullWidth
                startIcon={<Iconify icon={'solar:letter-outline' as any} />}
              >
                邀请授课
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Card>
  );

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">讲师管理</Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          邀请讲师
        </Button>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
        <TextField
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          placeholder="搜索讲师姓名、机构..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'solar:magnifer-outline' as any} width={20} />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 400 }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>认证状态</InputLabel>
          <Select
            value={statusFilter}
            label="认证状态"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">全部</MenuItem>
            <MenuItem value="certified">已认证</MenuItem>
            <MenuItem value="pending">待认证</MenuItem>
            <MenuItem value="rejected">审核拒绝</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>专业领域</InputLabel>
          <Select
            value={domainFilter}
            label="专业领域"
            onChange={(e) => setDomainFilter(e.target.value)}
          >
            <MenuItem value="all">全部</MenuItem>
            <MenuItem value="ai">人工智能</MenuItem>
            <MenuItem value="frontend">前端开发</MenuItem>
            <MenuItem value="backend">后端开发</MenuItem>
            <MenuItem value="cloud">云计算</MenuItem>
            <MenuItem value="design">设计</MenuItem>
            <MenuItem value="management">管理</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Grid container spacing={3}>
        {experts.map((expert) => (
          <Grid key={expert.id} size={{ xs: 12, sm: 6, md: 4 }}>
            {renderExpertCard(expert)}
          </Grid>
        ))}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}

