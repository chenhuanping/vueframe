<template>
    <div ref="map" class="echart-map"></div>
</template>

<script>
import echartMixin from '../mixins'
import { deepMerge} from "../../../../utils/objectProces"
import { comoption,tooltip, convertMapData } from "../common"
export default {
    mixins:[echartMixin],
    name:'alMap',
     data(){
        return{
          
        }
    },
    
    computed:{
        paramsMap(){ 
            return Object.assign({
                features:[]
            },this.data);
        }
    },
    
    mounted(){
        //先去掉原来的地图
        this.$echarts.dispose(this.$refs.map); 
        //初始化图表
        // this.chartObj = this.$echarts.init(document.getElementById('echart-map'))
        this.chartObj = this.$echarts.init(this.$refs.map)
        this.initChart();
        this._click();
        this. _dblclick()
        this._mousedown()
        this. _mouseup()
        this._mousemove()
        this._mouseout()
        this._globalout()
        this._contextmenu()
    },
    methods:{
        initChart(){
            this.$echarts.registerMap('china', this.data);
            var option = {
                ...comoption,
                tooltip:{
                    ...tooltip,
                
                }, 
                 geo: {
                    map: 'china',
                    show: true,
                    roam: false,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#136bda',
                        },
                        emphasis: {
                            areaColor: '#113cda',
                        }
                    }
                    
                },
                series: [{
                    type: 'map',
                    map: 'china',
                    itemStyle: {
                        normal: {
                            areaColor: '#D9EEFF',
                            borderColor: '#fff',
                        },
                        emphasis: {
                            areaColor: '#0078ff'
                        }
                    },
                    // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
                    label: {
                         normal: {
                            formatter: function(para) {
                                return '{name|' + para.name + '}'
                            },
                            rich: {
                                cnNum: {
                                    fontSize: 11,
                                    color: '#333333',
                                    align: 'center',
                                },
                                name: {
                                    fontSize: 11,
                                    color: '#333333',
                                    align: 'center',
                                    lineHeight: 20,
                                },
                            },
                            color: '#333',
                            show: true
                        },
                    },
                    data:convertMapData(this.paramsMap.features)
                }]
            };
            
            var options = deepMerge(option,this.options)
            // console.log('options',this.options);
            this.chartObj.setOption(options)
        },

    }
}
</script>

<style lang="scss" scoped>
    .echart-map{
        width: 100%;
        height: 600px;
    }
</style>