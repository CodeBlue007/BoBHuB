import { Modal } from '@mui/material';
import type { FoodType } from './Foods';
import FoodForm from './FoodForm';
export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface FoodModalProps {
  handleClose: () => void;
  open: boolean;
  food: FoodType;
  setFoodsData: () => void;
  btnState: string;
}

const FoodModal = ({ open, handleClose, food, setFoodsData, btnState }: FoodModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <FoodForm
          btnState={btnState}
          handleClose={handleClose}
          setFoodsData={setFoodsData}
          food={food}
        />
      </Modal>
    </div>
  );
};

export default FoodModal;