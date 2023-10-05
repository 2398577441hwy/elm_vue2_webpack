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

// 获取home页面的餐馆
export const homelist = (latitude,longitude)=>fetch('/shopping/restaurants',{latitude,longitude},'GET')


// 获取商铺菜单

export const shoplist = (restaurant_id)=>fetch('/shopping/v2/menu',{restaurant_id},'GET')