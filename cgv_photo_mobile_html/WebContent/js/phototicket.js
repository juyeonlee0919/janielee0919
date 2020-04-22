
var win = this;
var focusReturn = 0;

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
