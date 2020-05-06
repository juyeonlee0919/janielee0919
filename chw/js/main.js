/*
작성일 : 2018.03.30
작성자 : SEWON.SEO
설명 : CGV Default
*/
var screenId = 'HOME'; // HOME/EVENT/STORE/MY
var bodyWidth = $(document).width();
var screenHeight = screen.height;
var mcTitle = $('.cgvMovieChartTitle');
var mcList00 = $('#movieChartList_0_0');
var scList00 = $('#specialChartList_0_0');
var cgvMcharLen = $('#ulCgvMovieChart >li').length;
var nextMCharLen = $('#ulNextMovieChart > li').length;

var cgvMchartCont = $('.cgvMovieChartContent');
var cgvMchartContLi = cgvMchartCont.children('li');
var mcPaddingLeft =  cgvMchartCont.css('padding-left') ? Number(cgvMchartCont.css('padding-left').replace('px', '')) : 0;          /*무비차트 왼쪽 여백*/
var mcPaddingRight = cgvMchartCont.css('padding-right') ? Number(cgvMchartCont.css('padding-right').replace('px', '')) : 0;          /*무비차트 왼쪽 여백*/

var cgvSchartCont = $('.onlyCGVSpecialContent');
var cgvSchartContLi = cgvSchartCont.children('li');
var scPaddingLeft =  cgvSchartCont.css('padding-left') ? Number(cgvSchartCont.css('padding-left').replace('px', '')) : 0;          /*3열차트 왼쪽 여백*/
var scPaddingRight = cgvSchartCont.css('padding-right') ? Number(cgvSchartCont.css('padding-right').replace('px', '')) : 0;          /*3열차트 왼쪽 여백*/

var mcScrollLeft = 0;
var mcLMargin = 5;
if(cgvMchartContLi.length > 0) {
    mcLMargin = Number(cgvMchartContLi.eq(1).css('margin-left').replace('px', ''));
}

var msList = $('.favoriteFpList');
var msListLi = msList.children('li');
var msListLiLen = msListLi.length;
var msListPaddingLeft =  msList.css('padding-left') ? Number(msList.css('padding-left').replace('px', '')) : 0;
var msListPaddingRight = msList.css('padding-right') ? Number(msList.css('padding-right').replace('px', '')) : 0;
var msListLiMarginLeft = 14;
if (msListLiLen >= 1) {
    msListLiMarginLeft = Number(msListLi.eq(1).css('margin-left').replace('px', ''));
}
var mcScrollLeft = 0;
var msScrollLeft = 0;
var orient_flag = false;
var fanPageRow = 10;
var iPage = 1;
var isFanListMore = true;
var fanSpon = true;
var arrMovieIdx = $("#hidArrMidx").val();

window.onorientationchange = function () {
    var orientation = window.orientation;
    if (orientation == 0) {
        orient_flag = true;
    }
    else {
        orient_flag = true;
    }
}

/*화면 크기에 맞게  무비차트 포스터 이미지 로드*/
function fnReSizeMovieChartImgSet(obj) {
    var ulObj = obj.children("ul");
    var IiObj = ulObj.children("li");
    var objLen = IiObj.length;

    // 이미지 load  alt 속성 추가
    var _chgW = mcPaddingLeft;
    for (var i = 0; i < objLen; i++) {
        if (bodyWidth > _chgW) {
            var _chObj = IiObj.eq(i).find('.imgPoster');
            if (typeof _chObj != "undefined" && typeof _chObj.attr("src") === "undefined" && typeof _chObj.attr("data-src") && _chObj.hasClass("imgPoster")) {
                var dataSrc = _chObj.attr("data-src").split('|');
                _chObj.attr("data-src", "");
                _chObj.removeClass("imgPoster");
                _chObj.attr("src", dataSrc[1]).hide().fadeIn(500).attr("alt",dataSrc[0]);
            }
        }
        _chgW = _chgW + IiObj.eq(i).outerWidth(true) + mcLMargin;
    }

    /* 광고 url 호출  */
    if (ulObj.children("li .ad").length > 0) {

        var _width = 0;
        IiObj.each(function () {
            _width = $(this).outerWidth(true) + _width + mcLMargin;
        });
        var _sumWidth = mcPaddingLeft + _width + mcPaddingRight;
        if (bodyWidth >= _sumWidth) {
            /* 포스터 이미지가 화면엔에 다들어올 경우(포스터 이미지가 한개 두개인경우) */
            ulObj.children("li .ad").each(function(e) {
                var adCntUrl = $(this).find('input:hidden');

                if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() != "") {
                    $.ajax({
                        url: adCntUrl.val(),
                        dataType: "jsonp",
                        async: true,
                        success: function(data) {
                        }
                    });
                    adCntUrl.val('');
                }
            });
        }
        else {
            /*현재 화면안에 들어있는 포스터 중에 광고가 있다면 ad url 호출한다.*/
            var _sltWidth = IiObj.eq(0).outerWidth(true) + mcLMargin;
            var _maxIndex = Math.floor((bodyWidth + mcScrollLeft) / _sltWidth);

            for (var i = 0; i < _maxIndex; i++) {
                var adCntUrl = IiObj.eq(i).find('input:hidden');
                if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() !== "") {
                    $.ajax({
                        url: adCntUrl.val(),
                        dataType: "jsonp",
                        async: true,
                        success: function (data) {

                        }
                    });
                    adCntUrl.val('');
                }
            }
        }
    }
}

/*화면 크기에 맞게  3열차트 포스터 이미지 로드*/
function fnReSizeSpecialChartImgSet(obj) {

    var ulObj = obj.children("ul");
    var IiObj = ulObj.children("li");
    var DivObj = IiObj.children("div");
    var objLen = DivObj.length;

    // 이미지 load  alt 속성 추가
    var _chgW = scPaddingLeft;
    for (var i = 0; i < objLen; i++) {

        var _chObj = DivObj.eq(i).find('.imgPoster');

        if (typeof _chObj != "undefined" && typeof _chObj.attr("src") === "undefined" && typeof _chObj.attr("data-src") && _chObj.hasClass("imgPoster")) {
            var dataSrc = _chObj.attr("data-src").split('|');
            _chObj.attr("data-src", "");
            _chObj.removeClass("imgPoster");
            _chObj.attr("src", dataSrc[1]).hide().fadeIn(500).attr("alt",dataSrc[0]);
        }
        _chgW = _chgW + IiObj.eq(i).outerWidth(true) + mcLMargin;
    }

    /* 광고 url 호출  */
    ulObj.children("li").children("div.ad").each(function(e) {
        var adCntUrl = $(this).find('input:hidden');

        if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() != "") {
            $.ajax({
                url: adCntUrl.val(),
                dataType: "jsonp",
                async: true,
                success: function(data) {
                },
                error: function()
                {
                    console.log("error");
                }
            });
            adCntUrl.val('');
        }
    });
}



