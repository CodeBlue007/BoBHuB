import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { MessageInfo } from '../../../store/chatSlice';
import { RootState } from '../../../store/store';

const TextLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;
`;

const TextRight = styled(TextLeft)`
  justify-content: flex-end;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextBlock = styled.span`
  display: inline-block;
  background-color:${({theme})=>theme.colors.main};
  color: ${({theme})=>theme.font.color.black};
  font-size: 15px;
  padding: 8px;
  margin: 5px;
  border-radius: 12px;
  max-width: 172px;
  word-break: break-all;
`;

interface ChatMessageProps {
  messageInfo: MessageInfo;
}

const ChatMessage = ({ messageInfo: { userId, userName, message } }: ChatMessageProps) => {
  const currentUserId = useSelector<RootState>((state) => state.userReducer.currentUser.userId);

  return (
    <>
      {userId !== currentUserId ? (
        <TextLeft>
          <TextWrapper>
            {userId !== 0 && userId !== currentUserId && (
              <span className="labelName">{userName}</span>
            )}
            {<TextBlock>{message}</TextBlock>}
          </TextWrapper>
        </TextLeft>
      ) : (
        <TextRight>
          <TextWrapper>
            {userId !== 0 && userId !== currentUserId && (
              <span className="labelName">{userName}</span>
            )}
            {<TextBlock>{message}</TextBlock>}
          </TextWrapper>
        </TextRight>
      )}
    </>
  );
};

export default ChatMessage;
