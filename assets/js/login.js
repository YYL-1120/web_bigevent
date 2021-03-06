/*
 * @Author: your name
 * @Date: 2020-10-06 19:02:56
 * @LastEditTime: 2020-10-07 17:57:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \10_bigThings\assets\js\login.js
 */
$(function () {
    //  点击注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //  点击登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    //  从layui中获取form对象
    var form = layui.form;

    form.verify({
        //  通过form.varify()自定义一个校验规则
        pass: [
            /^[\S]{6,12}$/,
            '密码必须是6到12位，且不能出现空格'
        ],
        repass: function (value) {
            //  通过value 获取确认密码框中的内容
            var paw = $('.reg-box [name = password]').val();
            console.log(paw);
            if (paw != value) {
                return '两次密码不一致';
            }
        }
    });


    //  监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止表单的提交行为
        e.preventDefault();
        //  2. 发送ajax的POST请求
        $.ajax({
            method: "POST",
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name = username').val(),
                password: $('#form_reg [name = password').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                console.log('注册成功');
                //  模拟人的点击行为
                $('#link_login').click();
            }
        })
    });

    //  监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        //  监听登录表单的默认行为
        e.preventDefault();
        //  设置ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功！');
                // console.log(res);
                // console.log('---------------------');
                // console.log($(this));
                // console.log($(this).serialize());
                // console.log($('#form_login'));
                // console.log($('#form_login').serialize());
                //  获取权限
                //  将登陆成功获取的token值保存到localStorage 中
                localStorage.setItem('token', res.token);
                // console.log(res.token);


                //  跳转至后台页面
                location.href = './index.html';
            }
        });

    });

})