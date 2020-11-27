<template>
  <div>
    <!-- 
      对话框属性
      visible	是否显示 Dialog，支持 .sync 修饰符
      center	是否对头部和底部采用居中布局
      formLabelWidth label的宽度
     -->
    <el-dialog
      :title="addInfo.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="roleid" label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid"
            placeholder="请选择"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="username"
          label="用户名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
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
        <el-button
          @click="add('formDialog')"
          type="primary"
          v-if="addInfo.isAdd"
          >添加</el-button
        >
        <el-button @click="update('formDialog')" type="primary" v-else
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { getUserAdd, getUserInfo, getUserEdit } from "../../util/axios";

//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        roleid:'',//角色编号
        username:'',//管理员名称
        password:'',//密码
        status:1//状态
      },
      rules: {
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        roleid: [{ required: true, message: "请选择所属角色", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表的值
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  mounted() {
    // 一加载九获取
    this.getUserList();
    this.getRoleList();
  },
  methods: {
    ...mapActions({
      //获取角色列表，下拉框列表
      getRoleList: "role/getRoleListAction",

      getUserList: "admin/getUserListAction",
      getUserCount: "admin/getUserCountAction",
    }),
    // 重置清空
    reset() {
      this.form = {
        roleid:'',//角色编号
        username:'',//管理员名称
        password:'',//密码
        status:1//状态
      };
    },
    //取消事件，关闭弹框，修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      // 重置
      this.reset();
    },
    //添加事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUserAdd(this.form).then((res) => {
            console.log(res, "添加管理员请求");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getUserList();
              //重新触发总页数
              this.getUserCount();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
    // 点击列表中的编辑，查看某一项
    look(uid) {
      // console.log(id);
      getUserInfo({ uid }).then((res) => {
        // console.log(res,'需要编辑的数据');
        if (res.data.code == 200) {
          this.form = res.data.list;
          //当前标没有id,后台需要修改时提交id属性
          this.form.uid = uid;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 确认修改，点击弹框表单编辑按钮时
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUserEdit(this.form).then((res) => {
            // console.log(res,'确认编辑相应');
            if (res.data.code == 200) {
              // 成功后添加提示信息
              this.$message.success(res.data.msg);
              // 成功后关闭弹窗
              this.cancel();
              // 成功后重新获取列表
              this.getUserList();
            } else {
              // 失败后添加提示信息
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
   
  },
};
</script>

<style lang="" scoped></style>
