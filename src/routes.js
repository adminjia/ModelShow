import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/main",
    name: "Main",
    component: MainPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 全局前置守卫：检查登录状态
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const username = Cookies.get("login_username");
    const password = Cookies.get("login_password");
    if (username && password) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;