<template>
  <div class="page">
    <!-- header头部 -->
    <header class="headCon">
      <span class="return" @click="$router.go(-1)">
        <img :src="img.arrowLeft" alt="back" />
      </span>
      <router-link to="/index" class="logo">
        <img :src="img.logo" alt="logo" />
      </router-link>
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header>
    <!-- 内容包裹盒 -->
    <div class="wrap">
      <!-- 搜索框 -->
      <div class="search">
        <input type="scarec" placeholder="搜索商品" />
      </div>
      <!-- 商品列表 -->
      <ul class="goods" v-if='goodList'>
        <li v-for="item in goodList" :key="item.id" @click="$router.push('/detail?id='+item.id)">
          <div>
            <img :src="$imgUrl+item.img" alt="pic" />
            <div class="right">
              <h3>
                {{ item.goodsname }}
              </h3>
              <p class="price">&yen;{{ item.price }}</p>
              <p>
                <span>优惠价 ￥{{ item.market_price }}</span
                >
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="empty">
        <p>商品已卖完</p>
      </div>
    </div>
    <vfooter></vfooter>
  </div>
</template>

<script>
import { getGoods } from "../util/axios";
export default {
  data() {
    return {
      goodList: [],
      img: {
        logo: require("../assets/images/logo.jpg"),
        arrowLeft: require("../assets/images/arrowLeft.jpg"),
      },
    };
  },
  mounted() {
    getGoods({ fid: this.$route.query.id }).then((res) => {
      if(res.code==200){
        this.goodList=res.list
      }
    });
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/list.css";
</style>