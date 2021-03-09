<template>
	<a-breadcrumb class="contentBreadcrumb">
		<a-breadcrumb-item v-for="c in crumbs" :key="c.path">
			<a-dropdown v-if="c.children">
				<a class="ant-dropdown-link">
					{{ c.name }}
					<i class="ri-arrow-down-s-line"></i>
				</a>
				<template #overlay>
					<a-menu>
						<a-menu-item
							v-for="cc in c.children"
							:key="cc.path"
							:disabled="cc.children?.length"
						>
							<router-link :to="cc.path">
								{{ cc.name }}
							</router-link>
						</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
			<span v-else>{{ c.name }}</span>
		</a-breadcrumb-item>
	</a-breadcrumb>
</template>

<script lang="ts">
	import { defineComponent, reactive, UnwrapRef, watch } from "vue";
	import { useStore } from "vuex";
	import { useRoute } from "vue-router";
	import { MenuItem } from "@/models/menu/menu";
	import { breadcrumb } from "./index";

	export default defineComponent({
		name: "Breadcrumb",
		setup() {
			const route = useRoute(),
				{ menus } = useStore().state.menus,
				crumbs: UnwrapRef<MenuItem[]> = reactive([]);

			// 监听路由变化
			watch(
				() => route.path,
				() => {
					crumbs.splice(0, crumbs.length);
					breadcrumb(route.path, menus, crumbs);
				},
				{ immediate: true }
			);

			return { crumbs };
		},
	});
</script>

<style lang="scss" scoped>
	.contentBreadcrumb {
		margin-left: 10px;
		display: inline;

		.ri-arrow-down-s-line {
			vertical-align: -2.5px;
		}
	}
</style>
