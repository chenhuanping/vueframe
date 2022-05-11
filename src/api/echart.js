import request from '@/utils/request'

export function getdata(){
    return request({
        url:'/vue-element-admin/echart/pie',
        method:'get',
    })
}

export function getBarData(){
    return request({
        url:'/vue-element-admin/echart/bar',
        method:'get',
    })
}

export function getMapData(){
    return request({
        url:'/vue-element-admin/echart/map',
        method:'get',
    })
}

export function getScatterData(){
    return request({
        url:'/vue-element-admin/echart/scatter',
        method:'get',
    })
}

export function getTable(){
    return request({
        url:'/vue-element-admin/echart/table',
        method:'get'
    })
}