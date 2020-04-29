
var win = this;
var focusReturn = 0;


window.fnPreCart = fnPreCart;
//구매하기버튼 클릭시 레이어팝업
function fnPreCart(_btn) {
	comPopupLayer(true, _btn, '0.8');


}


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

jQuery(function(){

    autoSlider();   //메인 -  이벤트 배너
	videoPlay();  //메인 - 비디오 재생
	addsell_product(); //상품상세 - 추가 구매상품
	togetherSlider(); //상품상세 - 이 상품과 함께 본 상품
	myMenuBubble(); //장바구니 > 나만의 메뉴 말풍선
	fn_SelectGiftMsg(); //선물메세지 선택
	fnTheaterData(); //사용가능한 CGV 팝업 내 지역 클릭
	mOrderAccrodionMenu() //아코디언
	mOrderEventRecom()// 이벤트 - 영상에 나오는 상품은 이런게 있어요!!
	//allCheckBoxCart(); //전체선택 체크박스 클릭

    //메인 - 이벤트 배너 > 비디오 재생
    function videoPlay(){
        jQuery('.btnVideoAdPlay').on("click", function (e) {
            e.preventDefault();
            var targetVideo = $(this).closest('.videoAdContent').find('video');
            var src = $(this).closest('.videoAdContent').find('video source').attr("src");
            var activeSlide = $(this).closest('.swiper-slide').hasClass('swiper-slide-active');

            if (!src == '' && activeSlide) {
                $(this).closest('.event_wrap').addClass('playVideo');
                $(this).closest('.videoAdContent').addClass('active');
                targetVideo.trigger('play');
                $('.btnEventBannerControl').trigger('click');
            }
        })
    }

    //메인 - 이벤트 배너
    function autoSlider(){
        if ($('#autoSlider')){
            var swiper = new Swiper('#autoSlider', {
                loop:$(".swiper-slide-active").length > 1,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.bannerCurrentNum',
                    clickable: true,
                    type: 'custom',
                    renderCustom: function (swiper, current, total) {
                        return current + ' / ' + total;
                    }
                },
            })

            swiper.on('slideChange', function () {
                if($('#autoSlider .videoAdContent.active')){
                    $('#autoSlider .videoAdContent').find('video').trigger('pause');
                    $('.event_wrap').removeClass('playVideo');
                }
            });

            var autoSlideControl = $("#autoSlider").siblings('.eventBannerControlWrap').find('.play, .pause');
                autoSlideControl.on("click", function (e) {
                e.preventDefault();
                if ($(this).hasClass("play")) { // 정지 중(Play ON)
                    $(this).removeClass("play").addClass("pause").text("pause");
                    swiper.autoplay.start();
                } else {
                    $(this).removeClass("pause").addClass("play").text("play");
                    swiper.autoplay.stop();
                }
			});
			//2019-11-29 목록이 한개 일 경우 제어 버튼 / 페이징 감추기
			if ( $("#autoSlider .swiper-slide").length <= 1 ) {
				$("#autoSlider").siblings(".eventBannerControlWrap").hide();
			};
        }
    }

	//상품상세 - 추가 구매상품
	function addsell_product(){
		if (jQuery('#addsell_product_swiper')){
			var swiper = new Swiper('#addsell_product_swiper', {
				slidesPerView: 3.3,
				spaceBetween: 10,
			})
		}
	}

	//상품상세 - 이 상품과 함께 본 상품
	function togetherSlider(){
		if (jQuery('#together_view_contents')){
			var swiper = new Swiper('#together_view_contents', {
				slidesPerView: 1.65,
				spaceBetween: 10,
			})
		}
	}

	//상품상세 - 이 상품과 함께 본 상품
	function recomand_slide(){
		if (jQuery('#recomand_slide')){
			var swiper = new Swiper('#recomand_slide', {
				spaceBetween: 10,
			})
		}
	}
	recomand_slide();

	//장바구니 - 나만의 메뉴 말풍선
	function myMenuBubble(){
		jQuery('.myMenu_bubble button').on('click',function(){
			jQuery(this).closest('.myMenu_bubble').hide();
		})
	}


	//선물메세지 - 메세지 셀렉트 옵션 선택
	function fn_SelectGiftMsg(obj) {
		jQuery('#select_Gift_Msg').change(function(){
			jQuery('#select_Gift_Msg option:selected').each(function(){
				var msg = jQuery(this).val();
				jQuery(this).closest('.com_custom_select_wrap').siblings('.com_custom_textarea_wrap').find('#text_Msg').val(msg);
			})
		});
	}


	//사용가능한 CGV 팝업 내 지역 클릭
	function fnTheaterData() {
		jQuery(document).on('click', "#theaterRegion a", function (){
			var myTheaterCode = jQuery(this).closest('li').data('theater');
			jQuery(this).closest('li').addClass('active').siblings('li').removeClass('active');
			jQuery(this).closest('.com_pop_container').find('#divLocation' + myTheaterCode).show().siblings('.pop_available_content').hide();
		})
	}

	// 영상에 나오는 상품은 이런게 있어요!!
	function mOrderEventRecom(){
		if (jQuery('#mOrder_event_recom_menu')){
			var swiper = new Swiper('#mOrder_event_recom_menu', {
				slidesPerView: 3.29,
				spaceBetween: 10,
			})
		}
	}


	//전체선택 체크박스 클릭
	function allCheckBoxCart() {
		var checkItem =  jQuery('.com_list_style1');
		var checkboxItem =  jQuery('.com_list_style1 .com_checkbox_type0');
		var cartItemGroup = jQuery('.cart_item_group');
		var chkBoxAll = jQuery('.cart_allchecker_wrap .com_checkbox_type0');
		var spanSelCnt = jQuery('.spanSelCnt');


		checkboxItem.on('change',function(){
			jQuery(this).closest(checkItem).each(function(){
				var checkListLen = jQuery(this).find('.com_checkbox_type0').length;
				var checkedListLen = jQuery(this).find('.com_checkbox_type0:checked').length;

				if (checkListLen == checkedListLen){
					jQuery(this).closest(cartItemGroup).find(chkBoxAll).prop('checked',true)
				}else if(checkListLen > checkedListLen){
					jQuery(this).closest(cartItemGroup).find(chkBoxAll).prop('checked',false)
				}
			});
			jQuery(this).closest(checkItem).each(function() {
				var checkedListLen = jQuery(this).find('.com_checkbox_type0:checked').length;
				jQuery(this).closest(cartItemGroup).find(spanSelCnt).show().text(checkedListLen);
			})
		})

		chkBoxAll.on('change',function(){
			if(jQuery(this).is(':checked') == true){
				jQuery(this).closest(cartItemGroup).find(checkboxItem).prop('checked',true);
			}else {
				jQuery(this).closest(cartItemGroup).find(checkboxItem).prop('checked',false);
			}
			jQuery(this).closest(cartItemGroup).find(checkItem).each(function() {
				var checkedListLen = jQuery(this).find('.com_checkbox_type0:checked').length;
				jQuery(this).closest(cartItemGroup).find(spanSelCnt).show().text(checkedListLen);
			})
		})
	}

	//MY 예약/결제 내역조회 > 바로 오더 결제내역 보기 팝업
	if (jQuery('.mOrder_payment, .myOrder_giftCon')){
		var popTarget = 'popTicketPopcornStore';

		popLayerShowHide("btnLayerPop", popTarget , "popFogBg");

		jQuery('.popLayerContainer').on({
			click: function (e) {

				var _target = e.target;
				var _currentTarget = e.currentTarget;

				if (_target.tagName == 'A') {
					jQuery(_target).parent('dd').addClass('active').siblings('dd').removeClass('active');

					if (jQuery(_target).parents('dl').hasClass('ctlDatepickerLayer')) {
						if (jQuery(_target).hasClass('ctlDatepicker')) {
							jQuery(_currentTarget).find('input[type="date"]').removeAttr('disabled');
						} else {
							jQuery(_currentTarget).find('input[type="date"]').attr('disabled', 'disabled');
						}
					}
				}
			}
		});

		jQuery('.btnPopConfirm').on({
			click:function(){
				jQuery('.popLayerFooter').off('focusout');
				jQuery('.btnPopClose').off('focusout');
				jQuery('.popLayerContainer').find('.active').each(function(idx){
					var _value = jQuery(this).children().text();
					jQuery('.btnLayerPop span:eq(' + idx + ')').text(_value);
				});

			}
		});
	}

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


	//결제하기 - 신용카드 레이어 팝업 내 카드 선택
	function setCreditcard(_this){
		var _target = _this;
		var jQuerytarget = jQuery(_target);
		var _className = _target.className;
		var jQuerysrcTarget = jQuery('.store_creditcard_wrap li:first-child');

		jQuerysrcTarget.attr('class','').addClass('active ' + _className);
		jQuerysrcTarget.find('a').text(jQuerytarget.text());

		if(jQuerysrcTarget.hasClass('active')){
			jQuery('.com_btn_fixed_type2 > a').addClass('active');
		}else{
			jQuery('.com_btn_fixed_type2 > a').removeClass('active');
		}

		jQuery('.icon_kakaopay').parent('li').removeClass('active').children('p').hide();

		jQuery('input[type="checkbox"]').trigger('change');
		jQuery.fn.comPopupLayer(false, 'pop_creditcard', '0.8');
		jQuery('.spriteCards a').focus();
	}
	jQuery('#liCard').on('click',function(){
		comPopupLayer(true, 'pop_creditcard', '0.8');
	});
	jQuery('#liKakao').on('click',function(e){
		var _target = e.target;
		var jQuerytarget = jQuery(_target);

		if(!jQuerytarget.hasClass('active')){
			jQuerytarget.next('p').slideToggle('100', function(){

				if(jQuerytarget.next('p').is(':hidden')){
					jQuerytarget.closest('li').prev().removeClass().children('a').text('신용카드');
					jQuerytarget.closest('li').removeClass('active');
				}else{
					jQuerytarget.closest('li').prev().removeClass().children('a').text('신용카드');
					jQuerytarget.closest('li').addClass('active');
				}
				var isCard = jQuery(e.currentTarget).hasClass('active');

				if(isCard){
					jQuery('.com_btn_fixed_type2 > a').addClass('active');
				}else{
					jQuery('.com_btn_fixed_type2 > a').removeClass('active');
				}
			});
		}

	})
	jQuery('.pop_creditcard_content .spriteCards').on('click',function(){
		setCreditcard(this)
	});

	//제품상세 - 하단 구매하기 버튼
	// jQuery('.com_btn_minus').on('click',function(e){
	// 	e.preventDefault();
	// 	comFormNumberCnt('com_form_count0','com_total_price0', -1, 1, 10)
	// });

	// jQuery('.com_btn_plus').on('click',function(e){
	// 	e.preventDefault();
	// 	comFormNumberCnt('com_form_count0','com_total_price0', 1, 1, 10)
	// })

	// function comFormNumberCnt(_cntTargetClassName, _totalPlaceTargetClassName, _increase, _minCnt, _maxCnt){
	// 	var _firstCnt = Number(jQuery("." + _cntTargetClassName).text());
	// 	var _currentPrice = jQuery("." + _totalPlaceTargetClassName).text().replace(/[^\d]+/g,'');
	// 	var _onePrice = Number(_currentPrice / _firstCnt);

	// 	var _currentCnt =  _firstCnt + _increase;


	// 	if(_currentCnt <= _minCnt){
	// 		_currentCnt = 1;
	// 	}else if(_currentCnt > _maxCnt){
	// 		if(_maxCnt <= 0){
	// 			_currentCnt = 1;
	// 		}else{
	// 			_currentCnt = _maxCnt;
	// 			alert("최대 " + _maxCnt +"개의 상품 구매가 가능합니다");
	// 		}
	// 	}else{
	// 		_currentCnt =  _firstCnt + _increase;
	// 	}
	// 	var _totalPrice = jQuery.fn.addComma(_onePrice * _currentCnt);

	// 	jQuery("." + _cntTargetClassName).text(_currentCnt);
	// 	jQuery("." + _totalPlaceTargetClassName).text(_totalPrice);

	// 	return this;
	// }

	function mOrderAccrodionMenu(){

		var accodion = jQuery('.mOrderAccrodion');

		accodion.each(function(){
			if(jQuery(this).hasClass(('isAction'))){   // 닫기
				jQuery(this).next('.mOrderAccrodionCont').show();
				jQuery(this).attr('aria-expanded','true');
			}else{
				jQuery(this).attr('aria-expanded','false');
			}
		})

		jQuery('.mOrderAccrodion').on('click',function(e){
			e.preventDefault();
			var jQuerythis = jQuery(this);
			var isActive = jQuerythis.hasClass('isAction');

			if(isActive){   // 닫기
				jQuerythis.next('.mOrderAccrodionCont').slideUp('fast',function(){
					jQuerythis.removeClass('isAction').attr('aria-expanded','false');
				});

			}else{  // 열기
				jQuerythis.next('.mOrderAccrodionCont').slideDown('fast',function(){
					jQuerythis.addClass('isAction').attr('aria-expanded','true');
				});
			}
		})



	}

	function comCartToAdd( _target, _maxLen, _timer, _ggNo, _pIdx, _pAmt){
		var _parentClassName = jQuery(_target).parent().get(0).className;
		var _isState = (jQuery(_target).parent().hasClass('active')) // false : 닫혀있는상태, true : 열려있는상태
		var _isBtnType = jQuery(_target).data('state'); // 'minus' 빼기 버튼, 'plus' 더하기 버튼

		clearTimeout(this.startTimer);

		if(_isState){ // 닫기
			var _cnt = Number(jQuery(_target).siblings('span').text());

			if(_isBtnType){
				this.startTimer = setTimeout(function(){
					jQuery(_target).parent().removeClass('active');
					fnAddCart(_ggNo, _cnt, _pIdx, _pAmt);
				}, _timer);

				if(_cnt < _maxLen){
					_cnt++;
				}
			}else{
				if(_cnt > 1){
					_cnt--;
					this.startTimer = setTimeout(function(){
						jQuery(_target).parent().removeClass('active');
						fnAddCart(_ggNo, _cnt, _pIdx, _pAmt);
					}, _timer);
				}else{
					_cnt = 1;
					jQuery(_target).parent().removeClass('active');
				}
			}
		}else{ // 열기
			_cnt = 1;
			jQuery('.' + _parentClassName + '.active').removeClass('active');
			jQuery(_target).parent().addClass('active');

			this.startTimer = setTimeout(function(){
				jQuery(_target).parent().removeClass('active');
				fnAddCart(_ggNo, _cnt, _pIdx, _pAmt);
			}, _timer);
		}

		jQuery(_target).siblings('span').text(_cnt);
	}

	function comFormAddPrductPrice(_increase, _minCnt, _maxCnt, _type, _currentTarget){
		var jQuerycnt = jQuery(".com_form_count");            // 카운트
		var jQuerycheckboxList = jQuery(".com_checkbox_list");         // 리스트
		var jQueryproductTarget = jQuery(".com_product_price");    // 결제금액
		var jQueryaddTarget = jQuery(".com_product_add_price");            // 추가금액
		var jQuerytotalTarget = jQuery(".com_product_total_price");        // 총 구매금액
		var _addPrice = 0;
		var _productPrice;

		switch(_type){
			case 'counter':
				comFormNumberCnt(_cntTargetClassName, _productClassName, _increase, _minCnt, _maxCnt);
				break;
			case 'checkbox':
				var jQuerycurrentTarget = jQuery('.' + _currentTarget);
				jQuerycurrentTarget.parent().parent('li').toggleClass('active');
				break;
			default: break;
		}

		jQuerycheckboxList.find('li').each(function(idx){
			if(jQuery(this).hasClass('active')){
				_addPrice +=(Number(jQuery(this).find('.add_product_price').text().replace(/[^\d]+/g,'')));
			}
		});

		_addPrice *= Number(jQuerycnt.text());
		_productPrice = Number(jQueryproductTarget.text().replace(/[^\d]+/g,''));

		jQueryaddTarget.text(addComma(_addPrice));
		jQuerytotalTarget.text(addComma(_productPrice + _addPrice))

		return this;
	}

	function addComma(num){ // 콤마 찍기
		var regexp = /\B(?=(\d{3})+(?!\d))/g;
		return num.toString().replace(regexp, ',');
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

	//2019-11-29 전체메뉴 스크롤 끝나면 다음 탭으로 전환 (테스트 요망)
	// var $allMenu = $(".allMenu_content");
	// var $navAllMenu  = $(".nav_allmenu .inner_bottom");
	// if ( $allMenu && $navAllMenu.find("a").length > 2 ) {
	// 	var timer;
	// 	$(window).scroll(function() {
	// 		if(timer) {
	// 			window.clearTimeout(timer);
	// 		}
	// 		timer = window.setTimeout(function() {
	// 			if ( ( $navAllMenu.find("a.active").index() + 1 ) != $navAllMenu.find("a").length ) {
	// 				//마지막 탭이 아닐 경우
	// 				if ( $(window).scrollTop() >= $(document).height() - $(window).height() ) {
	// 					$navAllMenu.find("a.active + a").trigger("click");
	// 					var activeTabLeft = 0;
	// 					for (var i = 0; i <= $navAllMenu.find("a.active").index(); i++) {
	// 						activeTabLeft += $navAllMenu.find("a").eq(i).outerWidth();
	// 					};
	// 					if ( activeTabLeft > $navAllMenu.width() ) {
	// 						$navAllMenu.animate({scrollLeft: activeTabLeft}, 300);
	// 					}
	// 					$("html, body").animate({scrollTop: 0}, 200);
	// 				};
	// 			};
	// 		}, 100);
	// 	});
	// };

});


