<template>
    <div class="login">
        <div class="login_content">
            <div class="login_content_form">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="密码登录" name="first">
                        <el-form  status-icon  ref="ruleForm" :model="ruleForm" :rules="loginRules" label-width="100px" class="demo-ruleForm">
                            <el-form-item  prop="pass">
                                <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item  prop="checkPass">
                                <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div class="forget_register">
                                    <span>忘记密码？</span>
                                    <span class="register" @click="register">注册</span>
                                </div>
                                <el-checkbox-group v-model="ruleForm.type">
                                    <el-checkbox label="记住密码" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="login">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="短信登录" name="second">
                        <el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item  prop="pass">
                                <el-input type="password" autocomplete="off" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item  prop="checkCode">
                                <el-input type="text"  autocomplete="off" placeholder="请输入验证码"></el-input>
                                <span class="get_code">获取验证码</span>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane> -->
                    
                </el-tabs>
                
            </div>
        </div>
    </div>
</template>
<script>
// import request from '../../utils/request'
export default {
    data() {
        const validUsername = (str) => {
            const valid_map = ['admin', 'editor']
            return valid_map.indexOf(str) >= 0
        }
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            activeName: 'first',
            ruleForm: {
                username: 'admin',
                phoneNumber:'',
                password: '123456',
                code:'',
                delivery: false,
                type: [],
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            requirect:'',
            otherQuery: {}
        };
    },
    watch:{
        $route:{
            handler: function(route) {
            const query = route.query
            // console.log('route',route);
                if (query) {
                    this.redirect = query.redirect
                    this.otherQuery = this.getOtherQuery(query)
                }
            },
            immediate: true
        }
    },
    methods:{
        register(){
           this.$router.push('/register')
        },
        login(){
            this.$refs.ruleForm.validate(valid => {
                if(valid) {
                    // console.log('this.$store',this.$store);
                    this.$store.dispatch('user/login', this.ruleForm)
                    .then(() => {
                        this.$router.push({ path: this.redirect || '/' , query: this.otherQuery })
                        }).catch(() => {
                            // console.log(22222);
                        })

                }else{
                    console.log('error submit!!')
                    return false
                }
            })

        },
        // ???
        getOtherQuery(query){
            // acc={} 传入的初始值 , cur 表示当前正在处理的数组元素
            return Object.keys(query).reduce((acc, cur) => {
                if(cur !== 'requirect') {
                    // 给acc添加 cur 属性
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
        }
    }
}
</script>

<style scoped lang="scss">
.login{
    height: 100%;
    background: url('../../assets/login/login.png') center center;
    background-size: 100% 100%;
    position: relative;
    .login_content{
        background: #fff;
        width: 340px;
        height: 400px;
        box-shadow:0 0 15px #ccc;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        right: 10%;
        transform: translate(0,-50%);
            .login_content_form{
                margin-top: 50px;
                .el-tabs{
                    /deep/.el-tabs__header{
                        border: 0;
                        .el-tabs__nav-wrap{
                            .el-tabs__nav-scroll{
                                width: 100%;
                                margin: 0 auto;
                                .el-tabs__nav{
                                    width: 260px;
                                    border: 0;
                                    margin-left: 40px;
                                    border: 1px solid rgb(69,152,254);
                                    border-radius: 20px;
                                }
                            }
                        }
                }
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
                    .el-form-item:nth-child(3){
                        position: relative;
                        .forget_register{
                            position: absolute;
                            left: 0;
                            .register{
                                color: #409EFF;
                                cursor: pointer;
                            }
                        }
                    }
                    .el-form-item:nth-child(2){
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
}
</style>