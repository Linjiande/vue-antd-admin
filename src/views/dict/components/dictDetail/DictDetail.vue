<template>
	<a-modal
		v-bind="modalConfig"
		@ok="modalConfig.ok()"
		@cancel="modalConfig.cancel()"
	>
		<a-table
			v-bind="tableConfig"
			@change="
				(...args) =>
					tableConfig.change.call(
						tableConfig,
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
					:tableConfig="tableConfig"
					:formItem="formItem"
				/>
				<div class="handle">
					<a-button
						type="primary"
						@click="modal.tableConfig.open('visible', '添加')"
					>
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
	</a-modal>
	<Modal ref="modal" />
</template>
<script lang="ts">
	import { defineComponent, ref, reactive, UnwrapRef } from "vue";
	import { Modal as M } from "@/models/modal/modal";
	import Modal from "./components/modal/Modal.vue";
	import { Table, RowSelection } from "@/models/table/table";
	import Filtration from "@/components/filtration/Filtration.vue";
	import { url, columns, handleEdit, handleDelete } from "./index";

	const formItem = [
		{
			key: "name",
			type: "input",
			label: "名称",
			placeholder: "请输入名称",
		},
		{
			key: "status",
			type: "select",
			label: "状态",
			placeholder: "请选择状态",
		},
	];

	export default defineComponent({
		name: "DictDetail",
		components: { Modal, Filtration },
		setup() {
			const modalConfig: UnwrapRef<M> = reactive(new M()),
				tableConfig: UnwrapRef<Table> = reactive(
					new Table(columns, {
						rowSelection: new RowSelection(),
					})
				),
				filtration = ref(),
				modal = ref();

			return {
				url,
				modalConfig,
				tableConfig,
				filtration,
				modal,
				formItem,
				handleEdit,
				handleDelete,
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
