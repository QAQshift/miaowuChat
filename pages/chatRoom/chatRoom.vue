<template>
	<!-- 聊天房间 -->
	<view class="content" v-if="room">
		<view class="nav">
			<view class="left" @tap="exit">‹</view>
			<view class="center">喵呜聊天室</view>
			<view class="right">在线 {{ member }}人</view>
		</view>
		<view class="open_member"><view style="text-align:center;width:100%;height:60upx;line-height:60upx;" @tap="modify">当前在线成员﹀</view></view>
		<view class="zhanwei1"></view>
		<view class="chat_content">
			<view v-for="item in megList" :key="item.id" v-if="megList.length != 0">
				<!-- 别人发的消息 -->
				<view class="other-people" v-if="item.type == 'other'">
					<image :src="item.img" mode="aspectFill" v-if="item.img"></image>
					<image :src="'../../static/images/pic' + item.selectImg + '.jpg'" mode="aspectFill" v-else></image>
					<view style="margin-left:20upx;">
						<view style="margin-bottom:10upx;font-size:24upx;color:#999;">{{ item.name }}</view>
						<view style="display:flex;align-items:center;">
							<view class="meg">{{ item.mess }}</view>
							<text style="font-size:24upx;color:#999;margin-left:10upx;">{{ item.time | timeDetia }}</text>
						</view>
					</view>
				</view>
				<!-- 自己发出去的消息 -->
				<view class="my-message" v-if="item.type == 'mine'">
					<view style="margin-right:20upx;">
						<view style="text-align: right;font-size:24upx;margin-bottom:10upx;color:#999;">{{ myInfo.name }}</view>
						<view style="display:flex;align-items:center;">
							<text style="font-size:24upx;color:#999;margin-right:10upx;">{{ item.time | timeDetia }}</text>
							<view class="matter">{{ item.mess }}</view>
						</view>
					</view>
					<image :src="item.img" mode="aspectFill" v-if="item.img"></image>
					<image :src="'../../static/images/pic' + item.selectImg + '.jpg'" mode="aspectFill" v-else></image>
				</view>

				<view class="tips" v-if="item.type == 'tip'">
					<view class="">{{ item.mess }}</view>
				</view>
			</view>
		</view>
		<!-- 		<view class="">
			{{myInfo.name}}
		</view>
		<image :src="myInfo.head" mode="aspectFill"></image> -->
		<view class="bottom_input">
			<textarea type="text" v-model="inputValue" placeholder="输入消息~" :adjust-position="true" auto-blur="true" auto-height="true" maxlength="300" cursor-spacing="20" />
			<text :class="['send_btn', inputValue ? 'active_btn' : '']" @tap="sendAll">发送</text>
		</view>

		<view class="modify" :style="{ display: bg }">
			<view class="modify-main">
				<block v-if="users.length>0">
					<view v-for="(e, i) in users" :key="i" class="us" @tap="toChat(e,i)">
						<view class="us-img">
							<image :src="e.head" mode="aspectFill" v-if="e.head"></image>
							<image :src="'../../static/images/pic' + e.selecthead + '.jpg'" mode="aspectFill" v-if="e.selecthead"></image>
							<view class="us_count" v-if="e.count">{{e.count>=9?'9+':e.count}}</view>						
						</view>
						<view class="us_name">
							{{e.name}}
						</view>
					</view>
				</block>
				
			</view>
			<view class="modify_up" @tap="modify">︿</view>
		</view>
		<view class="bg" @tap="modify" :style="{ display: bg }"></view>
	</view>
	
	
	
	
	
	<!-- 单人聊天 -->
	<view class="content" v-else>
		<view class="nav">
			<view class="left" @tap="back">‹</view>
			<view class="center" style="color:black;">
