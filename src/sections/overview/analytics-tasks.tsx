import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    name: string;
    tag?: string;
  }[];
};

export function AnalyticsTasks({ title, subheader, list, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader} 
        sx={{ 
          mb: 0,
          pb: 2,
          '& .MuiCardHeader-title': {
            fontSize: '1.1rem',
            fontWeight: 600,
          }
        }} 
      />

      <Scrollbar sx={{ maxHeight: 405 }}>
        <Stack>
          {list.map((item) => (
            <TaskItem
              key={item.id}
              item={item}
            />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type TaskItemProps = BoxProps & {
  item: Props['list'][number];
};

function TaskItem({ item, sx, ...other }: TaskItemProps) {
  const menuActions = usePopover();

  const handleShare = () => {
    menuActions.onClose();
    console.info('SHARE', item.id);
  };

  // 解析名称和标签
  const parseNameAndTag = (name: string) => {
    const match = name.match(/^(.+?)（(.+?)）$/);
    if (match) {
      return { name: match[1], tag: match[2] };
    }
    return { name, tag: item.tag };
  };

  const { name, tag } = parseNameAndTag(item.name);

  // 根据标签内容设置颜色
  const getTagColor = (tagText?: string) => {
    if (!tagText) return 'default';
    if (tagText.includes('正在招募')) return 'success';
    if (tagText.includes('热门')) return 'error';
    if (tagText.includes('新增')) return 'info';
    if (tagText.includes('合作中')) return 'warning';
    return 'default';
  };

  return (
    <>
      <Box
        sx={[
          {
            pl: 2,
            pr: 1,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: 'action.hover',
            },
            borderBottom: '1px solid',
            borderColor: 'divider',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Typography
          variant="body2"
          sx={{ 
            flexGrow: 1,
            fontSize: '0.95rem',
            fontWeight: 500,
          }}
        >
          {name}
        </Typography>

        {tag && (
          <Chip
            label={tag}
            size="small"
            color={getTagColor(tag)}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          />
        )}

        <IconButton 
          color={menuActions.open ? 'primary' : 'default'} 
          onClick={menuActions.onOpen}
          size="small"
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Box>

      <Popover
        open={menuActions.open}
        anchorEl={menuActions.anchorEl}
        onClose={menuActions.onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              pl: 1,
              pr: 2,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleShare}>
            <Iconify icon="solar:share-bold" />
            分享
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
