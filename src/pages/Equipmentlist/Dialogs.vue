<template>
  <el-dialog
    :title="flag=='1'?'新增':flag=='2'?'编辑':'详情'"
    :visible="visibleFlag"
    :before-close="handleClose"
     width="25%"
  >
    <el-form :model="currentData" class="dialog" :disabled="flag=='3'" :rules="rules" ref="myForm">
      <el-form-item
        label="所属停车场"
        :label-width="formLabelWidth"
        :hide-required-asterisk="true"
        prop="parkCode"
      >
        <el-select
          @change="chooseParkCode(currentData.parkCode)"
          size="small"
          v-model="currentData.parkCode"
          placeholder="请输入所属停车场"
          filterable
        >
          <el-option
            v-for="(item,i) in parkCodeList"
            :key="i"
            :label="item.full_name"
            :value="item.park_code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域" :label-width="formLabelWidth">
        <el-select
          @change="chooseRegionCode(currentData.regionCode)"
          size="small"
          v-model="currentData.regionCode"
          placeholder="请输入所属区域"
        >
          <el-option
            v-for="(item,i) in regionCodeList"
            :key="i"
            :label="item.name"
            :value="item.region_code"
          ></el-option>
          <el-option
            v-show="isTrue"
            v-for="(item,i) in regions"
            :key="i+9999"
            :label="item.name"
            :value="item.region_code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属通道" :label-width="formLabelWidth">
        <el-select size="small" v-model="currentData.gateCode" placeholder="请输入所属通道">
          <el-option
            v-for="(item,i) in GateCodeList"
            :key="i"
            :label="item.name"
            :value="item.gate_code"
          ></el-option>
          <el-option
            v-show="isTrue"
            v-for="(item,i) in gates"
            :key="i+9999"
            :label="item.name"
            :value="item.gate_code"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="设备类型" :label-width="formLabelWidth" prop="type">
        <el-select size="small" v-model="currentData.type" placeholder="请输入设备类型">
          <el-option :value="1" label="呼叫器"></el-option>
          <el-option :value="2" label="摄像头"></el-option>
          <el-option :value="3" label="LED"></el-option>
          <el-option :value="4" label="PDA"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-show="flag!=='2'" label="设备名称" :label-width="formLabelWidth" prop="name">
        <el-input size="small" v-model="currentData.name" autocomplete="off" placeholder="请输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备编号" :label-width="formLabelWidth">
        <el-input size="small" v-model="currentData.devNo" autocomplete="off" placeholder="请输入设备编号"></el-input>
      </el-form-item>
      <el-form-item v-show="flag!=='2'" label="设备型号" :label-width="formLabelWidth" prop="devModel">
        <el-input
          size="small"
          v-model="currentData.devModel"
          autocomplete="off"
          placeholder="请输入设备型号"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备ID" :label-width="formLabelWidth" prop="cameraId">
        <el-input
          size="small"
          v-model.number="currentData.cameraId"
          autocomplete="off"
          placeholder="请输入设备ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="监控ID" :label-width="formLabelWidth" prop="monitorId">
        <el-input
          size="small"
          v-model.number="currentData.monitorId"
          autocomplete="off"
          placeholder="请输入监控ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="版本号" :label-width="formLabelWidth" prop="devVer">
        <el-input size="small" v-model="currentData.devVer" autocomplete="off" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="设备厂商" :label-width="formLabelWidth" prop="devCompany">
        <el-select size="small" v-model="currentData.devCompany" placeholder="请输入设备类型">
          <el-option value="笛虎"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用日期" :label-width="formLabelWidth" prop="activeDate">
        <el-input
          size="small"
          v-model.number="currentData.activeDate"
          autocomplete="off"
          placeholder="日期格式:20191010"
          maxlength="8"
        ></el-input>
      </el-form-item>
      <el-form-item label="到期日期" :label-width="formLabelWidth" prop="endDate">
        <el-input
          size="small"
          v-model.number="currentData.endDate"
          placeholder="日期格式:20191010"
          autocomplete="off"
          maxlength="8"
        ></el-input>
      </el-form-item>
      <el-form-item v-show="flag=='3'" label="最后编辑日期" :label-width="formLabelWidth">
        <el-input
          size="small"
          v-model="currentData.heartTime"
          autocomplete="off"
          placeholder="日期格式:20190101121212"
          maxlength="14"
        ></el-input>
      </el-form-item>
      <el-form-item v-show="flag=='3'" label="编辑人员" :label-width="formLabelWidth">
        <el-input
          size="small"
          v-model="currentData.modifyOperateNo"
          autocomplete="off"
          placeholder="请输入编辑人员"
        ></el-input>
      </el-form-item>
    </el-form>
    <div v-show="flag!='3'" slot="footer" class="dialog-footer">
      <el-button size="small" class="btn" @click="cancel">取 消</el-button>
      <el-button size="small" class="btn" type="primary" @click="confirm(currentData)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { saveUserLogin } from "@/utils";
