import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState, useEffect } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import type { NavItem } from '../nav-config-dashboard';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, sx }: NavContentProps) {
  const pathname = usePathname();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 ,gap: 1}}>
        <Logo />
        
        {slots?.topArea}
      </Box>

      <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box
            component="ul"
            sx={{
              gap: 0.5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {data
              .filter((item) => !item.hidden)
              .map((item) => (
                <NavItemComponent key={item.title} item={item} pathname={pathname} />
              ))}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}
    </>
  );
}

// ----------------------------------------------------------------------

function NavItemComponent({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActived = item.path === pathname;
  const isChildActive = hasChildren && item.children?.some((child) => child.path === pathname);

  const handleToggle = () => {
    if (hasChildren) {
      setOpen(!open);
    }
  };

  if (hasChildren) {
    return (
      <ListItem disableGutters disablePadding>
        <Box sx={{ width: '100%' }}>
          <ListItemButton
            disableGutters
            onClick={handleToggle}
            sx={[
              (theme) => ({
                pl: 2,
                py: 1,
                gap: 2,
                pr: 1.5,
                borderRadius: 0.75,
                typography: 'body2',
                fontWeight: 'fontWeightMedium',
                color: theme.vars.palette.text.secondary,
                minHeight: 44,
                ...(isChildActive && {
                  fontWeight: 'fontWeightSemiBold',
                  color: theme.vars.palette.primary.main,
                }),
              }),
            ]}
          >
            <Box component="span" sx={{ width: 24, height: 24 }}>
              {item.icon}
            </Box>

            <Box component="span" sx={{ flexGrow: 1 }}>
              {item.title}
            </Box>

            {item.info && item.info}

            <Iconify
              icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
              width={16}
            />
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 0.5 }}>
              {item.children?.map((child) => {
                const isChildActived = child.path === pathname;

                return (
                  <ListItem disableGutters disablePadding key={child.title}>
                    <ListItemButton
                      disableGutters
                      component={RouterLink}
                      href={child.path}
                      sx={[
                        (theme) => ({
                          pl: 2,
                          py: 1,
                          gap: 2,
                          pr: 1.5,
                          borderRadius: 0.75,
                          typography: 'body2',
                          fontWeight: 'fontWeightMedium',
                          color: theme.vars.palette.text.secondary,
                          minHeight: 40,
                          ...(isChildActived && {
                            fontWeight: 'fontWeightSemiBold',
                            color: theme.vars.palette.primary.main,
                            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                            '&:hover': {
                              bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
                            },
                          }),
                        }),
                      ]}
                    >
                      <Box component="span" sx={{ width: 20, height: 20, fontSize: '0.875rem' }}>
                        {child.icon}
                      </Box>

                      <Box component="span" sx={{ flexGrow: 1, fontSize: '0.875rem' }}>
                        {child.title}
                      </Box>

                      {child.info && child.info}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </Box>
          </Collapse>
        </Box>
      </ListItem>
    );
  }

  return (
    <ListItem disableGutters disablePadding>
      <ListItemButton
        disableGutters
        component={RouterLink}
        href={item.path}
        sx={[
          (theme) => ({
            pl: 2,
            py: 1,
            gap: 2,
            pr: 1.5,
            borderRadius: 0.75,
            typography: 'body2',
            fontWeight: 'fontWeightMedium',
            color: theme.vars.palette.text.secondary,
            minHeight: 44,
            ...(isActived && {
              fontWeight: 'fontWeightSemiBold',
              color: theme.vars.palette.primary.main,
              bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
              '&:hover': {
                bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
              },
            }),
          }),
        ]}
      >
        <Box component="span" sx={{ width: 24, height: 24 }}>
          {item.icon}
        </Box>

        <Box component="span" sx={{ flexGrow: 1 }}>
          {item.title}
        </Box>

        {item.info && item.info}
      </ListItemButton>
    </ListItem>
  );
}
