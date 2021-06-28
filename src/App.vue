<template>
	<div id="app">
		<sidebar :expand.sync="expand" ref="sidebar" v-if="isShow"></sidebar>
		<div class="app-main">
			<topbar ref="topbar" :expand.sync="expand" v-if="isShow" @refresh="refresh"></topbar>
			<keep-alive :include="$store.getters.cachePages"><router-view class="app-main_body"></router-view></keep-alive>
		</div>
	</div>
</template>
<script>
import sidebar from './components/sidebar.vue';
import topbar from './components/topbar.vue';
export default {
	name: 'app',
	data() {
		return {
			expand: true, //侧边栏是否展开
			viewKey: 0 ,//路由视图key值
		};
	},
	components: {
		sidebar,
		topbar
	},
	computed:{
		isShow(){
			if(!this.$route.name){
				return false;
			}
			return !this.$route.meta.free
		}
	},
	methods: {
		//刷新事件
		refresh() {
			this.$router.replace({
				path: '/reload',
				query: {
					redirect: this.$route.fullPath
				}
			});
		}
	}
};
</script>
<style lang="less">
html {
	font-size: 50px;
}

@media only screen and (min-width: 640px) {
	html {
		font-size: 40px;
	}
}

@media only screen and (min-width: 1440px) {
	html {
		font-size: 50px;
	}
}

#app {
	display: flex;
	justify-content: flex-start;
	overflow: hidden;
	width: 100%;
	height: 100%;
	background-color: #fff;
}

.app-main {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	flex-direction: column;
	-webkit-flex-direction:column;
	width: 100%;
	flex: 1;
	height: 100%;
	overflow: hidden;
	position: relative;

	.app-main_body {
		display: block;
		width: 100%;
		height: 100%;
		flex: 1;
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;
		background-color: #fbfbfb;
		padding: 0.2rem;
	}
}

.app-page{
	width: 8rem !important;
}

::-webkit-scrollbar {
	width: 0.16rem;
	height: 0.16rem;
}

::-webkit-scrollbar-track {
	background: #f1f1f1;
	border-radius: 0.12rem;
}

::-webkit-scrollbar-thumb {
	background: #ddd;
	border-radius: 0.12rem;
}
</style>
