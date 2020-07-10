let baseUrl = "http://10.31.161.43/konda.com";
define(['jquery', 'cookie'], function($, cookie) {
    return {
        confirm: function() {
            $('.submit_btn').on('click', function() {
                let name = $('#name').val();
                let password = $('#password').val();
                let code = $('#code').val();
                let changecode = $('.changecode').html();


                // console.log(user);

                function addCookie(name, password) {
                    // addItem: function(id, price, num) {
                    // shop
                    let user = cookie.get('user'); // 获取cookie中的购物车 
                    // 获取是为了判断它是否存在
                    // 不存在 创建
                    // 存在 修改

                    let _user = {
                        user_name: name,
                        user_password: password
                    }

                    if (!user) {
                        user = []; // 不存在新建数组
                        user.push(_user); // 放入商品
                    }

                    cookie.set('user', JSON.stringify(user), 7);

                    // },
                }


                let user = cookie.get('user');
                if (user) {
                    user = JSON.parse(cookie.get('user'));
                    if (user[0].user_name != name) {
                        addCookie(name, password);
                    } else {
                        alert('用户已登录！');
                    }
                } else if (!name || !password || !code || !changecode) {
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
                            // console.log(res.user);
                            addCookie(name, password);
                            if (res.user) {
                                alert('登录成功！');
                                location.href = `${baseUrl}/src/html/konka.com_index.html`;
                            } else {
                                alert('用户名或密码不正确，请重新输入！');
                                location.href = `${baseUrl}/src/html/konka.com_login.html`;
                            }
                        }
                    });
                }



            });
        },

    }
});