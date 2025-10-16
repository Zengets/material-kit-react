import type { SelectChangeEvent } from '@mui/material/Select';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// ----------------------------------------------------------------------

type Props = {
  sortBy: string;
  onSort: (value: string) => void;
  options: { value: string; label: string }[];
};

export function CourseSort({ sortBy, onSort, options }: Props) {
  const handleSort = (event: SelectChangeEvent) => {
    onSort(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>排序</InputLabel>
      <Select value={sortBy} label="排序" onChange={handleSort}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

