<template>
  <!-- <el-dialog title="车位详情" :visible.sync="detailFlag" :before-close="handleClose"> -->
  <!-- <el-table :data="tableDatas"  border>
      <el-table-column type="index" label="序号"  :index="indexMethod" width="150"></el-table-column>
      <el-table-column property="regionName" label="区域" width="200"></el-table-column>
      <el-table-column property="carId" label="车辆"></el-table-column>
      <el-table-column property="intime" label="进场时间"></el-table-column>
      <el-table-column property="outtime" label="出场时间"></el-table-column>
  </el-table>-->

  <!-- </el-dialog> -->
  <el-drawer
    title="车位详情"
    :visible.sync="detailFlag"
    direction="rtl"
    size="30%"
    :before-close="close"
  >
    <el-table :data="tableDatas" border>
      <el-table-column type="index" label="序号" :index="indexMethod" width="80"></el-table-column>
      <el-table-column property="regionName" label="区域" width="150"></el-table-column>
      <el-table-column property="carId" label="车辆"></el-table-column>
      <el-table-column :formatter ="formatIntime" property="intime" label="进场时间"></el-table-column>
      <el-table-column :formatter="formatIntime" property="outtime" label="出场时间"></el-table-column>
    </el-table>
  </el-drawer>
</template>
<script>
export default {
  props: ["detailFlag", "tableDatas"],
  data() {
    return {};
  },
  methods: {
     close:function() {
      console.log(2)
      this.$parent.detailFlag = false;
    },
     formatIntime(row, column, cellValue) {
      if (cellValue == 0) {
        return "--";
      }
      let moment = this.$moment(cellValue, "YYYYMMDDHHmmss");
      return moment.format("YYYY-MM-DD HH:mm:ss");
    },
  }
};
</script>

<style>
</style>