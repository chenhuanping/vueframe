/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
export function addDynamicRoutes (menuList = [], routes = []) {
    var temp = [];
    for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].children && menuList[i].children.length > 0) {
          temp = temp.concat(menuList[i].children)
        } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
          menuList[i].url = menuList[i].url.replace(/^\\/, '');
           // 创建路由配置
           var route = {
              path: menuList[i].url,
              component: null,
              name: menuList[i].name,
              meta: {
                icon: menuList[i].icon,
                index: menuList[i].id
              }
            }
            try {
              // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
              // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
              let array = menuList[i].url.split('/')
              let url = ''
              for(let i=0; i<array.length; i++) {
                 url += array[i].substring(0,1).toLowerCase() + array[i].substring(1) + '/'
              }
              url = url.substring(0, url.length - 1);
              // console.log('url',url);
              route['component'] = resolve => require([`@/views${url}`], resolve)
            } catch (e) {
                console.log(e);
            }
          routes.push(route)
        }
      }
      if (temp.length > 0) {
        addDynamicRoutes(temp, routes)
      } else {
        // console.log('动态路由加载...')
        // console.log(routes)
        // console.log('动态路由加载完成.')
      }
      return routes
}