<template>
	<div class="login">
		<div class="login-mask" />
		<div class="login-form-wrap">
			<div class="login-form mx-6">
				<div class="login-form__content px-2 py-10">
					<header>
						<img src="../../../assets/logo.png" class="mr-4" />
						<h1>{{ title }}</h1>
					</header>

					<a-form
						class="mx-auto mt-10"
						:model="formData"
						:rules="formRules"
						ref="formRef"
					>
						<a-form-item name="username">
							<a-input
								size="large"
								v-model:value="formData.username"
								placeholder="请输入用户名"
							/>
						</a-form-item>
						<a-form-item name="password">
							<a-input-password
								size="large"
								visibilityToggle
								v-model:value="formData.password"
								placeholder="请输入密码"
							/>
						</a-form-item>

						<!-- <a-form-item name="verify" v-if="openLoginVerify">
              <BasicDragVerify v-model:value="formData.verify" ref="verifyRef" />
            </a-form-item> -->
						<a-row>
							<a-col :span="12">
								<a-form-item>
									<!-- No logic, you need to deal with it yourself -->
									<a-checkbox v-model:checked="autoLogin" size="small"
										>自动登录</a-checkbox
									>
								</a-form-item>
							</a-col>
							<a-col :span="12">
								<a-form-item :style="{ 'text-align': 'right' }">
									<!-- No logic, you need to deal with it yourself -->
									<a-button type="link" size="small">忘记密码</a-button>
								</a-form-item>
							</a-col>
						</a-row>
						<a-form-item>
							<a-button
								type="primary"
								size="large"
								class="rounded-sm"
								:block="true"
								@click="handleLogin"
								:loading="formState.loading"
								>登录</a-button
							>
						</a-form-item>
					</a-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import {
		defineComponent,
		reactive,
		ref,
		unref,
		getCurrentInstance,
	} from "vue";
	import { Store, useStore } from "vuex";
	import router from "@/router";

	export default defineComponent({
		setup() {
			const formRef = ref<any>(null);
			const autoLoginRef = ref(false);

			const formData = reactive({
				username: "测试",
				password: "123456",
			});

			const formState = reactive({
				loading: false,
			});

			const formRules = reactive({
				username: [
					{
						required: true,
						message: "请输入用户名",
						trigger: "blur",
					},
				],
				password: [
					{
						required: true,
						message: "请输入密码",
						trigger: "blur",
					},
				],
			});

			const { ctx }: any = getCurrentInstance();

			const store: Store<any> = useStore();
			async function handleLogin() {
				const form = unref(formRef);
				if (!form) return;
				formState.loading = true;
				try {
					const data = await form.validate();
					const res = await store.dispatch("user/login", data);
					if (res) {
						router.replace(
							ctx.$router.currentRoute.value.query.redirect || "/"
						);
					}
					// eslint-disable-next-line no-empty
				} catch (error) {
				} finally {
					formState.loading = false;
				}
			}
			return {
				formRef,
				formData,
				formState,
				formRules,
				handleLogin,
				autoLogin: autoLoginRef,
				title: "花样漳州后台",
			};
		},
	});
</script>
<style lang="less">
	.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}
	.mt-10 {
		margin-top: 40px;
	}
	.login-form__locale {
		position: absolute;
		top: 14px;
		right: 14px;
		z-index: 1;
	}

	.login {
		position: relative;
		height: 100vh;
		background: url(../../../assets/images/login/login-bg.png) no-repeat;
		background-size: 100% 100%;

		&-mask {
			height: 100%;
			background: url(../../../assets/images/login/login-in.png) no-repeat;
			background-position: 30% 30%;
			background-size: 80% 80%;
			display: block;
		}

		&-form {
			position: relative;
			bottom: 60px;
			width: 400px;
			background: #fff;
			border: 10px solid rgba(255, 255, 255, 0.5);
			border-width: 8px;
			border-radius: 4px;
			background-clip: padding-box;
			margin: 0 120px 0 50px;

			.ant-col {
				width: 100%;
			}

			&-wrap {
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				width: 100%;
				height: 100%;
				// height: 90%;
				align-items: center;
				justify-content: flex-end;
			}

			&__content {
				position: relative;
				width: 100%;
				height: 100%;
				padding: 40px 0;
				border: 1px solid #999;
				border-radius: 2px;

				header {
					display: flex;
					justify-content: center;
					align-items: center;

					img {
						display: inline-block;
						width: 48px;
					}

					h1 {
						margin-bottom: 0;
						font-size: 24px;
						text-align: center;
					}
				}

				form {
					width: 80%;
				}
			}
		}
	}
</style>
