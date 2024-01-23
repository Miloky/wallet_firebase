import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { Logo } from '../components/logo';
import { Scrollbar } from '../components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { Link } from 'react-router-dom';

export const SideNav = (props: any) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: '#9DA4AE',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={Link}
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
        </Box>
        <Divider sx={{ borderColor: '#2F3746' }} />
        <Box
          component='nav'
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component='ul'
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {items.map((item: any) => {
              const active = item.path ? '/' === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          sx: {
            backgroundColor: '#1C2536',
            color: 'common.white',
            width: 280,
          },
        }}
        variant='permanent'
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor='left'
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#1C2536',
          color: 'common.white',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant='temporary'
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
