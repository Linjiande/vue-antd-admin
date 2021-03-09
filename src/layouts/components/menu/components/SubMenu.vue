<template>
	<a-sub-menu v-bind="$attrs">
		<template #title>
			<span class="anticon">
				<i v-if="menus.icon" :class="'ri-' + menus.icon" aria-hidden="true" />
			</span>
			<span>{{ menus.name }}</span>
		</template>
		<template v-for="child in menus.children" :key="child.path">
			<template v-if="!child.children">
				<a-menu-item :key="child.path" :title="child.name">
					<span class="anticon">
						<i
							v-if="menus.icon"
							:class="'ri-' + child.icon"
							aria-hidden="true"
						/>
					</span>
					<span>{{ child.name }}</span>
					<router-link :to="child.path" />
				</a-menu-item>
			</template>
			<template v-else>
				<SubMenu :menus="child" :key="child.path" :collapsed="collapsed" />
			</template>
		</template>
	</a-sub-menu>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "SubMenu",
		props: {
			menus: {
				type: Object,
				required: true,
				default: () => ({}),
			},
			collapsed: {
				type: Boolean,
				required: true,
			},
		},
	});
</script>

<style lang="scss" scoped>
	[class*="ri"] {
		font-size: 18px;
		vertical-align: -2.5px;
		margin-right: 10px;
	}
</style>
