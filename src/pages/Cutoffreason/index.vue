<template>
  <div id="cutoffreason">
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
            <el-button size="small" class="btn" type="primary" @click="exportToExcel">导出</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
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
        <el-col :span="6">
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
                v-model="form.parkCode"
                clearable
                placeholder="请输入停车场名称"
                size="small"
                filterable
                @change="chooseParkCode(form.parkCode)"
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
            <el-form-item label="车牌号">
              <el-input placeholder="请选择车牌号" style="width:200px" v-model="form.carId" size="small"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7" v-if="value==1">
          <div class="grid-content bg-purple">
            <el-form-item label="异常开闸原因">
              <el-select
                placeholder="请选择异常开闸原因"
                style="width:200px"
                v-model="form.outoperate"
                clearable
                size="small"
              >
                <el-option value label="全部"></el-option>
                <el-option
                  v-for="(item,i) in abnormal"
                  :key="i"
                  :label="item.item"
                  :value="item.cval"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7" v-if="value==1">
          <div class="grid-content bg-purple">
            <el-form-item label="开闸人">
              <el-select v-model="form.operator" clearable placeholder="请选择客服人员" size="small">
                <el-option value label="全部"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" class="btn" @click="searchReason(form)" size="small">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="tableRow" v-if="value==1">
      <el-table :data="tableData" border style="width: 100%" :fit="true" v-loading="loading">
        <el-table-column fixed prop="index" label="序号" width="60px">
          <template slot-scope="scope">
            <span>{{(form.currentPage-1)*form.pagesize+scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed prop="parkCode" label="停车场"></el-table-column>
        <el-table-column fixed prop="regionCode" label="区域"></el-table-column>
        <el-table-column fixed prop="devNo" label="呼叫器编号"></el-table-column>
        <el-table-column fixed prop="carId" label="车牌号"></el-table-column>
        <el-table-column fixed prop="callTime" label="呼入时间"></el-table-column>
        <el-table-column fixed prop="operator" label="开闸人"></el-table-column>
        <el-table-column fixed prop="abnormal" label="异常开闸原因"></el-table-column>
        <el-table-column fixed prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="lookPic(scope.row)" type="text" size="small">查看图片</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.currentPage"
          :page-size="form.pagesize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, prev, pager, next, sizes, jumper"
          :total="form.total"
          background
          :pager-count="5"
        ></el-pagination>
      </div>
    </el-row>

    <el-row class="chartsRow" v-if="value==2">
      <el-col :span="24">
        <my-bar chartId="Bar2" height="100%" width="100%" text="开闸次数统计" />
      </el-col>
    </el-row>
    <el-row class="chartsRow" v-if="value==2" type="flex" justify="space-between">
      <el-col style="width:49.7%">
        <!-- <Pie chartId="Pie5" height="100%" width="100%" text="异常开闸时段分析" /> -->
      </el-col>
      <el-col style="width:49.7%">
        <!-- <Pie chartId="Pie6" height="100%" width="100%" text="异常开闸车牌类型分析" /> -->
      </el-col>
    </el-row>
    <LookImage :imageVisible="imageVisible" />
  </div>
</template>

<script>
import { chooseDate } from "@/utils";
import LookImage from "./LookImage";
import { mapState } from "vuex";
import { saveUserLogin } from "@/utils";
import { queryRegionCode } from "@/request/parkRecord/queryRegionCode";
import { getCutoffReason } from "@/request/parkRecord/CutoffReason";

export default {
  components: { LookImage },
  data() {
    return {
      value: "1",
      form: {
        timerange: [],
        date: "1",
        carId: "",
        operator: "",
        outoperate: "",
        startTime: "",
        endTime: "",
        currentPage: 1,
        pagesize: 10,
        total: 400
      },
      rangeTime: ["00:00:00", "23:59:59"],
      pickerOptions: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      tableData: [
        {
          index: "1",
          parkCode: "sss",
          regionCode: "上海",
          devNo: "12344",
          carId: "鄂A123456",
          callTime: "2019 - 10 - 1",
          e: "一接听",
          abnormal: "30",
          remark: "xxxxx"
        }
      ],
      imageVisible: false,
      regionCodeList: [],
      abnormal: [],
      loading: false
    };
  },
  methods: {
    changeDate(date) {
      this.form.timerange = chooseDate(date, this.form.timerange);
    },
    searchReason(form) {
      this.form.startTime = form.timerange[0] ? form.timerange[0] : "";
      this.form.endTime = form.timerange[1] ? form.timerange[1] : "";
      console.log(form);
      this.search();
    },
    //查找开闸原因统计
    search() {
      const reqData = {
        parkCode: this.form.parkCode,
        regionCode: this.form.regionCode,
        carId: this.form.carId,
        outoperate: this.form.outoperate,
        operator: this.form.operator,
        start: this.form.startTime,
        end: this.form.endTime
      };
      this.$axios
        .post("/pagerSelect/searchHandleRecord", reqData)
        .then(res => {});
    },
    changeTime(value) {console.log(value)},
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.form.pagesize = val;
      this.search();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.form.currentPage = val;
      this.search();
    },
    //选择停车场得到区域
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
    // 点击导出
    exportToExcel: function() {
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../assets/js/Export2Excel");
        const tHeader = [
          "序号",
          "停车场",
          "区域",
          "呼叫器编号",
          "车牌号",
          "呼入时间",
          "开闸人",
          "异常开闸原因",
          "备注"
        ];
        const filterVal = [
          "series",
          "parkCode",
          "regionCode",
          "devNo",
          "carId",
          "callTime",
          "operator",
          "outoperate",
          "remark"
        ];
        const list = this.tableData;
        let exportLoad = this.$loading({
          text: "正在导出开闸原因数据...",
          background: "rgba(0,0,0,0.3)"
        });
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "开闸原因excel");
        exportLoad.close();
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    //查看图片
    lookPic(val) {
      this.imageVisible = true;
    }
  },
  computed: {
    ...mapState(["userLogin", "parkCodeList"])
  },
  mounted() {
    saveUserLogin(this);
    getCutoffReason({ category_en: "except_open_gate" }).then(res => {
      if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
        this.abnormal = res.data.ANSWERS[0].ANS_COMM_DATA;
      }
    });
  }
};
</script>

<style lang="scss">
#cutoffreason {
  width: 100%;
  height: 100%;

  .chartsRow {
    width: 100%;
    margin-top: 10px;
    height: 235px;
    background: #ececec;
    .el-col {
      height: 235px;
    }
  }
  .form {
    padding: 10px;
    background: #fff;
    .el-row {
      padding: 5px;
    }
  }
  .tableRow {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    background: #fff;
  }
}
.export {
  text-align: right;
}
.el-row {
  background: #fff;
  .el-col {
    background: #fff;
    height: 40px;
    line-height: 40px;
    padding: 5px;
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
</style>