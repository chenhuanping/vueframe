 const menu = [
    {
      "id": "1",
      "pid": "0",
      "name": "首页",
      "icon": "el-icon-s-opportunity",
      "url": "/home/index",
      "status":true,
      "children":[]
    },
    {
      "id": "2",
      "pid": "0",
      "name": "市场交易",
      "status":true,
      "icon": "el-icon-s-opportunity",
      "children": [
        {
          "id": "21",
          "pid": "2",
          "name": "双边交易",
          "status":true,
          "url": "/marketTrade/bilateral",
          "children":[
            {
              "id": "211",
              "pid": "11",
              "name": "我的申报信息",
              "url": "/marketTrade/bilateral/declare", 
              "status":true
            },
            {
              "id": "212",
              "pid": "12",
              "name": "我的确认信息",
              "url": "/marketTrade/bilateral/confirm", 
              "status":true
            },
            {
              "id": "213",
              "pid": "13",
              "name": "双边地图交易",
              "url": "/marketTrade/bilateral/map",  
              "status":true
            }
          ]
        },
        {
          "id": "22",
          "pid": "3",
          "name": "挂牌交易",
          "status":true,
          "url": "/marketTrade/listing",
          "children":[
              {
                "id": "221",
                "pid": "33",
                "name": "交易信息",
                "url": "/marketTrade/listing/info", 
                "status":true
              },
              {
                "id": "222",
                "pid": "33",
                "name": "摘牌市场",
                "url": "/marketTrade/listing/delisting", 
                "status":true
              },
              {
                "id": "223",
                "pid": "35",
                "name": "挂牌市场",
                "url": "/marketTrade/listing/market", 
                "status":true
              }
          ]
        }
      ]
    },

    {
      "id": "3",
      "pid": "0",
      "name": "系统设置",
      "status":true,
      "icon": "el-icon-s-opportunity",
      "children": [
        {
          "id": "31",
          "pid": "3",
          "name": "基础信息",
          "status":true,
          "url": "/setting/base",
          "children":[]
        },
        {
          "id": "32",
          "pid": "3",
          "name": "职员管理",
          "status":true,
          "url": "/setting/user",
          "children":[]
        },
        {
          "id": "33",
          "pid": "3",
          "name": "岗位管理",
          "url": "/setting/role",
          "status":true,
          "children":[
              {
                "id": "333",
                "pid": "33",
                "name": "market",
                "url": "/market/index", 
                "status":true
              },
              {
                "id": "334",
                "pid": "33",
                "name": "system",
                "url": "/system/index", 
                "status":true
              },
              {
                "id": "335",
                "pid": "35",
                "name": "detail",
                "url": "/market/detail", 
                "status":false
              }
          ]
        }
      ]
    }
  ]
  module.exports = {menu}; 