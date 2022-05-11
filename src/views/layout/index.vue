<template>
     <div class="master" style="min-height:100%">
        <Header/>
        <el-container style="display:flex">
           <Nav/> 
           <el-main>
                <router-view></router-view>
            </el-main>
        </el-container > 
        <Footer/>
     </div>
</template>

<script>
import Header from '../../components/Header/index.vue'
import Nav from '../../components/Menu/index.vue'
import Footer from '../../components/Footer/index.vue'

export default {
    data(){
        return{}
    },
    components:{
        Header,
        Nav,
        Footer
    }
}
</script>

<style lang="scss" scoped>
.el-main {
  background-color: #E9EEF3;
  color: #333;
  flex: 1;
  padding: 0;
}
.master{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

</style>