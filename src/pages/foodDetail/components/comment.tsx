import styled from 'styled-components';
import { TextField, Button } from '@mui/material';

const CommentContainer = styled.div`
  display: flex;
`;

const Comment = () => {

  return (
    <CommentContainer>
      <TextField
        id="outlined-basic"
        label="댓글을 입력하세요"
        variant="outlined"
        sx={{
          width: 600,
        }}
      />
      <Button variant="outlined">Enter</Button>
    </CommentContainer>
  );
}

export default Comment;
