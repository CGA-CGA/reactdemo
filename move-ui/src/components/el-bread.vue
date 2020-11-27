<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
     
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="" scoped>
.el-breadcrumb{
    margin-bottom: 20px;
}
</style>