/*** 부트스트랩 모달 이벤트 ***/
jQuery(document).ready(function() {

	var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable], video";

	// dropdown open 시 key 입력 event
	jQuery('.dropDown .dTarget').keydown(function(event) {
		trapTabKey(jQuery(this), event);
	})
	jQuery('.popup_dim').keydown(function(event) {
		
		/* [S] 스크롤 ON 추가 2019.11.15 Add by jangmangil ***********/
		//gfnSetSwipeRefreshOnOff('Y');
		//console.log("닫기버튼 이외에 스크롤 on 작동");
		/* [E] 스크롤 ON 추가 2019.11.15 Add by jangmangil ***********/
		
		trapTabKey(jQuery(this), event);
	})


	//focusout prevent event
	function trapTabKey(obj, evt) {
		// if tab or shift-tab pressed
		if (evt.which == 9) {
			// get list of all children elements in given object
			var o = obj.find('*');
			// get list of focusable items
			var focusableItems;
			focusableItems = o.filter(focusableElementsString).filter(':visible')
			// get currently focused item
			var focusedItem;
			focusedItem = jQuery(':focus');
			// get the number of focusable items
			var numberOfFocusableItems;
			numberOfFocusableItems = focusableItems.length
			// get the index of the currently focused item
			var focusedItemIndex;
			focusedItemIndex = focusableItems.index(focusedItem);
			if (evt.shiftKey) {
				//back tab
				// if focused on first item and user preses back-tab, go to the last focusable item
				if (focusedItemIndex == 0) {
					focusableItems.get(numberOfFocusableItems - 1).focus();
					evt.preventDefault();
				}
			} else {
				//forward tab
				// if focused on the last item and user preses tab, go to the first focusable item
				if (focusedItemIndex == numberOfFocusableItems - 1) {
					focusableItems.get(0).focus();
					evt.preventDefault();
				}
			}
		}
	}
});


