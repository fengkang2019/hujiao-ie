<template>
  <div class="main">
    <el-container>
      <el-header style="padding:0">
        <el-row type="flex" justify="space-between">
          <el-col>
            <img src="../../assets/images/logo.png" />
            <span class="headerTitle">运维云平台</span>
          </el-col>
          <el-col class="headerRight">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <el-dropdown @command="loginOut">
              <span class="el-dropdown-link">
                {{user}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="content">
        <el-aside width="13%">
          <el-menu
            :router="true"
            :collapse-transition="true"
            :default-active="active"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="selectOptions"
            background-color="#282b3a"
            text-color="#fff"
            active-text-color="#5a71c1"
            :unique-opened="true"
          >
            <!-- 呼叫中心 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-service"></i>
                <span>呼叫中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/longcutoff">远程开闸</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="/callrecord">
                <template slot="title">统计报表</template>
                <el-menu-item index="/callrecord">呼叫记录统计</el-menu-item>
                <el-menu-item index="/cutoffreason">开闸原因统计</el-menu-item>
              </el-submenu>
            </el-submenu>
            <!-- 设备管理 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="iconfont icon-shebeiguanli"></i>
                <span>设备管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/equipmentlist">设备列表</el-menu-item>
                <!-- <el-menu-item index="/equipmentmonitor">设备监控</el-menu-item> -->
                <el-submenu index="/equipmentmonitor">
                  <template slot="title">设备监控</template>
                  <el-menu-item index="/equipmentmonitor">呼叫器监控</el-menu-item>
                  <el-menu-item index="/FRPmonitor">FRP监控</el-menu-item>
                </el-submenu>
                <el-menu-item index="/equipmentanalyze">设备分析</el-menu-item>
                <el-menu-item index="/parklotmonitor">车场监控</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 用户反馈 -->
            <!-- <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-chat-dot-square"></i>
                <span>用户反馈</span>
              </template> -->
              <!-- <el-menu-item-group>
                <el-menu-item index="3-1">选项2</el-menu-item>
              </el-menu-item-group> -->
              <!-- <el-submenu index="3-2">
                <template slot="title">选项4</template>
                <el-menu-item index="3-2-1">选项1</el-menu-item>
              </el-submenu> -->
            <!-- </el-submenu> -->
            <!-- 工单中心 -->
            <!-- <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>工单中心</span>
              </template> -->
              <!-- <el-menu-item-group>
                <el-menu-item index="4-1">选项2</el-menu-item>
              </el-menu-item-group> -->
              <!-- <el-submenu index="4-2">
                <template slot="title">选项4</template>
                <el-menu-item index="4-2-1">选项1</el-menu-item>
              </el-submenu> -->
            <!-- </el-submenu> -->
            <!-- 人员设置 -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>人员设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/servicemanage">客服管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 系统设置 -->
            <!-- <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template> -->
              <!-- <el-menu-item-group>
                <el-menu-item index="6-1">选项2</el-menu-item>
              </el-menu-item-group> -->
              <!-- <el-submenu index="6-2">
                <template slot="title">选项4</template>
                <el-menu-item index="6-2-1">选项1</el-menu-item>
              </el-submenu> -->
            <!-- </el-submenu> -->
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { saveUserLogin } from "@/utils";

export default {
  data() {
    return {
      active: "1",
      user: "操作员"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    selectOptions(index, indexPath) {
      // console.log(index, indexPath);
      // console.log(this.active);
    },
    loginOut(val) {
      if (val == "loginOut") {
        this.$store.commit("saveRoute", this.$route.name);
        this.$router.push({ name: "login" });
        // this.$dhweb.logout(this.$store.state.loginHandle);
        sessionStorage.clear();
        localStorage.clear();
      }
    }
  },
  mounted() {
    if (sessionStorage.getItem("account")) {
      this.user = JSON.parse(sessionStorage.getItem("account")).user;
    }
    saveUserLogin(this);
  },
  computed: {
    ...mapState(["loginHandle"])
  }
};
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 100%;
}
.el-header {
  color: #333;
  height: 12%;
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
      width: 13%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 20px;
      color: #fff;
      background: #3e549d;
      img {
        width: 30px;
        height: 30px;
      }
      .headerTitle {
        border-left: 1px solid #fff;
        padding: 0 20px;
      }
    }
    .headerRight {
      background: url("../../assets/images/loginBack.png") no-repeat;
      background-size: cover;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-avatar {
        width: 30px;
        height: 30px;
      }
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
}

.el-aside {
  color: #333;
  height: 100%;
  background: #313445;
  overflow: hidden;
  .icon-shebeiguanli {
    font-size: 18px;
    margin-right: 10px;
  }
}
.el-aside > ul > li > div.el-submenu__title {
  margin-right: 20px;
}
.el-main {
  background-color: #f2f3f7;
  color: #333;
  height: 100%;
  padding: 15px;
  .call {
    width: 100%;
    height: 100%;
  }
}
.el-container {
  height: 100%;
  width: 100%;
}
.el-container > .content {
  height: 88%;
}
</style>