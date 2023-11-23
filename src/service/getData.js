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

// 修改密码 
export const modify = ({username,oldpassWord,newpassword,confirmpassword,captcha_code})=>fetch('/v2/changepassword',{username,oldpassWord,newpassword,confirmpassword,captcha_code},'POST')

// 获取home页面的nav
export const homenav = (geohash)=>fetch('/v2/index_entry',{geohash},'GET')

// 获取home页面的餐馆  offset = 0 批次加载商铺列表，每次加载20个  食品类型id         筛选类型的id            何种方式排序     选中的配送方式   选中的商品活动列表
export const homelist = (latitude,longitude,offset,restaurant_category_id='',restaurant_category_ids='',order_by='',delivery_mode='',support_ids = [])=>{
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

//添加收货地址 /v1/users/:user_id/addresses
export const addAdress = ({user_id,address,address_detail,geohash,name,phone,tag,sex,poi_type=0,phone_bk,tag_type})=>fetch(`/v1/users/${user_id}/addresses`,{user_id,address,address_detail,geohash,name,phone,tag,sex,poi_type,phone_bk,tag_type},'POST')

// 获取收货列表 /v1/users/:user_id/addresses
export const AddressList = (user_id)=>fetch(`/v1/users/${user_id}/addresses`)

// 获取备注信息 /v1/carts/{cart_id}/remarks
export const remarksinfo = (cart_id)=>fetch(`/v1/carts/${cart_id}/remarks`)

// 支付
export const pay = ()=>fetch('payapi/payment/queryOrder')

// 下单
export const buygoods = ({user_id,cart_id,address_id,restaurant_id,geohash,description,entities})=>fetch(`/v1/users/${user_id}/carts/${cart_id}/orders`,{address_id,restaurant_id,geohash,description,entities},'POST')

// 获取订单列表
export const orderlist = (user_id,limit=10,offset=0)=>fetch(`/bos/v2/users/${user_id}/orders`,{limit,offset})

// 获取订单详情
export const orderDetail = (user_id,order_id)=>fetch(`/bos/v1/users/${user_id}/orders/${order_id}/snapshot`)
// 搜索地址
export const searchAdress = ({city_id,keyword,type='search'})=>fetch('/v1/pois',{city_id,keyword,type})

// 搜索餐馆
export const searchRestaurants = (geohash,keyword)=>fetch(`/v4/restaurants`,{geohash,keyword})

// 获取评分列表

export const ratingList = ({restaurant_id,tag_name,offset,limit})=>fetch(`/ugc/v2/restaurants/${restaurant_id}/ratings`,{tag_name,offset,limit})

// 获取评价分类
export const ratingCategory = (restaurant_id)=>fetch(`/ugc/v2/restaurants/${restaurant_id}/ratings/tags`)

// 获取评价分数 /ugc/v2/restaurants/:restaurant_id/ratings/scores
export const ratingScore = (restaurant_id)=>fetch(`/ugc/v2/restaurants/${restaurant_id}/ratings/scores`)


// 加入购物车  /v1/carts/checkout
export const addCart = (restaurant_id,geohash,entities)=>{
	console.log(entities)
	return fetch(`/v1/carts/checkout`,{restaurant_id,geohash,entities},'POST')
}