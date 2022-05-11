const menu = [
    {
      "id": "3",
      "pid": "0",
      "name": "系统设置",
      "icon": "el-icon-s-opportunity",
      "children": [
        {
          "id": "31",
          "pid": "3",
          "name": "基础信息",
          "url": "/setting/base"
        },
        {
          "id": "33",
          "pid": "3",
          "name": "岗位管理",
          "url": "/setting/role",
          "children":[
              {
                "id": "333",
                "pid": "33",
                "name": "web前端开发",
                "url": "/market/index", 
              }  
          ]
        }
      ]
    }
  ]
 module.exports = {menu}; 