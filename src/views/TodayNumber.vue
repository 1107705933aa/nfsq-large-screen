<template>
  <div class="today-number heiInher">
    <img
      class="today-number-vein left"
      src="@/assets/image/titleAreaTexture.svg"
      alt=""
    />
    <img
      class="today-number-vein right"
      src="@/assets/image/titleAreaTexture.svg"
      alt=""
    />
    <p class="modlue-title">今日样品数量</p>
    <div class="modlue-cont" id="waterWave"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts-liquidfill/src/liquidFill.js";
export default {
  name: "TodayNumber",
  data() {
    return {
      waterWaveData: [
        {
          name: "原物料",
          titleLeft: "24%",
          titleTop: "40%",
          center: ["25%", "20%"],
          color: "#36B6D9",
          value: 0,
          rate: 0,
          total: 0
        },
        {
          name: "制程",
          titleLeft: "74%",
          titleTop: "40%",
          center: ["75%", "20%"],
          color: "#DBA393",
          value: 0,
          rate: 0,
          total: 0
        },
        {
          name: "成品",
          titleLeft: "24%",
          titleTop: "87%",
          center: ["25%", "67%"],
          color: "#D3B569",
          value: 0,
          rate: 0,
          total: 0
        },
        {
          name: "水处理",
          titleLeft: "74%",
          titleTop: "87%",
          center: ["75%", "67%"],
          color: "#73CB97",
          value: 0,
          rate: 0,
          total: 0
        }
      ],
      refreshInter: null
    };
  },
  created() {
    this.getWaveData();
    this.refreshInter = setInterval(() => {
      this.getWaveData();
    }, this.refreshTime);
  },
  destroyed() {
    clearInterval(this.refreshInter);
  },
  methods: {
    // 获取数据
    getWaveData() {
      const self = this;
      self.axios
        .get(self.$API.DayOrdersCount)
        .then(({ data }) => {
          // const data = [
          //   {
          //     name: "原物料",
          //     finished: 0,
          //     total: 120
          //   },
          //   {
          //     name: "制程",
          //     finished: 44,
          //     total: 120
          //   },
          //   {
          //     name: "成品",
          //     finished: 44,
          //     total: 120
          //   },
          //   {
          //     name: "水处理",
          //     finished: 40,
          //     total: 123
          //   }
          // ];
          if (data.length > 0) {
            self.waterWaveData.forEach((item, index) => {
              const dataFind = data.find(
                findItem => findItem.name === item.name
              );
              self.waterWaveData[index].value = dataFind
                ? dataFind.finished
                : 0;
              self.waterWaveData[index].rate = dataFind
                ? dataFind.finished / dataFind.total
                : 0;
              self.waterWaveData[index].total = dataFind ? dataFind.total : 0;
            });
          }
        })
        .finally(() => {
          self.$nextTick(() => {
            self.drawWave();
          });
        });
    },
    // 绘画饼图
    drawWave() {
      const self = this;
      const title = [];
      const series = [];
      self.waterWaveData.forEach(item => {
        title.push({
          text: item.name,
          left: item.titleLeft,
          top: item.titleTop,
          textAlign: "center",
          textStyle: {
            color: "#ffffff",
            fontSize: 12
          }
        });
        series.push({
          type: "liquidFill",
          radius: "35%",
          // 水球颜色
          color: [item.color],
          center: item.center,
          label: {
            formatter: param => {
              return param.data.total;
            },
            fontSize: 16,
            color: item.color,
            insideColor: "#fff"
          },
          itemStyle: {
            opacity: 0.5, //波浪的透明度
            shadowBlur: 10, //波浪的阴影范围
            shadowColor: item.color //阴影颜色
          },
          outline: {
            show: true, //是否显示轮廓 布尔值
            borderDistance: 0, //外部轮廓与图表的距离 数字
            itemStyle: {
              borderWidth: 0 //边框的宽度
            }
          },
          emphasis: {
            itemStyle: {
              opacity: 1 //鼠标经过波浪颜色的透明度
            }
          },
          data: [
            {
              value: item.rate,
              num: item.value,
              total: item.total
            },
            item.rate + 0.0244,
            item.rate - 0.0196,
            item.rate - 0.0396,
            item.rate - 0.0486
          ],
          amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
          waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
          backgroundStyle: {
            borderWidth: 1,
            borderColor: "#223156",
            color: "#223156", //图表的背景颜色
            itemStyle: {
              shadowBlur: 10, //设置无用
              shadowColor: item.color, //设置无用
              opacity: 1 //设置无用
            }
          },
          direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
          waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
          animationEasing: "linear", //初始动画
          animationEasingUpdate: "quarticInOut", //数据更新的动画效果
          animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
          animationDurationUpdate: 300 //数据更新动画的时长
        });
      });
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById("waterWave"));
      const option = { title, series };
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
.today-number {
  height: 100vh;
  width: 100%;
  background-image: url("../assets/image/moduleBase.svg");
  background-size: 100% 100%;
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
  .modlue-cont {
    padding-top: 11%;
    height: 95%;
    overflow: hidden;
  }
}
</style>
