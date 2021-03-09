<template>
	<a-tabs
		v-bind="tabsConfig"
		@change="tabClick($event, router)"
		@edit="close($event, tabsConfig.activeKey, panes, router)"
	>
		<a-tab-pane
			v-for="pane in panes"
			:key="pane.key"
			:tab="pane.tab"
			:closable="pane.closable"
		/>
	</a-tabs>
</template>
<script lang="ts">
	import {
		defineComponent,
		reactive,
		computed,
		toRaw,
		UnwrapRef,
		onUnmounted,
		watch,
	} from "vue";
	import { useRouter, useRoute } from "vue-router";
	import { useStore } from "vuex";
	import { Tabs, TabPane } from "@/models/tabs/tabs";
	import { tabs, tabClick, close } from "./index";
	import storage from "@/utils/storage";

	export default defineComponent({
		name: "Tabs",
		setup() {
			const tabsConfig: UnwrapRef<Tabs> = reactive<Tabs>(
					new Tabs("/", {
						type: "editable-card",
						hideAdd: true,
						tabBarGutter: 3,
					})
				),
				router = useRouter(),
				route = useRoute(),
				store = useStore(),
				menus = computed(() => store.state.menus.menus),
				st = storage("session");

			let panes: UnwrapRef<TabPane[]> = reactive([
				new TabPane("/", "首页", { closable: false }),
			]);

			// 刷新完成将sessionStorage存回panes
			if (st.get("panes")) {
				panes = reactive(JSON.parse(st.get("panes")));
			}

			// 监听刷新事件 刷新页面时将panes里的数据存进sessionStorage
			window.addEventListener("beforeunload", () => {
				st.set("panes", JSON.stringify(toRaw(panes)));
			});

			// 监听组件销毁 销毁页面时将panes里的数据存进sessionStorage
			onUnmounted(() => {
				st.set("panes", JSON.stringify(toRaw(panes)));
			});

			// 监听路由变化
			watch(
				() => route.path,
				() => tabs(route.path, menus.value, panes, tabsConfig),
				{ immediate: true }
			);

			return { tabsConfig, panes, tabClick, router, close };
		},
	});
</script>
<style scoped lang="scss"></style>
