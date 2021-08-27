<template>
  <router-view />
</template>

<style lang="scss">
$scale09: 0.9;
$scale08: 0.8;
$scale07: 0.7;
$scale06: 0.6;

// html,
// body {
//   user-select: none; // 不能进行粘贴复制
// }

.header-title {
  @media screen and (max-width: 1400px) {
    transform: scale(0.8);
  }
  @media screen and (max-width: 1100px) {
    transform: scale(0.7);
  }
  @media screen and (max-width: 900px) {
    transform: scale(0.6);
  }
  @media screen and (max-width: 750px) {
    transform: scale(0.5);
  }
  @media screen and (max-width: 600px) {
    transform: scale(0.4);
  }
  @media screen and (max-width: 500px) {
    transform: scale(0.3);
  }
}
@media screen and (max-width: 750px) {
  .sample-name p {
    transform: scale($scale08);
  }
  .sample-cont-name {
    font-size: 14px !important;
  }
  .sample-cont-item {
    font-size: 16px !important;
  }
}
@media screen and (max-width: 450px) {
  .modlue-date {
    transform: scale($scale09);
    transform-origin: right center;
  }
  .modlue-title {
    transform: scale($scale09);
  }
}
@media screen and (max-width: 400px) {
  .modlue-date {
    transform: scale($scale08);
    transform-origin: right center;
  }
  .modlue-title {
    transform: scale($scale08);
  }
}
@media screen and (max-width: 350px) {
  .modlue-date {
    transform: scale($scale07);
    transform-origin: right center;
  }
  .modlue-title {
    transform: scale($scale07);
  }
}
@media screen and (max-width: 300px) {
  .modlue-date {
    transform: scale($scale06);
    transform-origin: right center;
  }
  .modlue-title {
    transform: scale($scale06);
  }
}
@import url("./assets/css/common.css");
@import url("./assets/css/iconfont.css");
</style>
