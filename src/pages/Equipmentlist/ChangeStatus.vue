<template>
  <el-dialog
    :title="status=='0'?'正常':status=='1'?'故障':'报废'"
    :visible.sync="state"
    width="30%"
    :before-close="handleClose"
  >
    <div class="contentDiv1">
      <i class="el-icon-warning"></i>
      {{msg}}
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="btn" size="small" @click="cancel()">取 消</el-button>
      <el-button class="btn" size="small" type="primary" @click="confirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["state", "msg", "status", "currentData"],
  data() {
    return {};
  },
  methods: {
    handleClose: function() {
      this.$parent.state = false;
    },
    confirm: function() {
      this.$parent.state = false;
      if (this.status == "0") {
        this.$parent.confirmEdit(this.currentData);
      } else if (this.status == "1") {
        this.$parent.confirmEdit(this.currentData);
      } else {
        this.$parent.confirmEdit(this.currentData);
      }
      this.$parent.state = false;
    },
    cancel: function() {
      this.$parent.state = false;
    }
  },
  mounted() {
    console.log(this.state);
  }
};
</script>

<style lang="scss">
.contentDiv1 {
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 20px;
    color: orange;
  }
}
.btn{
  background: #3e549d;
  color: #fff;
}
</style>