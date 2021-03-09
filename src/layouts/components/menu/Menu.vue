<template>
	<a-menu
		mode="inline"
		theme="dark"
		v-model:selectedKeys="config.selectedKeys"
		v-model:openKeys="config.openKeys"
		:inline-collapsed="collapsed"
	>
		<template v-for="menu in config.menus" :key="menu.path">
			<template v-if="!menu.children">
				<a-menu-item :key="menu.path" :title="menu.name">
					<span class="anticon">
						<i :class="'ri-' + menu.icon" aria-hidden="true" />
					</span>
					<span>{{ menu.name }}</span>
					<router-link :to="menu.path" />
				</a-menu-item>
			</template>
			<template v-else>
				<SubMenu :menus="menu" :key="menu.path" :collapsed="collapsed" />
			</template>
		</template>
	</a-menu>
</template>

<script lang="ts">
	import { defineComponent, computed, reactive, UnwrapRef, watch } from "vue";
	import { useStore } from "vuex";
	import { useRoute } from "vue-router";
	import { menu } from "./index";
	import { Menu } from "@/models/menu/menu";
	import SubMenu from "./components/SubMenu.vue";

	export default defineComponent({
		name: "Menu",
		props: {
			collapsed: {
				type: Boolean,
				default: false,
			},
		},
		components: {
			SubMenu,
		},
		setup(props) {
			const store = useStore(),
				menus = computed(() => store.state.menus.menus),
				config: UnwrapRef<Menu> = reactive(new Menu(menus.value)),
				route = useRoute();

			// 监听路由变化
			watch(
				() => route.path,
				() => menu(route.path, config.menus, config, props.collapsed),
				{ immediate: true }
			);

			return { config };
		},
	});
</script>

<style lang="scss" scoped>
	[class^="ri"] {
		font-size: 18px;
		vertical-align: -2.5px;
		margin-right: 10px;
	}
</style>
