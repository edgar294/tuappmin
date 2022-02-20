import { call, put, select } from 'redux-saga/effects';
import { Creators } from './user';
import * as userSelectors from './selector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    requestLogin, requestLogout, requestUpdate,
    requestChangeImagePerfil,
    requestRegistro, requestVerificarToken,
    requestVerificarEmail, requestPerfil
} from './servicios';

export function* verificarToken() {
    try {
        const token = yield select(userSelectors.getTokenSelector);
        var request = yield call(requestVerificarToken, token);
        if(request.data.status == 'Token is Expired' || request.data.status == 'Authorization Token not found'){
            yield call(deleteTokenInStorage);
            yield put(Creators.closeSession());
        }        

    } catch (error) {
        console.log(error)
    }

    yield put(Creators.clearStatus());
}

export function* verificarEmail(data) {
    try {
        var request = yield call(requestVerificarEmail, data.user);
        
        if(request.data.user == 0){
            yield put(Creators.setStatus({ status: 'info', message: 'Usuario no registrado' }));
        }
        else if(request.data.user == 1){
            yield put(Creators.setStatus({ status: 'info', message: 'Usuario registrado' }));
        }

    } catch (error) {
        console.log(error)
    }

    yield put(Creators.clearStatus());
}

storeToken = async (data) => {
    try {
        await AsyncStorage.setItem('@token_tuappmin', JSON.stringify(data));
    } catch (e) {
        console.log(`No puedo almacenar el token ${e}`)
    }
}

getToken = async () => {
    try {
        //await AsyncStorage.removeItem('@token_tuappmin');
        const value = await AsyncStorage.getItem('@token_tuappmin')
        if (value !== null) {
            return value
        }
    } catch (e) {
        console.log(`El token no existe ${e}`)
    }
}

deleteTokenInStorage = async () => {
    try {
        await AsyncStorage.removeItem('@token_tuappmin');
    } catch (e) {
        console.log(`No puedo eliminar el token del storage`, error);
    }
}

export function* getTokenInStorage() {
    try {
        const store = yield call(getToken)
        //console.log('store', store)
        if (store) {
            const data = JSON.parse(store);
            yield put(Creators.authenticateUser(data))
        }

    } catch (error) {
        //yield put(Creators.hasError('No se puede recuperar el token'));
    }
}

export function* login(data) {
    try {
        var request = yield call(requestLogin, data.user);
        
        if(data.user.email){
            if (request.status == 200) {
                yield put(Creators.setStatus({ status: 'warning', message: request.data.error }));
            } else {
            //} else (request.status == 201) {
                const store = {
                    token: request.data.token,
                    user: request.data.user,
                    residencias: request.data.residencias
                };
                
                yield call(storeToken, store);
                yield put(Creators.authenticateUser(request.data));
            } /*else{
                yield put(Creators.setStatus({ status: 'error', message: 'Error de solicitud. Intentalo de nuevo.' }));
            }*/
        }        
    } catch (error) {
        yield put(Creators.setStatus({ status: 'error', message: `No se ha podido iniciar sesión` }));
    }
    yield put(Creators.clearStatus());
}

export function* logout() {
    try {
        const token = yield select(userSelectors.getTokenSelector);
        const token_firebase = yield select(userSelectors.getTokenFirebaseSelector);
        var request = yield call(requestLogout, token, token_firebase);

        yield call(deleteTokenInStorage);
        yield put(Creators.closeSession());
    } catch (error) {
        console.log("Error al cerrar la sesión", error);
    }
    yield put(Creators.clearStatus());
}

export function* update(data) {
    try {
        const token = yield select(userSelectors.getTokenSelector);
        var request = yield call(requestUpdate, token, data);

        if (request.status == 200) {
            yield put(Creators.setStatus({ status: 'warning', message: request.data.error }));
        } else if (request.status == 201) {
            const auth = {
                user: request.data.data.user,
                informacion: request.data.data.informacion,
                cuenta: request.data.data.cuenta,
                profesiones: request.data.data.profesiones,
                especialidades: request.data.data.especialidades 
            }
    
            yield put(Creators.updatePerfil(auth));
    
            const store = {
                token: token,
                user: request.data.data.user,
                informacion: request.data.data.informacion,
                cuenta: request.data.data.cuenta,
                profesiones: request.data.data.profesiones,
                especialidades: request.data.data.especialidades
            };
    
            yield call(storeToken, store);

            yield put(Creators.setStatus({ status: 'info', message: request.data.data.message }));
        }
        else{
            yield put(Creators.setStatus({ status: 'error', message: 'Error de solicitud. Intentalo de nuevo.' }));
        }
    } catch (error) {
        console.log("Error", error);
        yield put(Creators.setStatus({ status: 'error', message: `No se ha podido actualizar el perfil` }));
    }
    yield put(Creators.clearStatus());
}

export function* changeImagePerfil(data) {
    try {
        const token = yield select(userSelectors.getTokenSelector);

        const userData = {
            image: data.image.imageURL,
            name: data.image.name
        };        

        const request = yield call(requestChangeImagePerfil, token, userData);

        if(request.status == 201){
            yield put(Creators.changeImagePerfil(request.data.data.avatar));

            var store = yield call(getToken)
            if (store) {
                var data = JSON.parse(store);
                data.user.avatar = request.data.data.avatar;
            }        
    
            yield call(storeToken, data);
            
            yield put(Creators.setStatus({ status: 'info', message: request.data.data.message }));
        }
        else{
            yield put(Creators.setStatus({ status: 'error', message: `No se pudo modificar la foto` }));
        } 

    } catch (error) {
        console.log("No se pudo actualizar la imagen de perfil", error.message);
        yield put(Creators.setStatus({ status: 'error', message: 'No se pudo modificar la foto' }));
    }
    yield put(Creators.clearStatus());
}

export function* getPerfil() {
    try {
        const token = yield select(userSelectors.getTokenSelector);
        var request = yield call(requestPerfil, token);
        
        if (request.status == 200) {
            yield put(Creators.setStatus({ status: 'warning', message: request.data.error }));
        } else if (request.status == 201) {
            const store = {
                token: token,
                user: request.data.user,
                informacion: request.data.informacion,
                cuenta: request.data.cuenta,
                profesiones: request.data.profesiones,
                especialidades: request.data.especialidades
            };

            yield call(storeToken, store);
            yield put(Creators.authenticateUser(store));
        }
        else{
            yield put(Creators.setStatus({ status: 'error', message: 'Error de solicitud. Intentalo de nuevo.' }));
        }      
    } catch (error) {
        yield put(Creators.setStatus({ status: 'error', message: `No se ha podido recuperar la información` }));
    }
    yield put(Creators.clearStatus());
}