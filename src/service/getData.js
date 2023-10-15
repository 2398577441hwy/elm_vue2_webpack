import fetch from "../config/fetch";
/**
 * 获取默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});


/**
 * 获取热门城市
 */

export const hotCity = () => fetch('/v1/cities', {
	type: 'hot'
});


/**
 * 获取所有城市
 */

export const allCity = () => fetch('/v1/cities', {
	type: 'group'
});


/**
 * 获取当前所在城市
 */

export const currentcity = number => fetch('/v1/cities/' + number);


// 密码登录的验证码
export const code = ()=> fetch('/v1/captchas',{},'POST')

// 登录/注册
export const login = (username,password,captcha_code)=> fetch('/v2/login',{username,password,captcha_code},'POST')


// 获取home页面的nav
export const homenav = (geohash)=>fetch('/v2/index_entry',{geohash},'GET')

// 获取home页面的餐馆  offset = 0 批次加载商铺列表，每次加载20个  食品类型id         筛选类型的id            何种方式排序     选中的配送方式   选中的商品活动列表
export const homelist = (latitude,longitude,offset,restaurant_category_id='',restaurant_category_ids='',order_by='',delivery_mode='',support_ids = [])=>{
	// console.log(latitude,longitude)
	let supportStr = '';
	support_ids.forEach(item=>{
		if(item.status){
			supportStr += '&support_ids[]=' + item.id
		}
	})
	let data = {
		latitude,
		longitude,
		offset,
		limit:'20',
		'extras[]':'activities',
		keyword:'',
		restaurant_category_id,
		'restaurant_category_ids[]':restaurant_category_ids,
		order_by,
		'delivery_mode[]':delivery_mode + supportStr
	}
	return fetch('/shopping/restaurants',data)
}



// 获取商铺菜单    ????

export const shoplist = (restaurant_id)=>fetch('/shopping/v2/menu',{restaurant_id},'GET')


// 获取sortShop页面的catagory 
export const shopCategory = (latitude,longitude)=>fetch('/shopping/v2/restaurant/category',{latitude,longitude},'GET')


// 获取sortShop页面的配送方式
export const deliveryMethods = (latitude,longitude)=>fetch('/shopping/v1/restaurants/delivery_modes',{latitude,longitude},'GET')


// 获取sortShop页面的商家活动列表
export const shopAcitvies = (latitude,longitude)=>fetch('/shopping/v1/restaurants/activity_attributes',{latitude,longitude},'GET')
