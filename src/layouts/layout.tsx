import { styled } from '@mui/material/styles';
import { PropsWithChildren, useState } from 'react';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { TOP_NAV_HEIGHT } from '../constants';


const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  height: `calc(100% - ${TOP_NAV_HEIGHT}px)`,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled('div')({
  height: `100%`,
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'row',
  width: '100%'
});

const Layout = (props: PropsWithChildren) => {
  const { children } = props;
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};

export default Layout;
