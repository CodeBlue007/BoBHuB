/**
 * @description : UTC기준 시간을 한국시간으로 바꿔주고 마감시간 계산해주는 함수
 * @param createTime : 모임 생성 시간 party.createdAt
 * @param limitTime : 모임 모집 시간 party.timeLimit
 * @returns : ex) 오전 11:58
 */
export const getLimitTime = (createTime: string, limitTime: number) => {
  const date = new Date(createTime);
  const offset = new Date(createTime).getTimezoneOffset() * 60000;
  const dateOffset = new Date(date.getTime() - offset);
  const limit = new Date(
    dateOffset.setMinutes(dateOffset.getMinutes() + limitTime),
  ).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
  return limit;
};
