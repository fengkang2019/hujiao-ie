<template>
  <div id="equipmentanalyze">
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
                :picker-options="pikerOptions"
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

        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="停车场">
              <el-select v-model="form.parklot" clearable placeholder="请输入停车场名称" size="small" filterable>
                <el-option value="" label="全部"></el-option>

                <el-option v-for="(item,i) in parkCodeList" :key="i" :value="item.park_code" :label="item.full_name"></el-option>
              </el-select>
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
    <el-row class="echart">
      <el-col :span="24">
        <Bar chartId="Bar" height="100%" width="100%" text="故障分析" />
      </el-col>
    </el-row>
    <el-row class="echart" type="flex" justify="space-between">
      <el-col style="width:49.5%">
        <!-- <Pie chartId="PieLeft" height="100%" width="100%" text="故障厂商分析" /> -->
      </el-col>
      <el-col style="width:49.5%">
        <!-- <Pie chartId="PieRight" height="100%" width="100%" text="报废率厂商分析" /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Bar from "@/components/echarts/Bar.vue";
import Pie from "@/components/echarts/Pie.vue";
import { chooseDate } from "@/utils";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { saveUserLogin } from "@/utils";

export default {
  components: { Bar, Pie },
  data() {
    return {
      form: {
        timerange: "",
        date: "1",
        startTime: "",
        endTime: ""
      },
      rangeTime: ["00:00:00", "23:59:59"],
      pikerOptions: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    changeDate: function(date) {
      this.form.timerange = chooseDate(date, this.form.timerange);
    },
    onSubmit: function(form) {
      this.form.startTime = form.timerange[0];
      this.form.endTime = form.timerange[1];
      console.log(form);
    },
    changeTime(value) {}
  },
  computed:{
    ...mapState(["parkCodeList"])
  },
  mounted(){
    saveUserLogin();
  }
};
</script>

<style lang="scss">
.el-form-item__label {
  background: #ececec;
  height: 32px;
  // margin-top: 5px;
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

.btn {
  background: #3e549d;
}
#equipmentanalyze {
  .echart {
    margin-top: 10px;
    background: #f2f3f7;
    .el-col {
      background: #fff;
      height: 275px;
    }
  }
}
</style>