<template>
	<a-layout class="main">
		<a-layout-sider
			class="mainLeft"
			collapsible
			v-model:collapsed="collapsed.value"
			:trigger="null"
		>
			<router-link to="/">
				<div class="logo">
					<div class="img">
						<img src="../assets/logo.png" :width="28" :height="28" alt="logo" />
					</div>
					<div class="title" v-show="!collapsed.value">
						系统管理后台
					</div>
				</div>
			</router-link>

			<Menu class="menu" ref="menu" :collapsed="collapsed.value" />
		</a-layout-sider>
		<a-layout class="mainRight">
			<a-layout-header class="header">
				<a-row class="row">
					<a-col :span="10">
						<menu-unfold-outlined
							class="trigger"
							v-if="collapsed.value"
							@click="contract(collapsed, menu.config)"
						/>
						<menu-fold-outlined
							class="trigger"
							v-else
							@click="contract(collapsed, menu.config)"
						/>
						<Breadcrumb />
					</a-col>
					<a-col :offset="10" :span="4" class="headerRight">
						<UserInfo />
					</a-col>
				</a-row>
			</a-layout-header>
			<a-layout-content
				class="content"
				:class="collapsed.value ? 'contentMin' : 'contentMax'"
			>
				<Tabs />
				<router-view />
			</a-layout-content>
			<!--      <a-layout-footer class="footer">-->
			<!--        Ant Design ©2018 Created by Ant UED-->
			<!--      </a-layout-footer>-->
		</a-layout>
	</a-layout>
</template>

<script lang="ts">
	import { defineComponent, reactive, UnwrapRef, ref } from "vue";
	import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
	import { Bool } from "@/models/common/bool/bool";
	import { contract } from "./index";
	import Menu from "./components/menu/Menu.vue";
	import Breadcrumb from "./components/breadcrumb/Breadcrumb.vue";
	import UserInfo from "./components/userInfo/UserInfo.vue";
	import Tabs from "./components/tabs/Tabs.vue";

	export default defineComponent({
		name: "MainLayouts",
		components: {
			MenuUnfoldOutlined,
			MenuFoldOutlined,
			Menu,
			Breadcrumb,
			UserInfo,
			Tabs,
		},
		setup() {
			const collapsed: UnwrapRef<Bool> = reactive(new Bool()),
				menu = ref();

			return { collapsed, menu, contract };
		},
	});
</script>

<style lang="scss" scoped>
	//布局
	.main {
		min-height: 100vh;

		//侧边栏
		.mainLeft {
			height: 100vh;

			.logo {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 16px 24px;

				.img {
					width: 32px;
					text-align: center;
				}

				.title {
					min-width: 110px;
					overflow: hidden;
					margin-left: 8px;
					color: #fff;
					font-weight: 600;
					font-size: 18px;
				}
			}

			.menu {
				height: calc(100vh - 64px);
				overflow: auto;
				//取消显示滚动条
				//IE 10+
				-ms-overflow-style: none;
				//Firefox
				overflow: -moz-scrollbars-none;
			}

			//取消显示滚动条
			.menu::-webkit-scrollbar {
				width: 0 !important;
			}
		}

		//展示区
		.mainRight {
			height: 100vh;
			//头部
			.header {
				background: #fff;
				padding: 0;
				height: 48px;

				.row {
					height: 48px;
					line-height: 48px;
				}

				.trigger {
					font-size: 18px;
					line-height: 48px;
					padding: 0 24px;
					cursor: pointer;
					transition: color 0.3s;

					&:hover {
						color: #1890ff;
					}
				}

				.headerRight {
					text-align: right;
				}
			}

			//内容
			.content {
				margin: 8px;
				height: calc(100vh - 64px);
				padding: 8px;
				background: #fff;

				overflow: auto;
				//IE 10+
				-ms-overflow-style: none;
				//Firefox
				overflow: -moz-scrollbars-none;

				&.contentMax {
					width: calc(100vw - 216px);
				}

				&.contentMin {
					width: calc(100vw - 96px);
				}

				&::-webkit-scrollbar {
					width: 8px;
					height: 8px;
				}

				&::-webkit-scrollbar-thumb {
					/*滚动条里面小方块*/
					border-radius: 10px;
					box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
					background: #535353;
				}
				&::-webkit-scrollbar-track {
					/*滚动条里面轨道*/
					box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
					border-radius: 10px;
					background: #ededed;
				}
			}

			//底部
			.footer {
				text-align: center;
				padding: 16px 50px;
			}
		}
	}
</style>
