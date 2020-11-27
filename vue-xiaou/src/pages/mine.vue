<template>
  <div class="wrap">
    <!-- 头部 -->
    <header>
      <div class="headCon">
        <router-link to="./index" class="return">
          <img :src="img.backImg" />
        </router-link>
        <h3>我的订单</h3>
        <p class="menu">
          <span></span>
          <span></span>
          <span></span>
        </p>
      </div>
    </header>
    <!-- 头像+信息 -->
    <div class="information">
      <div class="left">
        <div class="pic">
          <img :src="img.mineImg" alt="pic" />
        </div>
        <div class="name">
          <h3>悠溯</h3>
          <p>V1</p>
        </div>
      </div>
      <a href="#" class="right">每日签到</a>
    </div>

    <!-- 全部订单+待付款+待收货 -->
    <div class="top">
      <a href="#">
        <img :src="img.iconMine_1" alt="icon" />
        <p>全部订单</p>
      </a>
      <a href="#">
        <img :src="img.iconMine_2" alt="icon" />
        <p>待付款</p>
      </a>
      <a href="#">
        <img :src="img.iconMine_3" alt="icon" />
        <p>待收货</p>
      </a>
    </div>
    <!-- 其他功能 -->
    <ul>
      <li>
        <img :src="img.iconMine_4" alt="pic" />
        <p>地址管理</p>
        <a href="#">
          <img :src="img.arrowRight" alt="pic" />
        </a>
      </li>
      <li class="two">
        <img :src="img.iconMine_5" alt="pic" />
        <p>
          <span>我的钱包</span>
          <span>200余额</span>
        </p>
        <a href="#">
          <img :src="img.arrowRight" alt="pic" />
        </a>
      </li>
      <li>
        <img :src="img.iconMine_6" alt="pic" />
        <p>我的优惠券</p>
        <a href="#">
          <img :src="img.arrowRight" alt="pic" />
        </a>
      </li>
      <li>
        <img :src="img.iconMine_7" alt="pic" />
        <p>我的二维码</p>
        <a href="#">
          <img :src="img.arrowRight" alt="pic" />
        </a>
      </li>
      <li>
        <img :src="img.iconMine_8" alt="pic" />
        <p>我的小伙伴</p>
        <a href="#">
          <img :src="img.arrowRight" alt="pic" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: {
        backImg: require("../assets/images/arrowLeft (2).jpg"),
        mineImg: require("../assets/images/mine.png"),
        iconMine_1: require("../assets/images/iconMine_1.jpg"),
        iconMine_2: require("../assets/images/iconMine_2.jpg"),
        iconMine_3: require("../assets/images/iconMine_3.jpg"),
        iconMine_4: require("../assets/images/iconMine_4.jpg"),
        iconMine_5: require("../assets/images/iconMine_5.jpg"),
        iconMine_6: require("../assets/images/iconMine_6.jpg"),
        iconMine_7: require("../assets/images/iconMine_7.jpg"),
        iconMine_8: require("../assets/images/iconMine_8.jpg"),
        arrowRight: require("../assets/images/arrowRight.jpg"),
      },
    };
  },
};
</script>


<style lang="" scoped>
@import "../assets/css/mine.css";
.wrap {
  background: #f1f1f1;
}
</style>