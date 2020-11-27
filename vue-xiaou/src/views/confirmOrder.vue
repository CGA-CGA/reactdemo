<template>
  <div class="page">
    <!-- header头部 -->
    <header class="headCon">
      <span class="return" @click="$router.go(-1)">
        <img :src="img.backImg" alt="back" />
      </span>
      <h3>确认订单</h3>
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header>
    <!-- 内容包裹盒 -->
    <div class="wrap">
      <!-- 收件人地址 -->
      <div class="address">
        <div class="addr">
          <!-- 收货人 -->
          <div class="name">
            <p>收货人：YouSu</p>
            <p>10000000000</p>
          </div>
          <!-- 收货地址 -->
          <dl>
            <dt>收货地址：</dt>
            <dd>北京市海淀区隐泉路清林苑6号楼中公优就业总部3层</dd>
          </dl>
        </div>
        <a href="">
          <img :src="img.arrowRight" alt="pic" />
        </a>
      </div>
      <!-- 购买数量 -->
      <div class="numbers">
        <div class="top">
          <img :src="$imgUrl + goodsInfo.img" alt="pic" />
          <div>
            <h3>{{ goodsInfo.goodsname }}</h3>
            <p>规格：50g</p>
          </div>
          <p>&yen;{{ goodsInfo.price }}.00</p>
        </div>
        <div class="num">
          <p>购买数量：</p>
          <div>
            <span @click="sub">-</span>
            <input type="text" name="goodsnum" v-model="num" />
            <span @click="add">+</span>
          </div>
        </div>
        <div class="mode">
          <p>配送方式</p>
          <p>XX快递</p>
        </div>
      </div>
      <!-- 优惠券和积分 -->
      <div class="coupon">
        <!-- 优惠券 -->
        <div class="top">
          <p>优惠券</p>
          <p>无可用</p>
        </div>
        <!-- 积分 -->
        <div class="bottom">
          <h3>使用积分</h3>
          <input type="text" name="jiFen" placeholder="输入积分" />
          <input type="submit" value="使用" />
          <p>可用<span>50</span>积分</p>
        </div>
      </div>
      <!-- 商品金额 -->
      <ul class="money">
        <li>
          <p>商品金额</p>
          <p>&yen;123.00</p>
        </li>
        <li>
          <p>运费</p>
          <p>+&yen;0.00</p>
        </li>
        <li>
          <p>优惠券</p>
          <p>-&yen;0.00</p>
        </li>
        <li>
          <p>会员优惠</p>
          <p>-&yen;0.00</p>
        </li>
        <li class="last">
          <p>积分抵扣</p>
          <p>-&yen;0.00</p>
        </li>
      </ul>
      <!-- 提交订单 -->
      <div class="submit">
        <p>
          实付金额：<span>&yen;{{ allPrice }}</span>
        </p>
        <input type="submit" value="提交订单" />
      </div>
    </div>
    <!-- footer -->
    <vfooter></vfooter>
  </div>
</template>

<script>
import { getGoodsInfo } from "../util/axios";
export default {
  data() {
    return {
      img: {
        backImg: require("../assets/images/arrowLeft (2).jpg"),
        arrowRight: require("../assets/images/arrowRight.jpg"),
        shop_4: require("../assets/images/shop_4.jpg"),
      },
      goodsInfo: {
        goodsname: "",
        img: "",
        price: "",
      },
      num: 1,
    };
  },
  computed: {
    allPrice() {
      let allprice = 0;
      allprice = this.goodsInfo.price * this.num;
      return allprice.toFixed(2);
    },
  },
  methods: {
    sub() {
      if (this.num <= 1) {
        this.num = 1;
        return;
      }
      this.num--;
    },
    add() {
      if (this.num >= 10) {
        this.num = 10;
        return;
      }
      this.num++;
    },
  },
  mounted() {
    getGoodsInfo({ id: this.$route.query.id }).then((res) => {
      if ((res.code = 200)) {
        this.goodsInfo = res.list[0];
        this.num = this.$route.query.count;
      }
    });
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/confirmOrder.css";
.wrap {
  background: #f1f1f1;
}
</style>