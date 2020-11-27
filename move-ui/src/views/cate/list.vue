<template>
 <div>
     <!-- 表格列表渲染 -->
     <!-- pid上级分类编号
   catename商品分类名称
   img图片(文件，一般用于二级分类)
   status状态1正常2禁用 -->
    <el-table :data="cateList" border style="width: 100%"
    row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >

      <el-table-column prop="pid" label="分类编号" width="180"> </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl+item.row.img" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if='item.row.status==1' type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
         </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="item">
              <div>
                    <el-button type="primary" size='small' @click="edit(item.row.id)">编辑</el-button>
                    <el-button type="danger" size='small' @click="del(item.row.id)">删除</el-button>
              </div>
          </template>
      </el-table-column>
    </el-table>
 </div>
</template>

<script>
//引入辅助性函数
import {mapGetters,mapActions} from 'vuex'

import { getCateDelete } from "../../util/axios";

export default {
 data() {
 return {

 };
 },

computed: {
    ...mapGetters({
        cateList:'cate/getCateList'
    })
},
mounted() {
    //组件一加载就触发调取列表
    this.getCateList()
  },

methods:{
    ...mapActions({
        getCateList:'cate/getCateListAction'
    }),
    // 删除某一项
    del(id){
       this.$confirm("确定要删除当前数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          getCateDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新触发调取列表
              this.getCateList();
            }else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑
    edit(id){
      //把id传给父组件
      this.$emit('edit',id);
    }
}

};
</script>

<style lang="stylus" scoped>
.el-table
  margin-top 10px
.img
  width 100px
</style>
