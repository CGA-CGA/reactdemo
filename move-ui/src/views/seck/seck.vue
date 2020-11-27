<template>
  <div>
    <!-- 引入面包屑导航 -->
    <elbread></elbread>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="isAdd" size="small">添加</el-button>
    <!-- 表格列表渲染 -->
    <vtab @edit="edit"></vtab>

    <!-- 弹框表单 -->
    <v-dialog ref="dialog" @cancel="cancel" :addInfo="addInfo"></v-dialog>
  </div>
</template>
<script>
import elbread from "../../components/el-bread";
import vtab from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      addInfo: {
        //用于打开弹框（控制弹框）
        isShow: false,
        //用于区分是添加还是编辑
        isAdd: true,
      },
    };
  },
  components: {
    elbread,
    vtab,
    vDialog,
  },
  methods: {
    //打开弹框事件
    isAdd() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    //cancel事件去改变弹框的属性
    cancel(e) {
      //e是弹框传递的参数(false)
      this.addInfo.isShow = e;
    },
    // 接收子组件表格编辑的事件
    edit(uid) {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = false;

      this.$refs.dialog.look(uid);
    },
  },
};
</script>

<style lang="" scoped>
</style>
