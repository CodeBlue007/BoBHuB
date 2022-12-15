import styled from 'styled-components';
import { Avatar, Typography, Rating, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { useEffect, useState } from 'react';
import TextArea from "./TextArea"
import { commentStateType } from '../types/Type';

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ListContainer = styled(FlexContainer)`
  height: 150px;
  box-shadow: 2px 2px 2px gray;
  width: 50vw;
  border-radius: 10px;
  background-color: crimson;
  position: relative;
  margin: 15px;
`;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 3;
  color: white;
  padding: 10px;

  & > article {
    margin: 10px 0;
  }

  .buttonWrap {
    display: flex;
    width: 175px;
    justify-content: space-between;
    position: absolute;
    right: 20px;
    top: 15px;
  }
`;

const AvatarContainer = styled(FlexContainer)`
  flex: 1;
  justify-content: center;
`;

const CustomButton = styled(Button)`
  width: 80px;
`;


interface CommentListProps {
  commentProp : commentStateType;
  setCommentState : React.Dispatch<React.SetStateAction<commentStateType[]>>;
}

const CommentList = ({
  commentProp: { commentId, userId, shopId, content, star }, setCommentState
}: CommentListProps) => {
  const [canRevise ,setRevise] = useState<boolean>(false);
  const [canReadOnly, setReadOnly] = useState<boolean>(true);
  const [commentStar, setCommentStar] = useState<number|null>(star);

  const handleRevise = (e:React.MouseEvent<HTMLButtonElement>) =>{
    setRevise(true);
    setReadOnly(false);
  }

  const ratingChange = (e:React.SyntheticEvent, newValue:number|null) => setCommentStar(newValue);

  const deleteComment = (e:React.MouseEvent<HTMLButtonElement>) =>{
    

  }

  return (
    <>
      <ListContainer>
        <AvatarContainer>
          <Avatar alt="Remy Sharp" src="/img/chickfood.jpg" sx={{ width: 55, height: 50 }} />
        </AvatarContainer>
        <ContentContainer>
          <Typography component="legend">{userId}</Typography>
          <Rating name="read-only" value={commentStar} readOnly={canReadOnly} onChange={ratingChange}/>
          <TextArea content={content} canRevise={canRevise} setRevise={setRevise} setReadOnly={setReadOnly}/>
          <div className="buttonWrap">
            <CustomButton
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<CreateIcon />}
              onClick={handleRevise}>
              수정
            </CustomButton>
            <CustomButton variant="contained" color="error" size="small" onClick={deleteComment} data-id={commentId} startIcon={<DeleteIcon />}>
              삭제
            </CustomButton>
          </div>
        </ContentContainer>
      </ListContainer>
    </>
  );
};

export default CommentList;
