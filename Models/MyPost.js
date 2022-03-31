var mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/Post",{
    useNewUrlParser : true ,
    useUnifiedTopology : true
})
var postSchema  = mongoose.Schema({
    username : String,
    tittle : String,
    subtittle : String,
    Content : String,
    img : String,
    date :{
        type : Date,
        default : new Date()
    },
    updateDate: [
        {
            type : Date,
            default : new Date() 
        }
    ],
    userId:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref:'User'
        }
    ],
    like_count :{
        type : Number,
        default :0
    }
})
var Post  = mongoose.model('Post',postSchema)
module.exports = Post