var mongoose = require('mongoose')
var bcrypt =require('bcrypt')
mongoose.connect("mongodb://127.0.0.1:27017/Post",{
    useNewUrlParser : true ,
    useUnifiedTopology : true
})
var userSchema  = mongoose.Schema({
    
    username :{
        type: String,
        require:true
    },
    pass :{
        type: String,
        require:true
    },
   email :{
        type: String,
        require:true,
        unique:true
    },
    age : {
        type :Number,
    },
    sex : {
       type : String
    },
    address:{ 
       type :String
    },
    hobbies:{
       type :String
    }
})
userSchema.pre('save',function(next){
    var user = this
    bcrypt.hash(user.pass,10,function(err,encrypted){
        user.pass = encrypted;
        next();
    })
})
var User  = mongoose.model('User',userSchema)
module.exports = User