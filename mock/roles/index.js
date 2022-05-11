// import Mock from 'mockjs'
const routes = require('../data')
const edRoutes = require('./data')

// import routes from '../data'
// import edRoutes from './data'

const roles = [
    {
        key:'admin',
        name:'admin',
        description:'have access to view all pages',
        routes:routes
    },
    {
        key:'editor',
        name:'editor',
        description:'have access to view some pages',
        routes:edRoutes
    }

]

module.exports = [
    // mock get all routes form server
    {
        url: '/vue-element-admin/routes',
        type:'get',
        response: _ =>{
            return{
                code:200,
                data:routes
            }
        }
    },
    // mock get all roles form server
    {
        url: '/vue-element-admin/roles',
        type:'get',
        response: _ =>{
            return{
                code:200,
                data:roles
            }
        }
    },

]