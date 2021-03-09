import { MenuItem } from "@/models/menu/menu";

const menus = {
	namespaced: true,
	mutations: {
		setMenus(state: any, payload: any) {
			state.menus = payload;
		},
	},
	state: () => ({
		menus: [
			new MenuItem("首页", "/", { icon: "home-line" }),
			new MenuItem("数据字典", "/dict", { icon: "book-mark-line" }),
			new MenuItem("用户管理", "/userManage", {
				icon: "user-3-line",
				children: [new MenuItem("用户列表", "/userManage/userList")],
			}),
			new MenuItem("角色管理", "/roleManage", {
				icon: "shield-user-line",
				children: [new MenuItem("角色管理", "/roleManage/roleList")],
			}),
		],
	}),
};
export default menus;
