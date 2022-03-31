const express = require('express')
const path  = require('path')
const app = express()
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')
var session = require('express-session')

const MongoStore = require('connect-mongo');
const port = 3000
const route = require('./Route/index')
app.use(session({
    secret:'secret',
    store: MongoStore.create({mongoUrl:'mongodb://127.0.0.1:27017/Post'})
 
}))
app.use(fileUpload())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(express.static(path.join(__dirname,'public')))
app.set('views', './Views')
app.set('view engine','ejs')

route(app);
app.listen(port, () => {
})