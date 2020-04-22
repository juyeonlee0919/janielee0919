/* subUi.js override */
(function ($) {
	var win = this;

	this._RECEIPT_LIST = {				// 스마트 영수증 목록
		load:function(){
			popLayerShowHide("btnLayerPop", "popCoupon", "popFogBg");
			$('.popLayerContainer').on({
				click:function(e){
					var _target = e.target;
					var _currentTarget = e.currentTarget;
					
					if(_target.tagName == 'A'){
						$(_target).parent('dd').addClass('active').siblings('dd').removeClass('active');
						
						if($(_target).parents('dl').hasClass('ctlDatepickerLayer')){
							if($(_target).hasClass('ctlDatepicker')){
								$(_currentTarget).find('input[type="date"]').removeAttr('disabled');
							}else{
								$(_currentTarget).find('input[type="date"]').attr('disabled', 'disabled');
								setDate($(_currentTarget), $(_target));
							}
						}
					}
				} 
			});

			function setDate(obj, obj1) {
				var _numPreMonth = obj1 ? ("-" + obj1.text().replace("개월", "")) : -1;
				var _today = win.moment().format('YYYY-MM-DD');
				var _prevDay = win.moment().add(_numPreMonth, 'months').format('YYYY-MM-DD');

				obj = "" || $('.popLayerContainer');
				obj.find('span:first-child').children('input[type="date"]').val(_prevDay);
				obj.find('span:last-child').children('input[type="date"]').val(_today);
			}
		}
	}

	$(this).on(this._commonHandlers);

	switch (win.screenId) {
		case 'RECEIPT_LIST': $(this).on(this._RECEIPT_LIST);    break;  // 스마트 영수증 목록
		default: break;
	}

	function popLayerHasTopShowHide(_btn, _popLayer, _fogBg, _screenId) {
		var $btn = $('.' + _btn);
		var $popLayer = $('.' + _popLayer);
		var $fogBg = $('.' + _fogBg);
		var _isFogBg = $fogBg.is(':visible');

		//$btn.off('click');
		$btn.on({
			click: function () {
				$fogBg.css({ 'opacity': '.8', 'top': '0' });
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
				}
				else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY007") {
					CGVHAAppInterface.SetNavigationBar('CGV 할인쿠폰 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|$(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
				}
				else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY010") {
					CGVHAAppInterface.SetNavigationBar('CGV 영화관람권 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|$(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
				}
				else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY016") {
					CGVHAAppInterface.SetNavigationBar('CGV 무비패스카드 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|$(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
				}
				
				popLayerHasTopBgShowHide($fogBg, $popLayer, _isFogBg, _screenId);
			}
		});
	}

	function popLayerHasTopBgShowHide(_target, _contentTarget, _is, _screenId) {    // pop dim 
		if (!_is) {
			$('html, body').css({ 'overflow': 'hidden', 'position': 'relative', 'width': '100%', 'height': '100%' });
			_contentTarget.show().stop().animate({ 'top': '0' }, 200, function () {
				_contentTarget.siblings("div:not('.popFogBg')").hide()
				_contentTarget.find('input[type=text]').focus();
				// 안드로이드 상위버전 정상(5.1.1/7.0), 하위버전 포커스만 이뤄짐(4.1.2/4.4.2), ios 정책상 키패드및 포커스 안됨
			});
			_target.show().on({
				click: function () {
					_contentTarget.show().stop().animate({ 'top': '150%' }, 200, function () {
						$('html, body').css({ 'overflow': 'visible', 'position': 'static', 'width': 'auto', 'height': 'auto' });
						_target.hide();

						//기프트콘
						if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY012") {
							basicNavigation(1, '기프트콘', '');
						}
						else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY007") {
							basicNavigation(1, '쿠폰함', '');
						}
						else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY010") {
							basicNavigation(1, '영화관람권', '');
						}
						else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY016") {
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
			_contentTarget.show().stop().animate({ 'top': '150%' }, 200, function () {
				fnFixedScroll(false);
				_target.hide();
			});
			$('.btnPopClose').off('click');
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
				$fogBg.css({ 'opacity': '.5', 'top': '0' });
				popLayerBgShowHide($fogBg, $popLayer, _isFogBg);
			}
		});
	}

	function popLayerBgShowHide(_target, _contentTarget, _is){    // pop dim        
		if(!_is){
			fnFixedScroll(true);
			_contentTarget.show().stop().animate({'bottom':'0'},200);
			setTimeout(function(){
				$('.popLayerHeader').find('a:first').focus();
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

			$('.btnPopClose').on({
				click:function(){
					_contentTarget.find('.popLayerFooter').off('focusout');
					$('.btnPopClose').off('focusout');
					_target.trigger('click');
					setTimeout(function(){
						$('.btnLayerPop').focus();
					}, 0);
				},
				focusout:function(){
					setTimeout(function() {
						if(!($(':focus').parents().hasClass('popLayer'))){
							$('.btnPopConfirm').focus();
						}
					}, 0);
				}
			});

			_contentTarget.find('.popLayerFooter').on({
				focusout:function(){
					setTimeout(function() {
						if(!($(':focus').parents().hasClass('popLayer'))){
							$('.btnPopClose').focus();
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
					$popLayer.parent().css({ 'top': '100%', 'background-color': '#000' });
				}
			});
			$popLayer.parent().css({ 'top': '0', 'background-color': 'transparent' });

			$('.btnPopClose').on({
				click: function () {
					$btn.trigger('click');
				}
			});

		} else {
			fnFixedScroll(false);
			$fogBg.hide();
			$popLayer.hide();
			$popLayer.parent().css({ 'top': '100%', 'background-color': '#000' });
			$('.btnPopClose').off('click');
		}
	}

	function fnFixedScroll(_is) {
		if (_is) {
			$('body').addClass('scrlOff');
			//            $(window).bind('scroll').scroll(function(e){$(this).scrollTop(top).scrollLeft(left);e.preventDefault();e.stopPropagation();});
		} else {
			$('body').removeClass('scrlOff');
			//            $(window).unbind('scroll');
		}
	}

	function fnScrollFixed(_is){
		if(_is){
			currentScroll = $(this).scrollTop();
			$('body').addClass('scrlOff');
			$('body').css({'top':(-1 * currentScroll) + 'px'});
			$(win).bind('scroll').scroll(function(e){
				$(this).scrollTop(0).scrollLeft(0);
				e.preventDefault();
				e.stopPropagation();
			});
		}else{
			$('body').removeClass('scrlOff'); 
			$(win).unbind('scroll');
			$(this).scrollTop(currentScroll);
			$('body').css({'top':'auto'});

			$(this).on({
				scroll:function(){
					var _scrollTop = $(this).scrollTop();
					(_scrollTop > 0)?$('.btnTop').show():$('.btnTop').hide();
				}
			});
		}
	}
	
/* S 공통 팝업 닫음 */
	$.fn.closePopupLayer = function(){
		$('.btnPopClose').trigger('click');
	}
/* E 공통 팝업 닫음  */

	$.fn.comPopupLayer = function(_state, _targetClassName, _bgOpacity){
		/* 인자값 정의 : 
			_state  :
				- true : open
				- false : close
			_targetClassName : 팝업레이어 className
			_bgOpacity : Dim opacity (0 ~ 1)
		*/
	   
	   if(_state){
			fnScrollFixed(true);
			$('.com_pop_fog').css({'opacity':_bgOpacity, 'top':'0', 'display': 'block'});

			//$('.com_pop_fog').css({'opacity':_bgOpacity, 'top':'0'});
			$('.btnTop').hide();

			$('.com_pop_btn_close').on({
				click:function(e){
					$('.com_pop_fog').trigger('click');
				}
			});

			$('.com_pop_fog').on({
				click:function(e){
					$('.com_pop_btn_close, .com_pop_fog').off('click');
					$('.btnTop').show();
					$('.com_pop_fog').css({'display': 'none'});
					//$(e.target).css({'top':'150%'});
					fnScrollFixed(false);
					$('.' + _targetClassName).show().stop().animate({'bottom':'0'}, 200, function(){
						$('.' + _targetClassName).hide();
					});
				}
			});
			setTimeout(function(){
				$('.com_pop_header').find('a:first').focus();
			}, 0);
			$('.' + _targetClassName).show().stop().animate({'bottom':'100%'}, 200, function(){
			});
		}else{
			$('.com_pop_fog').trigger('click');
		}        
		return this;
	}


$.fn.comCheckboxChecker = function(_checkboxWrap, _checkboxType){
	var $checkboxWrap = $('.' + _checkboxWrap)
	$('input[type="checkbox"]').on({
		change:function(e){
			if($(e.target).hasClass(_checkboxType)){
				if($(e.target).is(':checked')){
					$checkboxWrap.find('dd').children('input[type="checkbox"]').prop('checked', true);
				}else{
					$checkboxWrap.find('dd').children('input[type="checkbox"]').prop('checked', false);
				}
			}else{
				var _isAllCheck = true;

				($(e.target).is(':checked'))?$(e.target).prop('checked', true):$(e.target).prop('checked', false)
					

				$checkboxWrap.find('dd').each(function(){
					if($(this).children('input[type="checkbox"]').data('required')){
						_isAllCheck *= $(this).children('input[type="checkbox"]').is(':checked');
					}
				});

				
				$checkboxWrap.find('dt').children('input[type="checkbox"]').prop('checked', _isAllCheck);
				
			}
		}
	});
}


$.fn.comMultiCheckboxChecker = function(){
	if(arguments.length > 0){
		var $targetWrap = $('.' + arguments[0]);
		var aryClassName = [];
		 for(var i = 0; i < arguments.length; i++){
			 aryClassName[i] = arguments[i];
		 }
		
		$('input[type="checkbox"]').on({
			change:function(e){
				if($(e.target).hasClass(aryClassName[1])){
					if($(e.target).is(':checked')){
						$targetWrap.find('input[type="checkbox"]').prop('checked', true);
					}else{
						$targetWrap.find('input[type="checkbox"]').prop('checked', false);
					}
				}else if($(e.target).hasClass(aryClassName[2])){
					var _isAllCheck = true;
					
					if($(e.target).is(':checked')){
						$(e.target).parent().nextUntil('dt').children('input[type="checkbox"]').prop('checked', true);
					}else{
						$(e.target).parent().nextUntil('dt').children('input[type="checkbox"]').prop('checked', false);
					}

					$targetWrap.find('.' + aryClassName[2]).each(function(idx){
						if($(this).data('required')){
							_isAllCheck *= $(this).is(':checked');
						}
					});

					$('.' + aryClassName[1]).prop('checked', _isAllCheck);
				}else{
					var _isAllParticleCheck = true;
					
					var gName = ($(e.target).data('group'));
					
					$targetWrap.find('dd input[data-group="' + gName +'"]').each(function(idx){
						if($(this).data('required')){
							_isAllParticleCheck *= $(this).is(':checked');
						}
					});
					
					$targetWrap.find('dt input[data-group="' + gName +'"]').prop('checked', _isAllParticleCheck);
					
					var _isAllCheck = true;

					$targetWrap.find('.' + aryClassName[2]).each(function(idx){
						if($(this).data('required')){
							_isAllCheck *= $(this).is(':checked');
						}
					});

					$('.' + aryClassName[1]).prop('checked', _isAllCheck);
				}
			}
		});
	}
}

$.fn.setSelectboxValue = function(_obj){
	var currentTargetVal = $('.' + _obj.target).text();
	var len = _obj.valueTargets.length;
	
	for(var i = 0; i < len; i++){
		$('.' + _obj.valueTargets[i]).text(currentTargetVal);
	}

	$('.' + _obj.valueTargets[0]).trigger('click');
}

$.fn.comFormNumberCnt = function(_cntTargetClassName, _totalPlaceTargetClassName, _increase, _minCnt, _maxCnt){
	var _firstCnt = Number($("." + _cntTargetClassName).text());
	var _currentPrice = $("." + _totalPlaceTargetClassName).text().replace(/[^\d]+/g,'');
	var _onePrice = Number(_currentPrice / _firstCnt);
	
	var _currentCnt =  _firstCnt + _increase;
	

	if(_currentCnt <= _minCnt){
		_currentCnt = 1;
	}else if(_currentCnt > _maxCnt){
		if(_maxCnt <= 0){
			_currentCnt = 1;
		}else{
			_currentCnt = _maxCnt;
			alert("최대 " + _maxCnt +"개의 상품 구매가 가능합니다");
		}
	}else{
		_currentCnt =  _firstCnt + _increase;
	}
	var _totalPrice = $.fn.addComma(_onePrice * _currentCnt);

	$("." + _cntTargetClassName).text(_currentCnt);
	$("." + _totalPlaceTargetClassName).text(_totalPrice);

	return this;
}

$.fn.comAccrodionMenu = function(_target){
	var $target = $('.' + _target);
	var _isState = $target.hasClass('active');

	if(_isState){   // 닫기
		$target.children('ul, dl').slideUp('fast',function(){
			$target.removeClass('active');
		});
		
	}else{  // 열기
		$target.children('ul, dl').slideDown('fast',function(){
			$target.addClass('active');
		});
		//$target.addClass('active');
	}
}

$.fn.comCartToAdd = function( _target, _maxLen, _timer, _ggNo, _pIdx, _pAmt){
	var _parentClassName = $(_target).parent().get(0).className;
	var _isState = ($(_target).parent().hasClass('active')) // false : 닫혀있는상태, true : 열려있는상태
	var _isBtnType = $(_target).data('state'); // 'minus' 빼기 버튼, 'plus' 더하기 버튼
	
	clearTimeout(this.startTimer);

	if(_isState){ // 닫기
		var _cnt = Number($(_target).siblings('span').text());

		if(_isBtnType){
			this.startTimer = setTimeout(function(){
				$(_target).parent().removeClass('active');
				fnAddCart(_ggNo, _cnt, _pIdx, _pAmt);
			}, _timer);

			if(_cnt < _maxLen){
				_cnt++;
			}
		}else{
			if(_cnt > 1){
				_cnt--;
				this.startTimer = setTimeout(function(){
					$(_target).parent().removeClass('active');
					fnAddCart(_ggNo, _cnt, _pIdx, _pAmt);
				}, _timer);
			}else{
				_cnt = 1;
				$(_target).parent().removeClass('active');
			}
		}
	}else{ // 열기
		_cnt = 1;
		$('.' + _parentClassName + '.active').removeClass('active');
		$(_target).parent().addClass('active');
		
		this.startTimer = setTimeout(function(){
			$(_target).parent().removeClass('active');
			fnAddCart(_ggNo, _cnt, _pIdx, _pAmt);
		}, _timer);
	}

	$(_target).siblings('span').text(_cnt);
}

$.fn.comFormAddPrductPrice = function(_cntTargetClassName, _productClassName, _increase, _minCnt, _maxCnt, _type, _checkboxList, _addClassName, _totalClassName, _currentTarget){
	var $cnt = $("." + _cntTargetClassName);            // 카운트
	var $checkboxList = $("." + _checkboxList);         // 리스트
	var $productTarget = $("." + _productClassName);    // 결제금액
	var $addTarget = $("." + _addClassName);            // 추가금액
	var $totalTarget = $("." + _totalClassName);        // 총 구매금액
	var _addPrice = 0;
	var _productPrice;
   
   switch(_type){
		case 'counter':
			$.fn.comFormNumberCnt(_cntTargetClassName, _productClassName, _increase, _minCnt, _maxCnt);
		break;
		case 'checkbox':
			var $currentTarget = $('.' + _currentTarget);
			$currentTarget.parent().parent('li').toggleClass('active');
		break;
		default: break;
	}

	$checkboxList.find('li').each(function(idx){
		if($(this).hasClass('active')){
		   _addPrice +=(Number($(this).find('.add_product_price').text().replace(/[^\d]+/g,'')));
		}
	});

	_addPrice *= Number($cnt.text());
	_productPrice = Number($productTarget.text().replace(/[^\d]+/g,''));

	$addTarget.text($.fn.addComma(_addPrice));
	$totalTarget.text($.fn.addComma(_productPrice + _addPrice))

	return this;
}

$.fn.addComma = function(num){ // 콤마 찍기
	var regexp = /\B(?=(\d{3})+(?!\d))/g;
	return num.toString().replace(regexp, ',');
}

$.dDaySetTime = function(_num){
	var currentTime = _num;
	var prevTime = (currentTime != 0)?(currentTime - 1):0;

	var _day = Math.floor(currentTime / 60 / 60 / 24);
	var _hour = Math.floor(currentTime / 60 / 60) - (_day * 24 );
	var _min = Math.floor(currentTime / 60) - (_day * 24 * 60) - (_hour * 60) ;
	var _sec = Math.floor(currentTime) - (_day * 24 * 60 * 60) - (_hour * 60 * 60) - (_min * 60);

	var _prevDay = Math.floor(prevTime / 60 / 60 / 24);
	var _prevHour = Math.floor(prevTime / 60 / 60) - (_prevDay * 24 );
	var _prevMin = Math.floor(prevTime / 60) - (_prevDay * 24 * 60) - (_prevHour * 60) ;
	var _prevSec = Math.floor(prevTime) - (_prevDay * 24 * 60 * 60) - (_prevHour * 60 * 60) - (_prevMin * 60);

	function numArr( _num ){
		var numAry = [];
		if(_num < 10){
			numAry[0] = 0;
			numAry[1] = _num;
		}else{
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
$.dDaySet = function(){
	cntObj = arguments;
	
	var cntObjLen = cntObj.length;
	
	initSetDisplayCnt(cntObj);

	if( cntObjLen > 0){
		interval = setInterval(timeout, 1000);
	}else{
	}
	
	function timeout(){
		var cntLen = cntObj.length;
		var $target;

		for(var i = 0; i < cntLen; i++){
			$target = $("#" + cntObj[i].target);

			if($.dDaySetTime(cntObj[i].time).hour00 != $.dDaySetTime(cntObj[i].time).prevHour00){
				$("#" + cntObj[i].target).find('.hour00').addClass('ani');
				$.fn.animationEnd(cntObj[i], 'hour00', i);
			}
			
			if($.dDaySetTime(cntObj[i].time).hour0 != $.dDaySetTime(cntObj[i].time).prevHour0){
				$("#" + cntObj[i].target).find('.hour0').addClass('ani');
				$.fn.animationEnd(cntObj[i], 'hour0', i);
			}
			
			if($.dDaySetTime(cntObj[i].time).min00 != $.dDaySetTime(cntObj[i].time).prevMin00){
				$("#" + cntObj[i].target).find('.min00').addClass('ani');
				$.fn.animationEnd(cntObj[i], 'min00', i);
			}
			
			if($.dDaySetTime(cntObj[i].time).min0 != $.dDaySetTime(cntObj[i].time).prevMin0){
				$("#" + cntObj[i].target).find('.min0').addClass('ani');
				$.fn.animationEnd(cntObj[i], 'min0', i);
			}
			
			if($.dDaySetTime(cntObj[i].time).sec00 != $.dDaySetTime(cntObj[i].time).prevSec00){
				$("#" + cntObj[i].target).find('.sec00').addClass('ani');
				$.fn.animationEnd(cntObj[i], 'sec00', i);
			 }
			
			
			if($.dDaySetTime(cntObj[i].time).sec0 != $.dDaySetTime(cntObj[i].time).prevSec0){
				$("#" + cntObj[i].target).find('.sec0').addClass('ani');
				$.fn.animationEnd(cntObj[i], 'sec0', i);
			}
			cntObj[i].time -= 1;
			if(cntObj[i].time < 0){
				clearInterval(interval);
				try{
					fnHotDealClose();   //  개발쪽에서 사용하는 함수
				}catch(e){
				}
			}
		}
	}

	function initSetDisplayCnt(_target){
		
		 var $target;
		 var cntLen = _target.length;
		
		 for(var i = 0; i < cntLen; i++){
			 $target = $("#" + cntObj[i].target);

			 /* S 남은 수량 */
			 var $hotdealRestItems = $target.parent().parent().find('.hotdeal_rest_items');
			 $hotdealRestItems.text(cntObj[i].restItems);    /* E 남은 수량 */

			 $.fn.setDisplayCnt($target, cntObj[i].time);
		 }
	}

};

$.fn.setDisplayCnt = function(_target, _time){
	var $target = _target;
	var timeObj = $.dDaySetTime(_time) ;

	var $hotdealDDay = $target.children('.hotdeal_dday');
	var $hour00 = $target.find('.hour00');
	var $hour0 = $target.find('.hour0');
	var $min00 = $target.find('.min00');
	var $min0 = $target.find('.min0');
	var $sec00 = $target.find('.sec00');
	var $sec0 = $target.find('.sec0');
	
	$hotdealDDay.text(timeObj.day);

	$hour00.text(timeObj.hour00);
	$hour0.text(timeObj.hour0);
	$min00.text(timeObj.min00);
	$min0.text(timeObj.min0);
	$sec00.text(timeObj.sec00);
	$sec0.text(timeObj.sec0);
	
	$hour00.attr('data-hour00', timeObj.prevHour00);
	$hour0.attr('data-hour0', timeObj.prevHour0);
	$min00.attr('data-min00', timeObj.prevMin00);
	$min0.attr('data-min0', timeObj.prevMin0);
	$sec00.attr('data-sec00', timeObj.prevSec00);
	$sec0.attr('data-sec0', timeObj.prevSec0);
}

	$.fn.animationEnd = function(_target, _txt, _cnt){
		var $target = $('#' + _target.target);

		$target.on({
			animationend:function(e){
				$(e.target).off('animationend');
				$(e.target).removeClass('ani');
				$.fn.setDisplayCnt($target, cntObj[_cnt].time);
			}
		});
	}

/* S SPIN */
	var spinner = null;

	$.fn.startLoading = function(options){
		var opts = $.extend({}, $.fn.startLoading.defaults, options);
		spinner = new Spinner(opts).spin().el;
		jQuery(document.body).append(spinner);
	}

	$.fn.stopLoading = function(){
		if(spinner != null){
			spinner.remove();
			spinner = null;
		}
	}

	$.fn.startLoading.defaults = {
		lines: 12,               // The number of lines to draw
		length: 4,             // The length of each line
		width: 3,             // The line thickness
		radius: 8,             // The radius of the inner circle
		scale: 1,                 // Scales overall size of the spinner
		corners: 0.5,             // Corner roundness (0..1)
		color: '#000',         // #rgb or #rrggbb or array of colors
		opacity: 0.3,         // Opacity of the lines
		rotate: 0,             // The rotation offset
		direction: 1,             // 1: clockwise, -1: counterclockwise
		speed: 1,                 // Rounds per second
		trail: 40,             // Afterglow percentage
		fps: 20,                 // Frames per second when using setTimeout() as a fallback for CSS
		zIndex: 2e9,             // The z-index (defaults to 2000000000)
		className: 'spinner',     // The CSS class to assign to the spinner
		top: '50%',             // Top position relative to parent
		left: '50%',             // Left position relative to parent
		shadow: false,         // Whether to render a shadow
		hwaccel: false,         // Whether to use hardware acceleration
		position: 'absolute'     // Element positioning
	}
/* E SPIN */
	$.fn.inputTemp = function(_target){
		$(_target).prev('input').val('');
	}
})(jQuery);
