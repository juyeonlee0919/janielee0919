//팝업 공통
function comPopupLayer(_state, _targetClassName, _bgOpacity){
    /* 인자값 정의 :
        _state  :
            - true : open
            - false : close
        _targetClassName : 팝업레이어 className
        _bgOpacity : Dim opacity (0 ~ 1)
    */
    function hide_com_pop(){
        jQuery('.btnTop').show();
        fnScrollFixed(false);
        /* [S] 핫딜에서는 이부분이 안탐. 퍼블수정필요 2019.11.23 by jangmangil */
        jQuery('.' + _targetClassName).show().stop().animate({'bottom':'0'}, 200, function(e){
//			e.preventDefault();
//			e.stopPropagation();
            jQuery('.' + _targetClassName).hide();
        });
        /* [E] 핫딜에서는 이부분이 안탐. 퍼블수정필요 2019.11.23 by jangmangil */
        jQuery('.dropDown').removeClass('active').end().find('.dTarget').hide();
        jQuery('.btn_apply').removeClass('active');

        /* [S] 닫기버튼 이외에 스크롤 on 작동로직 추가 2019.11.15 add by jangmangil ********/
        gfnSetSwipeRefreshOnOff('Y'); // 'Y':새로고침사용, 'N':미사용
        console.log("닫기버튼 이외에 스크롤 on 작동");
        /* [E] 닫기버튼 이외에 스크롤 on 작동로직 추가 2019.11.15 add by jangmangil ********/
        jQuery('.com_pop_fog').css({'opacity': '0', 'top':'150%', 'display': 'none'});
        jQuery('.com_pop_btn_close, .com_pop_fog').off('click  touchstart');
    };
    if(_state){
        fnScrollFixed(true);
        jQuery('.com_pop_fog').first().css({'opacity':_bgOpacity, 'top':'0', 'display': 'block'});
        jQuery('.btnTop').hide();
        jQuery('.com_pop_btn_close, .com_pop_fog').on('click touchstart', function(e){
            e.preventDefault();
            e.stopPropagation();
            hide_com_pop();
        });
        setTimeout(function(){
            jQuery('.com_pop_header').find('a:first').focus();
        }, 0);
        jQuery('.' + _targetClassName).show().stop().animate({'bottom':'100%'}, 200, function(e){
            //e.preventDefault();
            //e.stopPropagation();
        });

    }else{
        hide_com_pop();
    }
    return this;

}

function fnFixedScroll(_is) {
    if (_is) {
        jQuery('body').addClass('scrlOff');
        //            jQuery(window).bind('scroll').scroll(function(e){jQuery(this).scrollTop(top).scrollLeft(left);e.preventDefault();e.stopPropagation();});
    } else {
        jQuery('body').removeClass('scrlOff');
        //            jQuery(window).unbind('scroll');
    }
}

function fnScrollFixed(_is){
    currentScroll = jQuery(this).scrollTop();
    if(_is){
        jQuery('body').addClass('scrlOff');
        jQuery('body').css({'top':(-1 * currentScroll) + 'px'});
        jQuery(win).bind('scroll').scroll(function(e){
            jQuery(this).scrollTop(0).scrollLeft(0);
            e.preventDefault();
            e.stopPropagation();
        });
    }else{
        jQuery('body').removeClass('scrlOff');
        jQuery(win).unbind('scroll');
        jQuery(this).scrollTop(currentScroll);
        jQuery('body').css({'top':'auto'});

        jQuery(this).on({
            scroll:function(){
                var _scrollTop = jQuery(this).scrollTop();
                (_scrollTop > 0)?jQuery('.btnTop').show():jQuery('.btnTop').hide();
            }
        });
    }
}

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

//팝업공통(운영소스)
function popLayerShowHide(_btn, _popLayer, _fogBg) {
    var jQuerybtn = jQuery('.' + _btn);
    var jQuerypopLayer = jQuery('.' + _popLayer);
    var jQueryfogBg = jQuery('.' + _fogBg);
    var _isFogBg = jQueryfogBg.is(':visible');
    jQuerypopLayer.siblings("div:not('.popFogBg')").hide();
    jQuerybtn.off('click');
    jQuerybtn.on({
        click: function () {
            jQueryfogBg.css({ 'opacity': '.5', 'top': '0' });
            popLayerBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg);
        }
    });
}
function popLayerBgShowHide(_target, _contentTarget, _is){    // pop dim
    if(!_is){
        fnFixedScroll(true);
        _contentTarget.show().stop().animate({'bottom':'0'},200);
        setTimeout(function(){
            jQuery('.popLayerHeader').find('a:first').focus();
        }, 0);
        _target.show().on({
            click:function(){
                _contentTarget.stop().animate({'bottom':'-100%'}, 200, function(){
                    fnFixedScroll(false);
                    _target.hide();
                    _contentTarget.hide();
                });
            }
        }, function(){
            _target.off('click');
        });

        jQuery('.btnPopClose').on({
            click:function(){
                _contentTarget.find('.popLayerFooter').off('focusout');
                jQuery('.btnPopClose').off('focusout');
                _target.trigger('click');
                setTimeout(function(){
                    jQuery('.btnLayerPop').focus();
                }, 0);
            },
            focusout:function(){
                setTimeout(function() {
                    if(!(jQuery(':focus').parents().hasClass('popLayer'))){
                        jQuery('.btnPopConfirm').focus();
                    }
                }, 0);
            }
        });

        _contentTarget.find('.popLayerFooter').on({
            focusout:function(){
                setTimeout(function() {
                    if(!(jQuery(':focus').parents().hasClass('popLayer'))){
                        jQuery('.btnPopClose').focus();
                    }
                }, 0);
            }
        });
    }else{
        _contentTarget.stop().animate({'bottom':'-100%'}, 200, function(){
            fnFixedScroll(false);
            _target.hide();
            _contentTarget.hide();
        });
        jQuery('.btnPopClose').off('click');
    }
}
function fnFixedScroll(_is) {
    if (_is) {
        jQuery('body').addClass('scrlOff');
    } else {
        jQuery('body').removeClass('scrlOff');
    }
}
