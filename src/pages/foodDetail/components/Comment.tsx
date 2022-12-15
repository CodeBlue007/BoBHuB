import styled from 'styled-components';
import { TextField, Button, Typography, Rating } from '@mui/material';
import React, { useState } from 'react';
import { commentStateProps } from '../types/Type';


const CommentContainer = styled.form`
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
  setCommentState : React.Dispatch<React.SetStateAction<commentStateProps[]>>;
}

type createCommentType = React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>

const Comment = ({starValue,setStarValue,setCommentState} : commnetProps) => {

  const [content, setContent] = useState<string>("");

  const ratingChange = (e:React.SyntheticEvent, newValue:number|null) => setStarValue(newValue);
  const fieldChange = (e:React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  const createComment = (e:createCommentType) =>{
    e.preventDefault();

    if(content === ''){
      alert("댓글을 입력해주세요");
      return;
    }
    const newComment = {
      commentId : 1232,
      userId: 123465,
      shopId : 12313,
      star : starValue,
      content,
    }

    setCommentState((current) => {
      const oldComment = [...current];
      oldComment.unshift(newComment);
      return oldComment;
    });

    setContent('');
  }


  return (
    <CommentContainer onSubmit={createComment}>
      <RatingContainer>
        <Typography component="legend">식당은 어땠나요?</Typography>
        <Rating
          name="simple-controlled"
          value={starValue}
          onChange={ratingChange}
        />
      </RatingContainer>
      <CommentField
        id="outlined-basic"
        label="댓글을 입력하세요"
        variant="outlined"
        value={content}
        onChange={fieldChange}
      />
      <Button variant="outlined" onClick={createComment}>Enter</Button>
    </CommentContainer>
  );
};

export default Comment;
