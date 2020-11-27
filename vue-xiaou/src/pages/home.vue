<template>
  <!-- 内容包裹盒 -->
  <div class="wrap">
    <!-- header头部 -->
    <header class="headCon">
      <!-- 头部logo -->
      <router-link to="/index" class="logo">
        <img :src="img.logo" alt="logo" />
      </router-link>
      <!-- 头部搜索框 -->
      <input class="search" type="search" placeholder="寻找商品" />
      <!-- 头部菜单按钮 -->
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header>
    <!-- nav导航栏 -->
    <nav class="navbar">
      <ul class="clearfix">
        <li class="active"><a href="#">推荐</a></li>
        <li><a href="#">女装</a></li>
        <li><a href="#">鞋包</a></li>
        <li><a href="#">居家</a></li>
        <li><a href="#">母婴儿童</a></li>
        <li><a href="#">美食</a></li>
        <li><a href="#">男装</a></li>
        <li><a href="#">手机</a></li>
        <li><a href="#">美妆</a></li>
        <li><a href="#">母婴儿童</a></li>
      </ul>
      <p class="arrow"></p>
    </nav>
    <!-- banner图 -->
    <div id="banner" class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
          <img :src="$imgUrl + item.img" alt="" />
        </div>
      </div>
    </div>
    <!-- 限时抢购+积分商城+联系我们+商品分类 -->
    <ul class="iMenu marBot">
      <li>
        <a href="#">
          <img :src="img.indexicon1" alt="pic" />
          <p>限时抢购</p>
        </a>
      </li>
      <li>
        <a href="#">
          <img :src="img.indexicon2" alt="pic" />
          <p>积分商城</p>
        </a>
      </li>
      <li>
        <a href="#">
          <img :src="img.indexicon3" alt="pic" />
          <p>联系我们</p>
        </a>
      </li>
      <li>
        <router-link to="/sort">
          <img :src="img.indexicon4" alt="pic" />
          <p>商品分类</p>
        </router-link>
      </li>
    </ul>
    <!-- 限时秒杀 -->
    <div class="limit marBot">
      <!-- 左侧限时秒杀 -->
      <div class="liLeft">
        <h3 class="title">限时秒杀</h3>
        <p>每天零点场 好货秒不停</p>
        <div class="clearfix liTime">
          <span>02</span>
          <span>:</span>
          <span>16</span>
          <span>:</span>
          <span>45</span>
          <a href="#" class="last">秒杀</a>
        </div>
        <div class="pic">
          <img :src="img.shop_5" alt="pic" />
          <p>&yen;14.8</p>
        </div>
      </div>
      <!-- 右侧品牌上新 -->
      <div class="liRight">
        <!-- 右侧上部品牌上新 -->
        <div class="rTop">
          <div>
            <h3 class="title clearfix">品牌上新<i>折</i></h3>
            <p>每日9点 抢大牌</p>
            <img :src="img.brand" alt="pic" />
          </div>
          <div class="pic">
            <img :src="img.indexshop" alt="pic" />
          </div>
        </div>
        <!-- 右侧下部每日十件+拼啊 -->
        <div class="rBot">
          <div class="rBotfir">
            <h3>每日十件</h3>
            <p>只为你选好货</p>
            <div>
              <img :src="img.shop_2" alt="pic" />
            </div>
          </div>
          <div>
            <h3>拼啊</h3>
            <p>超级好价拼团</p>
            <div>
              <img :src="img.shop_3" alt="pic" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 广告图 -->
    <div class="advertisement marBot">
      <img :src="img.bar" alt="pic" />
    </div>
    <!-- 商品列表 -->
    <div class="goodsList">
      <!-- 上部选项卡导航 -->
      <ul class="top">
        <li @click="select1" :class="[select == 0 ? 'active' : '']">
          <span>热门推荐</span>
        </li>
        <li @click="select2" :class="[select == 1 ? 'active' : '']">
          <span>发现新品</span>
        </li>
        <li @click="select3" :class="[select == 2 ? 'active' : '']">
          <span>只看商品</span>
        </li>
      </ul>
      <!-- 下部商品列表 -->
      <ul class="botGoods">
        <li
          class="clearfix"
          v-for="item in list"
          :key="item.id"
          @click="$router.push('/detail?id=' + item.id)"
        >
          <img :src="$imgUrl + item.img" alt="pic" />
          <div class="right">
            <h3>{{ item.goodsname }}</h3>
            <p class="price">¥{{ item.price }}</p>
            <p>优惠价￥{{ item.market_price }}</p>
            <span>立即抢购</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import Vue from "vue";
import { getBanner, getIndexGoods } from "../util/axios";
export default {
  data() {
    return {
      bannerList: [],
      hotList: [],
      newList: [],
      goodsList: [],
      list: [],
      select: 0,
      img: {
        logo: require("../assets/images/logo.jpg"),
        bar: require("../assets/images/bar.jpg"),
        shop_2: require("../assets/images/shop_2.jpg"),
        shop_3: require("../assets/images/shop_3.jpg"),
        shop_5: require("../assets/images/shop_5.jpg"),
        brand: require("../assets/images/brand.jpg"),
        indexshop: require("../assets/images/indexshop.jpg"),
        indexicon1: require("../assets/images/indexicon1.jpg"),
        indexicon2: require("../assets/images/indexicon2.jpg"),
        indexicon3: require("../assets/images/indexicon3.jpg"),
        indexicon4: require("../assets/images/indexicon4.jpg"),
      },
    };
  },
  methods: {
    select1() {
      this.select = 0;
      this.list = this.hotList;
    },
    select2() {
      this.select = 1;
      this.list = this.newList;
    },
    select3() {
      this.select = 2;
      this.list = this.goodsList;
    },
  },
  mounted() {
    getBanner().then((res) => {
      if (res.code == 200) {
        this.bannerList = res.list;
        Vue.nextTick(() => {
          var swiper = new Swiper(".swiper-container", {
            loop: true,
            autoplay: {
              delay: 2000,
            },
          });
        });
      }
    });

    getIndexGoods().then((res) => {
      if (res.code == 200) {
        this.hotList = res.list[0].content;
        this.newList = res.list[1].content;
        this.goodsList = res.list[2].content;
        this.list = res.list[this.select].content;
      }
    });
  },
};
</script>


<style lang="" scoped>
@import "../assets/css/index.css";

.wrap {
  background: #f1f1f1;
}
</style>