import axios from 'axios';

const get = async (baseURL: string, params = "") => {
    const result = await axios.get(`${baseURL}/${params}`)
    return result.data;
};

const del = async (baseURL: string, params = "") => {
    const result = await axios.delete(`${baseURL}/${params}`);
}
export { get, del as delete };