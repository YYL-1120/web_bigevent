$(function () {
    // 1. 设置昵称的验证规则
    var form = layui.form;

    //  2. 设置自定义的验证规则
    form.verify({
        //  value 即为表单中的值
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度需要为1~6个字符之间！';
            }
        }
    });

    innitUserInfo();

    //  初始化用户的基本信息
    function innitUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message);
                console.log('获取用户信息成功');

                //  获取用户的基本信息
                form.val('formUserInfo', res.data);
                console.log(res.data);
            }
        });
    }


    //  设置重置按钮
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 初始化页面数据
        innitUserInfo();
    });

    $('#formReset').on('submit', function (e) {
        //  阻止表单的默认行为
        e.preventDefault();
        //  发送请求
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                layer.msg('更新用户信息成功！')
                //  重新渲染页面，需要通过window.parent  他的父类来操作其他文件中的方法
                window.parent.getUserInfo();
                
            }
        });
    })

})