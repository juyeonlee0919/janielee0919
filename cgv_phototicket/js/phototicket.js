// 포토티켓
// 작성일 : 2020.04.20
// 작성자 : 이주연
var front = (function () {

    var event = {};
    var slider = {};
    var fn = {};

    // 이벤트
    event.btnHeartClick = function () {
        jQuery('._btnHeart').on('click', function () {
            jQuery(this).hasClass('active') ? jQuery(this).removeClass('active') : jQuery(this).addClass('active');
        });
    }

    // front.event.btnFlipClick() - 플립 버튼 클릭 이벤트
    event.btnFlipClick = function () {
        // 플립 슬라이더 - 버튼 클릭시 플립
        jQuery('._flip').on('click', function () {
            jQuery(this).parentsUntil('.swiper-slide').eq(3).toggleClass('active')
        });
    }

    // front.event.btnToggleClick() - 플립 체크 박스 이벤트
    event.btnToggleClick = function () {
        // 체크 박스 버튼 클릭 이벤트 --- 수정 2020.05.11
        jQuery('.myPhtoticketFlip .front .btn-toggle').first().addClass('active');
        jQuery('.myPhtoticketFlip .back .btn-toggle').first().addClass('active');

        jQuery('.btn-toggle').on('click', function () {
            if (jQuery(this).hasClass('active')) {
                jQuery(this).parents('.slider-wrap').find('.btn-toggle').removeClass('active');
                jQuery(this).parents('.flipper').find('.btn-toggle').addClass('active');
                // jQuery('.btn-boast').addClass('disabled');

            } else {
                jQuery(this).parents('.slider-wrap').find('.btn-toggle').removeClass('active');
                jQuery(this).parents('.flipper').find('.btn-toggle').addClass('active');
                // jQuery('.btn-boast').removeClass('disabled');
            }
        });
    }

    event._commonHandlers = function () {

        if(jQuery('.cgvMovieChartWrap').length > 0) {
            jQuery("html,body").animate({ scrollTop: 1 }, "fast");
        }

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
            if (jQuery(this).hasClass('active')) {
                jQuery(this).removeClass('active');
            } else {
                // jQuery(this).text('자랑취소').addClass('active');
                // jQuery('#pop_alert').addClass('active');
            }
        });

        // 자랑하기 버튼 클릭시 alert 팝업
        jQuery('._alertBoast').on('click', function () {
            jQuery('#pop_alert').addClass('active');
        })

        // 취소 버튼 클릭 이벤트 --- 2020.05.08 추가
        jQuery('._confirmBtn').on('click', function () {
            jQuery('#pop_alert').removeClass('active');
            // jQuery('#pop_alert2').addClass('active');
        });

        // 취소 버튼 클릭 이벤트 --- 2020.05.08 추가
        jQuery('._cancelBtn').on('click', function () {
            jQuery('#pop_alert').removeClass('active');
            jQuery('#pop_alert2').removeClass('active');
            jQuery('#pop_alert3').removeClass('active');
            jQuery('#pop_alert4').removeClass('active');
            jQuery('#pop_alertDelete').removeClass('active');
            jQuery('#pop_alertCancel').removeClass('active');
        });

        // 결제 취소 버튼 클릭 이벤트 --- 2020.05.08 추가
        jQuery('._cancelPay').on('click', function () {
            jQuery('#pop_alert3').addClass('active');
        });

        // 결제 취소 버튼 클릭 이벤트 --- 2020.05.08 추가
        jQuery('._confirmPay').on('click', function () {
            // jQuery('#pop_alert4').addClass('active');
            jQuery('#pop_alert3').removeClass('active');
        });

        // 삭제하기 버튼 클릭 이벤트 --- 2020.05.15 수정
        jQuery('._deleteBtn').on('click', function () {
            jQuery('#pop_alertDelete').addClass('active');
        });

        // 삭제하기 버튼 클릭 이벤트 --- 2020.05.19 추가
        jQuery('._alertCancel').on('click', function () {
            jQuery('#pop_alertCancel').addClass('active');
        });

        // 조회기간 클릭 이벤트 다중처리 X
        jQuery('._dayClick').on('click', function () {
            if (jQuery(this).hasClass('active')) {
                jQuery(this).siblings().removeClass('active');
                jQuery('._inputDate').attr('disabled', true);
            } else {
                jQuery(this).addClass('active').siblings().removeClass('active');
                jQuery('._inputDate').attr('disabled', true);
            }
        });

        // 조회기간 활성화/비활성화
        jQuery('._direct').on('click', function () {
            if (jQuery(this).hasClass('active')) {
                jQuery(this).siblings().removeClass('active');
                jQuery('._inputDate').attr('disabled', false);
            } else {
                jQuery(this).addClass('active').siblings().removeClass('active');
                jQuery('._inputDate').attr('disabled', false);
            }
        });

        // 초기화 토스트 팝업 --- 2020.05.07
        jQuery('._reset').on('click', function () {
            jQuery('#filterToast').show().fadeOut(1500);
        })

        // 초기화 토스트 팝업 --- 2020.05.07
        jQuery('._cancelPop').on('click', function () {
            jQuery('#cancelToast').show().fadeOut(1500);
        })

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

        // alert
        window.alertMessage = alertMessage;

        function alertMessage() {
            jQuery('#pop_alert').show();
            jQuery('#pop_alert3').show();
            jQuery('#pop_alertCancel').show();
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

        front.event.resizeWindow();
    }

    // 메인 슬라이더
    slider.photoSlider = function () {
        if (jQuery('.slider_wrap .swiper-container').length > 0) {
            slider.photoTicketSlider = new Swiper('.slider_wrap .swiper-container', {
                width: '260',
                autoPlay: true,
                autoHeight: false,
                direction: 'horizontal',
                loop: false,
                slidesPerView: 1,
                spaceBetween: 30,
                breakpoints: {
                    320: {
                        spaceBetween: 20,
                    },
                    360: {
                        spaceBetween: 30
                    }
                },
                on: {
                    init: function () {
                        jQuery("html,body").animate({ scrollTop: 1 }, "fast");
                        // jQuery('.content_wrap.photo_ticket.verAPP').css('padding-top','44px');
                    },
                }
            });
        }
    }

    // 이벤트 슬라이더 - 메인 공통
    slider.eventSlider = function () {
        if (jQuery('.alert_wrap .swiper-container').length > 0) {
            slider.photoTicketEventSlider = new Swiper('.alert_wrap .swiper-container', {
                autoPlay: false,
                direction: 'horizontal',
                loop: false,
                slidesPerView: 1,
            });
        }
    }

    // nav
    fn.navSticky = function () {
        if ((jQuery('.nav .type_pt') || jQuery('.nav .type_pt2')).length > 0) {
            var jbOffset = jQuery('.nav').offset();
            jQuery(window).scroll(function () {
                if (jQuery(document).scrollTop() > jbOffset.top) {
                    jQuery('.nav').addClass('active');
                } else {
                    jQuery('.nav').removeClass('active');
                }
            });
        }
    }

    // for iPhoneX, iPhoneXR
    fn.photoImage = function () {
        var width = jQuery('.imgcard_wrap .card .img').width();
        jQuery('.imgcard_wrap .card .img').height(width * 1.6)
    }
    event.resizeWindow = function () {
        jQuery(window).on('resize', function () {
            front.fn.photoImage();
        });
    }

    // 공유하기 팝업 분리
    
    //팝업을 보여주는 기능
    fn.popShareShow = function () {
        jQuery('.popFogBg').css({'opacity': '.5', 'top': '0', 'display': 'block'});
        jQuery('.popShare').show().stop().animate({'bottom': '0'}, 200);
    }
    //팝업을 닫는 기능
    fn.popShareHide = function () {
        jQuery('.popFogBg').css({'display': 'none'});
        jQuery('.popShare').stop().animate({'bottom': '-100%'}, 200);
    }
    //close버튼을 누르면 닫는 기능
    fn.closePopShareBtn = function () {
        jQuery('.btnPopClose').on('click',function () {
            front.fn.popShareHide()
        })
    }
    //dim영역을 누르면 닫는 기능
    fn.closePopShareFog = function () {
        jQuery('.popFogBg').on('click',function () {
            front.fn.popShareHide()
        })
    }

    /**
     * [S] 팝업 함수
     */
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
                        jQuery("#startDt").val(""); // 2020.05.15 추가(개발)
                        jQuery("#endDt").val("");  // 2020.05.15 추가(개발)
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

    function fnFixedScroll(_is) {
        if (_is) {
            jQuery('body').addClass('scrlOff');
        } else {
            jQuery('body').removeClass('scrlOff');
        }
    }

    jQuery.fn.closePopupLayer = function () {
        jQuery('.btnPopClose').trigger('click');
    }
    /**
     * [E] 팝업 함수
     */

    var init = function () {
        // event
        event._commonHandlers();

        // page
        fn.navSticky();
        fn.photoImage();

        // slider
        slider.photoSlider();
    };

    return {
        init,
        event,
        slider,
        fn,
    };
})();

jQuery(function () {
    front.init();
});
