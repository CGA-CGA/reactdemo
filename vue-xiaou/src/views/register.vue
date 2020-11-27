<template>
  <div>
    <div class="page">
      <!-- header头部 -->
      <header class="headCon">
        <router-link to="/index" tag="span" class="return"
          ><img :src="backImg"
        /></router-link>
        <h3>注册</h3>
        <p class="menu" @click="toLogin">登录</p>
      </header>
      <div class="wrap">
        <div class="form">
          <div>
            <p>昵 称：</p>
            <input type="text" name="nickname" v-model="userInfo.nickname" />
          </div>
          <div>
            <p>手机号：</p>
            <input type="text" name="phone" v-model="userInfo.phone" />
          </div>
          <div>
            <p>密 码：</p>
            <input type="text" name="pwd" v-model="userInfo.password" />
          </div>
          <div>
            <p>验证码：</p>
            <input type="text" name="captcha" v-model="userInfo.captcha" />
            <p @click="captcha" v-if="isShow">发送验证码</p>
            <p v-else>重新发送({{ num }})</p>
          </div>
          <button @click="register">下一步</button>
          <label for="checked">
            <input type="checkbox" v-model="isChecked" id="checked" />
            我已阅读并同意使用条款和隐私政策
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getRegister} from '../util/axios'
export default {
  data() {
    return {
      num: 5,
      isChecked: false,
      isShow: true,
      userInfo: {
        nickname: "",
        phone: "",
        password: "",
        captcha: "",
      },
      backImg: require("../assets/images/arrowLeft (2).jpg"),
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    register() {
      // 判断使用条款是否勾选
      if (!this.isChecked) {
        alert("使用条款和隐私政策必须勾选");
        return;
      }
      // 判空
      if (
        !this.userInfo.nickname ||
        !this.userInfo.phone ||
        !this.userInfo.password ||
        !this.userInfo.captcha
      ) {
        alert("请填写必填项");
      } else {
        getRegister(this.userInfo).then(res=>{
          if(res.code==200){
            alert(res.msg)
            this.$router.push('/login')
          }else{
            alert(res.msg)
          }
        })
      }
    },
    captcha() {
      this.isShow = false;
      let timer = setInterval(() => {
        this.num--;
        if (this.num <= 0) {
          this.num = 5;
          this.isShow = true;
          clearInterval(timer);
        }
      }, 1000);
    },
  },
};
</script>


<style lang="" scoped>
@import "../assets/css/register.css";

</style>