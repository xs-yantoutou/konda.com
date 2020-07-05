let baseUrl = "http://localhost/konda.com";
define(['jquery', 'HappyImage'], function($) {
    return {
        render: function() {
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    let temp = '';
                    res.forEach(elm => {
                        console.log(elm);
                        // console.log(elm.img_src);
                        let pic = JSON.parse(elm.img_src);
                        // console.log(pic);
                        temp += ` <a href="../html/konda.com_item.html?id=${elm.id}">
                                        <div class="star_row_1 star_row_2">
                                            <img src="${baseUrl}/src/${pic[0].src}" alt="">
                                            <p class="line1">${elm.title_1}</p>
                                            <p class="line2">${elm.title_2}</p>
                                            <p class="line3">￥${elm.pirce_1}<span class="line4">&nbsp;￥${elm.pirce_2}</span></p>
                                        </div>
                                    </a>`;
                    });
                    $('.star_row').append(temp);
                }
            });
        },
        HappyImage: function() {
            $(".sliderdiv").HappyImage({
                effect: "slide",
                autoplay: 3000
            });
        },
        srolltop: function() {
            $(function() {
                $('.left_nav>li').on('click', function() {
                    let top = $("." + $(this).attr('title')).offset().top;
                    $('html,body').animate({
                        scrollTop: top
                    }, 700);
                });
                $(window).on('scroll', function() {
                    let top = $(document).scrollTop();

                    if (top >= 700) {
                        $('.left_nav').attr('style', 'display:block;');
                    } else {
                        $('.left_nav').attr('style', 'display:none;');
                    }
                    if (top >= 1000) {
                        $('.right_nav_4').attr('style', 'display:block;');
                    } else {
                        $('.right_nav_4').attr('style', 'display:none;');
                    }
                });
                $('.right_nav_4').on('click', function() {
                    $('html,body').animate({
                        scrollTop: 0
                    }, 700);
                });
                $('.right_btn').on('click', function() {
                    // console.log($('.right_btn'));
                    let left = $('.star_row').offset().left;
                    // console.log($('.star_row').offset().left);
                    if (left = 324) {
                        $('.star_row').animate({
                            left: '-' + 1255 + 'px'
                        }, 700);
                        // console.log($('.star_row').offset().left);
                    }
                });
                $('.left_btn').on('click', function() {
                    console.log(1);
                    let left = $('.star_row').offset().left;
                    console.log($('.star_row').offset().left);
                    if (left = '-1255px') {
                        $('.star_row').animate({
                            left: 0 + 'px'
                        }, 700);
                    };
                });
            });
        }
    }
});