//bottom layer dropdown
var popFixedHeight = 0;
var dropdownPar = null;

var dropDown = function (){
	jQuery(document).on('click', '.dropDown > .trigger > a', function(e){
		//e.preventDefault();
		focusReturn = jQuery(this);
		dropdownPar = jQuery(this).closest('.pop_fixed_type0_content');

		var dropdown = jQuery(this).closest('.dropDown');
		var applyBtn = jQuery('.btn_apply');
		//var setTop = jQuery('.orderDetail').position().top;
		
		if(!dropdown.is('.active')){
			dropdown.addClass('active');
			dropdown.find('>.dTarget').slideDown(150);
			dropdown.siblings().removeClass('active').find('>.dTarget').slideUp(150);
			if(jQuery(this).parent().parent().is('.dep02')){
				applyBtn.addClass('active');
			}
			if(jQuery(this).parent().parent().is('.dep01')) {
				if(jQuery(this).parent().parent().find('.dep02').is('.active')){
					applyBtn.addClass('active');
				}else{
					applyBtn.removeClass('active');
				}
				
			}
		}else{
			dropdown.removeClass('active');
			dropdown.find('>.dTarget').slideUp(150);
			if(jQuery(this).parent().parent().is('.dep01') || jQuery(this).parent().parent().is('.dep02')){
				applyBtn.removeClass('active');
			}
		}
	});
}
dropDown();

