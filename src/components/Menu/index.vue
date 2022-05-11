<template>
    <el-aside width="200px" style="overflow-x: hidden">
        <el-menu
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            active-text-color="#0080CD"
            router   
        >
            <el-submenu :index="items.id" v-for="items in newMenus" :key="items.id">
                <template slot="title" v-if="items.children.length == 0">
                     <el-menu-item :index="items.url" >{{items.name}}</el-menu-item>                   
                </template>
                 <template slot="title" v-if="items.children.length !== 0">
                    <span slot="title">{{items.name}}</span>           
                </template>
                  <template v-if="items.children.length !== 0">
                    <el-submenu :index="child.children.length == 0 ? child.url :child.id" :key="child.id" v-for="child in items.children">
                        <template slot="title">{{child.name}}</template>
                        <template v-if="child.children.length !== 0">
                            <el-menu-item  :index="`${item.url}`" v-for="item in child.children" :key="item.id">{{item.name}}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>      
            </el-submenu> 
        </el-menu>
    </el-aside>
</template>

<script>

import { convert } from '../../utils/objectProces'
export default {
    data(){
        return{
            navList:this.$store.state.user.routes.menu,
            
        }
    },
    mounted(){

    },
    computed:{
      
        newMenus:function(){
            const res = convert(this.navList);
            return res;
        }
    }
}
</script>

<style lang="scss" scoped>
.el-aside {
    color: #333;
    text-align: center;
}
.el-menu{
    width: 100%;
    border: 0;
    /deep/.el-submenu__title{
        padding-left: 0 !important;
        padding: 0 20px 0 0;
    }
}
</style>