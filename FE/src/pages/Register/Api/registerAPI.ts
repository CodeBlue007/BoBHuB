import { regReqType } from '../types/regType';
import axios from 'axios';

// api 로 POST 요청 (/endpoint 로, JSON 데이터 형태로 요청)
const postRegisterData = async (regData: regReqType) => {
  console.log(`POST 요청 데이터: ${JSON.stringify(regData)}`);

  //   try {
  //     // const { reqData } = await axios.post<regReqType>('http://localhost:3000/user/join', regData, {
  //     //   headers: {
  //     //     'Content-Type': 'application/json',
  //     //     Accept: 'application/json',
  //     //   },
  //     // });
  //     // console.log(JSON.stringify(reqData, null, 4));
  //     // return reqData;
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log('ERROR: ', error.message);
  //       return error.message;
  //     } else {
  //       console.log('unexpected error: ', error);
  //       return 'An unexpected error occurred';
  //     }
  //   }

  await axios
    .post('http://localhost:3000/user/join', regData)
    .then(() => console.log('post success'))
    .catch((error) => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        const status = error.response.status;
        if (status >= 500) {
          console.log('Internal Server Error');
        } else if (status >= 400) {
          console.log('Request Failed');
        } else if (status >= 200) {
          console.log('OK');
        }
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error', error.message);
      }
      //   console.log(error.config);
    });

  //   const res = await fetch(apiUrl, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //     },
  //     body: bodyData,
  //   });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  //   if (!res.ok) {
  //     const errorContent = await res.json();
  //     const { reason } = errorContent;

  //     throw new Error(reason);
  //   }
};

export default postRegisterData;