// 웹뷰일 때 무비차트 포스터 미리 로드
function fnMovieChartImageEarlyLoad(obj) {
    var _target = obj.children('.cgvMovieChartContent');
    var _children = _target.children('li');
    var _sltWidth = _children.eq(0).outerWidth(true) + mcLMargin;

    if (_target.children('li').length > 0) {
        var imgAlt = "포스터 이미지";
        _children.each(function (e) {
            if($(this).attr("data-src")){
                imgAlt = $(this).attr("data-src");
            }

            /* 이미지 road */
            var _ofsW = $(this).offset().left;
            var _chObj = $(this).find('.imgPoster');

            if (typeof _chObj != "undefined" && typeof _chObj.attr("src") === "undefined" && typeof _chObj.attr("data-src") != "undefined") {
                var dataSrc = _chObj.attr("data-src").toString().split('|');
                _chObj.attr("data-src", "");
                _chObj.removeClass("imgPoster");
                _chObj.attr("src", dataSrc[1]).attr("alt",dataSrc[0]);
            }

            /* 광고 url */
            var _w = Number(bodyWidth - _sltWidth);
            var adCntUrl = $(this).find('input:hidden');
            if (_w >= _ofsW) {
                if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() != "") {
                    $.ajax({
                        url: adCntUrl.val(),
                        dataType: "jsonp",
                        async: true,
                        success: function (data) {
                        }
                    });
                    adCntUrl.val('');
                }
            }
        });
    }
}

function fnSpecialChartImageEarlyLoad(obj) {
    var _target = obj.children('.onlyCGVSpecialContent');
    var _children = _target.children('li');
    var _sltWidth = _children.eq(0).outerWidth(true) + mcLMargin;

    if (_target.children('li').length > 0) {
        var imgAlt = "포스터 이미지";
        _children.each(function (e) {
            if($(this).attr("data-src")){
                imgAlt = $(this).attr("data-src");
            }

            /* 이미지 road */
            var _ofsW = $(this).offset().left;
            var _chObj = $(this).find('.imgPoster');

            if (typeof _chObj != "undefined" && typeof _chObj.attr("src") === "undefined" && typeof _chObj.attr("data-src") != "undefined") {
                var dataSrc = _chObj.attr("data-src").toString().split('|');
                _chObj.attr("data-src", "");
                _chObj.removeClass("imgPoster");
                _chObj.attr("src", dataSrc[1]).attr("alt",dataSrc[0]);
            }

            /* 광고 url */
            var _w = Number(bodyWidth - _sltWidth);
            var adCntUrl = $(this).find('input:hidden');
            if (_w >= _ofsW) {
                if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() != "") {
                    $.ajax({
                        url: adCntUrl.val(),
                        dataType: "jsonp",
                        async: true,
                        success: function (data) {
                        }
                    });
                    adCntUrl.val('');
                }
            }
        });
    }
}


function fnSpecialChartScrollEvent(obj) {

    var _target = obj.children('.onlyCGVSpecialContent');
    var _children = _target.children('li');

    var _sltWidth = _children.eq(0).outerWidth(true) + mcLMargin;
    var _width = 0;
    _children.each(function () {
        _width = $(this).outerWidth(true) + _width + mcLMargin;
    });

    if (_target.children('li').length > 0) {
        obj.on({
            scroll: function () {
                mcScrollLeft = $(this).scrollLeft();
                //var adCntindex = 0;
                var imgAlt = "포스터 이미지";
                _children.each(function (e) {

                    if($(this).attr("data-src")){
                        imgAlt = $(this).attr("data-src");
                    }

                    /* 이미지 road */
                    var _ofsW = $(this).offset().left;
                    var _chObj = $(this).find('.imgPoster');

                    if ((bodyWidth + (_sltWidth * 3)) >= _ofsW) {
                        if (typeof _chObj != "undefined" && typeof _chObj.attr("src") === "undefined" && typeof _chObj.attr("data-src") != "undefined") {
                            var dataSrc = _chObj.attr("data-src").toString().split('|');
                            _chObj.attr("data-src", "");
                            _chObj.removeClass("imgPoster");
                            _chObj.attr("src", dataSrc[1]).hide().fadeIn(500).attr("alt",dataSrc[0]);
                        }
                    }

                    /* 광고 url */
                    var _w = Number(bodyWidth - _sltWidth);
                    var adCntUrl = $(this).find('input:hidden');
                    if (_w >= _ofsW) {
                        if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() != "") {
                            $.ajax({
                                url: adCntUrl.val(),
                                dataType: "jsonp",
                                async: true,
                                success: function (data) {
                                }
                            });
                            adCntUrl.val('');
                        }
                    }
                });
            }
        });

    }
}

/* 무비차트 화면 스크롤 이벤트 발생시에 포스터 이미지 로드 */
function fnMovieChartScrollEvent(obj) {

    var _target = obj.children('.cgvMovieChartContent');
    var _children = _target.children('li');
    var _sltWidth = _children.eq(0).outerWidth(true) + mcLMargin;
    var _width = 0;
    _children.each(function () {
        _width = $(this).outerWidth(true) + _width + mcLMargin;
    });

    if (_target.children('li').length > 0) {
        obj.on({
            scroll: function () {
                mcScrollLeft = $(this).scrollLeft();
                //var adCntindex = 0;
                var imgAlt = "포스터 이미지";
                _children.each(function (e) {

                    if($(this).attr("data-src")){
                        imgAlt = $(this).attr("data-src");
                    }

                    /* 이미지 road */
                    var _ofsW = $(this).offset().left;
                    var _chObj = $(this).find('.imgPoster');

                    if ((bodyWidth + (_sltWidth * 3)) >= _ofsW) {
                        if (typeof _chObj != "undefined" && typeof _chObj.attr("src") === "undefined" && typeof _chObj.attr("data-src") != "undefined") {
                            var dataSrc = _chObj.attr("data-src").toString().split('|');
                            _chObj.attr("data-src", "");
                            _chObj.removeClass("imgPoster");
                            _chObj.attr("src", dataSrc[1]).hide().fadeIn(500).attr("alt",dataSrc[0]);
                        }
                    }

                    /* 광고 url */
                    var _w = Number(bodyWidth - _sltWidth);
                    var adCntUrl = $(this).find('input:hidden');
                    if (_w >= _ofsW) {
                        if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() != "") {
                            $.ajax({
                                url: adCntUrl.val(),
                                dataType: "jsonp",
                                async: true,
                                success: function (data) {
                                }
                            });
                            adCntUrl.val('');
                        }
                    }
                });
            }
        });

    }
}



/* 무비셀렉션(좋아할만한 팬페이지) 포스터 이미지 로드 및 AD CNT URL 호출  */
function fnMovieSelectionImgSetAdCntUrlCall() {
    if (msListLiLen > 0) {
        var _width = 0;
        msListLi.each(function () {
            _width = $(this).outerWidth(true) + _width + msListLiMarginLeft;
        });
        var tBodyWidth = ((bodyWidth + msScrollLeft) - msListPaddingLeft);
        var tLiWidth = (_width / msListLiLen);
        var sCnt = Math.ceil((tBodyWidth / tLiWidth)); /*현재 화면에 노출된 무비셀렉션 카운트(조금이라도 노출되면 포함)*/

        var hidMovieSelection = $('input[name="hidMovieSelection"]');

        for (var i = 0; i < sCnt; i++) {

            var _video = msListLi.eq(i).find('video');
            if (typeof _video != "undefined" && typeof _video.attr("poster") === "undefined" && typeof _video.attr("data-src")) {
                var _poster = _video.attr("data-src");
                _video.attr("data-src", "");
                //_video.attr("poster", _poster).hide().fadeIn(500);
                if(!_video.parent().find('.poster_img').length>0) {
                    $('<img src="'+_poster+'" class="poster_img">').insertAfter(_video);
                    _video.parent().find('.poster_img').hide().fadeIn(500);
                }
            }

            /* 광고 Count Url */
            var adCntUrl = $(hidMovieSelection[i]);

            if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() != "") {
                $.ajax({
                    url: adCntUrl.val(),
                    dataType: "jsonp",
                    async: true,
                    success: function (data) {
                    }
                });
                adCntUrl.val('');
            }
        }
    }
}

