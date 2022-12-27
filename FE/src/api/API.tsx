import axios from 'axios';

const instance = axios.create();

instance.defaults.withCredentials = true;
instance.defaults.headers['Content-Type'] = 'application/json';

const errCheck = (err: unknown) => {
  let message;
  if (err instanceof Error) message = err.message;
  else message = String(err);
  console.error(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${message}`);
};

const get = async (url = '') => {
  try {
    const { data } = await instance.get(url);
    return data;
  } catch (err: unknown) {
    errCheck(err);
  }
};

const del = async (url = '') => {
  try {
    const { data } = await instance.delete(url);
    return data;
  } catch (err: unknown) {
    errCheck(err);
  }
};

const post = async (url = '', post: {}, config: 'imgPost' | null = null) => {
  try {
    if (config === 'imgPost') {
      const result = await instance.post(url, post, {
        headers: { 'Content-Type': `multipart/form-data` },
      });
      return result.data;
    }
    const result = await instance.post(url, post);
    console.log(result);
    return result.data;
  } catch (err: unknown) {
    errCheck(err);
  }
};

const patch = async (url = '', patch: {}) => {
  try {
    const { data } = await instance.patch(url, patch);
    return data;
  } catch (err: unknown) {
    errCheck(err);
  }
};

export { get, del as delete, post, patch };
