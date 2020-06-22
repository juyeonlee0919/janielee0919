var front = front || {};

front.common = front.common || {};

front.common = (function () {
    var init = function () {
        this.a();
        this.popupEvent();
        this.commonHandler();
    };

    var a = function () {
        $('a[href="#"]').on('click', function (e) {
            e.preventDefault();
        });
    };

    /*
    팝업
    * */
    var popupEvent = function () {
        $('._btnPopup').on('click', function () {
            $('body').removeClass('scrOff').addClass('scrOn');
            $('#requiredPerformance').addClass('active');
            $('#performanceCalculation').addClass('active');
            $('#automaticPaymentDetails').addClass('active');
            $('#annualFee').addClass('active');
            $('#changeRequiredPerformance').addClass('active');
            $('#inputIncomeInformation').addClass('active');

        });
        $('._btnClose').on('click', function () {
            $('body').removeClass('scrOn').addClass('scrOff');
            $('#requiredPerformance').removeClass('active');
            $('#performanceCalculation').removeClass('active');
            $('#automaticPaymentDetails').removeClass('active');
            $('#annualFee').removeClass('active');
            $('#changeRequiredPerformance').removeClass('active');
            $('#inputIncomeInformation').removeClass('active');
        });
        $('._btnRefresh').on('click', function () {
            $('._refresh').val('');
        });
        $('._dimClose').on('click', function (e) {
            if ($('.popup-normal').has(e.target).length === 0) {
                $('body').removeClass('scrOn').addClass('scrOff');
                $('#automaticPaymentDetails').removeClass('active');
                $('#performanceCalculation').removeClass('active');
                $('#annualFee').removeClass('active');
            }
        });
    };

    var commonHandler = function () {
        $(document).ready(function () {

            $("#S-header").sticky({topSpacing:0});

            $('.header .nav li').on('click',function () {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
            })

            var tabBtn = $("#tab-btn > ul > .tab-item");
            var tabCont = $("#tab-content > .content");

            var tabBtn2 = $("#tab-btn2 > ul > .tab-item");
            var tabCont2 = $("#tab-content2 > .content");

            tabCont.hide().eq(0).show();
            tabCont2.hide().eq(0).show();

            tabBtn.click(function(){
                var target = $(this);
                var index = target.index();

                tabBtn.removeClass("active");
                target.addClass("active");
                tabCont.css("display","none");
                tabCont.eq(index).css("display", "block");
            });

            tabBtn2.click(function(){
                var target = $(this);
                var index = target.index();

                tabBtn2.removeClass("active");
                target.addClass("active");
                tabCont2.css("display","none");
                tabCont2.eq(index).css("display", "block");
            });

        })
    };


    return {
        a,
        popupEvent,
        commonHandler,
        init
    }
})
();
$(function () {
    front.common.init();
});
