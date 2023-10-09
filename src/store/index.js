import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        geohash:'',
        shopList:[]
    },
    mutations:{
        SETGEOHASH(state,local){
            state.geohash = local
        },
        ADD_CART(state,obj){
            state.shopList.push(obj)
        }
    }
})
export default store