<template>
	<a-config-provider :locale="locale">
		<router-view />
	</a-config-provider>
</template>

<script lang="ts">
	import { defineComponent, computed, provide } from "vue";
	import { useStore } from "vuex";

	export default defineComponent({
		setup() {
			const store = useStore(),
				locale = computed(() => store.state.app.locale);

			return { locale };
		},
	});
</script>

<style lang="scss"></style>
