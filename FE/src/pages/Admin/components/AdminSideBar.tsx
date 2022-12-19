import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SideBarListItems from './SideBarListItems';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { drawerWidth } from './Admin';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

interface AdminSideBarProps {
  open: boolean;
  toggleDrawer: () => void;
  clickUsersBtn: () => void;
  clickRestaurantBtn: () => void;
}

const AdminSideBar = ({
  open,
  toggleDrawer,
  clickUsersBtn,
  clickRestaurantBtn,
}: AdminSideBarProps) => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <SideBarListItems clickUsersBtn={clickUsersBtn} clickRestaurantBtn={clickRestaurantBtn} />
        <Divider sx={{ my: 1 }} />

        <Link to="/">
          <IconButton color="inherit" sx={{ position: 'absolute', bottom: '-40px' }}>
            <HomeIcon fontSize="large" color="primary" />
          </IconButton>
        </Link>
      </List>
    </Drawer>
  );
};

export default AdminSideBar;
