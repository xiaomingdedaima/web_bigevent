$(function() {
    let form = layui.form
    let layer = layui.layer

    // 定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码为不包含空格的6-12位'],
        samePwd: function(value) {
            if ($('[name=oldPwd]').val() === value) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不同'
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })





})