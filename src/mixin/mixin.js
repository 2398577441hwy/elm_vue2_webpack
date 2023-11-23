import store from '../store/index'
import {cityGuess} from '../service/getData'


export const loadMore={
    directives:{
        'load-more':{
            bind:(el,binding)=>{
                let windowHeight = window.screen.height
                // 滚动盒子到屏幕的距离
                let containerTop
                let paddingBottom
                let marginBottom
                let inner = el.children[0]
                let oldScrollTop

                let requestFram
                el.addEventListener('touchstart',()=>{
                    containerTop = el.offsetTop
                    
                    console.log('touchstart...')
                },false)

                el.addEventListener('touchmove',()=>{
                    loadMore()
                },false)

                el.addEventListener('touchend',()=>{
                    oldScrollTop = el.scrollTop
                    moveEnd()
                },false)
                
                // 查看在16.67ms时间内有没有滑动  ？？？？
                const moveEnd = ()=>{
                    requestFram = requestAnimationFrame(()=>{
                        // 动画
                        if(el.scrollTop != oldScrollTop){
                            moveEnd()
                        }else{
                            cancelAnimationFrame(requestFram)
                            loadMore()
                        }
                    })
                }

                const loadMore = ()=>{
                    // scrollHeith 为文本高度
                    // console.log(el,el.scrollTop,inner,inner.scrollTop)
                    // console.log(inner.scrollTop,el.clientHeight,inner.scrollHeight)
                    // console.log(el.scrollTop)
                    if(el.scrollTop + el.clientHeight >= inner.scrollHeight - 5){
                        binding.value()
                    }
                }
            }
        }
    }
}


export const getImgPath = {
    methods:{
        getImgPath(path){
            let suffix;
            if(!path){
                return '//elm.cangdu.org/img/default.jpg'
            }else{
                if(path.indexOf('jpeg')!==-1){
                    suffix = '.jpeg'
                }else{
                    suffix = '.png'
                }
            }
            let url = '/' +  path.slice(0,1) + '/' + path.slice(1,3)  + '/' + path.slice(3) + suffix
            return 'https://fuss10.elemecdn.com' + url
        }
    }
}
export const getCityInfo = async()=>{
    if(!store.state.cityinfo){
        console.log('store中没有cityinfo,发请求...')
        const result = await cityGuess()
        // console.log(result)
        store.commit('SETCITYINFO',result)
    }
    return store.state.cityinfo
}