import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// import socketio from 'socket.io';
import VueSocketIO from 'vue-socket.io';

console.log(`${process.env.VUE_APP_API}/update`);
Vue.config.productionTip = false
// export const SocketInstance = socketio(`${process.env.VUE_APP_API}/update`);

Vue.use(new VueSocketIO({
  debug: true,
  connection: `${process.env.VUE_APP_API}/update`,
  // vuex: {
  //     store,
  //     actionPrefix: 'SOCKET_',
  //     mutationPrefix: 'SOCKET_'
  // },
  // options: { path: "/my-app/" } //Optional options
}))
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
