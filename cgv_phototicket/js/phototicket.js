// 포토티켓
// 작성일 : 2020.04.20
// 작성자 : 이주연
var front = {
    event : {},
    slider : {},
    page : {},
    fn : {},
};

(function (jQuery) {
    // console.log(jQuery)

    front.event._commonHandlers = {
        load: function () {
            /**
             * 날짜 : 2020.05.11
             * 내용 : ajax 호출 다음 함수 실행
             * - 이슈 : 기존 함수 실행 후, ajax 호출이 되어 슬라이더 실행이 안됨
             * - 사용 방법 : ajax 호출 후, 함수 실행
             */
            front.slider.eventSlider();

            /**
             * 날짜 : 2020.05.12
             * 수정 사항 : ajax 호출 다음 함수 실행해야함
             * heart 클릭 이벤트 함수 추가
             */
            front.event.btnHeartClick();

            jQuery('.btnTop').on({
                click: function (e) {
                    e.preventDefault();
                    jQuery('html').stop().animate({scrollTop: '0'});
                }
            });

            // header 클릭 이벤트
            jQuery('#navMain ._tab').on('click', function () {
                jQuery('._tab').removeClass('active');
                jQuery(this).addClass('active');
                return false;
            });

            // 제작완료 tab ---- 2020.05.07 추가
            jQuery('#madeDone').on('click', function () {
                jQuery('#printedDone').removeClass('active');
                jQuery(this).addClass('active');
                return false;
            });

            // 제작완료 tab ---- 2020.05.07 추가
            jQuery('#printedDone').on('click', function () {
                jQuery('#madeDone').removeClass('active');
                jQuery(this).addClass('active');
                return false;
            });

            // click 이벤트
            jQuery('._click').on('click', function () {
                jQuery(this).hasClass('active') ? jQuery(this).removeClass('active') : jQuery(this).addClass('active');
            });

            // 자랑하기 버튼 --- 2020.05.07 수정
            jQuery('._btnBoast').on('click', function () {
                if(jQuery(this).hasClass('active')) {
                    jQuery(this).removeClass('active').text('자랑하기');
                }
                else {
                    jQuery(this).text('자랑취소').addClass('active');
                    // jQuery('#pop_alert').addClass('active');
                }
            });
            // 체크 박스 버튼 클릭 이벤트 --- 수정 2020.05.11
            jQuery('.myPhtoticketFlip .front .btn-toggle').first().addClass('active');
            jQuery('.myPhtoticketFlip .back .btn-toggle').first().addClass('active');

            jQuery('.btn-toggle').on('click', function () {
                if(jQuery(this).hasClass('active')) {
                    jQuery(this).parents('.slider-wrap').find('.btn-toggle').removeClass('active');
                    jQuery(this).parents('.flipper').find('.btn-toggle').addClass('active');
                    // jQuery('.btn-boast').addClass('disabled');

                } else {
                    jQuery(this).parents('.slider-wrap').find('.btn-toggle').removeClass('active');
                    jQuery(this).parents('.flipper').find('.btn-toggle').addClass('active');
                    // jQuery('.btn-boast').removeClass('disabled');
                }
            });

            // 자랑하기 버튼 클릭시 alert 팝업
            jQuery('._alertBoast').on('click',function () {
                jQuery('#pop_alert').addClass('active');
            })


            // 취소 버튼 클릭 이벤트 --- 2020.05.08 추가
            jQuery('._confirmBtn').on('click',function () {
                jQuery('#pop_alert').removeClass('active');
                jQuery('#pop_alert2').addClass('active');
            });

            // 취소 버튼 클릭 이벤트 --- 2020.05.08 추가
            jQuery('._cancelBtn').on('click',function () {
                jQuery('#pop_alert').removeClass('active');
                jQuery('#pop_alert2').removeClass('active');
                jQuery('#pop_alert3').removeClass('active');
                jQuery('#pop_alert4').removeClass('active');
            });

            // 결제 취소 버튼 클릭 이벤트 --- 2020.05.08 추가
            jQuery('._cancelPay').on('click',function () {
                jQuery('#pop_alert3').addClass('active');
            });

            // 결제 취소 버튼 클릭 이벤트 --- 2020.05.08 추가
            jQuery('._confirmPay').on('click',function () {
                jQuery('#pop_alert4').addClass('active');
                jQuery('#pop_alert3').removeClass('active');
            });

            // 삭제하기 버튼 클릭 이벤트 --- 2020.05.08 추가
            jQuery('._deleteBtn').on('click',function () {
                jQuery('#pop_alert3').addClass('active');
            });

            // 조회기간 클릭 이벤트 다중처리 X
            jQuery('._dayClick').on('click', function () {
                if(jQuery(this).hasClass('active')){
                    jQuery(this).siblings().removeClass('active');
                    jQuery('._inputDate').attr( 'disabled', true );
                }
                else {
                    jQuery(this).addClass('active').siblings().removeClass('active');
                    jQuery('._inputDate').attr( 'disabled', true );
                }
            });

            // 조회기간 활성화/비활성화
            jQuery('._direct').on('click', function () {
                if(jQuery(this).hasClass('active')){
                    jQuery(this).siblings().removeClass('active');
                    jQuery('._inputDate').attr( 'disabled', false );
                }
                else {
                    jQuery(this).addClass('active').siblings().removeClass('active');
                    jQuery('._inputDate').attr( 'disabled', false );
                }
            });

            // 초기화 토스트 팝업 --- 2020.05.07
            jQuery('._reset').on('click',function () {
                jQuery('#filterToast').show().fadeOut(1500);
            })

            // 초기화 토스트 팝업 --- 2020.05.07
            jQuery('._cancelPop').on('click',function () {
                jQuery('#cancelToast').show().fadeOut(1500);
            })

            // 플립 슬라이더 팝업
            // 버튼 클릭시 플립
            jQuery('._flip').on('click', function () {
                jQuery(this).parentsUntil('.swiper-slide').eq(3).toggleClass('active')
            });


            //사이트맵
            window.siteMapFn = siteMapFn;

            function siteMapFn() {
                jQuery('#headerTitle').siblings('#siteMap').show();
                dimed();
            }

            window.close_sitemapFn = close_sitemapFn;

            function close_sitemapFn() {
                jQuery('#headerTitle').siblings('#siteMap').hide();
                dimed();
            }

            // 공유하기 팝업
            popLayerShowHide("icon_share", "popShare", "popFogBg");

            // 기간검색 팝업
            popLayerShowHide("icon_search", "popScheduleInfo", "popFogBg");
            jQuery('.popFogBg').on({
                click: function (e) {
                    var jQueryfogBg = jQuery(e.target);
                    var jQuerypopLayer;
                    jQueryfogBg.css({'display': 'none'});
                    popLayerBgShowHide(jQuery('popFogBg'), jQuerypopLayer, true);
                    jQuery('body').off('scroll touchmove mousewheel');
                }
            });

            // alert
            window.alertMessage = alertMessage;

            function alertMessage() {
                jQuery('#pop_alert').show();
                jQuery('#pop_alert2').show();
                jQuery('#pop_alert3').show();
                jQuery('#pop_alert4').show();
                dimed();
            }

            // pop_alert, 헤더 z-index 조정
            jQuery('#pop_alert').hasClass('active') ? jQuery('#header_box').css('z-index', '0') : ''

            // 사이트맵 위치 조정
            if (jQuery('#header_box').hasClass('double')) {
                jQuery('.allview_wrap .allview_box_wrap').css('top', '-44px');
                jQuery('.photo_ticket .ptboast_wrap').css('padding-top', '56px');
            }

            //팝업 dim
            window.dimed = dimed;

            function dimed() {
                if (jQuery('#fogbg').hasClass('active')) {
                    jQuery('#fogbg').hide();
                } else {
                    jQuery('#fogbg').show();
                }
            }
        }
    }

    front.page._PT001 = {
        load: function () {
            front.slider.photoSlider();
        },
    }

    // 상세 페이지 (내 포토티켓) - 헤더에 nav가 있는 경우
    front.page._PT002 = {
        load: function () {
            // nav
            var jbOffset = jQuery('.nav').offset();
            jQuery(window).scroll(function () {
                if (jQuery(document).scrollTop() > jbOffset.top) {
                    jQuery('.nav').addClass('active');
                } else {
                    jQuery('.nav').removeClass('active');
                }
            });
        },
    }

    // 2020.05.11 플립슬라이더 swipe 기능 제거
    // front.page._PT003 = {
    //     load: function () {
    //         front.slider.flipSlider();
    //     },
    // }

    jQuery(this).on(front.event._commonHandlers);

    switch (this.screenId) {
        case 'PT001':
            jQuery(this).on(front.page._PT001);
            break; // 메인 - 플립 슬라이더
        case 'PT002':
            jQuery(this).on(front.page._PT002);
            break; // 상세 페이지 (내 포토티켓) - 헤더에 nav가 있는 경우
        // case 'PT003':
        //     jQuery(this).on(front.page._PT003);
        //     break; // 플립 슬라이더(normal)
        default:
            break;
    }

    /**
     * SLIDER
     */

    // 메인 슬라이더 - 메인 공통
    front.slider.photoSlider = function () {
        front.slider.photoTicketSlider = new Swiper('.slider_wrap .swiper-container', {
            speed: 400,
            width : '260',
            autoPlay: true,
            autoHeight: false,
            direction: 'horizontal',
            loop: false,
            slidesPerView: 1,
            centeredSlides: true,
            breakpointsInverse: false,
            roundLengths: false,
            breakpoints: {
                320: {
                    spaceBetween: 20,
                },
                360: {
                    spaceBetween: 40
                }
            },
            on: {
                init: function () {
                },
            }
        });
        front.slider.photoTicketSlider.translateTo(0, 1, true);
    }

    // 이벤트 슬라이더 - 메인 공통
    front.slider.eventSlider = function () {
        front.slider.photoTicketEventSlider = new Swiper('.alert_wrap .swiper-container', {
            speed: 400,
            autoPlay: true,
            direction: 'horizontal',
            loop: jQuery(".alert_wrap .swiper-slide").length > 1,
            spaceBetween: 40,
            slidesPerView: 1,
            centeredSlides: true,
        });
    }

    // 플립 슬라이더
    front.slider.flipSlider = function () {
        front.slider.flipPhotoTicketSlider = new Swiper('.swiper-container', {
            speed: 400,
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
                },
            }
        });
        front.slider.flipPhotoTicketSlider.translateTo(0, 500, true, true);
    }

    // console.log(this);

    // 좋아요 버튼 클릭 이벤트--- 2020.05.12 추가
    front.event.btnHeartClick = function () {
        jQuery('._btnHeart').on('click', function () {
            jQuery(this).hasClass('active') ? jQuery(this).removeClass('active') : jQuery(this).addClass('active');
        });
    }

    /**
     * m.cgv 가져온 함수
     */
    this.setScrollWidth = function (_target, _btnL) {
        try {
            var _width = 0;

            var _targetParentPL = Number(_target.css('padding-left').replace('px', ''));
            var _targetParentPR = Number(_target.css('padding-right').replace('px', ''));

            _target.find('> li').each(function () {
                _width = jQuery(this).outerWidth(true) + _width;
            });

            if (_target.width() < _width) {
                _totalWidth = Math.ceil(_targetParentPL + _width + _targetParentPR) + 'px';
            } else {
                _totalWidth = '100%';
            }

            _target.css({'width': _totalWidth});

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

    function popLayerHasTopShowHide(_btn, _popLayer, _fogBg, _screenId) {
        var jQuerybtn = jQuery('.' + _btn);
        var jQuerypopLayer = jQuery('.' + _popLayer);
        var jQueryfogBg = jQuery('.' + _fogBg);
        var _isFogBg = jQueryfogBg.is(':visible');

        //jQuerybtn.off('click');
        jQuerybtn.on({
            click: function () {
                jQueryfogBg.css({'opacity': '.8', 'top': '0'});
                jQuerypopLayer.find('input[type="password"]').focus();
                if (_btn == 'btnComCGVReg') {
                    jQuerypopLayer.off('click');
                    jQuerypopLayer.on({
                        click: function (e) {
                            if (jQuery(e.target).hasClass(_popLayer) || jQuery(e.target).hasClass('popComCGVRegTxtWrap')) {
                                jQuery('.btnPopClose').trigger('click');
                            }
                        }
                    });
                }
                //기프트콘
                if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY012") {
                    CGVHAAppInterface.SetNavigationBar('CGV 기프트콘(영화관람권) 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|jQuery(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY007") {
                    CGVHAAppInterface.SetNavigationBar('CGV 할인쿠폰 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|jQuery(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY010") {
                    CGVHAAppInterface.SetNavigationBar('CGV 영화관람권 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|jQuery(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY016") {
                    CGVHAAppInterface.SetNavigationBar('CGV 무비패스카드 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|jQuery(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                }

                popLayerHasTopBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg, _screenId);
            }
        });
    }

    function popLayerHasTopBgShowHide(_target, _contentTarget, _is, _screenId) {    // pop dim
        if (!_is) {
            jQuery('html, body').css({'overflow': 'hidden', 'position': 'relative', 'width': '100%', 'height': '100%'});
            _contentTarget.show().stop().animate({'top': '0'}, 200, function () {
                _contentTarget.siblings("div:not('.popFogBg')").hide()
                _contentTarget.find('input[type=text]').focus();
                // 안드로이드 상위버전 정상(5.1.1/7.0), 하위버전 포커스만 이뤄짐(4.1.2/4.4.2), ios 정책상 키패드및 포커스 안됨
            });
            _target.show().on({
                click: function () {
                    _contentTarget.show().stop().animate({'top': '150%'}, 200, function () {
                        jQuery('html, body').css({
                            'overflow': 'visible',
                            'position': 'static',
                            'width': 'auto',
                            'height': 'auto'
                        });
                        _target.hide();

                        //기프트콘
                        if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY012") {
                            basicNavigation(1, '기프트콘', '');
                        } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY007") {
                            basicNavigation(1, '쿠폰함', '');
                        } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY010") {
                            basicNavigation(1, '영화관람권', '');
                        } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY016") {
                            basicNavigation(1, '무비패스카드', '');
                        }
                    });
                }
            }, function () {
                _target.off('click');
            });

            jQuery('.btnPopClose').on({
                click: function () {
                    _target.trigger('click');
                }
            });
        } else {
            _contentTarget.show().stop().animate({'top': '150%'}, 200, function () {
                fnFixedScroll(false);
                _target.hide();
            });
            jQuery('.btnPopClose').off('click');
        }
    }

    this.fnPopLayerShowHide = function (_btn, _popLayer, _fogBg, _isInit) {
        var jQuerypopLayer = jQuery('.' + _popLayer);
        var jQueryfogBg = jQuery('.' + _fogBg);
        var _isFogBg = jQueryfogBg.is(':visible');

        if (_btn == "") {
            if (_isInit) {
                jQueryfogBg.css({'opacity': '.5', 'top': '0'});
                popLayerBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg);
            }

        } else {
            var jQuerybtn = jQuery('.' + _btn);

            if (_isInit) {
                jQueryfogBg.css({'opacity': '.5', 'top': '0'});
                popLayerBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg);
            } else {
                jQuerypopLayer.siblings("div:not('.popFogBg')").hide();
                jQuerybtn.off('click');
                jQuerybtn.on({
                    click: function () {
                        jQueryfogBg.css({'opacity': '.5', 'top': '0'});
                        popLayerBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg);
                    }
                });
            }
        }
    }

    function popLayerShowHide(_btn, _popLayer, _fogBg) {
        var jQuerybtn = jQuery('.' + _btn);
        var jQuerypopLayer = jQuery('.' + _popLayer);
        var jQueryfogBg = jQuery('.' + _fogBg);
        var _isFogBg = jQueryfogBg.is(':visible');
        jQuerypopLayer.siblings("div:not('.popFogBg')").hide();
        jQuerybtn.off('click');
        jQuerybtn.on({
            click: function () {
                jQueryfogBg.css({'opacity': '.5', 'top': '0'});
                popLayerBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg);

//                if(_popLayer == 'popMiniMap'){  // 미니맵일 경우 예외처리
//                    var winWidth = jQuery(window).outerWidth();
//                    var activeItemLeft = jQuery('.popMiniMap_Schedule_list li.active').offset().left;
//                    var scrollLeft = jQuery('.popMiniMap_Schedule_list').scrollLeft();
//                    var itemWidth = jQuery('.popMiniMap_Schedule_list li.active').outerWidth();
//
//                    var centerScroll = scrollLeft + activeItemLeft - (winWidth - itemWidth) / 2;
//
//                    jQuery('.popMiniMap_Schedule_list').scrollLeft(centerScroll)
//                }
            }
        });
    }

    function popLayerSeatShowHide(_btn, _popLayer, _fogBg) {
        var jQuerybtn = jQuery('.' + _btn);
        var jQuerypopLayer = jQuery('.' + _popLayer);
        var jQueryfogBg = jQuery('.' + _fogBg);
        var _isFogBg = jQueryfogBg.is(':visible');

        jQuerybtn.off('click');
        jQuerybtn.on({
            click: function () {
                console.log(jQuerybtn.attr('data-is-event') == 'true')
                if (jQuerybtn.attr('data-is-event') == 'true') {

                    jQuerypopLayer.siblings("div:not('.popFogBg')").hide();
                    jQueryfogBg.css({'opacity': '.5', 'top': '0'});
                    popLayerBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg);
                }
            }
        });
    }

    function popLayerBgShowHide(_target, _contentTarget, _is) {    // pop dim
        if (!_is) {
            fnFixedScroll(true);
            _contentTarget.show().stop().animate({'bottom': '0'}, 200);
            setTimeout(function () {
                jQuery('.popLayerHeader').find('a:first').focus();
            }, 0);
            _target.show().on({
                click: function () {
                    _contentTarget.stop().animate({'bottom': '-100%'}, 200, function () {
                        fnFixedScroll(false);
                        _target.hide();
                        _contentTarget.hide();
                    });
                }
            }, function () {
                _target.off('click');
            });

            jQuery('.btnPopClose').on({
                click: function () {
                    _contentTarget.find('.popLayerFooter').off('focusout');
                    jQuery('.btnPopClose').off('focusout');
                    _target.trigger('click');
                    setTimeout(function () {
                        jQuery('.btnLayerPop').focus();
                    }, 0);
                },
                focusout: function () {
                    setTimeout(function () {
                        if (!(jQuery(':focus').parents().hasClass('popLayer'))) {
                            jQuery('.btnPopConfirm').focus();
                        }
                    }, 0);
                }
            });

            _contentTarget.find('.popLayerFooter').on({
                focusout: function () {
                    setTimeout(function () {
                        if (!(jQuery(':focus').parents().hasClass('popLayer'))) {
                            jQuery('.btnPopClose').focus();
                        }
                    }, 0);
                }
            });
        } else {
            try {
                _contentTarget.stop().animate({'bottom': '-100%'}, 200, function () {
                    fnFixedScroll(false);
                    _target.hide();
                    _contentTarget.hide();
                });
            } catch {
            }
            jQuery('.btnPopClose').off('click');
        }
    }

    function popLayerFadeShowHide(_btn, _popLayer, _fogBg) {
        var jQuerybtn = jQuery('.' + _btn);
        var jQuerypopLayer = jQuery('.' + _popLayer);
        var jQueryfogBg = jQuery('.' + _fogBg);
        var _isFogBg = jQueryfogBg.is(':visible');

        if (!_isFogBg) {
            fnFixedScroll(true);
            jQuerypopLayer.show();
            jQueryfogBg.show().on({
                click: function () {
                    fnFixedScroll(false);
                    jQueryfogBg.hide();
                    jQuerypopLayer.hide();
                    jQuerypopLayer.parent().css({'top': '100%', 'background-color': '#000'});
                }
            });
            jQuerypopLayer.parent().css({'top': '0', 'background-color': 'transparent'});

            jQuery('.btnPopClose').on({
                click: function () {
                    jQuerybtn.trigger('click');
                }
            });

        } else {
            fnFixedScroll(false);
            jQueryfogBg.hide();
            jQuerypopLayer.hide();
            jQuerypopLayer.parent().css({'top': '100%', 'background-color': '#000'});
            jQuery('.btnPopClose').off('click');
        }
    }

    function fnFixedScroll(_is) {
        if (_is) {
            //currentScroll = jQuery(this).scrollTop();
            jQuery('body').addClass('scrlOff');
            //            jQuery(window).bind('scroll').scroll(function(e){jQuery(this).scrollTop(top).scrollLeft(left);e.preventDefault();e.stopPropagation();});
        } else {
            jQuery('body').removeClass('scrlOff');
            //jQuery('body').css({'top':'auto'});
            //            jQuery(window).unbind('scroll');
        }
        //jQuery('body').css({'top':(-1 * currentScroll) + 'px'});
    }

    function fnScrollFixed(_is) {
        if (_is) {
            currentScroll = jQuery(this).scrollTop();
            jQuery('body').addClass('scrlOff');
            jQuery('body').css({'top': (-1 * currentScroll) + 'px'});
            jQuery(win).bind('scroll').scroll(function (e) {
                jQuery(this).scrollTop(0).scrollLeft(0);
                e.preventDefault();
                e.stopPropagation();
            });
        } else {
            jQuery('body').removeClass('scrlOff');
            jQuery(win).unbind('scroll');
            jQuery(this).scrollTop(currentScroll);
            jQuery('body').css({'top': 'auto'});

            jQuery(this).on({
                scroll: function () {
                    var _scrollTop = jQuery(this).scrollTop();
                    (_scrollTop > 0) ? jQuery('.btnTop').show() : jQuery('.btnTop').hide();
                }
            });
        }
    }

    /* [S] 공통 팝업 닫음 */
    jQuery.fn.closePopupLayer = function () {
        jQuery('.btnPopClose').trigger('click');
    }
    /* [E] 공통 팝업 닫음  */

    jQuery.fn.comPopupLayer = function (_state, _targetClassName, _bgOpacity) {
        /* 인자값 정의 :
            _state  :
                - true : open
                - false : close
            _targetClassName : 팝업레이어 className
            _bgOpacity : Dim opacity (0 ~ 1)
        */

        if (_state) {
            fnScrollFixed(true);
            jQuery('.com_pop_fog').css({'opacity': _bgOpacity, 'top': '0', 'display': 'block'});

            //jQuery('.com_pop_fog').css({'opacity':_bgOpacity, 'top':'0'});
            jQuery('.btnTop').hide();

            jQuery('.com_pop_btn_close').on({
                click: function (e) {
                    jQuery('.com_pop_fog').trigger('click');
                }
            });

            jQuery('.com_pop_fog').on({
                click: function (e) {
                    jQuery('.com_pop_btn_close, .com_pop_fog').off('click');
                    jQuery('.btnTop').show();
                    jQuery('.com_pop_fog').css({'display': 'none'});
                    //jQuery(e.target).css({'top':'150%'});
                    fnScrollFixed(false);
                    jQuery('.' + _targetClassName).show().stop().animate({'bottom': '0'}, 200, function () {
                        jQuery('.' + _targetClassName).hide();
                    });
                }
            });
            setTimeout(function () {
                jQuery('.com_pop_header').find('a:first').focus();
            }, 0);
            jQuery('.' + _targetClassName).show().stop().animate({'bottom': '100%'}, 200, function () {
            });
        } else {
            jQuery('.com_pop_fog').trigger('click');
        }
        return this;
    }

    jQuery.fn.comCheckboxChecker = function (_checkboxWrap, _checkboxType) {
        var jQuerycheckboxWrap = jQuery('.' + _checkboxWrap)
        jQuery('input[type="checkbox"]').on({
            change: function (e) {
                if (jQuery(e.target).hasClass(_checkboxType)) {
                    if (jQuery(e.target).is(':checked')) {
                        jQuerycheckboxWrap.find('dd').children('input[type="checkbox"]').prop('checked', true);
                    } else {
                        jQuerycheckboxWrap.find('dd').children('input[type="checkbox"]').prop('checked', false);
                    }
                } else {
                    var _isAllCheck = true;

                    (jQuery(e.target).is(':checked')) ? jQuery(e.target).prop('checked', true) : jQuery(e.target).prop('checked', false)


                    jQuerycheckboxWrap.find('dd').each(function () {
                        if (jQuery(this).children('input[type="checkbox"]').data('required')) {
                            _isAllCheck *= jQuery(this).children('input[type="checkbox"]').is(':checked');
                        }
                    });


                    jQuerycheckboxWrap.find('dt').children('input[type="checkbox"]').prop('checked', _isAllCheck);

                }
            }
        });
    }

    jQuery.fn.comMultiCheckboxChecker = function () {
        if (arguments.length > 0) {
            var jQuerytargetWrap = jQuery('.' + arguments[0]);
            var aryClassName = [];
            for (var i = 0; i < arguments.length; i++) {
                aryClassName[i] = arguments[i];
            }

            jQuery('input[type="checkbox"]').on({
                change: function (e) {
                    if (jQuery(e.target).hasClass(aryClassName[1])) {
                        if (jQuery(e.target).is(':checked')) {
                            jQuerytargetWrap.find('input[type="checkbox"]').prop('checked', true);
                        } else {
                            jQuerytargetWrap.find('input[type="checkbox"]').prop('checked', false);
                        }
                    } else if (jQuery(e.target).hasClass(aryClassName[2])) {
                        var _isAllCheck = true;

                        if (jQuery(e.target).is(':checked')) {
                            jQuery(e.target).parent().nextUntil('dt').children('input[type="checkbox"]').prop('checked', true);
                        } else {
                            jQuery(e.target).parent().nextUntil('dt').children('input[type="checkbox"]').prop('checked', false);
                        }

                        jQuerytargetWrap.find('.' + aryClassName[2]).each(function (idx) {
                            if (jQuery(this).data('required')) {
                                _isAllCheck *= jQuery(this).is(':checked');
                            }
                        });

                        jQuery('.' + aryClassName[1]).prop('checked', _isAllCheck);
                    } else {
                        var _isAllParticleCheck = true;

                        var gName = (jQuery(e.target).data('group'));

                        jQuerytargetWrap.find('dd input[data-group="' + gName + '"]').each(function (idx) {
                            if (jQuery(this).data('required')) {
                                _isAllParticleCheck *= jQuery(this).is(':checked');
                            }
                        });

                        jQuerytargetWrap.find('dt input[data-group="' + gName + '"]').prop('checked', _isAllParticleCheck);

                        var _isAllCheck = true;

                        jQuerytargetWrap.find('.' + aryClassName[2]).each(function (idx) {
                            if (jQuery(this).data('required')) {
                                _isAllCheck *= jQuery(this).is(':checked');
                            }
                        });

                        jQuery('.' + aryClassName[1]).prop('checked', _isAllCheck);
                    }
                }
            });
        }
    }

    jQuery.fn.setSelectboxValue = function (_obj) {
        var currentTargetVal = jQuery('.' + _obj.target).text();
        var len = _obj.valueTargets.length;

        for (var i = 0; i < len; i++) {
            jQuery('.' + _obj.valueTargets[i]).text(currentTargetVal);
        }

        jQuery('.' + _obj.valueTargets[0]).trigger('click');
    }

    jQuery.fn.comFormNumberCnt = function (_cntTargetClassName, _totalPlaceTargetClassName, _increase, _minCnt, _maxCnt) {
        var _firstCnt = Number(jQuery("." + _cntTargetClassName).text());
        var _currentPrice = jQuery("." + _totalPlaceTargetClassName).text().replace(/[^\d]+/g, '');
        var _onePrice = Number(_currentPrice / _firstCnt);

        var _currentCnt = _firstCnt + _increase;


        if (_currentCnt <= _minCnt) {
            _currentCnt = 1;
        } else if (_currentCnt > _maxCnt) {
            if (_maxCnt <= 0) {
                _currentCnt = 1;
            } else {
                _currentCnt = _maxCnt;
                alert("최대 " + _maxCnt + "개의 상품 구매가 가능합니다");
            }
        } else {
            _currentCnt = _firstCnt + _increase;
        }
        var _totalPrice = jQuery.fn.addComma(_onePrice * _currentCnt);

        jQuery("." + _cntTargetClassName).text(_currentCnt);
        jQuery("." + _totalPlaceTargetClassName).text(_totalPrice);

        return this;
    }

    jQuery.fn.comAccrodionMenu = function (_target) {
        var jQuerytarget = jQuery('.' + _target);
        var _isState = jQuerytarget.hasClass('active');

        if (_isState) {   // 닫기
            jQuerytarget.children('ul, dl').slideUp('fast', function () {
                jQuerytarget.removeClass('active');
            });

        } else {  // 열기
            jQuerytarget.children('ul, dl').slideDown('fast', function () {
                jQuerytarget.addClass('active');
            });
            //jQuerytarget.addClass('active');
        }
    }

    jQuery.fn.addComma = function (num) { // 콤마 찍기
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(regexp, ',');
    }

    jQuery.dDaySetTime = function (_num) {
        var currentTime = _num;
        var prevTime = (currentTime != 0) ? (currentTime - 1) : 0;

        var _day = Math.floor(currentTime / 60 / 60 / 24);
        var _hour = Math.floor(currentTime / 60 / 60) - (_day * 24);
        var _min = Math.floor(currentTime / 60) - (_day * 24 * 60) - (_hour * 60);
        var _sec = Math.floor(currentTime) - (_day * 24 * 60 * 60) - (_hour * 60 * 60) - (_min * 60);

        var _prevDay = Math.floor(prevTime / 60 / 60 / 24);
        var _prevHour = Math.floor(prevTime / 60 / 60) - (_prevDay * 24);
        var _prevMin = Math.floor(prevTime / 60) - (_prevDay * 24 * 60) - (_prevHour * 60);
        var _prevSec = Math.floor(prevTime) - (_prevDay * 24 * 60 * 60) - (_prevHour * 60 * 60) - (_prevMin * 60);

        function numArr(_num) {
            var numAry = [];
            if (_num < 10) {
                numAry[0] = 0;
                numAry[1] = _num;
            } else {
                numAry[0] = Number(String(_num).substr(0, 1));
                numAry[1] = Number(String(_num).substr(1, 1));
            }
            return numAry;
        }

        var obj = {
            'day': _day,
            'hour00': numArr(_hour)[0],
            'hour0': numArr(_hour)[1],
            'min00': numArr(_min)[0],
            'min0': numArr(_min)[1],
            'sec00': numArr(_sec)[0],
            'sec0': numArr(_sec)[1],
            'prevDay': _prevDay,
            'prevHour00': numArr(_prevHour)[0],
            'prevHour0': numArr(_prevHour)[1],
            'prevMin00': numArr(_prevMin)[0],
            'prevMin0': numArr(_prevMin)[1],
            'prevSec00': numArr(_prevSec)[0],
            'prevSec0': numArr(_prevSec)[1]
        }
        return obj;
    }
    var interval;

    jQuery.dDaySet = function () {
        cntObj = arguments;

        var cntObjLen = cntObj.length;

        initSetDisplayCnt(cntObj);

        if (cntObjLen > 0) {
            interval = setInterval(timeout, 1000);
        } else {
        }

        function timeout() {
            var cntLen = cntObj.length;
            var jQuerytarget;

            for (var i = 0; i < cntLen; i++) {
                jQuerytarget = jQuery("#" + cntObj[i].target);

                if (jQuery.dDaySetTime(cntObj[i].time).hour00 != jQuery.dDaySetTime(cntObj[i].time).prevHour00) {
                    jQuery("#" + cntObj[i].target).find('.hour00').addClass('ani');
                    jQuery.fn.animationEnd(cntObj[i], 'hour00', i);
                }

                if (jQuery.dDaySetTime(cntObj[i].time).hour0 != jQuery.dDaySetTime(cntObj[i].time).prevHour0) {
                    jQuery("#" + cntObj[i].target).find('.hour0').addClass('ani');
                    jQuery.fn.animationEnd(cntObj[i], 'hour0', i);
                }

                if (jQuery.dDaySetTime(cntObj[i].time).min00 != jQuery.dDaySetTime(cntObj[i].time).prevMin00) {
                    jQuery("#" + cntObj[i].target).find('.min00').addClass('ani');
                    jQuery.fn.animationEnd(cntObj[i], 'min00', i);
                }

                if (jQuery.dDaySetTime(cntObj[i].time).min0 != jQuery.dDaySetTime(cntObj[i].time).prevMin0) {
                    jQuery("#" + cntObj[i].target).find('.min0').addClass('ani');
                    jQuery.fn.animationEnd(cntObj[i], 'min0', i);
                }

                if (jQuery.dDaySetTime(cntObj[i].time).sec00 != jQuery.dDaySetTime(cntObj[i].time).prevSec00) {
                    jQuery("#" + cntObj[i].target).find('.sec00').addClass('ani');
                    jQuery.fn.animationEnd(cntObj[i], 'sec00', i);
                }


                if (jQuery.dDaySetTime(cntObj[i].time).sec0 != jQuery.dDaySetTime(cntObj[i].time).prevSec0) {
                    jQuery("#" + cntObj[i].target).find('.sec0').addClass('ani');
                    jQuery.fn.animationEnd(cntObj[i], 'sec0', i);
                }
                cntObj[i].time -= 1;
                if (cntObj[i].time < 0) {
                    clearInterval(interval);
                    try {
                        fnHotDealClose();   //  개발쪽에서 사용하는 함수
                    } catch (e) {
                    }
                }
            }
        }

        function initSetDisplayCnt(_target) {

            var jQuerytarget;
            var cntLen = _target.length;

            for (var i = 0; i < cntLen; i++) {
                jQuerytarget = jQuery("#" + cntObj[i].target);

                /* S 남은 수량 */
                var jQueryhotdealRestItems = jQuerytarget.parent().parent().find('.hotdeal_rest_items');
                jQueryhotdealRestItems.text(cntObj[i].restItems);    /* E 남은 수량 */

                jQuery.fn.setDisplayCnt(jQuerytarget, cntObj[i].time);
            }
        }

    };

})(jQuery);
