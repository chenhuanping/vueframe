import request from '@/utils/request'

export function bilateralMap(data){
    return request({
        url:'/vue-element-admin/marketTrade/bilateral/map',
        method:'post',
        data
    })
}

export function bilateralMapDetails(data){
    return request({
        url:'/vue-element-admin/marketTrade/bilateral/details',
        method:'post',
        data
    })
}