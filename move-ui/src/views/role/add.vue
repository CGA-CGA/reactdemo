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
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="rolename"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限:" :label-width="formLabelWidth">
          <!-- el-tree 属性
            data	展示数据	array
            default-expand-all	是否默认展开所有节点
            node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
            props	配置选项，具体看下表	object
            show-checkbox	节点是否可被选择
            default-checked-keys	默认勾选的节点的 key 的数组	
             -->
          <el-tree
            :data="menuList"
            default-expand-all
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title'
            }"
            show-checkbox
          >
          </el-tree>
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
        <el-button v-if="addInfo.isAdd" @click="add" type="primary"
          >添加</el-button
        >
        <el-button v-else @click="update" type="primary">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { getRoleAdd,getRoleInfo,getRoleEdit } from "../../util/axios";
//引入辅助性函数
import { mapActions,mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        rolename: "", // 角色名称
        menus: "", //角色权限
        status: 1 //状态1正常2禁用
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
    };
  },
  props: ["addInfo"],
  computed: {
    // 为角色权限获取菜单列表
    ...mapGetters({
      menuList:'menu/getMenuList'
    })
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
       getRoleList: "role/getRoleListAction"
    }),
    reset(){
      this.form={
        rolename: "", // 角色名称
        menus: "", //角色权限
        status: 1 //状态1正常2禁用
      }
    },
    //取消事件，关闭弹框，修改父组件数据
    cancel() {
      this.reset()
      this.$emit("cancel", false);
    },
    //添加事件
    add() {    
      //转化menu的数据类型
      this.form.menus = this.$refs.tree.getCheckedKeys().join(',')
      getRoleAdd(this.form).then((res) => {
        // console.log(res, "添加响应");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //关闭弹框
          this.cancel();
          //重新获取列表
          this.getRoleList();
        }
      });
      
    },
    // 点击表格中的编辑查看选中的那一项
    look(id) {
      // console.log(id);
      // 调取角色查看接口
      getRoleInfo({id}).then(res=>{
        // console.log(res);
        if(res.data.code==200){
          this.form = res.data.list  
          // 后台给的角色权限数据类型是字符串，把他改成前端想要的数组,并设置目前勾选的节点
          this.form.menus = this.$refs.tree.setCheckedKeys(this.form.menus.split(','));
          // 添加后端要的id属性
          this.form.id = id;
        }
      })
    },
    update(){
      //转化menu的数据类型
      this.form.menus = this.$refs.tree.getCheckedKeys().join()
      // 调取更新接口
      getRoleEdit(this.form).then(res=>{
        if(res.data.code==200){
          this.$message.success(res.data.msg);
          // console.log(res);
          //关闭弹框
          this.cancel();
          //重新获取列表
          this.getRoleList();
        }else{
          this.$message.error(res.data.msg);
        }
        

      })
    },
  },
};
</script>
<style lang="" scoped></style>
