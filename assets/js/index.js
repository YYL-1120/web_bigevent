$(function () {
    getUserInfo();

    $('.btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //  1. 清除本地缓存
            localStorage.removeItem('token');
            //  2. 跳转页面
            location.href = './login.html';

            //  3. 关闭询问窗
            layer.close(index);
        })
    })
});

function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            console.log(res);
            if (res.status != 0) return layer.msg('获取用户信息失败！');

            // 渲染用户的头像
            renderAvatar(res.data);
        },
       
    });
}

function renderAvatar(user) {
    console.log(user);
    //  1. 获取用户的名字  管理员名称或者是用户名称
    var uname = user.nickname || user.username;
    //  2. 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname);
    // 3. 按照需求渲染图片
    if (user.user_pic != null) {
        //  3.1 渲染图片的头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //  3.2 渲染文字的头像
        $('.text-avatar').show();
        $('.text-avatar').html(uname[0].toUpperCase());
        $('.layui-nav-img').hide();
    }

}