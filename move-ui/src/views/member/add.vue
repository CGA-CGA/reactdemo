<template>
  <div>
    <!-- 
      对话框属性
      visible	是否显示 Dialog，支持 .sync 修饰符
      center	是否对头部和底部采用居中布局
      formLabelWidth label的宽度
     -->
    <el-dialog
      title="编辑会员"
      :visible.sync="isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="nickname"
          label="昵称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 可以使用active-color属性与inactive-color属性来设置开关的背景色。 -->
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="update" type="primary">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { getMemberInfo, getMemberEdit } from "../../util/axios";
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        phone: "", // 手机号
        nickname:'',//昵称
        password:'',//密码
        status: 1, //状态1正常2禁用
      },

      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度11个字符",
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度2--20个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ['isShow'],
  // computed: {
  //   // 为角色权限获取菜单列表
  //   ...mapGetters({
  //     memberList: "member/getMemberList",
  //   }),
  // },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    //取消事件，关闭弹框，修改父组件数据
    cancel() {
      this.$emit("cancel", false);
    },
    // 点击表格中的编辑查看选中的那一项
    look(uid) {
      console.log(uid);
      // 调取角色查看接口
      getMemberInfo({ uid }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 添加后端要的id属性
          this.form.uid = uid;
        }
      });
    },
    update() {
      getMemberEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          // console.log(res);
          //关闭弹框
          this.cancel();
          //重新获取列表
          this.getMemberList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>
<style lang="" scoped></style>
