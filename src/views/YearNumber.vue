<template>
  <div class="year-number heiInher">
    <img
      class="year-number-vein left"
      src="@/assets/image/titleAreaTexture.svg"
      alt=""
    />
    <img
      class="year-number-vein right"
      src="@/assets/image/titleAreaTexture.svg"
      alt=""
    />
    <p class="modlue-title">年度样品数量</p>
    <div class="modlue-date">
      <p class="date-name">{{ time }}</p>
      <img class="date-img" src="@/assets/image/icon/date.svg" alt="" />
    </div>
    <div class="modlue-cont" id="histogramYear"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "YearNumber",
  data() {
    return {
      histogramData: [
        {
          name: "原物料",
          value: 0
        },
        {
          name: "成品",
          value: 0
        },
        {
          name: "制程",
          value: 0
        },
        {
          name: "水处理",
          value: 0
        }
      ],
      time: new Date().getFullYear() + "年",
      refreshInter: null
    };
  },
  created() {
    this.getHistogramData();
    this.refreshInter = setInterval(() => {
      this.getHistogramData();
    }, this.refreshTime);
  },
  destroyed() {
    clearInterval(this.refreshInter);
  },
  methods: {
    // 获取数据
    getHistogramData() {
      const self = this;
      self.axios
        .get(self.$API.YearOrdersCount)
        .then(({ data }) => {
          if (data.info) {
            self.time = data.info.time;
            if (data.info.data.length > 0) {
              self.histogramData.forEach((item, index) => {
                const dataFind = data.info.data.find(
                  findItem => findItem.name === item.name
                );
                self.histogramData[index].value = dataFind ? dataFind.total : 0;
              });
            }
          }
        })
        .finally(() => {
          self.$nextTick(() => {
            self.drawHistogram();
          });
        });
    },
    // 绘画图表
    drawHistogram() {
      const self = this;
      const xData = self.histogramData.map(item => item.name);
      const yData = self.histogramData.map(item => item.value);
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById("histogramYear"));
      const option = {
        grid: {
          top: "10%",
          left: "2%",
          right: "2%",
          bottom: "4%",
          containLabel: true
        },
        xAxis: {
          data: xData,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            color: "#fff",
            fontFamily: "PingFangSC-Semibold",
            fontSize: 14
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            color: "#fff",
            fontFamily: "PingFangSC-Semibold",
            fontSize: 12
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          minInterval: 1
        },
        series: [
          {
            type: "bar",
            barWidth: 18,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#6FB6FE"
                    },
                    {
                      offset: 1,
                      color: "#185CDC"
                    }
                  ],
                  false
                )
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 12,
                fontFamily: "PingFangSC-Semibold",
                color: "#ffffff",
                position: "top"
              }
            },
            data: yData
          }
        ]
      };
      myChart.setOption(option);
      setTimeout(() => {
        myChart.resize();
      }, 2000);
      // 屏幕响应并对页面进行改变
      window.onresize = () => {
        myChart.resize();
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.year-number {
  height: 100vh;
  width: 100%;
  background-image: url("../assets/image/moduleBase.svg");
  background-size: 100% 99%;
  background-repeat: no-repeat;
  position: relative;

  &-vein {
    position: absolute;
    top: 9%;
    width: 6%;
    height: 6%;
    &.left {
      left: 28%;
    }
    &.right {
      right: 28%;
      transform: rotate(180deg);
    }
  }
  .modlue-title {
    position: absolute;
    top: 7%;
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #ffffff;
  }
  .modlue-date {
    position: absolute;
    top: 9%;
    right: 3%;
    background: hsla(215, 77%, 45%, 0.5);
    border: 1px solid #4d79ff;
    border-radius: 2px;
    display: flex;
    align-items: center;

    .date-name {
      padding: 3px 9px;
      font-size: 12px;
      color: #ffffff;
      border-right: 1px solid #4d79ff;
    }
    .date-img {
      padding: 0 3px;
      height: 14px;
      width: 20px;
    }
  }
  .modlue-cont {
    padding-top: 10%;
    height: 95%;
    overflow: hidden;
  }
}
</style>
