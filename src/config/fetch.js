export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.slice(0,dataStr.length - 1)
			url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		
		try {
			console.log(url,requestConfig)
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			console.log(responseJson)
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} 
}