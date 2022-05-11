import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex);
// https://webpack.js.org/guides/dependency-management/#requirecontext
// 使用webpack的require.context()处理modules文件夹的文件
const modulesFiles = require.context('./modules', true, /\.js$/);

// 不需要引入  import app from './modules/user  他会引入所有的vuex modules 文件
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // "./user.js" => "app"
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {})

const store = new Vuex.Store({
    modules,
    getters
})

export default store;