<template>
  <div>
    <!-- 
      对话框属性
      visible	是否显示 Dialog，支持 .sync 修饰符
      center	是否对头部和底部采用居中布局
      formLabelWidth label的宽度
     -->
    <el-dialog
      :title="addInfo.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="specsname"
          label="规格名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in inpArr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="item.value"
            autocomplete="off"
            class="inputw"
          ></el-input>
          <el-button type="primary" @click="addinput" v-if="index == 0"
            >新增规格属性</el-button
          >
          <el-button type="danger" @click="delinput(index)" v-else>删除</el-button>
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
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";

//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      // 添加规格属性的数组
      inpArr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "", //规格名称
        attrs: "", //商品规格属性值
        status: 1, //状态
      },
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表的值
    ...mapGetters({

    }),
  },
  mounted() {
    // 一加载九获取
    this.getSpecsList();

  },
  methods: {
    // 删除输入规格属性框
    delinput(i){
      this.inpArr.splice(i,1);
    },
    addinput() {
      // 最多添加四个
      if (this.inpArr.length <= 4) {
        // 规格属性的数组添加元素
        this.inpArr.push({
          value: "",
        });
      } else {
        this.$message.warning("做多添加4个!!!");
      }
    },
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount: "specs/getSpecsCountAction",
    }),
    // 重置清空
    reset() {
      this.form = {
        specsname: "", //规格名称
        attrs: "", //商品规格属性值
        status: 1, //状态
      };
      this.inpArr= [
        {
          value: "",
        },
      ];
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
          // 把数组转化为字符串值传给attr属性
          this.form.attrs = this.inpArr.map(item=>item.value).join(',');

          getSpecsAdd(this.form).then((res) => {
            console.log(res, "添加商品规格请求");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getSpecsList();
              //重新触发总页数
              this.getSpecsCount();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
    // 点击列表中的编辑，查看某一项
    look(id) {
      console.log(id);
      getSpecsInfo({ id }).then((res) => {
        console.log(res,'需要编辑规格的数据');
        if (res.data.code == 200) {
          let data = res.data.list[0];
          //把数据传给form
          this.form=data;
          data.attrs.map((item,i)=>{
            if(i==0){
              this.inpArr[0].value = item;
            }else{
              this.inpArr.push({
                value:item
              })
            }
          })
          
          //当前标没有id,后台需要修改时提交id属性
          this.form.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 确认修改，点击弹框表单编辑按钮时
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 把数组转化为字符串值传给attr属性
          this.form.attrs = this.inpArr.map(item=>item.value).join(',');

          getSpecsEdit(this.form).then((res) => {
            // console.log(res,'确认编辑相应');
            if (res.data.code == 200) {
              // 成功后添加提示信息
              this.$message.success(res.data.msg);
              // 成功后关闭弹窗
              this.cancel();
              // 成功后重新获取列表
              this.getSpecsList();
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

<style lang="" scoped>
.inputw {
  width: 70%;
}
</style>
