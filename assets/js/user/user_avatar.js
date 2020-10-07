/*
 * @Author: your name
 * @Date: 2020-10-07 14:17:46
 * @LastEditTime: 2020-10-07 18:19:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \10_bigThings\assets\js\user\user_avatar.js
 */
$(function () {
    //  设置剪裁区域
    // //  1. 获取建材区域的DOM元素
    // var image = $('#image');
    // const options = {
    //     //  设置剪裁的宽高比
    //     aspectRatio: 1,
    //     //  指定的预览区域
    //     preview: '.img-preview'
    // };
    // //  2. 创建剪裁区域
    // image.cropper(options);

    //  设置剪裁区域 
    $('#image').cropper({
        //  设置剪裁的宽高比
        aspectRatio: 1,
        //  指定的预览区域
        preview: '.img-preview'
    });


    //  设置点击上传文件的点击事件
    $('#loadimg').on('click', function () {
        $('#logfile').click();

    });
    //  为文件选择绑定事件
    $('#logfile').on('change', function (e) {
        //  获取用户选择的文件
        var file = e.target.files;
        console.log(file);
        if (file.length === 0)
            return '上传文件失败'
        //  1. 获取文件
        var getfile = file[0];
        //  2. 将文件 转化为路径
        var imgurl = URL.createObjectURL(getfile);
        //  3. 将新的文件初始化到剪裁区域
        //     cropper('destroy')  销毁旧的剪裁区域
        $('#image')
            .cropper('destroy')
            .attr('src', imgurl)
            .cropper({
                //  设置剪裁的宽高比
                aspectRatio: 1,
                //  指定的预览区域
                preview: '.img-preview'
            })
    });



    //  为确定按钮绑定点击事件
    $('#sure').on('click', function () {
        //  首先获取剪切好后的图片
        var dataurl = $('#image')
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        //  base64格式的图片  将图片转化为字符串
        // console.log(dataurl);

        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataurl
            },
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                console.log('更换头像成功');
                layer.msg('更换头像成功');
                window.parent.getUserInfo();
            }
        });
    })
})