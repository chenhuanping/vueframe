const comoption = {
    // 标题
    title: {
        text: '',
        subtext: '',
        left: 'left',
        textStyle:{           
            color: '#333' ,          
            fontStyle: 'normal' ,            
            fontSize: 16 ,
            fontWeight: 600 ,
        },
        subtextStyle:{            
            color: '#333' ,
            fontSize: 14 ,
        }
    },
    // 图例
    legend:{
        // 图例，默认水平排列
        orient: 'horizontal' ,       
        align: 'right' ,
    }, 
    // 网格  
    grid:{
        left:60,
        right:60,
        top:60,
        bottom:20
    }

}

// tooltip 的字体样式
const tooltip = {   
    color:'#333',
    fontSize:12,
    fontStyle: 'normal' ,
    textStyle:{
        align:'left'
    }
}

// xAxis/yAxis网格刻度显示与否
const xAxisLine = {
    splitLine: {
        show: false
    },
    axisTick: {
        show: false
    },
    axisLine: {
        show: false
    }
}
const yAxisLine = {
    axisTick: {
        show: false
    },
    axisLine: {
        show: false
    }
}
// 颜色
var color = ['#61DDAA', '#60ACFC', '#65789B', '#5470C6','#91CC75']

// 处理饼图的data数据
/**
 * 
 * @param {Array} data   数组
 * @param {*} merit      指标
 * @param {*} dimension  维度
 * @returns   
 */
export function pieData( type, merit, dimension, data){
    var series = []
    if( type == '01'){
        data.forEach(function(item, index){
            var obj = {}
            obj.name = item[merit];
            obj.value = item[dimension[0]]
            series.push(obj)
        })
    }
    return series
  
}


/**
 * 处理折线图、柱状图的数据
 * @param {String} type 
 * @param {Array} merit 
 * @param {Array} dimemsion 
 * @param {Array} data 
 * @returns dataTal  返回指标（x轴）和series
 */
export function seriesBarData(type, merit, dimemsion, data){
    // series属性
    var series = []
    // 指标数据
    var xdata = [];
    // series数据
    var serData = [];
    // 方法返回的数据
    var dataTal = {xAxiData:[], seriessData:[]}
    // 维度数据
    var arr = [];
    if(type == '01' && dimemsion.length == 0){
        dimemsion.forEach(function(item, index){
            arr = [];
            xdata = []
            data.forEach(function(items, indexs){        
                xdata.push(items[merit]);
                arr.push(items[item])
            })
            serData.push(arr)
            series.push({
                type:'bar',
                barWidth:25,
                itemStyle:{                      
                    color:color[index]
                },
                data:serData[index], 
            })
        })
        
    }
    else if(type == '02'){
        series = []
        xdata = data[merit]
        data[dimemsion[0]].forEach(function(item, index){
            if( item.type == 'bar'){
                series.push({
                    name: item.name,
                    type: item.type, 
                    barWidth:25,
                    itemStyle:{                      
                        color:color[index]
                    },
                    data:item.data, 
                })
            }
            else if( item.type == 'line' ){
                series = [];
                series.push({
                    name: item.name,
                    type: item.type, 
                    itemStyle:{                      
                        color:color[index]
                    },
                    data:item.data, 
                })
            }
            
        })
    }
    dataTal.xAxiData = xdata;
    dataTal.seriesItem = series 
    return dataTal
}

/**
 * 只传options的情况下，默认series样式
 * @param {Array} arr 
 * @returns 
 */

export function seriesBarAttribute(arr){
    var array = []
    for(var i=0; i< arr.length; i++){
        array.push({
            type:'bar',
            barWidth:25,
            itemStyle:{                      
                color:color[i]
            }
        })
        
    }
    return array;
}

/**
 * 处理散点图的数据
 * @param {String} type 
 * @param {Array} merit 
 * @param {Array} dimemsion 
 * @param {Array} data 
 * @returns 
 */
 export function seriesScaData(type, merit, dimemsion, data){
    // series属性
    var series = []
    // 指标数据
    var xdata = [];
    // series数据
    var serData = [];
    // 方法返回的数据
    var dataTal = {seriessData:[]}
    // 维度数据
    var arr = [];
    if( type == '01'){
        dimemsion.forEach(function(item, index){
            arr = [];
            data.forEach(function(items, indexs){        
                arr.push([items[merit], items[item]])
            })
            serData.push(arr)
            series.push({
                type:'scatter',                
                symbolSize:10,
                itemStyle:{                      
                    color:color[index]
                },
                data:serData[index], 
            })
        })  
    }
    if(type == '02'){
        series = [];
        data.forEach(function(item,index){
            series.push({
                type:'scatter',                
                symbolSize:10,
                itemStyle:{                      
                    color:color[index]
                },
                data:item,
            })
        })
    }
    dataTal.xAxiData = xdata;
    dataTal.seriesItem = series 
    return dataTal
 }

export function seriesScaAttribute(arr){
    var array = []
    for(var i=0; i< arr.length; i++){
        array.push({
            type:'scatter',
            symbolSize:10,
            itemStyle:{                      
                color:color[i]
            }
        })
        
    }
    return array;
}

/**
 * 
 * @param {Array} data 全国/省/市/区数据数组
 * @returns 
 */
export function convertMapData (data) {
    // debugger
    var res = [];
    var geoCoordMap = {};
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].properties.name];
        if (geoCoord) {
            res.push({
                //name和value/cityCode参数根据实际项目中后台返回的参数名走；
                name: data[i].properties.name,
             });
         }
     }
    return res;
 };


export {
    comoption,
    tooltip,
    xAxisLine,
    yAxisLine
}