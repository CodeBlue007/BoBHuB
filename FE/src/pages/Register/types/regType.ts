export interface regFormProps {
  onRegSubmit: (regForm: {
    name: string;
    nickname: string;
    email: string;
    emailCode: string;
    password: string;
    passwordCheck: string;
    phone: string;
    track: string;
    generation: string;
  }) => void;
}

export type regReqType = {
  track: string;
  generation: string;
  name: string;
  email: string;
  nickname: string;
  password: string;
  phone: string;
};

export type PostEmail = {
  email: string;
};

export type PostEmailCode = {
  email: string;
  emailCode: string;
};
