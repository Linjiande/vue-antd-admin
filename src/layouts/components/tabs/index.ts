import { MenuItem } from "@/models/menu/menu";
import { Tabs, TabPane } from "@/models/tabs/tabs";
import { Router } from "vue-router";

export function tabs(
	url: string,
	menus: MenuItem[],
	panes: TabPane[],
	tabsConfig: Tabs
): boolean | undefined {
	for (const m of menus) {
		if (m.children) {
			const result = tabs(url, m.children, panes, tabsConfig);
			if (result) {
				return true;
			}
		} else if (m.path && url === m.path) {
			tabsConfig.activeKey = url;
			if (!panes.find(panes => panes.key === url)) {
				panes.push(new TabPane(m.path, m.name));
			}
			return true;
		}
	}
}

// 点击tabs
export function tabClick(path: string, router: Router) {
	router.push(path);
}

// 关闭tabs
export function close(
	targetKey: string,
	activeKey: string,
	panes: TabPane[],
	router: Router
) {
	panes.splice(
		panes.findIndex(pane => pane.key === targetKey),
		1
	);
	if (targetKey === activeKey) {
		tabClick(panes[panes.length - 1].key, router);
	}
}
