import type { BoxProps } from '@mui/material/Box';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title?: string;
  subheader?: string;
  list: { value: string; label: string; total: number }[];
};

// 企业图标和颜色配置
const companyConfig: Record<string, { icon: string; color: string }> = {
  huawei: { icon: 'solar:global-bold-duotone', color: '255 0 0' },
  tencent: { icon: 'solar:chat-round-like-bold-duotone', color: '0 164 255' },
  alibaba: { icon: 'solar:bag-smile-bold-duotone', color: '255 106 0' },
  baidu: { icon: 'solar:magnifer-bold-duotone', color: '41 50 225' },
  jd: { icon: 'solar:cart-large-3-bold-duotone', color: '227 0 11' },
  bytedance: { icon: 'solar:graph-new-up-bold-duotone', color: '0 0 0' },
};

export function AnalyticsTrafficBySite({ title, subheader, list, sx, ...other }: Props) {
  return (
    <Box sx={sx} {...other}>
      {/* 标题部分 */}
      {title && (
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3,
            fontSize: '1.1rem',
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      )}
      
      {/* 企业图标列表 */}
      <Box
        sx={{
          gap: 4,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {list.map((site) => {
          const config = companyConfig[site.value] || { icon: 'solar:buildings-2-bold-duotone', color: '99 115 129' };
          
          return (
            <Box
              key={site.label}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: varAlpha(config.color, 0.16),
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: varAlpha(config.color, 0.24),
                  },
                }}
              >
                <Iconify width={32} icon={config.icon as any} sx={{ color: `rgb(${config.color})` }} />
              </Box>

              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                {site.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
