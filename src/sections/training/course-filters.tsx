import type { SelectChangeEvent } from '@mui/material/Select';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// ----------------------------------------------------------------------

type Props = {
  filters: {
    format: string;
    industry: string;
    priceRange: string;
  };
  onFilterChange: (name: string, value: string) => void;
  onResetFilters: () => void;
};

export function CourseFilters({ filters, onFilterChange, onResetFilters }: Props) {
  const handleChange = (name: string) => (event: SelectChangeEvent) => {
    onFilterChange(name, event.target.value);
  };

  const hasFilters = filters.format !== 'all' || filters.industry !== 'all' || filters.priceRange !== 'all';

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>培训类型</InputLabel>
        <Select value={filters.format} label="培训类型" onChange={handleChange('format')}>
          <MenuItem value="all">全部</MenuItem>
          <MenuItem value="online">线上</MenuItem>
          <MenuItem value="offline">线下</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>行业分类</InputLabel>
        <Select value={filters.industry} label="行业分类" onChange={handleChange('industry')}>
          <MenuItem value="all">全部</MenuItem>
          <MenuItem value="ai">人工智能</MenuItem>
          <MenuItem value="frontend">前端开发</MenuItem>
          <MenuItem value="backend">后端开发</MenuItem>
          <MenuItem value="cloud">云计算</MenuItem>
          <MenuItem value="blockchain">区块链</MenuItem>
          <MenuItem value="design">设计</MenuItem>
          <MenuItem value="management">项目管理</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>价格范围</InputLabel>
        <Select value={filters.priceRange} label="价格范围" onChange={handleChange('priceRange')}>
          <MenuItem value="all">全部</MenuItem>
          <MenuItem value="free">免费</MenuItem>
          <MenuItem value="0-1000">¥0 - ¥1000</MenuItem>
          <MenuItem value="1000-5000">¥1000 - ¥5000</MenuItem>
          <MenuItem value="5000+">¥5000+</MenuItem>
        </Select>
      </FormControl>

      {hasFilters && (
        <Chip
          label="清除筛选"
          onDelete={onResetFilters}
          color="primary"
          variant="outlined"
        />
      )}
    </Stack>
  );
}

