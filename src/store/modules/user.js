import { login, logout, getInfo } from "@/api/login/user";
import { getToken, setToken, removeToken } from '@/utils/token'
import { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name:'',
    introduction:'',
    roles:[],
    routes:{}
}

const mutations = {
    SET_TOKEN:(state, token) => {
        state.token = token;
    }, 
    SET_INTRODUCTION:(state, introduction) => {
        state.introduction = introduction;
    },
    SET_NAME:(state, name) => {
        state.name = name;
    },
    SET_ROLES:(state, roles) => {
        state.roles = roles;
    },
    SET_ROUTES:(state, routes) => {
        state.routes = routes;
    },  
}

const actions = {
    // user login
    login({commit}, userInfo){
        // debugger
        const {username, password} = userInfo;
        return new Promise((resolve, reject) => {
            login({username:username, password:password}).then(response => {
                const { data } = response;
                // console.log('data' , data);
                commit('SET_TOKEN',data.token);
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({commit, state}){
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response;

                if(!data){
                    reject('Verification failed, please Login again.');
                }
                const {roles, name, introduction, routes} = data;

                if(!roles || roles.length <= 0){
                    reject('getInfo: roles must be a non-null array!');
                }
                commit('SET_ROLES', roles);
                commit('SET_NAME', name);
                commit('SET_INTRODUCTION', introduction);
                commit('SET_ROUTES', routes);
                resolve(data)
            }).catch(error => {
                reject(error);
            })
        })
    },

    // user logout
    logout({commit, state, dispatch}){
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '');
                commit('SET_ROLES', []);
                removeToken();
                resetRouter();
                // 重置已访问视图和缓存视图
                // dispatch('tagsView/delAllViews', null, {root:true});

                resolve()
            }).catch(error => {
                reject(error);
            })
        })
    },

    // remove token
    resetToken({commit}){
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve();
        })
    }

}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}