const tableData = require('./data')

module.exports = [
    {
        url:'/vue-element-admin/echart/table',
        type: 'get',
        response: config => {
        // const { token } = config.query
        // const info = users[token]
            // mock error
            if (!tableData) {
                return {
                code: 508,
                message: 'Login failed, unable to get user details.'
                }
            }
            return {
                code: 200,
                data: tableData
            }
        }
      },
]