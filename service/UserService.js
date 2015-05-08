var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/nnote');
// 指定schema,指定字段类型和默认值
var schema = mongoose.Schema({
    'email': String,
    'password': String,
    'nickname': String,
    'name': String,
    'sex': String,
    'createDate': {type:Date,default:Date.now},
    'status': {type:String,default:'Y'}
},{collection:'user'});

// 生成对象模型
var User = mongoose.model('User', schema);

function Service() {}

// 保存方法
Service.save = function(puser,callback){
    Service.get(puser.email,function(err,row){
        if(err){
            return callback(err);
        }
        if(row) {
            return callback('此用户已存在！')
        }
        var user = new User(puser);
        user.save(function(err,retUser){
            if(err){
                return callback(err);
            }
            callback(null,retUser);
        })
    })
}

//按照email查询
Service.get = function(email,callback){
    User.findOne({'email':email},function(err,row){
        if(err){
            return callback(err);
        }
        return callback(null,row);
    })
}

// 导出用户对象
module.exports = Service;