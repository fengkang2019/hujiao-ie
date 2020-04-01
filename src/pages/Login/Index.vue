<template>
  <div class="login" ref="emergencyCommandPage" @keydown.enter="onSubmit(login)">
    <el-row>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <img src="../../assets/images/leftpic.png" alt />
        </div>
      </el-col>
      <el-col class="rightCol" :span="10">
        <div class="grid-content bg-purple">
          <p>欢迎登陆运维平台</p>
          <el-form :model="login" :rules="rules" ref="logForm">
            <el-form-item prop="usr_code">
              <el-input
                placeholder="请输入用户名"
                prefix-icon="el-icon-user-solid"
                v-model="login.usr_code"
              ></el-input>
            </el-form-item>
            <el-form-item prop="trade_pwd">
              <el-input
                placeholder="密码"
                type="password"
                prefix-icon="el-icon-lock"
                v-model="login.trade_pwd"
              ></el-input>
            </el-form-item>
            <el-form-item class="check">
              <el-checkbox v-model="checked">记住用户名密码</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button :round="round" class="btn" type="primary" @click="onSubmit(login)">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { acctCustLogin } from "@/request/account/AccountLogin";
import { acctQueryOperatorByName } from "@/request/account/AccountQueryOpratorByName";
import {
  queryEnterpriseByAccountId,
  queryNewEnterpriseByAccountId
} from "@/request/account/QueryEnterpriseByAccountId";
import md5 from "js-md5";
import { mapMutations, mapState } from "vuex";
import { baseJavaUrlG } from "@/utils/api";
import { saveUserLogin, setCookie, getCookie } from "@/utils";
export default {
  data() {
    return {
      login: {
        usr_code: "",
        trade_pwd: ""
      },
      rules: {
        usr_code: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        trade_pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      round: false,
      checked: true,
      userLogin: {}
    };
  },
  methods: {
    onSubmit: function(login) {
      const that = this;
      this.$refs.logForm.validate(valid => {
        if (valid) {
          const reqData = {
            login_from_type: "51",
            usr_code: login.usr_code,
            trade_pwd: md5(md5(login.trade_pwd) + 12345678)
          };
          acctCustLogin(reqData, "0", "").then(res => {
            if (typeof res != "object") {
              this.$message.error(res);
              return false;
            } else {
              this.$axios
                .all([
                  this.myQueryEnterpriseByAccountId(res[0]),
                  this.myNewQueryEnterpriseByAccountId(res[0]),
                  this.userAssignRequest(res[0])
                ])
                .then(
                  this.$axios.spread(function(acct, agentTree, role) {
                    let parkCodeList = acct.filter(item => {
                      return item.type == 4;
                    });
                    that.$store.commit("saveParkCodeList", parkCodeList);
                  })
                );
              this.userLogin = res[0];
              this.$store.commit("saveUserLogin", this.userLogin);
              //记住密码
              if (this.checked) {
                if (!localStorage.getItem("account")) {
                  localStorage.setItem(
                    "account",
                    JSON.stringify({
                      user: login.usr_code,
                      trade_pwd: login.trade_pwd
                    })
                  );
                 
                }
              } else {
                localStorage.removeItem("account");
              }

              if (this.$store.state.route) {
                this.$router.push({ name: this.route });
              } else {
                this.$router.push({ name: "longcutoff" });
              }
            }
          });
        } else {
          this.$message.error("用户名或密码不能为空!");
          return false;
        }
      });
    },
    myQueryEnterpriseByAccountId(param) {
      let ansCommData = param;
      var reqData = {
        cust_parent_id: ansCommData.ent_cust_id,
        isself: "1",
        park: "1",
        maxid: "0",
        maxcount: "10000"
      };
      return queryEnterpriseByAccountId(
        reqData,
        ansCommData.cust_id,
        ansCommData.session
      );
    },
    myNewQueryEnterpriseByAccountId(param) {
      let ansCommData = param;
      var reqData = {
        cust_parent_id: ansCommData.ent_cust_id,
        isself: true
      };
      return queryNewEnterpriseByAccountId(
        reqData,
        ansCommData.cust_id,
        ansCommData.session
      );
    },
    userAssignRequest(data) {
      let custId = data.cust_id;
      let session = data.session;
      let userCode = data.name;
      let reqData = {
        usr_code: userCode //操作员名
      };
      return acctQueryOperatorByName(reqData, custId, session);
    }
  },
  mounted() {
  
  },
  computed: {
    ...mapState(["route"])
  },
  beforeRouteEnter(to, from, next) {
    // 注意，在路由进入之前，组件实例还未渲染，所以无法获取this实例，只能通过vm来访问组件实例
    next(vm => {
      if (localStorage.getItem("account")) {
        vm.login.usr_code = JSON.parse(localStorage.getItem("account")).user;
        vm.login.trade_pwd = JSON.parse(
          localStorage.getItem("account")
        ).trade_pwd;
      }
    });
  }
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/loginBackground.png") no-repeat;
  background-size: cover;
  .el-row {
    width: 960px;
    height: 460px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .el-col {
      height: 100%;
      .grid-content {
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
        p {
          height: 100px;
          line-height: 100px;
          font-size: 18px;
          color: #393939;
        }
        .el-button {
          width: 100%;
        }
        .check {
          text-align: right;
        }
        .el-input {
          outline-color: #3d539e;
          color: #3d539e;
        }
        .el-checkbox__inner {
          background-color: #3d539e;
          border: 1px solid #3d539e;
          color: #3d539e;
        }
      }
    }
    .rightCol {
      background: #fff;
      box-sizing: border-box;
      padding: 40px;
    }
  }
}
</style>