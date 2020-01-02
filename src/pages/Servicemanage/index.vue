
<template>
  <div id="service">
    <div class="searchForm">
      <el-form size="small" :inline="true" :model="form">
        <el-form-item label="停车场：">
          <el-select
            v-model="form.parkCode"
            placeholder="请选择停车场"
            @change="chooseParkCode(form.parkCode)"
            filterable
          >
            <el-option vlaue label="全部"></el-option>
            <el-option
              v-for="(item,i) in parkCodeList"
              :key="i"
              :value="item.park_code"
              :label="item.full_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客服姓名：">
          <el-input v-model="form.name" placeholder="请输入客服姓名"></el-input>
        </el-form-item>
        <el-button size="small" type="primary" @click="onSubmit(form)" class="btn">查询</el-button>
        <el-button size="small" type="primary" @click="openAdd(form)" class="fr btn">
          <i class="el-icon-plus"></i>新增
        </el-button>
      </el-form>
    </div>
    <div class="tableInfo">
      <el-table :data="tableData" stripe style="width: 100%" border v-loading="loading">
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{(form.current-1)*form.size+scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="opername" label="账号"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="gender" label="性别" :formatter="formatter"></el-table-column>
        <el-table-column prop="permission" label="权限"></el-table-column>
        <el-table-column prop="groupNames" label="授权停车场">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="openAuthInfo(scope.row)"
              size="small"
            >{{scope.row.groupNames[0]?scope.row.groupNames[0].name:""}}</el-button>
          </template>
        </el-table-column>
        <el-table-column width="350" prop="option" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDetail(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="openEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="openDisable(scope.row)">禁用</el-button>
            <el-button type="text" size="small" @click="openChangePwd(scope.row)">修改密码</el-button>
            <!-- <el-button type="text" size="small" @click="openDelete(scope.row)">删除</el-button> -->
            <el-button type="text" size="small" @click="openAuthorization(scope.row,form)">授权停车场</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="form.current"
          :page-sizes="[2, 3, 5, 10]"
          :page-size="form.size"
          layout="total, prev, pager, next, sizes, jumper"
          :total="form.total"
          background
        ></el-pagination>
      </div>
    </div>

    <Detail :visible1="visible1" :type="type" :currentData="currentData" :form="form" />
    <ChangeState :visible2="visible2" :type2="type2" :text="text" :currentData="currentData" />
    <ChangePwd :visible3="visible3" :currentData="currentData" />
    <Auth
      :visible4="visible4"
      :form="form"
      :groups="groups"
      :userNo="userNo"
      :groupsRight="groupsRight"
    />
    <DialogTable :visible5="visible5" :groupNames="groupNames" />
  </div>
</template>

<script>
import { baseJavaUrlG } from "@/utils/api";
import Detail from "./Detail";
import ChangeState from "./ChangeState";
import ChangePwd from "./ChangePwd";
import Auth from "./Auth";
import DialogTable from "./DialogTable";
import { acctOperAddOperator } from "@/request/account/AddAccount";
import { acctSetCustPwd } from "@/request/account/EditAccount";
import md5 from "js-md5";
import { mapState } from "vuex";
import { saveUserLogin } from "@/utils";
export default {
  components: { Detail, ChangeState, ChangePwd, Auth, DialogTable },
  data() {
    return {
      form: {
        parkCode: "",
        name: "",
        current: 1,
        size: 10,
        total: 0
      },
      tableData: [],
      formLabelWidth: "120px",
      visible1: false,
      // 0新增 1 编辑 2详情
      type: 0,
      currentData: {},

      visible2: false,
      //启用 0 禁用1 删除2
      type2: 0,
      text: "",
      visible3: false,

      visible4: false,
      // 可分配 组
      groups: [],
      groupsRight: [],

      visible5: false,
      groupNames: [],
      userNo: "",
      loading: false
    };
  },
  methods: {
    //选择停车场
    chooseParkCode(form) {
      console.log(111);
      const reqData = form.parkCode;
    },
    //查找
    onSubmit(form) {
      console.log(form);
      this.form.current = 1;
      this.search(form);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.form.size = val;
      this.search(this.form);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.form.current = val;
      this.search(this.form);
    },
    //打开组 列表
    openAuthInfo(row) {
      console.log(row);
      this.groupNames = row.groupNames;
      this.visible5 = true;
    },
    //新增
    openAdd(form) {
      this.type = 0;
      this.currentData = {};

      this.visible1 = true;
    },
    //编辑
    openEdit(row) {
      this.type = 1;
      this.currentData = row;
      this.visible1 = true;
    },
    //详情
    openDetail(val) {
      console.log(val);
      this.type = 2;
      this.currentData = val;
      this.visible1 = true;
    },
    //禁用
    openDisable(row) {
      this.type2 = 1;
      this.text = "确定禁用该账号吗?";
      this.currentData = row;
      this.visible2 = true;
    },
    //修改密码
    openChangePwd(row) {
      console.log(row);
      this.currentData = row;
      this.visible3 = true;
    },
    //确认修改密码
    updatePwd(form) {
      const reqData = {
        cust_id: this.currentData.custId,
        new_pwd: md5(form.pwd),
        confirmPassword: md5(form.pwd2),
        pwd_type: 1
      };

      console.log(reqData);
      acctSetCustPwd(
        reqData,
        this.$store.state.userLogin.cust_id,
        this.$store.state.userLogin.session
      ).then(res => {
        if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
          this.$message.success("修改密码成功");
        } else if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == "-42000002") {
          this.$message.error(res.data.ANSWERS[0].ANS_MSG_HDR.MSG_TEXT);
          this.$router.push({ name: "login" });
        } else {
          this.$message.error("修改密码失败");
        }
      });
    },

    //删除
    // openDelete(row) {
    //   this.type2 = 2;
    //   this.text = "确定删除该账号吗?";
    //   this.currentData = row;
    //   this.visible2 = true;
    // },
    //授权
    openAuthorization(row, form) {
      this.userNo = row.custId;
      this.groupsRight = row.groupNames;
      this.visible4 = true;
    },
    //关闭弹框
    closeDialog() {
      this.visible1 = false;
      this.visible2 = false;
      this.visible3 = false;
      this.visible4 = false;
      this.visible5 = false;
    },
    search(form) {
      this.loading = true;
      let that = this;
      const reqData = {
        parkCode: form.parkCode,
        name: form.name,
        size: form.size,
        current: form.current
      };
      this.$axios.post("pagerSelect/searchLoginInfo", reqData).then(res => {
        if (res) {
          const { records, current, size, total } = res.data;
          this.form.total = total;
          this.form.size = size;
          this.form.current = current;
          this.tableData = records;
          this.loading = false;
        } else {
          return false;
        }
      });
    },
    //禁用
    disableAccount(currentData) {
      let num = "1";
      const custId = currentData.custId;
      this.$axios.post(
        baseJavaUrlG +
          "/tAcctCustInfo/changeState?custId=" +
          custId +
          "&num=" +
          num
      );
    },
    formatter(row) {
      if (row.gender == 1) {
        return "男";
      } else {
        return "女";
      }
    },
    //查询所有组信息
    searchGroups() {
      this.$axios.post("/pagerSelect/searchParkGroup", {}).then(res => {
        console.log(res.data);
        if (res) {
          this.groups = res.data;
        }
      });
    }
  },
  beforeMounted() {},
  mounted() {
    //查询客服信息
    // this.$axios
    //   .post("/pagerSelect/searchParkUser", { parkCode: "" })
    //   .then(res => {
    //     if (res) {
    //       console.log(res.data[0].custId);
    //       this.form.name = res.data[0].custId;
    //     } else {
    //       return false;
    //     }
    //   });
    saveUserLogin(this);
    this.searchGroups();
  },
  computed: {
    ...mapState(["userLogin", "parkCodeList"])
  }
};
</script>
<style lang="scss">
#service {
  .el-form {
    .btn {
      margin-top: 5px;
    }
  }
}

.searchForm {
  padding: 20px 10px 0 10px;
  background: #fff;
}
.tableInfo {
  margin-top: 20px;
  padding: 10px;
  background: #fff;
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
.btn {
  background: #3e549d;
}
#service {
  .el-form-item__content {
    line-height: 40px;
  }
}
</style>