/* 무비 셀렉션 스크롤 이벤트*/
function fnMovieSelectionScrollEvent() {
    if (msListLiLen > 0) {
        var _width = 0;
        msListLi.each(function () {
            _width = $(this).outerWidth(true) + _width + msListLiMarginLeft;
        });
        var _sumWidth = msListPaddingLeft + _width + msListPaddingRight;
        if (bodyWidth < _sumWidth) {

            $('.favoriteFpContents').on({
                scroll: function () {

                    msScrollLeft = $(this).scrollLeft();
                    var _sltWidth = msListLi.eq(0).outerWidth(true) + msListLiMarginLeft;
                    var _index = 0;
                    msListLi.each(function (e) {

                        var _ofsW = $(this).offset().left;
                        var adCntUrl = $(this).find('input:hidden');
                        var _nw = bodyWidth - Number(_sltWidth);

                        /* 포스터 이미지 노출 처리 */
                        if ((_nw + ($(this).outerWidth(true) + msListLiMarginLeft) * 2) >= _ofsW) {
                            var _video = $(this).find('video');
                            if (typeof _video != "undefined" && typeof _video.attr("poster") === "undefined" && typeof _video.attr("data-src")) {
                                var _poster = _video.attr("data-src");
                                _video.attr("data-src", "");
                                //_video.attr("poster", _poster).hide().fadeIn(500);
                                if(!_video.parent().find('.poster_img').length>0) {
                                    $('<img src="'+_poster+'" class="poster_img">').insertAfter(_video);
                                    _video.parent().find('.poster_img').hide().fadeIn(500);
                                }
                            }
                        }

                        if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() != "") {
                            _index++;
                        }

                        /* 광고 url */
                        var _w = Number(bodyWidth - _sltWidth);
                        var adCntUrl = $(this).find('input:hidden');
                        if (_w >= _ofsW) {
                            if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() != "") {
                                $.ajax({
                                    url: adCntUrl.val(),
                                    dataType: "jsonp",
                                    async: true,
                                    success: function (data) {
                                    }
                                });
                                adCntUrl.val('');
                            }
                        }
                    });

                    if (_index == 0) {
                        $('.favoriteFpContents').off({
                            scroll: null
                        });
                    }
                }
            });
        }
    }
}

/* 웹뷰 무비 셀렉션 이미지 미리 로드*/
function fnMovieSelectionImageEarlyLoad() {
    if (msListLiLen > 0) {
        var _sltWidth = msListLi.eq(0).outerWidth(true) + msListLiMarginLeft;
        var _index = 0;
        msListLi.each(function (e) {

            var _ofsW = $(this).offset().left;
            var adCntUrl = $(this).find('input:hidden');
            var _nw = bodyWidth - Number(_sltWidth);

            /* 포스터 이미지 노출 처리 */
            var _video = $(this).find('video');
            if (typeof _video != "undefined" && typeof _video.attr("poster") === "undefined" && typeof _video.attr("data-src")) {
                var _poster = _video.attr("data-src");
                _video.attr("data-src", "");
                //_video.attr("poster", _poster).hide().fadeIn(500);
                if(!_video.parent().find('.poster_img').length>0) {
                    $('<img src="'+_poster+'" class="poster_img">').insertAfter(_video);
                    _video.parent().find('.poster_img').hide().fadeIn(500);
                }
            }

            if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() != "") {
                _index++;
            }

            /* 광고 url */
            var _w = Number(bodyWidth - _sltWidth);
            var adCntUrl = $(this).find('input:hidden');
            if (_w >= _ofsW) {
                if (typeof adCntUrl != "undefined" && typeof adCntUrl.val() != "undefined" && adCntUrl.val() != "") {
                    $.ajax({
                        url: adCntUrl.val(),
                        dataType: "jsonp",
                        async: true,
                        success: function (data) {
                        }
                    });
                    adCntUrl.val('');
                }
            }
        });

        if (_index == 0) {
            $('.favoriteFpContents').off({
                scroll: null
            });
        }
    }
}

function fnVideoTopAdSet() {
    var videoAd = $("#videoTopAD");
    var _poster = videoAd.attr("data-src");
    videoAd.attr("data-src", "");
    //videoAd.attr("poster", _poster).hide().fadeIn(500);
    if(!videoAd.parent().find('.poster_img').length>0) {
        $('<img src="'+_poster+'" class="poster_img">').insertAfter(videoAd);
        videoAd.parent().find('.poster_img').hide().fadeIn(500);
    }
}

