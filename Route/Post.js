const Post = require('../Controllers/Post')
var express = require('express')
var router = express.Router()
router.get('/Post/:id',Post.DetailPost)
router.get('/',Post.Home)
router.post('/Post/:id/act', Post.updateLike);
module.exports = router