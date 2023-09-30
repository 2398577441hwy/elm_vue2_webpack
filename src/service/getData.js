import fetch from "../config/fetch";
/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});


/**
 * 获取首页热门城市
 */

export const hotCity = () => fetch('/v1/cities', {
	type: 'hot'
});


/**
 * 获取首页所有城市
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