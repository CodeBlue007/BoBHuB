import type { NullableNum, ProfilerProps } from './foodDetailType';

export const canWriteComment = (isLogin: boolean, content: string, starValue: NullableNum) => {
  if (!isLogin) {
    alert('로그인을 해주세요');
    return true;
  }
  if (content === '') {
    alert('댓글을 입력해주세요.');
    return true;
  }
  if (starValue === null) {
    alert('별점을 입력해주세요.');
    return true;
  }
  return false;
};

export const onRender = (
  id: string,
  phase: string,
  actualTime: number,
  baseTime: number,
  startTime: number,
  commitTime: number,
) => console.table({ id, phase, actualTime, baseTime, startTime, commitTime });
