<template>
  <div>
    <el-aside width="250px">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#666"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu
          :index="item.id.toString()"
          v-for="item in getUserInfo.menus"
          :key="item.id"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            :index="ite.url"
            v-for="ite in item.children"
            :key="ite.id"
          >
            <span slot="title">{{ ite.title }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
// 导入vuex
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/home",
    };
  },
  mounted() {
    // 组件加载就触发
    this.defaultActive = this.$route.path;
    // 触发actions
    // this.getMenuList();
  },
  computed: {
    // ...mapGetters({
    //   menuList: "menu/getMenuList",
    // }),
    //利用登录之后的用户信息
      ...mapGetters(['getUserInfo'])
  },

  methods: {
    // ...mapActions({
    //   getMenuList: "menu/getMenuListAction",
    // }),
  },
};
</script>

<style lang="stylus" scoped>
.el-menu {
  min-height: 90vh;
}
</style>
