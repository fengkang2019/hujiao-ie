<template>
  <div id="cutoff">
    <el-row :gutter="4">
      <el-col class="left" :span="5">
        <div class="grid-content bg-purple">
          <el-row class="callrecord">
            <el-col id="calling">
              <div class="title">呼叫记录</div>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="接听中" name="first">
                  <div class="visible" v-show="state1" v-for="(item,i) in records1" :key="i">
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
                  </div>
                  <div class="hidden" v-show="!state1">
                    <span class="iconfont icon-web__zanwujilu"></span>
                    <span>暂无接听记录</span>
                  </div>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label">
                    <el-badge class="mark" value="0">未接听</el-badge>
                  </span>
                  配置管理
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
                <el-button @click="answer(item)" :disabled="isAnswered">
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
              <el-tree
                :data="deviceList"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :default-expand-all="true"
                :highlight-current="true"
                class="nodeTree"
                icon-class="el-icon-folder-opened"
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
            style="z-index:-100;padding-top:0px;display:block"
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
                    <el-button class="reset" @click="resetForm(form)">刷新</el-button>
                  </el-form-item>
                </div>
                <div class="carType">
                  <div class="carId">{{showCarId?showCarId:"--"}}</div>
                  <div class="chooseCarNumColor">
                    <el-form-item>
                      <el-select
                        size="small"
                        :class="form.carNumColor==1?'blue':form.carNumColor==2?'yellow':form.carNumColor==3?'green':'gray'"
                        v-model="form.carNumColor"
                        placeholder
                      >
                        <el-option class="blue" label="蓝牌" value="1"></el-option>
                        <el-option class="yellow" label="黄牌" value="2"></el-option>
                        <el-option class="green" label="绿牌" value="3"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="carRecord">
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
            <el-row class="detail">
              <el-col v-if="!state4">
                <p>
                  <span>订单详情:</span>
                  <span>{{carInfo.commodity?formatTime(carInfo.commodity.ordertime) +" "+ formatPayType(carInfo.commodity.payType) +" "+"支付渠道:"+ formarOrderState(carInfo.commodity.orderstate):'无'}}</span>
                </p>
                <p>
                  <span>月卡车详情:</span>
                  <span>{{carInfo.member?formatTime3(carInfo.member.startDate)+"到"+formatTime3(carInfo.member.endDate):"无"}}</span>
                </p>
                <p>
                  <span>内部车详情:</span>
                  <span>{{carInfo.customCar?formatTime3(carInfo.member.startDate)+"到"+formatTime3(carInfo.member.endDate):"无"}}</span>
                </p>
                <p>
                  <span>储值车详情:</span>
                  <span>{{carInfo.assetsDetail?"储值余额:"+carInfo.assetsDetail.fundavl+"元":"无"}}</span>
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
                  >{{carInfo.member?carInfo.member.seatNum+"车位":"无"}}</a>
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
                <el-button type="primary" class="cutOff" @click="onSubmit">确认开闸</el-button>
                <el-button type="primary" class="callOff" @click="hangup(records1[0])">
                  <span class="iconfont icon-guaduan"></span>
                  挂断
                </el-button>
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
      records1: [],
      records2: [],
      cutoffReason: "",
      remark: "",
      detailFlag: false,
      state1: false,
      state2: false,
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
          label: "武汉无人值守项目",
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
      //当前窗口数
      n: 0,
      devId: "",
      monitorId: "",
    };
  },
  methods: {
    //切换接听状态
    handleClick() {
      console.log(111);
    },
    //确认开闸
    onSubmit() {
      this.cutOff();
    },
    //车位详情表格
    findDetail() {
      this.detailFlag = true;
      this.$axios
        .post("/pagerSelect/searchGroupCar", {
          parkCode: this.recordsInfo.parkCode,
          groupId: this.groupId
        })
        .then(res => {
          this.tableDatas = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //挂断
    hangup(item) {
      console.log("挂断电话");
      this.stopRT();
      this.records2 = [];
      this.records2.push(item);
      this.state4 = true;
      this.state2 = false;
      this.isAnswered = false;
      this.form.carNum = "";
      this.showCarId = "";
    },
    //接听
    answer(item) {
      console.log("接听");
      this.recordsInfo = item;
      let that = this;
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
            this.state2 = true;
            this.parkState = true;
            this.isAnswered = true;
            this.devicesInfo = res.data;
            this.records1.push(item);
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
    //点击刷新
    resetForm(form) {
      console.log(this.$refs.carform);
      this.$refs.carform.resetFields();
    },
    //查车牌
    searchCar(form, recordsInfo) {
      let that = this;
      this.$refs.carform.validate(val => {
        if (val) {
          console.log("搜索车牌号" + form.carNum);
          this.searchInCarInfos(form.carNum, form.carNumColor);
        } else {
          return false;
        }
      });
    },
    inputCarId(value) {
      let that = this;
      if (value.length >= 3) {
        console.log("查车牌列表" + this.records1[0].parkCode);
        queryCarId(
          {
            car_id: value,
            park_code: this.records1[0].parkCode
          },
          this.$store.state.userLogin.cust_id,
          this.$store.state.userLogin.session
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
      let that = this;
      this.$axios
        .post("/pagerSelect/searchRecord", {
          status: status,
          size: 10,
          current: 1
        })
        .then(res => {
          if (res.data.records.length > 0) {
            if (status == 0) {
              this.records0 = res.data.records;
            } else if (status == 1) {
              this.records1 = res.data.records;
              this.state1 = true;
            }
          } else {
            return false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查询设备对应停车信息
    searchDevParkInfo(item) {
      let that = this;
      this.$axios
        .post("/pagerSelect/searchParkingDetail", {
          parkCode: item.parkCode,
          regionCode: item.regionCode,
          devNo: item.devNo
        })
        .then(res => {
          if (JSON.stringify(res) != "{}") {
            console.log(res);
            that.parkInfo = res.data;
            console.log(that.parkInfo);
            that.searchCarInfo();
            that.searchInCarInfos(that.parkInfo.carId, that.parkInfo.carType);
          } else {
            return false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 查询 入场车信息
    searchInCarInfos(carId, carType) {
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

      getqueryDayParkSerialEX(
        reqData,
        this.$store.state.userLogin.cust_id,
        this.$store.state.userLogin.session
      ).then(res => {
        if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
          that.carInfo2 = res.data.ANSWERS[0].ANS_COMM_DATA;
          console.log(this.carInfo2);
          if (that.carInfo2.length > 0) {
            console.log(that.carInfo2[0]);
            this.showCarId = that.carInfo2[0].car_id;
            this.form.carNumColor = that.carInfo2[0].cartype;
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
            getqueryCharge(
              reqData,
              this.$store.state.userLogin.cust_id,
              this.$store.state.userLogin.cust_id
            ).then(res => {
              if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
                that.charge = res.data.ANSWERS[0].ANS_COMM_DATA;
                console.log(that.charge);
              } else {
                this.$message.error("查询入场车辆计费失败");
                return false;
              }
            });
          } else {
            this.$message.error("此设备暂无车辆入场信息");
            return false;
          }
        } else {
          this.$message.error("查询入场车辆失败");
          return false;
        }
      });
    },
    //查询车卡信息
    searchCarInfo() {
      const that = this;
      if (JSON.stringify(this.parkInfo) != "{}") {
        console.log(this.parkInfo);
        const reqData = {
          parkCode: this.parkInfo.parkCode,
          carType: this.parkInfo.carType,
          carId: this.parkInfo.carId
        };
        this.$axios
          .post("/pagerSelect/searchCarDetail", reqData)
          .then(res => {
            if (JSON.stringify(res.data.assetsDetail) != "{}") {
              that.carInfo = res.data;
              that.groupId = res.data.member.id;
            } else {
              that.$message.error("暂无车卡信息");
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
    //播放视屏
    playRT() {
      this.stopAllRT();
      this.devId = this.devicesInfo[0].cameraId;
      this.monitorId = this.devicesInfo[0].monitorId;
      console.log(this.monitorId);
      let playFlag = VSPOcxClient.PlayVideo(this.devicesInfo[0].cameraId, 0);
      console.log(playFlag, "接听播放结果1");
      // let playFlag2 = VSPOcxClient.PlayVideo(this.devicesInfo[0].monitorId, 1);
      // console.log(playFlag2, "接听播放结果2");
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
      }, 3000);
    },
    //开闸
    cutOff() {
      VSPOcxClient.OpenDO(this.devId, 1);
    },
    //主动打开 监控摄像头
    handleNodeClick(device) {
      this.stopAllRT();
      if (device.action == 1) {
        this.state2 = true;
        console.log(device.devId);
        this.monitorId = device.monitorId;
        let playFlag = VSPOcxClient.PlayVideo(device.devId, 0);
        console.log(playFlag, "主动打开视频1");
        this.insertRecord(device);
      }
    },
    //主动插入呼叫记录
    insertRecord(device) {
      this.$axios
        .post("/pagerInsert/insertRecord", {
          parkCode: device.parkCode,
          regionCode: device.regionCode,
          type: "2",
          status: "1",
          devNo: device.devNo,
          userNo: this.$store.state.userLogin.ent_name,
          callTime: this.$moment().format("YYYYMMDDHHmmss"),
          startTime: this.$moment().format("YYYYMMDDHHmmss"),
          endTime: "",
          remark: ""
        })
        .then(res => {})
        .catch(error => {});
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
          return "带确认";
        case 2:
          return "确认";
        case 3:
          return "待支付";
        case 4:
          return "支付成功";
        case 5:
          return "取消";
        case 6:
          return "待退款";
        case 7:
          return "退款成功";
        case 8:
          return "失败";
        case 9:
          return "待发货";
        case 10:
          return "已发货";
        case 11:
          return "已收货";
        default:
          return "交易完成";
      }
      // ("1待确认 2确认 3待支付 4支付成功 5取消 6待退款 7退款成功 8失败 9待发货 10 已发货 11待收货 12已收货 13交易完成");
      // ("1 微信 2 支付宝");
    },
    formatPayType(val) {
      switch (val) {
        case 1:
          return "微信";
        case 2:
          return "支付宝";
        default:
          return "";
      }
    },
    EventReady() {
      console.log(11);
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
      this.SetOcxSize(1360, 825);
      VSPOcxClient.SetLayout(4);
    },
    SetOcxSize(width, height) {
      VSPOcxClient.SetOcxSize(width, height);
      $("#VSPOcxClient").attr("width", width);
      $("#VSPOcxClient").attr("height", height);
    },
    EventCameraPlayRTState(ulCameraID, ulState) {
      console.log("监听播放结果", ulCameraID, ulState);
      if (ulState == 0) this.$message.error("打开视频失败!");
      if (ulState == 3) {
        if (this.monitorId != undefined) {
          console.log("打开第二个视屏窗口", this.monitorId);
          let play = VSPOcxClient.PlayVideo(this.monitorId, 2);
          console.log(play);
        }
        this.state4 = false;
      }
      if (ulState == 4) {
      }
    }
  },

  created() {
    this.startSearch();
    this.getDevices();
  },
  mounted() {
    console.log(this.$store.state.userLogin);
    window.phoneListener = this;
    window.loginSuccess = this;
    window.resultRt = this;
    let version = VSPOcxClient.GetVersion();
    console.log("版本号", version);
    var ring = document.createElement("script");
    ring.setAttribute("for", "VSPOcxClient");
    ring.event = "EventReady()";
    ring.appendChild(document.createTextNode("phoneListener.EventReady()"));
    document.body.appendChild(ring);
    saveUserLogin(this);
    getCutoffReason({
      category_en: "except_open_gate"
    }).then(res => {
      if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
        this.abnormal = res.data.ANSWERS[0].ANS_COMM_DATA;
      }
    });
  },
  computed: {
    ...mapState(["userLogin", "loginHandle", "deviceLists", "parkCodeList"])
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
  },
  beforeRouteLeave(to, from, next) {
    if (from.name == "longcutoff") {
      this.stopAllRT();
      let loginOutResult = VSPOcxClient.LogoutServer();
      console.log(loginOutResult, "登出结果");
      this.isAnswered = false;
    }
    next();
  }
};
</script>

<style lang="scss">
$mainWdth: 100%;
$fff: #fff;
.detailDialog {
  .el-dialog__header {
    background: #e1e1e1;
    z-index: 100;
  }
  .el-dialog__body {
    .el-table {
      width: $mainWdth;
      z-index: 100;
    }
  }
}
#cutoff {
  width: $mainWdth;
  height: $mainWdth;
  background: $fff;
  .el-row {
    height: $mainWdth;
    .left {
      height: $mainWdth;
      overflow-y: scroll;
      .grid-content {
        width: $mainWdth;
        height: $mainWdth;
        // border: 1px solid #aaaaaa;
        .el-row {
          height: 0.22 * $mainWdth;
          .el-col {
            width: $mainWdth;
            height: $mainWdth;
            border-bottom: 1px solid #aaaaaa;
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

              // #pane-first{
              //   height: 100%;
              // }
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
              line-height: 18px;
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
              position: relative;
              right: -130px;
              // top: 20px;
              cursor: pointer;
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
    .left::-ms-scrollbar-thumb {
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
    .left::-ms-scrollbar-track {
      /*滚动条里面轨道*/
      // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }

    .center {
      height: $mainWdth;
      .grid-content {
        width: $mainWdth;
        height: $mainWdth;
        overflow: hidden;
        #VSPOcxClient {
          z-index: -9999;
        }
        .caller {
          height: 0.5 * $mainWdth;
          border: 1px solid #aaaaaa;
          box-sizing: border-box;
          position: relative;
          #callerVideo {
            width: $mainWdth;
            height: $mainWdth;
          }
          .callerDiv {
            width: $mainWdth;
            height: $mainWdth;
            position: absolute;
            top: 0;
            left: 0;
            background: #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            .innerCallerDiv {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              span.iconfont {
                font-size: 50px;
                color: #bbb;
              }
              span {
                font-size: 14px;
                color: #aaa;
              }
            }
          }
        }
        .monitor {
          height: 0.5 * $mainWdth;
          border: 1px solid #aaaaaa;
          box-sizing: border-box;
          margin-top: 2px;
          position: relative;
          #monitorVideo {
            width: $mainWdth;
            height: $mainWdth;
          }
          .monitorDiv {
            width: $mainWdth;
            height: $mainWdth;
            position: absolute;
            top: 0;
            left: 0;
            background: #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            .innerMonitorDiv {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              span.iconfont {
                font-size: 50px;
                color: #bbb;
              }
              span {
                font-size: 14px;
                color: #aaa;
              }
            }
          }
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
                .el-input__suffix {
                  background: #3c539f;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  width: 40px;
                  color: $fff;
                }
                .reset {
                  border: 0;
                  background: #fff;
                  // position: absolute;
                  // right: -120px;
                  // top: -15px;
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
              div.chooseCarNumColor {
                background: $fff;
                padding: 1px;
                width: 60px;
                height: 20px;
                .el-form-item {
                  width: $mainWdth;
                  height: 20px;
                  .el-form-item__content {
                    width: $mainWdth;
                    height: 20px;
                    .el-select {
                      width: $mainWdth;
                      height: 20px;
                      border: 1px solid #aaa;
                      padding: 1px;
                      .el-input {
                        width: $mainWdth;
                        height: 20px;
                        position: relative;
                        padding: 1px;
                        input.el-input__inner {
                          margin: 0;
                          padding: 0;
                          width: $mainWdth;
                          height: 20px;
                          position: absolute;
                          top: 0;
                          left: 0;
                          border-radius: 0;
                          background: blue;
                          text-align: left;
                          text-indent: 0.5rem;
                          color: #fff;
                          outline: none;
                          font-weight: 700;
                        }
                        .el-input__suffix {
                          height: 17px;
                          width: 10px;
                          margin-top: 1px;
                          span.el-input__suffix-inner {
                            width: 10px;
                            height: 17px;
                            padding: 0;
                            right: 0px;
                            background: blue;
                            .el-select__caret {
                              width: $mainWdth;
                              height: $mainWdth;
                              line-height: 16px;
                            }
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
                  }
                }
              }
              span {
                display: block;
                font-size: 12px;
                font-weight: 700;
                padding: 0 10px;
              }
              span:nth-child(1) {
                background: #3c539f;
                color: $fff;
              }
              span:nth-child(3) {
                border-left: 3px solid #000;
              }
              div.carId {
                width: 80px;
                height: 22px;
                text-align: center;
                font-weight: 600;
                line-height: 24px;
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
              width: 0.6 * $mainWdth;
              background: #0fab00;
              border-radius: 20px;
              margin-top: 10px;
              border: 0;
              font-weight: 600;
            }
            .callOff {
              width: 0.3 * $mainWdth;
              background: #e74c2d;
              border-radius: 20px;
              margin-top: 10px;
              border: 0;
              margin-left: 35px;
              font-weight: 600;
            }
            .is-disabled {
              background: #ccc;
              border: 0;
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