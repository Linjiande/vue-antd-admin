<template>
	<div class="flex">
		<div class="hoverAction">
			<a-dropdown placement="bottomCenter">
				<span class="user">
					<a-avatar
						:src="
							`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`
						"
					/>
					{{ userInfo.username }}
				</span>
				<template #overlay>
					<a-menu @click="userClick">
						<a-menu-item key="个人中心">
							<router-link to="">
								<i class="ri-user-line"></i>
								个人中心
							</router-link>
						</a-menu-item>
						<a-menu-item key="个人设置">
							<router-link to="">
								<i class="ri-settings-2-line"></i>
								个人设置
							</router-link>
						</a-menu-item>
						<a-menu-item key="退出登录">
							<router-link to="/login">
								<i class="ri-logout-circle-r-line"></i>
								退出登录
							</router-link>
						</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</div>
		<div class="hoverAction">
			<a-badge :count="6" :offset="[2, -2]">
				<i class="ri-notification-4-line" />
			</a-badge>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, computed } from "vue";
	import { useStore } from "vuex";
	import storage from "@/utils/storage";

	export default defineComponent({
		name: "UserInfo",
		setup() {
			const store = useStore();
			const userInfo = computed(() => store.state.user.userInfo);

			function userClick({ key }: any) {
				switch (key) {
					case "个人中心":
						console.log("个人中心");
						break;
					case "个人设置":
						console.log("个人设置");
						break;
					case "退出登录":
						store.commit("user/setUserInfo", {});
						storage("localstorage").remove("userInfo");
						break;
				}
			}

			return { userInfo, userClick };
		},
	});
</script>

<style lang="scss" scoped>
	.flex {
		display: flex;
		flex-direction: row-reverse;
		.hoverAction {
			padding: 0 12px;

			&:hover {
				background-color: #f5f5f5bf;
			}

			.ri-notification-4-line {
				vertical-align: -6px;
				font-size: 18px;
			}

			.user {
				display: inline-block;
				padding-right: 10px;
			}

			.ri-user-line,
			.ri-settings-2-line,
			.ri-logout-circle-r-line {
				vertical-align: -2.5px;
				margin-right: 3px;
			}
		}
	}
</style>
