const admin = require('../Controllers/Admin')
var express = require('express')
var router = express.Router()

router.get('/',admin.checkSession,(req,res)=>{
    res.render('Login')
})
router.post('/',admin.login)

router.get('/dangki',(req,res)=>{
    res.render('Register')
})

router.post('/dangki',admin.validateregister,admin.register)


router.get('/logout',(req,res)=>{
    req.session.userid=null
    res.redirect('/admin')
})
router.get('/them',admin.addView)
router.post('/them',admin.addValidate,admin.addPost)

router.get('/delete',admin.deletePost)
router.get('/edit',admin.editView)
router.post('/edit',admin.editPost)
router.get('/profile',admin.profile)
router.get('/editProfile',admin.editProfileView)
router.post('/editProfile',admin.editProfile)
module.exports=router