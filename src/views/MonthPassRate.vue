<template>
  <div class="month-passrate heiInher">
    <img
      class="month-passrate-vein left"
      src="@/assets/image/titleAreaTexture.svg"
      alt=""
    />
    <img
      class="month-passrate-vein right"
      src="@/assets/image/titleAreaTexture.svg"
      alt=""
    />
    <p class="modlue-title">月度样品合格率</p>
    <div class="modlue-date">
      <p class="date-name">{{ time }}</p>
      <img class="date-img" src="@/assets/image/icon/date.svg" alt="" />
    </div>
    <div class="modlue-cont">
      <div class="cont-legend">
        <p class="qualified">合格率</p>
        <p class="unqualified">不合格率</p>
      </div>
      <ul class="cont-ul">
        <li
          class="cont-item"
          v-for="(item, index) in passrateData"
          :key="index"
        >
          <p class="cont-item-name">{{ item.name }}</p>
          <div class="cont-item-rate">
            <span class="qualified-num">{{ item.qualified }}</span>
            <span
              class="cont-item-qualified"
              :style="`width: ${item.qualified}`"
            ></span>
            <span
              class="cont-item-unqualified"
              :style="`width: calc(100% - ${item.qualified})`"
            ></span>
            <span class="unqualified-num">{{ item.unqualified }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MonthPassRate",
  data() {
    return {
      passrateData: [
        {
          name: "原物料",
          qualified: "0%",
          unqualified: "100%"
        },
        {
          name: "制程",
          qualified: "0%",
          unqualified: "100%"
        },
        {
          name: "成品",
          qualified: "0%",
          unqualified: "100%"
        },
        {
          name: "水处理",
          qualified: "0%",
          unqualified: "100%"
        }
      ],
      time:
        new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月",
      refreshInter: null
    };
  },
  created() {
    this.getPassrateData();
    this.refreshInter = setInterval(() => {
      this.getPassrateData();
    }, this.refreshTime);
  },
  destroyed() {
    clearInterval(this.refreshInter);
  },
  methods: {
    // 获取数据
    getPassrateData() {
      const self = this;
      self.axios.get(self.$API.MonthOrdersPercent).then(({ data }) => {
        // const data = {
        //   time: "2020年12月",
        //   info: {
        //     data: [
        //       {
        //         name: "原物料",
        //         qualifiedrate: 0.77777777,
        //         unqualifiedrate: 0.2222223
        //       },
        //       {
        //         name: "制程",
        //         qualifiedrate: 0.777,
        //         unqualifiedrate: 0.333
        //       },
        //       {
        //         name: "成品",
        //         qualifiedrate: 0.777,
        //         unqualifiedrate: 0.333
        //       },
        //       {
        //         name: "水处理",
        //         qualifiedrate: 0.777,
        //         unqualifiedrate: 0.333
        //       }
        //     ]
        //   }
        // };
        if (data.info) {
          self.time = data.info.time;
          if (data.info.data.length > 0) {
            self.passrateData.forEach((item, index) => {
              const dataFind = data.info.data.find(
                findItem => findItem.name === item.name
              );
              self.passrateData[index].qualified = dataFind
                ? (dataFind.qualifiedrate * 100).toFixed(2) + "%"
                : "0%";
              self.passrateData[index].unqualified = dataFind
                ? (dataFind.unqualifiedrate * 100).toFixed(2) + "%"
                : "100%";
            });
            console.log(self.passrateData);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.month-passrate {
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
  .modlue-date {
    position: absolute;
    top: 9%;
    right: 1%;
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
    padding-top: 20vh;
    height: 95vh;
    overflow: hidden;
  }
  .cont-legend {
    display: flex;
    justify-content: center;
    font-size: 14px;
    align-items: center;
    color: #ffffff;
    height: 10%;

    .qualified::before,
    .unqualified::before {
      content: "";
      display: inline-block;
      height: 14px;
      width: 14px;
      border-radius: 50%;
      margin-right: 6px;
    }
    p {
      display: inline-flex;
      align-items: center;
    }
    .qualified {
      margin-right: 30px;
      &::before {
        background-image: linear-gradient(18deg, #1357db 0%, #4fa6ff 100%);
      }
    }
    .unqualified {
      &::before {
        background-image: linear-gradient(90deg, #ffea5a 0%, #ffae2e 100%);
      }
    }
  }
  .cont-ul {
    height: 90%;
    .cont-item {
      display: flex;
      justify-content: space-between;
      height: 25%;
      &-name {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 14px;
        color: #ffffff;
        text-align: right;
        padding-right: 8px;
        border-right: 1px solid #42577e;
      }
      &-rate {
        position: relative;
        width: 80%;
        padding: 2% 20%;
        font-size: 12px;
        color: #ffffff;
      }
      &-qualified {
        display: inline-block;
        width: 50%;
        height: 100%;
        background-image: linear-gradient(18deg, #1357db 0%, #4fa6ff 100%);
      }
      &-unqualified {
        display: inline-block;
        width: 50%;
        height: 100%;
        background-image: linear-gradient(90deg, #ffea5a 0%, #ffae2e 100%);
      }
      .qualified-num {
        position: absolute;
        top: 50%;
        right: 80%;
        transform: translateY(-50%);
      }
      .unqualified-num {
        position: absolute;
        top: 50%;
        left: 80%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
