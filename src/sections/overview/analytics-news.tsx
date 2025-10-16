import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';

import { fToNow } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
    postedAt: string | number | null;
  }[];
};

export function AnalyticsNews({ title, subheader, list, sx, ...other }: Props) {
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
        <Box>
          {list.map((item, index) => (
            <Item key={item.id} item={item} isLast={index === list.length - 1} />
          ))}
        </Box>
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: 'right', borderTop: '1px solid', borderColor: 'divider' }}>
        <Button
          size="small"
          color="primary"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          sx={{ fontWeight: 500 }}
        >
          查看全部
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  item: Props['list'][number];
  isLast?: boolean;
};

function Item({ item, isLast, sx, ...other }: ItemProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          py: 2,
          px: 3,
          gap: 2,
          display: 'flex',
          alignItems: 'flex-start',
          borderBottom: isLast ? 'none' : `solid 1px ${theme.vars.palette.divider}`,
          transition: 'all 0.2s',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'action.hover',
            '& .news-title': {
              color: 'primary.main',
            },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Avatar
        variant="rounded"
        alt={item.title}
        src={item.coverUrl}
        sx={{ 
          width: 56, 
          height: 56, 
          flexShrink: 0,
          bgcolor: 'primary.lighter',
          color: 'primary.main',
          fontSize: '1.5rem',
          fontWeight: 600,
        }}
      >
        {item.title.substring(0, 1)}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <Link 
          className="news-title"
          color="inherit" 
          underline="none"
          sx={{ 
            fontWeight: 600,
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 0.5,
            transition: 'color 0.2s',
          }}
        >
          {item.title}
        </Link>
        <Box 
          component="p"
          sx={{ 
            typography: 'body2',
            color: 'text.secondary',
            m: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.description}
        </Box>
        <Box sx={{ mt: 1, typography: 'caption', color: 'text.disabled' }}>
          {fToNow(item.postedAt)}
        </Box>
      </Box>
    </Box>
  );
}
