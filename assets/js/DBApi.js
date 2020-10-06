//  当调用$.get() $.post() $.ajax() 函数时，会优先调用ajaxProfilter() 函数  可以获取给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //  获取请求的路径地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);
})