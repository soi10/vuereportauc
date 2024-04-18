import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import StatusAuc from "../views/StatusAuc.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
