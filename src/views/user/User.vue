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
				<a-button
					type="primary"
					@click="modal.config.open('visible', '添加用户')"
				>
					添加用户
				</a-button>
			</div>
		</template>
		<template #handle="{ record }">
			<a @click="handleEdit(record)">
				<i class="ri-edit-line"></i>
				编辑
			</a>
			<a-divider type="vertical" />
			<a @click="handleDetails(record)">
				<i class="ri-eye-line"></i>
				详情
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
</template>
<script lang="ts">
	import { defineComponent, ref, reactive, UnwrapRef } from "vue";
	import Modal from "./components/modal/Modal.vue";
	import { Table, RowSelection } from "@/models/table/table";
	import Filtration from "@/components/filtration/Filtration.vue";
	import {
		url,
		columns,
		handleEdit,
		handleDelete,
		handleDetails,
	} from "./index";

	const formItem = [
		{ key: "account", type: "input", label: "账号", placeholder: "请输入账号" },
		{
			key: "section",
			type: "select",
			label: "部门",
			placeholder: "请选择部门",
		},
	];

	export default defineComponent({
		name: "User",
		components: { Modal, Filtration },
		setup() {
			const config: UnwrapRef<Table> = reactive(
					new Table(columns, {
						rowSelection: new RowSelection(),
					})
				),
				filtration = ref(),
				modal = ref();

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
