<template>
  <div>
    <!-- 引入面包屑导航 -->
    <elbread></elbread>
    <!-- 表格列表渲染 -->
    <vtab @edit='edit'></vtab>
    <!-- 弹框表单 -->
      <v-dialog ref="dialog" @cancel='cancel' :isShow='isShow'></v-dialog>
  </div>
</template>

<script>
import elbread from "../../components/el-bread";
import vtab from './list'
import vDialog from './add'
export default {
  data() {
    return {
      isShow:false
    };
  },
  components: {
    elbread,
    vtab,
     vDialog
  },
  methods: {
      //cancel事件去改变弹框的属性
      cancel(e){
          this.isShow = e
      },
      // 点击表格中编辑触发的事件
      edit(id){
        // console.log(id);
        this.isShow = true;
        this.$refs.dialog.look(id);
      }
  },
};
</script>

<style lang="stylus" scoped>

</style>
