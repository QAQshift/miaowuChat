<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	view{
		box-sizing: border-box;
	}
	.uni-mask{
		z-index:1001;
	}
	uni-modal .uni-modal{
		width:60% !important;
		border-radius:20upx !important;
		z-index: 19999 !important;
	}
	uni-modal .uni-modal__bd{
		font-size:28upx !important;
	}
	uni-modal .uni-modal__ft{
		font-size:24upx !important;
		line-height: 80upx !important;
	}
</style>
