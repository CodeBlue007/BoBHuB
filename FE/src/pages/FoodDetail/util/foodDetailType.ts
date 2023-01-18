export type NullableString = string | null;
export type NullableNum = number | null;

export interface PostComment {
  shopId?: number;
  content: string;
  star: NullableNum;
}

export interface CommentState extends PostComment {
  userId: number;
  commentId: number;
  createdAt: NullableString;
  updatedAt: NullableString;
  deletedAt: NullableString;
  nickname: string;
  profile: NullableString;
}

export type ShopState = {
  shopId: number;
  category: string;
  name: string;
  distance: number;
  address: string;
  menu: NullableString;
  shopPicture: NullableString;
  like: number;
  description: string;
  createdAt: NullableString;
  updatedAt: NullableString;
  deletedAt: NullableString;
};

export type MenuState = {
  foodId: number;
  shopId: number;
  picture: NullableString;
  name: string;
  price: number;
  createdAt: NullableString;
  updatedAt: NullableString;
  deletedAt: NullableString;
};

export type PostParty = {
  shopId: number;
  timeLimit: number;
  partyLimit: number;
};

export const initialShopState = {
  shopId: 0,
  category: '',
  name: '',
  distance: 0,
  address: '',
  menu: '',
  shopPicture: '',
  like: 0,
  description: '',
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
};
