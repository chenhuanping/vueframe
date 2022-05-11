const piedata = require('./pie')
// const bardata =require('./bar')
const data =require('./bar')
const mapdata = require('./map/china')
const scatterdata = require('./scatter')
module.exports = [
    {
        url:'/vue-element-admin/echart/pie',
        type: 'get',
        response: config => {
        // const { token } = config.query
        // const info = users[token]
            // mock error
            if (!piedata) {
                return {
                code: 50008,
                message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 200,
                data: piedata
            }
        }
      },
      {
        url:'/vue-element-admin/echart/bar',
        type: 'get',
        response: config => {
        // const { token } = config.query
        // const info = users[token]
            // mock error
            if (!data) {
                return {
                code: 50008,
                message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 200,
                data: data
            }
        }
      },
      {
        url:'/vue-element-admin/echart/map',
        type: 'get',
        response: config => {
        // const { token } = config.query
        // const info = users[token]
            // mock error
            if (!mapdata) {
                return {
                code: 50008,
                message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 200,
                data: mapdata
            }
        }
      },
      {
        url:'/vue-element-admin/echart/scatter',
        type: 'get',
        response: config => {
        // const { token } = config.query
        // const info = users[token]
            // mock error
            if (!scatterdata) {
                return {
                code: 50008,
                message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 200,
                data: scatterdata
            }
        }
      },
]