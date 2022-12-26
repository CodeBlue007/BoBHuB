type NullableString = string|null;
type UndefinedString = string|undefined;
type NullableDate = Date|null;

export interface Party{
    Id1 : number;
    address : string;
    avgStar : string;
    createdAt : string;
    deletedAt : NullableString;
    isComplete : number;
    likedNum : number;
    menu : UndefinedString;
    name : string;
    partyId : number;
    partylimit : number;
    shopId : number;
    shopPicture : UndefinedString;
    timeLimit : number;
    updatedAt : NullableString;
    userId : number;
 }