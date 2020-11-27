<template>
  <div>
    <!-- 
      对话框属性
      visible	是否显示 Dialog，支持 .sync 修饰符
      center	是否对头部和底部采用居中布局
      formLabelWidth label的宽度
     -->
    <el-dialog
      :title="addInfo.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
      @opened="createEditor"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择分类"
            @change="changeFirstCateid(false)"
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

        <el-form-item
          prop="second_cateid"
          label="二级分类"
          :label-width="formLabelWidth"
        >
          <el-select
            ref="second"
            v-model="form.second_cateid"
            placeholder="请选择分类"
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
        <el-form-item
          prop="goodsname"
          label="商品名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="价格" :label-width="formLabelWidth">
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="market_price"
          label="市场价格"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.number="form.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          prop="specsid"
          label="商品规格"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changeIndex(false)"
          >
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="specsid"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <!-- multiple是否多选 -->
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option
              v-for="(item, i) in specsattr"
              :key="i"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <!-- 这个标签中插入富文本编辑器 -->
          <div id="editor"></div>
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
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../util/axios";
// 引入富文本编辑器
import E from "wangeditor";
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      },
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          {
            type: "number",
            message: "输入数字",
            trigger: "blur",
          },
        ],
        market_price: [
          { required: true, message: "请输入商品市场价格", trigger: "blur" },
          {
            type: "number",
            message: "输入数字",
            trigger: "blur",
          },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      // firstId: "", //一级ID
      secondCate: [], //装二级分类
      specsattr: [], //装规格属性
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表的值
    ...mapGetters({
      cateList: "cate/getCateList",
      specsList: "specs/getSpecsList",
    }),
  },
  mounted() {
    // 一加载九获取
    this.getCateList();
    this.getGoodsList();
    this.getSpecsList();
    this.getGoodsCount();
  },
  methods: {
    //表单弹框一打开，就加载富文本编辑器
    createEditor() {
      //先实例化富文本
      this.editor = new E("#editor");
      //调用富文本编辑器 create方法
      this.editor.create();
      //设置内容 设置表单描述信息参数
      this.editor.txt.html(this.form.description);
      console.log(this.editor, "编辑器对象");
    },
    //onChange 当图片上传时触发的文件
    onChange(file) {
      this.imgUrl = file.raw;
    },
    //图片预览
    onPreview(file) {
      console.log(file.url, "图片预览");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片移除
    onRemove(file, fileList) {
      console.log("图片移除this.imgUrl设置为空");
      console.log(file, fileList);
      this.imgUrl = "";
      this.form.img = "";
    },
    //文件上传限制
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    // 一级分类改变时触发
    changeFirstCateid(bool) {
      this.secondCate = this.cateList.filter(
        (item) => this.form.first_cateid == item.id
      )[0].children;
      if (!bool) {
        this.form.second_cateid = "";
      }
    },

    // 商品规格改变时触发
    changeIndex(bool) {
      this.specsList.map((item) => {
        if (item.id == this.form.specsid) {
          this.specsattr = item.attrs;
        }
      });
      if (!bool) {
        this.form.specsattr = "";
      }
    },

    ...mapActions({
      getGoodsCount: "goods/getGoodsCountAction",
      getGoodsList: "goods/getGoodsListAction",
      getCateList: "cate/getCateListAction",
      getSpecsList: "specs/getSpecsListAction",
    }),
    // 重置清空
    reset() {
      this.form = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      };
      this.fileList = []; //文件上传列表
      this.$refs["formDialog"].resetFields();
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
          //把编辑器中的内容设置给我的描述参数
          this.form.description = this.editor.txt.html();
          // 接收一下form
          let data = this.form;
          // 文件需要提交特殊文件形式
          let file = new FormData();
          // 将form遍历到FormData中，只能append方式添加
          for (var i in data) {
            file.append(i, data[i]);
          }
          //添加img参数
          file.append("img", this.imgUrl);

          getGoodsAdd(file).then((res) => {
            console.log(res, "添加商品请求");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getGoodsList();
              //重新触发总页数
              this.getGoodsCount();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
    // 点击列表中的编辑，查看某一项
    look(id) {
      // console.log(id);

      getGoodsInfo({ id }).then((res) => {
        console.log(res.data.list, "需要编辑的数据");
        if (res.data.code == 200) {
          this.form = res.data.list;
          //当前标没有id,后台需要修改时提交id属性
          this.form.id = id;
          //点击打开弹框，给属性值进行二次数据整合
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.split(",")
            : [];
          //触发一级菜单
          this.changeFirstCateid(this.form.first_cateid);
          // 商品规格改变时触发
          this.changeIndex(this.form.specsid);
          //把图片格式进行转化
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 确认修改，点击弹框表单编辑按钮时
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //把编辑器中的内容设置给我的描述参数
          this.form.description = this.editor.txt.html();
          // 接收一下form
          let data = this.form;
          // 文件需要提交特殊文件形式
          let file = new FormData();
          // 将form遍历到FormData中，只能append方式添加
          for (var i in data) {
            file.append(i, data[i]);
          }
          //如果你新传了图片 this.imgUrl就有值。就赋值给this.imgUrl。如果没有新添加的图片就用上一次的图片
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);
          getGoodsEdit(file).then((res) => {
            // console.log(res,'确认编辑相应');
            if (res.data.code == 200) {
              // 成功后添加提示信息
              this.$message.success(res.data.msg);
              // 成功后关闭弹窗
              this.cancel();
              // 成功后重新获取列表
              this.getGoodsList();
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
