import Altitle from './src/al-title'

// 为组件添加 install 方法，用于按需引入
Altitle.install = function(Vue){
    Vue.component(Altitle.name, Altitle);
}

export default Altitle;