import VueRouter from 'vue-router'
import Vue from 'vue'
import App from '../App'
Vue.use(VueRouter)
const routes = [
    {
    path:'/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转login页面
        {
            path: '',
            redirect: '/address'
        },
        {
            path:'/address',
            component:() => import("../view/address")
        },
        {
            path:'/login',
            component:()=>import("../view/login")
        },
        {
            path:'/forget',
            component:()=>import("../view/forget")
        }
    ]
    }
]


const router = new VueRouter({
    mode:'history',
    routes
})

export default router
