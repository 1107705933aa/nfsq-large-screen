<template>
  <div class="home" id="nfsqdp">
    <img class="home-base-image" src="@/assets/image/centerBase.svg" alt="" />
    <PartScreenfull
      @quitScreen="quitScreen"
      @gotoScreen="gotoScreen"
      :fullId="'nfsqdp'"
      class="home-full"
    ></PartScreenfull>
    <iframe
      style="height: 6%"
      :src="headerSrc"
      frameborder="0"
      scrolling="no"
      id="headerIfm"
    ></iframe>
    <el-row :gutter="10" class="home-row">
      <el-col class="home-col" :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
        <iframe
          id="yearPassRateIfm"
          :src="yearPassRateSrc"
          frameborder="0"
          scrolling="no"
        ></iframe>
        <iframe
          id="yearNumberIfm"
          :src="yearNumberSrc"
          frameborder="0"
          scrolling="no"
        ></iframe>
        <iframe
          id="todayNumberIfm"
          :src="todayNumberSrc"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </el-col>
      <el-col
        class="home-col home-center"
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <iframe
          id="timeIfm"
          style="height: 14%"
          :src="timeSrc"
          frameborder="0"
          scrolling="no"
        ></iframe>
        <iframe
          id="sampleRegisterIfm"
          style="height: 80%"
          :src="sampleRegisterSrc"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </el-col>
      <el-col class="home-col" :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
        <iframe
          id="monthPassRateIfm"
          :src="monthPassRateSrc"
          frameborder="0"
          scrolling="no"
        ></iframe>
        <iframe
          id="monthNumberIfm"
          :src="monthNumberSrc"
          frameborder="0"
          scrolling="no"
        ></iframe>
        <iframe
          id="factoryDistributeIfm"
          :src="factoryDistributeSrc"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PartScreenfull from "../components/ScreenfullPart";
export default {
  name: "Home",
  data() {
    return {
      // iframe的链接
      factoryDistributeSrc: `${this.modeHome}/factoryDistribute`,
      monthNumberSrc: `${this.modeHome}/monthNumber`,
      monthPassRateSrc: `${this.modeHome}/monthPassRate`,
      sampleRegisterSrc: `${this.modeHome}/sampleRegister`,
      timeSrc: `${this.modeHome}/time`,
      todayNumberSrc: `${this.modeHome}/todayNumber`,
      yearPassRateSrc: `${this.modeHome}/yearPassRate`,
      yearNumberSrc: `${this.modeHome}/yearNumber`,
      headerSrc: `${this.modeHome}/header`,
      // iframe的id
      ifmArrId: [
        "headerIfm",
        "yearPassRateIfm",
        "yearNumberIfm",
        "todayNumberIfm",
        "timeIfm",
        "sampleRegisterIfm",
        "monthPassRateIfm",
        "monthNumberIfm",
        "factoryDistributeIfm"
      ]
    };
  },
  components: {
    PartScreenfull
  },
  mounted() {
    // const self = this;
    // self.ifmArrId.forEach(item => {
    //   const docIfm = document.getElementById(item);
    //   docIfm.addEventListener("load", () => {
    //     // 对iframe内容的高度进行赋值
    //     self.setHeight(docIfm);
    //     // iframe高度随内容改变
    //   });
    // });
  },
  methods: {
    // iframe的id定义
    iFrameHeight() {
      const self = this;
      self.ifmArrId.forEach(item => {
        const docIfm = document.getElementById(item);
        // 对iframe内容的高度进行赋值
        self.setHeight(docIfm);
      });
    },
    // 对iframe内容的高度进行赋值
    setHeight(docIfm) {
      const doc = docIfm.contentDocument;
      doc.querySelector(".heiInher").style.height = "100%";
      // console.log("%O", doc.querySelector(".heiInher"));
      const body = doc.body,
        html = doc.documentElement;
      const height = Math.min(
        docIfm.clientHeight,
        docIfm.scrollHeight,
        docIfm.offsetHeight
      );
      console.log(height);
      html.style.height = height + "px";
      body.style.height = height + "px";
    },
    // 取内容的高度
    getHeight(doc) {
      const body = doc.body,
        html = doc.documentElement;
      const height = Math.min(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      console.log(height);
      return height + "px";
    },
    // 进入全屏
    gotoScreen(fullId) {
      // this.iFrameHeight();
      console.log(fullId, "进入全屏");
    },
    // 退出全屏
    quitScreen(fullId) {
      // this.iFrameHeight();
      console.log(fullId, "退出全屏");
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  // height: 947px;
  background-image: url("../assets/image/backgroundMap.svg");
  background-size: 100% 100%;
  background-repeat: repeat-y;
  position: relative;

  &-row {
    height: 94%;
    float: left;
  }

  &-col {
    height: 100%;
  }
  .home-full {
    position: absolute;
    font-size: 24px;
    top: 10px;
    right: 10px;
    color: #fff;
    z-index: 10;
  }
  iframe {
    margin: 0;
    float: left;
    width: 100%;
    height: 100%;
  }

  &-base-image {
    width: 66%;
    height: 25%;
    position: absolute;
    bottom: 0;
    left: 17%;
  }

  #yearPassRateIfm,
  #yearNumberIfm,
  #monthPassRateIfm,
  #monthNumberIfm {
    margin-bottom: 3%;
    height: 32%;
  }

  #todayNumberIfm,
  #factoryDistributeIfm {
    height: 32%;
  }
}
</style>
