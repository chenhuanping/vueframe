var echartMixin = {
    data(){
        return{
            chartObj:null,
            flag:true
        }
    },
    props:{
        options: {
            type: Object,
            default:function(){return {}}
        },
        data:{
            type:Object,
            
        }
    },
    watch: {
        data:{
            immediate: true,
            deep: true,
            handler(newVal, oldVal) {
                // debugger
                if(this.data && this.chartObj){ //判断定义的变量还是初始的状态， 初始状态下  Cannot read properties of null (reading 'setOption')
                    if (newVal && this.flag) {
                        this.initChart()
                        this.flag = !this.flag
                    } else {
                    }
                }
               
            }
        },
        options:{
            immediate: true,
            deep: true,
            handler(newVal, oldVal) {
                if(this.options && this.chartObj){ //判断定义的变量还是初始的状态， 初始状态下  Cannot read properties of null (reading 'setOption')
                    if (newVal && this.flag) {
                        this.initChart()
                        console.log('flag');
                        this.flag = !this.flag
                    } else {
                    }
                }
               
            }
        }
    },
    mounted(){     
        
    },
    methods:{
        // 单击
        _click(){
            let that = this;//把this赋给变量that
            this.chartObj.on("click",function (param) {
                that.$emit('click',param);//用that.$emit即可解决传值问题
            })
        },
        // 双击
        _dblclick(){
            let that = this;//把this赋给变量that
            this.chartObj.on("dblclick",function (param) {
                that.$emit('dblclick',param);//用that.$emit即可解决传值问题
            })
        },
        // 按下
        _mousedown(){
            let that = this;//把this赋给变量that
            this.chartObj.on("mousedown",function (param) {
                that.$emit('mousedown',param);//用that.$emit即可解决传值问题
            })
        },
        // 抬起
        _mouseup(){
            let that = this;//把this赋给变量that
            this.chartObj.on("mouseup",function (param) {
                that.$emit('mouseup',param);//用that.$emit即可解决传值问题
            })
        },
        // 在目标元素移动
        _mousemove(){
            let that = this;//把this赋给变量that
            this.chartObj.on("mousemove",function (param) {
                that.$emit('mousemove',param);//用that.$emit即可解决传值问题
            })
        },
        // 移入
        _mouseover(){
            let that = this;//把this赋给变量that
            this.chartObj.on("mouseover",function (param) {
                that.$emit('mouseover',param);//用that.$emit即可解决传值问题
            })
        },
        // 移出目标元素
        _mouseout(){
            let that = this;//把this赋给变量that
            this.chartObj.on("mouseout",function (param) {
                that.$emit('mouseout',param);//用that.$emit即可解决传值问题
            })
        },
        // 移出整个图表时触发
        _globalout(){
            let that = this;//把this赋给变量that
            this.chartObj.on("globalout",function (param) {
                that.$emit('globalout',param);//用that.$emit即可解决传值问题
            })
        },
        // 右键单击
        _contextmenu(){
            let that = this;//把this赋给变量that
            this.chartObj.on("contextmenu",function (param) {
                that.$emit('contextmenu',param);//用that.$emit即可解决传值问题
            })
        },
    }
}

export default echartMixin