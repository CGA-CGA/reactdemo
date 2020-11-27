<template>
  <div>
    <!-- 
      对话框属性
      visible	是否显示 Dialog，支持 .sync 修饰符
      center	是否对头部和底部采用居中布局
      formLabelWidth label的宽度
     -->
    <el-dialog
      :title="addInfo.isAdd ? '添加秒杀' : '编辑秒杀'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="title"
          label="活动名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-date-picker
            type="daterange"
             v-model="value1"
             value-format='yyyy-mm-dd'
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change='changeData'
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择分类"
            @change="changeFirstCateid"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select
            ref="second"
            v-model="form.second_cateid"
            placeholder="请选择分类"
            @change="changeSecondCateid"
          >
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择分类">
            <el-option
              v-for="item in newgoodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
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
        <el-button @click="update('formDialog')" type="primary" v-else
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { getSeckAdd, getSeckInfo, getSeckEdit } from "../../util/axios";

//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      pickerOptions: {
          shortcuts: [{
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },]
        },
        value1: '',

      // 二级分类
      secondCate: [],
      // 经过二级分类过滤后的商品列表
      newgoodsList:[],
      form: {
        title: "", //活动名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //一级分类
        second_cateid: "", //二级分类
        goodsid: "", //商品编号
        status: 1, //状态
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表的值
    ...mapGetters({
      cateList: "cate/getCateList",
      goodsList: "goods/getGoodList",
      seckList: "seck/getSeckList",
    }),
  },
  mounted() {
    // 一加载九获取
    this.getSeckList();
    this.getCateList();
    this.getGoodsList();
  },
  methods: {
      // 日期确定触发
      changeData(e){
        this.form.begintime=e[0];
        this.form.endtime=e[1]; 
        console.log(this.form);     
      },
    // 一级分类改变时触发
    changeFirstCateid(firstId) {
      this.secondCate = this.cateList.filter(
        (item) => item.id == firstId
      )[0].children;

    },
    // 二级分类改变时触发
    changeSecondCateid(secondId) {
      this.newgoodsList = this.goodsList.filter(
        (item) => item.second_cateid == secondId
      );
      
    },
    ...mapActions({
      //获取角色列表，下拉框列表
      getCateList: "cate/getCateListAction",
      getGoodsList: "goods/getGoodListAction",
      getSeckList: "seck/getSeckListAction",
    }),
    // 重置清空
    reset() {
      this.form = {
        title: "", //活动名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //一级分类
        second_cateid: "", //二级分类
        goodsid: "", //商品编号
        status: 1, //状态
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
          getSeckAdd(this.form).then((res) => {
            console.log(res, "添加限时秒杀请求");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getSeckList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
      // console.log(this.value1);
    },
    // 点击列表中的编辑，查看某一项
    look(id) {
      // console.log(id);
      getSeckInfo({ id }).then((res) => {
        // console.log(res,'需要编辑的数据');
        console.log(this.newgoodsList,'新商品');
        if (res.data.code == 200) {
          this.form = res.data.list;
          //触发一级分类
          this.changeFirstCateid(this.form.first_cateid);
          //触发一级分类
          this.changeSecondCateid(this.form.second_cateid);
          //触发日期
          this.value1 = [this.form.begintime,this.form.endtime]
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
          getSeckEdit(this.form).then((res) => {
            // console.log(res,'确认编辑相应');
            if (res.data.code == 200) {
              // 成功后添加提示信息
              this.$message.success(res.data.msg);
              // 成功后关闭弹窗
              this.cancel();
              // 成功后重新获取列表
              this.getSeckList();
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
