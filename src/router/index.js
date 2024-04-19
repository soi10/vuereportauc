import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import StatusAuc from "../views/StatusAuc.vue";
import AllData from "../views/AllData.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/statusauc",
    name: "StatusAuc",
    component: StatusAuc,
  },
  {
    path: "/alldata",
    name: "AllData",
    component: AllData,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
