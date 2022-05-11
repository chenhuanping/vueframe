<template>
    <div class="search-map">
        <div class="search">
            <div class="search-type">
                <ul class="type-list">
                    <li :class="{active:isActive}" @click="marketMap">电力用户</li>
                    <li :class="{active:!isActive}" @click="powerMap">发电企业</li>
                </ul>
                <el-input @input="inputMap" @change="getMarketMap" v-model="value" placeholder="请输入内容" suffix-icon="el-icon-search" type="text"></el-input>
            </div>
            <div v-show="dataArr.length != 0 && detailsData.length == 0" class="search-list">
                <ul class="condition">
                    <li @click="sortData(distance)" :class="{typeActive:isDistance}">
                        <span>距离</span>
                        <span class="sort">
                            <i class="rise"></i>
                            <i class="drop"></i>
                        </span>
                        
                    </li>
                    <li @click="sortData(power)" :class="{typeActive:isPower}">
                        <span>{{'预'+purchase + '电量'}}</span>
                        <span class="sort">
                            <i class="rise"></i>
                            <i class="drop"></i>
                        </span>
                        
                    </li>
                    <li @click="sortData(sold)" :class="{typeActive:isSold}">
                        <span>{{'近半年'+purchase + '电量'}}</span>
                        <span class="sort">
                            <i class="rise"></i>
                            <i class="drop"></i>
                        </span>    
                    </li>
                </ul>
               <div class="card">
                    <div v-for="(item, index) in dataArr" :key="item.id" class="card-item">
                    <div class="name">
                        <div>{{ index+1 +'、'}}</div>
                        <div>{{ item.name }}</div>
                        <div @click="details(item.id)">详情 ></div>
                    </div>
                    <div class="address">
                        <div>{{ item.address }}</div>
                        <div>{{ item.distance > 500 ? '>500m' : item.distance+'m' }}</div>
                    </div>
                    <div class="time">
                        <span>入市时间：</span>
                        <span>{{ item.time }}</span>
                    </div>
                    <div class="power">
                        <span>{{ '预'+purchase+'电量：'}}</span>
                        <span>{{ item.power +'MWh'}}</span>
                    </div>
                    <div class="sold">
                        <span>{{ '近半年已'+purchase+'电量：'}}</span>
                        <span>{{ item.sold +'MWh'}}</span>
                    </div>
                        <el-button size="mini" type="primary">我要交易</el-button>
                </div>
               </div>
               
            </div>
            <div v-show="detailsData.length != 0 ">
                <Detail :data="detailsData" :purchase="purchase" ref="detail" @goback="goback"></Detail>
            </div>
        </div>
        <div id="map" ref="map" class="map"></div>
    </div>
    
