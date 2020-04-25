// 포토티켓
// 작성일 : 20.04.20
// 작성자 : 이주연

$( document ).ready( function() {

    var win = this;
    var focusReturn = 0;

    // header
    var jbOffset = $( '#headerTitle' ).offset();
    $( window ).scroll( function() {
        if ( $( document ).scrollTop() > jbOffset.top ) {
            $( '#header_box' ).find('#navMain').addClass( 'active' );
        }
        else {
            $( '#header_box' ).find('#navMain').removeClass( 'active' );
        }
    });

    // header 클릭 이벤트
    $('#navMain ._tab').on('click', function() {
        $('._tab').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    // click 이벤트
    $('._click').on('click', function() {
        $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');
    });

    // 이벤트 슬라이더
    var photoTicketEventSlider = new Swiper('.alert_wrap .swiper-container', {
        speed: 400,
        direction: 'horizontal',
        loop: true,
        spaceBetween: 40,
        slidesPerView: 1,
        centeredSlides: true,
    });

    // 플립 슬라이더
    var flipPhotoTicketSlider = new Swiper('.myPhtoticketFlip .swiper-container', {
        speed: 400,
        autoPlay: true,
        autoHeight: false,
        direction: 'horizontal',
        loop: false,
        spaceBetween: 28,
        slidesPerView: 1,
        centeredSlides: true,
        breakpointsInverse: false,
        roundLengths: false,
        pagination: {
            el: '.swiper-pagination',
        },
        on: {
            init: function () {
                var nWindowWidth = $(window).width();
                var nPadding = (nWindowWidth - 235) / 2
                setTimeout(function () {
                    $('.myPhtoticketFlip .swiper-container')
                        .css({
                            'width': '100%',
                            'margin': '0 auto',
                            'padding-left': nPadding
                        })
                }, 100)
            },
        }
    });

    // max-width 계산
    function setScrollWidth(_target){
        try{
            var _width = 0;
            var _totalWidth;

            var _targetParentPL = Number(_target.css('padding-left').replace('px', ''));
            var _targetParentPR = Number(_target.css('padding-right').replace('px', ''));

            _target.find('> li').each(function(){
                _width = $(_target).outerWidth(true) + _width;
                console.log(_width)
            });
            if($(win).width() < Math.ceil(_targetParentPL + _width + _targetParentPR)){
                _totalWidth = Math.ceil(_targetParentPL + _width + _targetParentPR) + 'px';
            }else{
                _totalWidth = '100.1%'; // 앱에서 컨텐츠가 100% 미만일때 바운스 되게 처리하기 위해 스크롤바 생성을 위해 0.1 % 줌
            }
            _target.css({'width':_totalWidth});


            // if( _btnL != null){
            //     (_target.parent().scrollLeft() <= 0)?_btnL.hide():_btnL.show();
            //     _target.parent().on({
            //         scroll:function(){
            //             ($(this).scrollLeft() <= 0)?_btnL.hide():_btnL.show()
            //         }
            //     });
            // }
        }catch(e){
            //win.console.log('error');
        }
    }
    setScrollWidth($('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active .cgvMovieChartContent'), null);


    this.setScrollWidth = function (_target, _btnL) {
        try {
            var _width = 0;

            var _targetParentPL = Number(_target.css('padding-left').replace('px', ''));
            var _targetParentPR = Number(_target.css('padding-right').replace('px', ''));

            _target.find('> li').each(function () {
                _width = $(this).outerWidth(true) + _width;
            });

            if (_target.width() < _width) {
                _totalWidth = Math.ceil(_targetParentPL + _width + _targetParentPR) + 'px';
            } else {
                _totalWidth = '100%';
            }

            _target.css({ 'width': _totalWidth });

            if (_btnL != null) {
                (_target.parent().scrollLeft() == 0) ? _btnL.hide() : _btnL.show();
                _target.parent().on({
                    scroll: function () {
                        (_target.parent().scrollLeft() == 0) ? _btnL.hide() : _btnL.show()
                    }
                });
            }
        } catch (e) {
            win.console.log("error");
        }
    };

    // 플립 슬라이더 팝업
    // 버튼 클릭시 플립
    $('._flip').on('click',function () {
        $(this).parentsUntil('.swiper-slide').eq(3).toggleClass('active')
    });
});

//사이트맵
window.siteMapFn = siteMapFn;
function siteMapFn(){
    jQuery('#headerTitle').siblings('#siteMap').show();
    dimed();
}
window.close_sitemapFn = close_sitemapFn;
function close_sitemapFn(){
    jQuery('#headerTitle').siblings('#siteMap').hide();
    dimed();
}

//팝업 dim
window.dimed = dimed;
function dimed(){
    if(jQuery('#fogbg').hasClass('active')){
        jQuery('#fogbg').hide();
        /* [S] 닫기버튼 이외에 스크롤 on 작동로직 추가 2019.11.15 add by jangmangil ********/
        //gfnSetSwipeRefreshOnOff('Y'); // 'Y':새로고침사용, 'N':미사용
        //console.log("닫기버튼 이외에 스크롤 on 작동");
        /* [E] 닫기버튼 이외에 스크롤 on 작동로직 추가 2019.11.15 add by jangmangil ********/
    }else{
        jQuery('#fogbg').show();
    }
}

//팝업
jQuery(function(){
    //layerpopup
    function couponPop (){
        //popup open
        jQuery('[data-popup]').on('click', function (){
            var popupTarget = jQuery(this).data('popup');
            jQuery('#' + popupTarget).show().animate({
                opacity: '1'
            }, 300 );
            if (jQuery('#' + popupTarget).hasClass('full_popup')){
                jQuery('#' + popupTarget).find('.popup').animate({
                    top: "0"
                }, 300 );

            } else {
                jQuery('#' + popupTarget).find('.popup').animate({
                    top: "100px"
                }, 300 );
            }
            jQuery('#' + popupTarget).attr('tabindex',0).focus();
        });

        // popup close
        jQuery('.popup_dim').find('.btn_close, .btnPopClose').on('click',function(e){
            e.preventDefault();
            var par = jQuery(this).closest('.popup_dim');
            par.animate({
                opacity: "0"
            }, 300 , function(){
                par.hide();
            });
            par.find('.popup').animate({
                top: "100%"
            }, 300 );

            jQuery("body").removeClass("scrlOff");

        });

        jQuery('.popup_dim').on('click', function(e){

            /* [S] 닫기버튼 이외에 스크롤 on 작동로직 추가 2019.11.15 add by jangmangil ********/
            if( jQuery(this).hasClass("full_popup") ) {
                // 2019.12.11 극장상세팝업은 이벤트 제외.
                if( jQuery(this).attr("id") != "popupTheatherLocation" ) {
                    gfnSetSwipeRefreshOnOff('Y'); // 'Y':새로고침사용, 'N':미사용
                    console.log(".popup_dim .full_popup 닫기버튼 이외에 스크롤 on 작동");
                    jQuery("body").removeClass("scrlOff");
                }
            }
            /* [E] 닫기버튼 이외에 스크롤 on 작동로직 추가 2019.11.15 add by jangmangil ********/

            if(!jQuery(e.target).closest('.popup').length){
                if( jQuery('.popup_dim').hasClass("active") ){
                    jQuery('.popup_dim').removeClass("active");
                }
                else {
                    jQuery(this).animate({
                        opacity: '0'
                    }, 300 , function(){
                        jQuery(this).hide();
                    });
                    jQuery(this).find('.popup').animate({
                        top: "100%"
                    }, 300 );
                }
            }
        });
    }
    couponPop();

    //layerpopup - alert
    function alertPopupClose() {
        jQuery('.layer_pop_re .btn_x').on('click',function(){
            if(jQuery(this).closest(".layer_pop_re").hasClass('isActive')) {
                jQuery(this).closest(".layer_pop_re").removeClass('isActive');
            }
        })
    }
    alertPopupClose();

});
