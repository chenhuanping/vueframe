const getters = {
    token: state => state.user.token,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    routes: state => state.user.routes,
}

export default getters