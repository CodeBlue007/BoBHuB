import styled from 'styled-components';
import { TextField, Button } from '@mui/material';

const CommentContainer = styled.form`
  display: flex;
  width: 750px;
  justify-content: space-around;
`;

function Comment() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <CommentContainer onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        label="댓글을 입력하세요"
        variant="outlined"
        sx={{
          width: 600,
          marginRight:1,
        }}
      />
      <Button variant="outlined">입력하기</Button>
    </CommentContainer>
  );
}


export default Comment;