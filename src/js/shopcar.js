let baseUrl = "http://10.31.161.43/konda.com";

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {
            let shop = cookie.get('shop'); //   获取cookie数据
            // console.log(shop);
            if (shop) {
                shop = JSON.parse(shop);
                // console.log(shop);
                let idList = shop.map(elm => elm.id).join();
                // console.log(id);
                // console.log(idList);
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/shopcar.php`,
                    data: {
                        idList: idList
                    },
                    dataType: "json",
                    success: function(res) {
                        // console.log(res);
                        let tempstr = '';

                        res.forEach(elm => {
                            let pic = JSON.parse(elm.img_src);

                            // cookie中获取 于当前从数据库中遍历出的相同元素
                            let arr = shop.filter(val => val.id == elm.id);


                            // console.log(arr);

                            tempstr += `
                                        <div class="shop_items">
                                            <label class="items_checkbox">
                                                <input type="checkbox" data-flag="false" class="${elm.id}">
                                            </label>
                                            <div class="items_img">
                                                <img src="${baseUrl}/src/${pic[1].src}" alt="">
                                            </div>
                                            <div class="items_msg">
                                                <p>
                                                    <a href="#">${elm.shop_text_1}<br><span>${elm.shop_text_2}</span> <br>${elm.shop_text_3}<br>${elm.shop_text_4}</a>
                                                </p>
                                            </div>
                                            <div class="items_price">${elm.pirce_1}.00</div>
                                            <div class="items_num">
                                                <div class="lose">-</div>
                                                <input type="text" value="${arr[0].num}" min="1">
                                                <div class="add">+</div>
                                            </div>
                                            <div class="items_count">${elm.pirce_1*arr[0].num}.00</div>
                                            <div class="${elm.id}items_del items_del">删除</div>
                                        </div>`;
                        });
                        $('.shopcar_title').after(tempstr);
                        $('.num_shopcar>span').html(res.length);

                        callback && callback();
                    }
                });
            }
        },
        click: function() {
            let shop = cookie.get('shop');
            if (shop) {
                shop = JSON.parse(shop);
            }
            // console.log(shop);
            $('#check').on('click', function() {
                // console.log(this.checked);
                // console.log($('.items_count'));
                let _sum = 0;
                let sum = ($('.items_checkbox>input').length);
                $('.countMoney>i').html(sum);


                if (this.checked) {

                    $('.items_count').each((i, elm) => {
                        // console.log(+($(elm).html()));
                        // console.log(i);
                        _sum += (+($(elm).html()));
                        // console.log(_sum);
                        // $('.countMoney>span').html()
                    });
                    $('.countMoney>span').html('￥' + _sum + '.00');
                    $('label>input').prop('checked', true);
                    // console.log($("input[class]"))

                }
            });
            $('.items_num>.lose').on('click', function() {
                // console.log($(this).siblings('input'));
                let v = $(this).siblings('input').val();
                if (v > 1) {
                    v--;
                    $(this).siblings('input').val(v);
                    let s = $(this).parent().siblings('.items_count').html();
                    let b = $(this).parent().siblings('.items_price').html();
                    s -= b;
                    $(this).parent().siblings('.items_count').html(s + '.00');
                    let tempinput = $(this).parent().siblings('.items_checkbox').children('input');
                    let _value = $(this).parent().siblings('.items_price').html();
                    let c = +($('.countMoney>span').html().slice(1));
                    // console.log(tempinput.prop('checked'));
                    if (tempinput.prop('checked')) {
                        // console.log(1);
                        // console.log(tempinput.attr('checked'));
                        c = c - _value;
                        $('.countMoney>span').html('￥' + c + '.00');
                    }
                }
                // console.log($(this).parent().siblings('.items_count'));

                // let s = $("input[min^='1']").val();
                // let t = $('.items_count').html();
                // let o = $('.items_price').html();
                // if (s != 1) {
                //     s--;
                //     t = t - o;
                // };
                // $('.items_count').html(t);
                // // $('.countMoney>span').html(t + '.00');
                // $("input[min^='1']").val(s);
            });
            $('.items_num>.add').on('click', function() {
                // console.log(1);
                let v = $(this).siblings('input').val();
                if (v >= 1) {
                    v++;
                    $(this).siblings('input').val(v);
                    let s = +($(this).parent().siblings('.items_count').html());
                    let b = +($(this).parent().siblings('.items_price').html());
                    s += b;
                    $(this).parent().siblings('.items_count').html(s + '.00');
                }
                // console.log($(this).parent().siblings('.items_count'));
                let tempinput = $(this).parent().siblings('.items_checkbox').children('input');
                let _value = +($(this).parent().siblings('.items_price').html());
                let c = +($('.countMoney>span').html().slice(1));
                if (tempinput.prop('checked')) {
                    c = c + _value;
                    $('.countMoney>span').html('￥' + c + '.00');
                }
                // let l = parseInt($("input[min^='1']").val());
                // let t = parseInt($('.items_count').html());
                // let o = parseInt($('.items_price').html());
                // t = t + o;
                // l++;
                // $('.items_count').html(t);
                // // $('.countMoney>span').html(t + '.00');
                // $("input[min^='1']").val(l);
            });
            $('.items_del').on('click', function() {
                let productId = parseInt($(this).attr('class'));
                // console.log(shop);
                shop.splice((shop.findIndex(elm => elm.id == productId)), 1);
                // console.log(shop);
                shop = JSON.stringify(shop);
                cookie.set('shop', shop, 1);
                location.reload();
            });
            $('.delcheck').on('click', function() {
                // console.log($('.items_checkbox>input'));
                let arr = Array.from($('.items_checkbox>input'));
                $(arr).each((i, elm) => {
                    // console.log(i);
                    let a = $(elm).prop('checked');
                    // console.log(a);
                    if (a) {
                        let b = $(elm);
                        // console.log(b);
                        t1 = shop.filter(elm => {
                                // return i == $('.items_checkbox>input').eq(i + 1).attr('class');
                                // return elm.id == b.attr('class');
                                if (elm.id == b.attr('class')) {
                                    shop.splice((shop.findIndex(elm => elm.id == b.attr('class'))), 1);
                                }
                            })
                            // console.log(t1[0].id);
                            // console.log(shop);
                        shop = JSON.stringify(shop);
                        cookie.set('shop ', shop, 1);
                        location.reload();
                        shop = JSON.parse(shop);
                        if (shop.length == 0) {
                            cookie.remove('shop', '', -1);
                            location.reload();
                        }
                        // let arr = [];
                        // arr.push(t1[0].id);
                        // console.log(arr);
                        // shop.forEach((elm, i) => {
                        //     // console.log(shop.findIndex(elm => elm.id == t1[0].id));
                        //     shop.splice((shop.findIndex(elm => elm.id == t1[0].id)), 1);
                        // });
                        // shop = JSON.stringify(shop);
                        // cookie.set('shop', shop, 1);
                        // location.reload();
                        // // console.log(shop.length);
                        // if (shop.length == 0) {
                        //     cookie.remove('shop', '', -1);
                        //     location.reload();
                        // };
                        // console.log(shop);
                    };
                });


            });
            $('.items_checkbox>input').on('click', function() {

                if ($(this).prop('checked')) {
                    let sum = +($('.countMoney>i').html());
                    sum += 1;
                    $('.countMoney>i').html(sum);
                    let m = +($('.countMoney>span').html().slice(1));
                    m += +($(this).parent().siblings('.items_count').html());
                    // console.log(m);
                    $('.countMoney>span').html('￥' + m + '.00');
                } else {
                    let sum = $('.countMoney>i').html()
                    sum -= 1;
                    if (sum < 0) sum = 0;
                    $('.countMoney>i').html(sum);
                    let n = +($('.countMoney>span').html().slice(1));
                    n = n - $(this).parent().siblings('.items_count').html();
                    $('.countMoney>span').html('￥' + n + '.00');
                }
            });
            $('.items_num>input').on('input', function() {
                // console.log(1);
                let reg = /\D/g;
                let str = $(this).val();
                str = str.replace(reg, '');
                $(this).val(str);
                // console.log(str);
                if ($(this).val() < 1) $(this).val(1);
                let _v2 = $(this).val();
                // console.log(_v2);
                let _v3 = $(this).parent().siblings('.items_count').html()
                let tempinput = $(this).parent().siblings('.items_checkbox').children('input');
                let _value = +($(this).parent().siblings('.items_price').html());
                let c = +($('.countMoney>span').html().slice(1));

                if (tempinput.prop('checked')) {
                    c = c - _v3;
                    console.log(c);
                    console.log(_v3);
                    // console.log(1);
                    // $('.countMoney>span').html('￥' + (c + _v3) + '.00');
                }
                _v3 = _v2 * _value;
                $(this).parent().siblings('.items_count').html(_v3 + '.00');
                if (tempinput.prop('checked')) {
                    // c = c - _v3;
                    // console.log(c);
                    // console.log(_v3);
                    // console.log(1);
                    $('.countMoney>span').html('￥' + (c + _v3) + '.00');
                }


            });
            // $('.countMoney>i').html();
            // $('.countMoney>span').html();
        }
    }
});