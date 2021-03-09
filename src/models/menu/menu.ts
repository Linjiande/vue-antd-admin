import { baseClass } from "../base/config";
import { MenuOptions, MenuItemOptions } from "./type";

// 菜单
export class Menu extends baseClass implements MenuOptions {
	// 菜单
	menus: MenuItem[];

	constructor(menus: MenuItem[] = [], options?: MenuOptions) {
		super();
		this.menus = menus;
		options = {
			selectedKeys: [],
			openKeys: [],
			...options,
		};
		super.initOptions(options);
	}
}

// 菜单子项
export class MenuItem extends baseClass implements MenuItemOptions {
	// 菜单名称
	name: string;
	// 路由路径
	path: string;

	constructor(name: string, path: string, options?: MenuItemOptions) {
		super();
		this.name = name;
		this.path = path;
		options = { ...options };
		super.initOptions(options);
	}
}
