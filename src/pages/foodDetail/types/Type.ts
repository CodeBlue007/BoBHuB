
export type commentStateType = {
    commentId: number;
    userId: number;
    shopId: number;
    content: string;
    star: number|null;
}


export type shopStateType = {
    "shopId" : number;
    "category" : string;
    "name" : string;
    "distance" : number;
    "address": string;
    "menu": string;
    "shopPicture": string;
    "like" : number;
    "description" : string;
    "createdAt" : string;
    "updatedAt" : string;
}