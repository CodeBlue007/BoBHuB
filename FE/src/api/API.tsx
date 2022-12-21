import axios from 'axios';
import { response } from 'express';

const instance = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
});

instance.defaults.withCredentials = true;

const get = async (url = "") => {
    try {
        const { data } = await instance.get(url);
        return data;
    } catch (err) {
        console.error(err);
    }
};

const del = async (url = "") => {
    try {
        const { data } = await instance.delete(url);
        return data;
    } catch (err) {
        console.error(err);
    }
};

const post = async (url = "", post: {}) => {
    try {
        const result = await instance.post(url, post);
        console.log(result);
        return result.data;
    } catch (err) {
        console.error(err);
    }
};

const patch = async (url = "", patch: {}) => {
    try {
        const { data } = await instance.patch(url, patch);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export { get, del as delete, post, patch };