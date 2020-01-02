<template>
  <div id="call">
    <el-form label-position="center" ref="form" :model="form" class="form">
      <el-row>
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-radio-group v-model="value" size="small" fill="#3e549d">
              <el-radio-button label="1">统计报表</el-radio-button>
              <el-radio-button label="2">数据可视化</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="4" v-if="value==1">
          <div class="grid-content bg-purple export">
            <el-button size="small" class="btn" type="primary">导出</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" v-if="value==1">
          <div class="grid-content bg-purple">
            <el-form-item label="时间" label-width="90px">
              <el-date-picker
                style="width:220px"
                v-model="form.timerange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
                value-format="yyyyMMddHHmmss"
                :default-time="rangeTime"
                @change="changeTime(form.timerange)"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6" v-if="value==1">
          <div class="grid-content bg-purple">
            <el-radio-group
              style="width:270px"
              @change="changeDate(form.date)"
              v-model="form.date"
              size="small"
              fill="#3e549d"
            >
              <el-radio-button label="1">今日</el-radio-button>
              <el-radio-button label="2">昨日</el-radio-button>
              <el-radio-button label="3">最近7天</el-radio-button>
              <el-radio-button label="4">最近30天</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="停车场" label-width="80px">
              <el-select
                @change="chooseParkCode(form.parkCode)"
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
                  :value="item.park_code"
                  :label="item.full_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="区域" label-width="80px">
              <el-select v-model="form.regionCode" clearable placeholder="请选择区域" size="small">
                <el-option value label="全部"></el-option>
                <el-option
                  v-for="(item,i) in regionCodeList"
                  :key="i"
                  :value="item.region_code"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" v-if="value==1">
          <div class="grid-content bg-purple">
            <el-form-item label="接听状态">
              <el-select
                placeholder="请选择接听状态"
                style="width:200px"
                v-model="form.status"
                clearable
                size="small"
              >
                <el-option :value="0" label="等待处理"></el-option>
                <el-option :value="1" label="未处理"></el-option>
                <el-option :value="2" label="处理中"></el-option>
                <el-option :value="3" label="已处理"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7" v-if="value==1">
          <div class="grid-content bg-purple">
            <el-form-item label="呼叫类型">
              <el-select
                placeholder="请选择呼叫类型"
                style="width:200px"
                v-model="form.type"
                clearable
                size="small"
              >
                <el-option value="1" label="按鍵呼叫"></el-option>
                <el-option value="2" label="自動呼叫"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="客服人员">
              <el-select v-model="form.userNo" clearable placeholder="请选择客服人员" size="small"></el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" class="btn" @click="onSubmit(form)" size="small">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row v-if="value==2" class="downRow" type="flex" justify="space-between">
      <el-col style="width:49.5%">
        <Pie
          chartId="Pie1"
          height="100%"
          width="100%"
          text="接听状态分析"
          :pieDatas="pieDatas1"
          :n="pieDatas1[0].value"
          txt="未接听次数"
        />
      </el-col>
      <el-col style="width:49.5%">
        <Pie
          chartId="Pie2"
          height="100%"
          width="100%"
          text="呼叫类型分析"
          :pieDatas="pieDatas2"
          :n="pieDatas2[0].value"
          txt="按键呼叫"
        />
      </el-col>
    </el-row>
    <el-row v-if="value==2" class="downRow" type="flex" justify="space-between">
      <el-col style="width:49.5%">
        <Pie
          chartId="Pie3"
          height="100%"
          width="100%"
          text="接听等待时长分析"
          :pieDatas="pieDatas3"
          :n="pieDatas3[0].value"
          txt="30s~60s"
        />
      </el-col>
      <el-col style="width:49.5%">
        <Pie
          chartId="Pie4"
          height="100%"
          width="100%"
          text="任务处理时长分析"
          :pieDatas="pieDatas4"
          :n="pieDatas4[1].value"
          txt="1~2分钟"
        />
      </el-col>
    </el-row>
    <el-row v-if="value==2" class="downRow">
      <el-col :span="24">
        <Bar chartId="Bar" height="100%" width="100%" text="开闸次数统计" />
      </el-col>
    </el-row>
    <el-row class="downRow2" v-if="value==1">
      <el-table :data="tableData" border style="width: 100%" :fit="true" v-loading="loading">
        <el-table-column width="60" fixed label="序号">
          <template slot-scope="scope">
            <span>{{(form.current-1)*form.size+ scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed prop="parkName" label="停车场"></el-table-column>
        <el-table-column fixed prop="regionName" label="区域"></el-table-column>
        <el-table-column fixed prop="devNo" label="呼叫器编号"></el-table-column>
        <el-table-column fixed :formatter="formatType" prop="type" label="呼叫类型"></el-table-column>
        <el-table-column :formatter="formatter" fixed prop="callTime" label="呼入时间"></el-table-column>
        <el-table-column :formatter="formatter3" fixed prop="status" label="接听状态"></el-table-column>
        <el-table-column fixed prop="waitTime" label="接听等待时长"></el-table-column>
        <el-table-column fixed prop="userNo" label="当班客服"></el-table-column>
        <el-table-column :formatter="formatter2" fixed prop="startTime" label="处理时间"></el-table-column>
        <el-table-column fixed prop="processTime" label="处理时长"></el-table-column>
        <el-table-column fixed prop="remark" label="未接听原因"></el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current"
          :page-size="form.size"
          :page-sizes="[10, 20, 50, 100]"
          background
          layout="total, prev, pager, next, sizes, jumper"
          :total="form.total"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import store from "../../store";
import Pie from "@/components/echarts/Pie.vue";
import Bar from "@/components/echarts/Bar.vue";
import { chooseDate } from "@/utils";
import { baseJavaUrl, kesbJavaURL, service } from "@/utils/api";
import { commodRequest } from "@/request/commodRequest";
import { queryRegionCode } from "@/request/parkRecord/queryRegionCode";
import { saveUserLogin } from "@/utils";
export default {
  components: { Pie, Bar },
  data() {
    return {
      value: "1",
      form: {
        timerange: "",
        date: "1",
        parkCode: "",
        regionCode: "",
        status: "",
        type: "",
        userNo: "",
        startTime: "",
        endTime: "",
        current: 1,
        size: 10,
        total: 0
      },
      rangeTime: ["00:00:00", "23:59:59"],
      pickerOptions: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      tableData: [],
      pieDatas1: [{ value: 0, name: "未接听" }, { value: 0, name: "已接听" }],

      pieDatas2: [
        { value: 0, name: "按键呼叫" },
        { value: 0, name: "自动呼叫" }
      ],
      pieDatas3: [
        { value: 0, name: "0~30s" },
        { value: 0, name: "30~60s" },
        { value: 0, name: "1分钟~2分钟" },
        { value: 0, name: "2分钟~4分钟" },
        { value: 0, name: "4分钟以上" }
      ],
      pieDatas4: [
        { value: 0, name: "0~30s" },
        { value: 0, name: "30~60s" },
        { value: 0, name: "1分钟~2分钟" },
        { value: 0, name: "2分钟~4分钟" },
        { value: 0, name: "4分钟以上" }
      ],
      regionCodeList: [],
      echartData: {},
      loading: false
      // answered: 0,
      // auto: 0,
      // button: 0,
      // missed: 0,
      // processFourMin: 0,
      // processMore: 0,
      // processSixty: 0,
      // processThirty: 0,
      // processTwoMin: 0,
      // waitFourMin: 0,
      // waitMore: 0,
      // waitSixty: 0,
      // waitThirty: 0,
      // waitTwoMin: 0
    };
  },
  methods: {
    changeDate: function(date) {
      this.form.timerange = chooseDate(date, this.form.timerange);
    },
    onSubmit: function(form) {
      if (this.value == 1) {
        this.form.startTime = form.timerange[0];
        this.form.endTime = form.timerange[1];
        this.form.current = 1;
        this.searchRecord();
      } else if (this.value == 2) {
        this.searchEchartsData();
      }
    },
    changeTime(value) {},
    //选择停车场
    chooseParkCode(val) {
      this.form.regionCode = "";
      const reqData = {
        park_code: val
      };
      queryRegionCode(
        reqData,
        this.$store.state.userLogin.cust_id,
        this.$store.state.userLogin.session
      ).then(res => {
        if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
          this.regionCodeList = [];
          let regionCodeList = res.data.ANSWERS[0].ANS_COMM_DATA;
          this.regionCodeList = regionCodeList;
        } else {
        }
      });
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.form.size = val;
      this.searchRecord();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.form.current = val;
      this.searchRecord();
    },
    //点击导出
    // exportToExcel() {
    //   require.ensure([], () => {
    //     const {
    //       export_json_to_excel
    //     } = require("../../assets/js/Export2Excel");
    //     const tHeader = [
    //       "序号",
    //       "停车场",
    //       "区域",
    //       "呼叫器编号",
    //       "呼叫类型",
    //       "呼入时间",
    //       "接听状态",
    //       "接听等待时长",
    //       "当班客服",
    //       "处理时间",
    //       "处理时长",
    //       "备注"
    //     ];
    //     const filterVal = [
    //       "index",
    //       "parkCode",
    //       "regionCode",
    //       "devNo",
    //       "type",
    //       "callTime",
    //       "status",
    //       "waitTime",
    //       "service",
    //       "startTime",
    //       "processTime",
    //       "remark"
    //     ];
    //     const list = this.tableData;
    //     const data = this.formatJson(filterVal, list);
    //     export_json_to_excel(tHeader, data, "呼叫记录excel");
    //   });
    // },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => v[j]));
    // },
    //查询呼叫记录
    searchRecord() {
      this.loading = true;
      const that = this;
      const reqData = {
        current: this.form.current,
        size: this.form.size,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        parkCode: this.form.parkCode,
        regionCode: this.form.regionCode,
        status: this.form.status,
        type: this.form.type,
        userNo: this.form.userNo
      };
      if (this.value == "2") {
        reqData.size = "";
      }

      // this.reWriteDatas();
      // console.log(reqData);
      this.$axios.post("/pagerSelect/searchRecord", reqData).then(res => {
        if (res) {
          const { records, size, current, total } = res.data;
          this.form.size = size;
          this.form.current = current;
          this.form.total = total;
          this.tableData = records;
          this.loading =false;
        } else {
          return false;
        }
      });
    },
    //查询统计图表
    searchEchartsData() {
      this.$axios
        .post("/pagerSelect/countInfo", {
          parkCode: this.form.parkCode
        })
        .then(res => {
          if (JSON.stringify(res.data) != "{}") {
            this.echartData = res.data;
          }
        });
    },
    formatter(row) {
      let moment = this.$moment(row.callTime, "YYYYMMDDHHmmss");
      return moment.format("YYYY-MM-DD HH:mm:ss");
    },
    formatter2(row) {
      let moment = this.$moment(row.startTime, "YYYYMMDDHHmmss");
      return moment.format("YYYY-MM-DD HH:mm:ss");
    },
    formatter3(row) {
      if (row.status == 0) {
        return "未处理";
      } else if (row.status == 1) {
        return "处理中";
      } else if (row.status == 2) {
        return "已处理";
      }
    },
    formatType(row) {
      if (row.type == 1) {
        return "按键呼叫";
      } else {
        return "自动呼叫";
      }
    }
  },
  computed: {
    ...mapState(["parkCodeList", "userLogin"])
  },
  watch: {
    echartData: {
      handler(val) {
        this.pieDatas1[0].value = val.answered;
        this.pieDatas2[0].value = val.auto;
        this.pieDatas2[1].value = val.button;
        this.pieDatas1[1].value = val.missed;
        this.pieDatas4[4].value = val.processFourMin;
        this.pieDatas4[0].value = val.processMore;
        this.pieDatas4[2].value = val.processSixty;
        this.pieDatas4[1].value = val.processThirty;
        this.pieDatas4[3].value = val.processTwoMin;
        this.pieDatas3[4].value = val.waitFourMin;
        this.pieDatas3[0].value = val.waitMore;
        this.pieDatas3[2].value = val.waitSixty;
        this.pieDatas3[1].value = val.waitThirty;
        this.pieDatas3[3].value = val.waitTwoMin;
      }
    }
  },
  mounted() {
    saveUserLogin(this);
    this.searchEchartsData();
  }
};
</script>

<style lang="scss" >
#call {
  height: 100vh;
  .downRow {
    margin-top: 10px;
    background: #f2f3f7;
    .el-col {
      background: #fff;
      height: 250px;
    }
  }
  .form {
    background: #fff;
    padding: 10px;
    .el-row {
      background: #fff;
      padding: 5px;
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
                  .el-input {
                    margin-top: 5px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .downRow2 {
    margin-top: 10px;
    padding: 10px;
    background: #fff;
    .cell {
      text-align: center;
    }
  }
}

.el-form-item__label {
  background: #f2f3f7;
  height: 32px;
  // margin-top: 5px;
  width: 104px;
  text-align: center;
  line-height: 32px;
  font-size: 12px;
}
.export {
  text-align: right;
}
.btn {
  background: #3e549d;
}
</style>