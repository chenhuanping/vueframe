const Mock = require('mockjs');

let list = [];
let powerList = [];
const count = 8;
// 详情
let listDetails = [];
let powerListDetails = [];

for(var i = 0; i < count; i++){
    list.push(Mock.mock(
        {
            id:1+i,
            name: '@FIRST',
            address: '@FIRST',
            time: Mock.Random.date('yyyy-MM-dd'),
            'power|1-100': 1,
            'sold|1-100':1,
            'distance|100-500':1
        }
    ))
}

for(var i = 0; i < count; i++){
    powerList.push(Mock.mock(
        {
            id:1+i,
            name: '@FIRST',
            address: '@FIRST',
            time: Mock.Random.date('yyyy-MM-dd'),
            'power|1-100': 1,
            'sold|1-100':1,
            'distance|100-500':1
        }
    ))   
}
// 拓展mock 手机号
Mock.Random.extend({
    phone: function () {
      var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
      return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
  })



module.exports = [
    {
        url:'/vue-element-admin/marketTrade/bilateral/map',
        type:'post',
        response:config => {
            const { customerType } = config.body;
            // console.log('config.body',config.body);
            if(!customerType){
                return{
                    code:50008,
                    message:'error customerType null'
                }
            }else if(customerType == '01'){
                return{
                    code:200,
                    data:list
                }
            }else if(customerType == '02'){
                return{
                    code:200,
                    data:powerList
                }
            }
            
        }
    },
    {
        url:'/vue-element-admin/marketTrade/bilateral/details',
        type:'post',
        response:config => {
            const { id , customerType} = config.body;
            // console.log('config.body',config.body);
            listDetails = list.filter(function (item, index) {
                return item.id == id
            });
            let { phone, synopsis } = Mock.mock({
                phone: '@phone',
                synopsis:Mock.Random.cparagraph( 1, 3 )
            })
            listDetails[0].phone = phone;
            listDetails[0].synopsis = synopsis;
            // console.log('listDetails',listDetails);
            powerListDetails = powerList.filter(function (item, index) {
                return item.id == id
            });
            powerListDetails[0].phone = phone;
            powerListDetails[0].synopsis = synopsis;
            // console.log('powerListDetails',powerListDetails);
            if(!customerType){
                return{
                    code:50008,
                    message:'error customerType null'
                }
            }else if(customerType == '01'){
                return{
                    code:200,
                    data:listDetails
                }
            }else if(customerType == '02'){
                return{
                    code:200,
                    data:powerListDetails
                }
            }
            
        }
    }

]

