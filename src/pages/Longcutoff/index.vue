<template>
  <div id="cutoff">
    <el-row :gutter="4">
      <el-col class="left" :span="5" style="padding-left:0">
        <div class="grid-content bg-purple">
          <el-row class="callrecord">
            <el-col id="calling">
              <div class="title">呼叫记录</div>
              <el-tabs v-model="activeName">
                <el-tab-pane label="接听中" name="first">
                  <div
                    class="visible"
                    v-show="answerData.length>0"
                    v-for="(item,i) in answerData"
                    :key="i"
                  >
                    <!-- <p>
                      <span>呼叫器:</span>
                      <span>{{item.devNo}}</span>
                    </p>-->
                    <p>
                      <span>呼叫类型:</span>
                      <span>{{item.type==1?"按键呼叫":"自动呼叫"}}</span>
                    </p>
                    <p>
                      <span>呼入时间:</span>
                      <span>{{formatTime2(item.callTime)}}</span>
                    </p>
                    <p>
                      <span>停车场:</span>
                      <span>{{item.parkName}}</span>
                    </p>
                    <!-- <p>
                      <span>区域:</span>
                      <span>{{item.regionName}}</span>
                    </p>-->
                    <el-button type="primary" @click="hangup()">
                      <span class="iconfont icon-guaduan"></span>
                      挂断
                    </el-button>
                  </div>
                  <div class="hidden" v-show="!(answerData.length>0)">
                    <span class="iconfont icon-web__zanwujilu"></span>
                    <span>暂无接听记录</span>
                  </div>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label">
                    <el-badge class="mark" value="0">未接听</el-badge>
                  </span>
                  <!-- 配置管理 -->
                </el-tab-pane>
                <el-tab-pane label="已接听" name="third">
                  <!-- records2 -->
                  <div class="visible" v-show="state1" v-for="(item,i) in records2" :key="i">
                    <p>
                      <span>呼叫器:</span>
                      <span>{{item!=undefined?item.devNo:''}}</span>
                    </p>
                    <p>
                      <span>呼叫类型:</span>
                      <span>{{item!=undefined?item.type==1?"按键呼叫":"自动呼叫":''}}</span>
                    </p>
                    <p>
                      <span>呼入时间:</span>
                      <span>{{item!=undefined?formatTime2(item.callTime):''}}</span>
                    </p>
                    <p>
                      <span>停车场:</span>
                      <span>{{item!=undefined?item.parkName:''}}</span>
                    </p>
                    <p>
                      <span>区域:</span>
                      <span>{{item!=undefined?item.regionName:''}}</span>
                    </p>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
          <el-row v-for="(item,i) in records0" :key="i">
            <el-col>
              <div class="title">等待接听</div>
              <div class="awaitContent">
                <p>
                  <span>呼叫器:</span>
                  <span>{{item.devNo}}</span>
                </p>
                <p>
                  <span>呼叫类型:</span>
                  <span>{{item.type==1?"按键呼叫":"自动呼叫"}}</span>
                </p>
                <p>
                  <span>呼入时间:</span>
                  <span>{{formatTime2(item.callTime)}}</span>
                </p>
                <p>
                  <span>停车场:</span>
                  <span>{{item.parkName}}</span>
                </p>
                <p>
                  <span>区域:</span>
                  <span>{{item.regionName}}</span>
                </p>
                <el-button
                  @click="answer(item)"
                  :disabled="isAnswered"
                  class="animated pulse infinite"
                >
                  <span class="iconfont icon-dianhua"></span>
                  <span>接听</span>
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="title">设备列表</div>
              <div class="deviceStatu">
                <span></span>
                <span>在线:</span>
                <span>{{onlineCount}}</span>
                <span></span>
                <span>离线:</span>
                <span>{{offlineCount}}</span>
              </div>
              <el-input
                placeholder="请输入关键字"
                v-model="keyWord"
                clearable
                size="small"
                style="width:60%;margin-left:12%"
              ></el-input>
              <el-tree
                :data="deviceList"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :filter-node-method="filterNode"
                :default-expand-all="true"
                :highlight-current="true"
                class="nodeTree"
                icon-class="el-icon-folder-opened"
                ref="tree"
              >
                <span class="my-custom" slot-scope="{ node , data }">
                  <i
                    :class="[data.icon,data.action==1?'online icon-jingbao iconfont':'offline icon-jingbao iconfont']"
                  ></i>
                  <span>{{node.label}}</span>
                </span>
              </el-tree>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col class="center" :span="10">
        <div class="grid-content bg-purple">
          <OBJECT
            id="VSPOcxClient"
            classid="CLSID:DBD3400F-F12D-40C4-ACBF-3E1AE70F1558"
            width="1350"
            height="825"
            style="padding-top:0px;display:block;z-index:-1"
          >
            <param name="wmode" value="transparent" />
          </OBJECT>
        </div>
      </el-col>
      <el-col class="right" :span="9">
        <div class="grid-content bg-purple">
          <el-form
            ref="carform"
            :rules="rules"
            size="small"
            :model="form"
            label-width="0"
            :disabled="state4"
          >
            <el-row class="carNum">
              <el-col>
                <div class="searchCar">
                  <el-form-item prop="carNum" class="carNumFormItem">
                    <el-autocomplete
                      class="inline-input"
                      placeholder="请输入车牌"
                      v-model="form.carNum"
                      :fetch-suggestions="querySearch"
                      :trigger-on-focus="false"
                      @select="handleSelect"
                      @input="inputCarId(form.carNum)"
                    >
                      <i class="el-icon-search" slot="suffix" @click="searchCar(form)"></i>
                    </el-autocomplete>
                  </el-form-item>
                  <el-form-item class="resetFormItem" prop="reset">
                    <el-button class="reset" @click="resetForm()">刷新</el-button>
                  </el-form-item>
                </div>
                <div class="carType">
                  <el-form-item>
                    <el-select
                      :class="form.carNumColor==1?'blue':form.carNumColor==2?'yellow':form.carNumColor==3?'green':'gray'"
                      v-model="form.carNumColor"
                      placeholder
                      style="height:28px"
                    >
                      <el-option key="blue" class="blue" label="蓝牌" value="1"></el-option>
                      <el-option key="yellow" class="yellow" label="黄牌" value="2"></el-option>
                      <el-option key="green" class="green" label="绿牌" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <div class="carId">{{showCarId?showCarId:"--"}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row class="carRecord" v-loading="loading1">
              <el-col v-if="parkState" class="inCar">
                <p>
                  <span>入场</span>
                  <span>{{carInfo2[0]?formatTime(carInfo2[0].intime):""}}</span>
                </p>
                <p>
                  <span>时长</span>
                  <span>{{charge[0]?timeStamp(charge[0].park_time):""}}</span>
                </p>
                <p>
                  <span>停车费</span>
                  <span>{{charge[0]?charge[0].parkamt+"元":""}}</span>
                </p>
                <p>
                  <span>优惠</span>
                  <span>{{charge[0]?charge[0].coupon_amt+"元":""}}</span>
                </p>
                <p>
                  <span>需缴费</span>
                  <span
                    class="red"
                  >{{charge[0]?(charge[0].parkamt-charge[0].coupon_amt-charge[0].paidamt)+"元":""}}</span>
                </p>
                <p>
                  <span>已缴费</span>
                  <span>{{charge[0]?charge[0].paidamt+"元":""}}</span>
                </p>
              </el-col>
              <el-col v-if="!parkState" class="inCar2">
                <div class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-"></div>
                <p>暂无停车记录</p>
              </el-col>
            </el-row>
            <el-row class="detail" v-loading="loading2">
              <el-col v-if="!state4">
                <p>
                  <span>订单详情:</span>
                  <span>{{carInfo.commodity&&JSON.stringify(carInfo.commodity)!="{}"?formatTime(carInfo.commodity.ordertime)+" " +"支付渠道:"+ formatPayType(carInfo.commodity.payType) +" "+"支付状态:"+ formarOrderState(carInfo.commodity.orderstate):'无'}}</span>
                </p>
                <p>
                  <span>月卡车详情:</span>
                  <span>{{carInfo.member&&JSON.stringify(carInfo.member)!="{}"?formatTime3(carInfo.member.startDate)+"到"+formatTime3(carInfo.member.endDate):"无"}}</span>
                </p>
                <p>
                  <span>内部车详情:</span>
                  <span>{{carInfo.customCar&&JSON.stringify(carInfo.customCar)!="{}"?formatTime3(carInfo.member.startDate)+"到"+formatTime3(carInfo.member.endDate):"无"}}</span>
                </p>
                <p>
                  <span>储值车详情:</span>
                  <span>{{carInfo.assetsDetail&&JSON.stringify(carInfo.assetsDetail)!="{}"?"储值余额:"+carInfo.assetsDetail.fundavl+"元":"无"}}</span>
                </p>
                <p>
                  <span>多卡多车详情:</span>
                  <a>无</a>
                </p>
                <p>
                  <span>车位详情:</span>
                  <a
                    @click="findDetail()"
                    class="chewei"
                  >{{carInfo.member&&JSON.stringify(carInfo.member)!="{}"?carInfo.member.seatNum+"车位":"无"}}</a>
                </p>
              </el-col>
            </el-row>
            <el-row class="reason">
              <el-col>
                <el-tag @click="click1">自助缴费未下发</el-tag>
                <el-tag @click="click2">会员过期</el-tag>
                <el-tag @click="click3">会员计费</el-tag>
                <el-tag @click="click4">缴费超时离场</el-tag>
                <el-form-item>
                  <el-select size="small" v-model="form.cutoffReason" placeholder="请选择开闸原因">
                    <el-option
                      v-for="(item,i) in abnormal"
                      :key="i"
                      :label="item.item"
                      :value="item.cval"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input size="small" v-model="form.remark" placeholder="请输入备注原因"></el-input>
                </el-form-item>
                <el-button type="primary" class="cutOff" @click="cutOff">确认开闸</el-button>
                <el-button type="primary" class="closeGate" @click="closeGate">确认关闸</el-button>
                <el-link type="primary" href="http://frp-vip.tnar.cn:18402/" target="_blank" class="frp" :disabled="state4">前往FRP</el-link>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <DetailTable class="detailDialog" :detailFlag="detailFlag" :tableDatas="tableDatas" />
  </div>
</template>


<script>
import DetailTable from "./DetailTable";
import { saveUserLogin } from "@/utils";
import { getqueryDayParkSerialEX } from "@/request/parkRecord/queryParkRecord";
import { getCutoffReason } from "@/request/parkRecord/CutoffReason";
import { getqueryCharge } from "@/request/parkRecord/queryParkCharge";
import { queryCarId } from "@/request/parkRecord/queryCarId";
import { queryRegionCode } from "@/request/parkRecord/queryRegionCode";
import { mapState } from "vuex";
export default {
  components: { DetailTable },
  name: "app",
  data() {
    return {
      activeName: "first",
      form: {
        carNum: "",
        carNumColor: "",
        remark: "",
        cutoffReason: ""
      },
      rules: {
        carNum: [{ required: true, message: "请输入车牌号", trigger: "blur" }]
      },
      records0: [],
      records2: [],
      detailFlag: false,
      state1: false,
      state4: true,
      //设备对应车场信息
      parkInfo: {},
      //正在接听的记录信息
      recordsInfo: {},

      //接听得到设备信息
      devicesInfo: [],
      //车卡信息
      carInfo: {},
      // 车位信息
      groupId: "",
      tableDatas: [],
      carInfo2: [],
      //计费
      charge: [],
      abnormal: [],
      timer: "",
      timer2: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      deviceList: [
        {
          label: "无人值守项目",
          icon: "iconfont icon-folder",
          children: []
        }
      ],
      parkState: false,
      restaurants: [],
      showCarId: "",
      isAnswered: false,
      onlineCount: 0,
      offlineCount: 0,
      devId: "",
      monitorId: "",
      deviceInfo: {},
      //判断当前是在接听还是主动呼叫
      answering: true,
      answerData: [],
      loading1: false,
      loading2: false,
      //当前主动呼叫时的设备id
      currentDeviceId: "",
      keyWord: ""
    };
  },
  watch: {
    keyWord: function(newVal) {
      this.$refs.tree.filter(newVal);
    }
  },
  methods: {
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //车位详情表格
    findDetail() {
      this.detailFlag = true;
      let reqData;
      if (this.answering) {
        reqData = {
          parkCode: this.recordsInfo.parkCode,
          groupId: this.groupId
        };
      } else if (!this.answering) {
        reqData = {
          parkCode: this.deviceInfo.parkCode,
          groupId: this.groupId
        };
      }

      this.$axios
        .post("/pagerSelect/searchGroupCar", reqData)
        .then(res => {
          this.tableDatas = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //挂断
    hangup() {
      console.log("挂断电话");
      clearInterval(this.timer2);
      this.clearInfo();
      this.stopRT();
      this.records2 = [];
      this.records2.push(item);
      this.state4 = true;
      this.parkState = false;
      //能否接听
      this.isAnswered = false;
      if (!this.answering) {
        this.changeStatus();
      }
    },
    //接听
    answer(item) {
      console.log("接听");
      this.clearInfo();
      this.$axios
        .post("/pagerSelect/searchCallInfo", {
          parkCode: item.parkCode,
          regionCode: item.regionCode,
          devNo: item.devNo
        })
        .then(res => {
          if (res.data.length > 0) {
            console.log(res);
            console.log("正在接听");
            this.form.carNumColor = "1";
            this.state1 = true;
            this.state4 = false;
            // this.parkState = true;
            this.answering = true;
            //改变接听的userNo
            this.changeUserNo(item.id);
            //能否接听
            this.isAnswered = true;
            this.devicesInfo = res.data;
            //当前接听数据
            this.recordsInfo = item;
            //查询车卡信息
            this.searchDevParkInfo(item);
            this.playRT();
          } else {
            this.$message.error("此设备暂无数据,无法接听");
            return false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeUserNo(id) {
      const reqData = {
        id: id,
        userNo: this.userLogin.ent_name
      };
      this.$axios.post("/pagerUpdate/updateRecord", reqData).then(res => {
        if (res.data.ans == 1) {
        } else {
        }
      });
    },
    //点击刷新,重新获取对应停车信息
    resetForm() {
      if (this.answering) {
        this.searchDevParkInfo(this.recordsInfo);
      } else if (!this.answering) {
        this.searchDevParkInfo(this.deviceInfo);
      }
    },
    //查车牌
    searchCar(form) {
      // this.clearInfo();
      this.carInfo = {};
      this.carInfo2 = [];
      this.charge = [];
      this.showCarId = "";
      this.$refs.carform.validate(val => {
        if (val) {
          // console.log("搜索车牌号" + form.carNum);
          // if (!this.answering) {
          //   this.parkInfo = {
          //     parkCode: this.deviceInfo.parkCode,
          //     carType: form.carNumColor,
          //     carId: form.carNum
          //   };
          // }
          //查入场车信息
          this.searchCarInfo();
          //查订单详情
          this.searchInCarInfos(form.carNum, form.carNumColor);
        } else {
          return false;
        }
      });
    },
    inputCarId(value) {
      let that = this;
      if (value.length >= 3) {
        console.log("查车牌列表", value);
        let reqData;
        if (this.answering) {
          reqData = {
            car_id: value,
            park_code: this.recordsInfo.parkCode
          };
        } else if (!this.answering) {
          reqData = {
            car_id: value,
            park_code: this.deviceInfo.parkCode
          };
        }
        queryCarId(
          reqData,
          this.userLogin.cust_id,
          this.userLogin.session
        ).then(res => {
          if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
            const carIdList = [];
            res.data.ANSWERS[0].ANS_COMM_DATA.forEach(item => {
              const carIdObj = {};
              carIdObj.value = item.car_id;
              carIdList.push(carIdObj);
            });
            console.log(carIdList);
            this.restaurants = carIdList;
          } else {
            this.$message.error(res.data.ANSWERS[0].ANS_MSG_HDR.MSG_TEXT);
          }
        });
      }
    },
    //返回 自动补充列表
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString ? restaurants : "";
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    handleSelect(item) {
      console.log("被选择的车牌", this.form);
      this.showCarId = "";
      this.carInfo = {};
      this.carInfo2 = [];
      this.charge = [];
      // if (!this.answering) {
      //   this.parkInfo = {
      //     parkCode: this.deviceInfo.parkCode,
      //     carType: this.form.carNumColor,
      //     carId: item.value
      //   };
      // }
      //查入场车信息
      this.searchCarInfo();
      this.searchInCarInfos(item.value);
    },
    click1(e) {
      console.log(e.target.innerHTML);
      this.form.remark += e.target.innerHTML + "   ";
    },
    click2(e) {
      console.log(e.target.innerHTML);
      this.form.remark += e.target.innerHTML + "   ";
    },
    click3(e) {
      console.log(e.target.innerHTML);
      this.form.remark += e.target.innerHTML + "   ";
    },
    click4(e) {
      console.log(e.target.innerHTML);
      this.form.remark += e.target.innerHTML + "   ";
    },

    formatTime(time) {
      let moment = this.$moment(time, "YYYYMMDDHHmmss");
      return moment.format("YYYY-MM-DD HH:mm:ss");
    },
    formatTime2(time) {
      let moment = this.$moment(time, "YYYY-MM-DD HH:mm:ss");
      return moment.format("YYYY-MM-DD HH:mm:ss");
    },
    formatTime3(time) {
      let moment = this.$moment(time, "YYYYMMDD");
      return moment.format("YYYY-MM-DD");
    },
    currentTime() {
      return this.$moment().format("YYYYMMDD");
    },
    //查询为接听数据
    searchRecord(status) {
      this.$axios
        .post("pagerSelect/latestSearchRecord", {
          status: status
        })
        .then(res => {
          if (status == 0) {
            this.records0 = res.data;
          } else if (status == 1) {
            this.answerData = res.data;
            console.log("接听中", this.answerData);
          }
        });
    },
    //查询设备对应停车信息
    searchDevParkInfo(device) {
      this.$axios
        .post("/pagerSelect/searchParkingDetail", {
          parkCode: device.parkCode,
          regionCode: device.regionCode,
          devNo: device.devNo
        })
        .then(res => {
          if (JSON.stringify(res) != "{}") {
            this.parkInfo = res.data;
            this.showCarId = res.data.carId;
            this.form.carNumColor = res.data.carType
              ? res.data.carType + ""
              : "";
            this.searchCarInfo();
            this.searchInCarInfos(this.parkInfo.carId, this.parkInfo.carType);
          } else {
            return false;
          }
        })
        .catch(error => {});
    },
    // 查询 入场车信息
    searchInCarInfos(carId, carType) {
      this.loading1 = true;
      const that = this;
      const reqData = {
        maxid: 0,
        maxcount: 20,
        agent_id: "8010000000001",
        park_code: "",
        instart_datetime: "",
        inend_datetime: "",
        outstart_datetime: "",
        outend_datetime: "",
        result: "90",
        outoperate: "1",
        payobject: "",
        car_id: carId,
        serialtype: "1"
      };
      console.log("得到车牌", carId);
      console.log(this.userLogin.cust_id, this.userLogin.session, reqData);
      //查询入场信息
      getqueryDayParkSerialEX(
        reqData,
        this.userLogin.cust_id,
        this.userLogin.session
      ).then(res => {
        if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
          that.carInfo2 = res.data.ANSWERS[0].ANS_COMM_DATA;
          console.log(this.carInfo2);
          if (that.carInfo2.length > 0) {
            console.log(that.carInfo2[0]);
            // this.showCarId = that.carInfo2[0].car_id;
            // this.form.carNumColor = that.carInfo2[0].cartype;
            this.parkState = true;
            const reqData = {
              car_id: that.carInfo2[0].car_id,
              cartype: that.carInfo2[0].cartype,
              intime: that.carInfo2[0].intime,
              park_code: that.carInfo2[0].park_code,
              region_code: that.carInfo2[0].region_code
            };
            if (carType) {
              reqData.cartype = carType;
            }
            //查询车辆计费
            getqueryCharge(
              reqData,
              this.userLogin.cust_id,
              this.userLogin.cust_id
            ).then(res => {
              if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
                that.charge = res.data.ANSWERS[0].ANS_COMM_DATA;
                this.loading1 = false;
                console.log(that.charge);
              } else {
                this.$message.error("查询入场车辆计费失败");
                this.loading1 = false;
                return false;
              }
            });
            // this.searchCarCharge(carType);
          } else {
            // this.$message.error("此设备暂无入场车辆信息");
            this.parkState = false;
            this.loading1 = false;
            return false;
          }
        } else {
          this.$message.error("查询入场车辆失败");
          this.loading1 = false;
          return false;
        }
      });
    },
    //查询车辆计费
    searchCarCharge(carType) {
      console.log(this.carInfo2);
      console.log(this.carInfo2[0]);
      this.showCarId = this.carInfo2[0].car_id;
      this.form.carNumColor = this.carInfo2[0].cartype;
      const reqData = {
        car_id: this.carInfo2[0].car_id,
        cartype: this.carInfo2[0].cartype,
        intime: this.carInfo2[0].intime,
        park_code: this.carInfo2[0].park_code,
        region_code: this.carInfo2[0].region_code
      };
      if (carType) {
        reqData.cartype = carType;
      }
      //查询车辆计费
      getqueryCharge(
        reqData,
        this.userLogin.cust_id,
        this.userLogin.cust_id
      ).then(res => {
        if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
          this.charge = res.data.ANSWERS[0].ANS_COMM_DATA;
          this.loading1 = false;
          console.log(this.charge);
        } else {
          this.$message.error("查询入场车辆计费信息失败");
          this.loading1 = false;
          return false;
        }
      });
    },
    //查询车卡订单信息
    searchCarInfo() {
      if (JSON.stringify(this.parkInfo) != "{}") {
        this.loading2 = true;
        //当前设备停车信息
        console.log(this.parkInfo);
        const reqData = {
          parkCode: this.parkInfo.parkCode,
          carType: this.parkInfo.carType,
          carId: this.parkInfo.carId
        };
        this.$axios
          .post("/pagerSelect/searchCarDetail", reqData)
          .then(res => {
            if (
              JSON.stringify(res.data.commodity) != "{}" ||
              JSON.stringify(res.data.member) != "{}" ||
              JSON.stringify(res.data.customCar) != "{}" ||
              JSON.stringify(res.data.assetsDetail) != "{}"
            ) {
              this.carInfo = res.data;
              this.groupId = res.data.member.id;
              this.loading2 = false;
            } else {
              this.$message.error("暂无车卡订单信息");
              this.loading2 = false;
              return false;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        return false;
      }
    },
    //清理右边信息
    clearInfo() {
      this.carInfo = {};
      this.carInfo2 = [];
      this.charge = [];
      this.form.carNum = "";
      this.form.carNumColor = "";
      this.showCarId = "";
      this.loading1 = false;
      this.loading2 = false;
    },
    //播放视屏
    playRT() {
      this.stopAllRT();
      this.devId = this.devicesInfo[0].cameraId;
      this.monitorId = this.devicesInfo[0].monitorId;
      let playFlag = VSPOcxClient.PlayVideo(this.devicesInfo[0].cameraId, 0);
      console.log(playFlag, "接听播放结果1");
    },
    //关闭视屏
    stopRT() {
      this.stopAllRT();
    },
    //分转化为时
    timeStamp(StatusMinute) {
      var day = parseInt(StatusMinute / 60 / 24);
      var hour = parseInt((StatusMinute / 60) % 24);
      var min = parseInt(StatusMinute % 60);
      StatusMinute = "";
      if (day > 0) {
        StatusMinute = day + "天";
      }
      if (hour > 0) {
        StatusMinute += hour + "小时";
      }
      if (min > 0) {
        StatusMinute += parseFloat(min) + "分钟";
      }
      //三元运算符 传入的分钟数不够一分钟 默认为0分钟，else return 运算后的StatusMinute
      return StatusMinute == "" ? "0分钟" : StatusMinute;
    },
    //开始查找为接听数据
    startSearch() {
      this.timer = setInterval(() => {
        this.searchRecord(0);
        this.searchRecord(1);
      }, 1000);
    },

    //开闸
    cutOff() {
      let cutoffResult = VSPOcxClient.OpenDO(this.devId, 1);
      console.log("开闸结果", cutoffResult);
      if (cutoffResult) {
        this.addReason();
      }
    },
    //添加开闸信息到通道
    addReason() {
      if (this.answering) {
        const reqData = {
          parkCode: this.recordsInfo.parkCode,
          carId: this.parkInfo.carId,
          carType: this.form.carNumColor,
          type: 1
        };
      } else if (!this.answering) {
        const reqData = {
          parkCode: this.deviceInfo.parkCode,
          carId: this.parkInfo.carId,
          carType: this.form.carNumColor,
          type: 1
        };
      }

      this.$axios.post("/sending/carSpringInfoSending", reqData).then(res => {
        console.log("添加开闸信息到通道", res);
      });
    },
    //插入开闸原因信息到开闸原因统计表
    addReasonInfo() {
      const reqData = {
        parkCode: "",
        regionCode: "",
        devNo: "",
        carId: "",
        callTime: "",
        operator: "",
        outoperate: "",
        remark: ""
      };
      this.$axios.post("/pagerInsert/insertHandleRecord", reqData).then(res => {
        console.log("插入开闸原因统计结果");
      });
    },
    //关闸
    closeGate() {
      let closeResult = VSPOcxClient.OpenDO(this.devId, 2);
      console.log("关闸结果", closeResult);
    },
    //主动打开 监控摄像头
    handleNodeClick(device) {
      clearInterval(this.timer2);
      this.stopAllRT();
      console.log(device, "主动打开摄像头信息");
      if (device.action == 1) {
        if (this.currentDeviceId) {
          this.changeStatus();
        }
        this.clearInfo();
        this.deviceInfo = device;
        this.answering = false;
        // this.parkState = true;
        console.log(device.devId);
        this.devId = device.devId;
        this.monitorId = device.monitorId;
        if (this.monitorId && this.devId) {
          let playFlagM = VSPOcxClient.PlayVideo(device.monitorId, 2);
        } else {
          let playFlag = VSPOcxClient.PlayVideo(device.devId, 0);
          console.log(playFlag, "主动打开视频1");
        }
        this.insertRecord(device);
        this.searchDevParkInfo(device);
        this.timer2 = setInterval(() => {
          this.searchDevParkInfo(device);
        }, 10000);
      } else {
        return false;
      }
    },

    //主动插入呼叫记录
    insertRecord(device) {
      console.log("插入的名字", this.userLogin.ent_name);
      this.$axios
        .post("/pagerInsert/insertRecord", {
          parkCode: device.parkCode,
          regionCode: device.regionCode,
          type: "2",
          status: "1",
          devNo: device.devNo,
          userNo: this.userLogin.ent_name,
          callTime: this.$moment().format("YYYYMMDDHHmmss"),
          startTime: this.$moment().format("YYYYMMDDHHmmss"),
          endTime: "",
          remark: ""
        })
        .then(res => {
          if (res.data.msg == 1) {
            this.currentDeviceId = res.data.id;
          } else {
            this.$message.error("插入一条呼叫记录失败");
          }
        })
        .catch(error => {});
    },
    //改变状态为已处理
    changeStatus() {
      const reqData = {
        id: this.currentDeviceId,
        status: 2
      };
      this.$axios.post("/pagerUpdate/updateRecord", reqData).then(res => {
        if (res.data.ans == 1) {
          this.$message.success("已成功插入一条记录");
        } else {
          this.$message.error("更新失败");
        }
      });
    },
    //插入心跳日志
    insertHeart() {
      const reqData = {
        parkCode: this.deviceInfo.parkCode,
        regionCode: this.deviceInfo.regionCode,
        devNo: this.deviceInfo.devNo
      };
      this.$axios.post("/pagerInsert/insertHeartLog", reqData).then(res => {
        if (res.data.msg == 1) {
          this.$message.success("插入心跳日志成功");
        }
      });
    },
    //获取所有设备状态和id
    getDevices() {
      this.$axios
        .post("/pagerSelect/getDeviceState", {
          devNo: "",
          current: 1,
          size: 999
        })
        .then(res => {
          if (res.data.records.length > 0) {
            let datas = res.data.records;
            console.log(datas, "设备列表原始");
            let onlineCount = datas[0].online;
            this.onlineCount = onlineCount;
            this.offlineCount = datas[0].offline;
            console.log(this.onlineCount, this.offlineCount, "设备状态");
            let deviceLists = [];
            for (var i = 0; i < datas.length; i++) {
              let obj = {};
              obj.label = datas[i].name;
              obj.devId = datas[i].cameraId;
              obj.action = datas[i].heartTime;
              obj.parkCode = datas[i].parkCode;
              obj.regionCode = datas[i].regionCode;
              obj.devNo = datas[i].devNo;
              obj.monitorId = datas[i].monitorId;
              deviceLists.push(obj);
            }
            this.deviceList[0].children = deviceLists;
            console.log(deviceLists, "设备列表");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //关闭所有设备视屏
    stopAllRT() {
      let stop = VSPOcxClient.CloseVideo(2, 0);
      console.log(stop, "关闭播放结果");
    },
    //交易状态
    formarOrderState(val) {
      switch (val) {
        case 1:
          return "待确认";
          break;
        case 2:
          return "确认";
          break;
        case 3:
          return "待支付";
          break;
        case 4:
          return "支付成功";
          break;
        case 5:
          return "取消";
          break;
        case 6:
          return "待退款";
          break;
        case 7:
          return "退款成功";
          break;
        case 8:
          return "失败";
          break;
        case 9:
          return "待发货";
          break;
        case 10:
          return "已发货";
          break;
        case 11:
          return "待收货";
          break;
        case 12:
          return "已收货";
          break;
        case 13:
          return "交易完成";
          break;
      }
      // ("1待确认 2确认 3待支付 4支付成功 5取消 6待退款 7退款成功 8失败 9待发货 10 已发货 11待收货 12已收货 13交易完成");
      // ("1 微信 2 支付宝");
    },
    formatPayType(val) {
      switch (val) {
        case 1:
          return "微信";
          break;
        case 2:
          return "支付宝";
          break;
        case 3:
          return "岗亭";
          break;
        case 4:
          return "余额";
          break;
        case 6:
          return "建行无感";
          break;
        case 7:
          return "工行无感";
          break;
        case 8:
          return "农行无感";
          break;
        case 9:
          return "招行无感";
          break;
        case 10:
          return "建行聚合";
          break;
        case 11:
          return "工行聚合";
          break;
        case 12:
          return "农行聚合";
          break;
        case 13:
          return "招行聚合";
          break;
        case 14:
          return "农行";
          break;
        case 15:
          return "建行";
          break;
        case 16:
          return "工行";
          break;
        case 20:
          return "优惠券";
          break;
        default:
          return "其他";
      }
    },
    EventReady() {
      let success = VSPOcxClient.LoginServer(
        process.env.EQUIPMENT_IP,
        "9534",
        "fly001",
        "fly123456"
      );
      console.log(success, "登陆结果");
      var login = document.createElement("script");
      login.setAttribute("for", "VSPOcxClient");
      login.event = "EventLoginServer(bSuccess)";
      login.appendChild(
        document.createTextNode("loginSuccess.EventLoginServer(bSuccess)")
      );
      document.body.appendChild(login);

      var playResult = document.createElement("script");
      playResult.setAttribute("for", "VSPOcxClient");
      playResult.event = "EventCameraPlayRTState(ulCameraID,ulState)";
      playResult.appendChild(
        document.createTextNode(
          "resultRt.EventCameraPlayRTState(ulCameraID,ulState)"
        )
      );
      document.body.appendChild(playResult);
    },
    EventLoginServer(bussness) {
      console.log(bussness, "确认登陆结果");
      let DeviceStatusChange = document.createElement("script");
      DeviceStatusChange.setAttribute("for", "VSPOcxClient");
      DeviceStatusChange.event =
        "EventALCOperator(IOpType,lALHandle,strName,ulState)";
      DeviceStatusChange.appendChild(
        document.createTextNode(
          "stateChange.EventALCOperator(IOpType,lALHandle,strName,ulState)"
        )
      );
      document.body.appendChild(DeviceStatusChange);

      //分组
      let group = document.createElement("script");
      group.setAttribute("for", "VSPOcxClient");
      group.event =
        "EventGroupOperator(lOpType,ulGroupID,ulParentGroupID,ulGroupType,strName)";
      group.appendChild(
        document.createTextNode(
          "groupName.EventGroupOperator(lOpType,ulGroupID,ulParentGroupID,ulGroupType,strName)"
        )
      );
      document.body.appendChild(group);

      this.SetOcxSize(
        document.body.clientWidth * 0.71,
        document.body.clientHeight * 0.9
      );
      VSPOcxClient.SetLayout(4);
    },
    SetOcxSize(width, height) {
      VSPOcxClient.SetOcxSize(width, height);
      $("#VSPOcxClient").attr("width", width);
      $("#VSPOcxClient").attr("height", height);
    },
    EventCameraPlayRTState(ulCameraID, ulState) {
      console.log("监听播放结果", ulCameraID, ulState);
      if (ulState == 0) {
        this.$message.error("打开视频失败!");
      }
      if (ulState == 3) {
        //插入心跳日志
        if (!this.answering) {
          this.insertHeart();
        }
        if (this.monitorId != undefined && this.monitorId != 0) {
          console.log("打开第三个视屏窗口", this.monitorId);
          let play = VSPOcxClient.PlayVideo(this.devId, 0);
          console.log(play);
        }
        this.state4 = false;
      }
      if (ulState == 4) {
      }
    },
    EventALCOperator(IOpType, lALHandle, strName, ulState) {
      console.log("报警服务变化", strName);
    },
    EventGroupOperator(
      lOpType,
      ulGroupID,
      ulParentGroupID,
      ulGroupType,
      strName
    ) {
      console.log(
        "分组名称",
        lOpType,
        ulGroupID,
        ulParentGroupID,
        ulGroupType,
        strName
      );
    }
  },

  created() {
    this.startSearch();
    this.getDevices();
  },
  mounted() {
    console.log("用户登录信息", this.userLogin);
    window.phoneListener = this;
    window.loginSuccess = this;
    window.resultRt = this;
    window.stateChange = this;
    window.groupName = this;
    let version = VSPOcxClient.GetVersion();
    console.log("版本号", version);
    var ring = document.createElement("script");
    ring.setAttribute("for", "VSPOcxClient");
    ring.event = "EventReady()";
    ring.appendChild(document.createTextNode("phoneListener.EventReady()"));
    document.body.appendChild(ring);

    getCutoffReason({
      category_en: "except_open_gate"
    }).then(res => {
      if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
        this.abnormal = res.data.ANSWERS[0].ANS_COMM_DATA;
      }
    });
    saveUserLogin(this);
  },
  computed: {
    ...mapState(["userLogin"])
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
  },
  beforeRouteLeave(to, from, next) {
    if (from.name == "longcutoff") {
      clearInterval(this.timer2);
      this.stopAllRT();
      let loginOutResult = VSPOcxClient.LogoutServer();
      console.log(loginOutResult, "登出结果");
      this.isAnswered = false;
      if (this.currentDeviceId) {
        this.changeStatus();
      }
    }
    next();
  }
};
</script>

<style lang="scss">
$mainWdth: 100%;
$fff: #fff;
#cutoff {
  width: $mainWdth;
  height: $mainWdth;
  background: $fff;
  .el-drawer {
    padding: 20px;
    .el-drawer__header {
      font-size: 20px;
      font-weight: 700;
      color: #000;
    }
  }
  .el-row {
    height: $mainWdth;
    .left {
      height: $mainWdth;
      overflow-y: scroll;
      border: 1px solid #aaaaaa;
      .grid-content {
        width: $mainWdth;
        height: $mainWdth;
        .el-row {
          height: 0.3 * $mainWdth;
          .el-col {
            width: $mainWdth;
            height: $mainWdth;

            .el-tabs__nav-next {
              display: none;
            }
            .el-tabs__nav {
              width: $mainWdth;
            }
            .title {
              height: 30px;
              text-align: center;
              background: #3e549d;
              color: $fff;
              font-size: 14px;
              line-height: 30px;
              font-weight: 700;
            }
            .el-tabs__header {
              margin: 0;
            }
            .el-tabs__item {
              font-size: 12px;
              padding: 0 28px;
            }
            .el-tab-pane {
              padding: 10px;
              div.visible {
                width: 100%;
                padding-bottom: 30px;
                p {
                  font-size: 12px;
                  color: #343434;
                  line-height: 18px;
                  span:nth-child(2n + 1) {
                    font-weight: 700;
                  }
                }
                div {
                  width: 80px;
                  height: 25px;
                  line-height: 25px;
                  background: red;
                  text-align: center;
                  border-radius: 15px;
                  vertical-align: middle;
                  color: $fff;
                  position: relative;
                  right: -130px;
                  top: 10px;
                  cursor: pointer;
                  span:nth-child(1) {
                    font-size: 20px;
                  }
                  span:nth-child(2) {
                    font-size: 16px;
                  }
                }
                .el-button {
                  border: 0;
                  border-radius: 20px;
                  background: #e74c2d;
                  margin-left: 50%;
                  cursor: pointer;
                }
                .is-disabled {
                  background: #ccc;
                }
              }
              div.hidden {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                span.iconfont {
                  font-size: 70px;
                }
              }
            }
            .deviceStatu {
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              span:nth-child(3n + 1) {
                display: block;
                width: 10px;
                height: 10px;
                background: #0fab00;
                border-radius: 50%;
              }
              span:nth-child(4) {
                background: #e74c2d;
              }
              span {
                margin: 0 10px;
              }
            }
          }
          .awaitContent {
            padding: 10px;
            background: $fff;
            p {
              font-size: 12px;
              color: #343434;
              line-height: 24px;
              span:nth-child(2n + 1) {
                font-weight: 700;
              }
            }
            .el-button {
              background: green;
              text-align: center;
              border-radius: 20px;
              vertical-align: middle;
              color: $fff;
              cursor: pointer;
              margin-left: 50%;
              margin-bottom: 10px;
            }
            .is-disabled {
              background: #ccc;
            }
          }
        }
        .callrecord {
          height: 34%;
        }
        #calling {
          overflow-y: scroll;
        }
        .nodeTree {
          padding-left: 30px;
          .el-tree-node__children {
            .el-tree-node__expand-icon {
              display: none;
            }
          }

          .el-tree-node__children {
            .online {
              color: #0fab00;
            }
            .offline {
              color: red;
            }
          }
          .my-custom {
            .icon-folder {
              display: none;
            }
          }
        }
      }
    }

    .left::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 2px;
      /*高宽分别对应横竖滚动条的尺寸*/
      // height: 4px;
    }
    .left::-ms-scrollbar {
      /*滚动条整体样式*/
      width: 2px;
      /*高宽分别对应横竖滚动条的尺寸*/
      // height: 4px;
    }

    .left::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
    .left:-ms-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }

    .left::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
    .left:-ms-scrollbar-track {
      /*滚动条里面轨道*/
      // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
    .left {
      /*三角箭头的颜色*/
      scrollbar-arrow-color: #fff;
      /*滚动条滑块按钮的颜色*/
      scrollbar-face-color: #ffffff;
      /*滚动条整体颜色*/
      scrollbar-highlight-color: #fff;
      /*滚动条阴影*/
      scrollbar-shadow-color: #fff;
      /*滚动条轨道颜色*/
      scrollbar-track-color: #fff;
      /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
      scrollbar-3dlight-color: #fff;
      /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
      scrollbar-darkshadow-color: #fff;
      /*滚动条基准颜色*/
      scrollbar-base-color: #fff;
    }
    .center {
      height: $mainWdth;
      border-top: 1px solid #aaaaaa;
      border-bottom: 1px solid #aaaaaa;

      .grid-content {
        width: $mainWdth;
        height: $mainWdth;
        overflow: hidden;
        #VSPOcxClient {
          z-index: -9999;
        }
      }
    }
    .right {
      height: $mainWdth;
      .grid-content {
        height: $mainWdth;
        padding: 0 20px;
        border: 1px solid #aaaaaa;
        .el-form {
          width: $mainWdth;
          height: $mainWdth;
          .el-form-item {
            width: $mainWdth;
            margin-bottom: 5px;
            .el-form-item__content {
              width: 100%;
            }
          }
          .resetFormItem {
            width: 40px;
            position: absolute;
            right: 30px;
            top: -5px;
          }
          .carNumFormItem {
            width: 50%;
          }
        }
        .carNum {
          height: 0.2 * $mainWdth;
          border-bottom: 1px solid #dddddd;
          .el-col {
            height: $mainWdth;
            .searchCar {
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              .el-form-item {
                margin-right: 0;
                margin-top: 15px;
              }
              .el-form-item__content {
                .el-input {
                  border: 2px solid #3c539f;
                  border-radius: 8px;
                  width: $mainWdth;

                  position: relative;
                  .el-input__inner {
                    height: 40px;
                    border: none;
                    color: #747474;
                    /* 修改字号，默认继承input */
                    font-size: 18px;
                    font-weight: 600;
                  }
                  .el-input__inner:-ms-input-placeholder {
                    /* 修改字体颜色 */
                    color: #747474;
                    /* 修改字号，默认继承input */
                    font-size: 18px;
                    font-weight: 600;
                    /* 设置背景色 */
                    // background: #8ac6d1;
                  }
                }
                .el-input__suffix {
                  background: #3c539f;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  width: 40px;
                  color: $fff;
                  font-size: 25px;
                  cursor: pointer;
                }
                .reset {
                  border: 0;
                  background: #fff;

                  span {
                    display: block;
                    width: 30px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 10px;
                    text-align: center;
                    color: $fff;
                    background: #3c539f;
                    border-radius: 5px;
                  }
                }
              }
            }
            .carType {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 20px;
              .carId {
                font-size: 16px;
                height: 30px;
                line-height: 30px;
                margin-left: 30px;
                font-weight: 800;
                color: #e74c2d;
              }
              .el-form-item {
                width: 100px;
                .el-form-item__content {
                  width: $mainWdth;
                  padding: 1px;
                  border: 2px solid #aaa;
                  .el-select {
                    width: $mainWdth;
                    .el-input {
                      position: relative;
                      padding: 1px;
                      input.el-input__inner {
                        margin: 0;
                        padding: 0;
                        border: 1xp solid #aaa;
                        border-radius: 0;
                        text-align: left;
                        background: blue;
                        text-indent: 0.5rem;
                        color: #fff;
                        outline: none;
                        font-weight: 700;
                        height: 36px;
                      }
                      .el-input__suffix {
                        top: 2px;
                        span.el-input__suffix-inner {
                          background: blue;
                          padding: 0;
                          display: -ms-inline-grid;
                        }
                      }
                    }
                  }
                  .el-select.blue {
                    .el-input {
                      input {
                        background: blue;
                      }
                      span.el-input__suffix-inner {
                        background: blue;
                      }
                    }
                  }
                  .el-select.yellow {
                    .el-input {
                      input {
                        background: yellow;
                      }
                      span.el-input__suffix-inner {
                        background: yellow;
                      }
                    }
                  }
                  .el-select.green {
                    .el-input {
                      input {
                        background: green;
                      }
                      span.el-input__suffix-inner {
                        background: green;
                      }
                    }
                  }
                  .el-select.gray {
                    .el-input {
                      input {
                        background: #cdcdcd;
                      }
                      span.el-input__suffix-inner {
                        background: #cdcdcd;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .carRecord {
          height: 0.25 * $mainWdth;
          border-bottom: 1px solid #dddddd;
          .inCar {
            height: $mainWdth;
            padding: 0 20px;
            p {
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              line-height: 25px;
              span:nth-child(2n + 1) {
                font-weight: 700;
                font-size: 16px;
              }
              span:nth-child(2n) {
                font-size: 14px;
              }
              span.red {
                color: red;
              }
            }
          }
          .inCar2 {
            text-align: center;
            div.icon-changyongtubiao-xianxingdaochu-zhuanqu- {
              font-size: 60px;
              color: #ccc;
              margin-top: 30px;
            }
            p {
              font-weight: 600;
              color: #ccc;
            }
          }
        }
        .detail {
          height: 25%;

          .el-col {
            height: $mainWdth;
            padding: 0 20px;
            p {
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              line-height: 25px;
              span:nth-child(2n + 1) {
                font-weight: 700;
                font-size: 16px;
              }
              span:nth-child(2n) {
                font-weight: 700;
                font-size: 14px;
              }
              span {
                i.red {
                  color: red;
                }
              }
              .chewei {
                color: blue;
                text-decoration: underline;
              }
            }
          }
        }
        .reason {
          height: 30%;
          // background: orange;
          .el-col {
            height: $mainWdth;
            padding: 0 20px;
            .el-tag {
              background: $fff;
              border: 1px solid #ccc;
              color: #aaa;
              cursor: pointer;
            }
            .el-select {
              width: 100%;
              border-radius: 10px;
              margin-top: 10px;

              .el-input__inner::-webkit-input-placeholder {
                /* 修改字体颜色 */
                color: #747474;
                /* 修改字号，默认继承input */
                font-size: 16px;
                font-weight: 600;
                /* 设置背景色 */
                // background: #8ac6d1;
              }
            }
            .el-input {
              position: relative;
              border-radius: 10px;
              margin-top: 10px;

              .el-input__inner::-webkit-input-placeholder {
                /* 修改字体颜色 */
                color: #747474;
                /* 修改字号，默认继承input */
                font-size: 16px;
                font-weight: 600;
                /* 设置背景色 */
                // background: #8ac6d1;
              }
              .el-input__suffix {
                background: #3e549d;
                position: absolute;
                right: 0;
                bottom: 0;
              }
            }
            .is-disabled {
              .el-input__suffix {
                background: #ccc;
              }
            }
            .el-button {
              width: 0.35 * $mainWdth;
              background: #0fab00;
              border-radius: 20px;
              margin-top: 10px;
              border: 0;
              font-weight: 600;
            }
            .frp {
              background: #0fab00;
              color: #fff;
              font-weight: 700;
              height: 3.1rem;
              border-radius: 16px;
              padding: 0 1rem;
              margin-bottom: 0.2rem;
            }
            .is-disabled {
              background: #ccc;
            }
          }
        }
      }
    }
  }
}
.el-badge {
  .el-badge__content {
    top: 10px;
  }
}
.el-scrollbar .el-select-dropdown__wrap {
  ul {
    padding: 5px;
    li.blue {
      background: blue;
      color: #fff;
    }
    li.yellow {
      background: yellow;
      color: #fff;
    }
    li.green {
      background: green;
      color: #fff;
    }
    li.gray {
      background: #dddddd;
      color: #fff;
    }
    li {
      margin: 2px;
    }
  }
}
</style>