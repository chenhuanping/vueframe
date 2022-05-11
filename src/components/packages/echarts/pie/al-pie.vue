<template>
    <div ref="pie" class="echart-pie"></div>
   
</template>

<script>
import echartMixin from '../mixins'
import { deepMerge } from "../../../../utils/objectProces"
import { comoption, tooltip, pieData } from "../common"
export default {
    mixins:[echartMixin],
    name:'alPie',
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
        // this.chartObj = this.$echarts.init(document.getElementById('echart-pie'))
        this.chartObj = this.$echarts.init(this.$refs.pie)
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
            // debugger
            var option = {
                ...comoption,
                tooltip:{
                    // formatter: '{a} <br/>{b} : {c} ({d}%)'
                    ...tooltip,
                    formatter:function(params){
                        // console.log('params',params);
                        return [
                            '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                                    params.color +
                                    ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:auto; display:inline-block;">' +
                                        params.seriesName +'<br>'+
                                        params.name +':'+
                                        params.value+'('+ params.percent + '%)'+
                                    '</span>'
                        ].join('')
                    }
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data:Object.keys(this.data).length == 0 ? [] : [...pieData(this.data.type, this.data.merit, this.data.dimemsion, this.data.seriesData)],
                        // data:this.params.dimemsion,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            var options = deepMerge(option,this.options)
            console.log('initChart',options);
            this.chartObj.setOption(options)
        },
        // _click(){
        //     let that = this;//把this赋给变量that
        //     this.chartObj.on("click", function (param) {
        //         that.$emit('click',param);//用that.$emit即可解决传值问题
        //     })
        // }

    }
}
</script>

<style lang="scss" scoped>
    .echart-pie{width: 100%;min-height: 400px;}
</style>