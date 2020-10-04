import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/'

Vue.config.productionTip = false

Vue.prototype.$bus=new Vue();

Vue.use(toast)

//fastclick
FastClick.attach(document.body);

//lazyload
Vue.use(VueLazyLoad,{
  loading: require('./assets/imgs/common/placeholder.png') //懒加载图片占位
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
