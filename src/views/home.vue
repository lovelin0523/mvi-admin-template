<template>
	<div>
		<m-row>
			<m-col :sm="6" class="mvi-px-2">
				<m-panel title="今日订单量">
					<div class="app-data-title">57892</div>
					<template v-slot:footer>
						<router-link tag="div" to="/">
							<span>查看详情</span>
							<m-icon class="mvi-ml-1" type='angle-right' />
						</router-link>
					</template>
				</m-panel>
			</m-col>
			<m-col :sm="6" class="mvi-px-2">
				<m-panel title="昨日订单量">
					<div class="app-data-title">57892</div>
					<template v-slot:footer>
						<router-link tag="div" to="/">
							<span>查看详情</span>
							<m-icon class="mvi-ml-1" type='angle-right' />
						</router-link>
					</template>
				</m-panel>
			</m-col>
			<m-col :sm="6" class="mvi-px-2">
				<m-panel title="今日销售额">
					<div class="app-data-title">￥333212</div>
					<template v-slot:footer>
						<router-link tag="div" to="/">
							<span>查看详情</span>
							<m-icon class="mvi-ml-1" type='angle-right' />
						</router-link>
					</template>
				</m-panel>
			</m-col>
			<m-col :sm="6" class="mvi-px-2">
				<m-panel title="昨日销售额">
					<div class="app-data-title">￥293822</div>
					<template v-slot:footer>
						<router-link tag="div" to="/">
							<span>查看详情</span>
							<m-icon class="mvi-ml-1" type='angle-right' />
						</router-link>
					</template>
				</m-panel>
			</m-col>
		</m-row>
		<div class="mvi-text-center mvi-my-10">页面只是示例，实际使用时结合产品功能需求开发</div>
	</div>
</template>

<script>
	export default {
		name:'home'
	}
</script>

<style scoped lang="less">
	.app-data-title{
		font-size: .6rem;
		color: #505050;
		text-align: center;
	}
</style>
