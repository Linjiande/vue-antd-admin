<template>
	<a-modal v-bind="config" @ok="config.ok()" @cancel="config.cancel()">
		<a-form v-bind="fConfig" ref="userForm">
			<a-form-item
				v-for="column in tatbleColumns"
				:key="column.key"
				:label="column.title"
				:name="column.key"
			>
				<a-input v-model:value="fConfig.model[column.key]" />
			</a-form-item>
		</a-form>
	</a-modal>
	<div></div>
</template>
<script lang="ts">
	import { defineComponent, reactive, UnwrapRef } from "vue";
	import { Modal } from "@/models/modal/modal";
	import { Form } from "@/models/form/form";

	const tatbleColumns: any[] = [];

	export default defineComponent({
		name: "Modal",
		setup() {
			const config: UnwrapRef<Modal> = reactive(new Modal()),
				fConfig: UnwrapRef<Form> = reactive(new Form());

			return { config, fConfig, tatbleColumns };
		},
	});
</script>
<style scoped lang="scss"></style>
