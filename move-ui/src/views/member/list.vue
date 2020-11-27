<template>
  <div>
    <!-- 表格列表渲染 -->
    <el-table :data="memberList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机" width="180">
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
            <el-button type="primary" @click="edit(item.row.uid)" size="small"
              >编辑</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  mounted() {
    //组件一加载就触发调取列表
    this.getMemberList();
    console.log(11);
  },

  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
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