var dropDownClose = function(e){
	jQuery('.dropDown').removeClass('active').end().find('.dTarget').slideUp(150);
	jQuery('.btn_apply').removeClass('active');
}






		/*
		if (dropdownPar.closest('.pop_fixed_type0_content').length){
			popFixedHeight = dropdownPar.closest('.pop_fixed_type0_content').outerHeight();
			// console.log(popFixedHeight)
			dropdownPar.closest('.pop_fixed_type0_content').animate({
				height:'100vh'
			},150);


			var scrollBottomStandard = dropdownPar.closest('.pop_fixed_type0_content').outerHeight(); //standard
			var orderProduct = dropdownPar.closest('.pop_fixed_type0_content').find('.orderProduct');
			var reset = orderProduct.offset().top + orderProduct.outerHeight(); // dropdownPar offset 0 만듬
			var resetBottomPadding = dropdownPar.closest('.pop_fixed_type0_content').parent().innerHeight() - dropdownPar.closest('.pop_fixed_type0_content').parent().height();

			var dropdownParTop = dropdownPar.offset().top;
			var dropdownParTargetHeight = dropdownPar.find('.dTarget').outerHeight();

			var destinyOffset = dropdownParTop + dropdownParTargetHeight + resetBottomPadding - reset;

			if (scrollBottomStandard < destinyOffset){
				setTimeout(function (){
					jQuery('.pop_fixed_type0_content').animate({
						scrollTop: dropdownParTop - orderProduct.offset().top
					},300)
				},150)

			}
		}

		dropdownPar.addClass('active');
		dropdownPar.siblings('').removeClass('active').find('.dTarget').slideUp(150);
		dropdownPar.find('.dTarget').slideDown(150).attr('tabindex',0).focus();

		if (dropdownPar.find('.dTarget li dl dt').length > 1){
			var dropdownLabel = dropdownPar.find('.dTarget li dl dt');
			var dropdownLabelPar = dropdownLabel.closest('dl')
			var labelArray = new Array();
			dropdownLabel.each(function (){
				labelArray.push(jQuery(this).outerWidth())
			})
			var labelArrayMaxWidth = Math.max.apply(null, labelArray);
			//console.log(labelArrayMaxWidth)
			dropdownLabel.css('width',labelArrayMaxWidth)
			dropdownLabelPar.css('table-layout','fixed')

		}
		// //선택지 두개일 경우
		// if (dropdownPar.hasClass('double')){
		// 	//첫번째
		// 	if (jQuery(this).is(':first-child')){
		// 		dropdownPar.find('.trigger + .dTarget').slideDown(150).attr('tabindex',0).focus();
		// 	}
		// 	// 두번째
		// 	else {
		// 		dropdownPar.find('.dTarget:last-child').slideDown(150).attr('tabindex',0).focus();
		// 	}
		// }
		// //선택지 하나일 경우
		// else {
		// 	dropdownPar.find('.dTarget').slideDown(150).attr('tabindex',0).focus();
		// }
	*/
	
	/*
	jQuery(document).on('click', '.dropDown .dTarget .closeDropDown', function (){
		dropdownPar = jQuery(this).closest('.dropDown')
		dropDownClose();
		focusReturn = dropdownPar.find('.trigger a')
		focusReturn.focus();
	})
	*/
	//스피드오더 퀵메뉴 스크롤시 노출, 비노출
	/*
	function scrollSpeedOrder (){
		var position = 0;
		jQuery('.speedOrder').addClass('active');
		jQuery(window).on('scroll',function(){
			var scrolling = jQuery(document).scrollTop();
			if(scrolling > position){
				jQuery('.speedOrder').removeClass('active');
			}else if(scrolling <= position){
				jQuery('.speedOrder').addClass('active');
			}
			position = scrolling;
		})
	}
	scrollSpeedOrder ();
	*/

