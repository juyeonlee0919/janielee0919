// 포토티켓
// 작성일 : 2020.04.20
// 작성자 : 이주연

(function ($) {
    var win = this;

    this._commonHandlers = {
        load: function () {
            $('.btnTop').on({
                click: function (e) {
                    e.preventDefault();
                    $('html').stop().animate({scrollTop: '0'});
                }
            });

            // header 클릭 이벤트
            $('#navMain ._tab').on('click', function () {
                $('._tab').removeClass('active');
                $(this).addClass('active');
                return false;
            });

            // click 이벤트
            $('._click').on('click', function () {
                $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');
            });

            // 자랑하기 버튼
            $('._btnBoast').on('click', function () {
                $(this).hasClass('active') ? $(this).removeClass('active').text('자랑하기') : $(this).text('자랑취소').addClass('active');
            });

            // 조회기간 클릭 이벤트 다중처리 X
            $('._dayClick').on('click', function () {
                if($(this).hasClass('active')){
                    $(this).siblings().removeClass('active');
                    $('._inputDate').attr( 'disabled', true );
                }
                else {
                    $(this).addClass('active').siblings().removeClass('active');
                    $('._inputDate').attr( 'disabled', true );
                }
            });
            // 조회기간 활성화/비활성화
            $('._direct').on('click', function () {
                if($(this).hasClass('active')){
                    $(this).siblings().removeClass('active');
                    $('._inputDate').attr( 'disabled', false );
                }
                else {
                    $(this).addClass('active').siblings().removeClass('active');
                    $('._inputDate').attr( 'disabled', false );
                }
            });

            // 이벤트 슬라이더 - 메인 공통
            var photoTicketEventSlider = new Swiper('.alert_wrap .swiper-container', {
                speed: 400,
                autoPlay: true,
                direction: 'horizontal',
                loop: $(".alert_wrap .swiper-slide").length > 1,
                spaceBetween: 40,
                slidesPerView: 1,
                centeredSlides: true,
            });

            // 초기화 토스트 팝업
            $('._reset').on('click',function () {
                $('#filterToast').show().fadeOut(1000);
            })

            // 플립 슬라이더 팝업
            // 버튼 클릭시 플립
            $('._flip').on('click', function () {
                $(this).parentsUntil('.swiper-slide').eq(3).toggleClass('active')
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

            $('.btn-toggle').on('click', function () {

                if($(this).hasClass('active')) {
                    $(this).parents('.slider-wrap').find('.btn-toggle').removeClass('active');
                    $(this).parents('.flipper').find('.btn-toggle').removeClass('active');
                } else {
                    $(this).parents('.slider-wrap').find('.btn-toggle').removeClass('active');
                    $(this).parents('.flipper').find('.btn-toggle').addClass('active');
                }
            });

            // 공유하기 팝업
            popLayerShowHide("icon_share", "popShare", "popFogBg");

            // 기간검색 팝업
            popLayerShowHide("icon_search", "popScheduleInfo", "popFogBg");
            $('.popFogBg').on({
                click: function (e) {
                    var $fogBg = $(e.target);
                    var $popLayer;
                    $fogBg.css({'display': 'none'});
                    popLayerBgShowHide($('popFogBg'), $popLayer, true);
                    $('body').off('scroll touchmove mousewheel');
                }
            });

            // alert
            window.alertMessage = alertMessage;

            function alertMessage() {
                jQuery('#pop_alert').show();
                dimed();
            }

            // pop_alert, 헤더 z-index 조정
            $('#pop_alert').hasClass('active') ? $('#header_box').css('z-index', '0') : ''

            // 사이트맵 위치 조정
            if ($('#header_box').hasClass('double')) {
                $('.allview_wrap .allview_box_wrap').css('top', '-44px');
                $('.photo_ticket .ptboast_wrap').css('padding-top', '56px');
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


    this._PT001 = {
        load: function () {
            var photoTicketSlider = new Swiper('.slider_wrap .swiper-container', {
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
            photoTicketSlider.translateTo(0, 1, true);
            // $(window).resize(function () {
            //     location.reload();
            // });
        },
    }

    this._PT002 = {
        load: function () {
            // nav
            var jbOffset = $('.nav').offset();
            $(window).scroll(function () {
                if ($(document).scrollTop() > jbOffset.top) {
                    $('.nav').addClass('active');
                } else {
                    $('.nav').removeClass('active');
                }
            });
        },
    }

    this._PT003 = {
        load: function () {
            // 플립 슬라이더
            // console.log('플립 슬라이더');
            var flipPhotoTicketSlider = new Swiper('.swiper-container', {
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
                        // console.log('동작');
                        // var nWindowWidth = $(window).width();
                        // var nPadding = (nWindowWidth - 282) / 2
                        // setTimeout(function () {
                        //     $('.myPhtoticketFlip .swiper-container')
                        //         .css({
                        //             'width': '100%',
                        //             'margin': '0 auto',
                        //             'padding-left': nPadding
                        //         })
                        // }, 100)
                    },
                }
            });
            flipPhotoTicketSlider.translateTo(0, 500, true, true);
            // $(window).resize(function () {
            //     location.reload();
            // });
        },
    }

    this._PT004 = {
        load: function () {
            var flipPhotoTicketSlider = new Swiper('.swiper-container', {
                speed: 400,
                autoHeight: false,
                direction: 'horizontal',
                loop: false,
                spaceBetween: 5,
                slidesPerView: 1,
                centeredSlides: true,
                breakpointsInverse: false,
                roundLengths: false,
                pagination: {
                    el: '.swiper-pagination',
                },
                on: {
                    init: function () {
                        // var nWindowWidth = $(window).width();
                        // var nPadding = (nWindowWidth - 290) / 2
                        // setTimeout(function () {
                        //     $('.myPhtoticketFlip .swiper-container')
                        //         .css({
                        //             'width': '100%',
                        //             'margin': '0 auto',
                        //             'padding-left': nPadding
                        //         })
                        // }, 100)
                    },
                }
            });
            flipPhotoTicketSlider.translateTo(0, 500, true, true);
            // $(window).resize(function () {
            //     location.reload();
            // });
            // console.log('4번')
            // popLayerShowHide('icon_popup_my','popMyPhototicket','popFogBg');
            // popLayerShowHide('icon_popup_other','popOtherPhototicket','popFogBg');
            // $('.popFogBg').on({
            //     click:function(e){
            //         var $fogBg = $(e.target);
            //         var $popLayer;
            //         $fogBg.css({'display':'none'});
            //         popLayerBgShowHide($('popFogBg'), $popLayer, true);
            //         $('body').off('scroll touchmove mousewheel');
            //     }
            // });
        },
    }

    $(this).on(this._commonHandlers);

    switch (win.screenId) {
        case 'PT001':
            $(this).on(this._PT001);
            break; // 메인 - 플립 슬라이더
        case 'PT002':
            $(this).on(this['_' + win.screenId]);
            break; // 상세 페이지 (내 포토티켓) - 헤더에 nav가 있는 경우
        case 'PT003':
            $(this).on(this._PT003);
            break; // 플립 슬라이더(normal)
        // case 'PT004':
        //     $(this).on(this._PT004);
        //     break; // 플립 슬라이더(small)
        default:
            break;
    }

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
        var $btn = $('.' + _btn);
        var $popLayer = $('.' + _popLayer);
        var $fogBg = $('.' + _fogBg);
        var _isFogBg = $fogBg.is(':visible');

        //$btn.off('click');
        $btn.on({
            click: function () {
                $fogBg.css({'opacity': '.8', 'top': '0'});
                $popLayer.find('input[type="password"]').focus();
                if (_btn == 'btnComCGVReg') {
                    $popLayer.off('click');
                    $popLayer.on({
                        click: function (e) {
                            if ($(e.target).hasClass(_popLayer) || $(e.target).hasClass('popComCGVRegTxtWrap')) {
                                $('.btnPopClose').trigger('click');
                            }
                        }
                    });
                }
                //기프트콘
                if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY012") {
                    CGVHAAppInterface.SetNavigationBar('CGV 기프트콘(영화관람권) 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|$(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY007") {
                    CGVHAAppInterface.SetNavigationBar('CGV 할인쿠폰 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|$(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY010") {
                    CGVHAAppInterface.SetNavigationBar('CGV 영화관람권 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|$(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY016") {
                    CGVHAAppInterface.SetNavigationBar('CGV 무비패스카드 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|$(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                }

                popLayerHasTopBgShowHide($fogBg, $popLayer, _isFogBg, _screenId);
            }
        });
    }

    function popLayerHasTopBgShowHide(_target, _contentTarget, _is, _screenId) {    // pop dim
        if (!_is) {
            $('html, body').css({'overflow': 'hidden', 'position': 'relative', 'width': '100%', 'height': '100%'});
            _contentTarget.show().stop().animate({'top': '0'}, 200, function () {
                _contentTarget.siblings("div:not('.popFogBg')").hide()
                _contentTarget.find('input[type=text]').focus();
                // 안드로이드 상위버전 정상(5.1.1/7.0), 하위버전 포커스만 이뤄짐(4.1.2/4.4.2), ios 정책상 키패드및 포커스 안됨
            });
            _target.show().on({
                click: function () {
                    _contentTarget.show().stop().animate({'top': '150%'}, 200, function () {
                        $('html, body').css({
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

            $('.btnPopClose').on({
                click: function () {
                    _target.trigger('click');
                }
            });
        } else {
            _contentTarget.show().stop().animate({'top': '150%'}, 200, function () {
                fnFixedScroll(false);
                _target.hide();
            });
            $('.btnPopClose').off('click');
        }
    }

    win.fnPopLayerShowHide = function (_btn, _popLayer, _fogBg, _isInit) {
        var $popLayer = $('.' + _popLayer);
        var $fogBg = $('.' + _fogBg);
        var _isFogBg = $fogBg.is(':visible');

        if (_btn == "") {
            if (_isInit) {
                $fogBg.css({'opacity': '.5', 'top': '0'});
                popLayerBgShowHide($fogBg, $popLayer, _isFogBg);
            }

        } else {
            var $btn = $('.' + _btn);

            if (_isInit) {
                $fogBg.css({'opacity': '.5', 'top': '0'});
                popLayerBgShowHide($fogBg, $popLayer, _isFogBg);
            } else {
                $popLayer.siblings("div:not('.popFogBg')").hide();
                $btn.off('click');
                $btn.on({
                    click: function () {
                        $fogBg.css({'opacity': '.5', 'top': '0'});
                        popLayerBgShowHide($fogBg, $popLayer, _isFogBg);
                    }
                });
            }
        }
    }

    function popLayerShowHide(_btn, _popLayer, _fogBg) {
        var $btn = $('.' + _btn);
        var $popLayer = $('.' + _popLayer);
        var $fogBg = $('.' + _fogBg);
        var _isFogBg = $fogBg.is(':visible');
        $popLayer.siblings("div:not('.popFogBg')").hide();
        $btn.off('click');
        $btn.on({
            click: function () {
                $fogBg.css({'opacity': '.5', 'top': '0'});
                popLayerBgShowHide($fogBg, $popLayer, _isFogBg);

//                if(_popLayer == 'popMiniMap'){  // 미니맵일 경우 예외처리
//                    var winWidth = $(window).outerWidth();
//                    var activeItemLeft = $('.popMiniMap_Schedule_list li.active').offset().left;
//                    var scrollLeft = $('.popMiniMap_Schedule_list').scrollLeft();
//                    var itemWidth = $('.popMiniMap_Schedule_list li.active').outerWidth();
//
//                    var centerScroll = scrollLeft + activeItemLeft - (winWidth - itemWidth) / 2;
//
//                    $('.popMiniMap_Schedule_list').scrollLeft(centerScroll)
//                }
            }
        });
    }

    function popLayerSeatShowHide(_btn, _popLayer, _fogBg) {
        var $btn = $('.' + _btn);
        var $popLayer = $('.' + _popLayer);
        var $fogBg = $('.' + _fogBg);
        var _isFogBg = $fogBg.is(':visible');


        $btn.off('click');
        $btn.on({
            click: function () {
                console.log($btn.attr('data-is-event') == 'true')
                if ($btn.attr('data-is-event') == 'true') {

                    $popLayer.siblings("div:not('.popFogBg')").hide();
                    $fogBg.css({'opacity': '.5', 'top': '0'});
                    popLayerBgShowHide($fogBg, $popLayer, _isFogBg);
                }
            }
        });
    }

    function popLayerBgShowHide(_target, _contentTarget, _is) {    // pop dim
        if (!_is) {
            fnFixedScroll(true);
            _contentTarget.show().stop().animate({'bottom': '0'}, 200);
            setTimeout(function () {
                $('.popLayerHeader').find('a:first').focus();
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

            $('.btnPopClose').on({
                click: function () {
                    _contentTarget.find('.popLayerFooter').off('focusout');
                    $('.btnPopClose').off('focusout');
                    _target.trigger('click');
                    setTimeout(function () {
                        $('.btnLayerPop').focus();
                    }, 0);
                },
                focusout: function () {
                    setTimeout(function () {
                        if (!($(':focus').parents().hasClass('popLayer'))) {
                            $('.btnPopConfirm').focus();
                        }
                    }, 0);
                }
            });

            _contentTarget.find('.popLayerFooter').on({
                focusout: function () {
                    setTimeout(function () {
                        if (!($(':focus').parents().hasClass('popLayer'))) {
                            $('.btnPopClose').focus();
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
            $('.btnPopClose').off('click');
        }
    }

    function popLayerFadeShowHide(_btn, _popLayer, _fogBg) {
        var $btn = $('.' + _btn);
        var $popLayer = $('.' + _popLayer);
        var $fogBg = $('.' + _fogBg);
        var _isFogBg = $fogBg.is(':visible');

        if (!_isFogBg) {
            fnFixedScroll(true);
            $popLayer.show();
            $fogBg.show().on({
                click: function () {
                    fnFixedScroll(false);
                    $fogBg.hide();
                    $popLayer.hide();
                    $popLayer.parent().css({'top': '100%', 'background-color': '#000'});
                }
            });
            $popLayer.parent().css({'top': '0', 'background-color': 'transparent'});

            $('.btnPopClose').on({
                click: function () {
                    $btn.trigger('click');
                }
            });

        } else {
            fnFixedScroll(false);
            $fogBg.hide();
            $popLayer.hide();
            $popLayer.parent().css({'top': '100%', 'background-color': '#000'});
            $('.btnPopClose').off('click');
        }
    }

    function fnFixedScroll(_is) {
        if (_is) {
            //currentScroll = $(this).scrollTop();
            $('body').addClass('scrlOff');
            //            $(window).bind('scroll').scroll(function(e){$(this).scrollTop(top).scrollLeft(left);e.preventDefault();e.stopPropagation();});
        } else {
            $('body').removeClass('scrlOff');
            //$('body').css({'top':'auto'});
            //            $(window).unbind('scroll');
        }
        //$('body').css({'top':(-1 * currentScroll) + 'px'});
    }

    function fnScrollFixed(_is) {
        if (_is) {
            currentScroll = $(this).scrollTop();
            $('body').addClass('scrlOff');
            $('body').css({'top': (-1 * currentScroll) + 'px'});
            $(win).bind('scroll').scroll(function (e) {
                $(this).scrollTop(0).scrollLeft(0);
                e.preventDefault();
                e.stopPropagation();
            });
        } else {
            $('body').removeClass('scrlOff');
            $(win).unbind('scroll');
            $(this).scrollTop(currentScroll);
            $('body').css({'top': 'auto'});

            $(this).on({
                scroll: function () {
                    var _scrollTop = $(this).scrollTop();
                    (_scrollTop > 0) ? $('.btnTop').show() : $('.btnTop').hide();
                }
            });
        }
    }

    /* [S] 공통 팝업 닫음 */
    $.fn.closePopupLayer = function () {
        $('.btnPopClose').trigger('click');
    }
    /* [E] 공통 팝업 닫음  */

    $.fn.comPopupLayer = function (_state, _targetClassName, _bgOpacity) {
        /* 인자값 정의 :
            _state  :
                - true : open
                - false : close
            _targetClassName : 팝업레이어 className
            _bgOpacity : Dim opacity (0 ~ 1)
        */

        if (_state) {
            fnScrollFixed(true);
            $('.com_pop_fog').css({'opacity': _bgOpacity, 'top': '0', 'display': 'block'});

            //$('.com_pop_fog').css({'opacity':_bgOpacity, 'top':'0'});
            $('.btnTop').hide();

            $('.com_pop_btn_close').on({
                click: function (e) {
                    $('.com_pop_fog').trigger('click');
                }
            });

            $('.com_pop_fog').on({
                click: function (e) {
                    $('.com_pop_btn_close, .com_pop_fog').off('click');
                    $('.btnTop').show();
                    $('.com_pop_fog').css({'display': 'none'});
                    //$(e.target).css({'top':'150%'});
                    fnScrollFixed(false);
                    $('.' + _targetClassName).show().stop().animate({'bottom': '0'}, 200, function () {
                        $('.' + _targetClassName).hide();
                    });
                }
            });
            setTimeout(function () {
                $('.com_pop_header').find('a:first').focus();
            }, 0);
            $('.' + _targetClassName).show().stop().animate({'bottom': '100%'}, 200, function () {
            });
        } else {
            $('.com_pop_fog').trigger('click');
        }
        return this;
    }

    $.fn.comCheckboxChecker = function (_checkboxWrap, _checkboxType) {
        var $checkboxWrap = $('.' + _checkboxWrap)
        $('input[type="checkbox"]').on({
            change: function (e) {
                if ($(e.target).hasClass(_checkboxType)) {
                    if ($(e.target).is(':checked')) {
                        $checkboxWrap.find('dd').children('input[type="checkbox"]').prop('checked', true);
                    } else {
                        $checkboxWrap.find('dd').children('input[type="checkbox"]').prop('checked', false);
                    }
                } else {
                    var _isAllCheck = true;

                    ($(e.target).is(':checked')) ? $(e.target).prop('checked', true) : $(e.target).prop('checked', false)


                    $checkboxWrap.find('dd').each(function () {
                        if ($(this).children('input[type="checkbox"]').data('required')) {
                            _isAllCheck *= $(this).children('input[type="checkbox"]').is(':checked');
                        }
                    });


                    $checkboxWrap.find('dt').children('input[type="checkbox"]').prop('checked', _isAllCheck);

                }
            }
        });
    }

    $.fn.comMultiCheckboxChecker = function () {
        if (arguments.length > 0) {
            var $targetWrap = $('.' + arguments[0]);
            var aryClassName = [];
            for (var i = 0; i < arguments.length; i++) {
                aryClassName[i] = arguments[i];
            }

            $('input[type="checkbox"]').on({
                change: function (e) {
                    if ($(e.target).hasClass(aryClassName[1])) {
                        if ($(e.target).is(':checked')) {
                            $targetWrap.find('input[type="checkbox"]').prop('checked', true);
                        } else {
                            $targetWrap.find('input[type="checkbox"]').prop('checked', false);
                        }
                    } else if ($(e.target).hasClass(aryClassName[2])) {
                        var _isAllCheck = true;

                        if ($(e.target).is(':checked')) {
                            $(e.target).parent().nextUntil('dt').children('input[type="checkbox"]').prop('checked', true);
                        } else {
                            $(e.target).parent().nextUntil('dt').children('input[type="checkbox"]').prop('checked', false);
                        }

                        $targetWrap.find('.' + aryClassName[2]).each(function (idx) {
                            if ($(this).data('required')) {
                                _isAllCheck *= $(this).is(':checked');
                            }
                        });

                        $('.' + aryClassName[1]).prop('checked', _isAllCheck);
                    } else {
                        var _isAllParticleCheck = true;

                        var gName = ($(e.target).data('group'));

                        $targetWrap.find('dd input[data-group="' + gName + '"]').each(function (idx) {
                            if ($(this).data('required')) {
                                _isAllParticleCheck *= $(this).is(':checked');
                            }
                        });

                        $targetWrap.find('dt input[data-group="' + gName + '"]').prop('checked', _isAllParticleCheck);

                        var _isAllCheck = true;

                        $targetWrap.find('.' + aryClassName[2]).each(function (idx) {
                            if ($(this).data('required')) {
                                _isAllCheck *= $(this).is(':checked');
                            }
                        });

                        $('.' + aryClassName[1]).prop('checked', _isAllCheck);
                    }
                }
            });
        }
    }

    $.fn.setSelectboxValue = function (_obj) {
        var currentTargetVal = $('.' + _obj.target).text();
        var len = _obj.valueTargets.length;

        for (var i = 0; i < len; i++) {
            $('.' + _obj.valueTargets[i]).text(currentTargetVal);
        }

        $('.' + _obj.valueTargets[0]).trigger('click');
    }

    $.fn.comFormNumberCnt = function (_cntTargetClassName, _totalPlaceTargetClassName, _increase, _minCnt, _maxCnt) {
        var _firstCnt = Number($("." + _cntTargetClassName).text());
        var _currentPrice = $("." + _totalPlaceTargetClassName).text().replace(/[^\d]+/g, '');
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
        var _totalPrice = $.fn.addComma(_onePrice * _currentCnt);

        $("." + _cntTargetClassName).text(_currentCnt);
        $("." + _totalPlaceTargetClassName).text(_totalPrice);

        return this;
    }

    $.fn.comAccrodionMenu = function (_target) {
        var $target = $('.' + _target);
        var _isState = $target.hasClass('active');

        if (_isState) {   // 닫기
            $target.children('ul, dl').slideUp('fast', function () {
                $target.removeClass('active');
            });

        } else {  // 열기
            $target.children('ul, dl').slideDown('fast', function () {
                $target.addClass('active');
            });
            //$target.addClass('active');
        }
    }

    $.fn.addComma = function (num) { // 콤마 찍기
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(regexp, ',');
    }

    $.dDaySetTime = function (_num) {
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

    $.dDaySet = function () {
        cntObj = arguments;

        var cntObjLen = cntObj.length;

        initSetDisplayCnt(cntObj);

        if (cntObjLen > 0) {
            interval = setInterval(timeout, 1000);
        } else {
        }

        function timeout() {
            var cntLen = cntObj.length;
            var $target;

            for (var i = 0; i < cntLen; i++) {
                $target = $("#" + cntObj[i].target);

                if ($.dDaySetTime(cntObj[i].time).hour00 != $.dDaySetTime(cntObj[i].time).prevHour00) {
                    $("#" + cntObj[i].target).find('.hour00').addClass('ani');
                    $.fn.animationEnd(cntObj[i], 'hour00', i);
                }

                if ($.dDaySetTime(cntObj[i].time).hour0 != $.dDaySetTime(cntObj[i].time).prevHour0) {
                    $("#" + cntObj[i].target).find('.hour0').addClass('ani');
                    $.fn.animationEnd(cntObj[i], 'hour0', i);
                }

                if ($.dDaySetTime(cntObj[i].time).min00 != $.dDaySetTime(cntObj[i].time).prevMin00) {
                    $("#" + cntObj[i].target).find('.min00').addClass('ani');
                    $.fn.animationEnd(cntObj[i], 'min00', i);
                }

                if ($.dDaySetTime(cntObj[i].time).min0 != $.dDaySetTime(cntObj[i].time).prevMin0) {
                    $("#" + cntObj[i].target).find('.min0').addClass('ani');
                    $.fn.animationEnd(cntObj[i], 'min0', i);
                }

                if ($.dDaySetTime(cntObj[i].time).sec00 != $.dDaySetTime(cntObj[i].time).prevSec00) {
                    $("#" + cntObj[i].target).find('.sec00').addClass('ani');
                    $.fn.animationEnd(cntObj[i], 'sec00', i);
                }


                if ($.dDaySetTime(cntObj[i].time).sec0 != $.dDaySetTime(cntObj[i].time).prevSec0) {
                    $("#" + cntObj[i].target).find('.sec0').addClass('ani');
                    $.fn.animationEnd(cntObj[i], 'sec0', i);
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

            var $target;
            var cntLen = _target.length;

            for (var i = 0; i < cntLen; i++) {
                $target = $("#" + cntObj[i].target);

                /* S 남은 수량 */
                var $hotdealRestItems = $target.parent().parent().find('.hotdeal_rest_items');
                $hotdealRestItems.text(cntObj[i].restItems);    /* E 남은 수량 */

                $.fn.setDisplayCnt($target, cntObj[i].time);
            }
        }

    };

})(jQuery);





