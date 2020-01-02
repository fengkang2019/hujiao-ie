<template>
  <div id="list">
    <el-form ref="form" :model="form" class="form">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="所属停车场">
              <el-select
                v-model="form.parkCode"
                clearable
                placeholder="请输入停车场名称"
                size="small"
                filterable
              >
                <el-option value label="全部"></el-option>
                <el-option
                  v-for="(item,i) in parkCodeList"
                  :key="i"
                  :label="item.full_name"
                  :value="item.park_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="呼叫器编号">
              <el-select v-model="form.devNo" clearable placeholder="请选择呼叫器编号" size="small">
                <el-option value label="全部"></el-option>
                <el-option v-for="(item,i) in devNo" :key="i" :value="item.devNo"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="2" class="btnCol">
          <div class="grid-content bg-purple">
            <el-button @click="searchList(form)" type="primary" class="btn" size="small">查询</el-button>
          </div>
        </el-col>
        <el-col :span="10" class="btnCol">
          <div class="grid-content bg-purple">
            <el-button @click="addCaller(visibleFlag)" type="primary" class="btn" size="small">新增呼叫器</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row style="background:#f2f3f7; border-bottom:1px solid #dddddd" class="chooseStatus">
        <el-col style="background:#f2f3f7" :span="24">
          <div class="grid-content bg-purple">
            <el-radio-group
              @change="changeType(form.type)"
              v-model="form.type"
              size="small"
              fill="#3e549d"
            >
              <el-radio-button label="pda">PDA管理</el-radio-button>
              <el-radio-button label="led">LED管理</el-radio-button>
              <el-radio-button label="outside">路外摄像头</el-radio-button>
              <el-radio-button label="caller">呼叫器</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <el-row style="background:#f2f3f7" class="chooseStatus">
        <el-col style="background:#f2f3f7" :span="24">
          <div class="grid-content bg-purple">
            <el-radio-group
              @change="changeStatus(form.status)"
              v-model="form.status"
              size="small"
              fill="#3e549d"
            >
              <el-radio-button label="0">正常</el-radio-button>
              <el-radio-button label="1">故障</el-radio-button>
              <el-radio-button label="2">报废</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="tableElRow" :stripe="true">
      <el-table :data="tableData" border style="width: 100%" :fit="true" v-loading="loading">
        <el-table-column fixed label="序号" width="60px">
          <template slot-scope="scope">
            <span>{{(form.current-1)*form.size+scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed prop="parkName" label="停车场"></el-table-column>
        <el-table-column fixed prop="regionName" label="区域"></el-table-column>
        <el-table-column fixed prop="gateName" label="通道"></el-table-column>
        <el-table-column fixed prop="devNo" label="呼叫器编号"></el-table-column>
        <el-table-column fixed prop="devVer" label="版本号" width="80"></el-table-column>
        <el-table-column :formatter="formatter" fixed prop="addTime" label="添加时间" width="150"></el-table-column>
        <el-table-column fixed prop="cameraId" label="设备ID"></el-table-column>
        <el-table-column fixed prop="monitorId" label="监控ID"></el-table-column>
        <el-table-column :formatter="formatter2" fixed prop="activeDate" label="启用时间"></el-table-column>
        <el-table-column
          key="1"
          v-if="form.status=='2'"
          :formatter="formatter3"
          fixed
          prop="heartTime"
          label="报废日期"
        ></el-table-column>
        <el-table-column key="2" v-if="form.status=='2'" fixed prop="timeBetween" label="使用时长"></el-table-column>
        <el-table-column
          key="3"
          v-if="form.status=='2'"
          fixed="right"
          prop="2State"
          width="150px"
          label="报废说明"
        ></el-table-column>
        <el-table-column key="4" v-if="form.status=='1'" fixed prop="modifyTime" label="停用时间"></el-table-column>
        <el-table-column
          key="5"
          v-if="form.status=='0'"
          :formatter="formatter4"
          fixed
          prop="endDate"
          label="到期日期"
        ></el-table-column>
        <el-table-column key="6" v-if="form.status!='2'" fixed="right" width="150px" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="form.status=='0'"
              @click="handleClick1(scope.row,scope.$index)"
              type="text"
              size="small"
            >故障</el-button>
            <el-button
              v-if="form.status=='0'"
              @click="handleClickEdit(scope.row)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              v-if="form.status=='1'"
              @click="handleClick0(scope.row,scope.$index)"
              type="text"
              size="small"
            >正常</el-button>
            <el-button
              v-if="form.status!='2'"
              @click="handleClickDetails(scope.row)"
              type="text"
              size="small"
            >详情</el-button>
            <el-button
              v-if="form.status!='2'"
              type="text"
              @click="handleClick2(scope.row,scope.$index)"
              size="small"
            >报废</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="form.current"
          :page-sizes="[10,20,50, 100]"
          :page-size="form.size"
          layout="total, prev, pager, next, sizes, jumper"
          :total="form.total"
          background
        ></el-pagination>
      </div>
    </el-row>
    <ChangeStatus :state="state" :msg="msg" :status="status" :currentData="currentData" />
    <Dialogs
      :flag="flag"
      :currentData="currentData"
      :regions="regionCodeList"
      :gates="GateCodeList"
      :visibleFlag="visibleFlag"
    />
  </div>
</template>

<script>
import { chooseDate } from "@/utils";
import Dialogs from "./Dialogs";
import ChangeStatus from "./ChangeStatus";
import { saveUserLogin } from "@/utils";
import { queryRegionCode } from "@/request/parkRecord/queryRegionCode";
import { queryGate } from "@/request/parkRecord/queryGate";
import { getCutoffReason } from "@/request/parkRecord/CutoffReason";
import { mapState } from "vuex";
export default {
  components: { Dialogs, ChangeStatus },
  data() {
    return {
      form: {
        status: "0",
        type: "caller",
        current: 1,
        size: 10,
        total: 0,
        devNo: ""
      },
      tableData: [],
      visibleFlag: false,
      //0 新增 1编辑 2详情
      flag: "1",
      state: false,
      //1 正常 2故障 3报废
      status: "0",
      msg: "",
      currentData: {},
      regions: [],
      gates: [],
      devNo: [],
      regionCodeList: [],
      GateCodeList: [],
      loading: false
    };
  },
  computed: {
    ...mapState(["userLogin", "parkCodeList"])
  },
  methods: {
    searchList: function(form) {
      this.search(form);
    },
    //点击新增
    addCaller: function() {
      this.visibleFlag = true;
      this.flag = "1";
      this.currentData = {
        parkCode: "",
        regionCode: "",
        gateCode: ""
      };
    },
    //确定新增设备
    confirmAdd(val) {
      console.log(val);
      this.$axios.post("/pagerInsert/insertDevice", val).then(res => {
        if (res) {
          this.search(this.form);
          this.$message.success("新增成功");
        }
      });
    },

    changeType(type) {},
    //点击单选 设备状态
    changeStatus(status) {
      this.form.status = status;
      this.tableData = [];
      this.search(this.form);
    },
    //改变每页数量
    handleSizeChange(val) {
      this.form.size = val;
      this.search(this.form);
    },
    //改变当前页数
    handleCurrentChange(val) {
      this.form.current = val;
      this.search(this.form);
    },
    //点击编辑
    handleClickEdit(val) {
      this.visibleFlag = true;
      this.flag = "2";
      this.currentData = val;
      let parkCode = val.parkCode;
      let regionCode = val.regionCode;
      if (parkCode) {
        this.getRegionCode(parkCode);
      }
      if (parkCode && regionCode) {
        this.getGateCode(parkCode, regionCode);
      }
    },
    //确认修改
    confirmEdit(val) {
      this.$axios.post("/pagerUpdate/updateDevice", val).then(res => {
        if (res) {
          this.search(this.form);
          this.$message.success("修改成功");
        }
      });
    },
    //点击详情
    handleClickDetails(row) {
      this.visibleFlag = true;
      this.flag = "3";
      this.currentData = row;
      let parkCode = row.parkCode;
      let regionCode = row.regionCode;
      if (parkCode) {
        this.getRegionCode(parkCode);
      }
      if (parkCode && regionCode) {
        this.getGateCode(parkCode, regionCode);
      }
    },
    //点击正常
    handleClick0(row, index) {
      this.state = true;
      this.status = "0";
      this.msg = "你确定设备状态为正常吗?";
      row.status = this.status;
      this.currentData = row;
    },
    //点击故障
    handleClick1(row, index) {
      console.log(row);
      this.state = true;
      this.status = "1";
      row.status = this.status;
      this.currentData = row;
      this.msg = "你确定设备状态为故障吗?";
    },
    //点击报废
    handleClick2(row, index) {
      this.state = true;
      this.status = "2";
      this.msg = "你确定设备状态为报废吗?";
      row.status = this.status;
      this.currentData = row;
    },
    //查询
    search(form) {
      if (form.type == "caller") {
        this.loading = true;
        let that = this;
        const reqData = {
          current: this.form.current,
          size: this.form.size,
          devNo: this.form.devNo,
          parkCode: this.form.parkCode,
          status: this.form.status
        };
        this.$axios.post("/pagerSelect/searchDevice", reqData).then(res => {
          if (res) {
            const { records, current, size, total } = res.data;
            this.form.total = total;
            this.form.size = size;
            this.form.current = current;
            this.tableData = records;
            this.loading = false;
          } else {
            this.$message.error("暂无数据");
            return false;
          }
        });
      } else {
        this.$message.error("暂无呼叫器以外数据");
        return false;
      }
    },
    formatter(row) {
      let moment = this.$moment(row.addTime, "YYYYMMDDHHmmss");
      return moment.format("YYYY-MM-DD HH:mm:ss");
    },
    formatter2(row) {
      let moment = this.$moment(row.activeDate, "YYYYMMDD");
      return moment.format("YYYY-MM-DD");
    },
    formatter3(row) {
      let moment = this.$moment(row.heartTime, "YYYYMMDDHHmmss");
      return moment.format("YYYY-MM-DD HH:mm:ss");
    },
    formatter4(row) {
      let moment = this.$moment(row.endDate, "YYYYMMDD");
      return moment.format("YYYY-MM-DD");
    },
    getDevices() {
      const reqData = {
        devNo: "",
        current: 1,
        size: 100
      };
      this.$axios.post("/pagerSelect/getDeviceState", reqData).then(res => {
        if (res.data.records.length > 0) {
          let datas = res.data.records;
          let devNo = [];
          for (var i = 0; i < datas.length; i++) {
            let obj = {};
            obj.devNo = datas[i].devNo;
            devNo.push(obj);
          }
          this.devNo = devNo;
        } else {
          return false;
        }
      });
    },
    //根据停车获得区域信息
    getRegionCode(parkCode) {
      queryRegionCode(
        { park_code: parkCode },
        this.$store.state.userLogin.cust_id,
        this.$store.state.userLogin.session
      ).then(res => {
        if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
          let regionCodeList = [];
          regionCodeList = res.data.ANSWERS[0].ANS_COMM_DATA;
          this.regionCodeList = regionCodeList;
        } else {
          return false;
        }
      });
    },
    //根据停车场和区域获取通道信息
    getGateCode(parkCode, regionCode) {
      queryGate(
        {
          park_code: parkCode,
          region_code: regionCode
        },
        this.$store.state.userLogin.cust_id,
        this.$store.state.userLogin.session
      ).then(res => {
        if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
          let GateCodeList = [];
          GateCodeList = res.data.ANSWERS[0].ANS_COMM_DATA;
          this.GateCodeList = GateCodeList;
        } else {
        }
      });
    }
  },
  mounted() {
    this.getDevices();
    saveUserLogin(this);
  }
};
</script>

<style lang="scss">
.el-form-item__label {
  background: #f2f3f7;
  height: 32px;
  margin-top: 5px;
  width: 104px;
  text-align: center;
  line-height: 32px;
}
#list {
  .form {
    .el-row {
      background: #fff;
      padding: 10px;
      .el-col {
        background: #fff;
        height: 40px;
        line-height: 40px;
        .bg-purple-dark {
          background: #fff;
          .bg-purple {
            background: #fff;
            .bg-purple-light {
              background: #fff;
              .grid-content {
                border-radius: 4px;
                min-height: 40px;
                background: #fff;
                line-height: 40px;
                .row-bg {
                  background: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
}
.btn {
  background: #3e549d;
  width: 80px;
}
.btnCol {
  .grid-content {
    text-align: right;
  }
}
.tableElRow {
  margin-top: 10px;
  text-align: right;
  padding: 10px;
  background: #fff;
  .cell {
    text-align: center;
    .el-button {
      padding: 0;
      margin: 0;
    }
  }
}
</style>