/*영상 광고 더보기*/
function fnGetVideoAdList() {
    /* Return Tyep html */
    jQuery.ajax({
        type: "GET",
        url: "/WebAPP/MainV5/ajaxMovieADList.aspx",
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        async: true,
        success: function (html) {
            $("#videoAdList").empty();
            $("#videoAdList").append(html);

            $('input[name="hidAdList"]').each(function() {
                fnMmovieAdCntUrl($(this));
            });
        },
        error: function (xhr, status, err) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

/* 팬페이지 스폰서 목록 */
function fnGetSponsorList() {
    jQuery.ajax({
        type: "GET",
        url: "/WebAPP/MainV5/ajaxFanpageList.aspx?listType=CONT_SPON_LIST&pIdx=" + iPage + "&arrMidx=" + arrMovieIdx,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        async: true,
        success: function (html) {
            $("#sponsorList").empty();
            $("#sponsorList").append(html);
            fnMmovieAdCntUrl($("#hidSponAdClip"));
        },
        complete: function (data) {

        },
        error: function (xhr, status, err) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

/* 팬페이지 목록  */
function fnGetFanpageList() {
    if (iPage > 3) {
        return;
    }
    /* Return Tyep html */
    $(window).startLoading({ 'bgDim': false }); // 로딩바 호출

    jQuery.ajax({
        type: "GET",
        url: "/WebAPP/MainV5/ajaxFanpageList.aspx?listType=CONT_LIST&pIdx=" + iPage + "&arrMidx=" + arrMovieIdx,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        async: true,
        success: function (html) {
            var pHtml = $.parseHTML(html);
            var tDiv = "";
            tDiv = $('<div />', {}).html(pHtml);
            if (tDiv.children('li').length == fanPageRow) {
                isFanListMore = true;
                iPage++;
            }
            $("#fanList").append(html);
        },
        complete : function(data) {
            $(window).stopLoading(); // 로딩바 종료
        },
        error: function (xhr, status, err) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

/*팬페이지 지금 예매*/
var gHtml ="";
function fnFanNowMReserve(movieIdx,mGroupCd,mTitle) {

    $(window).startLoading({ 'bgDim': false });

    fnFanGrade(movieIdx,mGroupCd,mTitle).done(function() {
        fnFanMovieType(movieIdx, mGroupCd, mTitle);
    });
}

/*팬페이지 관람등급*/
function fnFanGrade(movieIdx) {
    var Result = $.ajax({
        type: 'POST',
        url: '/WebApp/MainV5/ajaxFanpageContSet.aspx/getFanMovieGrade',
        data: "{ mIdx: '" + movieIdx + "'}",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {

            var rData = $.parseJSON(data.d);
            if(rData.Grade == "919") {
                gHtml = "이 영화는 <strong class='gradesoon' >상영등급미정</strong>영화입니다.";
            }
            else if(rData.Grade =="233"){
                gHtml="이 영화는 <strong class='gradeAll' >전체관람가</strong>영화입니다.";
            }
            else if(rData.Grade =="232"){
                gHtml="이 영화는 <strong class='grade19' >청소년관람불가</strong>영화입니다.";
            }
            else if(rData.Grade =="231"){
                gHtml="이 영화는 <strong class='grade15' >15세이상관람가</strong>영화입니다.";
            }
            else if(rData.Grade =="230"){
                gHtml="이 영화는 <strong class='grade12' >12세이상관람가</strong>영화입니다.";
            }
        }
    });
    return Result;
}

/*팬페이지 영화 속성*/
function fnFanMovieType(movieIdx, mGroupCD, mTitle) {
    $.ajax({
        type: 'POST',
        url: '/WebApp/MainV5/ajaxFanpageContSet.aspx/getFanMovieType',
        data: "{ mIdx: '" + movieIdx + "'}",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            var rData = $.parseJSON(data.d);
            var layerShowType = false;
            var qUrl ="http://m.cgv.co.kr/WebApp/Reservation/quickResult.aspx?MovieIdx=" + movieIdx;
            $("#fanPopLayerNowMReserve").empty();
            var fanNowReserveHtml="";
            fanNowReserveHtml="<li><a href=javascript:openNewWebViewV5('"+ qUrl +"&sm_type=','','H-37','','"+ mGroupCD +"','" + mTitle + "','00'); class='btn'>전체</a></li>";

            if(rData.M3D_YN == "Y"){
                fanNowReserveHtml = fanNowReserveHtml +"<li><a href=javascript:openNewWebViewV5('"+ qUrl +"&sm_type=3D','','H-37','','"+ mGroupCD +"','" + mTitle + "','02'); class='btn'>3D로 예매</a></li>";
                layerShowType =  true;
            }
            if(rData.SCREENX_YN == "Y"){
                layerShowType =  true;
                fanNowReserveHtml = fanNowReserveHtml +"<li><a href=javascript:openNewWebViewV5('"+ qUrl +"&sm_type=SCREENX','','H-37','','"+ mGroupCD +"','" + mTitle + "','00'); class='btn'>ScreenX로 예매</a></li>";
            }

            var arrKind = rData.RKIND.split('^');
            if(arrKind.length > 0)
            {
                for(var i = 0; i <= arrKind.length;i++)
                {
                    if(arrKind[i]=="412")
                    {
                        layerShowType =  true;
                        fanNowReserveHtml = fanNowReserveHtml +"<li><a href=javascript:openNewWebViewV5('"+ qUrl +"&sm_type=IMAX','','H-37','','"+ mGroupCD +"','" + mTitle + "','04'); class='btn'>IMAX로 예매</a></li>";
                    }
                    if(arrKind[i]=="1969")
                    {
                        layerShowType =  true;
                        fanNowReserveHtml = fanNowReserveHtml +"<li><a href=javascript:openNewWebViewV5('"+ qUrl +"&sm_type=4DX','','H-37','','"+ mGroupCD +"','" + mTitle + "','03'); class='btn'>4DX로 예매</a></li>";
                    }
                    if(arrKind[i]=="411")
                    {
                        fanNowReserveHtml = fanNowReserveHtml +"<li><a href=javascript:openNewWebViewV5('"+ qUrl +"&sm_type=2D','','H-37','','"+ mGroupCD +"','" + mTitle + "','01'); class='btn'>일반(2D)로 예매</a></li>";
                    }
                }
            }

            if(layerShowType)
            {
                $(window).nowTicketingOpenPopupLayer();
                $("#fanGrade").html(gHtml);
                var pHtml = $.parseHTML(fanNowReserveHtml);
                $("#fanPopLayerNowMReserve").append(pHtml);
            }
            else{
                if (cgv.common.StandardInfo.IsWebView) {
                    //CGVHAAppInterface.MoveAppLogin();
                    //CGVHAAppInterface.ReserveFromMovieInfoV4(movieIdx, encodeURIComponent(mTitle), "", "");
                    var appUrl = 'http://m.cgv.co.kr/WebApp/Reservation/quickResult.aspx?MovieIdx=' + movieIdx + '&sm_type=';
                    openNewWebViewV5(appUrl,'','H-37','', mGroupCD , mTitle,'00');
                }
                else
                {
                    fnSendGALog('1', '', 'MW_홈', '팬페이지_지금예매', '');
                    window.location.href ="http://m.cgv.co.kr/WebApp/Reservation/quickResult.aspx?MovieIdx=" + movieIdx + "&sm_type=";
                }
            }

        },
        complete: function () {
            $(window).stopLoading();
        }
    });
}

/*팬페이지 좋아요 공유하기*/
function fnFanpageContSet(act, movieIdx, contentsIdx, sUrl,title,desc,imgUrl) {

    if ((act == "CONT_GOOD") && (!cgv.common.StandardInfo.IsLogin) ) {
        if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
            if (cgv.common.StandardInfo.IsWebView) {
                CGVHAAppInterface.MoveAppLogin();
            } else {
                window.location.href = g_url_login;
            }
        }
        else {
            return false;
        }
    }
    else {
        if (act == "CONT_SHARE") {
            $("#hidFanShareUrl").val(sUrl);
            $("#hidFanShareTitle").val(title);
            $("#hidFanShareDesc").val(desc);
            $("#hidFanShareImgUrl").val(imgUrl);

            if (cgv.common.StandardInfo.IsWebView) {
                fnAppShare(movieIdx,title,sUrl);
            }
            else{
                $(window).shareOpenPopupLayer();
            }
        }

        if ((act != "CONT_GOOD") && (act != "CONT_SHARE")) {
            alert("오류가 발생하였습니다. 다시 시도해주시기 바랍니다.");
            return false;
        }

        if ((movieIdx == "") && (contentsIdx == "")) {
            alert("오류가 발생하였습니다. 다시 시도해주시기 바랍니다.");
            return false;
        }

        var jsonData = "{act: '" + act + "',movieIdx:'" + movieIdx + "' ,contentsIdx:'" + contentsIdx + "'}";
        jQuery.ajax({
            type: "POST",
            url: "/WebAPP/MainV5/ajaxFanpageContSet.aspx/getFanpageContSet",
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (data) {
                var rData = $.parseJSON(data.d);
                if (act == "CONT_GOOD") {
                    var objLikeCnt = $("#fanLikeCnt_" + movieIdx + "_" + contentsIdx);
                    var likeCnt = Number(objLikeCnt.attr("data-src"));

                    if (rData.DataVal == "0") {
                        likeCnt++;
                        if (!$("#btnFanLike_" + movieIdx + "_" + contentsIdx).hasClass("active")) {
                            $("#btnFanLike_" + movieIdx + "_" + contentsIdx).addClass("active");
                        }
                    }
                    else if (rData.DataVal == "1") {
                        likeCnt--;
                        if ($("#btnFanLike_" + movieIdx + "_" + contentsIdx).hasClass("active")) {
                            $("#btnFanLike_" + movieIdx + "_" + contentsIdx).removeClass("active");
                        }
                    }
                    objLikeCnt.attr("data-src", likeCnt);
                    objLikeCnt.html("좋아요 " + likeCnt);
                }
                else {
                    var objShareCnt = $("#fanShareCnt_" + movieIdx + "_" + contentsIdx);
                    var shareCnt = Number(objShareCnt.attr("data-src"));

                    if (rData.DataVal == "0") {
                        shareCnt++;
                    }
                    objShareCnt.attr("data-src", shareCnt);
                    objShareCnt.html("공유 " + NumberWithCommas(shareCnt) + "건");
                }
            },
            error: function (xhr, status, err) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }
}


function fnAppShare(movieIdx, movieName, sUrl) {
    var jsonData = "{shareUrl: '" + sUrl + "'}";
    var retUrl ="";
    jQuery.ajax({
        type: "POST",
        url: "/WebAPP/MainV5/ajaxFanpageContSet.aspx/getFanShareShortUrl",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {
            var rData = $.parseJSON(data.d);

            retUrl = rData.sUrl;

            try {
                CGVHAAppInterface.FanPageRequestSystemShareV2(movieIdx, movieName, retUrl);
            }
            catch (e) {
            }
            finally {
            }

        },
        error: function (xhr, status, err) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}


/*굿 리뷰어 클릭 이벤트*/
function fnGoodReviewer(url, eventAction, eventLabel) {
    // Google Analytics Tag
    var eventCategory = "MW_홈";
    if (cgv.common.StandardInfo.IsWebView) {
        eventCategory = "MA_홈";
    }
    fnSendGALog('1', '', eventCategory, eventAction, eventLabel);
    // APP 웹뷰로 열기
    if (cgv.common.StandardInfo.IsWebView == true && cgv.common.StandardInfo.AppVersion >= 433) {
        CGVHAAppInterface.EventBannerCall('2', encodeURIComponent(url));
    }
    else {
        window.location.href = url;
    }
}

/*굿 리뷰어 좋아요*/
var btnGReviewerFlag = false;
function fnGReviewerLike(movieIdx, contentsIdx, eventLabel) {

    if (!cgv.common.StandardInfo.IsLogin) {
        if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
            if (cgv.common.StandardInfo.IsWebView) {
                CGVHAAppInterface.MoveAppLogin();
            } else {
                window.location.href = g_url_login;
            }
        }
        else {
            return false;
        }
    }
    else{
        if ((movieIdx == "") && (contentsIdx == "")) {
            alert("오류가 발생하였습니다. 다시 시도해주시기 바랍니다.");
            return false;
        }

        if (btnGReviewerFlag) {
            alert("전송중입니다. 잠시후 시도해주시기 바랍니다.");
        }
        btnGReviewerFlag = true;

        var gBtn = $("#GReviewerBtn");
        var likeCnt = gBtn.attr("data-src");
        if (likeCnt == "") {
            likeCnt = "0";
        }

        if (gBtn.hasClass("active")) {
            type = "DEL";
        }
        else {
            type = "REG";
        }

        var jsonData = "{movieIdx:'" + movieIdx + "' ,contentsIdx:'" + contentsIdx + "',gType:'"+ type +"'}";
        jQuery.ajax({
            type: "POST",
            url: "/WebAPP/MainV5/ajaxFanpageContSet.aspx/getGReviewerLike",
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (data) {
                var rData = $.parseJSON(data.d);
                gBtn.html(rData.totalCnt + "명ㆍ공감해요");
                if (type == "DEL") {

                    if (gBtn.hasClass("active")) {
                        gBtn.removeClass("active");
                    }
                }
                if (type == "REG") {
                    if (!gBtn.hasClass("active")) {
                        gBtn.addClass("active");
                    }
                }
            },
            complete: function (data) {
                btnGReviewerFlag = false;
            },
            error: function (xhr, status, err) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }
}


/*굿 리뷰어 볼래요*/
function fnFanpageME(movieIdx) {

    if (!cgv.common.StandardInfo.IsLogin) {
        if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
            if (cgv.common.StandardInfo.IsWebView) {
                CGVHAAppInterface.MoveAppLogin();
            } else {
                window.location.href = g_url_login;
            }
        }
        else {
            return false;
        }
    }
    else {
        if ((movieIdx == "") && (contentsIdx == "")) {
            alert("오류가 발생하였습니다. 다시 시도해주시기 바랍니다.");
            return false;
        }

        var jsonData = "{movieIdx:'" + movieIdx + "'}";
        jQuery.ajax({
            type: "POST",
            url: "/WebAPP/MainV5/ajaxFanpageContSet.aspx/getGReviewerME",
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (data) {
                var rData = $.parseJSON(data.d);
                var objLikeCnt = $("#fanFanMECnt_" + movieIdx);
                var likeCnt = Number(objLikeCnt.attr("data-src"));
                if (rData.DataVal == "0") {
                    likeCnt++;
                    if (!$("#btnFanME_" + movieIdx).hasClass("active")) {
                        $("#btnFanME_" + movieIdx).addClass("active");
                    }
                }
                else if (rData.DataVal == "1") {
                    likeCnt--;
                    if ($("#btnFanME_" + movieIdx).hasClass("active")) {
                        $("#btnFanME_" + movieIdx).removeClass("active");
                    }
                }
                objLikeCnt.attr("data-src", likeCnt);
                objLikeCnt.html(likeCnt);
            },
            error: function (xhr, status, err) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }
}

/*팬페이지 메인 이동*/
function fnGoFanMain(url) {
    if (cgv.common.StandardInfo.IsWebView == true) {
        CGVHAAppInterface.EventBannerCall('2', encodeURIComponent(url));
    }
    else {
        window.location.href = url;
    }
}

/*팬페이지 컨텐츠 상세이동*/
function fnGoFanCommentTxt(url) {
    if (cgv.common.StandardInfo.IsWebView == true) {
        if((url.indexOf("cgv.co.kr") > -1) || (url.indexOf("cgv.kr") > -1)) {
            CGVHAAppInterface.EventBannerCall('2', encodeURIComponent(url));
        }
        else {
            CGVHAAppInterface.EventBannerCall('3', encodeURIComponent(url));
        }
    }
    else {
        if((url.indexOf("cgv.co.kr") > -1) || (url.indexOf("cgv.kr") > -1)){
            window.location.href = url;
        }
        else {
            window.open(decodeURIComponent(url));
        }
    }
}

/*팬페이지 컨텐츠 상세이동*/
function fnGoFanComment(act, url, mIdx, cIdx) {

    // 조회수 +
    var jsonData = "{act: '" + act + "',movieIdx:'" + mIdx + "' ,contentsIdx:'" + cIdx + "'}";
    jQuery.ajax({
        type: "POST",
        url: "/WebAPP/MainV5/ajaxFanpageContSet.aspx/getFanpageContSet",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {
        },
    });

    if (cgv.common.StandardInfo.IsWebView == true && cgv.common.StandardInfo.AppVersion >= 433) {
        CGVHAAppInterface.EventBannerCall('2', encodeURIComponent(url));
    }
    else {
        window.location.href = url;
    }
}

function fnGoFanCommentV2(act, url, mIdx, cIdx) {
    if (cgv.common.StandardInfo.IsWebView) {
        if (!cgv.common.StandardInfo.IsLogin) {
            if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
                if (cgv.common.StandardInfo.IsWebView == true && cgv.common.StandardInfo.AppVersion >= 433) {
                    CGVHAAppInterface.EventBannerCall('2', "/WebApp/MemberV4/Login.aspx?RedirectURL=" + encodeURIComponent(encodeURIComponent(url)));
                }
                else {
                    window.location.href = url;
                }
            }
            else {
                return false;
            }
        }
        else {
            // 조회수 +
            var jsonData = "{act: '" + act + "',movieIdx:'" + mIdx + "' ,contentsIdx:'" + cIdx + "'}";
            jQuery.ajax({
                type: "POST",
                url: "/WebAPP/MainV5/ajaxFanpageContSet.aspx/getFanpageContSet",
                data: jsonData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (data) {
                },
            });

            if (cgv.common.StandardInfo.IsWebView == true && cgv.common.StandardInfo.AppVersion >= 433) {
                CGVHAAppInterface.EventBannerCall('2', encodeURIComponent(url));
            }
            else {
                window.location.href = url;
            }
        }

    }
    else{
        if (!cgv.common.StandardInfo.IsLogin) {
            if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
                window.location.href = "/WebApp/Member/Login.aspx?RedirectURL=" + encodeURIComponent(url);
            }
            else {
                return false;
            }
        }
        else {
            // 조회수 +
            var jsonData = "{act: '" + act + "',movieIdx:'" + mIdx + "' ,contentsIdx:'" + cIdx + "'}";
            jQuery.ajax({
                type: "POST",
                url: "/WebAPP/MainV5/ajaxFanpageContSet.aspx/getFanpageContSet",
                data: jsonData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (data) {
                },
            });

            if (cgv.common.StandardInfo.IsWebView == true && cgv.common.StandardInfo.AppVersion >= 433) {
                CGVHAAppInterface.EventBannerCall('2', encodeURIComponent(url));
            }
            else {
                window.location.href = url;
            }
        }
    }
}

/* 나만에 차트 펼침 클릭 하면 광고 설정 */
function fnPersonalAdSet(iframeSrc) {
    // GA Tag
    var eventCategory = "MW_홈";
    if (cgv.common.StandardInfo.IsWebView) {
        eventCategory = "MA_홈";
    }
    fnSendGALog('1', '', eventCategory, '나만의차트_더보기', '');
    $("#personalAdFrame").attr("src", iframeSrc);


}

/* 영상광고 ADCNT URL 호출 */
function fnMmovieAdCntUrl(obj) {
    if (typeof obj != "undefined" && typeof obj.val() != "undefined" && obj.val() != "") {
        var adCntUrl = obj.val();
        if (adCntUrl.indexOf("http") > -1) {
            $.ajax({
                url: adCntUrl,
                dataType: "jsonp",
                async: true,
                success: function (data) {
                }
            });
        }

        obj.remove();
    }
}

/* 영상 재생 카운트 체크 URL 호출 */
function fnAD_MOVIE_CNT_URL(adCntUrl) {
    if (adCntUrl != "") {
        if (adCntUrl.indexOf("http") > -1) {
            $.ajax({
                url: adCntUrl,
                dataType: "jsonp",
                async: true,
                success: function (data) {
                    //console.log(data);
                },
                error: function (data) {
                    //console.log("광고오류 : " + adCntUrl);
                }
            });
        }
    }
}

/*광고 페이지 이동*/
function fnAdLink(url, type) {
    if (type === "2") {
        if (cgv.common.StandardInfo.IsWebView === true && cgv.common.StandardInfo.AppVersion >= 433) {
            CGVHAAppInterface.EventBannerCall('2', encodeURIComponent(url));
        }
        else {
            location.href = url;
        }
    }
    else if (type === "3") {
        if (cgv.common.StandardInfo.IsWebView === true && cgv.common.StandardInfo.AppVersion >= 433) {
            CGVHAAppInterface.OutLink(encodeURIComponent(url), '0');
        }
        else {
            window.open(url);
        }
    }
    else if (type === "4") {
        if (cgv.common.StandardInfo.IsWebView === true && cgv.common.StandardInfo.AppVersion >= 433) {
            CGVHAAppInterface.OutLink(encodeURIComponent(url), '1');
        }
        else {
            window.open(url);
        }
    }
    else {
        if((url.indexOf("cgv.co.kr") > -1) || (url.indexOf("cgv.kr") > -1)) {
            if (cgv.common.StandardInfo.IsWebView === true && cgv.common.StandardInfo.AppVersion >= 433) {
                CGVHAAppInterface.EventBannerCall('2', encodeURIComponent(url));
            }
            else {
                location.href = url;
            }
        }
        else {
            if (cgv.common.StandardInfo.IsWebView === true && cgv.common.StandardInfo.AppVersion >= 433) {
                CGVHAAppInterface.OutLink(encodeURIComponent(url), '0');
            }
            else {
                window.open(url);
            }
        }
    }
}

/*주요메뉴 페이지 이동*/
function fnMainMenuLink(url, type) {
    if (cgv.common.StandardInfo.IsWebView == true && cgv.common.StandardInfo.AppVersion >= 433) {
        CGVHAAppInterface.EventBannerCall('2', encodeURIComponent(url));
    }
    else {
        if (type == "Y") {
            window.open(decodeURIComponent(url));
        }
        else {
            location.href = url;
        }
    }
}

/*CGV 무비차트 & 개봉예정작 화면사이즈에 맞게 이미지 설정 & 광고 url 호출.*/
function fnMovieChartImgAdCntSet() {
    fnReSizeMovieChartImgSet($('#movieChartList_0_0'));
}

function fnScrollOff(){
    $("#ulCgvMovieChart").children("li.active").each(function(e) {
        $(this).off({ scroll: null });
    });
    $("#ulNextMovieChart").children("li.active").each(function(e) {
        $(this).off({ scroll: null });
    });

    /*
    *  날짜 : 2018-11-20
    *  작업내용 : 메인에 아트하우스 메뉴추가로 인한 기능 추가
    *  작업자 : 윤필수
    */
    $("#ulArtMovieChart").children("li.active").each(function (e) {
        $(this).off({ scroll: null });
    });

    $("#ulOnlycgv").children("li.active").each(function (e) {
        $(this).off({ scroll: null });
    });

    $("#ulSpecialScreen").children("li.active").each(function (e) {
        $(this).off({ scroll: null });
    });
}

/*무비차트 키워드별 이벤트*/
$('.hashList > li').on({click: function (e) {
        var _parentIndex = $(e.target).parent('li').parents('li.active').index();
        var _Index = $(e.target).parent('li').index();
        var _target = $('#movieChartList_' + _parentIndex + '_' + _Index);

        // GA Tag
        var categoryName = "MW_홈";
        if (cgv.common.StandardInfo.IsWebView) {
            categoryName = "MA_홈";
        }

        //fnSendGALog('1', '', categoryName, $('.cgvMovieChartTitle .active')[0].textContent + "_" + $(e.target).parent('li')[0].innerText, '');

        fnScrollOff();

        fnReSizeMovieChartImgSet(_target);
        if (cgv.common.StandardInfo.IsWebView) {
            fnMovieChartImageEarlyLoad(_target);
        }
        else {
            fnMovieChartScrollEvent(_target);
        }
    }});

/*3열차트 키워드별 이벤트*/
$('.SpecialhashList > li').on({click: function (e) {
        var _parentIndex = $(e.target).parent('li').parents('li.active').index();
        var _Index = $(e.target).parent('li').index();
        var _target = $('#specialChartList_' + _parentIndex + '_' + _Index);

        ///console.log('#specialChartList_' + _parentIndex + '_' + _Index);

        // GA Tag
        var categoryName = "MW_홈";
        if (cgv.common.StandardInfo.IsWebView) {
            categoryName = "MA_홈";
        }
        //fnSendGALog('1', '', categoryName, $('.onlyCGVSpecialTitle .active')[0].textContent + "_" + $(e.target).parent('li')[0].innerText, '');

        fnScrollOff();

        fnReSizeSpecialChartImgSet(_target);

        if (cgv.common.StandardInfo.IsWebView) {
            fnSpecialChartImageEarlyLoad(_target);
        }
        else {
            fnSpecialChartScrollEvent(_target);
        }
    }});


$('.onlyCGVSpecialTitle > li').on({ click: function (e) {
        var _Index = $(e.target).parent('li').index();
        var _chIndex = 0;

        // GA Tag
        var categoryName = "MW_홈";
        if (cgv.common.StandardInfo.IsWebView) {
            categoryName = "MA_홈";
        }
        fnSendGALog('1', '', categoryName, $(e.target).parent('li')[0].innerText, '');

        $('.onlyCGVSpecialContainer > li').eq(_Index).find('.hashList').children('li').each(function (e) {
            if ($(this).hasClass('active')) {
                _chIndex = $(this).index();
            }
        });

        fnScrollOff();

        var _target = $('#specialChartList_' + _Index + "_" + _chIndex);

        fnReSizeMovieChartImgSet(_target);

        if (cgv.common.StandardInfo.IsWebView) {
            fnSpecialChartImageEarlyLoad(_target);
        }
        else {
            fnSpecialChartScrollEvent(_target);
        }
    }});

/*CGV 무비차트 & 개봉예정작 포스터 이미지 로드&& 광고 url 설정*/
$('.cgvMovieChartTitle > li').on({ click: function (e) {
        var _Index = $(e.target).parent('li').index();
        var _chIndex = 0;

        // GA Tag
        var categoryName = "MW_홈";
        if (cgv.common.StandardInfo.IsWebView) {
            categoryName = "MA_홈";
        }
        fnSendGALog('1', '', categoryName, $(e.target).parent('li')[0].innerText, '');

        $('.cgvMovieChartContainer > li').eq(_Index).find('.hashList').children('li').each(function (e) {
            if ($(this).hasClass('active')) {
                _chIndex = $(this).index();
            }
        });

        fnScrollOff();

        var _target = $('#movieChartList_' + _Index + "_" + _chIndex);
        fnReSizeMovieChartImgSet(_target);
        if (cgv.common.StandardInfo.IsWebView) {
            fnMovieChartImageEarlyLoad(_target);
        }
        else {
            fnMovieChartScrollEvent(_target);
        }
    }});

$(window).resize(function () {
    bodyWidth = $(window).width();
    var _parentIndex = $(".cgvMovieChartTitle").children("li.active").index();

    var _childIndex = 0;
    if (_parentIndex == 0) {
        _childIndex = $("#ulCgvMovieChart").children("li.active").index();
    }
    else if(_parentIndex == 1)
    {
        /*
        *  날짜 : 2018-11-20
        *  작업내용 : 메인에 아트하우스 메뉴추가로 인한 기능 추가
        *  작업자 : 윤필수
        */
        _childIndex = $("#ulArtMovieChart").children("li.active").index();
    }
    else {
        _childIndex = $("#ulNextMovieChart").children("li.active").index();
    }

    var _target = $('#movieChartList_' + _parentIndex + '_' + _childIndex);

    fnReSizeMovieChartImgSet(_target);
    fnMovieSelectionImgSetAdCntUrlCall();
});

$(window).resize(function () {
    bodyWidth = $(window).width();
    var _parentIndex = $(".onlyCGVSpecialTitle").children("li.active").index();

    var _childIndex = 0;
    if (_parentIndex == 0) {
        _childIndex = $("#ulOnlycgv").children("li.active").index();
    }
    else {
        _childIndex = $("#ulSpecialScreen").children("li.active").index();
    }

    var _target = $('#specialChartList_' + _parentIndex + '_' + _childIndex);

    fnReSizeMovieChartImgSet(_target);
});

jQuery(window).on({
    scroll: function () {
        fnMainScroll();
    }
});
function fnMainScroll(){
    //팬페이지 스폰서 광고 영상 이미지 처리
    if ($("#sponsorList").children("li").length > 0) {
        if (screenHeight >= $("#sponsorList").offset().top - jQuery(window).scrollTop()) {
            $("#sponsorList > li").each(function (index) {

                if($(this).attr("data-src"))
                {
                    var obj = $(this).attr("data-src").split('_');
                    if (obj[0] == "0") {
                        var fanImgObj = $("#fanImg_" + obj[2] + "_" + obj[1]);
                        if (typeof fanImgObj != "undefined" && typeof fanImgObj.attr("src") === "undefined" && typeof fanImgObj.attr("data-src")) {
                            var imgSrc = fanImgObj.attr("data-src");
                            fanImgObj.attr("data-src", "");
                            fanImgObj.attr("src", imgSrc).hide().fadeIn(500);
                        }
                    }
                    else {
                        var fanVideoObj = $("#fanVideo_" + obj[2] + "_" + obj[1]);
                        if (typeof fanVideoObj != "undefined" && typeof fanVideoObj.attr("poster") === "undefined" && typeof fanVideoObj.attr("data-src")) {
                            var posterSrc = fanVideoObj.attr("data-src");
                            fanVideoObj.attr("data-src", "");
                            fanVideoObj.attr("poster", posterSrc).hide().fadeIn(500);
                        }
                    }
                }
            });
        }
    }

    //팬페이지 동영상 또는 포스터 이미지 처리
    if ($("#fanList").children("li").length > 0) {
        if (screenHeight >= $("#fanList").offset().top - jQuery(window).scrollTop()) {
            $("#fanList > li").each(function (index) {
                var obj = $(this).attr("data-src").split('_');
                if (obj[0] == "0") {
                    var fanImgObj = $("#fanImg_" + obj[2] + "_" + obj[1]);
                    if (typeof fanImgObj != "undefined" && typeof fanImgObj.attr("src") === "undefined" && typeof fanImgObj.attr("data-src")) {
                        var imgSrc = fanImgObj.attr("data-src");
                        fanImgObj.attr("data-src", "");
                        fanImgObj.attr("src", imgSrc).hide().fadeIn(500);
                    }
                }
                else {
                    var fanVideoObj = $("#fanVideo_" + obj[2] + "_" + obj[1]);
                    if (typeof fanVideoObj != "undefined" && typeof fanVideoObj.attr("poster") === "undefined" && typeof fanVideoObj.attr("data-src")) {
                        var posterSrc = fanVideoObj.attr("data-src");
                        fanVideoObj.attr("data-src", "");
                        fanVideoObj.attr("poster", posterSrc).hide().fadeIn(500);
                    }
                }
            });
        }
    }

    ///*팬페이지 스폰서 목록*/
    //if (fanSpon) {
    //	if (screenHeight >= ($("#sponsorList").offset().top - 300) - jQuery(window).scrollTop()) {
    //		fanSpon = false;
    //		fnGetSponsorList();
    //	}
    //}

    var offtop = 0;
    if ($("#fanList").children("li").length > 0) {
        offtop = $("#fanList").children("li").last().offset().top;
    }

    var nH = offtop - jQuery(window).scrollTop();

    /*팬페이지 목록*/
    if (isFanListMore) {
        if ((screenHeight >= ($("#sponsorList").offset().top - 500) - jQuery(window).scrollTop()) && nH < 900) {
            isFanListMore = false;
            //fnGetFanpageList();
        }
    }
}

/* 팬페이지 피드 내 더보기 */
function fnFanContentsMore(obj) {
    jQuery(obj).parent().addClass('opened');
    jQuery(obj).parent().find('.temp_txt').hide();
    jQuery(obj).parent().find('.hide_txt').show();
    jQuery(obj).hide();
}

var fnEdgeCoupon = function(contractNo, obj) {
    var idx = obj.parents("[data-idx]").data("idx");
    var edgeIdx = jQuery("input[name=hidEdgeIdx_" + idx + "]").val();
    var edgeTitle = jQuery("input[name=hidEdgeTitle_" + idx + "]").val();
    var eventStartDate = jQuery("input[name=hidEdgeEventStartDate_" + idx + "]").val();
    var eventEndDate = jQuery("input[name=hidEdgeEventEndDate_" + idx + "]").val();
    var userCouponCnt = jQuery("input[name=hidEdgeUserCouponCnt_" + idx + "]").val();

    cgv.contents.Main.SetEdgeCoupon(edgeIdx, encodeURIComponent(cgv_encrypt(contractNo)), edgeTitle, eventStartDate, eventEndDate, userCouponCnt);
}

/*
    Created : 2019.01.24
    Author : 이장열
    Description : main.js 클로저 객체 생성
*/
cgv.CreateNamespace("cgv.contents");
cgv.contents.Main = (function() {
    function Login() {
        if (confirm("회원 로그인 후 확인하실 수 있습니다.\n로그인 화면으로 이동합니다.")) {
            if (cgv.common.StandardInfo.IsWebView) {
                CGVHAAppInterface.MoveAppLogin();
            }
            else {
                location.href = "/WebApp/Member/Login.aspx?RedirectURL=" + cgv.common.StandardInfo.RedirectUrl
            }
        }
    }

    return {
        //엣지쿠폰 발급
        SetEdgeCoupon: function(edgeIdx, contractNo, edgeTitle, eventStartDate, eventEndDate, userCouponCnt) {
            if (cgv.common.StandardInfo.IsLogin) {
                var param = {
                    encEdgeIdx: edgeIdx,
                    encContractNo: contractNo,
                    encEdgeTitle: edgeTitle,
                    encEventStartDate: eventStartDate,
                    encEventEndDate: eventEndDate,
                    encUserCouponCnt: userCouponCnt
                };

                jQuery(window).startLoading();

                jQuery.ajax({
                    type: "POST",
                    url: "/WebAPP/MainV5/ajaxFanpageContSet.aspx/SetEdgeCoupon",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: true,
                    success: function(data) {
                        try {
                            switch (data.d) {
                                case "00000": alert("쿠폰이 발급되었습니다.\n발급받은 쿠폰으로 지금 영화 예매하세요!"); break;
                                case "00001": alert("이벤트 기간이 종료되었어요! 다음에 또 다른 이벤트로 다시 만나요~!"); break;
                                case "00002": alert("이미 쿠폰을 받으셨네요~! 쿠폰함에서 확인해주세요:)"); break;
                                case "00003": alert("이벤트가 종료되었어요~! 다음에 또 다른 이벤트로 다시 만나요~!"); break;
                                case "00004": alert("이벤트 준비중입니다. 잠시만 기다려주세요~!"); break;
                                default: alert("쿠폰발급이 실패했습니다. 다시 시도하여 주십시오."); break;
                            }

                            jQuery(window).stopLoading();
                        }
                        catch (e) {
                            alert("쿠폰발급이 실패했습니다. 다시 시도하여 주십시오.");
                            jQuery(window).stopLoading();
                        }
                    },
                    error: function(xhr, status, err) {
                        alert("쿠폰발급이 실패했습니다. 다시 시도하여 주십시오.");
                        jQuery(window).stopLoading();
                    }
                });
            }
            else
            {
                Login();
            }
        },
        CloseTargetingBanner: function () {
            jQuery.ajax({
                type: "POST",
                url: "/WebApp/MainV5/TargetingBanner.aspx/SetCloseHis",
                dataType: "JSON",
                contentType: "application/json",
                success: function (data) {
                    jQuery(".msg_member_coupon").css("display", "none");
                },
                error: function () {

                }
            });
        },
        SetTargetingCoupon: function (contractNo, userCouponCnt, eventName) {
            jQuery(window).startLoading();
            jQuery.ajax({
                type: "POST",
                data: "{encContractNo: '" + encodeURIComponent(cgv_encrypt(contractNo)) + "', encUserCouponCnt: '" + encodeURIComponent(cgv_encrypt(userCouponCnt)) + "', encEventName: '" + encodeURIComponent(cgv_encrypt(eventName)) + "'}",
                url: "/WebApp/MainV5/TargetingBanner.aspx/SetCoupon",
                dataType: "JSON",
                contentType: "application/json",
                success: function (data) {
                    if (data.d === "00") {
                        jQuery(".msg_member_coupon").css("display", "none");
                        alert("쿠폰이 발급되었습니다.\n발급된 쿠폰은 쿠폰함에서 확인하세요! ");
                    }
                    else if (data.d === "01") {
                        alert("이미 발급된 쿠폰입니다.");
                    }
                    else {
                        alert("일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.");
                    }

                    jQuery(window).stopLoading();
                },
                error: function () {
                    alert("일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.");
                    jQuery(window).stopLoading();
                }
            });
        },
        SetTargetingBanner: function () {
            jQuery.ajax({
                type: "POST",
                url: "/WebApp/MainV5/TargetingBanner.aspx/SetTargetingBanner",
                dataType: "JSON",
                contentType: "application/json",
                success: function (data) {
                    if (data.d !== "") {
                        jQuery(".msg_member_coupon").html(data.d).css("display", "block");
                    }
                },
                error: function () {
                }
            });
        }
    }
})();