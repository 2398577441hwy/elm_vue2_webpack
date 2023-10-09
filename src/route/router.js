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
        },
        {
            path:'/home',
            component:()=>import("../view/home")
        },
        {
            path:'/download',
            component:()=>import("../view/download")
        },
        {
            path:'/order',
            component:()=>import("../view/order")
        },
        {
            path:'/profile',
            component:()=>import("../view/profile")
        },
        {
            path:'/search',
            component:()=>import("../view/search")
        },
        {
            path:'/service',
            component:()=>import("../view/service"),
            // children:[
            //     {
            //         path:'questionDetail',
            //         component:()=>import('../view/service/questionDetail')
            //     }
            // ]
        },
        {
            path:'/vipcard',
            component:()=>import("../view/vipcard")
        },
        {
            path:'/header',
            component:()=>import('../components/header/myHeader.vue')
        },
        {
            path:'/shop',
            component:()=>import('../view/shop/index.vue')
        },
        {
            path:'/test',
            component:()=>import('../view/test/test1.vue')
        }
    ]
    }
]


const router = new VueRouter({
    mode:'history',
    routes
})

export default router