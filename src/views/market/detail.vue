<template>
    <div>
        <al-title title="标题" unit="单位：kwh" right borderLeft background="#fff">
            <el-button size="medium" class="title-right">click</el-button>
            <!-- <div class="title-right">所代表的规范与不变酒店房间的能代表</div> -->
        </al-title>
        <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"  
            stripe
            style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180"
                height="50"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180"
                height="50"
            >
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址"
                height="50"
            >
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 40]" 
                :page-size="pagesize"        
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length">    
        </el-pagination>
         <!-- <al-bar-line :data="chartData"></al-bar-line> -->
         <al-tinymce></al-tinymce>
    </div>
</template>

<script>
import { getTable,getBarData } from '../../api/echart'

export default {

    data(){
        return{
            currentPage:1, //初始页
            pagesize:10,    //    每页的数据
            tableData:[] ,
            chartData: {
                merit:[],
                dimemsion:[]
            },
        }
    },
    created(){
        this.getquery()
        this.getTable()
        // this.getbarData()
    },
    methods:{
        getquery(){  
            const query = this.$route.query.pie;
            console.log('query',query);
        },
        async getTable(){
            const { data } = await getTable()
            this.tableData = data.tableData
            console.log('this.tableData',this.tableData);
        },
        // async getbarData(){
        //     const { data } = await getBarData();
        //     // console.log('data',data);
        //     this.chartData.merit = data.bardata.merit;
        //     this.chartData.dimemsion = data.bardata.dimemsion;
            
        // },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
    },
    watch: {
        '$route': 'getquery'
    }
}
</script>

<style lang="scss" scoped>
    .el-table{
        margin-top: 20px;
        padding: 20px;
        /depp/.el-table__header-wrapper{
            .el-table__header{
                .has-gutter{
                    tr{
                        height: 50px;
                    }
                }
            }
        }
    }
    .el-pagination{
        padding: 20px 0px 20px 20px;
        text-align: left;
        background: #fff;
    }
</style>