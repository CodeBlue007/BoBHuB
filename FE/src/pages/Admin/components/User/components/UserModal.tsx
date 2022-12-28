import { Modal } from '@mui/material';
import type { UserType } from './Users';
import UserDetailForm from './UserDetailForm';

interface UserModalProps {
  handleClose: () => void;
  open: boolean;
  user: UserType;
}

const UserModal = ({ open, handleClose, user }: UserModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <UserDetailForm handleClose={handleClose} user={user} />
      </Modal>
    </div>
  );
};

export default UserModal;
