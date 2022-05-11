<template>
    <div v-if="detailsData.length != 0">
        <div>
            <div class="name">
                <span>{{detailsData[0].name}}</span>
                <span class="back" @click="goback">{{'< 返回'}}</span>
            </div>
            <div class="address">
                <span>{{detailsData[0].address}}</span>
                <span>{{detailsData[0].distance > 500 ? '>500m':detailsData[0].distance+'m'}}</span>
            </div>
            <div>{{detailsData[0].phone}}</div>
            <div>
                <span>{{'预'+purchase + '电量'}}</span>
                <span>{{detailsData[0].power +'MWh'}}</span> 
            </div> 
            <div>
                <span>{{ '近半年已'+purchase+'电量：'}}</span>
                <span>{{detailsData[0].sold +'MWh'}}</span>
            </div>
            <div class="synopsis">
                <span>公司简介：</span>
                <span>{{detailsData[0].synopsis}}</span>
            </div>
        </div>
        <div class="trend-link"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
           detailsData:[],
           dePurchase:''
            
        }
    },
    props:{
        data:{
            type:Array,
            default:function(){
                return []
            }
        },
        purchase:String
        
    },
    watch:{
       data(newVal, oldVal){
           if(newVal && this.data){
               this.detailsData = newVal;
           }
       },
        purchase(newVal, oldVal){
            if(newVal && this.purchase){
                this.dePurchase = newVal;
            }
        }
    },
    mounted(){
        console.log('this.data',this.data);
        console.log('purchase',this.purchase);
    },
    methods:{
        // getData(val){
        //     if(val){
        //         this.detailsData = val;
        //         console.log('val',val);
        //     }
        // }
        goback(){
            this.detailsData = [];
            this.$emit('goback');
        }
    }
}
</script>

<style lang="scss" scoped>
    .back{
        cursor: pointer
    }
</style>