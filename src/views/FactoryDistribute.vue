<template>
  <div class="factory-distribute heiInher">
    <img
      class="factory-distribute-vein left"
      src="@/assets/image/titleAreaTexture.svg"
      alt=""
    />
    <img
      class="factory-distribute-vein right"
      src="@/assets/image/titleAreaTexture.svg"
      alt=""
    />
    <p class="modlue-title">工厂分布</p>
    <div class="modlue-cont" id="distributeMap"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china.js";
import "echarts/map/js/world.js";
export default {
  name: "FactoryDistribute",
  data() {
    return {
      distributeData: []
    };
  },
  created() {
    this.getDistributeData();
  },
  methods: {
    // 获取数据
    getDistributeData() {
      const self = this;
      self.distributeData = [
        {
          name: "建德工厂",
          value: [119.24, 29.47]
        },
        {
          name: "新安江一厂",
          value: [119.23, 29.471]
        },
        {
          name: "新安江二厂",
          value: [119.23, 29.472]
        },
        {
          name: "梅坪工厂",
          value: [119.26, 29.44]
        },
        {
          name: "菜园工厂",
          value: [119.18, 29.49]
        },
        {
          name: "淳安工厂",
          value: [119.05, 29.59]
        },
        {
          name: "南山工厂",
          value: [119.06, 29.58]
        },
        {
          name: "靖宇工厂",
          value: [126.75, 42.32]
        },
        {
          name: "抚松工厂",
          value: [128.02, 42.55]
        },
        {
          name: "抚松饮料厂",
          value: [127.81, 42.52]
        },
        {
          name: "临江工厂",
          value: [126.97, 41.81]
        },
        {
          name: "玛纳斯工厂",
          value: [86.2, 44.26]
        },
        {
          name: "承德工厂",
          value: [117.51, 40.51]
        },
        {
          name: "太白工厂",
          value: [107.92, 34.15]
        },
        {
          name: "红河谷工厂",
          value: [107.76, 34.16]
        },
        {
          name: "峨眉山工厂",
          value: [103.38, 29.49]
        },
        {
          name: "新城工厂",
          value: [111.47, 32.52]
        },
        {
          name: "丹江工厂",
          value: [111.51, 32.56]
        },
        {
          name: "均州工厂",
          value: [111.52, 32.57]
        },
        {
          name: "武陵山工厂",
          value: [109.27, 27.73]
        },
        {
          name: "梵净山工厂",
          value: [108.78, 27.77]
        },
        {
          name: "河源工厂",
          value: [114.67, 23.72]
        },
        {
          name: "河源饮料厂",
          value: [114.65, 23.71]
        },
        {
          name: "信丰工厂",
          value: [114.91, 25.41]
        },
        {
          name: "溪河工厂",
          value: [122.49, 52.97]
        },
        {
          name: "武夷山工厂",
          value: [117.96, 27.81]
        }
      ];
      self.$nextTick(() => {
        self.drawDistributeMap();
      });
    },
    // 绘画图表
    drawDistributeMap() {
      const self = this;
      const chartId = document.getElementById("distributeMap");
      const markData = self.distributeData;
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(chartId);
      const option = {
        geo: {
          map: "china",
          zoom: 1,
          scaleLimit: {
            min: 1,
            max: 100
          },
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              borderColor: "rgba(209, 233, 255, 1)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(98, 140, 211, 1)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(36, 75, 154, 1)" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            emphasis: {
              areaColor: "#4CBCFC",
              borderWidth: 0
            }
          }
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo",
            data: markData,
            symbol: `image://${require("../assets/image/coordinate.svg")}`,
            symbolSize: 20,
            label: {
              normal: {
                show: false,
                formatter: params => {
                  return params.name;
                },
                position: "top",
                color: "#fff",
                fontSize: "12",
                padding: [5, 10],
                borderRadius: 3,
                backgroundColor: "rgba(134,157,200,0.8)"
              },
              emphasis: {
                show: true
              }
            }
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
.factory-distribute {
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
  .modlue-cont {
    padding-top: 12%;
    height: 95%;
    overflow: hidden;
  }
}
</style>
