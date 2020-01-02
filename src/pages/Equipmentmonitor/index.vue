<template>
  <div id="monitor">
    <el-form ref="form" :model="form" class="form" label-width="100px">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item size="small" label="所属停车场">
              <el-select
                @change="choosePark(form.parkCode)"
                v-model="form.parkCode"
                placeholder="请选择停车场"
                filterable
                clear
              >
                <el-option label="全部" value></el-option>
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
            <el-form-item size="small" label="区域">
              <el-select v-model="form.regionCode" placeholder="请选择区域" clear>
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="(item,i) in regionCodeList"
                  :key="i"
                  :label="item.name"
                  :value="item.region_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button class="btn" size="small" type="primary" @click="search(form)">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="status">
      <el-col :span="24">
        <span>呼叫器状态说明:</span>
        <div class="online"></div>
        <span>在线</span>
        <div class="offline"></div>
        <span>离线</span>
        <div class="breakdown"></div>
        <span>故障</span>
      </el-col>
    </el-row>
    <el-row class="contentRow">
      <el-col class="contentCol" v-for="(item,i) in deviceStatusList" :key="i">
        <div class="grid-content bg-purple contentDiv" @mouseenter="getHeartInfo(item)">
          <div class="imageDiv">
          <img v-show="item.heartTime==1" src="@/assets/images/online.png" />
          <img v-show="item.heartTime==2" src="@/assets/images/offline.png" />
          <img v-show="item.heartTime==3" src="@/assets/images/breakdown.png" />
          </div>
          <p>所属停车场:</p>
          <p>{{item.parkName}}</p>
          <p>所属区域:</p>
          <p>{{item.regionName}}</p>
          <div class="hoverDiv">
            <p>所属停车场:</p>
            <p>{{heartInfo.length>0?heartInfo[0].parkName:""}}</p>
            <p>所属区域:</p>
            <p>{{heartInfo.length>0?heartInfo[0].regionName:""}}</p>
            <p>断网时间:</p>
            <p>{{heartInfo.length>0?formarTime(heartInfo[0].onlineEndtime):""}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { saveUserLogin } from "@/utils";
import { mapState } from "vuex";
import { queryRegionCode } from "@/request/parkRecord/queryRegionCode";
import { formarTime } from "@/utils";
export default {
  data() {
    return {
      form: {
        parkCode: "",
        regionCode: ""
      },
      regionCodeList: [],
      deviceStatusList: [],
      heartInfo: []
    };
  },
  computed: {
    ...mapState(["userLogin", "parkCodeList"])
  },
  mounted() {
    saveUserLogin(this);
  },
  methods: {
    search: function(form) {
      this.$axios
        .post("/pagerSelect/getDeviceState", {
          devNo: "",
          size: 100,
          current: 1,
          parkCode:form.parkCode,
          regionCode:form.regionCode,
        })
        .then(res => {
          if (res.data.records.length > 0) {
            this.deviceStatusList = res.data.records;
            console.log(this.deviceStatusList);
          } else {
            this.$message.error("暂无设备状态信息!");
          }
        });
    },
    choosePark(val) {
      const reqData = {
        park_code: val
      };
      queryRegionCode(
        reqData,
        this.$store.state.userLogin.cust_id,
        this.$store.state.userLogin.session
      ).then(res => {
        if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
          this.form.regionCode = "";
          this.regionCodeList = res.data.ANSWERS[0].ANS_COMM_DATA;
          console.log(this.regionCodeList);
        } else {
        }
      });
    },
    getHeartInfo(val) {
      this.heartInfo=[];
      if (this.heartInfo.length == 0) {
        this.$axios
          .post("/pagerSelect/searchHeart", {
            parkCcode: val.parkCode,
            regionCcode: val.regionCode,
            devNo: val.devNo
          })
          .then(res => {
            if (res.data.length > 0) {
              this.heartInfo = res.data;
            } else {
              return false;
            }
          });
      }
    },
    formarTime(time) {
      let moment = this.$moment(time, "YYYYMMDDHHmmss");
      return moment.format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="scss">
#monitor {
  width: 100%;
  height: 100%;
  .el-form-item__label {
    background: #f2f3f7;
    height: 32px;
    margin-top: 5px;
    width: 104px;
    text-align: center;
    line-height: 32px;
    font-size: 12px;
  }
  .status {
    height: 40px;
    margin-top: 15px;
    .el-col {
      height: 40px;
      background: #fff;
      border-bottom: 1px solid #dddddd;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 12px;
      padding: 10px;
      span {
        margin-left: 10px;
      }
      div.online {
        background: #1eaf54;
      }
      div.offline {
        background: #838383;
      }
      div.breakdown {
        background: #de4a2e;
      }
      div {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-left: 20px;
      }
    }
  }
  .contentRow {
    background: #fff;
    // height: 260px;
    .contentCol {
      padding: 10px;
      width: 14%;
      height: 260px;
      .contentDiv {
        width: 100%;
        height: 100%;
        background: #f6f6f6;
        border-radius: 10px;
        border: 1px solid #e0e0e0;
        text-align: center;
        position: relative;
        div.imageDiv{
           margin-top: 10px;
           height:137px;
        }
        p {
          width: 100%;
          text-align: left;
          text-indent: 3rem;
          line-height: 20px;
        }
        p:nth-child(2n) {
          font-weight: 700;
        }
        div.hoverDiv {
          position: absolute;
          background: #8a8a8a;
          width: 100%;
          height: 60%;
          bottom: 0;
          left: 0;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          border: 1px solid #e0e0e0;
          display: none;
        }
      }
      div.hoverDiv > p:first-child {
        margin-top: 10px;
      }
      div.hoverDiv > p:nth-child(2n + 1) {
        font-weight: 700;
      }
      div.hoverDiv > p:nth-child(2n) {
        font-weight: 500;
      }
      .grid-content:hover div.hoverDiv {
        display: block;
        color: #fff;
      }
    }
  }
  .form {
    font-size: 12px;
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

  .btn {
    background: #3e549d;
  }
  .el-input {
    margin-top: 5px;
  }
}
</style>