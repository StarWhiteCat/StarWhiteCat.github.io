import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './app.vue'

Vue.use(ElementUI)

new Vue({
  render: (h)=> {
    return h(App)
  }
}).$mount('#app')
