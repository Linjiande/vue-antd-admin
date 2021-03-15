<template>
	<a-form v-bind="tableHeadFormConfig">
		<a-form-item v-for="item in unfoldInfo.items" v-bind="item" :key="item.key">
			<a-input
				v-if="item.types === 'input'"
				v-model:value="tableHeadFormConfig.model[item.key]"
				:placeholder="item.placeholder"
			></a-input>
			<a-select
				v-else-if="item.types === 'select'"
				v-model:value="tableHeadFormConfig.model[item.key]"
				:placeholder="item.placeholder"
			></a-select>
		</a-form-item>
		<a-form-item>
			<a-button
				type="primary"
				@click="
					tableHeadFormConfig.submit.call(tableHeadFormConfig, url, tableConfig)
				"
				>搜索</a-button
			>
			<span style="margin:0 5px"></span>
			<a-button
				@click="
					tableHeadFormConfig.reset.call(tableHeadFormConfig, url, tableConfig)
				"
				>重置</a-button
			>
		</a-form-item>
		<a-form-item v-if="formItem.length > max" @click="unfold(formItem)">
			<a v-if="unfoldInfo.isUnfold">点击收起 <UpOutlined /></a>
			<a v-else>点击展开 <DownOutlined /></a>
		</a-form-item>
	</a-form>
</template>
<script lang="ts">
	import { defineComponent, reactive, UnwrapRef } from "vue";
	import { TableHeadForm, FormItem } from "./index";
	import { Table } from "@/models/table/table";
	import { UpOutlined, DownOutlined } from "@ant-design/icons-vue";

	export default defineComponent({
		name: "Filtration",
		components: {
			UpOutlined,
			DownOutlined,
		},
		props: {
			url: { type: String, required: true },
			tableConfig: { type: Table, required: true },
			formItem: { type: Array, required: true },
			max: { type: Number, default: 3 },
		},
		setup(props) {
			const tableHeadFormConfig = reactive(new TableHeadForm()),
				unfoldInfo: UnwrapRef<{
					isUnfold: boolean;
					items: any[];
				}> = reactive({
					isUnfold: true,
					items: [],
				});

			function unfold(formItem: FormItem[]) {
				unfoldInfo.isUnfold = !unfoldInfo.isUnfold;
				if (unfoldInfo.isUnfold) {
					unfoldInfo.items = formItem;
				} else {
					unfoldInfo.items =
						formItem.length > props.max
							? props.formItem.slice(0, props.max)
							: formItem;
				}
			}

			unfold(props.formItem as FormItem[]);

			return { tableHeadFormConfig, unfoldInfo, unfold };
		},
	});
</script>
<style scoped lang="scss"></style>
