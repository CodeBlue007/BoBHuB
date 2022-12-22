export interface regFormProps {
  onRegSubmit: (regForm: {
    name: string;
    nickName: string;
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
  nickName: string;
  password: string;
  phone: string;
  //   role: string;
};

// export type regForm = {
//   name: string;
//   nickName: string;
//   password: string;
//   passwordCheck: string;
//   phone: string;
//   email: string;
//   confirmNum: string;
//   track: string;
// generation: number;
// generation: string;
// };
