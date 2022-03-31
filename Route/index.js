const admin  = require('./Admin')
const post = require('./Post')
function Route(app){
    app.use('/admin',admin)
    app.use('/',post)
}   
module.exports = Route