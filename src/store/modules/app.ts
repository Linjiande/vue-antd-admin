import zhCN from "ant-design-vue/es/locale/zh_CN";

const app = {
	namespaced: true,
	mutations: {
		setLocale(state: any, payload: any) {
			state.locale = payload;
		},
	},
	state: () => ({
		locale: zhCN,
	}),
};
export default app;
