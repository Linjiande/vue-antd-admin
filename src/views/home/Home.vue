<template>
	<div class="home">
		<a-descriptions layout="vertical" bordered :column="state.points.length">
			<template #title>
				概况
			</template>
			<template #extra>
				<a-radio-group
					v-model:value="state.period.current"
					@click="e => periodHandle(e.target.value, setHandle)"
				>
					<a-radio-button
						v-for="p in state.period.options"
						:key="p.key"
						:value="p.key"
					>
						{{ p.value }}
					</a-radio-button>
				</a-radio-group>
			</template>
			<a-descriptions-item
				v-for="p in state.points"
				:key="p.key"
				:label="p.label"
			>
				{{ p.value }}
			</a-descriptions-item>
		</a-descriptions>
		<a-divider />
		<div id="homeChart" />
	</div>
</template>
<script lang="ts">
	import {
		defineComponent,
		reactive,
		UnwrapRef,
		onMounted,
		watchEffect,
	} from "vue";

	// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
	import * as echarts from "echarts/core";
	// 系列类型的定义后缀都为 SeriesOption
	import {
		BarChart,
		BarSeriesOption,
		LineChart,
		LineSeriesOption,
	} from "echarts/charts";
	// 组件类型的定义后缀都为 ComponentOption
	import {
		TitleComponent,
		TitleComponentOption,
		TooltipComponent,
		TooltipComponentOption,
		GridComponent,
		GridComponentOption,
	} from "echarts/components";
	// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
	import { CanvasRenderer } from "echarts/renderers";

	import random from "@/utils/random";

	export default defineComponent({
		name: "Home",
		setup() {
			// 单选周期操作
			function periodHandle(
				current: string,
				request: (params: number) => void
			) {
				if (!current) return;
				let params = 7;
				switch (current) {
					case "today":
						params = 1;
						break;
					case "week":
						params = 7;
						break;
					case "month":
						params = 30;
						break;
					default:
						break;
				}
				request(params);
			}

			// 注册必须的组件
			echarts.use([
				BarChart,
				LineChart,
				TitleComponent,
				TooltipComponent,
				GridComponent,
				CanvasRenderer,
			]);

			// 周期类型
			type Period = {
				current: string;
				options: { key: string; value: string }[];
			};

			// 概况类型
			type Points = { key: string; label: string; value: number }[];

			// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
			type Options = echarts.ComposeOption<
				| BarSeriesOption
				| LineSeriesOption
				| TitleComponentOption
				| TooltipComponentOption
				| GridComponentOption
			>;

			// 响应式数据
			const state: UnwrapRef<{
				period: Period; // 周期
				points: Points; // 概况
				options: Options; // 图标参数
			}> = reactive({
				// 周期
				period: {
					current: "week",
					options: [
						{ key: "today", value: "今日" },
						{ key: "week", value: "周" },
						{ key: "month", value: "月" },
					],
				},
				// 概况
				points: [
					{ key: "sum", label: "金额", value: random([500, 1000]) },
					{ key: "UserCount", label: "用户数量", value: random([500, 1000]) },
					{ key: "openCount", label: "打开次数", value: random([500, 1000]) },
					{ key: "visitCount", label: "浏览次数", value: random([500, 1000]) },
					{
						key: "meanTime",
						label: "评价浏览时间（分钟）",
						value: random([500, 1000]),
					},
					{ key: "bounceRate", label: "成交率", value: random([500, 1000]) },
				],
				// 图标参数
				options: {
					title: {
						text: "销售总趋势图",
						textStyle: {
							fontSize: 16,
						},
						// subtext: "Sub Title",
						// left: "center",
					},
					tooltip: { show: true },
					legend: {
						data: ["销量"],
					},
					xAxis: {
						name: "日期",
						data: [],
					},
					yAxis: {
						type: "value",
						show: true,
					},
					series: {
						name: "销量",
						type: "line",
						label: {
							show: true,
							position: "top",
						},
						data: [],
					},
				},
			});

			// 挂载后
			onMounted(() => {
				//需要获取到element,所以是onMounted的Hook
				const chart: echarts.ECharts = echarts.init(
					document.getElementById("homeChart")!
				);
				// 初始化
				periodHandle(state.period.current, setHandle);
				// 绘制图表
				watchEffect(
					() => {
						const options = state.options;
						chart.showLoading();
						setTimeout(() => {
							chart.setOption(options);
							chart.hideLoading();
						}, 1500);
					},
					{ flush: "sync" }
				);
			});

			// 模拟数据
			function setHandle(params: number) {
				const xAxisData: any[] = [],
					seriesData: any[] = [];
				for (let i = 1; i <= params; i++) {
					xAxisData.push(`${i}日`);
					seriesData.push(Math.floor(Math.random() * 1000));
				}
				state.options = {
					...state.options,
					xAxis: {
						...state.options.xAxis,
						data: xAxisData,
					},
					series: {
						...state.options.series,
						data: seriesData,
					},
				};
				state.points.forEach(p => {
					p.value = random([500, 1000]);
				});
			}

			return {
				state,
				periodHandle,
				setHandle,
			};
		},
	});
</script>
<style scoped lang="scss">
	.home {
		#homeChart {
			display: flex;
			justify-content: center;
			text-align: center;
			width: 100%;
			height: 400px;
		}
	}
</style>
