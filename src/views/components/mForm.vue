<template>
	<div class="mvi-p-8">
		<m-row align="center" class="mvi-mb-5">
			<m-col :md="{span:3}" :sm="{span:4}" class="mvi-font-h6">姓名：</m-col>
			<m-col :md="{span:6}" :sm="{span:10}">
				<m-field v-model.trim="name" placeholder="输入姓名..."></m-field>
			</m-col>
		</m-row>
		<m-row align="center" class="mvi-mb-5">
			<m-col :md="{span:3}" :sm="{span:4}" class="mvi-font-h6">出生日期：</m-col>
			<m-col :md="{span:6}" :sm="{span:10}">
				<m-date-chooser v-model="birth" block>
					<m-field :value="birth.toLocaleString()" readonly placeholder="选择日期..."></m-field>
				</m-date-chooser>
			</m-col>
		</m-row>
		<m-row align="center" class="mvi-mb-5">
			<m-col :md="{span:3}" :sm="{span:4}" class="mvi-font-h6">国籍：</m-col>
			<m-col :md="{span:6}" :sm="{span:10}">
				<m-select v-model="country" placeholder="请选择" height="6rem" :options="countries"></m-select>
			</m-col>
		</m-row>
		<m-row align="center" class="mvi-mb-5">
			<m-col :md="{span:3}" :sm="{span:4}" class="mvi-font-h6">性别：</m-col>
			<m-col :md="{span:6}" :sm="{span:10}">
				<m-radio class="mvi-m-2" v-model="gender" :value="0" label="男" :fill-color="$store.getters.theme.themeColor"></m-radio>
				<m-radio class="mvi-m-2" :value="1" v-model="gender" label="女" :fill-color="$store.getters.theme.themeColor"></m-radio>
			</m-col>
		</m-row>
		<m-row align="center" class="mvi-mb-10">
			<m-col :md="{span:3}" :sm="{span:4}" class="mvi-font-h6">兴趣爱好：</m-col>
			<m-col :md="{span:21}" :sm="{span:18}">
				<m-checkbox v-model="likes" v-for="(item,index) in likesArray" :key="'like-'+index" :label="item.label" 
				:value="item.value" class="mvi-m-2" :fill-color="$store.getters.theme.themeColor"></m-checkbox>
			</m-col>
		</m-row>
		<m-row align="center" class="mvi-mb-5">
			<m-col>
				<m-button :color="$store.getters.theme.themeColor" :sub-color="$store.getters.theme.themeTextColor">确认提交</m-button>
			</m-col>
		</m-row>
	</div>
</template>

<script>
	export default {
		name:'mForm',
		data(){
			return {
				name:'',
				birth:new Date(),
				likes:[],
				likesArray:[{
					label:'打篮球',
					value:0
				},{
					label:'踢足球',
					value:1
				},{
					label:'羽毛球',
					value:2
				},{
					label:'乒乓球',
					value:3
				},{
					label:'看电影',
					value:4
				},{
					label:'写小说',
					value:5
				}],
				gender:0,
				country:0,
				countries:[
					{
						label:'中国',
						value:0
					},
					{
						label:'美国',
						value:1
					},
					{
						label:'柬埔寨',
						value:2
					},
					{
						label:'日本',
						value:3
					},
					{
						label:'韩国',
						value:4
					},
					{
						label:'越南',
						value:5
					},
					{
						label:'俄罗斯',
						value:6
					},
					{
						label:'英国',
						value:7
					},
					{
						label:'法国',
						value:8
					},
					{
						label:'意大利',
						value:9
					},
				]
			}
		}
	}
</script>

<style>
</style>
