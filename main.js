import App from './App'
import io from './common/js/weapp.socket.io.js'
import store from './store'


if(process.env.NODE_ENV == 'development'){
	console.log('development')
	Vue.prototype.baseURL='http://localhost:3000'
	Vue.prototype.socketUrl='http://localhost:8082'	
}else{
	Vue.prototype.baseURL='http://192.168.6.132:3000'
	Vue.prototype.socketUrl='http://192.168.6.132:8082'	
}
console.log(Vue.prototype.baseURL)

Vue.prototype.socket = io(Vue.prototype.socketUrl,{
	autoConnect:false
})
// Vue.prototype.$store = store
// Vue.socket.close()

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif