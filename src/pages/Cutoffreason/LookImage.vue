<template>
  <el-dialog title="查看图片" :visible.sync="imageVisible" width="30%" :before-close="handleClose">
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span> -->
    <div>
        
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["imageVisible"],
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$parent.imageVisible = false;
    }
  }
};
</script>

<style lang="scss">
</style>