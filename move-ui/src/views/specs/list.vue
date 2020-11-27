<template>
  <div>
    <!-- 表格列表渲染 -->
    <el-table
      :data="specsList"
      border
      style="width: 100%"
      row-key="id"
     
    >
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope='item'>
          <div>
            <el-tag v-for="ite in item.row.attrs" :key="ite" type="success">
              {{ite}}
            </el-tag>            
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :page-size='specsSize' background layout="prev, pager, next" :total="specsCount" @current-change='currentChange'>
    </el-pagination>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";

import { getSpecsDelete } from "../../util/axios";

export default {
  data() {
    return {

    };
  },

  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsCount: "specs/getSpecsCount",
      specsSize: "specs/getSpecsSize",
    }),
  },
  mounted() {
    //组件一加载就触发调取列表
    this.getSpecsList();
    this.getSpecsCount();
  },

  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount: "specs/getSpecsCountAction",
      getSpecsPage: "specs/changePageAction",
    }),
    // 删除某一项
    del(id) {
      this.$confirm("确定要删除当前数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getSpecsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg); 
              //重新触发总页数
              this.getSpecsCount();
              

            } else {
              this.$message.error(res.data.msg);
            }
          });
          //重新触发调取列表
              this.getSpecsList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    edit(id) {
      //把id传给父组件
      this.$emit("edit", id);
    },
    // 点击页数触发
    currentChange(e){
        this.getSpecsPage(e)
    }
  },
};
</script>

<style lang="" scoped>
.el-table {
  margin-top: 10px;
}
.el-pagination{
  float: right;
  margin-top: 20px;
  margin-right: 50px;
}
</style>