import { queryRegionCode } from "@/request/parkRecord/queryRegionCode";
import { queryGate } from "@/request/parkRecord/queryGate";
import { getCutoffReason } from "@/request/parkRecord/CutoffReason";
export default {
  props: ["visibleFlag", "flag", "currentData", "regions", "gates"],
  data() {
    return {
      formLabelWidth: "100px",
      form: {
        parkCode: "",
      },
      rules: {
        parkCode: [
          { required: true, message: "请输入停车场名称", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入设备类型", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],

        devModel: [
          { required: true, message: "请输入设备型号", trigger: "blur" }
        ],
        cameraId: [
          { required: true, message: "请输入设备Id", trigger: "blur" },
          {type:"number",message:"设备id必须为数字",trigger:"change"}
        ],
        devVer: [{ message: "请输入设备版本号", trigger: "blur" }],
        devCompany: [
          { required: true, message: "请输入厂商名称", trigger: "blur" }
        ],
        activeDate: [
          { required: true, message: "请输入启用日期", trigger: "blur" },
          {type:"number",message:"日期必须为数字",trigger:"change"},
        ],
        endDate: [
          { required: true, message: "请输入到期日期", trigger: "blur" },
          {type:"number",message:"日期必须为数字",trigger:"change"}
        ]
      },
      regionCodeList: [],
      GateCodeList: [],
      isTrue: true
    };
  },
  methods: {
    confirm(currentData) {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          if (this.flag == "1") {
            console.log("新增");
            this.$parent.confirmAdd(currentData);
          } else if (this.flag == "2") {
            console.log("编辑");
            if (currentData.monitorId == "") {
              currentData.monitorId = 0;
            }
            this.$parent.confirmEdit(currentData);
          }
        } else {
          this.$message.error("请输入完整且正确的设备信息");
        }
      });
      this.$parent.visibleFlag = false;
    },
    handleClose() {
      this.$parent.visibleFlag = false;
    },
    cancel() {
      this.$parent.visibleFlag = false;
    },
    //选择停车场得到区域
    chooseParkCode(val) {
      this.currentData.regionCode = "";
      this.isTrue = false;
      const reqData = {
        park_code: val
      };
      queryRegionCode(
        reqData,
        this.userLogin.cust_id,
        this.userLogin.session
      ).then(res => {
        if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
          this.regionCodeList = [];
          let regionCodeList = res.data.ANSWERS[0].ANS_COMM_DATA;
          this.regionCodeList = regionCodeList;
        } else {
        }
      });
    },
    //选择区域得到通道
    chooseRegionCode(val) {
      this.currentData.gateCode = "";
      const reqData = {
        park_code: this.currentData.parkCode,
        region_code: val
      };
      queryGate(reqData, this.userLogin.cust_id, this.userLogin.session).then(
        res => {
          if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
            this.GateCodeList = [];
            let GateCodeList = res.data.ANSWERS[0].ANS_COMM_DATA;
            this.GateCodeList = GateCodeList;
          } else {
          }
        }
      );
    }
  },
  computed: {
    ...mapState(["parkCodeList", "userLogin"])
  },

  mounted() {
    saveUserLogin(this);
  }
};
</script>

<style lang="scss">
.dialog {
  .el-form-item__label {
    text-align: right;
    font-size: 12px;
  }
  .el-input {
    // width: 620px;
    width: 203px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
}
</style>