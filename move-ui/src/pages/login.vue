<template>
  <div class="login">
    <!-- 
        el-form 属性 model 表单数据对象 rules 表单验证规则 
        el-input clearable可清空    show-password 是否显示密码 
    -->
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="loginform"
    >
      <el-form-item>
        <h2>请登录</h2>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

// 导入登录接口
import { getUserLogin } from "../util/axios";
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      //表单输入参
      loginForm: {
        username: "",
        password: "",
      },
      //规则验证
      rules: {
        //用户名验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],

        //密码验证
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    //登录
    login(formName) {
      //console.log(this.$refs[formName],'formDOM')
      //validate 验证 触发rules验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //登录逻辑
          // 调取登录接口
          getUserLogin(this.loginForm).then((res) => {
            if (res.data.code == 200) {  
              this.$message.success(res.data.msg);
              // // 登录之后将登录数据存储到本地
              // sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
              //登录之后触发修改state的UserInfo的action
              this.changeUserInfoAction(res.data.list)

              this.$router.push("/index");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("用户名或者密码不正确");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.login {
  width: 100vw;
  height: 100vh;
  background: #ccc;

  .loginform {
    background: $fristBgColor;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -200px 0 0 -250px;
    width: 500px;
    height: 250px;
    padding: 30px 10px;
  }
}
</style>
