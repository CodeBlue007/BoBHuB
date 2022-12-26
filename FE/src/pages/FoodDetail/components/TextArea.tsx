import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { patchComment } from '../foodDetailApi';
import { NullableNum } from '../util/Type';

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  background-color: crimson;
  width: 60px;
  font-size: 10px;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: black;
  }
`;
const CommentArea = styled.textarea`
  margin-top: 10px;
  padding: 10px;
  background-color: #fcf3eb;
  border-radius: 10px;
  color: darygray;
  border: none;
  border-bottom: 1px solid white;
  box-sizing: border-box;
  font-size: 13px;
  height: 55px;
  resize: none;

  &:focus {
    outline: none;
  }

  &:disabled {
    font-weight: bold;
    color: '#1E1F21';
    border: none;
  }
`;

interface TextAreaProps {
  commentId: number;
  commentStar: NullableNum;
  content: string;
  canRevise: boolean;
  updateRevise: (x: boolean) => void;
  updateReadOnly: (x: boolean) => void;
}

const TextArea = ({
  commentId,
  commentStar,
  content,
  canRevise,
  updateRevise,
  updateReadOnly,
}: TextAreaProps) => {
  const [textValue, setTextValue] = useState<string>(content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const reviseEnd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (textValue === '') {
      alert('댓글을 입력해주세요');
      return;
    }
    if (commentStar === null) {
      alert('별점을 입력해주세요');
      return;
    }
    const reviseComment = {
      star: commentStar,
      content: textValue,
    };

    await patchComment(reviseComment, commentId);
    updateRevise(false);
    updateReadOnly(true);
  };

  return (
    <TextContainer>
      <CommentArea value={textValue} onChange={handleChange} disabled={!canRevise} />
      {canRevise && <Button onClick={reviseEnd}>수정완료</Button>}
    </TextContainer>
  );
};

export default React.memo(TextArea);
