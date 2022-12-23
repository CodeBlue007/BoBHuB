import * as API from '../../api/API';
import { postCommentType,postPartyType} from './types/Type';

const baseURL =``;

export const getComment = async (shopId:number) => await API.get(`/api/comments?shopId=${shopId}`);

export const getShop = async (shopId:number) =>  await API.get(`/api/shops/${shopId}`);

export const getMenu = async (shopId:number) => await API.get(`/api/food?shopId=${shopId}`);

export const postComment = async(comment:postCommentType) => {
    const res = API.post("/api/comments",comment);
    console.log(res);
}

export const patchComment = async(comment:postCommentType, commentId :number) => {
    const res = await API.patch(`/api/comments/${commentId}`,comment);
    console.log(res);
}

export const deleteComment = async (commentId:number) => {
    const res = await API.delete(`/api/comments/${commentId}`);
    console.log(res);
}

export const getParties = async () => await API.get(`/api/parties`);

export const postParty = async (party: postPartyType) => {
    const message = await API.post(`/api/parties`, party);
    console.log(message);
  };
