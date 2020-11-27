<template>
  <div>
    <!-- 表格列表渲染 -->
    <el-table
      :data="userList"
      border
      style="width: 100%"
      row-key="id"
     
    >
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
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
            <el-button type="primary" size="small" @click="edit(item.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :page-size='userSize' background layout="prev, pager, next" :total="userCount" @current-change='currentChange'>
    </el-pagination>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";

import { getUserDelete } from "../../util/axios";

export default {
  data() {
    return {

    };
  },

  computed: {
    ...mapGetters({
      userList: "admin/getUserList",
      userCount: "admin/getUserCount",
      userSize: "admin/getUserSize",
    }),
  },
  mounted() {
    //组件一加载就触发调取列表
    this.getUserList();
    this.getUserCount();
  },

  methods: {
    ...mapActions({
      getUserList: "admin/getUserListAction",
      getUserCount: "admin/getUserCountAction",
      getUserPage: "admin/changePageAction",
    }),
    // 删除某一项
    del(uid) {
      this.$confirm("确定要删除当前数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getUserDelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg); 
              //重新触发总页数
              this.getUserCount();
              

            } else {
              this.$message.error(res.data.msg);
            }
          });
          //重新触发调取列表
              this.getUserList();
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
        this.getUserPage(e)
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
