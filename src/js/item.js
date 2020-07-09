let baseUrl = "http://localhost/konda.com";
define(['jquery', 'simpleImage', 'cookie'], function($, o, cookie) {
    return {
        render: function(callback) {
            let id = location.search.split("=")[1];
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getitem.php?${id}`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    let temp = '';
                    // console.log(res.img_src);
                    let pic = JSON.parse(res.img_src);
                    console.log(pic);
                    temp = ` <div class="item_title">
                        <h3>
                            <a href="">${res.item_title_h3_a}</a>
                            <span>></span> ${res.item_title_h3_span}
                        </h3>
                    </div>
                    <div class="item_imglist">
                        <img src="../images/up_arr.png" alt="" class="up_img">
                        <div class="imglist_box">
                            <div class="ul_box">
                                <ul>
                                    <li class="imglist_2">
                                        <img src="${baseUrl}/src/${pic[1].src}" alt="">

                                    </li>
                                    <li class="imglist_2">
                                        <img src="${baseUrl}/src/${pic[2].src}" alt="">
                                    </li>

                                    <li class="imglist_2">
                                        <img src="${baseUrl}/src/${pic[3].src}" alt="">

                                    </li>
                                    <li class="imglist_2">
                                        <img src="${baseUrl}/src/${pic[4].src}" alt="">
                                        </li>

                                    <li class="imglist_2">
                                        <img src="${baseUrl}/src/${pic[5].src}" alt="">
                                    </li>

                                    <li class="imglist_2">
                                        <img src="${baseUrl}/src/${pic[6].src}" alt="">
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <img src="../images/down_arr.png" alt="" class="down_img">
                    </div>
                    <div class="item_bigimg">
                        <img src="${baseUrl}/src/${pic[7].src}" alt="" class="simpleimage show">
                        <img src="${baseUrl}/src/${pic[8].src}" alt="" class="simpleimage hide">
                        <img src="${baseUrl}/src/${pic[9].src}" alt="" class="simpleimage hide">
                        <img src="${baseUrl}/src/${pic[10].src}" alt="" class="simpleimage hide">
                        <img src="${baseUrl}/src/${pic[11].src}" alt="" class="simpleimage hide">
                        <img src="${baseUrl}/src/${pic[12].src}" alt="" class="simpleimage hide">
                    </div>
                    <div class="item_detail">
                        <h3>${res.item_detail_h3}</h3>
                        <p class="dline1">${res.item_detail_dline1}</p>
                        <p>
                            <span class="dline2">￥${res.pirce_1}.00</span>
                            <span class="dline3">￥${res.pirce_2}.00</span>
                            <a href="#"><i><img src="../images/code.png" alt=""></i>手机购买</a>
                        </p>
                        <div class="address">
                            <span>配送至：</span>
                            <span>北京</span>
                            <span>北京市</span>
                            <span>延庆县</span>
                            <span>珍珠泉乡</span>
                            <span><img src="../images/down_arr.png" alt=""></span>
                            <span>有货</span>
                        </div>
                        <div class="item_count">
                            <span class="num">数量</span>
                            <button class="lose">-</button>
                            <input type="text" value="1">
                            <button class="add">+</button>
                        </div>
                        <div class="item_footer">
                            <a href="">立即购买</a>
                            <a href="${baseUrl}/src/html/konka.com_shopcar.html" class="addCar">加入购物车</a>
                        </div>
                    </div>
                    <div class="item_msg">
                        <div class="item_msg_main">
                            <div class="item_msg_content">
                                <a href="#" class="actived">详情介绍</a>
                                <a href="#">规格参数</a>
                                <a href="#">晒单评价</a>
                                <a href="#">售后服务</a>
                                <a href="#">咨询服务</a>
                            </div>

                        </div>
                    </div>
                    <div class="item_pic">
                        <div>
                            <img src="${baseUrl}/src/${pic[13].src}" alt="">
                            <img src="${baseUrl}/src/${pic[14].src}" alt="">
                            <img src="${baseUrl}/src/${pic[15].src}" alt="">
                            
                        </div>
                    </div>`;
                    $('.item_content').prepend(temp);
                    callback && callback(res.id, res.pirce_1);
                }
            });
        },
        addItem: function(id, price, num) {
            // shop
            let shop = cookie.get('shop'); // 获取cookie中的购物车 
            // 获取是为了判断它是否存在
            // 不存在 创建
            // 存在 修改

            let product = {
                id: id,
                price: price,
                num: num
            }

            if (shop) { // 存在
                shop = JSON.parse(shop); // 将字符串转成数组
                // 数组中已经存在了商品的id
                // 只修改num只 而不是将商品放入数组
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = num : null;
                    });
                } else {
                    shop.push(product);
                }
            } else {
                shop = []; // 不存在新建数组
                shop.push(product); // 放入商品
            }

            cookie.set('shop', JSON.stringify(shop), 1);

        },
        click: function() {
            // let top = parseInt($('.ul_box').css('top'));
            // console.log(parseInt(top));
            $('.up_img').on('click', function() {
                // console.log(1);
                let top = parseInt($('.ul_box').css('top'));
                console.log(parseInt(top));
                if (top != 0) {
                    $('.ul_box').animate({
                        top: top + 82 + 'px'
                    }, 500);
                }
            });
            $('.down_img').on('click', function() {
                // console.log(1);
                let top = parseInt($('.ul_box').css('top'));
                console.log(top);
                // console.log(parseInt(top));
                if (top != -82) {
                    $('.ul_box').animate({
                        top: top - 82 + 'px'
                    }, 500);
                }
            });
            $('.imglist_2').on('click', function() {
                // console.log($(this));
                // console.log($(this).index());
                $(this).addClass("actived").siblings().removeClass("actived");
                $($('.simpleimage')[$(this).index()]).addClass("show").siblings().removeClass("show");

            });
            $('.item_count>.add').on('click', function() {
                // console.log(1);
                let num = $('.item_count>input').val();
                num++;
                $('.item_count>input').val(num);
            });
            $('.item_count>.lose').on('click', function() {
                // console.log(1);
                let num = $('.item_count>input').val();
                if (num != 1) num--;
                $('.item_count>input').val(num);
            });
        },
        simpleImage: function() {
            $('.simpleimage').zoomio();
        }
    }
});