import axios from 'axios';
import { response } from 'express';

const instance = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
});

instance.defaults.withCredentials = true;

type errorType = Error|string;

const errCheck = (err :errorType) => {
    let message;
    if(err instanceof Error) message = err.message;
    else message = String(err);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${message}`);
}

const get = async (url = "") => {
    try {
        const { data } = await instance.get(url);
        return data;
    } catch (err:any) {
        errCheck(err);
    }
};

const del = async (url = "") => {
    try {
        const { data } = await instance.delete(url);
        return data;
    } catch (err:any) {
        errCheck(err);
    }
};

const post = async (url = "", post: {}) => {
    try {
        const result = await instance.post(url, post);
        console.log(result);
        return result.data;
    } catch (err:any) {
        errCheck(err);
    }
};

const patch = async (url = "", patch: {}) => {
    try {
        const { data } = await instance.patch(url, patch);
        return data;
    } catch (err:any) {
        errCheck(err);
    }
}

export { get, del as delete, post, patch };