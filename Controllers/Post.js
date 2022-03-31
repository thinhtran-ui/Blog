var MyPost = require('../Models/MyPost')
class Post {
    Home(req,res){
        let currentPage = 1
        if( req.query.page)
         currentPage = req.query.page
        let limit = 3;
        let allPost;
        MyPost.count({},(err,count)=>{
            allPost = count
            const trangcuoi = Math.ceil(allPost/limit);
            MyPost.find().sort({_id : -1}).skip((currentPage-1)*limit)
            .limit(limit)
            .then( post =>{
                res.render('Homepost.ejs',{post,allPost,currentPage,trangcuoi})
             
             
            })
        })
    }
    DetailPost(req,res){
        MyPost.findById({_id:req.params.id},(err,post)=>{
            res.render('Detailpost',{post})
        })
    }
    updateLike(req,res){

        const action = req.body.action;
        const counter = action === 'Like' ? 1 : -1;
        console.log(counter)
        MyPost.findByIdAndUpdate({_id: req.params.id}, {$inc: {like_count: counter}}, {}, (err, numberAffected) => {
           console.log(numberAffected)
            res.send('');
        });
    }
}
module.exports = new Post