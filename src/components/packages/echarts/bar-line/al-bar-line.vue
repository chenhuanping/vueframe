<template>
    <div ref="bar" class="echart-bar"></div>
   
</template>

<script>
import echartMixin from '../mixins'
import { deepMerge} from "../../../../utils/objectProces"
import { comoption,tooltip, xAxisLine, yAxisLine, seriesBarData, seriesBarAttribute } from "../common"

export default {
    name:'alBarLine',
    mixins:[echartMixin],
    data(){
        return{}
    },
    props:{
        data:{
            default:function(){
                return {
                    type:'01',
                    merit:'',
                    dimemsion:[],
                    seriesData:[]
                }
            }
        }
    },
    computed:{
        optionsDefault(){
            return Object.assign({
               series :[]
            },this.options);
        }
    },
   

    mounted(){
        //初始化图表,ref解决组件多次调用出现id重复问题
        this.chartObj = this.$echarts.init(this.$refs.bar)
        this.select()
        this._click();
        this. _dblclick()
        this._mousedown()
        this. _mouseup()
        this._mousemove()
        this._mouseout()
        this._globalout()
        this._contextmenu()
    },
    created(){ 
        
    },
    methods:{
        initChart(){
            // debugger
            var option = {
                ...comoption,
                tooltip:{
                    ...tooltip,
                    trigger: 'axis'
                },
                 xAxis: {
                    ...xAxisLine,
                    type: 'category',
                    // data: this.params.merit
                    data: [...seriesBarData(this.data.type, this.data.merit, this.data.dimemsion, this.data.seriesData).xAxiData]
                    
                },
                yAxis: {
                    yAxisLine,
                    type: 'value'
                }, 
                // 判断是否传data，如果没有传data，只传了options，则根据series的长度，给series[i]添加基础样式
                series: this.data.seriesData.length === 0 ? seriesBarAttribute(this.options.series) : [...seriesBarData(this.data.type, this.data.merit, this.data.dimemsion, this.data.seriesData).seriesItem]
                    
            };
            
            var options = deepMerge(option,this.options)
            // console.log('options',options);
            this.chartObj.setOption(options)
             
        },
        // 判断是否只传options，只传options，则执行initChart
        select(){
            if(this.data.seriesData.length === 0){
                this.initChart()
            }
        }

    }
}
</script>

<style lang="scss" scoped>
    .echart-bar{width: 100%;min-height: 400px;}
</style>