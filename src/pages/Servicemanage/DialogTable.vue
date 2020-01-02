<template>
  <div id="table">
    <el-dialog title="授权停车场分组" :visible.sync="visible5" :before-close="handleClose" width="25%">
      <el-table :data="groupNames" border>
        <el-table-column type="index" class="btn" label="序号" :index="indexMethod" width="70"></el-table-column>
        <el-table-column property="name" class="btn" label="停车场分组"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible5", "groupNames"],
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$parent.closeDialog();
    },
    indexMethod(index) {
      return index + 1;
    }
  }
  //  computed: {
  //     gridDatas:function() {
  //       this.groupNames.map((item, index) => {
  //         const obj ={};
  //         obj.parkCode =item;
  //         this.gridData.push(obj)
  //       });
  //       return this.gridData;
  //     }
  //   }
};
</script>

<style lang="scss">
#table {
  .el-dialog__header {
    border-bottom: 1px solid #dcdcdc;
  }
  .el-dialog__body {
    .el-table {
      width: 100%;
    }
  }
  .el-button {
  background: #3e549d;
  color: #fff;
}
}

</style>