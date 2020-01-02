<template>
  <div class="BAR">
    <div :id="chartId" :style="{height:height,width:width}" ref="myEchart"></div>
  </div>
</template>

<script>
export default {
  props: ["chartId", "width", "height", "text"],
  data() {
    return {};
  },
  methods: {
    getEchartData1() {
      const myChart = this.$echarts.init(document.getElementById(this.chartId));
      myChart.setOption({
        title: {
          text: this.text,
          top: 5,
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {},
        grid: {
          top: "22%",
          right: "3%",
          left: "5%",
          bottom: "15%"
        },
        xAxis: [
          {
            type: "category",
            data: ["10/1", "10/2", "10-3", "10-4", "10-5"],
            axisLabel: {
              textStyle: {
                fontSize: 12
              }
            }
          }
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: [300, 450, 770, 203, 255, 188, 156],
            barWidth: "30px",
            label: {
              normal: {
                show: true,
                lineHeight: 30,
                position:"top",
                width: 80,
                height: 30,
                borderRadius: 200
              }
            },
            itemStyle:{
              normal:{
                color:"#52b0e3"
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
.BAR {
  width: 100%;
  height: 100%;
}
</style>