var mm;
$(function () {

    mm = new Mmm();
    // 页面初始化 时渲染压面
    mm.getDiscountProduct(function (data) {
        var html = template('productTemp', data);
        $('.product-list').html(html);
    });
    mm.scrollInit();
    mm.goTop();
    mm.colse();
})

var Mmm = function () {};

Mmm.prototype = {
    // 获取国内折扣商品列表
    getDiscountProduct: function (backdata) {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getinlanddiscount',
            success: function (data) {
                backdata(data);
            }
        })
    },

    // 区域滚动初始化
    scrollInit: function () {
        var myScroll = new IScroll('#wrapper', {
            mouseWheel: true,
            scrollbars: true,
            scrollY: true,
            scrollbars: false
        });
        // 自定义事件
        myScroll.on('scrollEnd', function () {
            mm.getDiscountProduct(function (data) {
                if (myScroll.y < -2224) {
                    console.log('到了底部');
                     // 显示加载动画
                     $('#preloader_1').show();   
                     // 显示跳转到顶部的按钮
                     $('.btn-up').show();
                     setTimeout(function(){
                         // 如果滚动到底部 在请求数据 添加到页面后面
                         mm.getDiscountProduct(function (data) {
                            var html = template('productTemp', data);
                            $('.product-list').append(html); 
                            myScroll.refresh();
                            // 隐藏加载动画
                            $('#preloader_1').hide();
                         });
                     },1000)
                }
            });
        });
    },

    // 跳转到顶部
    goTop : function(){
        $('.btn-up').on('click',function(){
            $('.scroll').attr('style','');
            $(this).hide();
        })
    },

    colse: function(){
        // 点击关闭广告
        $('.btn-close').on('click',function(){
            $('.ads').removeClass('bounceIn').addClass('bounceOutRight');
            setTimeout(function(){
                $('.ad-content').hide();
            },200)
        })
    }
}