<template>
  <div class="year-passrate heiInher">
    <img
      class="year-passrate-vein left"
      src="@/assets/image/titleAreaTexture.svg"
      alt=""
    />
    <img
      class="year-passrate-vein right"
      src="@/assets/image/titleAreaTexture.svg"
      alt=""
    />
    <p class="modlue-title">年度样品合格率</p>
    <div class="modlue-date">
      <p class="date-name">{{ time }}</p>
      <img class="date-img" src="@/assets/image/icon/date.svg" alt="" />
    </div>
    <div class="modlue-cont">
      <div class="cont-item" v-for="(item, index) in passrateData" :key="index">
        <div :id="`container${index}`" style="height: 38vh"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
export default {
  name: "YearPassRate",
  data() {
    return {
      passrateData: [
        {
          name: "原物料",
          qualifiednum: 0,
          unqualifiednum: 1
        },
        {
          name: "成品",
          qualifiednum: 0,
          unqualifiednum: 1
        },
        {
          name: "制程",
          qualifiednum: 0,
          unqualifiednum: 1
        },
        {
          name: "水处理",
          qualifiednum: 0,
          unqualifiednum: 1
        }
      ],
      chart: {},
      time: new Date().getFullYear() + "年",
      refreshInter: null
    };
  },
  created() {
    this.getYearPassRateData();
    this.refreshInter = setInterval(() => {
      this.getYearPassRateData();
    }, this.refreshTime);
  },
  destroyed() {
    clearInterval(this.refreshInter);
  },
  methods: {
    // 获取数据
    getYearPassRateData() {
      const self = this;
      self.axios
        .get(self.$API.YearOrdersPercent)
        .then(({ data }) => {
          if (data.info) {
            self.time = data.info.time;
            if (data.info.data.length > 0) {
              self.passrateData.forEach((item, index) => {
                const dataFind = data.info.data.find(
                  findItem => findItem.name === item.name
                );
                self.passrateData[index].qualifiednum = dataFind
                  ? dataFind.qualifiednum
                  : 0;
                self.passrateData[index].unqualifiednum = dataFind
                  ? dataFind.unqualifiednum
                  : 1;
              });
            }
          }
        })
        .finally(() => {
          self.$nextTick(() => {
            self.drawPassrate();
          });
        });
    },
    // 绘画饼图
    drawPassrate() {
      const self = this;
      // const contId = document.getElementById("yearPassRateContId");
      // console.log("%O", contId.offsetHeight);
      self.passrateData.forEach((item, index) => {
        new Highcharts.Chart("container" + index, {
          chart: {
            backgroundColor: "",
            type: "pie",
            marginBottom: 20,
            options3d: {
              enabled: true,
              alpha: 55,
              beta: 0
            }
          },
          credits: {
            enabled: false
          },
          title: {
            text: item.name,
            verticalAlign: "bottom",
            style: {
              color: "#fff",
              fontSize: "14px",
              fontFamily: "PingFangSC-Semibold"
            },
            floating: true,
            y: 25
          },
          tooltip: {
            formatter: function() {
              return `${this.point.name}: <b>${this.percentage.toFixed(
                2
              )}%</b>`;
            }
            // pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              depth: 25,
              startAngle: 100,
              slicedOffset: 10,
              dataLabels: {
                enabled: true,
                formatter: function() {
                  return `${this.percentage.toFixed(2)}%`;
                },
                distance: "5%",
                x: 0,
                y: 0
              }
            }
          },
          series: [
            {
              type: "pie",
              name: "样品合格率",
              data: [
                {
                  name: "合格",
                  color: "#185ADC",
                  y: item.qualifiednum,
                  dataLabels: {
                    color: "#3AFFFE",
                    connectorColor: "#FFFFFF"
                  },
                  sliced: true,
                  selected: true
                },
                {
                  name: "不合格",
                  color: "#E59921",
                  y: item.unqualifiednum,
                  dataLabels: {
                    color: "#FFB335",
                    connectorColor: "#FFFFFF"
                  }
                }
              ]
            }
          ]
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.year-passrate {
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
    height: 100%;
    padding-top: 10%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .cont-item {
      width: 50%;
      // height: 40%;
      // display: inline-block;
    }
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
}
</style>
