(function ($) {
    
//  var aryScreen = ['HOME', 'EVENT', 'STORE', 'MY'];
    var $headerH = $('#header_box').outerHeight() || 0;
    var $navH = $('nav').outerHeight() || 0;
    
	var isTopBanner = true;
    
    var fnPlayInterval = null;
    var isSiteMap;
    var myChartStartIdx;
    var win = this;
    
    var BOTTOM_GAP = 68;
    var TOP_GAP = 2;
    
    var _scrollTop;      
    var touchPreTargetY = 0;
    
    this._commonHandlers = {
        load:function(e){            
            if(e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    e.cancleBubble = true;
                }
            $('.btnTop').on({
                click:function(e){                    
                    e.preventDefault();                    
                    $('html, body').stop().animate({scrollTop:'0'});
                }
            });
            
//            win.oncontextmenu = function(e) {
//                e.preventDefault();
//                e.stopPropagation();
//                return false;
//            };
            $('nav').appendTo('#header_box');
			$('nav').css({
				position : 'static',
				top : 'initial',
			});
			setTopBanner();
			setMainNav();
        },        
        scroll:function(){
            onHomeScroll();
        },
        resize:function(){          
        },
        click:function(e){
            var _target = e.target;
            
            if(_target.tagName == 'A'){
                //e.preventDefault();
                if($(_target).parent().get(0).tagName == 'NAV'){
                    fnAllStop($('.videoAdContent'));
//                    var _currentIdx = $(_target).index()
                    $(_target).addClass('active').siblings('a').removeClass('active');
//                    screenId = aryScreen[_currentIdx];
//                    win.console.log('page=' + screenId)
                }
            }else if(_target.tagName == 'IMG'){
                if($(_target).get(0).id == 'siteMapBtn'){
                    isSiteMap = !isSiteMap;
                }
            }else{
                if($(_target).hasClass('fogbg') || $(_target).hasClass('btn_close')){
                    isSiteMap = !isSiteMap;
                }
            }
        }
    };

	// 메인 네비
	function setMainNav() {
		var $navMenu = $('nav a');
		      
		$navMenu.on({
            click:function(e){

				e.preventDefault();
				var _currentIdx = $(e.target).index();
				var _totalWidth = $navMenu.parent().outerWidth(true);
				var _currentWidth = null;

				$(e.target).addClass('active').siblings().removeClass('active');

				$navMenu.each(function(idx){
					if(idx <= _currentIdx){
						_currentWidth += Math.floor($(this).outerWidth(true));
					}
				});

				if($(window).outerWidth(true) < _totalWidth){
					var _scrollMoveX

					if($navMenu.length - 1 == _currentIdx){
						_scrollMoveX = _totalWidth - $(window).outerWidth();
					}else{
						_scrollMoveX = (_totalWidth - $(window).outerWidth()) * _currentWidth / _totalWidth - 12;
					}

					$('nav').stop().animate({
						'scrollLeft': _scrollMoveX
					});
				}      

            }
		})
	}

	// 풀 스크린 요소 체크    
    function getFullscreenStatus() {
		return document.fullscreenElement
			|| document.webkitFullscreenElement
			|| document.mozFullScreenElement;
	}
	
	// 앱 다운로드 유도 배너 세팅
	function setTopBanner() {
		var $banner = $('.banner_suggest');

		if($banner.length > 0 && $banner.is(':visible')) {
			$('.content_wrap').css({
				'padding-top' : 133
			})
		}

		$banner.find('.btn_x').click(function() {
			isTopBanner = false;
			checkTopBanner('hide');
			$('.content_wrap').css({
				'padding-top' : 88
			})
			evtContTitFixed();
		})

	}
	
	// 앱 다운로드 유도 배너 상태값 체크 show hide
	function checkTopBanner(status) {
		var $banner = $('.banner_suggest');

		if(status == 'show') {	
			if(isTopBanner) {
				$banner.show();
			}else {
				$banner.hide();
			}
		}else {
			$banner.hide();
		}

//		$headerH = $('#header_box').outerHeight();
//		$navH = $('nav').outerHeight();
	}

	// 스크롤 체크 비디오 플레이스탑
	function fnScrChkVideoStop(_wrap) {

		if($('.videoAdContent.active').length> 0 && getFullscreenStatus() == undefined) {
			if(_wrap.hasClass('videoAdWrap')) {
				if(_wrap.scrollTop() > ($('.videoAdContent.active').parent().outerHeight() * ($('.videoAdContent.active').parent().index() + 1))) {
					fnAllStop($('.videoAdContent'));
				}else if(0 < ($('.videoAdContent.active').parent().offset().top - _wrap.outerHeight())) {
					fnAllStop($('.videoAdContent'));
				}
			}else{
				if(_wrap.scrollTop() > ($('.videoAdContent.active').outerHeight() + $('.videoAdContent.active').offset().top) || _wrap.scrollTop() < ($('.videoAdContent.active').offset().top - _wrap.outerHeight())) {
					fnAllStop($('.videoAdContent'));
				}
			}
		}	
	}
	
	// 이벤트 카테고리 fixed 메뉴화 처리
	function evtContTitFixed() {

		var _target = $('.evt_menu_wrap');		
		var _myTop = 0;
		var _targetPosY = Math.round($('.sponsorFpWrap').offset().top); // 크롬 소수점 버그 fix

		if(!$('header').length > 0 && !$('header').is(':visible')) { 
			_myTop = $navH;
		}else{
			_myTop = $navH + $headerH;
		}
		
		var chkConditionScr = function() {

			if(cgv.common.StandardInfo.IsWebView){
				
				_scrollTop = $(win).scrollTop();

				if(_scrollTop > _targetPosY) {

					$('body').addClass('evt_menu_fixed');
					_target.css({
						position:'fixed',
						left: 0,
						right: 0,
						zIndex: 10,
						top: 0
					});
				}else {
					$('body').removeClass('evt_menu_fixed');
					_target.css({
						position:'static'
					});
				}
	
			}else{

				if(_scrollTop > (_targetPosY - _myTop)) {
					$('body').addClass('evt_menu_fixed');
					_target.addClass('fixed');
					_target.css({
						top: _myTop
					});
				}else {
					$('body').removeClass('evt_menu_fixed');
					_target.removeClass('fixed');
					_target.css({
						top: 'initial'
					});
				}
			}
		}

		if(cgv.common.StandardInfo.IsWebView){
			$(win).on('touchmove', function() {
				chkConditionScr();
			})
		}

		$(win).scroll(function() {
			
			if(!$('header').length > 0 || !$('header').is(':visible')) { 
				_myTop = $navH;
			}else{
				if($('#header_box nav').length > 0) {
					_myTop = $headerH;
				}else{
					_myTop = $navH + $headerH;
				}
			}

			chkConditionScr();
		})
		
		$(win).resize(function() {
			_targetPosY = Math.round($('.sponsorFpWrap').offset().top);
		})
	}

	function evtContTitPosY() {
			var _targetOffsetTop = Math.round($('.sponsorFpWrap').offset().top);

		if(cgv.common.StandardInfo.IsWebView){ 
			$('html, body').scrollTop(_targetOffsetTop);	
		}else{

			if(!$('body').hasClass('evt_menu_fixed')) {
				$('html, body').scrollTop((_targetOffsetTop - $navH));
			}else {
				if($('#header_box nav').length > 0) {
					$('html, body').scrollTop((_targetOffsetTop - $headerH));
				}else{
					$('html, body').scrollTop((_targetOffsetTop - ($headerH+$navH)));
				}
		
			}
    
		}

	}
    
    function onHomeScroll(){
        if($('.popFogBg').is(':hidden') || $('.popFogBg').get(0) == undefined){
            _scrollTop = $(win).scrollTop();
            
//            $headerH = $('#header_box').outerHeight() || 0;
//            $navH = $('nav').outerHeight() || 0;
            
//            if(screenId == 'EVENT'){var _fixedTargetT = $('.sponsorFpH1Title').offset().top;}

        
            if($('#fogbg').is(':hidden')){
                if(_scrollTop > touchPreTargetY/* && */){
                    if(_scrollTop >= $headerH){
						$('header').hide();
						checkTopBanner('hide');
                        //$('nav').css({'position':'fixed', 'top' : '0'});
                    }else{
						$('header').show();
						checkTopBanner('show');
                        //$('nav').css({'top' : $navH});
                    }
                }else{
                    $('header').show();
					checkTopBanner('show');
					//$('nav').css({'top' : $navH});
                }
            }else{
                $('header').show();
				checkTopBanner('show');
				//$('nav').css({'top' : $navH});
            }

			$headerH = $('#header_box').outerHeight();
			$navH = $('nav').outerHeight();

            touchPreTargetY = _scrollTop || $(win).scrollTop();
        /* S */
            if(_scrollTop > 0){
                $('.btnTop').css({'display':'block'});
                $('.fixed_link_btn_wrap').addClass('hasTopBtn');
            }else{
                $('.btnTop').css({'display':'none'});
                $('.fixed_link_btn_wrap').removeClass('hasTopBtn');
            }
        }



		fnScrChkVideoStop($(this));

    }
    
    function fullscreen(_target, _opts){

        if(_target.requestFullscreen){            
            _target.requestFullscreen();
		}else if (_target.msRequestFullscreen){
			_target.msRequestFullscreen();
		}else if (_target.mozRequestFullScreen){
            _target.mozRequestFullScreen();
		}else if (_target.webkitRequestFullScreen){
			_target.webkitRequestFullScreen();
		}else if (_target.webkitEnterFullScreen){
			_target.webkitEnterFullScreen();
        }else{
			alert('전체화면 모드를 지원하지 않는 브라우저 입니다.');
//			$(_target).removeAttr('playsinline'); // ios fullscreen
        }

        if(document.fullScreenElement == undefined && document.webkitIsFullScreen == undefined && document.mozFullScreen == undefined && document.msFullscreenElement == undefined){            
            $(_target).on({
                webkitendfullscreen:function(){
                    fullscreenListener(_target, _opts);
                }
            });
        }else{
            $(document).on({
                fullscreenchange:function(){
                    if(!document.IsFullScreen){ fullscreenListener(_target, _opts); }
                },
                webkitfullscreenchange:function(){ // Webkit
                    if(!document.webkitIsFullScreen){ fullscreenListener(_target, _opts); }
                },
                mozfullscreenchange:function(){ // Firefox
                    if(!document.mozFullScreen){ fullscreenListener(_target, _opts); }
                }
            });
        }
    }
        
    // 풀스크린 esc 또는 cancelfullscreen 이벤트 발생시 처리
    function fullscreenListener(_target, _opts){

/*
        if(document.fullScreenElement == undefined && document.webkitIsFullScreen == undefined && document.mozFullScreen == undefined && document.msFullscreenElement == undefined){
            $(_target).off('webkitendfullscreen');
        }else{
            $(document).off('fullscreenchange webkitfullscreenchange mozfullscreenchange');
        }
*/
		
//		if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
		if (getFullscreenStatus() == undefined) { // 풀스크린이 비활성된 후 처리해야 하므로 비활성 체크

        if($(_target).parents().hasClass('videoAdContent')){

            var _videoType = $(_target).parents('.videoAdContent').data('video-type');
            
            if(_opts.autoPlay){
                _target.mediaGroup = !_target.paused;

                $(win).on('scroll', fpPopScroll);
            }

				if(_videoType == 'ad'){// 영상 광고 영역
                    $(_target).parents('.videoAdContent').removeClass('active');    // 영상광고는 자동재생상태와 상관없이 전체화면이후 포스터 이미지로 보여져야함                    
                    _target.autoplay = false;
                    _target.controls = false;
					
					setTimeout(function() {
						//_target.currentTime = 0;
						//_target.pause();
                    _target.load();                  
					},500);
				}else{
					
                    fnDisplayMutedPaused(_target);           
                    
					/*
					if(_target.paused) {
						$(_target).parents('.videoAdContent').removeClass('active');
					}
					*/

					_target.autoplay = false;
					_target.controls = false;

            }

        }else if($(_target).parents().hasClass('favoriteFpVideoContent')){  // 좋아할만한 팬 페이지 
            
				$(_target).parents('.favoriteFpVideoContent').removeClass('active'); // 좋아할만한 팬 페이지 자동재생상태와 상관없이 전체화면이후 포스터 이미지로 보여져야함
            _target.autoplay = false;
            _target.controls = false;
				
				setTimeout(function() {
					//_target.currentTime = 0;
					//_target.pause();
            _target.load();
				},500);
			}
		}
    }

	function fnEndedVideos(_target, _videoType) {
		if(_videoType == 'popUp') {					
			$(_target).parents('.videoAdContent').addClass('set');
			_target.pause();
			_target.currentTime = 0;
        }
    }
    
    function fnDisplayMutedPaused(_target){
        if($(_target).siblings().hasClass('btnSound')){ // btnSound 버튼이 있는지 없는지 체크
            if(_target.muted){  // 음소거
                $(_target).siblings('.btnSound').addClass('soundMute');
            }else{  // 음출력
                $(_target).siblings('.btnSound').removeClass('soundMute');
            }
        }
        
        if(_target.paused){ // 정지
            $(_target).parents('.videoAdContent').removeClass('active');
        }else{  // 재생중
            $(_target).parents('.videoAdContent').addClass('active');
        }       
    }

    function fnDisplayMutedPaused_Favorite(_target){
        if($(_target).siblings().hasClass('btnSound')){ // btnSound 버튼이 있는지 없는지 체크
            if(_target.muted){  // 음소거
                $(_target).siblings('.btnSound').addClass('soundMute');
            }else{  // 음출력
                $(_target).siblings('.btnSound').removeClass('soundMute');
            }
        }
        
        if(_target.paused){ // 정지
            $(_target).parents('.favoriteFpVideoContent').removeClass('active');
        }else{  // 재생중
            $(_target).parents('.favoriteFpVideoContent').addClass('active');
        }       
    }
    
    function cancelFullScreen(_$target){ // console.log("cancel");        
        if(document.cancelFullScreen == undefined && document.mozCancelFullScreen == undefined && document.webkitCancelFullScreen == undefined && document.msCancelFullScreen == undefined){
        
            _$target.attr('playsinline',false);
            
            if (_$target.get(0).exitFullscreen) {
                _$target.get(0).exitFullscreen();
            } else if (_$target.get(0).webkitExitFullscreen) {
                _$target.get(0).webkitExitFullscreen();    
            } else if (_$target.get(0).mozCancelFullScreen) {
                _$target.get(0).mozCancelFullScreen();
            } else if (_$target.get(0).msExitFullscreen) {
                _$target.get(0).msExitFullscreen();
            }

        }else{
            if(document.cancelFullScreen){
                document.cancelFullScreen();
            }else if(document.mozCancelFullScreen){
                document.mozCancelFullScreen();
            }else if(document.webkitCancelFullScreen){
                document.webkitCancelFullScreen();
            }else if(document.msCancelFullScreen){ 
                document.msCancelFullScreen();
            }            
        }
    }
    
    function fnPlayStop_Favorite(_target, _opts){

        var _vidContent = _target.parents('.favoriteFpVideoContent');
        var _vid = _vidContent.children('video');
        var _videoType = _vidContent.data('video-type');
        var isSoundState = _target.siblings('.' + _opts.soundBtn).hasClass('soundMute');
		
		if(!_vid.get(0).currentTime >= 0) {
			_vid.parents('.favoriteFpVideoContent').removeClass('set');
		}

		/*
		var _scrollTarget = $('html, body');
		if(_target.closest('.popVideoAdListWrap').length > 0) { // 메인 전체보기 비디오 리스트 팝업일 경우
			_scrollTarget = _target.closest('.popVideoAdListWrap').find('.popLayerContainer');
		}
		*/

		if(!_target.parents('.favoriteFpVideoContent').hasClass('played')) {
		
        _vid.on({
            ended:function(e){   //console.log('ended');                
				
                if(_opts.autoPlay){$(win).on('scroll', fpPopScroll);}

                cancelFullScreen(_vid);                
                fnDisplayMutedPaused(e.target);

					fnEndedVideos(_vid.get(0), _videoType);

					//_vid.off('ended');
				} 
			});
				
			_vidContent.addClass('played');

            } 

        
        var windowsH = $(this).outerHeight();
        var _headerFixedH = $('#header_box').outerHeight();
        var _navH = $('nav').outerHeight() || 0;
        var _scrollTop = $(this).scrollTop();
        var _isTop = _vid.offset().top - _headerFixedH - _scrollTop > 0;
        var _isBottom = _scrollTop - _vid.outerHeight(true) + windowsH - _vid.offset().top > 0;
        

        if(_opts.autoPlay){ //  autoplay

            if(_target.hasClass(_opts.playBtn)){    // play 버튼                
                if(_vid.get(0).paused){
                    fnAllStop($('.favoriteFpVideoContent'));

                    if(_isTop && _isBottom){
                        if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                            _vid.attr('playsinline',false);
                            _vid.get(0).muted = isSoundState;                        
                        }else if(_videoType == 'ad'){   //console.log("a1");
                            $(win).off('scroll');
                            _vid.get(0).muted = false;
                            fullscreen(_vid.get(0), _opts);              
                        }                        
                        _vidContent.addClass('active');
                        _vid.get(0).mediaGroup = true;
                        fnPlayPromise(_vid.get(0));
                    }else if(!_isTop && _isBottom){
                        if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                            _vid.attr('playsinline',false);                            
                            $('html, body').stop().animate({
                                'scrollTop': _vid.offset().top - _headerFixedH - _navH - TOP_GAP
                            }, 400, function(){
                                _vid.get(0).muted = isSoundState;
                            });
                        }else if(_videoType == 'ad'){   //console.log("a1");
                            $(win).off('scroll');
                            _vid.get(0).muted = false;
                            fullscreen(_vid.get(0), _opts);              
                        }                        
                        _vidContent.addClass('active');
                        _vid.get(0).mediaGroup = true;
                        fnPlayPromise(_vid.get(0));
                        
                    }else if(_isTop && !_isBottom){
                        if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                            _vid.attr('playsinline',false);
                            $('html, body').stop().animate({
                                'scrollTop': _vid.offset().top - windowsH + _vid.outerHeight(true) + BOTTOM_GAP
                            }, 400, function(){
                                _vid.get(0).muted = isSoundState;
                            });
                        }else if(_videoType == 'ad'){   //console.log("a1");
                            $(win).off('scroll');
                            _vid.get(0).muted = false;
                            fullscreen(_vid.get(0), _opts);              
                        }                        
                        _vidContent.addClass('active');
                        _vid.get(0).mediaGroup = true;
                        fnPlayPromise(_vid.get(0));
                    }
                }else{                    
                    if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                        _vid.attr('playsinline',false);
                        _vidContent.removeClass('active');
                        _vid.get(0).mediaGroup = false;
                        _vid.get(0).pause();
                    }else if(_videoType == 'ad' || _videoType == 'fpEtc'){ // autoplay 일경우 영상광고영역 play 버튼 클릭시
                        $(win).off('scroll');
                        _vid.get(0).muted = false;
                        fullscreen(_vid.get(0), _opts);
//                        _vid.get(0).load();
                        fnPlayPromise(_vid.get(0));
                    }
                }
            }else if(_target.hasClass(_opts.fullScreenBtn)){  // fullscreen 버튼
                $(win).off('scroll');
                fnAllStop($('.favoriteFpVideoContent'));

                if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                    _vidContent.addClass('active');
                    _vid.get(0).muted = isSoundState;
                    
                    if(_isTop && _isBottom){
                        fnPlayPromise(_vid.get(0));                        
                    }else if(!_isTop && _isBottom){
                        $('html, body').scrollTop(_vid.offset().top - _headerFixedH - TOP_GAP);
                        fnPlayPromise(_vid.get(0));                        
                    }else if(_isTop && !_isBottom){
                        $('html, body').scrollTop(_vid.offset().top - windowsH + _vid.outerHeight(true) + BOTTOM_GAP);
                        fnPlayPromise(_vid.get(0));                        
                    }                   
                    fullscreen(_vid.get(0), _opts);
                }
            }


        }else{  // not autoplay
					
            if(_target.hasClass(_opts.playBtn)){    // play 버튼    

				//$('.aaa').text(_opts.playBtn);
                if(_vid.get(0).paused){
                    fnAllStop($('.favoriteFpVideoContent'));
                    _vidContent.addClass('active');

					if(_videoType == 'ad'){
						_vid.get(0).muted = false;
						fullscreen(_vid.get(0), _opts);
					}else if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                        if(_isTop && _isBottom){

                                _vid.attr('playsinline', true);
                                _vid.get(0).muted = isSoundState;                        

                        }else if(!_isTop && _isBottom){

                                _vid.attr('playsinline', true);
								
                                $('html, body').stop().animate({
                                    'scrollTop': _vid.offset().top - _headerFixedH - _navH - TOP_GAP
                                }, 400, function(){
                                    _vid.get(0).muted = isSoundState;
                                });

                        }else if(_isTop && !_isBottom){

                                _vid.attr('playsinline', true);

                                $('html, body').stop().animate({
                                    'scrollTop': _vid.offset().top - windowsH + _vid.outerHeight(true) + BOTTOM_GAP
                                }, 400, function(){
                                    _vid.get(0).muted = isSoundState;
                                });

                            }
                        }

                        fnPlayPromise(_vid.get(0));
                   
                }else{
                    if(_videoType == 'ad'){                        
						
                    }else if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){                        
                        _vidContent.removeClass('active');            
                        _vid.get(0).pause();
                    }
                }
            }else if(_target.hasClass(_opts.fullScreenBtn)){  // fullscreen 버튼
                
				//$('.aaa').text(_opts.fullScreenBtn);

                fnAllStop($('.favoriteFpVideoContent'));
                
                if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                    /*if(cgv.common.Constants.isIPHONE && (cgv.common.Constants.iOsVer >= 11)){
                    _vid.on({
                        progress:function(){
                            if(_vid.get(0).readyState >= 3){
                                _vidContent.addClass('active');
                                _vid.get(0).muted = isSoundState;

                                fullscreen(_vid.get(0), _opts);
                                if(_isTop && _isBottom){
                                    fnPlayPromise(_vid.get(0));
                                }else if(!_isTop && _isBottom){                        
                                    $('html, body').scrollTop(_vid.offset().top - _headerFixedH - TOP_GAP);
                                    fnPlayPromise(_vid.get(0));                        
                                }else if(_isTop && !_isBottom){
                                    $('html, body').scrollTop(_vid.offset().top - windowsH + _vid.outerHeight(true) + BOTTOM_GAP);
                                    fnPlayPromise(_vid.get(0));                        
                                }                                
                                _vid.off('progress');
                            }
                        }
                    });
                    }else{*/

                        _vidContent.addClass('active');
                        _vid.get(0).muted = isSoundState;

			if(_isTop && _isBottom){
                            fnPlayPromise(_vid.get(0));
                        }else if(!_isTop && _isBottom){                        
                            $('html, body').scrollTop(_vid.offset().top - _headerFixedH - TOP_GAP);
                            fnPlayPromise(_vid.get(0));                        
                        }else if(_isTop && !_isBottom){
                            $('html, body').scrollTop(_vid.offset().top - windowsH + _vid.outerHeight(true) + BOTTOM_GAP);
                            fnPlayPromise(_vid.get(0));                        
                        }
						
                        fullscreen(_vid.get(0), _opts);
						
//                    }
                }
            }
        }
    }

    function fnPlayStop(_target, _opts){

        var _vidContent = _target.parents('.videoAdContent');
        var _vid = _vidContent.children('video');
        var _videoType = _vidContent.data('video-type');
        var isSoundState = _target.siblings('.' + _opts.soundBtn).hasClass('soundMute');
		
		if(!_vid.get(0).currentTime >= 0) {
			_vid.parents('.videoAdContent').removeClass('set');
		}

		/*
		var _scrollTarget = $('html, body');
		if(_target.closest('.popVideoAdListWrap').length > 0) { // 메인 전체보기 비디오 리스트 팝업일 경우
			_scrollTarget = _target.closest('.popVideoAdListWrap').find('.popLayerContainer');
		}
		*/

		if(!_target.parents('.videoAdContent').hasClass('played')) {
		
        _vid.on({
            ended:function(e){   //console.log('ended');                
				
                if(_opts.autoPlay){$(win).on('scroll', fpPopScroll);}

                cancelFullScreen(_vid);                
                fnDisplayMutedPaused(e.target);

					fnEndedVideos(_vid.get(0), _videoType);

					//_vid.off('ended');
				} 
			});
				
			_vidContent.addClass('played');

            } 

        
        var windowsH = $(this).outerHeight();
        var _headerFixedH = $('#header_box').outerHeight();
        var _navH = $('nav').outerHeight() || 0;
        var _scrollTop = $(this).scrollTop();
        var _isTop = _vid.offset().top - _headerFixedH - _scrollTop > 0;
        var _isBottom = _scrollTop - _vid.outerHeight(true) + windowsH - _vid.offset().top > 0;
        

        if(_opts.autoPlay){ //  autoplay

            if(_target.hasClass(_opts.playBtn)){    // play 버튼                
                if(_vid.get(0).paused){
                    fnAllStop($('.videoAdContent'));

                    if(_isTop && _isBottom){
                        if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                            _vid.attr('playsinline',false);
                            _vid.get(0).muted = isSoundState;                        
                        }else if(_videoType == 'ad'){   //console.log("a1");
                            $(win).off('scroll');
                            _vid.get(0).muted = false;
                            fullscreen(_vid.get(0), _opts);              
                        }                        
                        _vidContent.addClass('active');
                        _vid.get(0).mediaGroup = true;
                        fnPlayPromise(_vid.get(0));
                    }else if(!_isTop && _isBottom){
                        if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                            _vid.attr('playsinline',false);                            
                            $('html, body').stop().animate({
                                'scrollTop': _vid.offset().top - _headerFixedH - _navH - TOP_GAP
                            }, 400, function(){
                                _vid.get(0).muted = isSoundState;
                            });
                        }else if(_videoType == 'ad'){   //console.log("a1");
                            $(win).off('scroll');
                            _vid.get(0).muted = false;
                            fullscreen(_vid.get(0), _opts);              
                        }                        
                        _vidContent.addClass('active');
                        _vid.get(0).mediaGroup = true;
                        fnPlayPromise(_vid.get(0));
                        
                    }else if(_isTop && !_isBottom){
                        if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                            _vid.attr('playsinline',false);
                            $('html, body').stop().animate({
                                'scrollTop': _vid.offset().top - windowsH + _vid.outerHeight(true) + BOTTOM_GAP
                            }, 400, function(){
                                _vid.get(0).muted = isSoundState;
                            });
                        }else if(_videoType == 'ad'){   //console.log("a1");
                            $(win).off('scroll');
                            _vid.get(0).muted = false;
                            fullscreen(_vid.get(0), _opts);              
                        }                        
                        _vidContent.addClass('active');
                        _vid.get(0).mediaGroup = true;
                        fnPlayPromise(_vid.get(0));
                    }
                }else{                    
                    if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                        _vid.attr('playsinline',false);
                        _vidContent.removeClass('active');
                        _vid.get(0).mediaGroup = false;
                        _vid.get(0).pause();
                    }else if(_videoType == 'ad' || _videoType == 'fpEtc'){ // autoplay 일경우 영상광고영역 play 버튼 클릭시
                        $(win).off('scroll');
                        _vid.get(0).muted = false;
                        fullscreen(_vid.get(0), _opts);
//                        _vid.get(0).load();
                        fnPlayPromise(_vid.get(0));
                    }
                }
            }else if(_target.hasClass(_opts.fullScreenBtn)){  // fullscreen 버튼
                $(win).off('scroll');
                fnAllStop($('.videoAdContent'));

                if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                    _vidContent.addClass('active');
                    _vid.get(0).muted = isSoundState;
                    
                    if(_isTop && _isBottom){
                        fnPlayPromise(_vid.get(0));                        
                    }else if(!_isTop && _isBottom){
                        $('html, body').scrollTop(_vid.offset().top - _headerFixedH - TOP_GAP);
                        fnPlayPromise(_vid.get(0));                        
                    }else if(_isTop && !_isBottom){
                        $('html, body').scrollTop(_vid.offset().top - windowsH + _vid.outerHeight(true) + BOTTOM_GAP);
                        fnPlayPromise(_vid.get(0));                        
                    }                   
                    fullscreen(_vid.get(0), _opts);
                }
            }


        }else{  // not autoplay
					
            if(_target.hasClass(_opts.playBtn)){    // play 버튼    

				//$('.aaa').text(_opts.playBtn);
                if(_vid.get(0).paused){
                    fnAllStop($('.videoAdContent'));
                    _vidContent.addClass('active');

					if(_videoType == 'ad'){
						_vid.get(0).muted = false;
						fullscreen(_vid.get(0), _opts);
					}else if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                        if(_isTop && _isBottom){

                                _vid.attr('playsinline', true);
                                _vid.get(0).muted = isSoundState;                        

                        }else if(!_isTop && _isBottom){

                                _vid.attr('playsinline', true);
								
                                $('html, body').stop().animate({
                                    'scrollTop': _vid.offset().top - _headerFixedH - _navH - TOP_GAP
                                }, 400, function(){
                                    _vid.get(0).muted = isSoundState;
                                });

                        }else if(_isTop && !_isBottom){

                                _vid.attr('playsinline', true);

                                $('html, body').stop().animate({
                                    'scrollTop': _vid.offset().top - windowsH + _vid.outerHeight(true) + BOTTOM_GAP
                                }, 400, function(){
                                    _vid.get(0).muted = isSoundState;
                                });

                            }
                        }

                        fnPlayPromise(_vid.get(0));
                   
                }else{
                    if(_videoType == 'ad'){                        
						
                    }else if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){                        
                        _vidContent.removeClass('active');            
                        _vid.get(0).pause();
                    }
                }
            }else if(_target.hasClass(_opts.fullScreenBtn)){  // fullscreen 버튼
                
				//$('.aaa').text(_opts.fullScreenBtn);

                fnAllStop($('.videoAdContent'));
                
                if(_videoType == 'fp' || _videoType == 'popUp' || _videoType == 'fpEtc'){
                    /*if(cgv.common.Constants.isIPHONE && (cgv.common.Constants.iOsVer >= 11)){
                    _vid.on({
                        progress:function(){
                            if(_vid.get(0).readyState >= 3){
                                _vidContent.addClass('active');
                                _vid.get(0).muted = isSoundState;

                                fullscreen(_vid.get(0), _opts);
                                if(_isTop && _isBottom){
                                    fnPlayPromise(_vid.get(0));
                                }else if(!_isTop && _isBottom){                        
                                    $('html, body').scrollTop(_vid.offset().top - _headerFixedH - TOP_GAP);
                                    fnPlayPromise(_vid.get(0));                        
                                }else if(_isTop && !_isBottom){
                                    $('html, body').scrollTop(_vid.offset().top - windowsH + _vid.outerHeight(true) + BOTTOM_GAP);
                                    fnPlayPromise(_vid.get(0));                        
                                }                                
                                _vid.off('progress');
                            }
                        }
                    });
                    }else{*/

                        _vidContent.addClass('active');
                        _vid.get(0).muted = isSoundState;

			if(_isTop && _isBottom){
                            fnPlayPromise(_vid.get(0));
                        }else if(!_isTop && _isBottom){                        
                            $('html, body').scrollTop(_vid.offset().top - _headerFixedH - TOP_GAP);
                            fnPlayPromise(_vid.get(0));                        
                        }else if(_isTop && !_isBottom){
                            $('html, body').scrollTop(_vid.offset().top - windowsH + _vid.outerHeight(true) + BOTTOM_GAP);
                            fnPlayPromise(_vid.get(0));                        
                        }
						
                        fullscreen(_vid.get(0), _opts);
						
//                    }
                }
            }
        }
    }
    

    
    function fnSoundOnOff(_target, _isSound){
        var _vid = _target.parents('.videoAdContent').children('video');
        
        if(_isSound){
            _target.removeClass('soundMute');
            _vid.get(0).muted = false;
        }else{
            _target.addClass('soundMute');
            _vid.get(0).muted = true;
        }
    }

    function fnSoundOnOff_Favorite(_target, _isSound){
        var _vid = _target.parents('.favoriteFpVideoContent').children('video');
        
        if(_isSound){
            _target.removeClass('soundMute');
            _vid.get(0).muted = false;
        }else{
            _target.addClass('soundMute');
            _vid.get(0).muted = true;
        }
    }
    
    function fnAllStop(_target){
        _target.each(function(){             
            if($(this).hasClass('active')){
                $(this).children('video').get(0).pause();
                $(this).removeClass('active');
            }
        });
     }
    
    $.fn.mainPlayer = function(options){    // 영상광고 / 영상광고 팝업 팬 페이지 영상 / 

        var opts = $.extend({}, $.fn.mainPlayer.defaults, options);
        
        var isAutoPlay = opts.autoPlay;
        var $playBtn = $('.' + opts.playBtn);
        var $fullScreenBtn = $('.' + opts.fullScreenBtn);
        var $soundBtn = $('.' + opts.soundBtn);

        //$playBtn.on({
        $(win).on({
            click:function(e){
                
                var $target = $(e.target);
                
                if($(e.target).hasClass(opts.playBtn)){
                    fnPlayStop($target, opts);                     
                }else if($(e.target).hasClass(opts.fullScreenBtn)){
                    fnPlayStop($target, opts);
                }else if($(e.target).hasClass(opts.soundBtn)){
                    var isSoundState = $target.hasClass('soundMute');
                    fnSoundOnOff($target ,isSoundState);
                }
            }
        });        
        
        if(isAutoPlay){ // console.log('autoplay');

            var $videoAd = $('article.videoAdWrap video');
            
            $videoAd.on({
                ended:function(){   //console.log('ended');                    
	                fnDisplayMutedPaused($videoAd.get(0));
	                $videoAd.get(0).autoplay = false;

			$videoAd.children('source').attr('src', '');
			$videoAd.attr('src', '');
			$videoAd.attr('poster', $videoAd.attr('poster'));
			$videoAd.off('ended');
                },                
            });            
            
            $videoAd.parents('.videoAdContent').addClass('active');
            $videoAd.get(0).autoplay = true;
            $videoAd.get(0).controls = false;
            $videoAd.get(0).muted = true;
            fnPlayPromise($videoAd.get(0));
                       
            $('.videoAdContent').each(function(){
                if($(this).data('video-type') != 'popUp'){
                    $(this).children('video').get(0).mediaGroup = true;
                }
            });
            
            //$(win).on('scroll', fpPopScroll);
            
        }else{ //console.log('stopPlay');            
        }
    };
    
    function fpPopScroll(){
        var _scrollTop = $(this).scrollTop();
        $headerH = $('#header_box').outerHeight() || 0;
        $navH = $('nav').outerHeight() || 0;
        isSiteMap = $('#siteMap').is(':visible');

        if(_scrollTop >= $headerH ){                
            $('.container').css({'padding-top': $navH + 'px'});
            $('nav').css({'position':'fixed', 'top' : '0'});
        }else{
            $('.container').css({'padding-top':'0'});
            $('nav').css({'position':'static', 'top':'auto'});
        }

        
        if(_scrollTop > 0){
            $('.btnTop').show();
        }else{
            $('.btnTop').hide();
        }  
        
        
        var windowsH = $(this).outerHeight();
        var _headerFixedH = $headerH;                    

        $('.videoAdContent').each(function(idx){

            if($(this).data('video-type') != 'popUp'){
                var _vidContent = $(this).children('video');
                var _isTop = _vidContent.offset().top - _headerFixedH - _scrollTop > 0;
                var _isBottom = _scrollTop - _vidContent.outerHeight(true) + windowsH - _vidContent.offset().top > 0;

                var isPreVid = $('.videoAdContent').eq(idx - 1).children('video').get(0).paused;
                var isNextVid = $('.videoAdContent').eq(idx + 1).children('video').get(0).paused;

                if(_isTop && _isBottom && _vidContent.get(0).mediaGroup && isPreVid && isNextVid){    //  화면 내 재생
                    if(_vidContent.data('play-state') != false){
                        if($(this).children('video').children('source').attr('src') == ''){
                            $(this).children('video').children('source').attr('src', $(this).children('video').children('source').attr('data-src'));
                            $(this).children('video').attr('src', $(this).children('video').children('source').attr('data-src'));
                        } 

                        if(idx == 0){                                    
                            $(this).children('video').parents('.videoAdContent').addClass('active');
                            $(this).children('video').get(0).autoplay = true;
                            $(this).children('video').get(0).controls = false;
                            $(this).children('video').get(0).muted = true;
                        }else{
                            var isSoundState = $(this).children('video').siblings('.btnSound').hasClass('soundMute');                                    
                            $(this).children('video').get(0).muted = isSoundState;
                        }
                        fnPlayPromise($(this).children('video'));
                        $(this).addClass('active');
                    }
                }else{  // 화면에 걸치면 멈춤
//                    console.log("a"+ $(this).children('video').get(0).paused)
                    if(idx == 0){
						$(this).children('video').children('source').attr('src', '');
						$(this).children('video').attr('src', '');
						$(this).children('video').attr('poster', $(this).children('video').attr('poster'));
						$(this).children('video').off('ended');
                    }else{
                        $(this).children('video').get(0).pause();
                    }
                    $(this).removeClass('active');
                }
            }
        });
    }
    
    $.fn.mainPlayer.defaults = {
        'autoPlay' : false,
        'playBtn' : 'btnVideoAdPlay',
        'fullScreenBtn' : 'btnFullScreen',
        'soundBtn' : 'btnSound'
    }
    
    function fnPlayPromise(_playVid){
        try{
            if(_playVid.paused){
                _playVid.controls = false;
				   _playVid.play();
            }
        }catch(e){
            win.console.log('loading error' + e);
            alert("loading error")
        }
//        if (_playVid !== undefined) {
//            _playVid.then(_ => {
//                _playVid.play();
//            })
//            .catch(error => {
//                console.log("video loading")                          
//            });
//        }
    }
