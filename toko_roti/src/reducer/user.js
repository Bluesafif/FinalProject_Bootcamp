let defaultState = {
    id: 0,
    users: [{
        username: "admin",
        password: "admin",
    }]
}
// combineReducer
const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "REGISTER":
            let newData = {
                id: state.id++,
                username: action.payload.username,
                password: action.payload.password,
                phone: action.payload.phone,
                email: action.payload.email,
                role: "Umum",
            }
            let data = {}
            if (state.users.length === 0) {
                data = state.users.concat(newData)
                data = state.users.concat(newData)
            } else {
                data = state.users.concat(newData)
            }
            console.log(data)
            return {
                users: data
            }

        case "CLEAR_DATA":
            return defaultState

        default:
            return state
    }

}

export default userReducer