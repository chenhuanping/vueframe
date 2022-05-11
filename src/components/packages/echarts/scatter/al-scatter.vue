<template>
    <div ref="scatter" class="echart-scatter"></div>
</template>

<script>
import echartMixin from '../mixins'
import { deepMerge} from "../../../../utils/objectProces"
import { comoption,tooltip, xAxisLine, yAxisLine, seriesScaData, seriesScaAttribute } from "../common"
export default {
    mixins:[echartMixin],
    name:'alScatter',
    data(){
        return{}
    },
    props:{
        data:{
            default:function(){return {}}
        }
    },
    mounted(){
        //初始化图表
        // this.chartObj = this.$echarts.init(document.getElementById('echart-scatter'))
        this.chartObj = this.$echarts.init(this.$refs.scatter)
        this.select();
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
            var option = {
                ...comoption,
                tooltip:{
                    ...tooltip,
                },
                 xAxis: {
                    scale: true,
                    ...xAxisLine 
                },
                yAxis: {
                    scale: true,
                    ...yAxisLine
                },
                // 判断是否传data，如果没有传data，只传了options，则根据series的长度，给series[i]添加基础样式
                series: Object.keys(this.data).length === 0 ? seriesScaAttribute(this.options.series) : [...seriesScaData(this.data.type, this.data.merit, this.data.dimemsion, this.data.seriesData).seriesItem]
                
            };
            
            var options = deepMerge(option,this.options)
            // console.log('scatterOption',options);
            this.chartObj.setOption(options)
        },
         // 判断是否只传options，只传options，则执行initChart
        select(){
            if(Object.keys(this.data).length === 0){
                this.initChart()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .echart-scatter{width: 100%;min-height: 400px;}
</style>