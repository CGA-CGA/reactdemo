<template>
  <div>
    <!-- 
      对话框属性
      visible	是否显示 Dialog，支持 .sync 修饰符
      center	是否对头部和底部采用居中布局
      formLabelWidth label的宽度
     -->
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="title"
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changeMenu"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type === 1"
        >
          <!-- <el-input v-model="form.icon" autocomplete="off"></el-input> -->
          <el-select v-model="form.icon" placeholder="请选择">
            <!-- 下拉框循环我的菜单图标列表 -->
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <!-- <el-input v-model="form.url" autocomplete="off"></el-input> -->
          <el-select v-model="form.url" placeholder="请选择">
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in routerlist"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
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

        <el-button
          @click="update('formDialog')"
          type="primary"
          v-else
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { getMenuAdd,getMenuInfo,getMenuEdit } from "../../util/axios";
//引入二级路由数组
import { routerlist } from "../../router/index";
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      routerlist: routerlist,
      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
        "el-icon-menu",
      ],
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表的值
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    // 重置清空
    reset() {
      this.form = {
        title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
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
          getMenuAdd(this.form).then((res) => {
            console.log(res, "添加响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
    // 点击列表中的编辑，查看某一项
    look(id){
      // console.log(id);
      getMenuInfo({id}).then(res=>{
        // console.log(res,'需要编辑的数据');
        if(res.data.code==200){
          this.form = res.data.list;
          //当前标没有id,后台需要修改时提交id属性
          this.form.id = id;
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    // 确认修改，点击弹框表单编辑按钮时
    update(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          getMenuEdit(this.form).then(res=>{
            // console.log(res,'确认编辑相应');
            if(res.data.code==200){
              // 成功后添加提示信息
              this.$message.success(res.data.msg)
              // 成功后关闭弹窗
              this.cancel();
              // 成功后重新获取列表
             this.getMenuList();
            }else{
               // 失败后添加提示信息
              this.$message.error(res.data.msg)
            }
          })
        }
      })
    },
    //改变菜单选项后，自动选中目录或菜单
    changeMenu() {
      // console.log(this.form.pid, "pid");
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
  },
};
</script>

<style lang="" scoped></style>
