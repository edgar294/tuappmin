/** Obtenemos el token del ususario */
export const getTokenSelector = state => state.user.token

/** Obtenemos el status */
export const getStatusSelector = state => state.user.status

/** Obtenemos el message */
export const getMessageSelector = state => state.user.message

/** Obtenemos si el usuario esta authenticado */
export const getIsAuthenticatedSelector = state => state.user.isAuthenticated

/** Obtenemos los datos del usuario */
export const getUserSelector = state => state.user.user

export const getAvatarSelector = state => state.user.avatar

export const getTokenFirebaseSelector = state => state.user.token_firebase