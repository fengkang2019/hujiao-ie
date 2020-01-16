<template>
  <div class="PIE">
    <div :id="chartId" :style="{height:height,width:width}" ref="myEchart"></div>
  </div>
</template>

<script>
export default {
  props: ["chartId", "width", "height", "text","pieDatas","n","txt"],
  data() {
    return {};
  },
  methods: {
    getEchartData1() {
      const myChart = this.$echarts.init(document.getElementById(this.chartId));
      myChart.setOption({
        title: {
          text: this.text,
          top: 20,
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          formatter: "{b} : \n {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          left: 50,
          top: 50,

          orient: "vertical",
          align: "left",
          formatter: null
        },
        graphic: {
          //图形中间文字
          type: "text",
          left: "66%",
          top: "48%",
          style: {
            text: this.n+"/次 \n"+this.txt,
            textAlign: "center",
            // fill: "#fff",
            fontSize: 12
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: [40, "50%"],
            center: ["70%", "55%"],
            selectedMode: "single",
            selectedOffset: 0,
            roseType: true,
            label: {
              normal: {
                formatter: "{b}: {d}%"
              }
            },
            // data: [
            //   { value: 235, name: "视频广告" },
            //   { value: 274, name: "联盟广告" },
            //   { value: 310, name: "邮件营销" },
            //   { value: 335, name: "直接访问" },
            //   { value: 400, name: "搜索引擎" }
            // ],
            data:this.pieDatas,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0
                // shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  },
  mounted() {
    this.getEchartData1();
  }
};
</script>

<style lang="scss">
.PIE {
  width: 100%;
  height: 100%;
}
</style>