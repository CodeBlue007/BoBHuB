import styled from 'styled-components';
import { Avatar, Typography, Rating, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { useCallback, useState } from 'react';
import TextArea from './TextArea';
import { commentStateType } from '../types/Type';
import { FlexContainer } from '../../../styles/GlobalStyle';
import { deleteComment } from '../foodDetailApi';
import type { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

const ListContainer = styled(FlexContainer)`
  height: 150px;
  box-shadow: 2px 2px 2px gray;
  width: 50vw;
  border-radius: 10px;
  background-color: #ffd5af;
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

interface CommentList {
  commentProp: commentStateType;
  updateCommentState: () => void;
}

const CommentList = ({
  commentProp: { commentId, userId, content, star, profile, nickname },
  updateCommentState,
}: CommentList) => {
  const [canRevise, setRevise] = useState<boolean>(false);
  const [canReadOnly, setReadOnly] = useState<boolean>(true);
  const [commentStar, setCommentStar] = useState<number | null>(star);
  const loginUserId = useSelector<RootState>((state) => state.userReducer.currentUser.userId);

  console.log(loginUserId);

  const handleRevise = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRevise(true);
    setReadOnly(false);
  };

  const ratingChange = (e: React.SyntheticEvent, newValue: number | null) =>
    setCommentStar(newValue);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const commentId = Number(e.currentTarget.dataset.id);
    deleteComment(commentId);
    updateCommentState();
  };

  const updateRevise = useCallback((bool: boolean) => {
    setRevise(bool);
  }, []);

  const updateReadOnly = useCallback((bool: boolean) => {
    setReadOnly(bool);
  }, []);

  const userProfile = profile === null ? undefined : profile;

  return (
    <>
      <ListContainer>
        <AvatarContainer>
          <Avatar alt="userProfile" src={userProfile} sx={{ width: 55, height: 50 }} />
        </AvatarContainer>
        <ContentContainer>
          <Typography component="legend">{nickname}</Typography>
          <Rating
            name="read-only"
            value={commentStar}
            readOnly={canReadOnly}
            onChange={ratingChange}
          />
          <TextArea
            commentId={commentId}
            commentStar={commentStar}
            content={content}
            canRevise={canRevise}
            updateRevise={updateRevise}
            updateReadOnly={updateReadOnly}
          />
          {userId === loginUserId && (
            <div className="buttonWrap">
              <CustomButton
                variant="contained"
                color="info"
                size="small"
                startIcon={<CreateIcon />}
                onClick={handleRevise}>
                수정
              </CustomButton>
              <CustomButton
                variant="contained"
                color="error"
                size="small"
                data-id={commentId}
                onClick={handleDelete}
                startIcon={<DeleteIcon />}>
                삭제
              </CustomButton>
            </div>
          )}
        </ContentContainer>
      </ListContainer>
    </>
  );
};

export default CommentList;
