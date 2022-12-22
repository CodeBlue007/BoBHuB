
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
    picture : string;
    name : string;
    price : number;
}
