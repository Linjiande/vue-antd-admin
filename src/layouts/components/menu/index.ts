import { Menu, MenuItem } from "@/models/menu/menu";

// 根据路由匹配菜单
export function menu(
	url: string,
	menus: Array<MenuItem>,
	config: Menu,
	collapsed: boolean
): boolean | undefined {
	for (const m of menus) {
		if (m.children) {
			const result = menu(url, m.children, config, collapsed);
			if (result) {
				/**
				 * 利用集合特性去重基础变量
				 * config.openKeys.push(m.path);
				 * config.openKeys = Array.from(new Set(config.openKeys));
				 */
				if (
					!collapsed &&
					!config.openKeys.find((item: string) => item === m.path)
				) {
					config.openKeys.push(m.path);
				}
				return true;
			}
		} else if (m.path && url === m.path) {
			config.selectedKeys = [m.path];
			return true;
		}
	}
}
