import { BASE_URL } from '../constants';
import axios from 'axios';

export const requestVerificarToken = async (token) => {
    return axios
        .get(`${BASE_URL}/api/auth/verificar-token`, {
            headers: {
                Authorization: 'Bearer' + token,                
            }
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
};

export const requestVerificarEmail = async (user) => {
    return axios
        .get(`${BASE_URL}/api/auth/verificar-email`, {
            params: user
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
};

export const requestLogin = async user => {
    return axios
        .post(`${BASE_URL}/api/auth/login`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
};

export const requestLogout = (token, token_firebase) => {
    return axios.post(`${BASE_URL}/api/auth/logout`, {
        token,
        token_firebase
    },
        {
            headers: {
                Authorization: 'Bearer' + token,
            }
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
}

export const requestUpdate = (token, data) => {
    return axios.post(`${BASE_URL}/api/perfil/update`, data.user,
        {
            headers: {
                Authorization: 'Bearer' + token,
            }
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
}

export const requestChangeImagePerfil = async (token, data) => {
    return axios.post(`${BASE_URL}/api/perfil/update_avatar`, data,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer' + token,
            }
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
}

export const requestPerfil = (token) => {
    return axios.get(`${BASE_URL}/api/perfil/get_perfil`,
        {
            headers: {
                Authorization: 'Bearer' + token,
            }
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
}