<template>
  <div id="pwd">
    <el-dialog title="修改密码" :visible.sync="visible3" width="30%" :before-close="handleClose">
      <el-form size="small" label-width="120px" :model="form" :rules="rules" ref="ruleChangePwd">
        <el-form-item label="新密码:" prop="pwd">
          <el-input type="password" v-model="form.pwd" autocomplete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码:" prop="pwd2">
          <el-input type="password" v-model="form.pwd2" autocomplete="off" placeholder="请输入电话号码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn" @click="cancel">取 消</el-button>
        <el-button size="small" class="btn" type="primary" @click="confirm(form)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible3", "currentData"],
  data() {
    return {
      form: {
        pwd: "",
        pwd2: ""
      },
      rules: {
        pwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        pwd2: [{ required: true, message: "请再次输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClose() {
      this.$parent.closeDialog();
    },
    cancel() {
      this.$parent.closeDialog();
    },
    // confirmPassword: "56a5ba871d9eea1b3233c376dea20088"
    // cust_id: "4010000121642"
    // new_pwd: "56a5ba871d9eea1b3233c376dea20088"
    // pwd_type: 1
    confirm(form) {
      if (form.pwd === form.pwd2) {
        this.$refs.ruleChangePwd.validate(val => {
          if (val) {
            this.$parent.updatePwd(form);
            this.$parent.closeDialog();
          } else {
            return false;
          }
        });
      } else {
        this.$message.error("两次密码不一致");
        return false;
      }
    }
  },

  mounted() {}
};
</script>

<style lang="scss">
#pwd {
  .el-form {
    .el-form-item__label {
      background: #fff;
      text-align: right;
    }
  }
  .btn{
    color: #fff;
    background: #3e549d;
  }
}
</style>