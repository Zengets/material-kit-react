import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { CourseItem } from '../course-item';
import { CourseSort } from '../course-sort';
import { CourseSearch } from '../course-search';
import { CourseFilters } from '../course-filters';

import type { ICourseItem } from '../course-item';

// ----------------------------------------------------------------------

type Props = {
  courses: ICourseItem[];
};

export function CoursesView({ courses }: Props) {
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    format: 'all',
    industry: 'all',
    priceRange: 'all',
  });

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      format: 'all',
      industry: 'all',
      priceRange: 'all',
    });
  }, []);

  // 这里可以添加实际的筛选和排序逻辑
  const filteredCourses = courses;

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          课程库
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          发布课程
        </Button>
      </Box>

      <CourseFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CourseSearch courses={courses} onSearch={handleSearch} />
        <CourseSort
          sortBy={sortBy}
          onSort={handleSort}
          options={[
            { value: 'latest', label: '最新' },
            { value: 'popular', label: '最热门' },
            { value: 'rating', label: '评分最高' },
            { value: 'price-low', label: '价格从低到高' },
            { value: 'price-high', label: '价格从高到低' },
          ]}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid key={course.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <CourseItem course={course} />
          </Grid>
        ))}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}

