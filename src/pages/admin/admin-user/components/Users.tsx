import { User } from '../../components/SideBar';

const Users: React.FC<{ users: User[] }> = (props) => {
  return (
    <div>
      <ul>{props.users.map((user) => user.name)}</ul>
    </div>
  );
};

export default Users;
