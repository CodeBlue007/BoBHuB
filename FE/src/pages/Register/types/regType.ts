export interface regFormProps {
  onRegSubmit: (regForm: {
    name: string;
    nickname: string;
    email: string;
    confirmNum: string;
    password: string;
    passwordCheck: string;
    phone: string;
    track: string;
    // generation: number;
    generation: string;
  }) => void;
}

export type regReqType = {
  track: string;
  // generation: number;
  generation: string;
  name: string;
  email: string;
  nickname: string;
  password: string;
  phone: string;
  //   role: string;
};

// export type regForm = {
//   name: string;
//   nickname: string;
//   password: string;
//   passwordCheck: string;
//   phone: string;
//   email: string;
//   confirmNum: string;
//   track: string;
// generation: number;
// generation: string;
// };
