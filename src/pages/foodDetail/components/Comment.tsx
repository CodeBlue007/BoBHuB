import styled from 'styled-components';
import { TextField, Button, Typography, Rating } from '@mui/material';

const CommentContainer = styled.div`
  display: flex;
  width: 47vw;
  justify-content: space-between;
  position: relative;
`;

const RatingContainer = styled.div`
  display: flex;
  position: absolute;
  top : -35px;
  left : 10px;
`;

const CommentField = styled(TextField)`
  width:40vw;
`;


interface commnetProps{
  starValue : number|null;
  setStarValue : (x:number|null) => void;
}

const Comment = ({starValue,setStarValue} : commnetProps) => {



  return (
    <CommentContainer>
      <RatingContainer>
        <Typography component="legend">식당은 어땠나요?</Typography>
        <Rating
          name="simple-controlled"
          value={starValue}
          onChange={(event:React.SyntheticEvent, newValue:number|null) => {
            setStarValue(newValue);
          }}
        />
      </RatingContainer>
      <CommentField
        id="outlined-basic"
        label="댓글을 입력하세요"
        variant="outlined"
      />
      <Button variant="outlined">Enter</Button>
    </CommentContainer>
  );
};

export default Comment;
