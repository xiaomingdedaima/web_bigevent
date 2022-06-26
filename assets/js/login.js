$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {

        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 表单验证
    let form = layui.form
    let layer = layui.layer
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 校验两次密码是否一致
            repwd: function(value) {
                let pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return "密码不一致"
                }
            }
        })
        // 监听注册表单的事件
    $('#form-reg').on('submit', function(e) {
            e.preventDefault()
                // 拿到的是val()的内容!!!
            let data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('#link_login').click()
            })
        })
        // 监听登陆表单的事件
    $('#form-login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                    // 将返回的token值放入本地
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})