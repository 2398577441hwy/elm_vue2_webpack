import Vue from 'vue'
import Vuex from 'vuex'
// import { ADD_CART } from './mutationsType';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        geohash: '',
        // shopCartList:[],
        // 购物车抖动动画的控制
        receiveInCart: false,
        userinfo: {},
        cityinfo: {},
        // 地址搜索列表
        historyList: [],
        // 购物车列表
        cartList: {},
        currentAddress:{},
        shopAddress:{},
        shopinfo:{},
        remarkTag:{},
        remarkText:'',
        invoice:false
    },
    mutations: {
        OUTLOGIN(state){
            state.geohash='',
            state.receiveInCart = false,
            state.userinfo={},
            state.cityinfo={},
            state.cartList={},
            state.currentAddress={},
            state.shopAddress={},
            state.shopinfo={},
            state.remarkTag={},
            state.remarkTag='',
            state.invoice=false
        },
        SETSHOPADDRESS(state,addAdress){
            state.shopAddress = addAdress
        },
        SETCURRENTADDRESS(state,address){
            state.currentAddress = address
        },
        SETHISTORYLIST(state, list) {
            state.historyList.push(list)
        },
        CLEARHISTORYLIST(state) {
            state.historyList = []
        },
        CLEARHISTORYITEM(state,item){
            const index = state.historyList.indexOf(item)
            state.historyList.splice(index,1)
        },
        SETGEOHASH(state, local) {
            state.geohash = local
        },
        ADD_CART(state, obj) {
            const { shopid, category_id, item_id, name, food_id, packing_fee, price, sku_id, specs, stock } = obj
            // console.log(obj)
            let cart = state.cartList;
            let shop = cart[shopid] = cart[shopid] || {}
            let category = shop[category_id] = shop[category_id] || {}
            let item = category[item_id] = category[item_id] || {}
            if (item[food_id]) {
                item[food_id]['num']++;
            } else {
                item[food_id] = {
                    num: 1,
                    id: food_id,
                    name: name,
                    price: price,
                    specs: specs,
                    packing_fee: packing_fee,
                    sku_id: sku_id,
                    stock: stock,
                    shopid:shopid,
                    category_id:category_id,
                    item_id:item_id,
                    food_id:food_id
                }
            }
            state.cartList = { ...cart }
        },
        REDUCEMYCART(state,obj){
            const { shopid, category_id, item_id, name, food_id, packing_fee, price, sku_id, specs, stock } = obj
            // cart 购物仓库
            let cart = state.cartList;
            // shop 购物车
            let shop = cart[shopid] = cart[shopid] || {}
            //  category 类
            let category = shop[category_id] = shop[category_id] || {}
            // item 项
            let item = category[item_id] = category[item_id] || {}
            if (item[food_id]) {
                item[food_id]['num']--;
                // 如果对象中的数量为0  将此对象删除出去
                if(item[food_id]['num']==0){
                    delete category[item_id]
                }
            }
            state.cartList = {...cart}
        },
        DELETECARTLIST(state, id) {
            // 这样数据变化，需要手动刷新页面才渲染
            //    delete  state.cartList[id]

            // 这样仓库数据和页面数据是实时的
            state.cartList[id] = null
            state.cartList = { ...state.cartList }
        },
        CHANGERECEIVEINCART(state, value) {
            // console.log(value)
            state.receiveInCart = value
        },
        SETUSERINFO(state, obj) {
            state.userinfo = obj
        },
        SETCITYINFO(state, obj) {
            state.cityinfo = obj
        }
    },
    getters: {
        originUserInfo: (state) => {
            return state.userinfo
        }
    },
    plugins: [createPersistedState()]
})
export default store