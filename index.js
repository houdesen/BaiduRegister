$(function () {
    var countdown = 60; //发送验证码的有效存在时间

    //密码的注册规则
    $('#password-input-tips').on({
        mouseover: function () {
            $('#tips').css('display', 'block');
        },
        mouseout: function () {
            $('#tips').css('display', 'none');
        }
    });

    //表单验证
    $("#btn").click(function(){
        if (!validate('#username-input') || !validate('#phone-input') || !validate('#password-input') || validate('#verifyCode-input'))
            return;
    });

    //字段验证
    $('#username-input').focusout(function(){
        if (!validate('#username-input'))
            return;
    })
    $('#phone-input').focusout(function(){
        if (!validate('#phone-input'))
            return;
    })
    $('#password-input').focusout(function(){
        if (!validate('#password-input'))
            return;
    })
    $('#verifyCode-input').focusout(function(){
        if (!validate('#verifyCode-input'))
            return;
    })

    function validate(field) {
        var $data = $(field);
        var $msg = $(field + '-validate');
        
        if ($data.val() === '') {
            $msg.html('不能为空');
            return false;
        }
        
        if (field == '#username-input') {
            if (!(/^(?!\d+$)[a-zA-Z0-9-_\u4E00-\u9FA5]+$/.test($data.val()))) {
                $msg.html('用户名仅支持中英文、数字和下划线、且不能为纯数字');
                return false;
            }

        }
        if (field == '#phone-input') {
            if (!(/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test($data.val()))) {
                $msg.html('手机号码格式不正确');
                return false;
            }

        }
        if (field == '#password-input') {
            if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test($data.val()))) {
                $msg.html('密码设置不符合要求');
                return false;
            }
        }
        $msg.html('');
        return true;
    }

    //验证码
    $(".getVerifyCode").click(function(){
        setTime();
    });
    function setTime() {
        var time = setInterval(function() {
            if (countdown == 0) {
                $(".getVerifyCode").val("获取验证码");
                $('#verifyCode-input-validate').html('请求超时，请稍后再试');
                countdown = 60;
                clearInterval(time);
            } else {
                $('#verifyCode-input-validate').html('');
                countdown--;
                $(".getVerifyCode").val("重新发送(" + countdown + ")");
            }
        }, 1000)
    }
})