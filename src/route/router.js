import VueRouter from 'vue-router'
import Vue from 'vue'
import App from '../App'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: App, //顶层路由，对应index.html
        children: [ //二级路由。对应App.vue
            //地址为空时跳转login页面
            {
                path: '',
                redirect: '/address'
            },
            {
                path: '/address',
                component: () => import("../view/address")
            },
            {
                path: '/login',
                component: () => import("../view/login")
            },
            {
                path: '/forget',
                component: () => import("../view/forget")
            },
            {
                path: '/home',
                component: () => import("../view/home"),
                meta:{keepAlive:true}
            },
            {
                path: '/download',
                component: () => import("../view/download")
            },
            {
                path: '/order',
                component: () => import("../view/order"),
                children:[
                    {
                        path:'orderDetail',
                        component:()=>import('../view/order/children/orderDetail.vue')
                    }
                ]
            },
            {
                path: '/profile',
                component: () => import("../view/profile")
            },
            {
                path: '/search',
                component: () => import("../view/search")
            },
            {
                path: '/service',
                component: () => import("../view/service"),
                // children:[
                //     {
                //         path:'questionDetail',
                //         component:()=>import('../view/service/questionDetail')
                //     }
                // ]
            },
            {
                path: '/vipcard',
                component: () => import("../view/profile/vipcard/index.vue"),
                children: [{
                    path: 'vipdesc',
                    component: () => import('../view/profile/vipcard/children/vipdesc.vue')
                },
                {
                    path:'buyvip',
                    component:()=>import('../view/profile/vipcard/children/buyvip.vue')
                },
                {
                    path:'historyVip',
                    component:()=>import('../view/profile/vipcard/children/historyVip.vue')
                },
                {
                    path:'exchangeVip',
                    component:()=>import('../view/profile/vipcard/children/exchangeVip.vue')
                }
                ]
            },
            {
                path: '/header',
                component: () => import('../components/header/myHeader.vue')
            },
            {
                path: '/shop',
                component: () => import('../view/shop/index.vue')
            },
            {
                path: '/test',
                component: () => import('../view/test/test1.vue')
            },
            {
                path:'/direction',
                component:()=>import('../view/test/Direction.vue')
            },
            {
                path:'/confirmOrder',
                component:()=>import('../view/confirmOrder/index.vue'),
                children:[
                    {
                        path:'remark',
                        component:()=>import('../view/confirmOrder/children/remark.vue')
                    },
                    {
                        path:'invoice',
                        component:()=>import('../view/confirmOrder/children/invoice.vue')
                    },
                    {
                        path:'chooseAddress',
                        component:()=>import('../view/confirmOrder/children/chooseAddress.vue'),
                        children:[
                            {
                                path:'addAdress',
                                component:()=>import('../view/confirmOrder/children/addAdress.vue'),
                                children:[
                                    {
                                        path:'searchAddress',
                                        component:()=>import('../view/profile/info/children/searchAdress.vue')
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path:'payment',
                        component:()=>import('../view/confirmOrder/children/payment.vue')
                    }
                ]
            },
            {
                path:'/rating',
                component:()=>import('../view/shop/rating.vue')
            },
            {
                path:'/star',
                component:()=>import('../components/star/index.vue')
            },
            {
                path: '/sortShop',
                component: () => import('../view/shop/sortShop.vue')
            },
            {
                path: '/alertText',
                component: () => import('../components/alertText/index.vue')
            },
            {
                path: '/info',
                component: () => import('../view/profile/info/index.vue'),
                children: [
                    {
                        path: 'modifyuser',
                        component: () => import('../view/profile/info/children/modifyuser.vue')
                    },
                    {
                        path: 'addAddress',
                        component: () => import('../view/profile/info/children/addAdress.vue'),
                        children: [
                            {
                                path: 'addressDetail',
                                component: () => import('../view/profile/info/children/addressDetail.vue'),
                                children: [{
                                    path: 'searchAdress',
                                    component: () => import('../view/profile/info/children/searchAdress.vue')
                                }]
                            }
                        ]
                    }
                ]
            },
            {
                path:'/city/:id',
                name:'city',
                component:()=>import('../view/city/index.vue')
            },
            {
                path:'/test2',
                component:()=>import('../view/test/test2.vue'),
                children:[
                    {
                        path:'test3',
                        component:()=>import('../view/test/test3.vue')
                    }
                ]
            },
            {
                path:'bscroll',
                component:()=>import('../view/test/BScroll.vue')
            },
            {
                path:'/loading',
                component:()=>import('../components/loading/index.vue')
            }
        ]
    }
]


const router = new VueRouter({
    routes
})

export default router