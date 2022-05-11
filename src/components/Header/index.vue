<template>
     <el-header>
       <div>
         <!-- <h1>logo</h1> -->
         <img width="40" src="../../assets/logo.png" alt="">
       </div>
       <div class="user_info">
         <span>{{name}}</span>
         <div class="el-icon-caret-bottom"  @click.stop="basic()" >
           <ul class="user_info-menu" v-if="sign">
             <li class="logout" @click="logout">退出登录</li>
           </ul>
         </div>
       </div>
     </el-header>
</template>

<script>
export default {
    data(){
      return{
        name:this.$store.state.user.name,
        sign: false,
        // imgUrl:require('../../assets/logo.png')
      }
    },
    created() {
      //添加全局点击事件，注意里面需要使用箭头函数
      if (typeof window !== 'undefined') {
          document.addEventListener('click', (e) => {
            if (e.target.className !== 'user_info-menu') {
              this.sign = false
            }
        })
      }
    },
    methods:{
      async logout(){
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      basic() {
        this.sign = !this.sign
      }
    }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  // text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  line-height: 60px;
  .el-icon-caret-bottom{
    cursor: pointer;
    position: relative;
    .user_info-menu{
      position: absolute;
      right: -50%;
      top: 39px;
      background: #fff;
      line-height: 30px;
      border-radius: 4px;
      width: 80px;
      li{
        list-style: none;
        font-size: 14px;
      }
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #333;
  }
  .el-dropdown-menu{
    top: 40px !important;
  }
}
</style>