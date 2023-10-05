import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        geohash:''
    },
    mutations:{
        SETGEOHASH(state,local){
            state.geohash = local
        }
    }
})
export default store