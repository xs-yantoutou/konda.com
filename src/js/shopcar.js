let baseUrl = "http://localhost/konda.com";

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
                        console.log(res);
                        let tempstr = '';

                        res.forEach(elm => {
                            let pic = JSON.parse(elm.img_src);

                            // cookie中获取 于当前从数据库中遍历出的相同元素
                            let arr = shop.filter(val => val.id == elm.id);


                            console.log(arr);

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
            console.log(shop);
            $('#check').on('click', function() {
                console.log(this.checked);
                // $('label>input').attr('data-flag', 'true');
                // console.log($('label>input').attr('data-flag'));
                // $('label>input').attr('checked', 'true');
                if (this.checked) {
                    $('label>input').prop('checked', true);
                    // console.log($('label>input'));
                    // console.log($('label>input').prop('data-flag'));
                    // console.log($('label>input').attr('data-flag'));
                    // $('label>input').attr('data-flag', 'true');
                    // console.log($('label>input').attr('data-flag'));
                }
            });
            $('.items_num>.lose').on('click', function() {
                // console.log($(this).siblings('input'));
                let v = $(this).siblings('input').val();
                if (v != 1) {
                    v--;
                    $(this).siblings('input').val(v);
                    let s = $(this).parent().siblings('.items_count').html();
                    let b = $(this).parent().siblings('.items_price').html();
                    s -= b;
                    $(this).parent().siblings('.items_count').html(s + '.00');
                    let tempinput = $(this).parent().siblings('.items_checkbox').children('input');
                    let _value = $(this).parent().siblings('.items_count').html();
                    let c = +($('.countMoney>span').html().slice(1));
                    if (tempinput.attr('checked')) {
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
                console.log(1);
                let v = $(this).siblings('input').val();
                if (v != 1) {
                    v++;
                    $(this).siblings('input').val(v);
                    let s = +($(this).parent().siblings('.items_count').html());
                    let b = +($(this).parent().siblings('.items_price').html());
                    s += b;
                    $(this).parent().siblings('.items_count').html(s + '.00');
                }
                // console.log($(this).parent().siblings('.items_count'));
                let tempinput = $(this).parent().siblings('.items_checkbox').children('input');
                let _value = $(this).parent().siblings('.items_count').html();
                let c = +($('.countMoney>span').html().slice(1));
                if (tempinput.attr('checked')) {
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
                console.log(shop);
                shop.splice((shop.findIndex(elm => elm.id == productId)), 1);
                // console.log(shop);
                shop = JSON.stringify(shop);
                cookie.set('shop', shop, 1);
                location.reload();
            });
            $('.delcheck').on('click', function() {

                // console.log($(this));
                // if($('.items_checkbox>input').attr('checked'))
                // console.log($('.items_checkbox>input'));
                // let arr = $('.items_checkbox>input')
                // $(arr).forEach(function(val, i) {
                //     if (arr[i].checkd) {
                //         shop.slice((shop.findIndex(elm => elm.id == arr[i].class)), 1);
                //         location.reload();
                //     }
                // });
            });
            $('label>input').on('click', function() {
                if ($(this).prop('checked')) {
                    let m = +($('.countMoney>span').html().slice(1));
                    m += +($(this).parent().siblings('.items_count').html());
                    console.log(m);
                    $('.countMoney>span').html('￥' + m + '.00');
                } else {
                    let n = +($('.countMoney>span').html().slice(1));
                    n = n - $(this).parent().siblings('.items_count').html();
                    $('.countMoney>span').html('￥' + n + '.00');
                }
            });
            $('.countMoney>i').html();
            $('.countMoney>span').html();
        }
    }
});