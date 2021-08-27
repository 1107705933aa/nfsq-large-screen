<template>
  <i
    class="iconfont"
    :class="isFullscreen ? 'icon-tuichuquanping' : 'icon-quanping'"
    @click="click"
  ></i>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  props: {
    fullId: {
      type: String,
      default: "appMain"
    }
  },
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    let self = this;
    // 初始化
    self.init();
    // 监听退出全屏事件
    window.onresize = function() {
      if (!self.checkFull()) {
        // 退出全屏后要执行的动作
        self.$emit("quitScreen", self.fullId);
        self.isFullscreen = false;
      }
    };
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    checkFull() {
      //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      //火狐浏览器
      var isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        //谷歌浏览器及Webkit内核浏览器
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },
    click() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      if (!this.isFullscreen) {
        screenfull.request(document.getElementById(this.fullId));
        screenfull.toggle();
        this.$emit("gotoScreen", this.fullId);
        return;
      }
      screenfull.exit();
      this.$emit("quitScreen", this.fullId);
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    }
  }
};
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
