import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import setupAntd from "@/components/antd";
import "remixicon/fonts/remixicon.css";
// 引入mock数据，不需要时，则注释掉
import "@/mock";

const app = createApp(App);

setupAntd(app)
	.use(store)
	.use(router)
	.mount("#app");
