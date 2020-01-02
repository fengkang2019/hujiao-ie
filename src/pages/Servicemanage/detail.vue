<template>
  <div id="dialog">
    <el-dialog
      :title="type==0?'新增':type==1?'编辑':'详情'"
      :visible.sync="visible1"
      :before-close="handleClose"
      width="40%"
    >
      <el-form
        :disabled="type==2"
        size="small"
        label-width="120px"
        :model="currentData"
        :rules="rules"
        ref="ruleDetail"
      >
        <el-form-item label="用户类型:" prop="loginType">
          <el-select v-model="currentData.loginType" placeholder="请选择客户类型">
            <el-option label="操作员" :value="60"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="currentData.name" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio-group v-model="currentData.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话:" prop="mobile">
          <el-input v-model="currentData.mobile" autocomplete="off" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="账号:" prop="opername">
          <el-input v-model="currentData.opername" autocomplete="off" placeholder="请输入用户账号"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="tradePwd">
          <el-input type="password" v-model="currentData.tradePwd" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="开关闸权限:">
          <el-switch v-model="currentData.privilege"></el-switch>
        </el-form-item>
        <el-form-item v-if="type==2" label="授权停车场:">
          <el-table
            :show-header="false"
            :data="currentData.groupNames"
            :border="false"
            style="width: 100%"
          >
            <el-table-column prop="name" width="180"></el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span v-if="type!=2" slot="footer" class="dialog-footer">
        <el-button size="small" class="btn" type="primary" @click="cancel">取 消</el-button>
        <el-button size="small" class="btn" type="primary" @click="confirm(currentData)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { acctOperAddOperator } from "@/request/account/AddAccount";
import { acctOperModifyOperator } from "@/request/account/EditAccount";
import { saveUserLogin } from "@/utils";
import { mapState } from "vuex";
import md5 from "js-md5";
export default {
  props: ["visible1", "type", "currentData", "form"],
  data() {
    return {
      formLabelWidth: "120px",
      rules: {
        loginType: [
          { required: true, message: "请选择用户类型", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入电话", trigger: "blur" }],
        opername: [
          { required: true, message: "请输入账户名", trigger: "blur" }
        ],
        tradePwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  //编辑 参数
  //cust_id: "4010000120101"
  // gender: "1"
  // name: "flyos"
  // opername: "fly"
  // phone: "13500000004"
  // property: "1"

  //新增 参数
  //   cust_id: "8010000122010"
  // gender: "2"
  // name: "李牟牟"
  // opername: "jtjt_admin"
  // operroles: "10109"
  // phone: "15629564567"
  // property: "5"
  // trade_pwd: "56a5ba871d9eea1b3233c376dea20088"
  methods: {
    handleClose() {
      this.$parent.closeDialog();
    },
    cancel() {
      this.$parent.closeDialog();
    },
    confirm(currentData) {
      let that = this;
      this.$refs.ruleDetail.validate(val => {
        if (val) {
          if (this.type == 0) {
            const reqData = {
              cust_id:  this.$store.state.userLogin.cust_id,
              gender: currentData.gender,
              opername: currentData.opername,
              operroles: "10007",
              phone: currentData.mobile,
              name: currentData.name,
              trade_pwd: md5(currentData.tradePwd),
              property: "5",
              login_type: "60"
            };
            console.log(reqData);
            acctOperAddOperator(
              reqData,
              this.$store.state.userLogin.cust_id,
              this.$store.state.userLogin.session
            ).then(res => {
              if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
                that.$parent.search(that.form);
                this.$message.success("新增成功");
              } else {
                this.$message.error("新增失败");

                return false;
              }
            });
          } else if (this.type == 1) {
            const reqData = {
              cust_id: currentData.custId,
              gender: currentData.gender,
              opername: currentData.opername,
              phone: currentData.mobile,
              property: currentData.property
            };
            acctOperModifyOperator(
              reqData,
              this.$store.state.userLogin.cust_id,
              this.$store.state.userLogin.session
            ).then(res => {
              if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
                this.$message.success("修改成功");
              } else {
                this.$message.error("修改失败");

                return false;
              }
            });
          }

          this.$parent.closeDialog();
        } else {
          return false;
        }
      });
    }
  },
  computed: {
    // tableDatas: function() {
    //   let array = [];
    //   this.currentData.groupNames.map((item, index) => {
    //     let obj = {};
    //     obj.parkLot = item;
    //     array.push(obj);
    //   });
    //   console.log(array);
    //   return array;
    // }
    ...mapState(["userLogin"])
  },
  mounted() {
    saveUserLogin(this);
  }
};
</script>
<style lang="scss">
.fr {
  float: right;
}
.searchForm {
  padding: 20px 10px 0 10px;
  background: #fff;
}
.tableInfo {
  margin-top: 20px;
}
#dialog {
  .el-dialog__header {
    border-bottom: 1px solid #dcdcdc;
  }
  .el-form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .el-form-item {
      width: 300px;
      .el-form-item__content {
        line-height: 40px;
      }
      .el-form-item__label {
        background: #fff;
        text-align: right;
      }
    }
    .cell {
      text-align: left;
    }
  }
}

.marginTop {
  margin-top: 10px;
}
.tr {
  text-align: right;
  letter-spacing: 1px;
}
.margintb {
  margin: 15px 0;
}
.red {
  color: red;
}
// .el-button {
//   background: #3e549d;
//   color: #fff;
// }
</style>
