let defaultState = {
    isLogin: false,
    dataUser: {
    }
}
// combineReducer
const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                isLogin: true,
                dataUser: {
                    idUser: action.payload.data.idUser,
                    passwordVal: action.payload.data.validasiPass,
                    username: action.payload.data.username,
                    role: action.payload.data.role,
                    status: action.payload.data.status
                }
            }

        case "LOGOUT_SUCCESS":
            return defaultState
        
        default:
            return state
    }

}

export default authReducer