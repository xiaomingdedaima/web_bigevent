$(function() {
        let layer = layui.layer

        getUserInfo()

        // 登出功能
        $('#logout').click(function() {
            layer.confirm('是否登出?', function(index) {
                localStorage.removeItem('token')
                location.href = './login.html'
                layer.close(index);
            });
        })
    })
    // 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 1) {
                renderAvanter(res.data)
            }

        },
        // 检测是否通过改网页跳转,complete是不论成功与否都执行一次的
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户头像信息
function renderAvanter(user) {
    // 渲染用户名,欢迎语
    let name = user.nickname || user.username
    $('#welcome').html(`欢迎  ${name}`)
        // 渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr(src, user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}