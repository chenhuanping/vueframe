// import Vue from 'vue'

import Altitle from "./al-title";
import AlTinymce from "./al-tinymce";

import AlPie from './echarts/pie/al-pie'
import AlScatter from './echarts/scatter/al-scatter'
import AlBarLine from './echarts/bar-line/al-bar-line'
import AlMap from './echarts/map/al-map'
const components = [
    Altitle,
    AlTinymce,
    AlPie,
    AlScatter, 
    AlBarLine,
    AlMap
]

  // 定义 install 方法
const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    // 遍历并注册全局组件
    components.map(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    // 导出的对象必须具备一个 install 方法
    install,
    // 组件列表
    ...components
}