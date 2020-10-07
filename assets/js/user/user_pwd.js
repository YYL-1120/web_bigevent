$(function () {
    //  自定义自己的校验规则
    var form = layui.form;

    form.verify({
        //  1. 自定义自己的密码规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //  设置原密码与新密码的校验规则
        newpwd: function (value) {
            var old = $('[name=oldPwd]').val();
            if (old == value) 
                return '两次密码不能相同'
        },
        //  设置新密码与重新确认密码的校验规则
        renewpwd: function (value) {
            var old = $('[name=newPwd]').val();
            if (old != value) 
                return '两次密码不一致，请重新输入！'
        },
    })

    //  表单的提交事件

    $('.layui-form').on('submit', function (e) {
        //  阻止表单的默认行为
        e.preventDefault();
        //  发送请求
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
               
                //  重置将 jquery对象转化为dom对象 用来调用表单的reset()方法
                $('.layui-form')[0].reset();
                
            }
        });

    })
})