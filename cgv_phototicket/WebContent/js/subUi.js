(function ($) {
    var win = this;


    this._commonHandlers = {
        load: function () {
            $('.btnTop').on({
                click: function (e) {
                    e.preventDefault();
                    $('html').stop().animate({ scrollTop: '0' });
                }
            });

            win.oncontextmenu = function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            };
        },
        scroll: function () {
            if (cgv.common.StandardInfo.IsWebView == true &&  screenId =="MW002") {
                //[CGV 모바일 기능개선] WebView 이고 빠른예매 화면이면 위로가기 안보이기
            }else{
                var _scrollTop = $(this).scrollTop();
                if (_scrollTop > 0) {
                    $('.btnTop').show();
                } else {
                    $('.btnTop').hide();
                }
            }
        }
    }

    this._STORE002 = {    // 스토어 > 이용안내
        load:function(){
            $('.com_tab').on({
                click:function(e){
                    e.preventDefault();

                    var _target = e.target;
                    var _idx = $(_target).parents('li').index();
                    $('.com_tab > li:eq(' + _idx + ')').addClass('active').siblings('li').removeClass('active');
                    $('.com_tab_content > li:eq(' + _idx + ')').addClass('active').siblings('li').removeClass('active');
                }
            })
        }
    }

    this._STORE101 = {    // 스토어 > 상품 > 카테고리별 상품 목록
        load:function(){
            this.setScrollWidth_store($('.com_tab_style0_title'), null);
            setInitScrollPosition();

            $('.com_tab_style0_title').on({ // tabMenu click
                click:function(e){
                    e.preventDefault();
                    var _target = e.target;
                    var _currentTarget = e.currentTarget;
                    var _totalWidth = $(_currentTarget).outerWidth(true);
                    var _currentIdx = $(_target).parent('li').index();
                    var _currentWidth = null;
                    var _totalML = null;

                    var _targetPL = Number($(_currentTarget).css('padding-left').replace('px', ''));
                    var _targetPR = Number($(_currentTarget).css('padding-right').replace('px', ''));

                    if(_target.tagName == 'A'){
                        $(_target).parent('li').addClass('active').siblings('li').removeClass('active');

                        $(_currentTarget).children('li').each(function(idx){
                            _totalML += Number($(this).css('margin-right').replace('px', ''));
                            if(idx <= _currentIdx){
                                _currentWidth += Math.floor($(this).outerWidth());
                            }
                        });

                        var _scrollMoveX;
                        if($('.com_tab_style0_close_wrap').prev('h1').hasClass('state_open')){
                            $('.com_tab_style0').removeClass('active');
                            $('.com_tab_style0_close_wrap').prev('h1').removeClass('state_open');
                            $('.com_tab_style0_close_wrap').css({'top':'0'});
                            window.setScrollWidth_store($('.com_tab_style0_title'), null);
                            _totalWidth = window.setScrollWidth_store($('.com_tab_style0_title'), null);

                            if(_currentIdx != 0){
                                _scrollMoveX = _currentWidth / (_totalWidth - _totalML - 96) * (_totalWidth - $(window).outerWidth(true));
                            }else{
                                _scrollMoveX = 0;
                            }

                            $('.com_tab_style0_close_wrap').prev('h1').scrollLeft(_scrollMoveX);
                        }else{
                            if($(window).outerWidth(true) < _totalWidth){
                                if(_currentIdx != 0){
                                    _scrollMoveX = _currentWidth / (_totalWidth - _totalML - _targetPL - _targetPR) * (_totalWidth - $(window).outerWidth(true));
                                }else{
                                    _scrollMoveX = 0;
                                }

                                $(_currentTarget).parent().stop().animate({
                                    'scrollLeft': _scrollMoveX
                                });
                            }
                        }
                    }
                }
            });

            $('.com_tab_style0_close_wrap').on({    // 더보기
                click:function(e){
                    e.preventDefault();

                    var _target = e.target;
                    var _currentTarget = e.currentTarget;

                    if(_target.tagName == 'A'){
                        $(_currentTarget).prev('h1').toggleClass('state_open');

                        if($(_currentTarget).prev('h1').hasClass('state_open')){ // 펼치기
                            $('.com_tab_style0').addClass('active');
                            var titleH = $('.com_tab_style0_title').outerHeight();
                            $('.com_tab_style0_title').css({'width':'auto'});
                            $('.com_tab_style0_close_wrap').css({'top':titleH + 'px'});
                        }else{  // 닫기
                            $('.com_tab_style0').removeClass('active');
                            $('.com_tab_style0_title').css({'width':_totalWidth});
                            $('.com_tab_style0_close_wrap').css({'top':'0'});
                            setInitScrollPosition();
                        }
                    }
                }
            });

            function setInitScrollPosition(){
                var initTotalWidth = $('.com_tab_style0_title').outerWidth(true);
                var initFocus = $('.com_tab_style0 li.active').index();

                var initTargetPL = Number($('.com_tab_style0_title').css('padding-left').replace('px', ''));
                var initTargetPR = Number($('.com_tab_style0_title').css('padding-right').replace('px', ''));

                if(initFocus != 0){
                    var initCurrentWidth = null;
                    var initTotalML = null;

                    $('.com_tab_style0_title').children('li').each(function(idx){
                        initTotalML += Number($(this).css('margin-right').replace('px', ''));
                        if(idx <= initFocus){
                            initCurrentWidth += Math.floor($('.com_tab_style0 li:eq('+ idx +')').outerWidth());
                        }
                    });
                    initSscrollMoveX = initCurrentWidth / (initTotalWidth - initTotalML - initTargetPL - initTargetPR) * (initTotalWidth - $(window).outerWidth(true));
                }else{
                    initSscrollMoveX = 0;
                }

                $('.com_tab_style0_title').parent().scrollLeft(initSscrollMoveX);
            }

        },
        scroll:function(){
            //console.log($('.com_tab_style0_title').parent().scrollLeft());
            var _scrollTop = $(this).scrollTop();
            var $headerH = $('#header_box').outerHeight() || 0;

            if(_scrollTop >= $headerH){
                $('.com_tab_style0').addClass('com_tab_style0_fixed');
            }else{
                $('.com_tab_style0').removeClass('com_tab_style0_fixed');
            }
        },
        resize:function(){
            this.setScrollWidth_store($('.com_tab_style0_title'), null);
        }
    }

    this._STORE102 = {    // 스토어 > 상품 > 카테고리별 상품 목록 > 상품 상세
        load:function(){
            var swiperItemLen = $(".com_swipe_list").find('.swiper-slide').length;

            this.setScrollWidth($('.together_view_list'), null);

            if(swiperItemLen <= 1){
                //$('.eventBannerControlWrap').hide();
            }else{
                var swiper = new Swiper('.com_swipe_list', {
                    loop: true,
                    autoplay: false,
                    pagination:{
                        el: '.com_swiper_pagination',
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<a href="#nono" class="' + className + '">' + '</span>';
                        },
                        // el: '.bannerCurrentNum',
                        // type: 'fraction'
                    }
                });
            }
            $('.com_custom_selectbox_btn').on({
                click:function(e){
                    var $currentTarget = $(e.currentTarget);

                    if($currentTarget.parents('.com_custom_selectbox_wrap').hasClass('active')){
                        $currentTarget.parents('.com_custom_selectbox_wrap').find('dd').slideUp('fast', function(){
                            $currentTarget.parents('.com_custom_selectbox_wrap').removeClass('active');
                        });
                    }else{
                        $currentTarget.parents('.com_custom_selectbox_wrap').find('dd').slideDown('fast',function(){
                            $currentTarget.parents('.com_custom_selectbox_wrap').addClass('active');
                        });
                    }

                }
            });

        }
    }

    this._STORE103 = {    // 스토어 > 장바구니 > 장바구니 상품 목록
        load:function(){
            $('.cart_allchecker_wrap .com_checkbox_type0').on({
                click:function(e){
                    var $target =  $(e.target);
                    var $parent = $target.parents('.cart_allchecker_wrap');
                    var $list = $parent.siblings('.com_list_style1');
                    var _listTotalLen = $list.find('.com_checkbox_type0').length;

                    if($target.is(':checked')){
                        $parent.find('a span').show().text(_listTotalLen);
                        $list.find('.com_checkbox_type0').prop('checked', true);
                    }else{
                        $parent.find('a span').hide().text('0');
                        $list.find('.com_checkbox_type0').prop('checked', false);
                    }
                }
            });

            $('.com_list_style1').on({
                click:function(e){
                    var $target = $(e.target);

                    switch( $target.get(0).tagName){
                        case 'INPUT':
                            var _listTotalLen = $(this).find('.com_checkbox_type0').length;
                            var _listLen = $(this).find('.com_checkbox_type0:checked').length;

//                            console.log(_listLen)
                            if(_listLen > 0){
                                $(this).prev('.cart_allchecker_wrap').find('a span').show().text(_listLen);
                                if(_listTotalLen == _listLen){
                                    $(this).prev('.cart_allchecker_wrap').find('.com_checkbox_type0').prop('checked', true);
                                }else{
                                    $(this).prev('.cart_allchecker_wrap').find('.com_checkbox_type0').prop('checked', false);
                                }
                            }else{
                                $(this).prev('.cart_allchecker_wrap').find('.com_checkbox_type0').prop('checked', false);
                                $(this).prev('.cart_allchecker_wrap').find('a span').hide().text(_listLen);
                            }

                            break;
                        case 'A':
                            if(!$target.parents('li').hasClass('disabled')){
                                if($target.hasClass('com_custom_select')){
                                    if($target.parent().siblings('.com_custom_checkbox_wrap').is(':hidden')){
                                        $target.parent().siblings('.com_custom_checkbox_wrap').slideDown('fast',function(){
                                            $target.addClass('active');
                                        });
                                    }else{
                                        $target.parent().siblings('.com_custom_checkbox_wrap').slideUp('fast',function(){
                                            $target.removeClass('active');
                                        });
                                    }
                                }else if($target.hasClass('com_btn_cancel')){
                                    $target.parent().parent('.com_custom_checkbox_wrap').slideUp('fast',function(){
                                        $target.parent().parent().parent().find('.com_custom_select').removeClass('active');
                                    });
                                }
                            }else{
                                if($target.parent('div').hasClass('product_info_wrap')){
                                    e.preventDefault();
                                }else{
                                }
                            }
                            break;
                        default :
                            return;
                            break;
                    }
                }
            });
        }
    }

    this._STORE106 = {    // 스토어 > 선물하기 > 결제하기 > [공통]결제정보 입력
        load:function(){
            $('.content_wrap').css({'min-height':'auto'});

            $.fn.comMultiCheckboxChecker('store_agree_wrap', 'com_all_checker', 'com_all_particle_checker');

            $.setCreditcard = function( _this ){
                var _target = _this;
                var $target = $(_target);
                var _className = _target.className
                var $srcTarget = $('.store_creditcard_wrap li:first-child');

                $srcTarget.attr('class','').addClass('active ' + _className);
                $srcTarget.find('a').text($target.text());
                $('.icon_kakaopay').parent('li').removeClass('active').children('p').hide();

                $('input[type="checkbox"]').trigger('change');
                $.fn.comPopupLayer(false, 'pop_creditcard', '0.8');
                $('.spriteCards a').focus();

            }

            $('.store_creditcard_wrap').on({
                click:function(e){
                    var _target = e.target;
                    var $target = $(_target);
                    var _tagName = _target.tagName;

                    if( _tagName == "A"){
                        var isAllChecker = $('.com_all_checker').is(':checked');

                        if($target.hasClass('icon_kakaopay')){

                            $target.next().slideToggle('100', function(){
                                if($target.next().is(':hidden')){
                                    $target.parent().removeClass('active');
                                }else{
                                    $target.parent().prev().attr({'class':''}).children('a').text('신용카드');
                                    $target.parent().addClass('active').siblings('li').removeClass('active');
                                }
                                var isCard = $(e.currentTarget).find('li').hasClass('active');

                                if(isAllChecker && isCard){
                                    $('.com_btn_fixed_type2 > a').addClass('active');
                                }else{
                                    $('.com_btn_fixed_type2 > a').removeClass('active');
                                }
                            });
                        }else{
                        }
                    }
                }
            });

            $('input[type="checkbox"]').on({
                change:function(e){
                    var isAllChecker = $('.com_all_checker').is(':checked');
                    var isCard = $('.store_creditcard_wrap li').hasClass('active');

                    if(isAllChecker && isCard){
                        $('.com_btn_fixed_type2 > a').addClass('active');
                    }else{
                        $('.com_btn_fixed_type2 > a').removeClass('active');
                    }

                }
            });
        }
    }


    this._STORE201 = {    // 스토어 > 내 기프트콘 > 목록
        load:function(){
            popLayerShowHide("btnLayerPop", "popCoupon", "popFogBg");
//            popLayerHasTopShowHide('btnComCGVReg', 'popComCGVReg', 'popFogBg');
            setDate();
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

    this._STOREP202 = {    // 스토어 > 내 기프트콘 > 목록 > 기프트콘 상세 > [popup]환불정보입력
        load:function(){
            $('.content_wrap').css({'min-height':'auto'});

            $.fn.comMultiCheckboxChecker('store_agree_wrap', 'com_all_checker', 'com_all_particle_checker');

            $.setBank = function( _this ){
                var _target = _this;
                var $target = $(_target);
                var $srcTarget = $('.btn_bank_select');

                $srcTarget.text($target.text());
                $srcTarget.attr('data-bank-code', $target.data('bankCode'));

                $.fn.comPopupLayer(false, 'pop_creditcard', '0.8');
            }

            // $('.btn_bank_select').on({
            //     click:function(e){
            //         var _target = e.target;
            //         var $target = $(_target);
            //         var _tagName = _target.tagName;
            //         if( _tagName == "A"){
            //             if($target.hasClass('icon_kakaopay')){
            //                 $target.next().slideToggle(function(){
            //                     if($target.next().is(':hidden')){
            //                         $target.parent().removeClass('active');
            //                     }else{
            //                         $target.parent().addClass('active').siblings('li').removeClass('active');
            //                     }
            //                 });
            //             }else{
            //                 $target.parent().siblings('li').removeClass('active').children('p').hide();
            //             }
            //         }
            //     }
            // });
        }
    }

    this._STORE204 = {    // 스토어 > 결제내역 > 목록
        load: function () {
            var setIdx = $('.cPHistoryTitle li.active').index();
            var popTarget;

            switch(setIdx){
                case 0:
                    popTarget = 'popMovieBooking'
                    $('.comCGVWrap1').eq(setIdx).show();
                    break;
                case 1:
                    popTarget = 'popTicketPopcornStore'
                    $('.comCGVWrap1').eq(setIdx).show();
                    break;
                default: break;
            }
            popLayerShowHide("btnLayerPop", popTarget, "popFogBg");
            setDate();
            $('.cPHistoryTitle').on({
                click:function(e){
                    var _target = e.target;

                    if(_target.tagName == 'A'){

                        setIdx = $(_target).parent('li').index()
                        $(_target).parent('li').addClass('active').siblings('li').removeClass('active');
                        $('.comCGVWrap1').hide().eq(setIdx).show();

                        switch(setIdx){
                            case 0:
                                popTarget = 'popMovieBooking'
                                $('.comCGVWrap1').eq(setIdx).show();
                                break;
                            case 1:
                                popTarget = 'popTicketPopcornStore'
                                $('.comCGVWrap1').eq(setIdx).show();
                                break;
                            default: break;
                        }
                        popLayerShowHide("btnLayerPop", popTarget, "popFogBg");
                    }

                }
            });

            $('.popLayerContainer').on({
                click:function(e){
                    var _target = e.target;
                    var _currentTarget = e.currentTarget;

                    if(_target.tagName == 'A'){
                        $(_target).parent('dd').addClass('active').siblings('dd').removeClass('active');

                        if ($(_target).parents('dl').hasClass('ctlDatepickerLayer')) {
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

            $('.btnPopConfirm').on({
                click:function(){
                    $('.popLayerFooter').off('focusout');
                    $('.btnPopClose').off('focusout');

                    $('.popLayerContainer').find('.active').each(function(idx){
                        var _value = $(this).children().text();
                        $('.btnLayerPop span:eq(' + idx + ')').text(_value);
                    });
                    setTimeout(function(){
                        $('.btnLayerPop').focus();
                    }, 0);

                }
            });

            function setDate(obj, obj1) {
                var _numPreDay = obj1 && typeof obj1.attr("data-day") != "undefined" ? obj1.attr("data-day") : -7;
                var _today = win.moment().format('YYYY-MM-DD');
                var _prevMovieDay = win.moment().add(_numPreDay, 'days').format('YYYY-MM-DD');

                obj = "" || $('.popLayerContainerMovie');
                obj.find('span:first-child').children('input[type="date"]').val(_prevMovieDay);
                obj.find('span:last-child').children('input[type="date"]').val(_today);

                var _numPreMonth = obj1 ? ("-" + obj1.text().replace("개월", "")) : -1;
                var _prevPopcornDay = win.moment().add(_numPreMonth, 'months').format('YYYY-MM-DD');

                obj = "" || $('.popLayerContainerPopcorn');
                obj.find('span:first-child').children('input[type="date"]').val(_prevPopcornDay);
                obj.find('span:last-child').children('input[type="date"]').val(_today);
            }
        }
    }

    this._STORE301 = {    // 스토어 > 선물거절 정보입력
        load:function(){
            $('.content_wrap').css({'min-height':'auto'});

            $('input[type="tel"]').get(0).addEventListener('input', function(){
                var _txtLen = $(this).val().length;
                var _txtVal;

                if(_txtLen >= 3){
                    _txtVal = $(this).val().substr(0,3);

                    switch(_txtVal){
                        case '010':
                            $(this).attr('maxlength', '11');
                            (_txtLen == 11)?$(this).next().removeClass('dim'):$(this).next().addClass('dim')
                            break;
                        case '011':
                            $(this).attr('maxlength', '10');
                            (_txtLen == 10)?$(this).next().removeClass('dim'):$(this).next().addClass('dim')
                            break;
                        default : $(this).attr('maxlength', '11').next().addClass('dim');
                            break;
                    }
                }
            });

            $('input[type="text"]').get(0).addEventListener('input', function(){
                var _txtLen = $(this).val().length;
                var _checked = $('.com_checkbox_type0').is(':checked');

                if(_txtLen >= 6 && _checked){
                    $('.com_btn_fixed_type2').removeClass('dim');
                }else{
                    $('.com_btn_fixed_type2').addClass('dim');
                }
            });

            $('.com_checkbox_type0').on({
                change:function(){
                    var _txtLen = $('input[type="text"]').val().length;
                    var _checked = $('.com_checkbox_type0').is(':checked');

                    if(_txtLen >= 6 && _checked){
                        $('.com_btn_fixed_type2').removeClass('dim');
                    }else{
                        $('.com_btn_fixed_type2').addClass('dim');
                    }
                }
            });
        }
    }

    this._STORE302 = {    // 스토어 > 선물거절 정보입력 > 확인 및 완료
        load:function(){
            $('body').css({'background-color':'#fff'});
            $('.content_wrap').css({'min-height':'auto'});
        }
    }

    this._MY002 = {    // 프로필 설정
        load: function () {

            $('.btnEditProfile').on({
                click: function () {
                    $('.btnProfileWrap').addClass('profileModeEdit');
                }
            });

            $('.btnEditProfileSave').on({
                click: function () {
                    $('.btnProfileWrap').removeClass('profileModeEdit');
                }
            });


            $('.btnProfileWrap input[type="text"]').on({
                focusout: function (e) {
                    var _target = e.target;
                    var _txt = $(_target).val();
                    $('.txtNickName').text(_txt);
                }
            });
        }
    }


    this._MY004 = {    // CJ ONE포인트
        load: function () {
            popLayerShowHide("btnLayerPop", "popCjOnePoint", "popFogBg");
            setDate();

            $('.popLayerContainer').on({
                click: function (e) {

                    var _target = e.target;
                    var _currentTarget = e.currentTarget;

                    if (_target.tagName == 'A') {
                        $(_target).parent('dd').addClass('active').siblings('dd').removeClass('active');

                        if ($(_target).parents('dl').hasClass('popContentType3')) {
                            if ($(_target).hasClass('ctlDatepicker')) {
                                $(_currentTarget).find('input[type="date"]').removeAttr('disabled');
                            } else {
                                $(_currentTarget).find('input[type="date"]').attr('disabled', 'disabled');
                                setDate($(_currentTarget), $(_target));
                            }
                        }
                    }
                }
            });

            $('.btnPopConfirm').on({
                click: function () {
                    $('.popLayerContainer').find('.active').each(function (idx) {
                        var _value = $(this).children().text();
                        $('.btnLayerPop span:eq(' + idx + ')').text(_value);
                    });
                    $('.btnPopClose').trigger('click');

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

    this._MY0041 = {    // 매점적립
        load: function () {
            $.fn.barCodeRegOpenPopupLayer = function () {
                popLayerFadeShowHide("btnBarCodeReg", "popBarCodeReg", "popFogBg");
            }

            $('.btnPopConfirm').on({
                click: function () {
                    $('.popFogBg').trigger('click');
                }
            });
        }
    }

    this._MY005 = {    // 자주가는 CGV
        load: function () {
            this.setScrollWidth($('.popTabTitle'), null);

            $('.popLayerContainer').on({
                click: function (e) {

                    var _target = e.target;

                    if (_target.tagName == 'A') {
                        if ($(_target).parents('ul').hasClass('popTabTitle')) {   // popTab tilte Area
                            $(_target).parent('li').addClass('active').siblings('li').removeClass('active');
                        }
                    }
                }
            });

            $.fn.openPopupLayer = function () {
                var _isFogBg = $('.popFogBg').is(':visible');
                $('.popFogBg').css({ 'opacity': '.5', 'top': '0' });
                popLayerBgShowHide($('.popFogBg'), $('.popFavoriteCGV'), _isFogBg);
            }


            /* 개발쪽에 처리
            $('.btnCGVListDelete').on({
            click:function(e){
            var len = $(e.target).parents('ul').children('li').length;
            $(e.target).parent('li').remove();
            if( len == 1){
            $('.comCGVWrap').addClass('noData');
            $('.btnAddCGV').insertBefore($('.txtComment'));
            }
            }
            });
            */
        }
    }

    this._MY006 = {    // 자주쓰는 신용카드
        load: function () {
            //$(".btnCGVListSort").cgvSortable();
            //            if(!$('.comCGVWrap').hasClass('noData')){
            //                $('.btnAddCGV').insertAfter($('.comCGVList'));
            //            }

            /* 개발쪽에 처리
            $('.btnCGVListDelete').on({
            click:function(e){
            var len = $(e.target).parents('ul').children('li').length;
            $(e.target).parent('li').remove();
            if( len == 1){
            $('.comCGVWrap').addClass('noData');
            $('.btnAddCGV').insertBefore($('.txtComment'));
            }
            }
            });
            */
        }
    }

    this._MY0061 = {    // 자주쓰는 신용카드 등록
        load: function () {

            $('input').on({
                keyup: function (e) {
                    if ($(e.target).val() == '') {
                        $(e.target).parents('li').removeClass('active');
                    } else {
                        $(e.target).parents('li').addClass('active');
                    }
                }
            });

            $('select').on({
                change: function (e) {
                    if (this.value == '') {
                        $(e.target).parents('li').removeClass('active');
                    } else {
                        $(e.target).parents('li').addClass('active');
                    }
                }
            });

        }
    }

    this._MY007 = {    // 쿠폰함
        load: function () {
            popLayerShowHide("btnLayerPop", "popCoupon", "popFogBg");
            popLayerHasTopShowHide('btnComCGVReg', 'popComCGVReg', 'popFogBg', 'MY007');
            setDate();
            $('.popLayerContainer').on({
                click: function (e) {
                    var _target = e.target;
                    var _currentTarget = e.currentTarget;

                    if (_target.tagName == 'A') {
                        $(_target).parent('dd').addClass('active').siblings('dd').removeClass('active');

                        if ($(_target).parents('dl').hasClass('popContentType2')) {
                            if ($(_target).hasClass('ctlDatepicker')) {
                                $(_currentTarget).find('input[type="date"]').removeAttr('disabled');
                            } else {
                                $(_currentTarget).find('input[type="date"]').attr('disabled', 'disabled');
                                setDate($(_currentTarget), $(_target));
                            }
                        }
                    }
                }
            });

            $('.btnPopConfirm').on({
                click: function (e) {
                    var is = 0;
                    $('.popLayerContainer').find('.active').each(function (idx) {
                        var _is = 0;
                        var _value = $(this).children().text();
                        $('.btnLayerPop span:eq(' + idx + ')').text(_value);
                        _is = (_value == '사용완료' || _value == '기간만료' || _value == '사용불가' || _value == '사용만료') ? 1 : 0;
                        is += _is;
                    });

                    (is != 0) ? $('.couponList').addClass('complete') : $('.couponList').removeClass('complete');
                    if ($(e.target).text() != '등록') { $('.btnPopClose').trigger('click'); }
                }
            });

            function setDate(obj, obj1) {
                var _numPreMonth = obj1 && typeof obj1.attr("data-month") != "undefined" ? obj1.attr("data-month") : -3;
                var _today = win.moment().format('YYYY-MM-DD');
                var _prevDay = win.moment().add(_numPreMonth, 'months').format('YYYY-MM-DD');

                obj = "" || $('.popLayerContainer');
                obj.find('span:first-child').children('input[type="date"]').val(_prevDay);
                obj.find('span:last-child').children('input[type="date"]').val(_today);
            }
        }
    }

    this._MY010 = {    // 영화관람권
        load: function () {
            popLayerShowHide("btnLayerPop", "popMovieTicket", "popFogBg");
            popLayerHasTopShowHide('btnComCGVReg', 'popComCGVReg', 'popFogBg', 'MY010');
            $('.popLayerContainer').on({
                click: function (e) {
                    var _target = e.target;

                    if (_target.tagName == 'A') {
                        $(_target).parent('dd').addClass('active').siblings('dd').removeClass('active');
                    }
                }
            });

            $('.btnPopConfirm').on({
                click: function (e) {
                    var is = 0;
                    $('.popLayerContainer').find('.active').each(function (idx) {
                        var _is = 0;
                        var _value = $(this).children().text();
                        $('.btnLayerPop span:eq(' + idx + ')').text(_value);
                        _is = (_value == '사용완료' || _value == '기간만료' || _value == '사용불가' || _value == '사용만료') ? 1 : 0;
                        is += _is;
                    });

                    (is != 0) ? $('.ticketList').addClass('complete') : $('.ticketList').removeClass('complete');
                    if ($(e.target).text() != '등록') { $('.btnPopClose').trigger('click'); }

                }
            });
        }
    }

    this._MY012 = {    // 기프트
        load: function () {
            popLayerShowHide("btnLayerPop", "popGiftcon", "popFogBg");
            popLayerHasTopShowHide('btnComCGVReg', 'popComCGVReg', 'popFogBg', 'MY012');
            $('.popLayerContainer').on({
                click: function (e) {
                    var _target = e.target;

                    if (_target.tagName == 'A') {
                        $(_target).parent('dd').addClass('active').siblings('dd').removeClass('active');
                    }
                }
            });

            $('.btnPopConfirm').on({
                click: function (e) {
                    var is = 0;
                    $('.popLayerContainer').find('.active').each(function (idx) {
                        var _is = 0;
                        var _value = $(this).children().text();
                        $('.btnLayerPop span:eq(' + idx + ')').text(_value);
                        _is = (_value == '사용완료' || _value == '기간만료' || _value == '사용불가' || _value == '사용만료') ? 1 : 0;
                        is += _is;
                    });

                    (is != 0) ? $('.giftconList').addClass('complete') : $('.giftconList').removeClass('complete');
                    if ($(e.target).text() != '등록') { $('.btnPopClose').trigger('click'); }

                }
            });
        }
    }

    this._MY016 = {    // 무비패스카드
        load: function () {
            popLayerShowHide("btnLayerPop", "popMovieTicket", "popFogBg");
            popLayerHasTopShowHide('btnComCGVReg', 'popComCGVReg', 'popFogBg', 'MY016');
            $('.popLayerContainer').on({
                click: function (e) {
                    var _target = e.target;

                    if (_target.tagName == 'A') {
                        $(_target).parent('dd').addClass('active').siblings('dd').removeClass('active');
                    }
                }
            });

            $('.btnPopConfirm').on({
                click: function (e) {
                    var is = 0;
                    $('.popLayerContainer').find('.active').each(function (idx) {
                        var _is = 0;
                        var _value = $(this).children().text();
                        $('.btnLayerPop span:eq(' + idx + ')').text(_value);
                        _is = (_value == '사용완료' || _value == '기간만료' || _value == '사용불가' || _value == '사용만료') ? 1 : 0;
                        is += _is;
                    });

                    (is != 0) ? $('.moviePassList').addClass('complete') : $('.moviePassList').removeClass('complete');
                    if ($(e.target).text() != '등록') { $('.btnPopClose').trigger('click'); }

                }
            });
        }
    }

    this._MY014 = {    // 구매취소내역 > [Tab]영화예매 & [Tab]티켓팝콘스토어
        load: function () {
            if (GetUrlParam("type") === "movie") {
                $('#li_menu_ticket').addClass('active');
                $('#contents_ticket').css("display", "block");
            } else {
                $('#li_menu_popcorn').addClass('active');
                $('#contents_popcorn').css("display", "block");
            }

            var setIdx = $('.cPHistoryTitle li.active').index();
            var popTarget;

            switch (setIdx) {
                case 0:
                    popTarget = 'popMovieBooking'
                    //$('.popTicketPopcornStore').hide();
                    //$('.popMovieBooking').show();
                    $('.comCGVWrap1').eq(setIdx).show();
                    break;
                case 1:
                    popTarget = 'popTicketPopcornStore'
                    //$('.popTicketPopcornStore').show();
                    //$('.popMovieBooking').hide()
                    $('.comCGVWrap1').eq(setIdx).show();
                    break;
                default: break;
            }
            document.title = $('.cPHistoryTitle li.active a').text() + ' 결제내역 < MY｜CGV';
            popLayerShowHide("btnLayerPop", popTarget, "popFogBg");
            setDate();

            $('.cPHistoryTitle').on({
                click: function (e) {
                    var _target = e.target;

                    if (_target.tagName == 'A') {
                        setIdx = $(_target).parent('li').index()
                        $(_target).parent('li').addClass('active').siblings('li').removeClass('active');
                        document.title = $('.cPHistoryTitle li.active a').text() + ' 결제내역 < MY｜CGV';
                        $('.comCGVWrap1').hide();

                        switch (setIdx) {
                            case 0:
                                popTarget = 'popMovieBooking';
                                $('.comCGVWrap1').eq(0).show();
                                history.replaceState(null, $('.cPHistoryTitle li.active a').text() + ' 결제내역 < MY｜CGV', "/WebApp/MyCgvV5/paymentList.aspx?type=movie");
                                break;
                            case 2:
                                popTarget = 'popTicketPopcornStore';
                                $('.comCGVWrap1').eq(1).show();
                                history.replaceState(null, $('.cPHistoryTitle li.active a').text() + ' 결제내역 < MY｜CGV', "/WebApp/MyCgvV5/paymentList.aspx?type=store");
                                break;
                            default: break;
                        }
                        popLayerShowHide("btnLayerPop", popTarget, "popFogBg");
                    }

                }
            });

            $('.popLayerContainer').on({
                click: function (e) {

                    var _target = e.target;
                    var _currentTarget = e.currentTarget;

                    if (_target.tagName == 'A') {
                        $(_target).parent('dd').addClass('active').siblings('dd').removeClass('active');

                        if ($(_target).parents('dl').hasClass('ctlDatepickerLayer')) {
                            if ($(_target).hasClass('ctlDatepicker')) {
                                $(_currentTarget).find('input[type="date"]').removeAttr('disabled');
                            } else {
                                $(_currentTarget).find('input[type="date"]').attr('disabled', 'disabled');
                                setDate($(_currentTarget), $(_target));
                            }
                        }
                    }
                }
            });

            $('.btnPopConfirm').on({
                click:function(){
                    $('.popLayerFooter').off('focusout');
                    $('.btnPopClose').off('focusout');
                    $('.popLayerContainer').find('.active').each(function(idx){
                        var _value = $(this).children().text();
                        $('.btnLayerPop span:eq(' + idx + ')').text(_value);
                    });

                }
            });

            function setDate(obj, obj1) {
                var _numPreDay = obj1 && typeof obj1.attr("data-day") != "undefined" ? obj1.attr("data-day") : -6; //[리뉴얼1단계] 예매내역 조회기간 수정
                var _today = win.moment().format('YYYY-MM-DD');
                var _prevMovieDay = win.moment().add(_numPreDay, 'days').format('YYYY-MM-DD');

                obj = "" || $('.popLayerContainerMovie');
                obj.find('span:first-child').children('input[type="date"]').val(_prevMovieDay);
                obj.find('span:last-child').children('input[type="date"]').val(_today);

                var _numPreMonth = obj1 ? ("-" + obj1.text().replace("개월", "")) : -1;
                var _prevPopcornDay = win.moment().add(_numPreMonth, 'months').format('YYYY-MM-DD');

                obj = "" || $('.popLayerContainerPopcorn');
                obj.find('span:first-child').children('input[type="date"]').val(_prevPopcornDay);
                obj.find('span:last-child').children('input[type="date"]').val(_today);
            }
        }
    }


    this._MY0141 = {    // 구매취소내역 > [Tab]영화예매 > 기프트콘 상세
        load: function () {
            $('.btnQrCode').on({   // QR Code 버튼
                click: function (e) {
                    //console.log('a');
                    popLayerFadeShowHide('btnQrCode', 'popQRCode', 'popFogBg')
                }
            });

            $('.btnReceipt').on({   // 영수증 버튼
                click: function () {
                    //console.log('b');
                    popLayerFadeShowHide('btnReceipt', 'popReceipt', 'popFogBg')
                }
            });
        }
    }


    this._MY0142 = {    // 구매취소내역 > [Tab]티켓팝콘스토어 > 구매취소내역 상세
        load: function () {
            $('.comDetailAccordion a').on({
                click: function (e) {
                    var _$target = $(e.target).parent();
                    if (_$target.hasClass('active')) { // 닫기
                        _$target.next('.comDetailList').slideUp(function () {
                            _$target.removeClass('active');
                        });

                    } else {  // 열기
                        _$target.next('.comDetailList').slideDown(function () {
                            _$target.addClass('active');
                        });
                    }
                }
            });
        }
    }

    this._MW001 = {    // 빠른예매 조회
        load: function () { //console.log('빠른예매 조회 init')

            /* S [U 20200326] 스크롤되는 버튼 위치 조정하는 코드
                Description:
                    - 개발쪽에서 사용시 아래 코드 동적 리스트 생성후 호출
                    - 개발시 이쪽에 있는 코드는 퍼블리싱된 파일에서 확인을 위한 임시 소스임 개발시 삭제처리
                    - $.fn.setPosX 함수의 첫번째 인자는 ul 태그에 아이디값
                    - 버튼이 있는경우 $.fn.setPosX 함수의 두번째 인자에 버튼의 class 입력
             */
//            $.fn.setPosX('screeningSchedule_list');
//            $.fn.setPosX('screeningArea_list', 'btn_screeningSchedule_fixedListView');
//            $.fn.setPosX('screeningSchedule_movie_list');
//            $.fn.setPosX('screeningSchedule_time_list');
            /* E [U 20200326] 스크롤되는 버튼 위치 조정하는 코드 */

            $('.screeningSchedule_list').find('li > a').on({
                click:function(e){
                    e.preventDefault();
                    var _$target = $(e.currentTarget).parent();

                    _$target.addClass('active').siblings('li').removeClass('active');
                }
            });


//           개발에서 처리
//            $('.screeningArea_list').find('li > a').on({
//                click:function(e){
//                    e.preventDefault();
//                    var _$target = $(e.target).parent();
//                    var isSelect = !_$target.hasClass('hasNot');
//
//                    if(isSelect){
//                        _$target.toggleClass('multiActive');

//                        if($('.screeningArea_list li.multiActive').length > 3){
//                            _$target.toggleClass('multiActive');
//                            alert('극장 선택은 최대 3개까지만 가능합니다.');
//                        }
//                    }
//                }
//            });

//           개발에서 처리
//            $('.screeningSchedule_movie_list').find('li > a').on({
//                click:function(e){
//                    e.preventDefault();
//                    var _$target = $(e.target).parents('li');

//                    _$target.toggleClass('multiActive');

//                    if($('.screeningSchedule_movie_list li.multiActive').length > 2){
//                        _$target.toggleClass('multiActive');
//                        alert('영화 선택은 최대 2개까지만 가능합니다.');
//                    }
//                }
//            });

//           개발에서 처리
//            $('.screeningSchedule_time_list').find('li > a').on({
//                click:function(e){
//                    e.preventDefault();
//                    var _$target = $(e.currentTarget).parent();

//                    _$target.addClass('active').siblings('li').removeClass('active');
//                }
//            });

            /* S [U 20200313] rangeSlider 사용안함 주석처리
            $.returnTime = function( _str ){
                var h = Math.floor(_str);
                var m = _str%1;
                var str;

                h = (_str  < 10)?"0" + h +'시 ':h +'시 ';
                m = ( m != 0)?"30분":"";
                str = h + m;

                return str
            }

            $.rangeSliderSetTxt = function( _rangeValStartClassName, _rangValEndClassName, _rangeValAry){
                var _rangeS = $('.' + _rangeValStartClassName);
                var _rangeE = $('.' + _rangValEndClassName);

                _rangeS.attr( 'data-val', $.returnTime(_rangeValAry[0]));
                _rangeE.attr( 'data-val', $.returnTime(_rangeValAry[1]));
            }

            var START_TIME = 6;
            var MIDDLE_TIME = 12;
            var END_TIME = 30;
            var STEP_TIME = 0.5;

            var _rangeSlider = $( "#rangeSlider" ).slider({
                range: true,
                min: START_TIME,
                max: END_TIME,
                step:STEP_TIME,
                values: [ START_TIME, END_TIME ],
                slide: function( event, ui ){
                    $.rangeSliderSetTxt('rangeValStart', 'rangeValEnd', ui.values);

                    $('.runningTime_state > li').removeClass('active');

                    if(ui.values[0] == START_TIME && ui.values[1] == END_TIME){
                        $('.runningTime_state > li').eq(0).addClass('active');
                    }else if(ui.values[0] == START_TIME && ui.values[1] == MIDDLE_TIME){
                        $('.runningTime_state > li').eq(1).addClass('active');
                    }else if(ui.values[0] == MIDDLE_TIME && ui.values[1] == END_TIME){
                        $('.runningTime_state > li').eq(2).addClass('active');
                    }else {

                    }
                }
            });
           $.rangeSliderSetTxt('rangeValStart', 'rangeValEnd', _rangeSlider.slider("values"));

            $('.runningTime_state').on({
                click:function(e){
                    e.preventDefault();
                    var _valAry;
                    var _$target = $(e.target);
                    var _targetTagName = _$target[0].tagName;
                    var _targetState = _$target.data('state');

                    if(_targetTagName == "A"){


                        _$target.parent('li').addClass('active').siblings().removeClass('active');

                        switch( _targetState ){
                            case 'allDay':
                                _valAry = [START_TIME, END_TIME];
                                break;
                            case 'am':
                                _valAry = [START_TIME, MIDDLE_TIME];
                                break;
                            case 'pm':
                                _valAry = [MIDDLE_TIME, END_TIME];
                                break;
                            default : break;
                        }

                        _rangeSlider.slider( "values", _valAry);
                       $.rangeSliderSetTxt('rangeValStart', 'rangeValEnd', _rangeSlider.slider( "values"));
                    }
                }
            });
            E [U 20200313] rangeSlider 사용안함 주석처리 */
        }
    }
    this._MW002 = { // 빠른예매 결과
        load: function () { //console.log('빠른예매 결과 init')
            popLayerShowHide("btn_filter", "popScheduleInfo", "popFogBg");
            popLayerShowHide("btn_selectMovie", "popSelectMovie", "popFogBg");
            popLayerShowHide("btn_selectCinema", "popSelectCinema", "popFogBg");
            //popLayerShowHide("btn_miniMap", "popMiniMap", "popFogBg");

            $('.popFogBg').on({
                click:function(e){
                    var $fogBg = $(e.target);
                    var $popLayer;

                    $fogBg.css({'display':'none'});

                    if(!$('.popMiniMap').is(':hidden')){
                        $popLayer = $('.popMiniMap');
                    }else if(!$('.popSelectMovie').is(':hidden')){
                        $popLayer = $('.popSelectMovie');
                    }else if(!$('.popSelectCinema').is(':hidden')){
                        $popLayer = $('.popSelectCinema');
                    }
                    popLayerBgShowHide($('popFogBg'), $popLayer, true);
                    $('body').off('scroll touchmove mousewheel');
                }
            });

            $('.screeningSchedule_content_list').on({
                click:function(e){
                    if($(e.target).parent().prop("tagName") === "A"){
                        console.log()
                        $('body').on('scroll touchmove mousewheel', function(e){
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        });
                    }
                }
            });

            $('.screeningSchedule_time_list').find('li > a').on({
                click:function(e){
                    e.preventDefault();
                    var _$target = $(e.currentTarget).parent();

                    _$target.addClass('active').siblings('li').removeClass('active');
                    console.log(">>>" + $('.screeningSchedule_time_list').outerWidth())
                }
            });

            $('.btn_soldOut_balloon_close').on({
                click:function(e){
                    var _$target = $(e.currentTarget).parents('li.soldOut');

                    _$target.removeClass('active');

                }
            });

//            개발에서 처리
//            $('.btn_schedule_cinema a, .btn_schedule_movie a').on({
//                click:function(e){
//                    var _$currentTarget = $(e.currentTarget).parent('h3');
//                    if(_$currentTarget.hasClass('active')){
//                        _$currentTarget.nextUntil( "h3" ).slideUp(function(){
//                            _$currentTarget.removeClass('active')
//                        });
//                    }else{
//                        _$currentTarget.nextUntil( "h3" ).slideDown(function(){
//                            _$currentTarget.addClass('active')
//                        });
//                    }
//                }
//            });

//            개발에서 처리
//            var selectMovieCnt = $('.popSelectMovie_list li.active').length;
//            $('.popSelectMovie .popLayerFooter a').attr('data-count', selectMovieCnt);
//            $('.popSelectMovie_list').on({
//                click:function(e){
//                    var _$target = $(e.target).parents('li');
//
//                    _$target.toggleClass('active');
//
//                    if($('.popSelectMovie_list li.active').length > 2){
//                        _$target.toggleClass('active');

//                        $(this).next('.popToast').show().delay(500).fadeOut(2500, function(){
//                            $(this).removeClass('active');
//                        });
//                    }

//                    selectMovieCnt = $('.popSelectMovie_list li.active').length;
//                    $('.popSelectMovie .popLayerFooter a').attr('data-count', selectMovieCnt);

//                    if(selectMovieCnt == 0){
//                        $('.popSelectMovie .popLayerFooter a').attr('class', 'dimmed');
//                    }else{
//                        $('.popSelectMovie .popLayerFooter a').removeClass('dimmed');
//                    }
//                }
//            });

//        /* S [U 20200313] 인원선택 */
//            //$('.btn_count').on({
//            $("#popLayerFooter").on('click', 'a', function(e) {
//                //click:function(){
//                    if($(this).text() == '인원선택'){
//                        $(this).addClass('dimmed').text('좌석선택');
//                        $('.popSelectCount_wrap').slideDown(function(){
//                            $('.popMiniMap').addClass('active');
//                        });
//
//                        $('.popSelectCounter a').off('click').on({
//                            click:function(){
//                                var LIMITED_LENGTH = 8;
//                                var totalLen = 0;
//                                var aryGroup = [];
//                                if($(this).hasClass('active')){
//                                    $(this).removeClass('active');
//                                }else{
//                                    $(this).addClass('active').siblings().removeClass('active');
//                                }
//                                $('.popSelectCounter dd').each(function(idx){
//                                    aryGroup[idx] = Number($(this).children('a.active').text());
//                                    totalLen += aryGroup[idx];
//                                });
//                                $.setDimmed($('.popSelectCounter dd'), LIMITED_LENGTH, totalLen, aryGroup, 'dimmed');
//                            }
//                        });
//                    }
//                //}
//            });

//            $.setDimmed = function( _target, _limitedLen, _totalLen, _cuttentGroupAry, _dimmedClassName){
//                //console.log( _target, _totalLen, _cuttentGroupAry, _dimmedClassName)
//                _target.each(function(idx){
//                   // console.log(idx, _limitedLen, _totalLen, _cuttentGroupAry[idx], _dimmedClassName)
//                   // console.log(_limitedLen - _totalLen + _cuttentGroupAry[idx])
//                    $(this).find('a').each(function(_idx){
//                        //console.log((_limitedLen - _totalLen + _cuttentGroupAry[idx]) + "<=" + _idx)
//                        if((_limitedLen - _totalLen + _cuttentGroupAry[idx]) <= _idx){
//                            $(this).addClass(_dimmedClassName);
//                        }else{
//                            $(this).removeClass(_dimmedClassName);
//                        }

//                    });
//                });

//                $('.btn_count').attr('data-count', _totalLen);
//                if(_totalLen > 0){
//                    $('.btn_count').removeClass(_dimmedClassName);
//                }else{
//                    $('.btn_count').addClass(_dimmedClassName);
//                }
//            }


//            $('.btn_pop_reset').on({
//                click:function(){
//                    $('.popSelectCounter a').removeClass('dimmed active');
//                    $('.btn_count').attr('data-count', 0).addClass('dimmed');
//                }
//            });

//            $('.popMiniMap .btnPopClose').on({
//                click:function(){
//                    $('.popMiniMap').removeClass('active');
//                    $('.btn_pop_reset').trigger('click');
//                    $('.btn_count').attr('data-count', 0).removeClass('dimmed').text('인원선택');
//                }
//            })

//            $('.popFogBg').on({
//                click:function(){
//                    if($('.popMiniMap').hasClass('active')){
//                        $('.popMiniMap .btnPopClose').trigger('click');
//                    }
//                }
//            });
            /* E [U 20200313] 인원선택 */

            /* S [U 20200313] rangeSlider 사용안함 주석처리
            $.returnTime = function( _str ){
                var h = Math.floor(_str);
                var m = _str%1;
                var str;

                h = (_str  < 10)?"0" + h +'시 ':h +'시 ';
                m = ( m != 0)?"30분":"";
                str = h + m;

                return str
            }

            $.rangeSliderSetTxt = function( _rangeValStartClassName, _rangValEndClassName, _rangeValAry){
                var _rangeS = $('.' + _rangeValStartClassName);
                var _rangeE = $('.' + _rangValEndClassName);

                _rangeS.attr( 'data-val', $.returnTime(_rangeValAry[0]));
                _rangeE.attr( 'data-val', $.returnTime(_rangeValAry[1]));
            }

            var START_TIME = 6;
            var END_TIME = 30;
            var STEP_TIME = 0.5;

            var _rangeSlider = $( "#rangeSlider" ).slider({
                range: true,
                min: START_TIME,
                max: END_TIME,
                step:STEP_TIME,
                values: [ START_TIME, END_TIME ],
                slide: function( event, ui ){
                    $.rangeSliderSetTxt('rangeValStart', 'rangeValEnd', ui.values);
                }
            });

            $.rangeSliderSetTxt('rangeValStart', 'rangeValEnd', _rangeSlider.slider( "values"));
            E [U 20200313] rangeSlider 사용안함 주석처리 */
        },
        scroll:function(){
            var _targetTop = $('.screeningSchedule_time').offset().top;
            var _scrollTop = $(this).scrollTop();

            if(_targetTop <= _scrollTop){   // fixed
                if( $('.screeningSchedule_time').hasClass("fixed") == false){

                    var _h = $('.screeningSchedule_time_fixed_wrap').outerHeight();
                    $('.screeningSchedule_time').addClass('fixed');
                    $('.screeningSchedule_time').css({'padding-top':_h + 'px'});

                    if (cgv.common.StandardInfo.IsWebView == true) {
                        CGVHAAppInterface.SetScheldulePlayDayZoneFixed('Y');
                    }
                }
            }else{
                if( $('.screeningSchedule_time').hasClass("fixed") == true){

                    $('.screeningSchedule_time').removeClass('fixed');
                    $('.screeningSchedule_time').css({'padding-top':'0'});

                    if (cgv.common.StandardInfo.IsWebView == true) {
                        CGVHAAppInterface.SetScheldulePlayDayZoneFixed('N');
                    }
                }
            }
        }
    }

    this._MW003 = {    // 상영스케쥴
        load: function () { //console.log('상영스케쥴 init')

            popLayerShowHide("btn_filter", "popScheduleInfo", "popFogBg");
            //popLayerShowHide("btn_miniMap", "popMiniMap", "popFogBg");

            $('.popFogBg').on({
                click:function(e){
                    var $fogBg = $(e.target);
                    var $popLayer;

                    $fogBg.css({'display':'none'});

                    if(!$('.popMiniMap').is(':hidden')){
                        $popLayer = $('.popMiniMap');
                    }

                    popLayerBgShowHide($('popFogBg'), $popLayer, true);
                    $('body').off('scroll touchmove mousewheel');
                }
            });

            $('.screeningSchedulewrap').find('li > a').on({
                click:function(e){
                    e.preventDefault();
                    var _$target = $(e.target).parent();

                    _$target.addClass('active').siblings('li').removeClass('active');
                }
            });

            $('.screeningSchedule_time_list').find('li > a').on({
                click:function(e){
                    e.preventDefault();
                    var _$target = $(e.currentTarget).parent();

                    _$target.addClass('active').siblings('li').removeClass('active');
                }
            });

//        /* S [U 20200313] 인원선택 */
//            //$('.btn_count').on({
//            $("#popLayerFooter").on('click', 'a', function(e) {
//                //click:function(){
//                    if($(this).text() == '인원선택'){
//                        $(this).addClass('dimmed').text('좌석선택');
//                        $('.popSelectCount_wrap').slideDown(function(){
//                            $('.popMiniMap').addClass('active');
//                        });
//
//                        $('.popSelectCounter a').off('click').on({
//                            click:function(){
//                                var LIMITED_LENGTH = 8;
//                                var totalLen = 0;
//                                var aryGroup = [];
//                                if($(this).hasClass('active')){
//                                    $(this).removeClass('active');
//                                }else{
//                                    $(this).addClass('active').siblings().removeClass('active');
//                                }
//                                $('.popSelectCounter dd').each(function(idx){
//                                    aryGroup[idx] = Number($(this).children('a.active').text());
//                                    totalLen += aryGroup[idx];
//                                });
//                                $.setDimmed($('.popSelectCounter dd'), LIMITED_LENGTH, totalLen, aryGroup, 'dimmed');
//                            }
//                        });
//                    }
//                //}
//            });

//            $.setDimmed = function( _target, _limitedLen, _totalLen, _cuttentGroupAry, _dimmedClassName){
//                //console.log( _target, _totalLen, _cuttentGroupAry, _dimmedClassName)
//                _target.each(function(idx){
//                   // console.log(idx, _limitedLen, _totalLen, _cuttentGroupAry[idx], _dimmedClassName)
//                   // console.log(_limitedLen - _totalLen + _cuttentGroupAry[idx])
//                    $(this).find('a').each(function(_idx){
//                        //console.log((_limitedLen - _totalLen + _cuttentGroupAry[idx]) + "<=" + _idx)
//                        if((_limitedLen - _totalLen + _cuttentGroupAry[idx]) <= _idx){
//                            $(this).addClass(_dimmedClassName);
//                        }else{
//                            $(this).removeClass(_dimmedClassName);
//                        }

//                    });
//                });

//                $('.btn_count').attr('data-count', _totalLen);
//                if(_totalLen > 0){
//                    $('.btn_count').removeClass(_dimmedClassName);
//                }else{
//                    $('.btn_count').addClass(_dimmedClassName);
//                }
//            }


//            $('.btn_pop_reset').on({
//                click:function(){
//                    $('.popSelectCounter a').removeClass('dimmed active');
//                    $('.btn_count').attr('data-count', 0).addClass('dimmed');
//                }
//            });

//            $('.popMiniMap .btnPopClose').on({
//                click:function(){
//                    $('.popMiniMap').removeClass('active');
//                    $('.btn_pop_reset').trigger('click');
//                    $('.btn_count').attr('data-count', 0).removeClass('dimmed').text('인원선택');
//                }
//            })


//            $('.popFogBg').on({
//                click:function(){
//                    if($('.popMiniMap').hasClass('active')){
//                        $('.popMiniMap .btnPopClose').trigger('click');
//                    }
//                }
//            });
            /* E [U 20200313] 인원선택 */

            /* S [U 20200313] rangeSlider 사용안함 주석처리
                $.returnTime = function( _str ){
                    var h = Math.floor(_str);
                    var m = _str%1;
                    var str;

                    h = (_str  < 10)?"0" + h +'시 ':h +'시 ';
                    m = ( m != 0)?"30분":"";
                    str = h + m;

                    return str
                }

                $.rangeSliderSetTxt = function( _rangeValStartClassName, _rangValEndClassName, _rangeValAry){
                    var _rangeS = $('.' + _rangeValStartClassName);
                    var _rangeE = $('.' + _rangValEndClassName);

                    _rangeS.attr( 'data-val', $.returnTime(_rangeValAry[0]));
                    _rangeE.attr( 'data-val', $.returnTime(_rangeValAry[1]));
                }

                var START_TIME = 6;
                var END_TIME = 30;
                var STEP_TIME = 0.5;

                var _rangeSlider = $( "#rangeSlider" ).slider({
                    range: true,
                    min: START_TIME,
                    max: END_TIME,
                    step:STEP_TIME,
                    values: [ START_TIME, END_TIME ],
                    slide: function( event, ui ){
                        $.rangeSliderSetTxt('rangeValStart', 'rangeValEnd', ui.values);
                    }
                });

                $.rangeSliderSetTxt('rangeValStart', 'rangeValEnd', _rangeSlider.slider( "values"));
                E [U 20200313] rangeSlider 사용안함 주석처리 */
        },
        scroll:function(){
            var _targetTop = $('.screeningSchedule_time').offset().top;
            var _scrollTop = $(this).scrollTop();

            if(_targetTop <= _scrollTop){   // fixed
                var _h = $('.screeningSchedule_time_fixed_wrap').outerHeight();
                $('.screeningSchedule_time').addClass('fixed');
                $('.screeningSchedule_time').css({'padding-top':_h + 'px'});
            }else{
                $('.screeningSchedule_time').removeClass('fixed');
                $('.screeningSchedule_time').css({'padding-top':'0'});
            }
        }
    }

    this._MW004 = {    // 좌석도
        load: function () { // console.log('좌석도 init');
            popLayerSeatShowHide("btn_miniMap", "popMiniMap", "popFogBg");
            $('.btn_soldOut_balloon_close').on({
                click:function(e){
                    var _$target = $(e.currentTarget).parents('.seat_notice_wrap');

                    _$target.removeClass('active');

                }
            });
        }
    }

    $(this).on(this._commonHandlers);

    switch (win.screenId) {
        case 'STORE002': $(this).on(this._STORE002);    break;  // 스토어 > 이용안내
        case 'STORE101': $(this).on(this._STORE101);    break;  // 스토어 > 상품 > 카테고리별 상품 목록
        case 'STORE102': $(this).on(this._STORE102);    break;  // 스토어 > 상품 > 카테고리별 상품 상세
        case 'STORE103': $(this).on(this._STORE103);    break;  // 스토어 > 장바구니 > 장바구니 상품 목록
        case 'STORE106': $(this).on(this._STORE106);    break;  // 스토어 > 선물하기 > 결제하기 > [공통]결제정보 입력
        case 'STORE201': $(this).on(this._STORE201);    break;  // 스토어 > 내 기프트콘 > 목록
        case 'STOREP202': $(this).on(this._STOREP202);  break;  // 스토어 > 내 기프트콘 > 목록 > 기프트콘 상세 > [popup]환불정보입력
        case 'STORE204': $(this).on(this._STORE204);    break;  // 스토어 > 결제내역 > 목록
        case 'STORE301': $(this).on(this._STORE301);    break;  // 스토어 > 선물거절 정보입력
        case 'STORE302': $(this).on(this._STORE302);    break;  // 스토어 > 선물거절 정보입력 > 확인 및 완료
        case 'MY002': $(this).on(this._MY002); break;     // 프로필 설정
        case 'MY004': $(this).on(this._MY004); break;     // CJ ONE포인트
        case 'MY0041': $(this).on(this._MY0041); break;     // 매점적립
        case 'MY005': $(this).on(this._MY005); break;     // 자주가는 CGV
        case 'MY006': $(this).on(this._MY006); break;     // 자주쓰는 신용카드
        case 'MY0061': $(this).on(this._MY0061); break;     // 자주쓰는 신용카드 등록
        case 'MY007': $(this).on(this._MY007); break;     // CJ 쿠폰함
        case 'MY010': $(this).on(this._MY010); break;     // 영화관람권
        case 'MY012': $(this).on(this._MY012); break;     // 기프트콘
        case 'MY016': $(this).on(this._MY016); break;     // 무비패스카드
        case 'MY014': $(this).on(this._MY014); break;     // 구매취소내역 > [Tab]영화예매 & [Tab]티켓팝콘스토어
        case 'MY0141': $(this).on(this._MY0141); break;     // 구매취소내역 > [Tab]영화예매 > 기프트콘 상세
        case 'MY0142': $(this).on(this._MY0142); break;     // 구매취소내역 > [Tab]티켓팝콘스토어 > 구매취소내역 상세
        case 'MW001':       // 빠른예매 조회
        case 'MW002':       // 빠른예매 결과
        case 'MW003':       // 상영시간표
        case 'MW004': $(this).on(this['_' + win.screenId]); break;
        default: break;
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

    this.setScrollWidth_store = function(_target, _btnL){
        try{
            var _width = 0;

            var _targetParentPL = Number(_target.css('padding-left').replace('px', ''));
            var _targetParentPR = Number(_target.css('padding-right').replace('px', ''));

            _target.find('> li').each(function(){
                _width = $(this).outerWidth(true) + _width;
            });

            var _winW = $(window).outerWidth() - _targetParentPL - _targetParentPR;
            if(_winW < _width){
                _totalWidth = Math.ceil(_targetParentPL + _width + _targetParentPR) + 'px';
            }else{
                _totalWidth = '100%';
            }

            _target.css({'width':_totalWidth});

            if( _btnL != null){
                (_target.parent().scrollLeft() == 0)?_btnL.hide():_btnL.show();
                _target.parent().on({
                    scroll:function(){
                        (_target.parent().scrollLeft() == 0)?_btnL.hide():_btnL.show()
                    }
                });
            }

            return Math.ceil(_targetParentPL + _width + _targetParentPR);
        }catch(e){
            //win.console.log("error");
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

    win.fnPopLayerShowHide = function(_btn, _popLayer, _fogBg, _isInit){
        var $popLayer = $('.' + _popLayer);
        var $fogBg = $('.' + _fogBg);
        var _isFogBg = $fogBg.is(':visible');

        if(_btn == ""){
            if(_isInit){
                $fogBg.css({ 'opacity': '.5', 'top': '0' });
                popLayerBgShowHide($fogBg, $popLayer, _isFogBg);
            }

        }else{
            var $btn = $('.' + _btn);

            if(_isInit){
                $fogBg.css({ 'opacity': '.5', 'top': '0' });
                popLayerBgShowHide($fogBg, $popLayer, _isFogBg);
            }else{
                $popLayer.siblings("div:not('.popFogBg')").hide();
                $btn.off('click');
                $btn.on({
                    click: function () {
                        $fogBg.css({ 'opacity': '.5', 'top': '0' });
                        popLayerBgShowHide($fogBg, $popLayer, _isFogBg);

//                            if(_popLayer == 'popMiniMap'){  // 미니맵일 경우 예외처리
//                                var winWidth = $(window).outerWidth();
//                                var activeItemLeft = $('.popMiniMap_Schedule_list li.active').offset().left;
//                                var scrollLeft = $('.popMiniMap_Schedule_list').scrollLeft();
//                                var itemWidth = $('.popMiniMap_Schedule_list li.active').outerWidth();
//
//                                var centerScroll = scrollLeft + activeItemLeft - (winWidth - itemWidth) / 2;
//
//                                $('.popMiniMap_Schedule_list').scrollLeft(centerScroll)
//                            }
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
                $fogBg.css({ 'opacity': '.5', 'top': '0' });
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
                if($btn.attr('data-is-event') == 'true'){

                    $popLayer.siblings("div:not('.popFogBg')").hide();
                    $fogBg.css({ 'opacity': '.5', 'top': '0' });
                    popLayerBgShowHide($fogBg, $popLayer, _isFogBg);
                }
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
            try{
                _contentTarget.stop().animate({'bottom':'-100%'}, 200, function(){
                    fnFixedScroll(false);
                    _target.hide();
                    _contentTarget.hide();
                });
            }catch{
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
    /*
    $.fn.cgvSortable = function(options){
    var opts = $.extend({}, $.fn.cgvSortable.defaults, options);
    return this.each(function(){
    $(this).on({
    touchstart:function(e){ //  console.log("mousedown");
    $('html body').css({'overflow':'hidden', 'position':'relative', 'width':'100%', 'height':'100%'});

    var _$target = $(e.target).parent();

    opts.$targetIdx = _$target.index();
    opts.$totalLen = _$target.parent('ul').find('li').length;

    opts.targetX = _$target.offset().left;
    opts.targetY = _$target.offset().top;
    //                opts.startmoveX = e.targetTouches[0].pageX;
    opts.startmoveY = e.targetTouches[0].pageY;
    opts.preMoveY = e.targetTouches[0].pageY;
    opts.targetH = _$target.outerHeight();
    $("<li class='empty'></li>").insertAfter($(e.target).parents('ul').find('li:eq(' + opts.$targetIdx + ')'));
    _$target.insertAfter($(e.target).parents('ul').find('li:eq(' + opts.$totalLen + ')').get(0));
    _$target.addClass('active').css({'left':opts.targetX, 'top':opts.targetY});
    },
    touchmove:function(e){  //  console.log("mousemove");
    var _$target = $(e.target).parent();

    var _moveY = e.targetTouches[0].pageY;
    var _dis = _moveY - opts.startmoveY;

    var currentIdx = Math.round(_dis/opts.targetH) + opts.$targetIdx;

    if( currentIdx < 0){
    currentIdx = 0;
    }else if(currentIdx >= (opts.$totalLen - 1)){
    currentIdx = opts.$totalLen - 1;
    }

    _$target.css({'left': opts.targetX, 'top': opts.targetY + _moveY - opts.startmoveY });

    if(_moveY >= opts.preMoveY){
    $('.empty').insertAfter($(e.target).parents('ul').children('li:eq(' + currentIdx + ')'));    // 아래로
    }else{
    $('.empty').insertBefore($(e.target).parents('ul').children('li:eq(' + currentIdx + ')'));    // 위로
    }
    opts.preMoveY = _moveY;

    },
    touchend:function(e){   //  console.log("mouseup");
    $('html body').css({'overflow':'visible', 'position':'static', 'width':'auto', 'height':'auto'});
    if(win.frontState){
    var _$target = $(e.target).parent();

    _$target.insertBefore($('.empty')).removeClass('active').css({'left':'auto', 'top':'auto'});
    $('.empty').remove();
    }
    }
    });
    });
    };*/

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

    $.fn.reservationMenu = function( _this, _target ){
        $.extend({
            pxToNumber:function( _target, _class ){
                return Number(_target.css(_class).replace('px', ''));
            }
        })

        var whiteSpace;
        var $target = $('.' +_target);
        var paddingLR = $.pxToNumber($target, 'padding-left') + $.pxToNumber($target, 'padding-right');
        var totalW = paddingLR;
        var h = $.pxToNumber($target, 'padding-top') + $.pxToNumber($target, 'padding-bottom');
        var hasListViewPL;

        $target.find('li').each(function(idx){
            totalW += $(this).outerWidth(true);
        });

        if($(_this).hasClass('open')){  // Close
            h = h + $target.children('li').outerHeight(true);
            whiteSpace = 'nowrap';
            hasListViewPL = ($target.hasClass('hasListView'))?'54px':'16px';
        }else{  // Open
            //console.log(totalW, $(window).outerWidth(), paddingLR, totalW / ($(window).outerWidth() - paddingLR))
            h = h + $target.children('li').outerHeight(true) * Math.ceil(totalW / ($(window).outerWidth() - paddingLR));
            whiteSpace = 'normal';
            hasListViewPL = '16px';
        }

        $target.animate({
            //  'height': h + 'px'
        }, 400, function(){
            $target.css({'white-space':whiteSpace, 'padding-right':hasListViewPL});
            $(_this).toggleClass('open');

            //선택된 상영관으로 스크롤 이동
            if($(_this).hasClass('open') == false){
                if(gTheaterCd != ""){
                    setTimeout(function(){
                        jQuery("#screeningArea_list li[data-cd='"+gTheaterCd+"'] a").click();
                    }, 100);
                }
            }
        });
    }

    $.fn.setPosX = function( _targetId, _targetBtn ){
        var _argLen = arguments.length;

        var $list = $('#' + _targetId);
        var _winW = $(window).outerWidth();
        var _listPL = parseInt($list.css('padding-left'));
        var _listPR = parseInt($list.css('padding-right'));
        var _docW = 0;
        var _targetAry = [];

        $list.children('li').each(function(idx){
            _docW += $(this).outerWidth(true);
            _targetAry[idx] = _docW;
        });

        $list.find('a').on({
            click:function(){
                var _currentIdx = $(this).parent().index();;
                var _winWInnerW = _winW - (_listPL + _listPR);
                var _scrollL;
                var _isScroll;
                var _isBtn = false;

                _scrollL =  (_targetAry[_currentIdx] - _targetAry[0]) / (_docW - _targetAry[0]) * (_docW - _winWInnerW);
                _isScroll = _winWInnerW < _docW;

                if(_argLen > 1){
                    _isBtn = $('.' + _targetBtn).hasClass('open');
                }

                if(_isScroll && !_isBtn){
                    $list.animate({
                        'scrollLeft':_scrollL
                    });
                }
            }
        });
    }


    $.fn.setPosXDynamic = function( _targetId, _targetBtn ){
        var _argLen = arguments.length;

        var $list = $('#' + _targetId);
        var _winW = $(window).outerWidth();
        var _listPL = parseInt($list.css('padding-left'));
        var _listPR = parseInt($list.css('padding-right'));
        var _docW = 0;
        var _targetAry = [];

        $list.children("li[style='']").each(function(idx){
            _docW += $(this).outerWidth(true);
            _targetAry[idx] = _docW;
        });

        if(_targetBtn != ""){
            if(_winW > (_docW + _listPL)){
                $('.' + _targetBtn).hide();
            }else{
                $('.' + _targetBtn).show();
            }
        }

        $list.find('a').on({
            click:function(e){

                var _currentIdx = 0 ;
                $(this).parent().parent().find("li[style='']").each(function(idx){
                    if($(this).parent().parent().find("li[style='']").eq(idx).data("cd") == gTheaterCd){
                        _currentIdx = idx;
                    }
                });

                var _winWInnerW = _winW - (_listPL + _listPR);
                var _scrollL;
                var _isScroll;
                var _isBtn = false;

                _scrollL =  (_targetAry[_currentIdx] - _targetAry[0]) / (_docW - _targetAry[0]) * (_docW - _winWInnerW);
                _isScroll = _winWInnerW < _docW;

                if(_argLen > 1){
                    _isBtn = $('.' + _targetBtn).hasClass('open');
                }

                if(_isScroll && !_isBtn){
                    $list.stop().animate({
                        'scrollLeft':_scrollL
                    });
                }
            }
        });
    }

    //미니맵 띄위기
    fnOpenPopMiniMap = function(){
        jQuery('body').addClass('scrlOff');
        jQuery(".popFogBg").attr("style", "opacity: 0.5; top: 0px; display: block;");
        jQuery("#divSeatMiniMap").show().stop().animate({'bottom':'0'},200);
    }

    //무비차트 레이어 선택영역, 버튼 Style 제어
    fnMovieChartLayerSelectItemsShowHide = function(_isShow, _selData, _selCount){
        if(_isShow){
            jQuery(".popSelectMovie .popLayerSelect").css("display", "block");
            jQuery(".popSelectMovie .popLayerSelect").html(_selData);
            jQuery(".popSelectMovie .popLayerFooter a").attr("data-count", _selCount);
            jQuery(".popSelectMovie .popLayerFooter a").removeClass("dimmed");
            jQuery(".popSelectMovie .popLayerFooter").removeClass("dimmed");
        }else{
            jQuery(".popSelectMovie .popLayerSelect").css("display", "none");
            jQuery(".popSelectMovie .popLayerSelect").html('<li></li>');
            jQuery(".popSelectMovie .popLayerFooter a").attr("data-count", "0");
            jQuery(".popSelectMovie .popLayerFooter a").attr("class", "dimmed");
            jQuery(".popSelectMovie .popLayerFooter").addClass("dimmed");
        }
    }

    //극장 레이어 컨텐츠 높이, 선택영역, 버튼 Style 제어
    fnTheaterLayerSelectItemsShowHide = function(_isShow, _selData, _selCount){
        if(_isShow){
            jQuery(".popSelectCinema_contentL").css("height", "88%");
            jQuery(".popSelectCinema_contentR").css("height", "88%");
            jQuery(".popSelectCinema .popLayerSelect").html(_selData);
            jQuery('.popSelectCinema .popLayerSelect').css("display", "block");
            jQuery('.popSelectCinema .popLayerFooter a').attr('data-count', _selCount);
            jQuery('.popSelectCinema .popLayerFooter a').removeClass("dimmed");
            jQuery('.popSelectCinema .popLayerFooter').removeClass("dimmed");
        }else{
            jQuery(".popSelectCinema_contentL").css("height", "100%");
            jQuery(".popSelectCinema_contentR").css("height", "100%");
            jQuery(".popSelectCinema .popLayerSelect").html("");
            jQuery('.popSelectCinema .popLayerSelect').css("display", "none");
            jQuery('.popSelectCinema .popLayerFooter a').attr('data-count', 0);
            jQuery('.popSelectCinema .popLayerFooter a').attr('class', 'dimmed');
            jQuery('.popSelectCinema .popLayerFooter').addClass('dimmed');
        }
    }

})(jQuery);
