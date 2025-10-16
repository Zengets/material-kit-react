import { useState, useCallback } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

import type { ICourseItem } from './course-item';

// ----------------------------------------------------------------------

type Props = {
  courses: ICourseItem[];
  onSearch?: (value: string) => void;
};

export function CourseSearch({ courses, onSearch }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchQuery(value);
      onSearch?.(value);
    },
    [onSearch]
  );

  return (
    <TextField
      fullWidth
      value={searchQuery}
      onChange={handleSearch}
      placeholder="搜索课程名称、讲师、标签..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon={'solar:magnifer-outline' as any} width={20} />
          </InputAdornment>
        ),
      }}
      sx={{ maxWidth: 400 }}
    />
  );
}

