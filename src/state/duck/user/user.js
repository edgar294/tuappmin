import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
    requestVerificarToken: null,
    requestVerificarEmail: ['user'],
    requestLogin: ['user'],
    requestUpdatePerfil: ['user'],
    requestPerfil: null,
    requestChangeImagePerfil: ['image'],
    saveTokenFirebase: ['data'],
    authenticateUser: ['auth'],
    updatePerfil: ['auth'],
    changeImagePerfil: ['image'],
    requestToken: null,
    requestLogout: null,
    closeSession: null,
    setStatus: ['data'],
    clearStatus: null
}, {});

const INITIAL_STATE = [
    isAuthenticated = false,
    user = {
        
    },
    avatar = null,
    token = null,
    message = null,
    status = null,
    token_firebase = null,
    residencias = []
];

const add = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isAuthenticated: true,
        user: action.auth.user,
        avatar: action.auth.user.avatar,
        residencias: action.auth.residencias,
        token: action.auth.token,
    }
}

const update = (state = INITIAL_STATE, action) => {    
    return {
        ...state,
        user: action.auth.user
    }
}

const changeImagePerfil = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        avatar: action.image,
    }
}

const setStatus = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        status: action.data.status,
        message: action.data.message
    }
}

const clearStatus = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        status: null,
        message: null
    }
}

const closeSession = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isAuthenticated: false,
        user: {},
        token: null,
        status: null,
        message: null,
    };
}

const saveTokenFirebase = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        token_firebase: action.data
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.AUTHENTICATE_USER]: add,
    [Types.UPDATE_PERFIL]: update,
    [Types.CHANGE_IMAGE_PERFIL]: changeImagePerfil,
    [Types.CLOSE_SESSION]: closeSession,
    [Types.SET_STATUS]: setStatus,
    [Types.CLEAR_STATUS]: clearStatus,
    [Types.SAVE_TOKEN_FIREBASE]: saveTokenFirebase,
});