/*
var dropDownClose = function (){
	dropdownPar.removeClass('active')
	dropdownPar.find('.dTarget').slideUp(150);
	if (dropdownPar.closest('.pop_fixed_type0_content').length){
		dropdownPar.closest('.pop_fixed_type0_content').css({
			'height':'auto'
		},150);
	}
	dropdownPar.find('dl,dl dt').removeAttr('style')

}
*/
var popOpenFunc = function (popupTarget){
	jQuery('#' + popupTarget).show().animate({
		opacity: '1'
	}, 300 );
	if (jQuery('#' + popupTarget).hasClass('full_popup')){
		jQuery('#' + popupTarget).find('.popup').animate({
			top: "0"
		}, 300 );

	} else {
        var _top;
        switch( popupTarget ){
            case 'authorizationPop_loc':
            case 'authorizationPop_alim':
            case 'authorizationPop_locAgree':
                _top = 0;
                _height = "100%";
                break;
            default:
                _top = "100px";
                _height = "calc(100% - 100px)";
                break;
            
        }
		jQuery('#' + popupTarget).find('.popup').animate({
            height: _height,
			top: _top
		}, 300 );
	}
	jQuery('#' + popupTarget).attr('tabindex',0).focus();
}

var popOpenTheaterFunc = function (popupTarget){
	jQuery('#' + popupTarget).show().animate({
		opacity: '1'
	}, 300 );
	
  jQuery('#' + popupTarget).find('.popup').animate({
    height: 'calc(100% - 100px)',
    top: '100px'
  }, 300 );
	
	jQuery('#' + popupTarget).attr('tabindex',0).focus();
	
	jQuery("body").addClass("scrlOff");
}

var popCloseFunc = function (popupTarget){
	jQuery('#' + popupTarget).animate({
		opacity: '0'
	}, 300 , function(){
		jQuery('#' + popupTarget).hide();
	});
	jQuery('#' + popupTarget).find('.popup').animate({
		top: "100%"
	}, 300 );
	
	jQuery("body").removeClass("scrlOff");
}