<template>
	<div id="app">
		<sidebar :expand.sync="expand" ref="sidebar" v-if="!$route.meta.free"></sidebar>
		<div class="app-main">
			<topbar :expand.sync="expand" v-if="!$route.meta.free" @refresh="refresh"></topbar>
			<keep-alive :include="$store.getters.cachePages">
				<router-view class="app-main_body"></router-view>
			</keep-alive>
		</div>
	</div>
</template>
<script>
	import sidebar from "./components/sidebar.vue"
	import topbar from "./components/topbar.vue"
	export default {
		name:'app',
		data(){
			return {
				expand:true,//侧边栏是否展开
				viewKey:0,//路由视图key值
			}
		},
		components:{
			sidebar,topbar
		},
		methods:{
			//刷新事件
			refresh(){
				this.$router.replace({
					path:'/reload',
					query:{
						redirect:this.$route.fullPath
					}
				})
			}
		}
	}
</script>
<style lang="less">
	html{
		font-size: 40px;
	}
	
	@media only screen and (min-width: 1440px){
		html{
			font-size: 50px;
		}
	}
	
	
	#app{
		display: flex;
		justify-content: flex-start;
		overflow-x: hidden;
		overflow-y: auto;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.app-main{
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		flex: 1;
		width: 100%;
		height: 100%;
		position: relative;
		
		.app-main_body{
			display: block;
			width: 100%;
			position: relative;
			overflow-x: hidden;
			overflow-y: auto;
			flex: 1;
			background-color: #fbfbfb;
			padding: .2rem;
		}
	}
	
	::-webkit-scrollbar{
		width: 0.16rem;
		height: 0.16rem;
	}
	
	::-webkit-scrollbar-track{
	  background: #f1f1f1;
	  border-radius:0.12rem;
	}
	
	::-webkit-scrollbar-thumb{
	  background: #ddd;
	  border-radius:0.12rem;
	}
</style>
