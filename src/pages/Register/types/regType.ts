export interface regFormProps {
  onRegSubmit: (regForm: {
    name: string;
    id: string;
    nickName: string;
    password: string;
    passwordCheck: string;
    phone: string;
    email: string;
    confirmNum: string;
    track: string;
    generation: number;
  }) => void;
}

export type regReqType = {
  track: string;
  generation: number;
  name: string;
  email: string;
  nickName: string;
  password: string;
  phone: string;
  //   role: string;
};

// export type regForm = {
//   name: string;
//   id: string;
//   nickName: string;
//   password: string;
//   passwordCheck: string;
//   phone: string;
//   email: string;
//   confirmNum: string;
//   track: string;
//   generation: number;
// };
