import { createStore } from "vuex";
import app from "./modules/app";
import menus from "./modules/menus";
import user from "./modules/user";

export default createStore({
	modules: {
		app,
		menus,
		user,
	},
});
