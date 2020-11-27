<template>
  <div class="page">
    <!-- header头部 -->
    <header class="headCon">
      <router-link to="/index" class="return">
        <img :src="img.backImg" alt="back" />
      </router-link>
      <h3>商品分类</h3>
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header>
    <div class="wrap">
      <!-- 商品分类 -->
      <div class="goodsSort">
        <!-- 左侧导航栏 -->
        <ul class="aside">
          <li
            :class="[select == item.id ? 'active' : '']"
            v-for="(item, idx) in firstList"
            :key="item.id"
            @click="selectId(item.id, idx)"
          >
            <span>{{ item.catename }}</span>
          </li>
        </ul>
        <!-- 右侧商品 -->
        <div class="right">
          <div>
            <!-- 上部标题 -->
            <div class="title clearfix">
              <h3>{{ name }}</h3>
              <a href="#">更多 &gt;</a>
            </div>
            <!-- 下部商品 -->
            <ul>
              <li v-for="item in secondList" :key="item.id" @click="$router.push('/list?id='+item.id)">
                <img :src="$imgUrl + item.img" alt="" />
                <p>{{ item.catename }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCateTree } from "../util/axios";
export default {
  data() {
    return {
      firstList: [],
      secondList: [],
      select: 0,
      name: "",
      img: {
        backImg: require("../assets/images/arrowLeft (2).jpg"),
        shopClassify_1: require("../assets/images/shopClassify_1.jpg"),
        shopClassify_2: require("../assets/images/shopClassify_2.jpg"),
      },
    };
  },
  methods: {
    selectId(id, idx) {
      this.select = id;
      this.secondList = this.firstList[idx].children;
      this.name = this.firstList[idx].catename;
    },
  },
  mounted() {
    getCateTree().then((res) => {
      if (res.code == 200) {
        this.firstList = res.list;
        this.secondList = this.firstList[0].children;
        this.select = this.firstList[0].id;
        this.name = this.firstList[0].catename;
      }
    });
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/goodsSort.css";
</style>