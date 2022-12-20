import axios from 'axios';

const token = '';
const instance = axios.create({
    baseURL: `http://localhost:4000`,
    //http://localhost:5000/api
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem(token)}`
    }
});

//instance.defaults.headers.common['Authorization']=token;

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

const post = async (url = "", post: [] | {}) => {
    try {
        const { data } = await instance.post(url, post);
        return data;
    } catch (err) {
        console.error(err);
    }
};

const patch = async (url = "", patch: [] | {}) => {
    try {
        const { data } = await instance.patch(url, patch);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export { get, del as delete, post, patch };