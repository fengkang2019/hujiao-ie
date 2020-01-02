<template>
  <div id="Auth">
    <el-dialog title="授权停车场" :visible.sync="visible4" width="50%" :before-close="handleClose">
      <el-transfer
        v-model="value"
        :props="{
         key: 'value',
         label: 'desc'
        }"
        :data="datas"
        :titles="titles"
        :button-texts="['解除授权','停车授权']"
        @change="changeValue"
        @left-check-change="checkLeft"
        @right-check-change="checkRight"
      ></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn" size="small" @click="cancel">取 消</el-button>
        <el-button class="btn" size="small" type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible4", "groups", "userNo", "form", "groupsRight"],
  data() {
    return {
      value: [],
      titles: ["无人值守项目", "授权无人值守项目"],
      index: []
    };
  },
  methods: {
    handleClose() {
      this.$parent.closeDialog();
       this.$parent.search(this.form)
    },
    cancel() {
      this.$parent.closeDialog();
       this.$parent.search(this.form)
    },
    confirm() {
      this.$parent.closeDialog();
       this.$parent.search(this.form)
    },
    changeValue(value, direction, movedKeys) {
      let that = this;
      // for (var i = 0; i < value.length; i++) {
      //   console.log(i);
      // }
      //选中单个

      if (direction == "right") {
        // console.log(this.index);
        for (var i = 0; i < this.index.length; i++) {
          const reqData = {
            userNo: this.userNo,
            parkCode: this.datas[this.index[i]].parkCode,
            groupId: this.datas[this.index[i]].id
          };
          this.$axios
            .post("/pagerInsert/insertGroupUser", reqData)
            .then(res => {
              if (res) {
                if (res.data.msg == 3) {
                  this.$message.error("添加分组失败,请勿重复添加");
                } else {
                  this.$message.success("添加分组成功");
                }
              } else {
                return false;
              }
            });
        }
      } else {
        // console.log(this.datas);
        for (var i = 0; i < this.index.length; i++) {
          const reqData = {};
          const name = this.datas[this.index[i]].desc;
          this.groupsRight.map((item, i) => {
            if (item.name == name) {
              reqData.id = item.id;
            }
          });
          // console.log(reqData);
          // console.log(this.groupsRight);
          this.$axios.post("/pageDelete/deleteGroupUser", reqData).then(res => {
            if (res.data.msg == 1) {
              that.$message.success("解除授权成功");
            } else {
              that.$message.error("解除授权失败");
              return false;
            }
          });
        }
      }

     
    },
    checkLeft(checkedKey, val) {
      // console.log(checkedKey);
      this.index = checkedKey;
    },
    checkRight(checkedKey, val) {
      console.log(checkedKey);
      this.index = checkedKey;
    }
  },
  computed: {
    datas: function() {
      let data = [];
      // console.log(this.groups);
      this.groups.map((item, index) => {
        const obj = {};
        obj.value = index;
        obj.desc = item.name;
        obj.parkCode = item.parkCode;
        obj.id = item.id;
        data.push(obj);
      });
      return data;
    }
  },
  watch: {
    groupsRight: function(val) {
      this.value = [];
      val.map((item, index) => {
        for (var i = 0; i < this.datas.length; i++) {
          if (this.datas[i].desc == item.name) {
            this.value.push(i);
            // this.datas[i].id =item.id
          }
        }
      });
      // console.log(this.groupsRight);
    }
  }
};
</script>

<style lang="scss">
#Auth {
  .btn {
    background: #3e549d;
    color: #fff;
  }
  .el-transfer {
    .el-transfer-panel{
      width: 18.7vw;
    }
    .el-button {
      background: #3e549d;
      color: #fff;
    }
    // button:nth-child(1) {
    //   display: none;
    // }
  }
}
</style>