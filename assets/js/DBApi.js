//  当调用$.get() $.post() $.ajax() 函数时，会优先调用ajaxProfilter() 函数  可以获取给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //  获取请求的路径地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);

    // 为header设置公共的请求token
    //  判断 带有 my 路径的所有地址 需要添加相应权限进行访问
    if (options.url.indexOf('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //  设置回调函数，阻止用户直接通过网址进入后台页面
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //  1. 清空token值
            localStorage.removeItem('token');
            //  2. 强制跳转至登录页面
            location.href = './login.html';

        }
    }
})
