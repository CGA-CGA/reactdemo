<template>
  <div>
    <!-- 表格列表渲染 -->
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
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
            <el-button type="primary" @click="edit(item.row.id)" size="small"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.id)" size="small"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入封装好的接口
import { getRoleDelete } from "../../util/axios";
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  mounted() {
    //组件一加载就触发调取列表
    this.getRoleList();
  },

  methods: {
    ...mapActions({
      getRoleList: "role/getRoleListAction",
    }),
    //删除操作
    del(id) {
      // console.log('删除事件');
      this.$confirm("确定要删除当前数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getRoleDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新触发调取列表
              this.getRoleList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 向父组件传递编辑事件
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-table {
  margin-top: 10px;
}
</style>
