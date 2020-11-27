<template>
  <div class="page">
    <!-- header头部 -->
    <header class="headCon">
      <span class="return" @click="$router.go(-1)">
        <img :src="img.backImg" alt="back" />
      </span>
      <h3>商品详情</h3>
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header>
    <!-- 内容包裹盒 -->
    <div class="wrap">
      <!-- 主体部分 -->
      <div class="main">
        <img :src="img.picDetail_1" alt="pic" />
        <img :src="img.picDetail_2" alt="pic" />
        <!-- 价格 -->
        <div class="price">
          <h3>娅芝贵妇素颜霜 贵妇膏神仙膏补水保湿懒人霜遮瑕珍珠膏</h3>
          <p>
            <span>&yen;123.00</span><span>(此价格不与套餐优惠同时享受)</span>
          </p>
        </div>
        <!-- 促销 -->
        <div class="cuX">
          <!-- 促销 -->
          <div class="top">
            <div class="left">
              <span>促销：</span>
              <span>满减</span>
              <span>满2件9折;3件8折</span>
            </div>
            <p>
              <img :src="img.arrow" alt="arrow" />
            </p>
          </div>
          <!-- 购买数量 -->
          <div class="numbers">
            <p>购买数量</p>
            <div>
              <span @click="sub">-</span>
              <input type="text" v-model="count" />
              <span @click="add">+</span>
            </div>
          </div>
          <!-- 商品属性 -->
          <div class="attribute">
            <div class="left">
              <p>商品属性</p>
              <div>
                <span>规格</span>
                <span>30g</span>
                <span>5g</span>
              </div>
            </div>
            <p><img :src="img.arrow" alt="pic" /></p>
          </div>
        </div>
        <!-- 商品详情 -->
        <div class="details">
          <h3>商品详情</h3>
          <img :src="img.picDetail_3" alt="pic" />
          <img :src="img.picDetail_4" alt="pic" />
          <img :src="img.picDetail_5" alt="pic" />
          <img :src="img.picDetail_6" alt="pic" />
          <img :src="img.picDetail_7" alt="pic" />
        </div>
        <!-- 商品评价 -->
        <div class="evaluate">
          <h3>商品评价</h3>
          <!-- 下部评论 -->
          <div class="bottom">
            <h4>1235668fg</h4>
            <p>效果很好，物流到位，下次继续来！</p>
            <div class="pic clearfix">
              <img :src="img.picDetail_8" alt="pic" />
              <img :src="img.picDetail_9" alt="pic" />
              <img :src="img.picDetail_10" alt="pic" />
            </div>
            <p class="time">2020-01-13</p>
          </div>
          <!-- 下部评论数量+更多 -->
          <div class="evalNum">
            <p>共<span>1000+</span>条评论</p>
            <a href="#">查看更多 &gt;</a>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="pay">
      <router-link to="/cart" class="cart">
        <img :src="img.iconCart" alt="pic" />
        <p>购物车</p>
        <span>{{ cartNum }}</span>
      </router-link>
      <div class="right">
        <p @click="addCart">加入购物车</p>
        <span class="buy" @click="$router.push('/confirmOrder?id='+$route.query.id+'&count='+count)">立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsInfo, getCartAdd, getCartList } from "../util/axios";
export default {
  data() {
    return {
      img: {
        backImg: require("../assets/images/arrowLeft (2).jpg"),
        iconCart: require("../assets/images/iconCart.jpg"),
        arrow: require("../assets/images/arrow.jpg"),
        picDetail_1: require("../assets/images/picDetail_1.jpg"),
        picDetail_2: require("../assets/images/picDetail_2.jpg"),
        picDetail_3: require("../assets/images/picDetail_3.jpg"),
        picDetail_4: require("../assets/images/picDetail_4 .jpg"),
        picDetail_5: require("../assets/images/picDetail_5.jpg"),
        picDetail_6: require("../assets/images/picDetail_6.jpg"),
        picDetail_7: require("../assets/images/picDetail_7.jpg"),
        picDetail_8: require("../assets/images/picDetail_8.jpg"),
        picDetail_9: require("../assets/images/picDetail_9.jpg"),
        picDetail_10: require("../assets/images/picDetail_10.jpg"),
      },
      count: 1,
      cartNum: 0,
    };
  },
  methods: {
    sub() {
      if (this.count <= 1) {
        this.count = 1;
        return;
      }
      this.count--;
    },
    add() {
      if (this.count >= 10) {
        this.count = 10;
        return;
      }
      this.count++;
    },
    addCart() {
      getCartAdd({
        uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
        goodsid: this.$route.query.id,
        num: this.count,
      }).then((res) => {
        getCartList({
          uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
        }).then((res) => {
          if (res.code == 200) {
            this.cartNum = res.list ? res.list.length : 0;
          }
        });
      });
    },
  },
  mounted() {
    getGoodsInfo({ id: this.$route.query.id }).then((res) => {
      // console.log(res);
    });
    getCartList({
      uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
    }).then((res) => {
      if (res.code == 200) {
        this.cartNum = res.list ? res.list.length : 0;
      }
    });
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/goodsDetails.css";
</style>