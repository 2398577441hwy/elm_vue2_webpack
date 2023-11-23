import Vue from "vue";
import router from "./route/router";
import store from './store'
import App from "./App.vue";
import server from '@/mock/server'
new Vue({
    router,
    store,
    beforeCreate(){
      Vue.prototype.$bus = this
    },
    render: (h) => h(App),
  }).$mount("#app");