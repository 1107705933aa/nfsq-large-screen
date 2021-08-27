<template>
  <div class="header heiInher">
    <p class="header-title">农夫山泉QMS系统展示平台</p>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.header {
  height: 100vh;
  width: 100%;
  background-image: url("../assets/image/topTitleBar.svg");
  background-size: 100% 140%;
  background-repeat: no-repeat;
  .header-title {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #ffffff;
    letter-spacing: 0;
  }
}
</style>
