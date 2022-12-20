import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import PeopleIcon from '@mui/icons-material/People';

interface ListItemProps {
  clickUsersBtn: () => void;
  clickRestaurantBtn: () => void;
}

const SideBarListItems = ({ clickUsersBtn, clickRestaurantBtn }: ListItemProps) => (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={clickRestaurantBtn}>
      <ListItemIcon>
        <FoodBankIcon />
      </ListItemIcon>
      <ListItemText primary="Restaurants" />
    </ListItemButton>
    <ListItemButton onClick={clickUsersBtn}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
  </React.Fragment>
);

export default SideBarListItems;