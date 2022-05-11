// chokidar 监听文件的变化
// import chokidar from 'chokidar'
// import Mock from 'mockjs'
// import path from 'path'
// import {mocks} from './index'
const Mock = require('mockjs')
const path = require('path')
const express = require('express')
const chokidar = require('chokidar')

//  process.cwd() 方法返回 Node.js 进程的当前工作目录
// 将路径片段使用特定的分隔符（window：\）连接起来形成路径，并规范化生成的路径
const mockDir = path.join(process.cwd(), 'mock');

function registerRoutes(app){
    let mockLastIndex
    const { mocks } = require('./index.js')
    const mocksForServer = mocks.map(route => {
        console.log('mocks222',mocks);
        return responseFake(route.url, route.type, route.response)
    })
    for (const mock of mocksForServer) {
        app[mock.type](mock.url, mock.response)
        mockLastIndex = app._router.stack.length
    }
    const mockRoutesLength = Object.keys(mocksForServer).length
    return{
        mockRoutesLength: mockRoutesLength,
        mockStartIndex: mockLastIndex - mockRoutesLength
    }
}

/**
 * 清除路由缓存
 */ 
function unregisterRoutes() {
    Object.keys(require.cache).forEach(i => {
        if(i.includes(mockDir)){
            delete require.cache[require.resolve(i)]
        }
    })
}

const responseFake = (url, type, respond) => {
    return{
        // 匹配访问路径
        url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
        type: type || 'get',
        response(req, res){
            // instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
            res.join(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
        }
    }
}

module.exports = app => {
    //  解析app.body
    // https://expressjs.com/en/4x/api.html#req.body
    app.use(express.json())
    app.use(express.urlencoded({
        extended:true
    }))
    const mockRoutes = registerRoutes(app)
    var mockRoutesLength = mockRoutes.mockRoutesLength
    var mockStartIndex = mockRoutes.mockStartIndex
    // watch files, hot reload mock server  监视文件，热重新加载模拟服务器
    chokidar.watch(mockDir, {
        ignored: /mock-server/,
        ignoreInitial: true
    }).on('all', (event, path) => {
        if(event === 'change' || event === 'add'){
            try{
                // 删除模拟路由堆栈
                app._router.stack.splice(mockStartIndex, mockRoutesLength)

                // 清除路由缓存
                unregisterRoutes()
                
                const mockRoutes = registerRoutes(app)
                mockRoutesLength = mockRoutes.mockRoutesLength
                mockStartIndex = mockRoutes.mockStartIndex

            }catch(error){
                console.log(error);
            }
        
            
        }
    })
}



