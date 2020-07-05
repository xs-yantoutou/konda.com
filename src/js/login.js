let baseUrl = "http://localhost/konda.com";
define(['jquery'], function($) {
    return {
        confirm: function() {



            // console.log($('.account>input'));
            // console.log(2);
            $('.submit_btn').on('click', function() {
                let name = $('#name').val();
                let password = $('#password').val();
                let code = $('#code').val();
                let changecode = $('.changecode').html();
                console.log(name);
                console.log(password);
                console.log(code);
                console.log(changecode);
                // console.log($('.submit_btn'));
                // console.log(2);
                // console.log($('.account>input').val());
                // console.log(code);
                if (!$('.account>input').val()) {
                    alert('内容不能为空！');
                } else if (code != changecode) {
                    alert('验证码输入不正确！');
                } else {
                    $.ajax({
                        type: "get",
                        url: `${baseUrl}/interface/logins.php`,
                        data: {
                            user_name: name,
                            user_password: password
                        },
                        dataType: "json",
                        success: function(res) {
                            // console.log(res);
                            if (res.user) {
                                alert('登录成功！');
                                location.href = 'http://localhost/konda.com/src/html/konka.com_index.html';
                            } else {
                                alert('用户名或密码不正确，请重新输入！');
                                location.href = 'http://localhost/konda.com/src/html/konka.com_login.html';
                            }
                        }
                    });
                }



            });
        }
    }
});