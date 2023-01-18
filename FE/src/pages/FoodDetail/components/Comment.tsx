import styled from 'styled-components';
import { TextField, Button, Typography, Rating } from '@mui/material';
import React, { useState } from 'react';
import { postComment } from '../foodDetailApi';
import type { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { canWriteComment } from '../util/foodDetailUtil';

const CommentContainer = styled.form`
  display: flex;
  width: 47vw;
  justify-content: space-between;
  position: relative;
`;

const RatingContainer = styled.div`
  display: flex;
  position: absolute;
  top: -35px;
  left: 10px;
`;

const CommentField = styled(TextField)`
  width: 40vw;
`;

interface commnetProps {
  updateCommentState: () => void;
  shopId: number;
  scrollRef: React.RefObject<HTMLElement>;
}

type createCommentType = React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>;

const Comment = ({ updateCommentState, shopId, scrollRef }: commnetProps) => {
  const [content, setContent] = useState<string>('');
  const [starValue, setStarValue] = useState<number | null>(5);
  const isLogin = useSelector<RootState>((state) => state.userReducer.isLogin) as boolean;

  const ratingChange = (e: React.SyntheticEvent, newValue: number | null) => setStarValue(newValue);
  const fieldChange = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  const createComment = async (e: createCommentType) => {
    e.preventDefault();
    if (canWriteComment(isLogin, content, starValue)) return;
    const newComment = {
      shopId,
      content,
      star: starValue,
    };
    const response = await postComment(newComment);
    if (response?.message) {
      updateCommentState();
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      setContent('');
    }
  };

  return (
    <CommentContainer onSubmit={createComment}>
      <RatingContainer>
        <Typography component="legend">식당은 어땠나요?</Typography>
        <Rating name="simple-controlled" value={starValue} onChange={ratingChange} />
      </RatingContainer>
      <CommentField
        id="outlined-basic"
        label="댓글을 입력하세요"
        variant="outlined"
        value={content}
        onChange={fieldChange}
      />
      <Button variant="outlined" onClick={createComment}>
        Enter
      </Button>
    </CommentContainer>
  );
};

export default React.memo(Comment);
