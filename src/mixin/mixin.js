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