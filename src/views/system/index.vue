<template>
    <div>
        <al-bar-line :data="barData" :options="options"></al-bar-line>
        <al-map :data="mapData"></al-map>
        <al-bar-line  :options="lineOptions"></al-bar-line>
    </div>
    
</template>

<script>

import { getBarData, getMapData } from '../../api/echart'

export default {
    data(){
        return{
            barData: {
                type:'02',
                merit:'merit',
                dimemsion:['dimemsion'],
                seriesData:{}
            },
            lineData: {
                type:'01',
                merit:'month',
                dimemsion:['power', 'pice'],
                seriesData:[]
            },
            mapData:{
                
            },
            options:{
                title:{
                    text:'柱状图'
                },
                series:[
                ]
            },
            lineOptions:{
                title:{
                    text:'柱状图'
                },
                xAxis:[
                    {
                        data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    }
                ],
                yAxis: [
                    {   type:'value',
                        name: 'bar',
                        
                        position: 'left',
                        
                    },
                    {   type:'value',
                        name: 'line',
                        position: 'right',
                        
                    }
                ],
                series:[
                    {
                        name:'bar',
                        type:'bar',
                        yAxisIndex:0,
                        data:[380, 520, 410, 440, 620, 280, 380, 430, 470, 370, 780, 400,]
                    },
                    {
                        name:'line',
                        type:'line',
                        yAxisIndex:1,
                        data: [580, 520, 480, 440, 680, 280, 780, 430, 470, 370, 780, 900,]

                    }
                ]
            } 
        }
    },
    created(){
        this.getbarData()
        this.getmapData()
    },
    methods:{
        async getbarData(){
            const { data:{data} } = await getBarData();
            console.log('data',data);
            this.barData.seriesData = data.bardataTwo;
            // this.barData.dimemsion = data.bardataTwo.dimemsion;
            console.log('this.barData.seriesData',this.barData.seriesData);
            this.lineData.seriesData = data.bardataOne
            
        },
        async getmapData(){
            const { data } = await getMapData();
            this.mapData = data.chinaJson
            // console.log('data',data);
            
        },
    }
}
</script>

<style lang="scss" scoped>

</style>