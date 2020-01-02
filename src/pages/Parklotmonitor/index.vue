<template>
  <div class="parklotmonitor">
    <el-form label-position="center" ref="form" :model="form" class="form">
      <el-row>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="时间">
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
        <el-col :span="7">
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
      </el-row>
      <el-row>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="停车场">
              <el-select
                @change="choosePark(form.parkCode)"
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
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="区域">
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
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="视屏类型">
              <el-select v-model="form.type" clearable placeholder="请选择视屏类型" size="small">
                <el-option value="" label="全部"></el-option>
                <el-option value="1" label="监控"></el-option>
                <el-option value="2" label="呼叫器"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col class="btnCol" :span="3">
          <div class="grid-content bg-purple">
            <el-button type="primary" class="btn" @click="onSubmit(form)" size="small">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="videoArea">
      <el-col>
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col>
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col>
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col>
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col>
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col>
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { chooseDate, saveUserLogin } from "@/utils";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { queryRegionCode } from "@/request/parkRecord/queryRegionCode";
import { queryGate } from "@/request/parkRecord/queryGate";
export default {
  data() {
    return {
      form: {
        parkCode: "",
        regionCode: "",
        type: "",
        timerange: "",
        date: "1",
        startTime: "",
        endTime: ""
      },
      rangeTime: ["00:00:00", "23:59:59"],
      pickerOptions: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      regionCodeList: []
    };
  },
  methods: {
    changeDate: function(date) {
      this.form.timerange = chooseDate(date, this.form.timerange);
    },
    changeTime(value) {},
    onSubmit: function(form) {
      this.form.startTime = form.timerange[0];
      this.form.endTime = form.timerange[1];
      console.log(form);
    },
    choosePark(val) {
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
          // this.regionCodeList = [];
          let regionCodeList = res.data.ANSWERS[0].ANS_COMM_DATA;
          this.regionCodeList = regionCodeList;
        } else {
        }
      });
    }
  },
  computed: {
    ...mapState(["parkCodeList", "userLogin"])
  },
  mounted() {
    saveUserLogin();
  }
};
</script>

<style lang="scss">
.el-form-item__label {
  background: #ececec;
  height: 32px;
  margin-top: 5px;
  width: 104px;
  text-align: center;
  line-height: 32px;
}
.form {
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
              }
            }
          }
        }
      }
    }
  }
}
.parklotmonitor {
  height: 100%;
  .videoArea {
    margin-top: 10px;
    height: 500px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .el-col {
      height: 50%;
      width: 33%;
      background: #fff;
      padding: 10px;

      .grid-content {
        width: 100%;
        height: 100%;
        background: #f2f3f7;
      }
    }
  }
}
.btnCol {
  text-align: center;
  .btn {
    background: #3e549d;
  }
}
</style>