$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length < 6) {
                return '昵称长度不能小于6位'
            }
        }
    })
    getUserInfo()

    function getUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('请求失败')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        getUserInfo()
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.mag('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
            },
        })
    })
})