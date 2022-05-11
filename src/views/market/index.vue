<template>
    <!-- <div>市场主题管理</div> -->
    <div>
        <div>
            <al-pie 
            :data="echartData"
            :options="options"            
            @click="_click"  
            @dblclick="_dblclick"   
            @mousedown="_mousedown" 
            @mousemove="_mousemove" 
            @mouseup="_mouseup"  
             @mouseout="_mouseout" 
            @mouseover="_mouseover" 
            @globalout="_globalout"
            @contextmenu="_contextmenu"
        >
        </al-pie>
        </div>
        <el-button @click="change">goto</el-button>
        <!-- <al-scatter   :options="scatterOption"></al-scatter>
        <al-scatter  :data="scatterOne" :options="scatterOption"></al-scatter> -->
    </div>
</template>

<script>
import { getdata, getScatterData } from '../../api/echart'

export default {
    data(){
        return{ 
            echartData:{
                type:'01',
                merit:'name',
                dimemsion:['value'],
                seriesData:[]
            },
            scatterData:{
                type:'02',
                seriesData:[]
            },
            scatterOne:{
                type:'01',
                merit:'pow',
                dimemsion:['price','total'],
                seriesData:[]
            },
            options:{
                title: {
                        text: '饼图',
                        subtext: 'Fake Data',
                    }, 
                    series:[
                        {
                            name: 'pie',
                            type: 'pie',
                            radius: '50%',
                            data:[
                                { value: 1048, name: 'Search Engine111' },
                                { value: 735, name: 'Direct222' },
                                { value: 580, name: 'Email333' },
                                { value: 484, name: '444' },
                                { value: 300, name: '555' }
                            ]
                        }
                    ]
            } ,
            scatterOption:{
                series:[
                    {    
                       data:[
                            [10.0, 7.46],
                            [8.0, 6.77],
                            [13.0, 12.74],
                            [9.0, 7.11],
                            [11.0, 7.81],
                            [14.0, 8.84],
                            [6.0, 6.08],
                            [4.0, 5.39],
                            [12.0, 8.15],
                            [7.0, 6.42],
                            [5.0, 5.73]
                        ] 
                    }
                ]
            },
            pieparam:''
        }
    },
    mounted(){
        this.getpieData()
        this.getscatterData()
       
    },
    methods:{
        change(){
            // console.log('this.$router',this.$store);
            this.$router.push({
                    path:'/market/detail',
                    query: {pie: this.pieparam}
                });
            

        },
        async getpieData(){

            const { data } = await getdata();
            console.log('data',data);
            this.echartData.seriesData = data.piedata;
            // 在不单独传data的情况下，即series[0].data在options中传，需要使用this.$set()方法，更新数组对象中的数据
            // this.options.series[0].data = data.piedata
            // this.$set(this.options, this.options.series, this.options.series[0].data)
        },
        async getscatterData(){
            const { data } = await getScatterData();
            // console.log('data',data);
            this.scatterData.seriesData = data.scatterdata.dataTwo;
            this.scatterOne.seriesData = data.scatterdata.dataOne
        },
        _click(param){ 
            this.options = {
                 title: {
                        text: '饼图chnage',
                        subtext: '莫测的女的举办的',
                    }, 
                    series:[
                        {
                            name: 'pie',
                            type: 'pie',
                            radius: '50%'
                        }
                    ]
            }
            this.pieparam = param;
            console.log(param);
            // this.$router.push({
            //         path:'/market/detail',
            //         query: {pie: this.pieparam}
            //     });
            // console.log('点击pie',this.pieparam); 

        },
        _dblclick(param){ 
            console.log('dblclick',param);
        },
         _mousedown(param){ 
            console.log('mousedown',param);
        },
         _mouseup(param){ 
            console.log('mouseup',param);
        },
         _mousemove(param){ 
            console.log('mousemove',param);
        },
         _mouseover(param){ 
            console.log('mouseover',param);
        },
         _mouseout(param){ 
            console.log('mouseout',param);
        },
         _globalout(param){ 
            console.log('globalout',param);
        },
         _contextmenu(param){ 
            console.log('contextmenu',param);
        },
    }
    
}
</script>

<style lang="scss" scoped>

</style>