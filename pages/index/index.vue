<template>
	<view class="content">
		<!-- #ifdef H5 -->
		<view style="width:100%;margin-top:20%;"><view class="title">欢迎进入喵呜聊天室</view></view>
		<!-- #endif -->

		<!-- #ifndef H5 -->
		<view style="width:100%;margin-top:26%;"><view class="title">欢迎进入喵呜聊天室</view></view>
		<!-- #endif -->
		
		<view style="width:100%;margin-top:10%;display: flex;justify-content: center;">
			<image :src="myHead" mode="aspectFill" class="head" v-if="myHead"></image>
			<image :src="'../../static/images/pic' + selectHead + '.jpg'" mode="aspectFill" class="head" v-else-if="selectHead"></image>
			<view class="head" v-else @tap="chooseTheImg">自定义头像</view>
		</view>
		<view style="margin-top:40upx;display:flex;justify-content:center;font-size:28upx;" @tap="modify">
			<view style="width:100%;color:#ff93a6;">
				选择头像
				<text style="margin-left:20upx;">﹀</text>
			</view>
		</view>
		<view style="width:100%;margin-top:8%;"><input type="text" v-model="name" placeholder="输入你的昵称qwq" placeholder-class="input_place" maxlength="8" style="font-size:30upx;"/></view>
		<view style="width:100%;margin-top:20%;"><view class="joinBtn" @tap="join">加入</view></view>

		<view class="modify" :animation="animationData">
			<view class="modify-main">
				<view v-for="(e, index) in img" :key="index" class="us-img" @tap="selected(index)">
					<image :src="'../../static/images/pic' + e.i + '.jpg'" mode="aspectFill"></image>
					<view class="dd"><view class="ddd" :style="{ opacity: e.x }"></view></view>
				</view>
			</view>
		</view>
		<view class="bg" @tap="modify" :style="{ display: bg }"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			myHead: '',
			selectHead: '',
			name: '',
			//上弹组件
			img: [
				{ i: '1', x: 0 }, 
				{ i: '2', x: 0 }, 
				{ i: '3', x: 0 },
				{ i: '4', x: 0 },
				{ i: '5', x: 0 },
				{ i: '6', x: 0 },
				{ i: '7', x: 0 },
				{ i: '8', x: 0 },
				{ i: '9', x: 0 },
				{ i: '10', x: 0 },
				{ i: '11', x: 0 },
				{ i: '12', x: 0 },
				],
			animationData: {},
			bb: false,
			bg: 'none'
		};
	},
	onShow() {
		console.log('主页');
	},
	onLoad() {},
	methods: {
		//一对一动画
		modify() {				
			if(this.myHead){
				uni.showToast({
					icon:'none',
					title:'已自定义头像'
				})
				return
			}else{
				this.bb = !this.bb;
				if (this.bb) {
					this.bg = 'block';
				} else {
					this.bg = 'none';
				}
				
				var animation = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease'
				});
				
				this.animation = animation;
				if (this.bb) {
					animation.bottom(0).step();
				} else {
					animation.bottom().step();
				}
				this.animationData = animation.export();
			}
			
		},
		selected(index) {
			this.selectHead = this.img[index].i;

			var newImg = this.img.map((value, i, arr) => {
				arr[i].x = 0;
				return arr[i];
			});
			newImg[index].x = 1;

			this.img = newImg;
		},
		chooseTheImg() {
			var that = this;
			uni.chooseImage({
				count: 1, //图片可选择数量
				sizeType: [ 'compressed'], //original 原图，compressed 压缩图，默认二者都有
				sourceType: ['album', 'camera', '海报图库'], //album 从相册选图，camera 使用相机，默认二者都有。
				success: res => {
					console.log(res);
					console.log(res.tempFilePaths[0]);
					that.myHead = res.tempFilePaths[0];

					// uni.saveImageToPhotosAlbum({
					// 	//需要添加这一部分 图片才会保存成功
					// 	filePath: res.tempFilePaths[0],
					// 	success: (res) => {
					// 		that.myHead=res.path
					// 		console.log("保存地址"+that.myHead)
					// 	}
					// });
				}
			});
		},
		join() {
			if ( this.name == '') {
				uni.showToast({
					title: '请输入昵称',
					icon: 'none'
				});
			
			}else if(this.myHead == '' && this.selectHead == ''){
				uni.showToast({
					title: '请自定义头像或选择头像',
					icon: 'none'
				});
			}else {
				this.socket.open();
				var timer = setTimeout(() => {
					console.log('请求链接中')
					if (this.socket.connected) {
						console.log("已经建立链接")
						clearTimeout(timer);
						if(this.myHead == ''){
							uni.navigateTo({
								url: `../chatRoom/chatRoom?selecthead=${this.selectHead}&myname=${this.name}`
							});
							
						}else{
							console.log('上传图片中')
							var that=this
							console.log(that.myHead)
							
							// let hurl=;
							
							// #ifdef H5
							uni.uploadFile({
								url:'/upload',
							    // url:'http://192.168.6.132:3000/upload',     // 后端api接口
							    filePath: that.myHead, // uni.chooseImage函数调用后获取的本地文件路劲
							    name:'file',     //后端通过'file'获取上传的文件对象
								formData:{
									time:new Date().getTime()
								},
							    header:{
									// "Content-Type": "multipart/form-data",
								},
							    success:(res) => {
									console.log(res)
							        if (res.statusCode == 200){
							            console.log('图片上传成功')
										console.log(res.data)
										console.log("底线")
										const data=JSON.parse(res.data)
										console.log(data)
										that.myHead=data.data.url
										console.log(that.myHead)
										uni.navigateTo({
											url: `../chatRoom/chatRoom?myhead=${that.myHead}&myname=${that.name}`
										});
							
							        }
							    },
								fail(err) {
									console.log('图片上传失败原因')
									console.log(err)
								}
								
							})
							// #endif
							
							const url = this.baseURL+'/upload'
							console.log(url)
							// #ifndef H5
							uni.uploadFile({
							    url:url,     // 后端api接口
							    filePath: that.myHead, // uni.chooseImage函数调用后获取的本地文件路劲
							    name:'file',     //后端通过'file'获取上传的文件对象
								formData:{
									time:new Date().getTime()
								},
							    header:{
									// "Content-Type": "multipart/form-data",
								},
							    success:(res) => {
									console.log(res)
							        if (res.statusCode == 200){
							            console.log('图片上传成功')
										const data=JSON.parse(res.data)
										that.myHead=data.data.url
										console.log(that.myHead)
										uni.navigateTo({
											url: `../chatRoom/chatRoom?myhead=${that.myHead}&myname=${that.name}`
										});
							
							        }
							    },
								fail(err) {
									console.log('图片上传失败原因')
									console.log(err)
								}
								
							})
							// #endif
							
							
						}
						
					} else {
						uni.showToast({
							icon: 'none',
							title: '服务器连接失败，请稍后再试'
						});
					}
				}, 1000);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100%;
	background-color: white;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	.title {
		color: #fb9cac;
		text-align: center;
	}
	.head {
		width: 180upx;
		height: 180upx;
		border-radius: 50%;
		background-color: #e2e2e2;
		line-height: 180upx;
		text-align: center;
		font-size: 26upx;
		color: white;
	}
	input {
		width: 60%;
		padding: 20upx;
		text-align: center;
		background-color: rgb(240, 240, 240);
		border-radius: 20upx;
		margin: auto;
	}
	.input_place {
		font-size: 28upx;
	}
	.joinBtn {
		background-color: #ff93a6;
		height: 200upx;
		width: 200upx;
		line-height: 200upx;
		text-align: center;
		border-radius: 50%;
		box-shadow: 0upx 20upx 40upx 0upx pink;
		font-size: 30upx;
		color: white;
		margin: auto;
	}
}

//上弹组件样式
.modify {
	position: fixed;
	left: 0;
	bottom: -600upx;
	width: 100%;
	height: 600upx;
	z-index: 1000;
	background-color: white;
	border-radius: 48upx 48upx 0 0;
}
.modify-main {
	padding: 80upx 36upx;
	flex-direction: row;
	display: flex;
	flex-wrap: wrap;
	.us-img {
		flex: auto;
		width: 25%;
		text-align: center;
		image {
			width: 100upx;
			height: 100upx;
			border-radius: 18upx;
		}
		.ddd {
			display: inline-block;
			justify-content: center;
			margin-bottom: 40upx;
			width: 18upx;
			height: 18upx;
			background-color: #ff93a6;
			border-radius: 50%;
		}
	}
}
.bg {
	width: 100%;
	height: 100%;
	position:fixed;
	top: 0;
	left: 0;
	z-index:999;
	background-color: rgba(0, 0, 0, 0.4);
}
</style>
