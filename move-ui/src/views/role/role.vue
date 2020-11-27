<template>
  <div>
    <!-- 引入面包屑导航 -->
    <elbread></elbread>
    <!-- 添加按钮 -->
    <el-button type="primary" @click='isAdd' size="small">添加</el-button>
    <!-- 表格列表渲染 -->
    <vtab @edit='edit'></vtab>
    <!-- 弹框表单 -->
      <v-dialog ref="dialog" @cancel='cancel' :addInfo='addInfo'></v-dialog>
  </div>
</template>

<script>
import elbread from "../../components/el-bread";
import vtab from './list'
import vDialog from './add'
export default {
  data() {
    return {
      addInfo:{
        isShow:false,
        isAdd:true,
      }
    };
  },
  components: {
    elbread,
    vtab,
     vDialog
  },
  methods: {
     //打开弹框事件
      isAdd(){
          this.addInfo.isShow = true
          this.addInfo.isAdd = true
      },
      //cancel事件去改变弹框的属性
      cancel(e){
          this.addInfo.isShow = e
      },
      // 点击表格中编辑触发的事件
      edit(id){
        // console.log(id);
        this.addInfo.isShow = true;
        this.addInfo.isAdd = false;

        this.$refs.dialog.look(id);
      }
  },
};
</script>

<style lang="stylus" scoped>

</style>
