import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  // 头部
  {
    path: "/header",
    name: "Header",
    component: () =>
      import(/* webpackChunkName: "header" */ "../views/Header.vue")
  },
  // 时间
  {
    path: "/time",
    name: "Time",
    component: () =>
      import(/* webpackChunkName: "header" */ "../views/Time.vue")
  },
  // 样品登录
  {
    path: "/sampleRegister",
    name: "SampleRegister",
    component: () =>
      import(
        /* webpackChunkName: "sampleRegister" */ "../views/SampleRegister.vue"
      )
  },
  // 年度样品合格率
  {
    path: "/yearPassRate",
    name: "YearPassRate",
    component: () =>
      import(/* webpackChunkName: "yearPassRate" */ "../views/YearPassRate.vue")
  },
  // 年度样品数量
  {
    path: "/yearNumber",
    name: "YearNumber",
    component: () =>
      import(/* webpackChunkName: "yearNumber" */ "../views/YearNumber.vue")
  },
  // 今日样品数量
  {
    path: "/todayNumber",
    name: "TodayNumber",
    component: () =>
      import(/* webpackChunkName: "todayNumber" */ "../views/TodayNumber.vue")
  },
  // 月度样品合格率
  {
    path: "/monthPassRate",
    name: "MonthPassRate",
    component: () =>
      import(
        /* webpackChunkName: "monthPassRate" */ "../views/MonthPassRate.vue"
      )
  },
  // 月度样品数量
  {
    path: "/monthNumber",
    name: "MonthNumber",
    component: () =>
      import(/* webpackChunkName: "monthNumber" */ "../views/MonthNumber.vue")
  },
  // 工厂分布
  {
    path: "/factoryDistribute",
    name: "FactoryDistribute",
    component: () =>
      import(
        /* webpackChunkName: "factoryDistribute" */ "../views/FactoryDistribute.vue"
      )
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
