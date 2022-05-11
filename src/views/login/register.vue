<template>
    <div class="register">
        <div class="register_content">
            <div class="register_content_form">
                <h4>欢迎注册</h4>
                <el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item  prop="pass">
                        <el-input type="password" autocomplete="off" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item  prop="checkPass">
                        <el-input type="password"  autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item  prop="checkCode">
                        <el-input type="text"  autocomplete="off" placeholder="请输入验证码"></el-input>
                        <span class="get_code">获取验证码</span>
                    </el-form-item>
                    <el-form-item>
                        <div class="forget_register">
                            <span>已有账号？</span>
                            <span class="login" @click="login">登录</span>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">注册</el-button>
                    </el-form-item>
                </el-form>
                      
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    methods:{
        login(){
           this.$router.push('/login')
        }
    }
}
</script>

<style scoped lang="scss">
.register{
    height: 100%;
    background: url('../../assets/login/login.png') center center;
    background-size: 100% 100%;
    position: relative;
    .register_content{
        background: #fff;
        width: 340px;
        height: 400px;
        box-shadow:0 0 15px #ccc;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        right: 10%;
        transform: translate(0,-50%);
            .register_content_form{
                margin-top: 35px;
              .el-form{
                    margin: 40px  30px 0 0px;
                    .el-form-item{   
                        /deep/.el-form-item__content{
                            margin-left: 40px !important;
                            width: 260px;
                            line-height: 15px;
                             .el-button{
                                margin-top: 20px;
                                width: 260px;
                            }
                            .el-checkbox-group{
                                position: relative;
                                .el-checkbox{
                                    position: absolute;
                                    right: 0;
                                }
                            }

                        }
                    }
                    .el-form-item:nth-child(4){
                        position: relative;
                        .forget_register{
                            position: absolute;
                            left: 0;
                            .login{
                                color: #409EFF;
                                cursor: pointer;
                            }
                        }
                    }
                    .el-form-item:nth-child(3){
                        /deep/.el-form-item__content{
                            position: relative;
                            .get_code{
                                display: inline-block;
                                padding: 5px;
                                border-radius: 4px;
                                position: absolute;
                                right: 10px;
                                background: #409EFF;
                                color: #fff;
                                top: 50%;
                                transform: translate(0,-50%);
                                cursor: pointer;
                            }
                        }
                    }

            } 
            
        }
    }
}
</style>