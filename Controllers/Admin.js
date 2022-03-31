const User = require('../Models/User')
var MyPost = require('../Models/MyPost')
var bcrypt =require('bcrypt')
class Admin {
    login(req,res){
        var {email,pass} = req.body
        User.findOne({email},function(err,User){
            if(User){
                bcrypt.compare(pass,User.pass,function(err,compare){
                    if(compare){
                        req.session.userid=User._id
                        MyPost.find({userId:req.session.userid},(err,post)=>{
                            if(err)
                            console.log(err)
                            else{
                                res.render('HomeAdmin',{post})
                            }              
                        })
                    }
                    else{
                        res.render('Login',{
                            checkpass : 'Mật khẩu không hợp lệ'
                        })
                    }
                })
            }
            else
            res.render('Login',{
                checkemail : 'Email không tồn tại'
            })
        })
    }
    validateregister(req,res,next){
        var {email} = req.body 
        let usernameErr= ""
        let passErr = ""
        let emailErr= ""
        if(!req.body.username){
             usernameErr = "Không được để trống"
        }
        if(!req.body.pass){
             passErr = "Không được để trống"
        }
        if(!req.body.email){
             emailErr = "Không được để trống"
        }
        User.findOne({email},function(err,User){
            if(User){
                emailErr = "Email đã tồn tại"
                res.render('Register',{usernameErr,passErr,emailErr})
            }
            else{
                if(!req.body.username||!req.body.pass){
                    res.render('Register',{usernameErr,passErr,emailErr})    
                }
                else
                next()  
            }
        })
    }
    register(req,res){
        var newUser = new User({
            username : req.body.username,
            pass   : req.body.pass,
            email  : req.body.email,
        })
        newUser.save(err=>{
            if(err){
                return res.redirect('/admin/dangki')
            }
            res.redirect('/admin')
        })
     
    }
    checkSession(req,res,next){
        if(req.session.userid){
            MyPost.find({userId:req.session.userid},(err,post)=>{
                if(err)
                console.log(err)
                else{
                    res.render('HomeAdmin',{post})
                }
            })
        }
        else 
        next()
    }
    /*------------add-----------*/
    addView(req,res){
        if(req.session.userid){
            User.findById(req.session.userid,(err,user)=>{
                res.render('AdminThem',{user})
            })
        }
        else
        res.redirect('/admin')
    }
    addValidate(req,res,next){
        var usernameErr = "" 
        var tittleErr="" 
        var contentErr ="";
        if(!req.body.username){
            usernameErr="Vui lòng nhập tên tác giả"
        }
        if(!req.body.tittle){
            tittleErr="Vui lòng nhập tên bài viết"
        }
        if(!req.body.username||!req.body.tittle||!req.body.content)
        {
            User.findById(req.session.userid,(err,user)=>{
                res.render('AdminThem',{user,usernameErr, tittleErr,contentErr})
            })
        }
     
        else 
        next();
    }
    addPost(req,res){
        var img = "download.png";
        if(req.files){
            var {image} = req.files;
             img =image.name;
            var mypath = `public/img/`+ image.name;
            image.mv(mypath,(Error)=>{
                if(Error){
                    console.log('Đã có lỗi')
                }

            })
        }    
        var newPost = new MyPost({
            username : req.body.username,
            tittle : req.body.tittle,
            subtittle : req.body.subtittle,
            Content : req.body.content,
            img : img,
            userId :req.session.userid
           }) 
           newPost.save(err=>{
             if (err) return handleError(err);
            else
            {
                User.findById(req.session.userid,(err,user)=>{
                console.log(user)
                res.render('AdminThem',{user})
            })
            }
           })  
    }
    /*----------delete post--------------*/
    deletePost(req,res){
        MyPost.deleteOne({ _id: req.query.id }, function(err) {
            if (!err) {
                MyPost.find({userId:req.session.userid},(err,post)=>{
                    if(err)
                    console.log(err)
                    else{
                        res.redirect('/admin')
                    }
                })
                 
            }
            else {
                console.log(err)
            }
        });
        
    }
     /*----------edit post--------------*/
    editView(req,res){
        MyPost.findById(req.query.id,(err,post)=>{
            res.render('AdminEdit',{post})
        })
    }
    editPost(req,res){
        var {username,tittle,subtittle,content}=req.body
        var img = "download.png";
        if(req.body.img){
            img= req.body.img
        }
        MyPost.findByIdAndUpdate(req.query.id,{
            "username" : username,
            "tittle": tittle,
            "subtittle" :subtittle,
            "Content" : content,
            "img":img,
            $push:{
                updateDate:[Date.now()]
            }
        },function(err,result){
            if(err)
            res.send(err)
            else
            MyPost.findById(req.query.id,(err,post)=>{
                res.render('AdminEdit',{post})
            })

        })
    }
    profile(req,res){
        User.findById(req.session.userid,(err,user)=>{
            res.render('Profile',{user})
        })
    }
    editProfileView(req,res){
        User.findById(req.query.id,(err,user)=>{
            res.render('EditProfile',{user})      
        })
    }
    editProfile(req,res){
        var {username,email,age,sex,address,hobbies}=req.body
        User.findByIdAndUpdate(req.query.id,{
            "username" : username,
            "email": email,
            "age" :age,
            "sex" : sex,
            "address" : address,
            "hobbies" : hobbies,
            
        },function(err,result){
            if(err)
            res.send(err)
            else
            User.findById(req.query.id,(err,user)=>{
                res.render('Profile',{user})
            })

        })
    }
}
module.exports= new Admin