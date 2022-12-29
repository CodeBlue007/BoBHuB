import * as API from '../../api/API';
import { PostComment, PostParty } from './util/Type';

const baseURL = ``;

export const getComment = async (shopId: number) => await API.get(`/api/comments?shopId=${shopId}`);

export const getShop = async (shopId: number) => await API.get(`/api/shops/${shopId}`);

export const getMenu = async (shopId: number) => await API.get(`/api/food?shopId=${shopId}`);

export const postComment = async (comment: PostComment) => {
  try {
    const res = await API.post('/api/comments', comment);
    if (!res) throw new Error('이미 댓글을 작성하셨습니다.');
    return res;
  } catch (err) {
    alert(err);
  }
};

export const patchComment = async (comment: PostComment, commentId: number) => {
  const res = await API.patch(`/api/comments/${commentId}`, comment);
  console.log(res);
};

export const deleteComment = async (commentId: number) => {
  const res = await API.delete(`/api/comments/${commentId}`);
  console.log(res);
};

export const getParties = async () => await API.get(`/api/parties`);

export const postParty = async (party: PostParty) => {
  const message = await API.post(`/api/parties`, party);
  return message;
};
