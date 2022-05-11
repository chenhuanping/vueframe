import AlTinymce from './src/al-tinymce.vue'

// 为组件添加 install 方法，用于按需引入
AlTinymce.install = function(Vue){
    Vue.component(AlTinymce.name, AlTinymce);
}

export default AlTinymce