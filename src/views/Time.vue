<template>
  <div class="time heiInher">
    <div class="time-cont">
      <div class="time-cont-item">
        <div class="year">
          <img
            v-for="(item, index) in yearArr"
            :key="index"
            :src="require(`@/assets/image/time/num${item || 0}.svg`)"
            alt=""
          />
        </div>
        <span class="text"> 年 </span>
        <div class="number">
          <img
            v-for="(item, index) in monthArr"
            :key="index"
            :src="require(`@/assets/image/time/num${item || 0}.svg`)"
            alt=""
          />
        </div>
        <span class="text"> 月 </span>
        <div class="number">
          <img
            v-for="(item, index) in dayArr"
            :key="index"
            :src="require(`@/assets/image/time/num${item || 0}.svg`)"
            alt=""
          />
        </div>
        <span class="text"> 日 </span>
      </div>
      <div class="time-cont-item">
        <div class="number">
          <img
            v-for="(item, index) in hourArr"
            :key="index"
            :src="require(`@/assets/image/time/num${item || 0}.svg`)"
            alt=""
          />
        </div>
        <span class="text"> : </span>
        <div class="number">
          <img
            v-for="(item, index) in minuteArr"
            :key="index"
            :src="require(`@/assets/image/time/num${item || 0}.svg`)"
            alt=""
          />
        </div>
        <span class="text"> : </span>
        <div class="number">
          <img
            v-for="(item, index) in secondArr"
            :key="index"
            :src="require(`@/assets/image/time/num${item || 0}.svg`)"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Time",
  data() {
    return {
      // 定时器
      timeInterval: {},
      // 时间显示数组
      yearArr: [0, 0, 0, 0],
      monthArr: [0, 0],
      dayArr: [0, 0],
      hourArr: [0, 0],
      minuteArr: [0, 0],
      secondArr: [0, 0]
    };
  },
  mounted() {
    const self = this;
    self.timeInterval = setInterval(() => {
      self.formatNowTime();
    }, 1000);
  },
  destroyed() {
    clearInterval(self.timeInterval);
  },
  methods: {
    formatNowTime() {
      const self = this;
      const nowTime = new Date();
      const year = nowTime.getFullYear();
      const month = nowTime.getMonth() + 1;
      const day = nowTime.getDate();
      const hour = nowTime.getHours();
      const minute = nowTime.getMinutes();
      const second = nowTime.getSeconds();
      // console.log(year, month, day, hour, minute, second);
      self.yearArr = self.formatNumToArr(year, 4);
      self.monthArr = self.formatNumToArr(month, 2);
      self.dayArr = self.formatNumToArr(day, 2);
      self.hourArr = self.formatNumToArr(hour, 2);
      self.minuteArr = self.formatNumToArr(minute, 2);
      self.secondArr = self.formatNumToArr(second, 2);
    },
    formatNumToArr(testnum, len = 2) {
      const list = [parseInt(testnum % 10)]; // 去个位数的值
      // 判断是否是大于个位数的值
      if (len > 1) {
        // 对数字进行循环并存入数组中
        for (let i = 2; i <= len; i += 1) {
          list.push(
            parseInt(
              (testnum % Number(1 + "0".repeat(i))) /
                Number(1 + "0".repeat(i - 1))
            ) // repeat是将字符0复制为多少个
          );
        }
        list.reverse(); // 将数组进行反转，得到正确的数组
      }
      return list;
    }
  }
};
</script>

<style lang="scss" scoped>
.time {
  height: 100vh;
  width: 100%;
  background-image: url("../assets/image/time/timeBlock.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  &-cont {
    position: absolute;
    top: 7%;
    width: 100%;
    height: 100%;
    padding: 0 15%;
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC-Semibold;
    font-size: 30px;
    color: #ffffff;
    letter-spacing: 0;

    &-item {
      display: flex;
      align-items: center;
      flex-basis: auto;
      .text {
        padding: 0 5px;
      }

      .number,
      .year {
        height: 60%;
        position: relative;
        display: flex;
        align-items: center;
        background: #1c4199;
        border-radius: 4px;
        padding: 5px;

        img {
          height: 100%;
        }
      }
      .year img {
        width: 25%;
      }
      .number img {
        width: 50%;
      }
    }
  }
}
</style>
