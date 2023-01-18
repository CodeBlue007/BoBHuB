import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../store/store';
import { MessageInfo } from '../chatAppApi';

const OtherMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;
`;

const MyMessage = styled(OtherMessage)`
  justify-content: flex-end;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextBlock = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.font.color.black};
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
        <OtherMessage>
          <TextWrapper>
            {userId !== 0 && userId !== currentUserId && (
              <span className="labelName">{userName}</span>
            )}
            {<TextBlock>{message}</TextBlock>}
          </TextWrapper>
        </OtherMessage>
      ) : (
        <MyMessage>
          <TextWrapper>
            {userId !== 0 && userId !== currentUserId && (
              <span className="labelName">{userName}</span>
            )}
            {<TextBlock>{message}</TextBlock>}
          </TextWrapper>
        </MyMessage>
      )}
    </>
  );
};

export default ChatMessage;
