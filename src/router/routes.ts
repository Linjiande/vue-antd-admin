import { RouteRecordRaw } from "vue-router";

// 动态加载组件
const RouterView = () => import("@/App.vue");
const MainLayouts = () => import("@/layouts/MainLayouts.vue");
const Login = () => import("@/views/sys/login/Login.vue");
const Home = () => import("@/views/home/Home.vue");
const Dict = () => import("@/views/dict/Dict.vue");
const User = () => import("@/views/user/User.vue");
const Role = () => import("@/views/role/Role.vue");

// 路由
const routes: RouteRecordRaw[] = (() => {
	const main: RouteRecordRaw[] = [
		{
			path: "/",
			// meta: { auth: true },
			component: MainLayouts,
			children: [
				{
					path: "",
					component: Home,
				},
				{
					path: "/dict",
					component: Dict,
				},
				{
					path: "userManage",
					component: RouterView,
					redirect: "/userManage/userList",
					children: [
						{
							path: "userList",
							component: User,
						},
					],
				},
				{
					path: "roleManage",
					component: RouterView,
					redirect: "/roleManage/roleList",
					children: [
						{
							path: "roleList",
							component: Role,
						},
					],
				},
			],
		},
		{
			path: "/login",
			component: Login,
		},
	];

	return main;
})();

export default routes;
