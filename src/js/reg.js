let baseUrl = "http://10.31.161.43/konda.com";
define(['jquery'], function($) {
    return {
        confirm: function() {

            // let phoneReg = /^1\d{10}$/;
            // let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            // console.log($('.account>input'));
            $('.submit_btn').on('click', function() {
                let name = $('#name').val();
                let password = $('#password').val();
                let confirmpassword = $('#confirmpassword').val();
                let code = $('#code').val();
                let changecode = $('.changecode').html();
                let nameReg = /^\w{1,8}$/;
                let passwordReg = /^\w{6,12}$/;
                // console.log(1);
                if (!$('.account>input').val()) {
                    alert('内容不能为空！');
                } else if (!nameReg.test(name) || !passwordReg.test(password)) {
                    alert('输入的用户名或密码不符合规范，请重新输入！')
                } else if (password != confirmpassword) {
                    alert('输入的密码不一致！');
                } else if (code != changecode) {
                    alert('验证码输入不正确！');
                } else {
                    $.ajax({
                        type: "get",
                        url: `${baseUrl}/interface/regs.php`,
                        data: {
                            user_name: name,
                            user_password: password
                        },
                        dataType: "json",
                        success: function(res) {
                            console.log(res);
                            let flag = res.user;
                            if (flag == 1) {
                                alert('用户名已存在，请重新输入！');
                            } else {
                                alert('注册成功，请登录！');
                                location.href = `${baseUrl}/src/html/konka.com_login.html`;
                            }
                        }
                    });
                }

            });
        }
    }
});