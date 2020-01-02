<template>
  <el-dialog title="车位详情" :visible.sync="detailFlag" :before-close="handleClose">
    <el-table :data="tableDatas"  border>
      <el-table-column type="index" label="序号"  :index="indexMethod" width="150"></el-table-column>
      <el-table-column property="regionName" label="区域" width="200"></el-table-column>
      <el-table-column property="carId" label="车辆"></el-table-column>
      <el-table-column property="intime" label="进场时间"></el-table-column>
      <el-table-column property="outtime" label="出场时间"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default {
  props: ["detailFlag","tableDatas"],
  data() {
    return {
    };
  },
  methods: {
    handleClose: function() {
      this.$parent.detailFlag = false;
    },
     indexMethod(index) {
      return index
    },
  }
};
</script>

<style>
</style>