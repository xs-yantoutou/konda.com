let baseUrl = "http://localhost:8082/nz-2003/smartisan.com";

define(['jquery', 'cookie'], function($, cookie) {
            return {
                render(callback) {
                    let shop = cookie.get('shop'); //获取cookie
                    let user = cookie.get('user'); //获取用户是否登录

                    if (shop) { //存在cookie
                        // 显示商品
                        $('.no_goods').addClass('hide').next().removeClass('hide');

                        shop = JSON.parse(shop);
                        let idlist = shop.map(elm => elm.id).join();
                        $.ajax({
                            type: "get",
                            url: `${baseUrl}/interface/shopcar.php`,
                            data: {
                                idlist: idlist
                            },
                            dataType: "json",
                            success: function(res) {
                                let tempStr = '',
                                    totalStr = '';

                                res.forEach(elm => {
                                    let pic = JSON.parse(elm.pro_img);
                                    let price = JSON.parse(elm.pro_price);
                                    let carPic;
                                    let tempPrice = '';
                                    // cookie中获取当前从数据库中遍历出来的相同元素
                                    let arr = shop.filter(val => val.id == elm.pro_id);
                                    // 优惠金额
                                    let sale;

                                    // 图片
                                    $(pic).each(function(i, elm) {
                                        if (elm.tit == 'shopcar') carPic = i;
                                    });
                                    // 价格
                                    tempPrice = `<p>￥ ${(price[0].now_price*arr[0].num).toFixed(2)}</p>`;
                                    if (price.length == 2) {
                                        sale = price[1].del_price * arr[0].num - price[0].now_price * arr[0].num;
                                        tempPrice += `<p>已优惠 ￥ ${sale.toFixed(2)}</p>`;
                                    }

                                    tempStr += `
                            <div class="car-group clear_fix" data-i="${elm.pro_id}">
                                <!-- 选择按钮 -->
                                <div class="check_btn float_left">
                                    <span class="ckButton radio_ck" data-flag="false"></span>
                                </div>
                                <!-- 商品详细信息 -->
                                <div class="shopp_all float_left">
                                    <ul>
                                        <li class="shopp_img">
                                            <img src="${baseUrl}/src${pic[carPic].src}" alt="">
                                        </li>
                                        <li class="shopp_txt">
                                            <a href="#">${elm.pro_tit}</a>
                                            <p>黑色</p>
                                        </li>
                                        <li class="shopp_oper del">
                                            <span class="button">×</span>
                                        </li>
                                        <li class="shopp_money">
                                            ${tempPrice}
                                        </li>
                                        <li class="shopp_num">
                                            <span class="sub button disable">-</span>
                                            <span class="number 1">${arr[0].num}</span>
                                            <span class="add button">+</span>
                                        </li>
                                        <li class="shopp_price">￥ ${arr[0].price}</li>
                                    </ul>
                                </div>
                            </div>
                            `;

                                    $('.list_box').html(tempStr);
                                    // 判断数量，添加或删除相应类名
                                    if (arr[0].num >= 5) {
                                        console.log();
                                        console.log('加');
                                        $($('.add')[$('.add').length - 1]).addClass('disable').prev().prev().removeClass('disable');
                                    } else if (arr[0].num > 1) {
                                        console.log('减');
                                        $('.sub').removeClass('disable');
                                    }
                                    callback && callback(sale);
                                });
                            }
                        });
                    } else {
                        // 显示购物车为空
                        $('.has_goods').addClass('hide').prev().removeClass('hide');
                        $('.go_login').show();
                        if (user) {
                            $('.go_login').hide();
                        }
                    }

                },
                roll() {
                    // 滚动事件
                    $(window).on('scroll resize', function() {

                        if (($(document).height() - $(window).scrollTop()) > 1870) {
                            $('#car_btn').hasClass('fix') || $('#car_btn').addClass('fix');
                        } else {
                            // =========================
                            $('#car_btn').removeClass('fix');
                        }
                    });
                },
                allcheck(callback) {
                    $('.radio_ck').on('click', function() {

                        if ($(this).attr('data-flag') == 'false') {
                            $(this).addClass('check_ck').attr('data-flag', 'true');
                        } else {
                            $(this).removeClass('check_ck').attr('data-flag', 'false');
                        }
                        let flag = $('.radio_ck').get().every(elm => {
                            return $(elm).attr('data-flag') == "true";
                        });
                        if (flag) {
                            $('#all_ck').addClass('check_ck').attr('data-flag', 'true');
                        } else {
                            $('#all_ck').removeClass('check_ck').attr('data-flag', 'false');
                        }
                        callback && callback();
                    });
                    $('#all_ck').unbind('click').click(function() {
                        if ($(this).attr('data-flag') == 'false') {
                            $(this).addClass('check_ck').attr('data-flag', 'true');
                            $('.radio_ck').addClass('check_ck').attr('data-flag', 'true');
                        } else {
                            $(this).removeClass('check_ck').attr('data-flag', 'false');
                            $('.radio_ck').removeClass('check_ck').attr('data-flag', 'false');
                        }
                        callback && callback();
                    });
                },
                add(sale, callback) {
                    $('.add').on('click', function() {
                                if ($(this).prev().html() < 5) {
                                    $(this).prev().html(parseInt($(this).prev().html()) + 1);
                                    $(this).prev().prev().removeClass('disable');
                                } else {
                                    $(this).addClass('disable').prev().html(5);
                                }