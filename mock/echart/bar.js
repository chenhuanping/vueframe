const bardataOne = [
    { month:'1月', power:580, pice:1.5 },
    { month:'2月', power:540, pice:1.1 },
    { month:'3月', power:530, pice:1.2 },
    { month:'4月', power:560, pice:1.1 },
    { month:'5月', power:580, pice:1.5 },
    { month:'6月', power:540, pice:1.1 },
    { month:'7月', power:530, pice:1.2 },
    { month:'8月', power:560, pice:1.4 },
    { month:'9月', power:590, pice:1.5 },
    { month:'10月', power:640, pice:1.3 },
    { month:'11月', power:430, pice:1.2 },
    { month:'12月', power:860, pice:1.0 },
]
// const bardata = [
//     {
//         name: 'Email',
//         type: 'line',
//         stack: 'Total',
//         data: [120, 132, 101, 134, 90, 230, 210]
//     },
//     {
//         name: 'Union Ads',
//         type: 'line',
//         stack: 'Total',
//         data: [220, 182, 191, 234, 290, 330, 310]
//     },
//     {
//         name: 'Video Ads',
//         type: 'line',
//         stack: 'Total',
//         data: [150, 232, 201, 154, 190, 330, 410]
//     },
// ]
const bardata = {
    merit:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    dimemsion:[
        {name:'Email', type:'line',data:[580, 520, 480, 440, 680, 280, 780, 430, 470, 370, 780, 900,]},
        {name:'Video Ads', type:'bar',data:[580, 520, 480, 440, 680, 280, 780, 430, 470, 370, 780, 900,]}
    ]
}

const data = {
    bardataOne : [
        { month:'1月', power:580, pice:1.5 },
        { month:'2月', power:540, pice:1.1 },
        { month:'3月', power:530, pice:1.2 },
        { month:'4月', power:560, pice:1.1 },
        { month:'5月', power:580, pice:1.5 },
        { month:'6月', power:540, pice:1.1 },
        { month:'7月', power:530, pice:1.2 },
        { month:'8月', power:560, pice:1.4 },
        { month:'9月', power:590, pice:1.5 },
        { month:'10月', power:640, pice:1.3 },
        { month:'11月', power:430, pice:1.2 },
        { month:'12月', power:860, pice:1.0 },
    ],
    bardataTwo:{
        merit:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        dimemsion:[
            {name:'Email', type:'line',data:[580, 520, 480, 440, 680, 280, 780, 430, 470, 370, 780, 900,]},
            {name:'Video Ads', type:'bar',data:[580, 520, 480, 440, 680, 280, 780, 430, 470, 370, 780, 900,]},
            {name:'Ads', type:'bar',data:[380, 520, 410, 440, 620, 280, 380, 430, 470, 370, 780, 400,]}
        ]
    }
}

module.exports = {
    data
}