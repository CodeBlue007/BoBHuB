import { FcLike } from 'react-icons/fc';
import { FcLikePlaceholder } from 'react-icons/fc';
import styled from 'styled-components';

interface LikeProps {
  like: boolean;
  onClick: () => void;
}

const HeartContainer = styled.div`
  align-items: right;
`;

const HeartButton = ({ like, onClick }: LikeProps) => {
  return (
    <HeartContainer onClick={onClick}>
      {like ? <FcLike size={50} /> : <FcLikePlaceholder size={50} />}
    </HeartContainer>
  );
};

export default HeartButton;
