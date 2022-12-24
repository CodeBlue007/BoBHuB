import Button from '@mui/material/Button';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import styled from 'styled-components';

const CustomedButton = styled(Button)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

interface ChatButtonProps {
  handleClick: () => void;
}

const ChatButton = ({ handleClick }: ChatButtonProps) => {
  return (
    <CustomedButton
      color='secondary'
      variant="contained"
      sx={{
        borderRadius: '50%',
      }}
      onClick={handleClick}>
      <AddReactionOutlinedIcon />
    </CustomedButton>
  );
};

export default ChatButton;
