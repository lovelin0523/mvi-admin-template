<template>
	<div>
		<m-editor
			height="10rem"
			v-model="value"
			placeholder="请输入正文..."
			:active-color="$store.getters.theme.themeColor"
			:menus="{ codeView: true, alert: true }"
			:menu-icons="{ alert: 'computer-alt' }"
			:tooltips="{ alert: '自定义菜单项：弹窗' }"
			@custom="customAction"
			:upload-video-props="{allowedFileType:['mp4', 'MP4', 'avi', 'AVI', 'WAV', 'wav','mov','MOV']}"
			:video-show-props="{loop:true}"
		></m-editor>
	</div>
</template>

<script>
export default {
	name: 'component-editor',
	data() {
		return {
			value: ''
		};
	},
	methods: {
		customAction(res) {
			if (res.key == 'alert') {
				this.$Alert({
					title:'Editor自定义菜单弹窗',
					message:'自定义操作，显示一个弹窗',
					btns: {
						ok: {
							color: this.$store.getters.theme.themeColor,
							subColor: this.$store.getters.theme.themeTextColor
						}
					}
				})
			}
		}
	}
};
</script>

<style></style>
