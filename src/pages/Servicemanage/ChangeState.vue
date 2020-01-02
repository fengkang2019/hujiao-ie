<template>
  <div id="changeState">
    <el-dialog
      :title="type2==0?'启用':type2==1?'禁用':'删除'"
      :visible.sync="visible2"
      width="30%"
      :before-close="handleClose"
    >
      <div class="contentSpan">
        <i class="el-icon-warning"></i>
        {{text}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn"  type="primary"  @click="cancel">取 消</el-button>
        <el-button size="small" class="btn" type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { acctOperDelOperator } from "@/request/account/DelAccount";
import { baseJavaUrlG } from "@/utils/api";
export default {
  props: ["visible2", "text", "type2", "currentData"],
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$parent.closeDialog();
    },
    cancel() {
      this.$parent.closeDialog();
    },
    confirm() {
      //禁用
      // http://test.bj-jtjt.cn/cloud-park/tAcctCustInfo/changeState?custId=4010000121642&num=1
      // http://test.bj-jtjt.cn/cloud-park/tAcctCustInfo/changeState?custId=4010000010028&num=1
      if (this.type2 == 1) {
        this.$parent.disableAccount(this.currentData);
        //删除
      } else if (this.type2 == 2) {
        // acctOperDelOperator();
      }

      this.$parent.closeDialog();
    }
  }
};
</script>

<style lang="scss">
#changeState {
  .el-dialog__header {
    border-bottom: 1px solid #dcdcdc;
  }
  .contentSpan {
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
    .el-button {
      background: #3e549d;
      color: #fff;
    }
  }
}
</style>