/* S [U 20200401] Footer 기능변경으로 인한 수정 */
//    $.fn.fnFooter = function( _target ){
//        var $target = $(_target).parent('dt');
//        if(!$target.hasClass('active')){
//            $target.siblings().slideDown(function(){
//                $target.addClass('active');
//            });
//        }else{
//            $target.siblings().slideUp(function(){
//                $target.removeClass('active');
//            });
//        }
//    }
/* E [U 20200401] Footer 기능변경으로 인한 수정 */

    
    this._homeHandlers = {
        load:function(){
        
            var swiperItemLen = $(".eventBannerList").find('.swiper-slide').length;
            
            if(swiperItemLen <= 1){
                $('.eventBannerControlWrap').hide();                
                $('.btnEventBannerNext').hide();
            }else{
                var swiper = new Swiper('.eventBannerList', {                    
                    loop: true,                
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    navigation: {
                        nextEl: '.btnEventBannerNext'
                    },
                    pagination:{
                        el: '.bannerCurrentNum',
                        type: 'fraction'
                    }
                });

                if(swiper.autoplay.running){
                    $('.btnEventBannerControl').addClass('active');
                }

                $('.btnEventBannerControl').on({
                    click:function(e){                    
                        if(swiper.autoplay.running){
                            $(this).removeClass('active');
                            swiper.autoplay.stop();
                        }else{
                            $(this).addClass('active');
                            swiper.autoplay.start();
                        }

                   } 
                });                
                $('.eventBannerControlWrap').show();
                $('.btnEventBannerNext').show();
            }
                    
            this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);            
            
            this.setScrollWidth($('.cgvMovieChartContainer > li.active h2 .hashList'), null);
            this.setScrollWidth($('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active .cgvMovieChartContent'), $('.btnFirstMove'));
            this.setScrollWidth($('.onlyCGVSpecialContainer > li.active h2 .hashList'), null);
            this.setScrollWidth($('.onlyCGVSpecialContainer > li.active .onlyCGVSpecialContents > li.active .onlyCGVSpecialContent'), $('.btnFirstMove'));
            this.setScrollWidth($('.favoriteFpList'), null);

            $('.btnVideoAdPlay').on({
                click:function(e){

                    var url = $(this).attr("data-AdMovieCntUrl");
                    if(url != "")
                    {
                        fnAD_MOVIE_CNT_URL(url);
                        $(this).attr("data-AdMovieCntUrl", "");
                    }

//                    $(this).prevAll('video').fadeIn();
//                    $(this).prevAll('.poster_img').fadeOut();
//                    $(this).parent().prev('.videoAdCover').css({'animation':'none'});
//                    $(this).parent().prev('.videoAdCover').animate({
//                        'left':'-100vw',
//                        'opacity':'0'
//                    }, function(){                        
                        //jQuery(this).mainPlayer({'autoPlay':'true'});
                        /* S 
                            D 전체 화면 동영상이 재생완료되거나 재생전상태로 되돌아갈때 처리해야할 코드 */
//                         $(this).css({'animation':'videoAdCoverMove 2s infinite', 'opacity':'1', 'left':'-4vw'});
//                         $(this).next().find('video').css({'display':'none'});
//                         $(this).next().find('.poster_img').css({'display':'block'});
//                    });
                }
            });
            
            comPopLayerShowHide('btnVideoAdMore', 'popVideoAdListWrap', 'popFogBg');
            $.fn.shareOpenPopupLayer = function() {
                popLayerFadeShowHide('btnShare', 'popShareWrap', 'popFogBg');
            }
            
            $('.favoriteFpList').favoritePlayer();            
            //$('.recommendMovie_list').favoritePlayer();
            $.fn.nowTicketingOpenPopupLayer = function() {
                popLayerFadeShowHide('btnNowTicketing', 'popNowTicketingWrap', 'popFogBg');
//                            $('.popLayer').insertBefore('footer'); // header fixed로 팝업 생성시 동적으로 'class' wrap의 자식노드에서 wrap의 형제노드로 변경
//                            popLayerBgFadeShowHide($fogBg, $popLayer, _isFogBg);
            }            
        },
        scroll:function(){            
        },        
        resize:function(){            
        },
        click:function(e){
            var _target = e.target;
            
            if(_target.tagName == 'A'){
                //e.preventDefault();
                if($(_target).hasClass('btnArrowUD')){   // 나만의 차트 더보기 버튼
                    $('.comRolling').toggleClass('active');
                    this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
                }else if($(_target).hasClass('btnFirstMove')){  // CGV 무비차트 처음으로 버튼                    
                    $('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active').stop().animate({
                        scrollLeft:0
                    },function(){
                        $('.btnFirstMove').hide();
                    });
                }else if($(_target).hasClass('btnFirstSpecial')){
                    $('.onlyCGVSpecialContainer > li.active .onlyCGVSpecialContents > li.active').stop().animate({
                        scrollLeft:0
                    },function(){
                        $('.btnFirstSpecial').hide();
                    });
                }else if($(_target).hasClass('btnQuick')){  // 퀵메뉴
                    if($(_target).parent().hasClass('active')){                        
                        quickMenu($(_target), true);
                        $('.quickFogBg').off('click').stop().animate({
                            'top':'100%'
                        }, 'fast', function(){});
                    }else{
                        quickMenu($(_target), false);

                        $('.quickFogBg').stop().animate({
                            'top':'0%'
                        }, 'fast', function(){                            
                            $('.quickFogBg').on({
                                click:function(){
                                   quickMenu($(_target), true);
                                    $('.quickFogBg').off('click').stop().animate({
                                        'top':'150%'
                                    }, 'fast', function(){});
                                }
                            });
                        });
                    }
                }                
                
                if($(_target).parents('article').hasClass('cgvMovieChartWrap')){    // 나만의 차트                    
                    if($(_target).parents('ul').hasClass('cgvMovieChartTitle')){
                        if(!$(_target).parent('li').hasClass('active')){                        
                            var _cuttentIdx = $(_target).parent('li').index();
                            $(_target).parent('li').addClass('active').siblings('li').removeClass('active');                            
                            $('.cgvMovieChartContainer > li:eq(' + _cuttentIdx + ')').addClass('active').siblings('li').removeClass('active');
                            this.setScrollWidth($('.cgvMovieChartContainer > li.active h2 .hashList'), null);
                            this.setScrollWidth($('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active .cgvMovieChartContent'), $('.btnFirstMove'));
                        }                                                
                    }else if($(_target).parents('ul').hasClass('hashList')){                        
                        var targetIdx = $(_target).parent('li').index();
                        $(_target).parent('li').addClass('active').siblings('li').removeClass('active');                        
                        $(_target).parents('h2').next('.cgvMovieChartContents').children('li:eq(' + targetIdx + ')').addClass('active').siblings('li').removeClass('active');
                        this.setScrollWidth($('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active .cgvMovieChartContent'), $('.btnFirstMove'));
                    }
                }else if($(_target).parents('article').hasClass('onlyCGVSpecialHall')){    // Only CGV & 특별관
                    if($(_target).parents('ul').hasClass('onlyCGVSpecialTitle')){
                        //console.log("A");
                        var _cuttentIdx = $(_target).parent('li').index();
                        $(_target).parent('li').addClass('active').siblings('li').removeClass('active');
                        $('.onlyCGVSpecialContainer > li:eq(' + _cuttentIdx + ')').addClass('active').siblings('li').removeClass('active');
                    }else if($(_target).parents('ul').hasClass('hashList')){                        
                        var targetIdx = $(_target).parent('li').index();
                        $(_target).parent('li').addClass('active').siblings('li').removeClass('active');                        
                        $(_target).parents('h2').next('.onlyCGVSpecialContents').children('li:eq(' + targetIdx + ')').addClass('active').siblings('li').removeClass('active');
                    }
                }
                
                
            }else if(_target.tagName == 'IMG'){
                if($(_target).get(0).id == 'siteMapBtn'){
                    this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
                }
            }else{
                if($(_target).hasClass('fogbg') || $(_target).hasClass('btn_close')){
                    this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
                }
            }
        }
    };

    this._movieInfoHandlers = 
    {
        load:function(){
        
            var swiperItemLen = $(".eventBannerList").find('.swiper-slide').length;
            
            if(swiperItemLen <= 1){
                $('.eventBannerControlWrap').hide();                
                $('.btnEventBannerNext').hide();
            }else{
                var swiper = new Swiper('.eventBannerList', {                    
                    loop: true,                
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    navigation: {
                        nextEl: '.btnEventBannerNext'
                    },
                    pagination:{
                        el: '.bannerCurrentNum',
                        type: 'fraction'
                    }
                });

                if(swiper.autoplay.running){
                    $('.btnEventBannerControl').addClass('active');
                }

                $('.btnEventBannerControl').on({
                    click:function(e){                    
                        if(swiper.autoplay.running){
                            $(this).removeClass('active');
                            swiper.autoplay.stop();
                        }else{
                            $(this).addClass('active');
                            swiper.autoplay.start();
                        }

                   } 
                });                
                $('.eventBannerControlWrap').show();
                $('.btnEventBannerNext').show();
            }
                    
            this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);            
            
            this.setScrollWidth($('.cgvMovieChartContainer > li.active h2 .hashList'), null);
            this.setScrollWidth($('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active .cgvMovieChartContent'), $('.btnFirstMove'));
            this.setScrollWidth($('.favoriteFpList'), null);
            
            comPopLayerShowHide('btnVideoAdMore', 'popVideoAdListWrap', 'popFogBg');
            $.fn.shareOpenPopupLayer = function() {
                popLayerFadeShowHide('btnShare', 'popShareWrap', 'popFogBg');
            }
            
            $('.favoriteFpList').favoritePlayer();            
            $.fn.nowTicketingOpenPopupLayer = function() {
                popLayerFadeShowHide('btnNowTicketing', 'popNowTicketingWrap', 'popFogBg');
//                            $('.popLayer').insertBefore('footer'); // header fixed로 팝업 생성시 동적으로 'class' wrap의 자식노드에서 wrap의 형제노드로 변경
//                            popLayerBgFadeShowHide($fogBg, $popLayer, _isFogBg);
            }            
        },
        scroll:function(){            
        },        
        resize:function(){            
        },
        click:function(e){
            
            //console.log("클릭");

            var _target = e.target;
            
            if(_target.tagName == 'A'){
                //e.preventDefault();
                if($(_target).hasClass('btnArrowUD')){   // 나만의 차트 더보기 버튼
                    $('.comRolling').toggleClass('active');
                    this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
                }else if($(_target).hasClass('btnFirstMove')){  // CGV 무비차트 처음으로 버튼                    
                    $('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active').stop().animate({
                        scrollLeft:0
                    },function(){
                        $('.btnFirstMove').hide();
                    });
                }else if($(_target).hasClass('btnQuick')){  // 퀵메뉴
                    if($(_target).parent().hasClass('active')){                        
                        quickMenu($(_target), true);
                        $('.quickFogBg').off('click').stop().animate({
                            'top':'100%'
                        }, 'fast', function(){});
                    }else{
                        quickMenu($(_target), false);

                        $('.quickFogBg').stop().animate({
                            'top':'0%'
                        }, 'fast', function(){                            
                            $('.quickFogBg').on({
                                click:function(){
                                   quickMenu($(_target), true);
                                    $('.quickFogBg').off('click').stop().animate({
                                        'top':'150%'
                                    }, 'fast', function(){});
                                }
                            });
                        });
                    }
                }                
                
                if($(_target).parents('article').hasClass('cgvMovieChartWrap')){    // 나만의 차트                    
                    if($(_target).parents('ul').hasClass('cgvMovieChartTitle')){
                        if(!$(_target).parent('li').hasClass('active')){                        
                            var _cuttentIdx = $(_target).parent('li').index();
                            $(_target).parent('li').addClass('active').siblings('li').removeClass('active');                            
                            $('.cgvMovieChartContainer > li:eq(' + _cuttentIdx + ')').addClass('active').siblings('li').removeClass('active');
                            this.setScrollWidth($('.cgvMovieChartContainer > li.active h2 .hashList'), null);
                            this.setScrollWidth($('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active .cgvMovieChartContent'), $('.btnFirstMove'));
                        }                                                
                    }else if($(_target).parents('ul').hasClass('hashList')){                        
                        var targetIdx = $(_target).parent('li').index();
                        $(_target).parent('li').addClass('active').siblings('li').removeClass('active');                        
                        $(_target).parents('h2').next('.cgvMovieChartContents').children('li:eq(' + targetIdx + ')').addClass('active').siblings('li').removeClass('active');
                        this.setScrollWidth($('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active .cgvMovieChartContent'), $('.btnFirstMove'));
                    }
                }else if($(_target).parents('article').hasClass('onlyCGVSpecialHall')){    // Only CGV & 특별관
                    if($(_target).parents('ul').hasClass('onlyCGVSpecialTitle')){
                        //console.log("A");
                        var _cuttentIdx = $(_target).parent('li').index();
                        $(_target).parent('li').addClass('active').siblings('li').removeClass('active');
                        $('.onlyCGVSpecialContainer > li:eq(' + _cuttentIdx + ')').addClass('active').siblings('li').removeClass('active');
                    }else if($(_target).parents('ul').hasClass('hashList')){                        
                        var targetIdx = $(_target).parent('li').index();
                        $(_target).parent('li').addClass('active').siblings('li').removeClass('active');                        
                        $(_target).parents('h2').next('.onlyCGVSpecialContents').children('li:eq(' + targetIdx + ')').addClass('active').siblings('li').removeClass('active');
                    }
                }
                
                
            }else if(_target.tagName == 'IMG'){
                if($(_target).get(0).id == 'siteMapBtn'){
                    this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
                }
            }else{
                if($(_target).hasClass('fogbg') || $(_target).hasClass('btn_close')){
                    this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
                }
            }
        }
    };


    this._fastorderHandlers = {
        load:function(){
            console.log("FAST ORDER init");
        //     var swiperItemLen = $(".eventBannerList").find('.swiper-slide').length;
            
        //     if(swiperItemLen <= 1){
        //         $('.eventBannerControlWrap').hide();                
        //         $('.btnEventBannerNext').hide();
        //     }else{
        //         var swiper = new Swiper('.eventBannerList', {                    
        //             loop: true,                
        //             autoplay: {
        //                 delay: 3000,
        //                 disableOnInteraction: false
        //             },
        //             navigation: {
        //                 nextEl: '.btnEventBannerNext'
        //             },
        //             pagination:{
        //                 el: '.bannerCurrentNum',
        //                 type: 'fraction'
        //             }
        //         });

        //         if(swiper.autoplay.running){
        //             $('.btnEventBannerControl').addClass('active');
        //         }

        //         $('.btnEventBannerControl').on({
        //             click:function(e){                    
        //                 if(swiper.autoplay.running){
        //                     $(this).removeClass('active');
        //                     swiper.autoplay.stop();
        //                 }else{
        //                     $(this).addClass('active');
        //                     swiper.autoplay.start();
        //                 }

        //            } 
        //         });                
        //         $('.eventBannerControlWrap').show();
        //         $('.btnEventBannerNext').show();
        //     }
                    
        //     this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);            
            
        //     this.setScrollWidth($('.cgvMovieChartContainer > li.active h2 .hashList'), null);
        //     this.setScrollWidth($('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active .cgvMovieChartContent'), $('.btnFirstMove'));
        //     this.setScrollWidth($('.favoriteFpList'), null);
            
        //     comPopLayerShowHide('btnVideoAdMore', 'popVideoAdListWrap', 'popFogBg');
        //     $.fn.shareOpenPopupLayer = function() {
        //         popLayerFadeShowHide('btnShare', 'popShareWrap', 'popFogBg');
        //     }
            
        //     $('.favoriteFpList').favoritePlayer();            
        //     $.fn.nowTicketingOpenPopupLayer = function() {
        //         popLayerFadeShowHide('btnNowTicketing', 'popNowTicketingWrap', 'popFogBg');
        //     }            
        },
        scroll:function(){            
        },        
        resize:function(){            
        },
        click:function(e){
            
            //console.log("클릭");

        //     var _target = e.target;
            
        //     if(_target.tagName == 'A'){
        //         //e.preventDefault();
        //         if($(_target).hasClass('btnArrowUD')){   // 나만의 차트 더보기 버튼
        //             $('.comRolling').toggleClass('active');
        //             this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
        //         }else if($(_target).hasClass('btnFirstMove')){  // CGV 무비차트 처음으로 버튼                    
        //             $('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active').stop().animate({
        //                 scrollLeft:0
        //             },function(){
        //                 $('.btnFirstMove').hide();
        //             });
        //         }else if($(_target).hasClass('btnQuick')){  // 퀵메뉴
        //             if($(_target).parent().hasClass('active')){                        
        //                 quickMenu($(_target), true);
        //                 $('.quickFogBg').off('click').stop().animate({
        //                     'top':'100%'
        //                 }, 'fast', function(){});
        //             }else{
        //                 quickMenu($(_target), false);

        //                 $('.quickFogBg').stop().animate({
        //                     'top':'0%'
        //                 }, 'fast', function(){                            
        //                     $('.quickFogBg').on({
        //                         click:function(){
        //                            quickMenu($(_target), true);
        //                             $('.quickFogBg').off('click').stop().animate({
        //                                 'top':'150%'
        //                             }, 'fast', function(){});
        //                         }
        //                     });
        //                 });
        //             }
        //         }                
                
        //         if($(_target).parents('article').hasClass('cgvMovieChartWrap')){    // 나만의 차트                    
        //             if($(_target).parents('ul').hasClass('cgvMovieChartTitle')){
        //                 if(!$(_target).parent('li').hasClass('active')){                        
        //                     var _cuttentIdx = $(_target).parent('li').index();
        //                     $(_target).parent('li').addClass('active').siblings('li').removeClass('active');                            
        //                     $('.cgvMovieChartContainer > li:eq(' + _cuttentIdx + ')').addClass('active').siblings('li').removeClass('active');
        //                     this.setScrollWidth($('.cgvMovieChartContainer > li.active h2 .hashList'), null);
        //                     this.setScrollWidth($('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active .cgvMovieChartContent'), $('.btnFirstMove'));
        //                 }                                                
        //             }else if($(_target).parents('ul').hasClass('hashList')){                        
        //                 var targetIdx = $(_target).parent('li').index();
        //                 $(_target).parent('li').addClass('active').siblings('li').removeClass('active');                        
        //                 $(_target).parents('h2').next('.cgvMovieChartContents').children('li:eq(' + targetIdx + ')').addClass('active').siblings('li').removeClass('active');
        //                 this.setScrollWidth($('.cgvMovieChartContainer > li.active .cgvMovieChartContents > li.active .cgvMovieChartContent'), $('.btnFirstMove'));
        //             }
        //         }else if($(_target).parents('article').hasClass('onlyCGVSpecialHall')){    // Only CGV & 특별관
        //             if($(_target).parents('ul').hasClass('onlyCGVSpecialTitle')){
        //                 //console.log("A");
        //                 var _cuttentIdx = $(_target).parent('li').index();
        //                 $(_target).parent('li').addClass('active').siblings('li').removeClass('active');
        //                 $('.onlyCGVSpecialContainer > li:eq(' + _cuttentIdx + ')').addClass('active').siblings('li').removeClass('active');
        //             }else if($(_target).parents('ul').hasClass('hashList')){                        
        //                 var targetIdx = $(_target).parent('li').index();
        //                 $(_target).parent('li').addClass('active').siblings('li').removeClass('active');                        
        //                 $(_target).parents('h2').next('.onlyCGVSpecialContents').children('li:eq(' + targetIdx + ')').addClass('active').siblings('li').removeClass('active');
        //             }
        //         }
                
                
        //     }else if(_target.tagName == 'IMG'){
        //         if($(_target).get(0).id == 'siteMapBtn'){
        //             this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
        //         }
        //     }else{
        //         if($(_target).hasClass('fogbg') || $(_target).hasClass('btn_close')){
        //             this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
        //         }
        //     }
        }
    };
    
    $.fn.favoritePlayer = function(options){    // 좋아할만한 팬 페이지 영상 제어
        var opts = $.extend({}, $.fn.favoritePlayer.defaults, options);
        var $playBtn = $('.' + opts.playBtn);
          
        $playBtn.on({
            click:function(e){                
                var _target = $(e.target)
                var _vidContent = _target.parents('.favoriteFpVideoContent');
                var _vid = _vidContent.children('video');
                
                fnAllStop($('.videoAdContent'));
                
                _vid.on({
                    ended:function(){   //console.log('ended');                        
						_vidContent.removeClass('active');
                        cancelFullScreen(_vid);

						_vid.get(0).pause();
						_vid.get(0).currentTime = 0;
						
						//_vid.get(0).load();

			        _vid.off('ended');
                    }
                });                

                _vidContent.addClass('active');
                fullscreen(_vid.get(0), opts);
                fnPlayPromise(_vid.get(0));
            }
        });
    }

    $.fn.favoritePlayer.defaults = {    // 좋아할만한 팬 페이지 영상 Default
        'playBtn' : 'btnFavoriteFpVideoPlay'
    }
    
    function quickMenu(_target, _is){ 
        // GA Tag
        fnSendGALog('1', '', 'MW_홈', '퀵메뉴', '');        
        if(_is){
            $('.quickmenu').css({'z-index':7});
            $('.container').css({'position':'static','z-index':'0'});
            fnFixedScroll(false);
            _target.parent().removeClass('active');
            $('.quickLink').stop().animate({
                'top':'150%'
            }, 'fast', function(){});
        }else{
            $('.quickmenu').css({'z-index':10});
            $('.container').css({'position':'relative','z-index':'1'});
            fnFixedScroll(true);
            $(_target).parent().addClass('active');
            $('.quickLink').stop().animate({
                'top':'50%'
            }, 'fast', function(){});
            
        }
    }
    
    var eb;
    this._eventHandlers = {
        load:function(){

            var swiperItemLen = $(".eventBannerList").find('.swiper-slide').length;
            
            if(swiperItemLen <= 1){
                $('.eventBannerControlWrap').hide();                
                $('.btnEventBannerNext').hide();
            }else{
                var swiper = new Swiper('.eventBannerList', {                    
                    loop: true,                
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    navigation: {
                        nextEl: '.btnEventBannerNext'
                    },
                    pagination:{
                        el: '.bannerCurrentNum',
                        type: 'fraction'
                    }
                });

                if(swiper.autoplay.running){
                    $('.btnEventBannerControl').addClass('active');
                }

                $('.btnEventBannerControl').on({
                    click:function(e){                    
                        if(swiper.autoplay.running){
                            $(this).removeClass('active');
                            swiper.autoplay.stop();
                        }else{
                            $(this).addClass('active');
                            swiper.autoplay.start();
                        }

                   } 
                });                
                $('.eventBannerControlWrap').show();
                $('.btnEventBannerNext').show();
            }
            
            comPopLayerShowHide('btnBannerMore', 'popEventBannerListWrap', 'popFogBg');
            popLayerShowHide('btnFindCinemaA', 'popFavoriteCGV', 'popFogBg');
            
            var sFp = new SponsorFp('sponsorFpWrap', 'sponsorFpH1Title', 'sponsorFpH2Title', 'active', 'hasSubList');
            
            
            
            this.setScrollWidth($('.popTabTitle'), null);
            
            $('.popLayerContainer').on({
                click:function(e){
                    
                    var _target = e.target;
                    
                    if($(_target).parents('ul').hasClass('popTabTitle')){   // popTab tilte Area
                        $(_target).parent('li').addClass('active').siblings('li').removeClass('active');
                    }else{
                        if(_target.tagName == 'A'){
                            $('.btnFindCinemaA').text('극장찾기#' + $(_target).text());
                            win.setScrollWidth($('.sponsorFpH2Title'), null);
                            $('.btnPopClose').trigger('click');
							setTimeout(function() {
								evtContTitPosY();
							},600);
                        }
                    }
               }
            });
            var url = $("#iframe").attr("data-src");            
    		$("#iframe").attr("src", url);

			evtContTitFixed();

        },
        scroll:function(){

        },
        click:function(){
            /*var _target = e.target;
            
            if(_target.tagName == 'A'){
                //e.preventDefault();                
                if($(_target).hasClass('btnArrowUD')){   // 나만의 차트 더보기 버튼
                    //$('.comRolling').toggleClass('active');
                    //this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
                }else if($(_target).parents('article').hasClass('sponsorFpWrap')){  // 이벤트 카테고리 && 극장선택 포커스처리                    
                    //$(_target).parent('li').addClass('active').siblings('li').removeClass('active');
                }
            }else if(_target.tagName == 'IMG'){                
                if($(_target).get(0).id == 'siteMapBtn'){
                    //this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
                }
            }else{
                if($(_target).hasClass('fogbg') || $(_target).hasClass('btn_close')){
                    //this.myChartRolling($('.comRolling'), 'active', myChartStartIdx, isSiteMap);
                }
            }*/
        }
    };
    
    //var sb;
    this._storeHandlers = {
        load:function(){
            var swiperItemLen = $(".store_bigbanner_list").find('.swiper-slide').length;
            var swiperTargetItemLen = $(".store_targetbanner_list").find('.swiper-slide').length;

            if($(".together_view_list li").length <= 1){
                $(".together_view_list").append("<li class='comingsoon_default'><strong>상품준비중</strong><span class='com_sale_price_type1_wrap'><span class='sale_percent'>핫딜가</span><span class='store_deatail_sale_price nowon'>Coming Soon</span></span><span class='hotdeal_rest_items'>0</span></li>");
            }

            this.setScrollWidth($('.together_view_list'), null);
            
            if(swiperItemLen <= 1){
                $('.store_bigbanner .com_swiper_pagination, .store_bigbanner .swiper-button-next').hide();
            }else{               
                var swiper = new Swiper('.store_bigbanner_list', {
                    loop: true,                
                    autoplay: false,
                    pagination:{
                        el: '.com_swiper_pagination',
                        clickable: true,
                        renderBullet: function (index, className) {
                        return '<a href="#none" class="' + className + '">' + (index + 1) + '</a>';
                        },
                        // el: '.bannerCurrentNum',
                        // type: 'fraction'
                    },
                    navigation: {
                        nextEl: '.swiper-button-next'
                    },
                    a11y: {
                        nextSlideMessage: 'Next slide',
                    }
                    
                });
                $('.swiper-slide-duplicate').attr('tabindex', '-1');
                }

            if(swiperTargetItemLen <= 1){
                $('.store_targetbanner .com_swiper_target_pagination').hide();
                        }else{
                var swiper = new Swiper('.store_targetbanner_list', {
                    loop: true,
                    autoplay: false,
                    pagination:{
                        el: '.com_swiper_target_pagination',
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<a href="#none" class="' + className + '">' + (index + 1) + '</a>';
                        }
                        // el: '.bannerCurrentNum',
                        // type: 'fraction'
                   } 
                });                
                $('.swiper-slide-duplicate').attr('tabindex', '-1');
                $('.store_targetbanner .swiper-wrapper a').css({'padding-bottom':'51px', 'min-height':'174px'});
                $('.store_targetbanner .swiper-wrapper a span').css({'position':'absolute', 'top':'85px'});
            }
        }
    };
    
    this._myHandlers = {
        load:function(){            
            popLayerFadeShowHide('btnEarnPoints', 'popEarnPointsWrap', 'popFogBg');
            comPopLayer('btnVIPPoint', 'popVIPPointWrap');
             
        }
    };
    
    function comPopLayer(_btn, _popLayer){
        var $btn = $('.' + _btn);
        var $popLayer = $('.' + _popLayer);        
//        var $fogBg = (_fogBg != null)?$('.' + _fogBg):null;
//        var _isFogBg = (_fogBg != null)?$fogBg.is(':visible'):null;
        
        $btn.off('click');
        
        $btn.on({
            click:function(){
                if($btn.hasClass('btnVIPPoint') && cgv.common.StandardInfo.IsWebView && cgv.common.StandardInfo.AppVersion >= 433){ // 앱단에서 VIP선정 포인트 팝업 분리를 위한 분기
                    CGVHAAppInterface.EventBannerCall('5', encodeURIComponent('/WebAPP/MyCgvV5/descriptionVIPPoint.aspx'));
                }else{
                var _isShow = $popLayer.is(':visible');
                
                if(_isShow){
                    fnFixedScroll(false);
                }else{
                    $popLayer.show();
                    
                    $('.popLayerContainer ul').animate({
                        'padding-top':'45px'
                    }, 200);
                    
                    fnFixedScroll(true);
                    
                    $('.btnPopClose').on({
                        click:function(){
                            $('.btnPopClose').off('click');
                            fnFixedScroll(false);
                            $('.popLayerContainer ul').css({'padding-top':'150%'});
                            $popLayer.hide();
                        }
                    });
                }                
            }
            }
        });
        
        
        function popLayerBgFadeShowHide(_target, _contentTarget, _is){    // pop dim        
            if(!_is){                
                fnFixedScroll(true);
                _target.show();
                _contentTarget.show();
                _target.off('click');
                _target.on({
                    click:function(){
                        fnFixedScroll(false);
                        _target.hide();
                        _contentTarget.hide();
                    }
                });
                
                $('.btnPopClose').on({
                    click:function(e){                       
                        _target.trigger('click');
                    }
                });
            }else{
                fnFixedScroll(false);
                $('.btnPopClose').off('click');
                _target.hide();
                _contentTarget.hide();
            }
        }
    }
    
    
    $.fn.BarChart = function(options){    // 영상광고 / 영상광고 팝업 팬 페이지 영상 / 
        var opts = $.extend({}, $.fn.BarChart.defaults, options);
        var _$target = $('.' + opts.target);
        var _$bar = $('.' + opts.bar);
        var _$barCnt = $('.' + opts.barCnt);
        var _totalNum = null;
        
        var _maxValue = Math.max.apply(null, opts.datasets.data);
        
        window.setScrollWidth(_$target, null);  // 스크롤바 생성        
        _$target.parent().scrollLeft( _$target.outerWidth(true) - $(window).outerWidth(true) ); // 최근 개월로 스크롤 이동
        
        _$target.children('li').each(function(idx){
            _totalNum += opts.datasets.data[idx];
            var _barHeight = opts.datasets.data[idx]/_maxValue * 100 + '%';
            $(this).find('.' + opts.barCnt).text(opts.datasets.data[idx]);
            $(this).find('.' + opts.bar).stop().animate({
                'height': _barHeight
            });
        })
        
        return _totalNum;
    }    
    
    $.fn.BarChart.defaults = {
        'target':'barChart',
        'bar':'barChartGraph',
        'barCnt':'barChartCnt',
        'datasets':{
            'data':[1,0,2,3,4,5,6,0,12,6,8,18]
        }        
    }
    
    
        
    this.myChartRolling = function( _target, _className, _myChartStartIdx, _isSiteMap){
//        win.console.log('_isSiteMap' + _isSiteMap);        
        if(_isSiteMap){
            this.removeRolling(_target);
        }else{
            if(_target.hasClass(_className)){
                this.removeRolling(_target);
            }else{
                this.addRolling(_target, _className, _myChartStartIdx);
            }
        }
    };
    
    this.addRolling = function( _target, _className, _startIdx){
        var totalLen = _target.find('li').length;
        myChartStartIdx = _startIdx || 0;
        _target.find('li').css({'display':'block','top':'0'});
        _target.find('li').eq(myChartStartIdx).css({'top':'-48px'});
        
        this.fnRolling = function(){
            myChartStartIdx = (myChartStartIdx >= totalLen - 1)?0:(myChartStartIdx + 1);
            _target.find('li').css({'top':'0'}).eq(myChartStartIdx).css({'top':'-48px'});
        };
        
        fnPlayInterval = this.setInterval(this.fnRolling, 3000);
    };
    
    this.removeRolling = function(_target){
//        win.console.log('stop');
        _target.css({'height':'auto'});
        _target.find('li').css({'display':'block', 'top':'-48px'});
        this.clearInterval(fnPlayInterval);
    }
    
    this.setScrollWidth = function(_target, _btnL){        
        try{
            var _width = 0;
            var _totalWidth;

            var _targetParentPL = Number(_target.css('padding-left').replace('px', ''));
            var _targetParentPR = Number(_target.css('padding-right').replace('px', ''));

            _target.find('> li').each(function(){
                _width = $(this).outerWidth(true) + _width;
            });      
            if($(win).width() < Math.ceil(_targetParentPL + _width + _targetParentPR)){
                _totalWidth = Math.ceil(_targetParentPL + _width + _targetParentPR) + 'px';               
            }else{
                _totalWidth = '100.1%'; // 앱에서 컨텐츠가 100% 미만일때 바운스 되게 처리하기 위해 스크롤바 생성을 위해 0.1 % 줌
            }
            
            _target.css({'width':_totalWidth});
            

            if( _btnL != null){
                (_target.parent().scrollLeft() <= 0)?_btnL.hide():_btnL.show();
                _target.parent().on({                
                    scroll:function(){
                        ($(this).scrollLeft() <= 0)?_btnL.hide():_btnL.show()
                    }
                });
            }            
        }catch(e){
            //win.console.log('error');
        }
    };
    
    function popLayerShowHide(_btn, _popLayer, _fogBg){
        var $btn = $('.' + _btn);
        var $popLayer = $('.' + _popLayer);
        var $fogBg = $('.' + _fogBg);
        var _isFogBg = $fogBg.is(':visible');
        $btn.off('click');
        $btn.on({
            click:function(){
                $('.popLayer').insertBefore('footer'); // header fixed로 팝업 생성시 동적으로 'class' wrap의 자식노드에서 wrap의 형제노드로 변경
            
                if(_btn == 'btnVideoAdMore'){
                    var $videoAd = $('article.videoAdWrap video');
                    
                    if(!$videoAd.get(0).paused){    // 영상광고 영역 재생시 초기화
			$videoAd.children('source').attr('src', '');
			$videoAd.attr('src', '');
			$videoAd.attr('poster', $videoAd.attr('poster'));
			$videoAd.off('ended');
                    }
                    
                    $('.popVideoAdListWrap .popLayerHeader').addClass('active');
                    fnAllStop($('.videoAdContent'));
                    // 홈 영상광고영역 더보기 열릴때 팝업예외처리( 기존 재생되는 동영상 Paused )
                }
            
                popLayerBgShowHide($fogBg, $popLayer, _isFogBg);
                
                
            }
        });
    }
    
    function popLayerBgShowHide(_target, _contentTarget, _is){    // pop dim        
        if(!_is){
            fnFixedScroll(true);
            _target.off('click');
            _contentTarget.stop().animate({'bottom':'0'},200);            
            _target.show().on({
                click:function(){
                    _contentTarget.stop().animate({'bottom':'-150%'}, 200, function(){
                        fnFixedScroll(false);                        
                        $('.btnPopClose').off('click');
                        _target.hide();    
                    });                    
                }
            }, function(){
                _target.off('click');
            });            
           
            $('.btnPopClose').on({
                click:function(e){
                    if($('.popVideoAdListWrap .popLayerHeader').hasClass('active')){ $('.popVideoAdListWrap .popLayerHeader').removeClass('active');}
                    if($('.popEventBannerListWrap .popLayerHeader').hasClass('active')){ $('.popEventBannerListWrap .popLayerHeader').removeClass('active');}
                    if($(e.target).parents().hasClass('popVideoAdListWrap')){ fnAllStop($('.videoAdContent')); } // 홈 영상광고영역 더보기 닫힐때 팝업 예외처리( 기존 재생되는 동영상 Paused )
                    _target.trigger('click');
                }  
            });
        }else{
            _contentTarget.stop().animate({'bottom':'-150%'}, 200, function(){                
                fnFixedScroll(false);
                $('.btnPopClose').off('click');
                _target.hide();
            });
        }
    }
    
    function comPopLayerShowHide(_btn, _popLayer, _fogBg){
        var $btn = $('.' + _btn);
        var $popLayer = $('.' + _popLayer);
        var $fogBg = $('.' + _fogBg);
        var _isFogBg = $fogBg.is(':visible');
        $btn.off('click');
        $btn.on({
            click:function(){
                $('.popLayer').insertBefore('footer'); // header fixed로 팝업 생성시 동적으로 'class' wrap의 자식노드에서 wrap의 형제노드로 변경
            
                if (_btn === 'btnVideoAdMore') {
                    if (cgv.common.StandardInfo.IsWebView && cgv.common.StandardInfo.AppVersion >= 433) { // 앱일 때 새로운 페이지로 분기
                        CGVHAAppInterface.EventBannerCall('5', encodeURIComponent('/WebAPP/MainV5/advertisementList.aspx'));
                    } else {
                    var $videoAd = $('article.videoAdWrap video');
                                        
                    if(!$videoAd.get(0).paused){    // 영상광고 영역 재생시 초기화                        
                        $videoAd.children('source').attr('src', '');
                        $videoAd.attr('src', '');
                        $videoAd.attr('poster', $videoAd.attr('poster'));
                        $videoAd.off('ended');
                    }                    
                    
                    fnAllStop($('.videoAdContent'));
                    // 홈 영상광고영역 더보기 열릴때 팝업예외처리( 기존 재생되는 동영상 Paused )

                        comPopLayerBgShowHide($fogBg, $popLayer, _isFogBg, _btn);
                    }
                }
                else if (_btn === 'btnBannerMore') {
                    if (cgv.common.StandardInfo.IsWebView && cgv.common.StandardInfo.AppVersion >= 433) { // 앱일 때 새로운 페이지로 분기
                        CGVHAAppInterface.EventBannerCall('5', encodeURIComponent('/WebAPP/EventNotiV4/eventBannerList.aspx'));
                    }else {
                        comPopLayerBgShowHide($fogBg, $popLayer, _isFogBg, _btn);
	                }
                }
                else {
                comPopLayerBgShowHide($fogBg, $popLayer, _isFogBg, _btn);
                }
            }
        });
    }
    
    function comPopLayerBgShowHide(_target, _contentTarget, _is, _btn){    // pop dim
        if(!_is){
            fnFixedScroll(true);
            if(!(_btn == 'btnVideoAdMore' || _btn == 'btnBannerMore')){
                $('.popVideoAdListWrap').removeClass('bgDim');
                $('html, body').css({'height':'auto'});
                fnFixedScroll(true);
            }else{

                $('.popVideoAdListWrap').addClass('bgDim');
                $('html, body').css({'height':'100%'});

		$('.popVideoAdListWrap .videoAdWrap').scroll(function() {
			fnScrChkVideoStop($(this));
		})
            }
            _target.css({'opacity':'0.8'}).off('click');
            _contentTarget.stop().animate({'top':'0'},200);
            _contentTarget.find('.btnPopClose').show();
            _target.show().on({
                click:function(){                    
                    _contentTarget.stop().animate({'top':'150%'}, 200, function(){
                        if(!(_btn == 'btnVideoAdMore' || _btn == 'btnBannerMore')){
                            $('.popVideoAdListWrap').addClass('bgDim');
                            $('html, body').css({'height':'100%'});
                            fnFixedScroll(false);
                        }else{
                            $('.popVideoAdListWrap').removeClass('bgDim');
                            $('html, body').css({'height':'auto'});
                        }
                        _contentTarget.find('.btnPopClose').off('click');
                        _target.css({'opacity':'0.5'}).hide();
                        _contentTarget.find('.btnPopClose').hide();
                    });                    
                }
            }, function(){
                _target.css({'opacity':'0.5'}).off('click');
            });            
           
            _contentTarget.find('.btnPopClose').on({
                click:function(e){
                    fnFixedScroll(false);
                    if($('.popVideoAdListWrap .popLayerHeader').hasClass('active')){ $('.popVideoAdListWrap .popLayerHeader').removeClass('active');}
                    if($('.popEventBannerListWrap .popLayerHeader').hasClass('active')){ $('.popEventBannerListWrap .popLayerHeader').removeClass('active');}
                    if($(e.target).parents().hasClass('popVideoAdListWrap')){ fnAllStop($('.videoAdContent')); } // 홈 영상광고영역 더보기 닫힐때 팝업 예외처리( 기존 재생되는 동영상 Paused )
                    _target.trigger('click');
                }  
            });
        }else{
            fnFixedScroll(false);
            _contentTarget.stop().animate({'top':'0'}, 200, function(){                
                if(!(_btn == 'btnVideoAdMore' || _btn == 'btnBannerMore')){
                    $('.popVideoAdListWrap').addClass('bgDim');
                    $('html, body').css({'height':'100%'});
                    fnFixedScroll(false);
                }else{
                    $('.popVideoAdListWrap').removeClass('bgDim');
                    $('html, body').css({'height':'auto'});
                }                
                _contentTarget.find('.btnPopClose').off('click');
                _target.css({'opacity':'0.5'}).hide();
                _contentTarget.find('.btnPopClose').hide();
            });
        }
    }
    
    
    var currentScroll; 
    
    function fnFixedScroll(_is){ 
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
            $(win).on({
                scroll:function(){
                    onHomeScroll();
                    if(screenId == 'HOME'){
                        fnMainScroll();
                    }else if(screenId == 'EVENT'){
                        fnEventScroll();
                    }
                }
            });

			if(screenId == 'EVENT'){
				evtContTitFixed();
			}
        }   
    }
        
    function popLayerFadeShowHide(_btn, _popLayer, _fogBg){
        var $btn = $('.' + _btn);
        var $popLayer = $('.' + _popLayer);
        var $fogBg = $('.' + _fogBg);
        var _isFogBg = $fogBg.is(':visible');
        $btn.off('click');
        if( _btn == 'btnShare'){            
            $('.popLayer').insertBefore('footer'); // header fixed로 팝업 생성시 동적으로 'class' wrap의 자식노드에서 wrap의 형제노드로 변경
            popLayerBgFadeShowHide($fogBg, $popLayer, _isFogBg);
            /*$('.sponsorFpVideo').on({
                click:function(e){
                    if(e.target.tagName == 'A' && $(e.target).hasClass(_btn)){
                        $('.popLayer').insertBefore('footer'); // header fixed로 팝업 생성시 동적으로 'class' wrap의 자식노드에서 wrap의 형제노드로 변경
                        popLayerBgFadeShowHide($fogBg, $popLayer, _isFogBg);
                    }
                } 
            });*/
        }else if( _btn == 'btnNowTicketing'){   // 개발에서 핸들링 할수 있도록 클릭 이벤트 삭제......
            $('.popLayer').insertBefore('footer'); // header fixed로 팝업 생성시 동적으로 'class' wrap의 자식노드에서 wrap의 형제노드로 변경
            popLayerBgFadeShowHide($fogBg, $popLayer, _isFogBg);
            /*$('.sponsorFpVideoWrap, .etcFpWrap').on({
                click:function(e){                    
                    if(e.target.tagName == 'SPAN' && $(e.target).parent().hasClass(_btn)){
                        
                            
                        
                    }
                } 
            });*/
        }else{
            $btn.on({
                click:function(){
                    $('.popLayer').insertBefore('footer'); // header fixed로 팝업 생성시 동적으로 'class' wrap의 자식노드에서 wrap의 형제노드로 변경
                    popLayerBgFadeShowHide($fogBg, $popLayer, _isFogBg);
                }
            });
        }
        
        function popLayerBgFadeShowHide(_target, _contentTarget, _is){    // pop dim        
            if(!_is){                
                fnFixedScroll(true);
                _target.show();
                _contentTarget.show();
                _target.off('click');
                _target.on({
                    click:function(){
                        fnFixedScroll(false);
                        _target.hide();
                        _contentTarget.hide();
                    }
                });
                
                $('.btnPopClose').on({
                    click:function(){                       
                        _target.trigger('click');
                    }
                });
            }else{
                fnFixedScroll(false);
                $('.btnPopClose').off('click');
                _target.hide();
                _contentTarget.hide();
            }
        }
    }
    
    this.SponsorFp = function( _sFpClassName , _tabDepth0, _tabDepth1, _activeClassName, _hasSubList){        
        
        var _target = this;        
        var isHasSubList;
        
        _target.$sFpClassName = $('.' + _sFpClassName);
        _target.$tabDepth0ClassName = $('.' + _tabDepth0);
        _target.$tabDepth1ClassName = $('.' + _tabDepth1);
        _target.activeClassName = _activeClassName;
        _target.hasSubList = _hasSubList;
        
        _target.init = function(){ 
			
            win.setScrollWidth(_target.$tabDepth0ClassName ,null);
            isHasSubList = _target.$tabDepth0ClassName.find('li.' + _target.activeClassName).children('a').hasClass(_target.hasSubList)
            if(isHasSubList){
                _target.$tabDepth1ClassName.parent().show();
                win.setScrollWidth(_target.$tabDepth1ClassName ,null);
            }else{
                _target.$tabDepth1ClassName.parent().hide();
            }

        }
        
        _target.$tabDepth0ClassName.on({
            click:function(e){
                if(e.target.tagName == 'A'){
                    e.preventDefault();                    
                    var _currentIdx = $(e.target).parent('li').index();
                    var _totalWidth = _target.$tabDepth0ClassName.outerWidth(true);
                    var _currentWidth = null;

                    $(e.target).parent('li').addClass('active').siblings('li').removeClass('active');

                    _target.$tabDepth0ClassName.children('li').each(function(idx){
                        if(idx <= _currentIdx){
                            _currentWidth += Math.floor($(this).outerWidth(true));
                        }
                    });

                    if($(window).outerWidth(true) < _totalWidth){
                        var _scrollMoveX
                        if(_target.$tabDepth0ClassName.children('li').length - 1 == _currentIdx){
                            _scrollMoveX = _totalWidth - $(window).outerWidth();
                        }else{
                            _scrollMoveX = (_totalWidth - $(window).outerWidth()) * _currentWidth / _totalWidth - 12;
                        }

                        _target.$tabDepth0ClassName.parent().stop().animate({
                            'scrollLeft': _scrollMoveX
                        });
                    }      

                    if($(e.target).hasClass(_target.hasSubList)){
                        _target.$tabDepth1ClassName.parent().slideDown(function(){
                            win.setScrollWidth(_target.$tabDepth1ClassName ,null);
                        }).addClass('on');                    
                    }else{
                        _target.$tabDepth1ClassName.parent().slideUp().removeClass('on');
                    }

					evtContTitPosY();

                }
            }
        });
        
        
        _target.$tabDepth1ClassName.on({
            click:function(e){
                $(e.target).parent('li').addClass('active').siblings('li').removeClass('active');
				if(!$(e.target).hasClass('btnFindCinemaA')) {
					evtContTitPosY();
				}
            }
        });
        
        _target.init();
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

//        console.log(_day + ":" + _prevDay, _hour + ":" + _prevHour, _min + ":" + _prevMin, _sec + ":" + _prevSec);

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
    $.dDaySet = function(){
        var interval;
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
                if(cntObj[i].time <= 0){
                    // cntObj[i].visible = false;
                    // $('#' + cntObj[i].target).parent().parent().remove();
                    // this.setScrollWidth($('.together_view_list'), null);
                    
                    clearInterval(interval);
                    fnReloadDealList();
                }
            }
        }

        function initSetDisplayCnt(_target){
            
             var $target;
             var cntLen = _target.length;
            
             for(var i = 0; i < cntLen; i++){
                 $target = $("#" + cntObj[i].target);

                 /* S 남은 수량 */
                 var $hotdealRestItems = $target.children('.hotdeal_rest_items');
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
        (opts.bgDim)? $(spinner).addClass('dim'):$(spinner).removeClass('dim');            
    }

    $.fn.stopLoading = function(){
        if(spinner != null){
            spinner.remove();
            spinner = null;
        }
    }
    
    $.fn.startLoading.defaults = {
        bgDim: true,            // custom dim
        lines: 12,              // The number of lines to draw
        length: 4,              // The length of each line
        width: 3,               // The line thickness
        radius: 8,              // The radius of the inner circle
        scale: 1,               // Scales overall size of the spinner
        corners: 0.5,           // Corner roundness (0..1)
        color: '#000',          // #rgb or #rrggbb or array of colors
        opacity: 0.3,           // Opacity of the lines
        rotate: 0,              // The rotation offset
        direction: 1,           // 1: clockwise, -1: counterclockwise
        speed: 1,               // Rounds per second
        trail: 40,              // Afterglow percentage
        fps: 20,                // Frames per second when using setTimeout() as a fallback for CSS
        zIndex: 2e9,            // The z-index (defaults to 2000000000)
        className: 'spinner',   // The CSS class to assign to the spinner
        top: '50%',             // Top position relative to parent
        left: '50%',            // Left position relative to parent
        shadow: false,          // Whether to render a shadow
        hwaccel: false,         // Whether to use hardware acceleration
        position: 'fixed'    // Element positioning
    }
/* E SPIN */
    
    $(this).on(this._commonHandlers);
    
    switch( screenId ){
        case 'HOME':        $(this).on(this._homeHandlers); break;
        case 'MOVIEINFO':   $(this).on(this._movieInfoHandlers); break;
        case 'FASTORDER':   $(this).on(this._fastorderHandlers); break;
        case 'EVENT':       $(this).on(this._eventHandlers); break;
        case 'STORE':       $(this).on(this._storeHandlers); break;
        case 'MY':          $(this).on(this._myHandlers); break;
        default : break;
    }

})(jQuery);