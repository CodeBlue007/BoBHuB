import * as API from '../../../api/API';
import { PostEmail, PostEmailCode } from '../types/regType';

// 인증 메일 전송 api 요청
const postEmail = async (regEmail: PostEmail) => {
  const resEmail = await API.post('api/utils/email/send-code', regEmail);
  return resEmail;
};

// 이메일 인증 코드 api 요청
const postEmailCode = async (regEmailCode: PostEmailCode) => {
  const resEmailCode = await API.post('api/utils/email/check-code', regEmailCode);
  return resEmailCode;
};

export { postEmail, postEmailCode };
