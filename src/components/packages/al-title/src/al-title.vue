<template>
    <div class="a-title">
        <div class="title" :class="{'border-left': borderLeft}"><slot name="title-one">{{title}}</slot></div>
        <div class="unit" :class="{'title-right':  isRight}"><slot name="title-two">{{unit}}</slot></div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'alTitle',
    data(){
        return{
            isRight:''
        }
    },
    props:{
        title:{
            type:String,
            defualt:''
        },
        unit:{
            type:String,
            defualt:''
        },
        background:{
            type:String,
            defualt:''
        },
        right:Boolean,
        borderLeft:Boolean
    },
    
    created(){
        this.getSlot()
    },
    mounted(){
        var titleNode = document.getElementsByClassName('a-title')[0]
        this.backgroundColor(titleNode)
    },
    methods:{
       getSlot(){
           if(this.$slots.hasOwnProperty('default')){
               this.isRight = !this.right
           }else{
               this.isRight = this.right    
           }
       },
       backgroundColor(node){
           if(this.background){
               node.style['background'] = this.background;
           }else if(this.background === ''){
               node.style['background'] ='rgba(2,127,204,0.05)'
           }else{
               node.style['background'] =''
           }
       }
    }

}
</script>
<style lang="scss" scoped>
    .a-title{
        line-height: 36px; 
        padding: 0 10px;
        // border: 1px solid #0270cf;
        position: relative;
        div{
            display: inline-block;
            font-size: 16px;
            line-height: 18px;
        }
         .title{
             margin-right: 20px;
         }
    }
    .title-right{
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translate(0, -50%);
    }
    // .border-left::before{
    //     content: '|';
    //     width: 4px;
    //     font-size: 20px;
    //     font-weight: 600;
    //     padding-right: 10px;
    //     line-height: 36px;
    //     color: blue;
    // }
    .border-left{
        border-left: 4px solid #0270cf;
        padding-left: 10px;
    }
    .a-title-background{
        background: rgba(2,127,204,0.05);
    }
</style>