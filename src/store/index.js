import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        geohash:'',
        shopCartList:[],
        // 购物车抖动动画的控制
        receiveInCart:false
    },
    mutations:{
        SETGEOHASH(state,local){
            state.geohash = local
        },
        ADD_CART(state,obj){
            let flag = false
            state.shopCartList.forEach(element=>{
                if(element.id === obj.id){
                    flag = true
                    element.num = obj.num
                }
            })
            // 如果不存在则添加
            if(!flag){
                state.shopCartList.push(obj)
            }
        },
        DELETECARTLIST(state,id){
            state.shopCartList.forEach((element,index)=>{
                if(element.id === id){
                    if(element.num > 1){
                        element.num --
                    }else{
                        state.shopCartList.splice(index,1)
                    }
                }
            })
        },
        CHANGERECEIVEINCART(state,value){
            console.log(value)
            state.receiveInCart = value
        }
    }
})
export default store