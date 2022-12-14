import { User } from '../../components/SideBar';

const UserList: React.FC<{ user: User }> = (props) => {
  return <li>{props.user.email}</li>;
};
