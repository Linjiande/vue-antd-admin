const user = {
	namespaced: true,
	actions: {
		async login({ commit }: any, payload: any) {},
	},
	mutations: {
		setUserInfo(state: any, userInfo: object) {
			state.userInfo = userInfo;
		},
	},
	state: () => ({
		userInfo: {},
	}),
};
export default user;
