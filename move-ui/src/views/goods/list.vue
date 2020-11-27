<template>
  <div>
    <!-- 表格列表渲染 -->
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="100">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="100">
      </el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl + item.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
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
    <el-pagination
      :page-size="goodsSize"
      background
      layout="prev, pager, next"
      :total="goodsCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";

import { getGoodsDelete } from "../../util/axios";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      goodsCount: "goods/getGoodsCount",
      goodsSize: "goods/getGoodsSize",
    }),
  },
  mounted() {
    //组件一加载就触发调取列表
    this.getGoodsList();
    this.getGoodsCount();
  },

  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsListAction",
      getGoodsCount: "goods/getGoodsCountAction",
      getGoodsPage: "goods/changePageAction",
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
          getGoodsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新触发总页数
              this.getGoodsCount();
            } else {
              this.$message.error(res.data.msg);
            }
          });
          //重新触发调取列表
          this.getGoodsList();
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
    currentChange(e) {
      this.getGoodsPage(e);
    },
  },
};
</script>

<style lang="" scoped>
.el-table {
  margin-top: 10px;
}
.el-pagination {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
}
.img{
  width: 100px;
}
</style>
