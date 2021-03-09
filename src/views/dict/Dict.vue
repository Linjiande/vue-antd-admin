<template>
	<a-table
		v-bind="config"
		@change="
			(...args) =>
				config.change.call(
					config,
					url,
					args,
					filtration.tableHeadFormConfig.model
				)
		"
	>
		<template #title>
			<Filtration
				ref="filtration"
				:url="url"
				:tableConfig="config"
				:formItem="formItem"
			/>
			<div class="handle">
				<a-button type="primary" @click="modal.config.open('visible', '添加')">
					添加
				</a-button>
			</div>
		</template>
		<template #handle="{ record }">
			<a @click="handleEdit(record)">
				<i class="ri-edit-line"></i>
				编辑
			</a>
			<a-divider type="vertical" />
			<a @click="dictDetail.modalConfig.open('visible', '字典配置')">
				<i class="ri-settings-4-line"></i>
				配置
			</a>
			<a-divider type="vertical" />
			<a-popconfirm
				title="确定删除吗?"
				ok-text="确定"
				cancel-text="取消"
				@confirm="handleDelete(record.id)"
			>
				<a>
					<i class="ri-delete-bin-line"></i>
					删除
				</a>
			</a-popconfirm>
		</template>
	</a-table>
	<Modal ref="modal" />
	<DictDetail ref="dictDetail" />
</template>
<script lang="ts">
	import { defineComponent, ref, reactive, UnwrapRef } from "vue";
	import Filtration from "@/components/filtration/Filtration.vue";
	import Modal from "./components/modal/Modal.vue";
	import DictDetail from "./components/dictDetail/DictDetail.vue";
	import { Table, RowSelection } from "@/models/table/table";
	import {
		url,
		columns,
		handleEdit,
		handleDelete,
		handleDetails,
	} from "./index";

	const formItem = [
		{
			key: "name",
			type: "input",
			label: "字典名称",
			placeholder: "请输入字典名称",
		},
		{
			key: "dictNo",
			type: "select",
			label: "字典编号",
			placeholder: "请输入字典编号",
		},
	];

	export default defineComponent({
		name: "Dict",
		components: { Filtration, Modal, DictDetail },
		setup() {
			const config: UnwrapRef<Table> = reactive(
					new Table(columns, {
						// rowSelection: new RowSelection(),
					})
				),
				filtration = ref(null),
				modal = ref(null),
				dictDetail = ref(null);

			// 初始化数据
			config.getData(url, {
				pageNo: config.pagination.current,
				pageSize: config.pagination.pageSize,
			});

			return {
				url,
				config,
				filtration,
				modal,
				dictDetail,
				formItem,
				handleEdit,
				handleDelete,
				handleDetails,
			};
		},
	});
</script>
<style scoped lang="scss">
	.handle {
		margin-top: 5px;
	}

	[class^="ri"] {
		vertical-align: -2px;
		margin-right: 3px;
	}
</style>
