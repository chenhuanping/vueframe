/**
 * 数组是否存在某个值
*/
Array.prototype.contains = function (obj) {  
    var i = this.length;  
	// while(i--) 先判断while(i)是否为true -->i为0时是false,再i--，然后执行{}
    while (i--) { 	
        if (this[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
}

/**
 * 数组中最大值 最小值
 * @param array
 * @returns
 */
 Array.prototype.max = function(){ 
	return Math.max.apply({},this) ;
} ;
Array.prototype.min = function(){ 
	return Math.min.apply({},this) ;
} ;


/**
 * 判断对象中是否存在某个属性
 * @param {Object} obj 
 * @param {String} key 
 */
export function doexist(obj,key){
    return obj.hasOwnProperty(obj[key])
}


/**
 * 深合并对象
 * @param oldObj  object对象
 * @param newObj  object对象
 */
 export function deepMerge(oldObj, newObj) {
	var  key;
    var data = deepCopy(oldObj)
	for (key in newObj) {
	  // 如果target(也就是oldObj[key])存在，且是对象的话再去调用deepMerge，否则就是oldObj[key]里面没这个对象，需要与newObj[key]合并
	  // 如果newObj[key]没有值或者值不是对象，此时直接替换oldObj[key]
	//   data[key] =
    //   data[key] &&
    //   data[key].toString() === "[object Object]" &&
    //     (newObj[key] && newObj[key].toString() === "[object Object]")
    //     ? deepMerge(data[key], newObj[key])
    //     : (data[key] = newObj[key]);

        if( data[key] && data[key].toString() === "[object Object]" && (newObj[key] && newObj[key].toString() === "[object Object]")){
            data[key] = deepMerge(data[key], newObj[key])
        }else if(Object.prototype.toString.call(data[key]) === '[object Array]' && Object.prototype.toString.call(newObj[key]) === '[object Array]'){
             // 两个都是数组，进行合并
            // data[key] = data[key].concat(newObj[key]);
            for(var i = 0; i < newObj[key].length; i++){
                data[key][i] = {...data[key][i],...newObj[key][i]}
            }
        }else{
            data[key] = newObj[key]
        }
	}
	return data;
}

/**
 * 深拷贝对象
 * @param {Object} obj 对象
 * @returns 
 */
function deepCopy(obj) {
    let target = {};
    function isRef(obj) {
        return Object.prototype.toString.call(obj).toLowerCase()==="[object object]"||Object.prototype.toString.call(obj).toLowerCase()==="[object array]"
    }
    function _copy(obj,hash = new WeakMap()) {
        let cloneObj;
        let Constructor = obj.constructor;
        if(hash.has(obj)) return hash.get(obj);
        cloneObj = new Constructor();
        hash.set(obj, cloneObj);

        for (let key in obj) {
            //obj[key]为函数时，isRef(obj[key])返回 false，将函数地址直接赋值给cloneObj[key]
            cloneObj[key] = isRef(obj[key]) ? _copy(obj[key], hash) : obj[key];
        }
        return cloneObj;
    }
    target = _copy(obj);
    return target;

}




// /**
//  * 递归过滤节点，生成新的树结构
//  * @param {Node[]} nodes 要过滤的节点
//  * @param {node => boolean} predicate 过滤条件，符合条件的节点保留
//  * @return 过滤后的节点
//  */
//  export function deal(nodes, predicate) {
//     // 如果已经没有节点了，结束递归
//     if (!(nodes && nodes.length)) {
//         return [];
//     }
//     const newChildren = [];
//     for (const node of nodes) {
//         if (predicate(node)) {
//             // 如果节点符合条件，直接加入新的节点集
//             newChildren.push(node);
//             node.children = deal(node.children, predicate);
//         } else {
//             // 如果当前节点不符合条件，递归过滤子节点，
//             // 把符合条件的子节点提升上来，并入新节点集
//             newChildren.push(...deal(node.children, predicate));
//         }
//     }
//     return newChildren;
// }

export function convert (arr) {
    const newArr = arr.filter(item => item.status)
    return newArr.map(item => {
      if (item.children) {
        item.children = convert(item.children)
      }
      return item
    })
  }