<!-- 				<view>
					{{anotherInfo.name}}
				</view> -->
				<view>
					<text v-if="anotherStatus==''">{{anotherInfo.name}}</text>
					<text  v-else style="color:pink;font-size:20upx;"> {{anotherStatus}}</text>
				</view>
			</view>
			
		</view>
		<view class="zhanwei2"></view>
		<view class="chat_content">
			<view v-for="(item,index) in otoChat" :key="index" v-if="otoChat.length > 0">
				<!-- 别人发的消息 -->
				<view class="other-people" v-if="item.fid == anotherInfo.id && item.tid == myInfo.id">
					<image :src="item.img" mode="aspectFill" v-if="item.img"></image>
					<image :src="'../../static/images/pic' + item.selectImg + '.jpg'" mode="aspectFill" v-else></image>
					<view style="margin-left:20upx;">
						<view style="margin-bottom:10upx;font-size:24upx;color:#999;">{{ item.name }}</view>
						<view style="display:flex;align-items:center;">
							<view class="meg">{{ item.mess }}</view>
							<text style="font-size:24upx;color:#999;margin-left:10upx;">{{ item.time | timeDetia }}</text>
						</view>
					</view>
				</view>
				<!-- 自己发出去的消息 -->
				<view class="my-message" v-if="item.tid == anotherInfo.id && item.fid == myInfo.id">
					<view style="margin-right:20upx;">
						<view style="text-align: right;font-size:24upx;margin-bottom:10upx;color:#999;">{{ myInfo.name }}</view>
						<view style="display:flex;align-items:center;">
							<text style="font-size:24upx;color:#999;margin-right:10upx;">{{ item.time | timeDetia }}</text>
							<view class="matter">{{ item.mess }}</view>
						</view>
					</view>
					<image :src="myInfo.head" mode="aspectFill" v-if="myInfo.head"></image>
					<image :src="'../../static/images/pic' + myInfo.selecthead + '.jpg'" mode="aspectFill" v-else></image>
				</view>
			</view>
		</view>
		<!-- 		<view class="">
			{{myInfo.name}}
		</view>
		<image :src="myInfo.head" mode="aspectFill"></image> -->
		<view class="bottom_input">
			<textarea type="text" v-model="inputValue" placeholder="输入消息~" :adjust-position="true" auto-blur="true" auto-height="true" maxlength="300" cursor-spacing="20" @input="Inputing"/>
			<text :class="['send_btn', inputValue ? 'active_btn' : '']" @tap="sendOne">发送</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
			room:true,
			bb: false,
			bg: 'none',
			userIndex:null,
			//用户信息
			myInfo: {
				head: '',
				name: '',
				selecthead: '',
				id:''
			},
			anotherStatus:'',
			anotherInfo:{},
			//成员数
			member: 0,
			//输入内容
			inputValue: '',
			//聊天内容
			megList: [],
			img: [
				{ i: '1' },
				{ i: '2' },
				{ i: '3' },
				{ i: '4' },
				{ i: '5' },
				{ i: '6' },
				{ i: '7' },
				{ i: '8' },
				{ i: '9' },
				{ i: '10' },
				{ i: '11' },
				{ i: '12' },
				],
			users:[{
				head: "",
				id: "HKDT1j_3YJNyhlmyAAAC",
				name: "白白",
				selecthead: "3"
			}],
			otoChat:[

			]
		};
	},
	onLoad(option) {
		console.log(option.myhead);
		if (option.myhead) {
			this.myInfo.head = option.myhead;
		} else {
			this.myInfo.selecthead = option.selecthead;
		}

		this.myInfo.name = option.myname;

		console.log(this.socket);

		this.join();
		this.myself();
		this.welcome();		
		this.getMsg();
		this.getOneMsg();
		this.getInputing()
		this.quit();

		// console.log(this.megList);
		// console.log(this.myInfo);
	},
	onUnload() {
		console.log('页面关闭');
	},
	methods: {
		//一对一动画
		modify() {
			this.bb = !this.bb;
			if (this.bb) {
				this.bg = 'block';
			} else {
				this.bg = 'none';
			}
		},
		exit() {
			console.log('断开链接')
			var that = this;
			uni.showModal({
				title:'',
				content:'是否断开链接？（注销用户）',
				cancelColor:'#007AFF',
				confirmColor:'red',
				success: (res) => {
					 if (res.confirm) {
					        console.log('用户点击确定');
							uni.reLaunch({
								url: '../index/index',
								success() {
									that.socket.close();
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					
				},
				complete(res) {
					console.log(res)
				}
				
				
			})
			
			
		},
		//加入群聊
		join() {
			console.log('加入群聊');

			this.socket.emit('join', this.myInfo);
		},
		//欢迎加入
		welcome() {
			console.log('欢迎群聊');
			this.socket.on('welcome', (name,users, len) => {
				let data = {
					mess: '欢迎 ' + name + ' 加入群聊',
					type: 'tip'
				};
				this.megList.push(data);
				
				for(var i=0;i<users.length;i++){
				          // console.log(users)
					  if(users[i].id == this.myInfo.id){
						users.splice(i,1)
					}
				}
				this.users=users
				console.log('users')
				console.log(users)
				console.log(this.megList);
				this.member = len;
			});
		},
		//获取自己加入
		myself(){
			this.socket.on('myself', (users,id,len) => {
				let data = {
					mess: '欢迎 ' + this.myInfo.name + ' 加入群聊',
					type: 'tip'
				};
				this.megList.push(data);
				this.myInfo.id=id
		
				this.users=users

				console.log(this.megList);
				this.member = len;
			});
			
		},
		//消息发送
		sendAll() {
			if (this.inputValue.length > 0) {
				let msg = {
					mess: this.inputValue,
					img: this.myInfo.head,
					selectImg: this.myInfo.selecthead,
					time: new Date(),
					type: 'mine'
				};
				let data = {
					name: this.myInfo.name,
					mess: this.inputValue,
					img: this.myInfo.head,
					selectImg: this.myInfo.selecthead,
					time: new Date(),
					type: 'other'
				};
				this.megList.push(msg);
				this.socket.emit('message', data);

				this.inputValue = '';
				console.log(msg.img);
			}
		},
		Inputing(){
			let data={
				mess:'对方正在输入中...',
				fid:this.myInfo.id,
				tid: this.anotherInfo.id
			}
			this.socket.emit('inputing', data);
		},
		getInputing(){
			this.socket.on('getInputing', data => {
				console.log(data.mess)
				this.anotherStatus=data.mess
				var that = this
				setTimeout(()=>{
					that.anotherStatus=''
				},2000)
			});
		},
		//发送一对一消息
		sendOne() {
			if (this.inputValue.length > 0) {
				let onemsg = {
					mess: this.inputValue,
					time: new Date(),
					fid:this.myInfo.id,
					tid: this.anotherInfo.id,
				};
				let data = {
					name: this.myInfo.name,
					mess: this.inputValue,
					img: this.myInfo.head,
					selectImg: this.myInfo.selecthead,
					time: new Date(),
					fid:this.myInfo.id,
					tid:this.anotherInfo.id
				};
				// console.log('自己one发送的消息')
				// console.log(onemsg)
				// console.log(data)
				this.otoChat.push(onemsg);
				this.socket.emit('sendOne', data);
		
				this.inputValue = '';
				// console.log(onemsg.img);
			}
		},
		//获取消息
		getMsg: function() {
			this.socket.on('sendMsg', data => {
				
				this.megList.push(data);
			});
		},
		//获取一对一消息
		getOneMsg: function() {
			this.socket.on('receiveOne', data => {
				// console.log('one接受的消息')
				// console.log(data)
				for(var i=0;i<this.users.length;i++){
					if(data.fid==this.users[i].id){
						this.users[i].count++
						// console.log(this.users[i].count)
					}
				}
				
				this.otoChat.push(data);
				// console.log("otoChat")
				// console.log(this.otoChat)
			});
		},
		//用户退出广播
		quit() {
			console.log('前端退出');
			this.socket.on('exit', (name,users,len,id) => {
				console.log('前端退出2');
				console.log(name);
				console.log(len);
				if(id==this.anotherInfo.id){
					this.anotherStatus='已离线'
				}
				let data = {
					mess: name + ' 离开群聊',
					type: 'tip'
				};
				
				this.megList.push(data);
				console.log('用户退出了');
				
				for(var i=0;i<users.length;i++){
				          // console.log(users)
					if(users[i].id == this.myInfo.id){
						users.splice(i,1)
					}
				}
				this.users=users
				console.log(this.users)
				this.member = len;
			});
		},
		toChat(e,i){
			this.userIndex=i
			this.users[i].count=0
			this.anotherInfo=e
			this.room=!this.room
			// this.modify()
		},
		back(){
			if(this.anotherStatus==''){
				this.users[this.userIndex].count=0
			}else{
				this.anotherStatus=''
			}
			
			this.room=!this.room
		}
	},
	filters: {
		timeDetia(date) {
			var time;
			var d = new Date(date);
			var n = new Date();

			//获取时间戳
			var dd = d.getTime();
			var h = d.getHours();
			var m = d.getMinutes();
			var Y = d.getFullYear();
			var M = d.getMonth();
			var D = d.getDate();
			//现在时间
			var nn = n.getTime();
			var hh = n.getHours();
			var mm = n.getMinutes();
			var YY = n.getFullYear();
			var MM = n.getMonth();
			var DD = n.getDate();

			if (D == DD && M == MM && Y == YY) {
				if (h < 10) {
					h = '0' + h;
				}
				if (m < 10) {
					m = '0' + m;
				}
				time = h + ':' + m;
				return time;
			} else if (D + 1 == DD && M == MM && Y == YY) {
				if (h < 10) {
					h = '0' + h;
				}
				if (m < 10) {
					m = '0' + m;
				}
				time = '昨天' + h + ':' + m;
				return time;
			} else {
				if (M < 10) {
					M = '0' + M;
				}
				if (D < 10) {
					D = '0' + D;
				}
				if (h < 10) {
					h = '0' + h;
				}
				if (m < 10) {
					m = '0' + m;
				}
				time = Y + '年' + M + '月' + D + '日' + ' ' + h + ':' + m;
				return time;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	min-height: 100vh;
	position: relative;
	background-color: #f4f4f8;
	display: flex;
	flex-direction: column;
	.nav {
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 999;
		height: 80upx;
		width: 100%;
		box-sizing: content-box;
		padding-top: calc(var(--status-bar-height));
		.left {
			left: 20upx;
			font-size: 50upx;
			height:80upx;
			width:100upx;
			position: absolute;
		}
		.center {
			font-size: 30upx;
			color: pink;
		}
		.right {
			color: #007aff;
			font-size: 24upx;
			right: 20upx;
			position: absolute;
		}
	}
	.open_member {
		background-color: pink;
		width: 100%;
		position: fixed;
		top:calc(80upx + var(--status-bar-height)) ;
		z-index: 99;
		font-size: 24upx;
		color: white;
	}
	.zhanwei1 {
		width: 100%;
		height: calc(180upx + var(--status-bar-height));
	}
	.zhanwei2 {
		width: 100%;
		height: calc(80upx + var(--status-bar-height));
	}
	.chat_content {
		min-height: 100vh;
		margin-bottom: 120upx;
		padding: 0 20upx 0;
		width: 100%;
		.my-message {
			display: flex;
			justify-content: flex-end;
			margin-top: 30upx;
			image {
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
			.matter {
				background: pink;
				padding: 0 25upx;
				height: 70upx;
				line-height: 70upx;
				font-size: 28upx;
				color: #393939;
				border-top-left-radius: 20upx;
				border-bottom-left-radius: 20upx;
				border-bottom-right-radius: 20upx;
			}
		}
		.other-people {
			display: flex;
			margin-top: 30upx;
			image {
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
			.meg {
				padding: 0 25upx;
				height: 70upx;
				line-height: 70upx;
				font-size: 28upx;
				color: #393939;
				background: #ffffff;
				border-top-right-radius: 20upx;
				border-bottom-left-radius: 20upx;
				border-bottom-right-radius: 20upx;
			}
		}
		.tips {
			width: 100%;
			font-size: 24upx;
			color: #999;
			text-align: center;
			padding: 60upx 0;
		}
	}
	.bottom_input {
		position: fixed;
		width: 100%;
		padding: 16upx;
		border-top: 1upx solid #e2e2e2;
		bottom: 0;
		left: 0;
		z-index: 99;
		display: flex;
		align-items: center;
		background-color: white;
		textarea {
			line-height: 40upx;
			padding: 16upx 30upx;
			flex: 1;
			background-color: rgb(240, 240, 240);
			border-radius: 40upx;
			font-size: 26upx;
		}
		.send_btn {
			margin-left: 20upx;
			padding: 12upx 36upx;
			border-radius: 40upx;
			font-size: 26upx;
			background-color: pink;
			color: white;
		}
		.active_btn {
			background-color: #ff93a6;
		}
	}
}
//上弹组件样式
.modify {
	position: fixed;
	left: 0;
	top: calc(80upx + var(--status-bar-height));
	width: 100%;
	z-index: 1000;
	background-color: white;
	border-radius: 0 0 48upx 48upx;
	overflow: hidden;
	border-top: 1upx solid #e2e2e2;
}
.modify-main {
	padding: 20upx 36upx 0;
	flex-direction: row;
	display: flex;
	flex-wrap: wrap;
	.us {
		width: 20%;
		text-align: center;
		padding: 20upx 0;		
		.us-img {
			width: 100upx;
			height: 100upx;
			position: relative;
			margin: auto;
			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				
			}
		}
		.us_count {
			position: absolute;
			top: 2px;
			right: -2px;
			border-radius: 15px;
			color: white;
			background-color: red;
			height: 15px;
			/* width: 15px; */
			font-size: 10px;
			line-height: 15px;
			text-align: center;
			padding: 0 4px;
		}
	}
	.us_name{
		width:100%;font-size:24upx;text-align: center;padding-top:10upx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
		color:grey;
	}
}
.modify_up {
	color: pink;
	font-size: 24upx;
	text-align: center;
	width: 100%;
	height: 60upx;
}
.bg {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.4);
}
</style>
