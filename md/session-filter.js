// 登录权限过滤器
module.exports = function(option){
    if(!option){
    }
    return function(){
        var req = arguments[0];
        var res = arguments[1];
        var next = arguments[2];
        console.log(module.filename);
        next();
        // 我就试试
    }
}