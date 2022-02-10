import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { Types as TypesUser } from './user/user';
import * as funcionesUser from './user/funciones';

function* sagas() {
  yield all([
    /** Funciones user */
    takeEvery(TypesUser.REQUEST_VERIFICAR_TOKEN, funcionesUser.verificarToken),
    takeEvery(TypesUser.REQUEST_VERIFICAR_EMAIL, funcionesUser.verificarEmail),
    takeEvery(TypesUser.REQUEST_TOKEN, funcionesUser.getTokenInStorage),
    takeEvery(TypesUser.REQUEST_LOGIN, funcionesUser.login),
    takeEvery(TypesUser.REQUEST_LOGOUT, funcionesUser.logout),
    takeEvery(TypesUser.REQUEST_UPDATE_PERFIL, funcionesUser.update),
    takeEvery(TypesUser.REQUEST_CHANGE_IMAGE_PERFIL, funcionesUser.changeImagePerfil),
    takeEvery(TypesUser.REQUEST_PERFIL, funcionesUser.getPerfil),
  ]);
}

export default sagas;