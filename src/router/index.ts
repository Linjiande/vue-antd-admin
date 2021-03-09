import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import routes from "./routes";

const Routes: RouteRecordRaw[] = routes;

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: Routes,
});

// router.beforeEach(async (to, from, next) => {
//   // 验证当前路由所有的匹配中是否需要有登录验证的
//   if (to.matched.some((r) => r.meta.auth)) {
//     // 这里暂时将localstorage里是否存有userInfo作为验证是否登录的条件
//     // 请根据自身业务需要修改
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo && userInfo !== "undefined") {
//       next();
//     } else {
//       // 没有登录的时候跳转到登录界面
//       // 携带上登陆成功之后需要跳转的页面完整路径
//       next({ name: "login", query: { redirect: to.fullPath } });
//     }
//   } else {
//     // 不需要身份校验 直接通过
//     next();
//   }
// });

export default router;
