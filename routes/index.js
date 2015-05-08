var express = require('express');
// md5加密
var crypto = require('crypto');

var router = express.Router();
// 用户业务
var userService = require('../service/UserService')


router.use(function(req,res,next){
    res.setHeader('Content-Type','text/html;charset=utf-8');
    next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});



// 注册页面
router.get('/reg',function(req,res){
    res.render('reg');
})


// 用户注册
router.post('/reg',function(req,res){
    if(!req.body.email){
        res.locals.error = '邮箱不能为空!';
        return res.render('reg');
    }
    if(!req.body.password){
        res.locals.error = '密码不能为空!';
        return res.render('reg');
    }
    // 对密码加密
    var md5 = crypto.createHash('md5');
    var user = {email:req.body.email,password:md5.update(req.body.password).digest('hex'),createDate:new Date()};
    userService.save(user,function(err,retUser){
        if(err){
            console.log('err:'+err);
            res.locals.error = '注册失败!';
            return res.render('reg');
            // res.redirect('back');
        }else{
            // 注册成功并且登录
            req.session.user = retUser;
            res.locals.user = retUser;
            return res.render('note/index');
        }
    })
})

//  用户登录视图
router.get('/login',function(req,res){
    res.render('login');
    // 返回到登录视图
})

//  用户登录
router.post('/login',function(req,res){
    if(!req.body.email){
        res.locals.error = '邮箱不能为空!';
        return res.render('login');
    }
    if(!req.body.password){
        res.locals.error = '密码不能为空!';
        return res.render('login');
    }
    userService.get(req.body.email,function(err,row){
        if(err){
            res.locals.error = '登录失败!';
            return res.render('login');
        }
        if(!row){
            res.locals.error = '此用户不存在!';
            return res.render('login');
        }
        var md5 = crypto.createHash('md5');
        if(md5.update(req.body.password).digest('hex') == row.password){
            res.locals.user = row; // 返回视图使用
            req.session.user = row; //session使用
            return res.render('note/index');
        }else{
            res.locals.error = '用户名或者密码不正确!';
            return res.render('login');
        }
    })
})

// 用户退出
router.get('/logout',function(req,res){
    req.session.user = null;
    res.redirect('login');
})

module.exports = router;
