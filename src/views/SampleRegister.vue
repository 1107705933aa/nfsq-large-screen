<template>
  <div class="sample-register heiInher">
    <ul class="sample-register-ul">
      <li
        class="sample-register-item"
        v-for="(item, index) in sampleData"
        :key="index"
      >
        <div class="sample-name">
          <p>{{ item.name }}</p>
        </div>
        <div
          :class="`sample-${child.type}`"
          v-for="(child, idx) in item.numberArr"
          :key="idx"
        >
          <div
            v-if="child.type === 'total' || child.type === 'qualified'"
            class="sample-cont-name"
          >
            {{ child.name }}
          </div>
          <ul class="sample-cont-ul">
            <li
              class="sample-cont-item"
              v-for="(num, numI) in formatNumToArr(child.num)"
              :key="numI"
            >
              {{ num }}
            </li>
            <img
              v-show="child.num.toString().length > numMax"
              class="sample-cont-more"
              src="../assets/image/moreNumbers.svg"
              alt=""
            />
          </ul>
          <div
            v-if="child.type === 'register' || child.type === 'logged'"
            class="sample-cont-name"
          >
            {{ child.name }}
          </div>
        </div>
      </li>
    </ul>
    <div class="sample-register-unit">单位/个</div>
  </div>
</template>

<script>
export default {
  name: "Time",
  data() {
    return {
      sampleData: [
        {
          name: "原物料",
          numberArr: [
            {
              type: "register",
              name: "样品登录",
              num: 0
            },
            {
              type: "logged",
              name: "检验中",
              num: 0
            },
            {
              type: "qualified",
              name: "合格样品数",
              num: 0
            },
            {
              type: "total",
              name: "样品总数",
              num: 0
            }
          ]
        },
        {
          name: "成品",
          numberArr: [
            {
              type: "register",
              name: "样品登录",
              num: 0
            },
            {
              type: "logged",
              name: "检验中",
              num: 0
            },
            {
              type: "qualified",
              name: "合格样品数",
              num: 0
            },
            {
              type: "total",
              name: "样品总数",
              num: 0
            }
          ]
        },
        {
          name: "制程",
          numberArr: [
            {
              type: "register",
              name: "样品登录",
              num: 0
            },
            {
              type: "logged",
              name: "检验中",
              num: 0
            },
            {
              type: "qualified",
              name: "合格样品数",
              num: 0
            },
            {
              type: "total",
              name: "样品总数",
              num: 0
            }
          ]
        },
        {
          name: "水处理",
          numberArr: [
            {
              type: "register",
              name: "样品登录",
              num: 0
            },
            {
              type: "logged",
              name: "检验中",
              num: 0
            },
            {
              type: "qualified",
              name: "合格样品数",
              num: 0
            },
            {
              type: "total",
              name: "样品总数",
              num: 0
            }
          ]
        }
      ],
      numMax: 5,
      refreshInter: null
    };
  },
  created() {
    this.getSampleData();
    this.refreshInter = setInterval(() => {
      this.getSampleData();
    }, this.refreshTime);
  },
  destroyed() {
    clearInterval(this.refreshInter);
  },
  methods: {
    // 获取数据
    getSampleData() {
      const self = this;
      self.axios.get(self.$API.CentreInformation).then(({ data }) => {
        if (data.length > 0) {
          self.sampleData.forEach((item, index) => {
            const dataFind = data.find(findItem => findItem.name === item.name);
            self.sampleData[index].numberArr.forEach((samFind, samIdx) => {
              self.sampleData[index].numberArr[samIdx].num = dataFind
                ? dataFind[samFind.type]
                : 0;
            });
          });
        }
      });
    },
    // 将数字转化为数组
    formatNumToArr(testnum) {
      const strNum = testnum.toString();
      const len = strNum.length; // 取得数字的长度
      if (len > this.numMax) return "9".repeat(this.numMax);
      return strNum;
    }
  }
};
</script>

<style lang="scss" scoped>
.sample-register {
  height: 100vh;
  width: 100%;
  position: relative;
  &-unit {
    position: absolute;
    bottom: 6%;
    right: 1.7%;
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #ffffff;
    letter-spacing: 0;
  }
  &-ul {
    width: 100%;
    height: 100%;
    padding: 0 4%;
  }
  &-item {
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #ffffff;
    letter-spacing: 0;
    width: 100%;
    margin-top: 3%;
    height: 18.5%;
    background-image: url("../assets/image/middle/moduleBase.svg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;

    .sample-name {
      margin: 0 auto;
      width: 20%;
      height: 100%;
      background-image: url("../assets/image/middle/typeBase.svg");
      background-position: center;
      background-size: 100% 80%;
      background-repeat: no-repeat;
      position: relative;

      p {
        position: absolute;
        top: 30%;
        width: 100%;
        text-align: center;
      }
    }

    .sample-register,
    .sample-logged,
    .sample-total,
    .sample-qualified {
      position: absolute;
      width: 32%;
      height: 25%;
    }
    .sample-register {
      top: 18%;
      left: 5%;
      .sample-cont-ul {
        justify-content: flex-end;
      }
    }
    .sample-logged {
      bottom: 18%;
      left: 5%;
      .sample-cont-ul {
        justify-content: flex-end;
      }
    }
    .sample-total {
      top: 18%;
      right: 5%;
    }
    .sample-qualified {
      bottom: 18%;
      right: 5%;
    }
    .sample-cont {
      &-name {
        background-image: url("../assets/image/middle/typeSubtitleBlock.svg");
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-size: 16px;
        color: #26dfff;
        display: inline-flex;
        width: 50%;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
      &-ul {
        display: inline-flex;
        padding: 0 5%;
        width: 50%;
        height: 100%;
        position: relative;
      }
      &-item {
        display: inline-flex;
        width: 20%;
        justify-content: center;
        align-items: center;
        height: 100%;
        border: 1px solid #09bddc;
        box-shadow: inset 0 2px 4px 0 #000000;
        border-radius: 2px;
        text-align: center;
      }
      &-more {
        position: absolute;
        top: -16%;
        right: 7%;
        width: 10px;
        height: 10px;
      }
    }
  }
}
</style>
