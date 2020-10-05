import axios from 'axios';
const URL_API = '/api/v1';

export const getDataFromApi = async () => {
    try {
        return await axios.get(URL_API + '/bootcamps');
    } catch (err) {
        console.log(err);
    }
}

export const userLogin = async (email, password) => {
    try {
        return await axios.post(URL_API + '/auth/login', {
            email: email,
            password: password
        })
    } catch (err) {
        console.log(err);
    }
}