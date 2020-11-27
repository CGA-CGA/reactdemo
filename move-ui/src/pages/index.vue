<template>
  <div>
    <el-container>
      <el-header>
        <h1 class="tit">陈大大开发的大型后台管理系统</h1>
        <el-button type="danger" @click="loginout" size="small"
          >退出登录</el-button
        >
        <span>{{ username }}</span>
      </el-header>
      <el-container>
        <!-- 导航组件 -->
        <vnav></vnav>

        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vnav from "../components/nav";
export default {
  data() {
    return {
      username: "小明",
    };
  },
  components: {
    vnav,
  },
  mounted() {
    this.getName();
  },
  methods: {
    getName() {
      this.username = JSON.parse(sessionStorage.getItem("userInfo")).username;
    },
    loginout() {
      this.$confirm("确定要退出登录吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("userInfo");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录",
          });
        });
    },
  },
};
</script>

<style  lang="" scoped>
.el-header {
  background: #1C1C1C;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.tit {
  color: #fff;
}
span {
  color: #fff;
  line-height: 60px;
  font-size: 25px;
  font-weight: bolder;
  position: fixed;
  top: -6px;
  right: 123px;
}
.el-button {
  position: fixed;
  top: 10px;
  right: 30px;
}
</style>
