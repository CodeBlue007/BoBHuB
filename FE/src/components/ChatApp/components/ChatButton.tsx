import Button from '@mui/material/Button';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import styled from 'styled-components';

const CustomedButton = styled(Button)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

interface ChatButtonProps {
  handleDisplay: () => void;
}

const ChatButton = ({ handleDisplay }: ChatButtonProps) => {
  return (
    <CustomedButton
      color='secondary'
      variant="contained"
      sx={{
        borderRadius: '50%',
      }}
      onClick={handleDisplay}>
      <AddReactionOutlinedIcon />
    </CustomedButton>
  );
};

export default ChatButton;
