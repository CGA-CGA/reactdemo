<template>
  <div class="footer">
    <router-link
      v-for="item in footerList"
      :key="item.id"
      :to="item.url"
      active-class="active"
    >
      <img :src="item.img" alt="pic" />
      <p>{{ item.name }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerList: [
        {
          id: 1,
          img: require("../assets/images/iconIndex.jpg"),
          name: "首页",
          url: "/home",
        },
        {
          id: 2,
          img: require("../assets/images/iconCart.jpg"),
          name: "购物车",
          url: "/cart",
        },
        {
          id: 3,
          img: require("../assets/images/iconMine.jpg"),
          name: "我的",
          url: "/mine",
        },
      ],
    };
  },
  // mounted(){
  //     if(this.$route.query.id == 1){
  //       this.footerList[this.$route.query.id-1].img = require('../assets/images/iconIndex2.jpg')
  //     }else if(this.$route.query.id == 2){
  //       this.footerList[this.$route.query.id-1].img = require('../assets/images/iconCart2.jpg')
  //     }else if(this.$route.query.id == 3){
  //       this.footerList[this.$route.query.id-1].img = require('../assets/images/iconMine2.jpg')
  //     }
  // }
};
</script>

<style lang="" scoped>
.footer .active p {
  color: #f47524;
}
</style>