<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="pid" label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option :value="0" label="顶级分类"></el-option>
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
          prop="catename"
          label="分类名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.catename" autocomplete="off"></el-input>
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
            :limit='1'
            :on-exceed='onExceed'	
          >
            <i class="el-icon-plus"></i>
          </el-upload>
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
import { getCateAdd, getCateInfo, getCateEdit } from "../../util/axios";
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        pid: 0, //上级分类编号 默认是0 是顶级
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1 //状态1正常2禁用
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [] //文件上传列表
      
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表的值
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  // mounted() {
  //   this.getCateList();
  // },
  methods: {
    //onChange 当图片上传时触发的文件
    onChange(file) {
      
      this.imgUrl = file.raw;
      console.log(file.raw,'上传时触发的文件');
    },
    //图片预览
    onPreview(file) {
      console.log(file.url,'图片预览');
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片移除
    onRemove(file, fileList) {
      console.log('图片移除this.imgUrl设置为空');
      console.log(file,fileList);
      this.imgUrl=''
      this.form.img = ''
    },
    //文件上传限制
    onExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

    ...mapActions({
      getCateList: "cate/getCateListAction",
    }),
    // 重置清空
    reset() {
      this.form = {
        pid: 0, //上级分类编号 默认是0 是顶级
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1 //状态1正常2禁用
      };
      this.fileList=[];
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
          // 接收一下form
          let data = this.form;
          // 文件需要提交特殊文件形式
          let file = new FormData();
          // 将form遍历到FormData中，只能append方式添加
          for(var i in data){
            file.append(i,data[i]);
          }
          //添加img参数
          file.append("img", this.imgUrl);

          getCateAdd(file).then((res) => {
            console.log(res, "添加商品分类响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getCateList();
            } else {
              this.$message.error(res.data.msg);
            }
          });

        }else{
          console.log('添加格式错误');
        }
      });
    },
    // 点击列表中的编辑，查看某一项
    look(id) {
      // console.log(id);
      getCateInfo({ id }).then((res) => {
        // console.log(res,'需要编辑的数据');
        if (res.data.code == 200) {
          this.form = res.data.list;
          //当前标没有id,后台需要修改时提交id属性
          this.form.id = id;
          //把图片格式进行转化
          this.fileList = this.form.img ?  [{url:`${this.$imgUrl}${this.form.img}`}]:[];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 确认修改，点击弹框表单编辑按钮时
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form);
          // 接收一下form
          let data = this.form;
          // 文件需要提交特殊文件形式
          let file = new FormData();
          // 将form遍历到FormData中，只能append方式添加
          for(var i in data){
            file.append(i,data[i]);
          }
          //如果你新传了图片 this.imgUrl就有值。就赋值给this.imgUrl。如果没有新添加的图片就用上一次的图片
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);
          getCateEdit(file).then((res) => {
            // console.log(res,'确认编辑相应');
            if (res.data.code == 200) {
              // 成功后添加提示信息
              this.$message.success(res.data.msg);
              // 成功后关闭弹窗
              this.cancel();
              // 成功后重新获取列表
              this.getCateList();
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
