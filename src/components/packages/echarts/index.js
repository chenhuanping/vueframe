import AlPie from './pie/al-pie'
import AlScatter from './scatter/al-scatter'
import AlBarLine from './bar-line/al-bar-line'
import AlMap from './map/al-map'

const components = [
    AlPie,
    AlScatter,
    AlBarLine,
    AlMap
]

components.map(component => {
    // 为组件添加 install 方法，用于按需引入
    component.install = function(Vue){
        Vue.component(component.name, component);
    }
})

export default {
    ...components
}
    