</template>
<script>
import { bilateralMap, bilateralMapDetails } from '../../../api/marketTrade/bilateral'
import Detail from './components/details.vue'
export default {
    components:{
        Detail
    },
    data(){
        return{
            isActive:true,
            distanceOrder:true,
            powerOrder:true,
            soldOrder:true,
            isDistance:false,
            isPower:false,
            isSold:false,
            customerType:'01',
            value:'',
            purchase:'购',
            dataArr:[],
            detailsData:[],
            distance:'distance',
            power:'power',
            sold:'sold'
        }
    },
    computed:{
       
    },
    mounted(){
        this.map();
        this.marketMap();
    },
    methods:{
        map () {
            let map = new window.BMap.Map('map') // 创建Map实例
            map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11) // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new window.BMap.MapTypeControl({ // 添加地图类型控件
                mapTypes: [
                window.BMAP_NORMAL_MAP,
                window.BMAP_HYBRID_MAP
                ]
            }))
            map.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },

        //电力用户与发电企业
        marketMap(){
            this.customerType = '01';
            this.isActive = true;
            this.purchase = '购';
            this.dataArr = [];
            this.getMarketMap();
        },
        powerMap(){
            this.customerType = '02';
            this.isActive = false;
            this.purchase = '售';
            this.dataArr = [];
            this.getMarketMap();
        },
        inputMap(){
            if(this.value == ''){
                this.dataArr = [];
            }
        },
        async getMarketMap(){   
            if(this.value != ''){
                const { data } = await bilateralMap({ customerType:this.customerType });
                this.dataArr = data;
            }else{
                this.dataArr = [];
            }   
        },
        sortData(condition){
            if(condition == 'distance'){
                this.distanceOrder = !this.distanceOrder;
                this.isDistance = true;
                this.isPower = false;
                this.isSold = false;
                this.dataArr.sort(this.compareValue(condition, this.distanceOrder));
            }else if(condition == 'power'){
                // 控制排序
                this.powerOrder = !this.powerOrder;
                // 控制添加高亮
                this.isPower = true;
                this.isDistance = false;
                this.isSold = false;
                this.dataArr.sort(this.compareValue(condition, this.powerOrder));
            }else if(condition == 'sold'){
                this.soldOrder = !this.soldOrder;
                this.isSold = true;
                this.isDistance = false;
                this.isPower = false;
                this.dataArr.sort(this.compareValue(condition, this.soldOrder));
            }
            
            
            
        },
        // 排序
        compareValue(key,order){
            return function innerSort(a, b) {
                if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)){
                    return 0;
                }
                let comparision = 0;
                if(a[key] > b[key]){
                    comparision = 1;
                }else if(a[key] < b[key]){
                    comparision = -1;
                }
                return(
                    order == true ? (comparision * -1) : comparision
                );
            }
            
        },
        // 详情
        async details(id){
            // this.dataArr = [];
            this.detailsData = [];
            const { data } = await bilateralMapDetails({ customerType:this.customerType ,id:id });
            this.detailsData = data;
            // this.$refs.detail.getData(data);

        },
        goback(){
            this.detailsData = [];
        }


       

    }
}
</script>
<style lang="scss" scoped>
.search-map{
    width: 100%;
    height: 100%;
    position: relative;
    .map{
        width: 100%;
        height: 100%;
    }
    .search{
        position: absolute;
        width: 340px;
        z-index: 99999;
        top: 20px;
        left: 20px;
        background: #FBFBFB;
        
        .search-type{
            .type-list{
                width: 100%;
                height: 50px;
                background: #FFFFFF;
                border-radius: 4px;
                box-shadow: 0px 2px 8px 0px rgba(0,59,95,0.1);
                li{
                    margin-top: 6px;
                    width: 154px;
                    text-align: center;
                    height: 38px;
                    line-height: 38px;
                    float: left;
                    border-radius: 4px;
                }
                li:nth-child(1){
                    margin-right: 12px;
                    margin-left: 10px;
                }
                li:hover{
                   cursor: pointer; 
                }
            }
            .el-input{
                width: 300px;
                height: 40px;
                border: 1px solid #EEEEEE;
                border-radius: 4px;
                margin: 12px 20px;
                outline: 0;
            }
        }
        .search-list{
            // padding-left: 20px;
            .card{
                height: 406px;
                overflow-y: auto;
                margin-top: 12px;
                .name{
                    display: flex;
                    height: 21px;
                    line-height: 21px;
                    margin-bottom: 10px;
                    & > div:nth-child(2),& > div:nth-child(1){  
                        font-size: 16px;
                        font-weight: 600;
                    }
                    & > div:nth-child(2){
                        width: 220px;
                        margin: 0 20px 0 0px;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                    }
                     & > div:nth-child(3){
                         font-size: 12px;
                         color: #027FCC;
                         cursor: pointer;
                     }
                }
                .time,.address,.power,.sold{
                    font-size: 12px;
                    color: #666666;
                    margin-bottom: 10px;
                }
                .address{
                    display: flex;
                    & > div:nth-child(1){
                        width: 238px;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        margin-right: 20px;
                        color: #333;
                    }
                    
                }
                .el-button{
                    margin: 6px 0 0px 0;
                }
                .card-item{
                    padding: 20px 0 20px 20px;
                }
                .card-item:first-child{
                    background-color: rgba(2,127,204,0.05);
                    color: #027FCC;
                }
                .card-item:not(:last-child){
                    border-bottom: 1px solid #DDDDDD;
                }
            }
            .card::-webkit-scrollbar {/*滚动条整体样式*/
                width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
                height: 5px;
            }
            .card::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 5px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: rgba(0,0,0,0.2);
            }
            .card::-webkit-scrollbar-track {/*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 2;
                background: rgba(0,0,0,0.1);
            }
            .condition{
                width: 300px;
                height: 29px;
                background: #F5F5F5;
                border: 1px solid #EEEEEE;
                border-radius: 4px;
                line-height: 29px;
                margin: 0 auto;
                li{
                    float: left;
                    font-size: 12px;
                    padding: 0 15px;
                    color: #666666;
                    span{
                        cursor: pointer;
                        position: relative;
                    }
                    span:nth-child(1){
                        margin-right: 5px;
                    }
                    .sort{
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        .rise,.drop{
                            display: inline-block;
                            margin-right: 5px;

                        }
                        .rise{
                            border-style: solid dashed dashed;
                            border-color: #F5F5F5 transparent transparent ;
                            overflow: hidden;
                            border-width: 4px;
                            border-bottom-color: #CC3F3F;
                            position: absolute;
                            top: 3px;
                        }
                        .drop{
                             border-style: solid dashed dashed;
                            border-color: #fff transparent transparent ;
                            overflow: hidden;
                            border-width: 4px;
                            border-top-color: #DDDDDD;
                            position: absolute;
                            top: 14px;
                        }
                    }
                    
                }
                .typeActive{
                    color: #027FCC;
                    .sort{
                        .rise{
                        border-style: solid dashed dashed;
                        border-color: #F5F5F5 transparent transparent ;
                        overflow: hidden;
                        border-width: 4px;
                        border-bottom-color: #027FCC;
                        position: absolute;
                        top: 3px;
                        }
                        .drop{
                            border-style: solid dashed dashed;
                            border-color: #fff transparent transparent ;
                            overflow: hidden;
                            border-width: 4px;
                            border-top-color: #027FCC;
                            position: absolute;
                            top: 14px;
                        }
                    }
                }
            }
        }
    }

    .active{
        background: #027FCC;
        color: #FFFFFF;
    }
    
}

</style>