<template>
  <div class="wrap">
    <!-- 头部 -->
    <header>
      <div class="headCon">
        <span class="return" @click="$router.go(-1)">
          <img :src="backImg" />
        </span>
        <h3>购物车</h3>
        <p class="menu">
          <span></span>
          <span></span>
          <span></span>
        </p>
      </div>
    </header>
    <!-- 购物车列表 -->
    <ul class="cartList">
      <li v-for="(item, idx) in cartList" :key="item.id">
        <input
          type="checkbox"
          value="choose"
          v-model="item.checked"
          @change="oneCheck(idx)"
        />
        <img :src="$imgUrl + item.img" alt="pic" />
        <div class="right">
          <h3>{{ item.goodsname }}</h3>
          <p>
            规格：<span>{{ item.standards }}g</span>
          </p>
          <p class="price">&yen;{{ item.price }}</p>
        </div>
        <div class="numbers">
          <span @click="sub(idx)">-</span>
          <input type="text" v-model="item.num" />
          <span @click="add(idx)">+</span>
        </div>
        <p class="del" @click="del(i)">删除</p>
      </li>
    </ul>
    <!-- 结算 -->
    <div class="settlement">
      <label>
        <input
          type="checkbox"
          value="allchoose"
          v-model="allCheck"
          @change="allChecked"
        />
        <p>全选</p>
      </label>
      <div>
        <p class="price">
          总价：<span>{{ allPrice }}</span>
        </p>
        <p>不含运费，已优惠&yen;0.00</p>
      </div>
      <span>去结算({{ allCount }}件)</span>
    </div>
  </div>
</template>

<script>
import { getCartList, getCartDelete } from "../util/axios";
export default {
  data() {
    return {
      backImg: require("../assets/images/arrowLeft (2).jpg"),
      allCheck: false,
      cartList: [],
    };
  },
  computed: {
    // 总数
    allCount() {
      let count = 0;
      this.cartList.forEach((item) => {
        if (item.checked) {
          count += item.num;
        }
      });
      return count;
    },
    // 总价钱
    allPrice() {
      let all_price = 0;
      this.cartList.forEach((item) => {
        if (item.checked) {
          all_price += item.num * item.price;
        }
      });
      return all_price.toFixed(2);
    },
  },
  methods: {
    // 增加
    add(i) {
      this.cartList[i].num++;
    },
    // 减少
    sub(i) {
      this.cartList[i].num--;
      if (this.cartList[i].num < 1) {
        this.cartList[i].num = 1;
      }
    },
    // 删除
    del(i) {
      // this.cartList.splice(i, 1);
      getCartDelete({ id: this.cartList[i].id }).then((res) => {
        if (res.code == 200) {
          alert(res.msg);
          this.CartList();
        }
      });
    },
    oneCheck(i) {
      this.allCheck = this.cartList.every((item) => item.checked);
    },
    // 全选
    allChecked() {
      this.cartList.forEach((item) => (item.checked = this.allCheck));
    },
    CartList() {
      getCartList({
        uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
      }).then((res) => {
        if (res.code == 200) {
          this.cartList = res.list;
        }
      });
    },
  },
  mounted() {
    this.CartList();
  },
  beforeMount() {
    this.cartList.forEach((item) => {
      item.checked = false;
    });
  },
};
</script>


<style lang="" scoped>
@import "../assets/css/cart.css";
.cartList {
  flex: 1;
}
</style>