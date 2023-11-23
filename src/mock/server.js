import Mock from 'mockjs'
import address from './address.json'



Mock.mock('/mock/address',{data:address,code:200})
