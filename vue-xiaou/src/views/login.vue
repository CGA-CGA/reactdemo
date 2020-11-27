<template>
  <div>
    <div class="page">
      <!-- header头部 -->
      <header class="headCon">
        <span @click="$router.go(-1)" class="return">
          <img :src="backImg" />
        </span>
        <h3>登录</h3>
        <p class="menu" @click="toRegister">注册</p>
      </header>
      <div class="wrap">
        <div class="form">
          <div>
            <p>手机号：</p>
            <input type="text" name="phone" v-model="userInfo.phone" />
          </div>
          <div>
            <p>密 码：</p>
            <input type="text" name="pwd" v-model="userInfo.password" />
          </div>
          <div class="last">
            <a href="javascript:;">忘记密码</a>
          </div>
          <button @click="Login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getLogin } from "../util/axios";
export default {
  data() {
    return {
      userInfo: {
        phone: "",
        password: "",
      },
      backImg: require("../assets/images/arrowLeft (2).jpg"),
    };
  },
  methods: {
    toRegister() {
      this.$router.push("/register");
    },
    Login() {
      // 判空
      if (!this.userInfo.phone || !this.userInfo.password) {
        alert("用户名和密码不能为空");
      } else {
        getLogin(this.userInfo).then((res) => {
          if (res.code == 200) {
            sessionStorage.setItem("userInfo", JSON.stringify(res.list));
            this.userInfo = {
              phone: "",
              password: "",
            };
            this.$router.push("/index");
          } else {
            alert(res.msg);
          }
        });
      }
    },
  },
};
</script>


<style lang="" scoped>
@import "../assets/css/login.css";
</style>