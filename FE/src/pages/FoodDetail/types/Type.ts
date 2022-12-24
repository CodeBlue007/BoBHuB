
type stringNull = string|null;
type numberNull = number|null;


export interface postCommentType{
    shopId?: number;
    content: string;
    star: numberNull;
}

export interface commentStateType extends postCommentType{
    userId : number;
    commentId: number;
    createdAt : stringNull;
    updatedAt : stringNull;
    deletedAt : stringNull;
    nickname : string;
    profile : stringNull;
}

export type shopStateType = {
    "shopId" : number;
    "category" : string;
    "name" : string;
    "distance" : number;
    "address": string;
    "menu": stringNull;
    "shopPicture": stringNull;
    "like" : number;
    "description" : string;
    "createdAt" : stringNull;
    "updatedAt" : stringNull;
    "deletedAt" : stringNull;   
}

export type menuStateType = {
    foodId : number;
    shopId : number;
    picture : string|null;
    name : string;
    price : number;
    createdAt : stringNull;
    updatedAt : stringNull;
    deletedAt : stringNull;   
}

export type postPartyType = {
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
    deletedAt : '',
}