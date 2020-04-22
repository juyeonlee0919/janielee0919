/*
작성일 : 2016.12.08
작성자 : 이장열
설명 : CGV COMMON LIBRARY
*/
//전역객체의 존재여부 확인
var cgv = window.cgv || {};

cgv.CreateNamespace = function (nsName) {
    // '.'으로 구분된 네임스페이스 표기를 쪼갭니다
    var sections = nsName.split('.'), parent = cgv, i;

    // 최상단의 cgv객체는 이미 선언되었으므로 제거합니다.
    if (sections[0] === "cgv") {
        sections = sections.slice(1);
    }

    var sLength = sections.length;
    for (i = 0; i < sLength; i += 1) {
        // 프로퍼티가 존재하지 않아야만 생성합니다.
        if (typeof parent[sections[i]] === "undefined") {
            parent[sections[i]] = {};
        }
        parent = parent[sections[i]];
    }
    return parent;
};

cgv.CreateNamespace("cgv.common");
cgv.common.Constants = (function () {
    var _userAgent = navigator.userAgent;
    var _isIPHONE = (_userAgent.match('iPhone') != null || _userAgent.match('iPod') != null);
    var _isIPAD = (_userAgent.match('iPad') != null);
    var _isANDROID = (_userAgent.match('Android') != null);
    var _isChrome = (_userAgent.match('Chrome') != null);
    var _isFirefox = (_userAgent.match('Firefox') != null);
    var _chromeVer = _isChrome ? parseFloat(_userAgent.toLowerCase().substr(_userAgent.toLowerCase().search(/chrome/), 30).match(/\d+\.+\d+/)[0]) : null;
    var _iOsVer = (_isIPHONE || _isIPAD) ? parseFloat(_userAgent.toLowerCase().substr(_userAgent.toLowerCase().search(/ipad|iphone/), 30).match(/\d+\_+\d+/)[0].replace('_', '.')) : null;
    var _isMobile = (/iphone|ipad|ipod|android/i.test(_userAgent.toLowerCase()));

    return {
        isIPHONE: _isIPHONE,
        isIPAD: _isIPAD,
        isANDROID: _isANDROID,
        isChrome: _isChrome,
        isFirefox: _isFirefox,
        chromeVer: _chromeVer,
        iOsVer: _iOsVer,
        isMobile: _isMobile
    }
})();

cgv.common.AppDeepLink = (function () {
    var _cgviOsInstallUrl = "http://itunes.apple.com/kr/app/id370441190?mt=8";
    var _cgvaOsInstallUrl = "market://details?id=com.cgv.android.movieapp";
    var _cgvInstallConfirmMsg = "CGV앱을 설치하셔야 이용할 수 있습니다. 설치 하시겠습니까?";

    var _ispiOsInstallUrl = "http://itunes.apple.com/kr/app/id369125087?mt=8";
    var _ispaOsInstallUrl = "http://mobile.vpay.co.kr/jsp/MISP/andown.jsp";
    var _ispInstallConfirmMsg = "선택하신 카드로 결제하려면 ISP 앱이 필요합니다. ISP 앱을 먼저 설치해주세요.";

    return {
        /*
        / @appName (string) 앱구분값
        */
        MoveAppStore: function (appName) {
            var iOsInstallUrl = ""; var aOsInstallUrl = "";
            //조건문이 적어 IF문 활용
            if (appName === "CGV") {
                iOsInstallUrl = _cgviOsInstallUrl;
                aOsInstallUrl = _cgvaOsInstallUrl;
            }
            else if (appName === "ISP") {
                iOsInstallUrl = _ispiOsInstallUrl;
                aOsInstallUrl = _ispaOsInstallUrl;
            }
            else {
                return alert("이동할 앱스토어를 설정 해 주세요.");
            }

            if (cgv.common.Constants.isIPHONE || cgv.common.Constants.isIPAD) {
                window.location.href = iOsInstallUrl;
            } else if (cgv.common.Constants.isANDROID) {
                window.location.href = aOsInstallUrl;
            }
            else {
                return alert("모바일 환경에서 이용 해 주세요.");
            }
        },
        /*
        / @appName : string 앱구분값
        / @args(optional) : string URL 스킴 호스트 & 파라미터
        */
        LaunchApp: function (appName, args) {
            var urlScheme = ""; var aOsIntentScheme = ""; var iOsInstallUrl = ""; var aOsInstallUrl = ""; var installConfirmMsg = "";

            //조건문이 적어 IF문 활용
            if (appName === "CGV") {
                //arguments 객체를 배열로 변환
                var arrArg = Array.prototype.slice.call(arguments, 1);

                if (arrArg.length === 1) {
                    urlScheme = "cjcgv://" + arrArg[0];
                    aOsIntentScheme = "intent://" + arrArg[0] + "#Intent;scheme=cjcgv;package=com.cgv.android.movieapp;end;";
                }
                else {
                    urlScheme = "cjcgv://";
                    aOsIntentScheme = "intent://#Intent;scheme=cjcgv;package=com.cgv.android.movieapp;end;";
                }

                iOsInstallUrl = _cgviOsInstallUrl;
                aOsInstallUrl = _cgvaOsInstallUrl;
                installConfirmMsg = _cgvInstallConfirmMsg;
            }
            else if (appName === "ISP") {
                //arguments 객체를 배열로 변환
                var arrArg = Array.prototype.slice.call(arguments, 1);

                if (arrArg.length === 1) {
                    urlScheme = "ispmobile://" + arrArg[0];
                    aOsIntentScheme = "intent://" + arrArg[0] + "#Intent;scheme=ispmobile;package=kvp.jjy.MispAndroid320;end;";
                }
                else {
                    urlScheme = "ispmobile://?TID=";
                    aOsIntentScheme = "intent://?TID=#Intent;scheme=ispmobile;package=kvp.jjy.MispAndroid320;end;";
                }

                iOsInstallUrl = _ispiOsInstallUrl;
                aOsInstallUrl = _ispaOsInstallUrl;
                installConfirmMsg = _ispInstallConfirmMsg;
            }
            else {
                return alert("실행할 앱을 설정 해 주세요.");
            }

            if (cgv.common.Constants.isIPHONE || cgv.common.Constants.isIPAD || (cgv.common.Constants.isANDROID && (cgv.common.Constants.isChrome && cgv.common.Constants.chromeVer < 25) && !cgv.common.Constants.isFirefox)) {
                if ((cgv.common.Constants.isIPHONE || cgv.common.Constants.isIPAD) && cgv.common.Constants.iOsVer >= 9) {
                    if (appName === "CGV") {
                        var clickedAt = new Date;
                        setTimeout(function () { if (new Date - clickedAt < 1800) { window.location.href = iOsInstallUrl; } }, 1500);

                        window.location.href = urlScheme;
                    }
                    else {
                        window.location.href = urlScheme;
                    }
                }
                else {
                    var b = new Date();
                    jQuery("body").html('<div id="applinkDiv" style="height:0;"><iframe src="' + urlScheme + '" width="0" height="0" frameborder="0"></iframe></div>');
                    setTimeout(function () {
                        jQuery("#applinkDiv").remove();
                    }, 1000);

                    setTimeout(function () {
                        if (new Date() - b < 1500) {
                            if (cgv.common.Constants.isIPHONE || cgv.common.Constants.isIPAD) {
                                if (confirm(installConfirmMsg)) { window.location.href = iOsInstallUrl; }
                            } else if (cgv.common.Constants.isANDROID) {
                                if (confirm(installConfirmMsg)) { window.location.href = aOsInstallUrl; }
                            }
                        }
                    }, 1000);
                }
            } else if ((cgv.common.Constants.isANDROID && cgv.common.Constants.isChrome && cgv.common.Constants.chromeVer >= 25) || (cgv.common.Constants.isANDROID && cgv.common.Constants.isFirefox)) {
                window.location.href = aOsIntentScheme;
            }
            else {
                return alert("앱을 실행할 수 없습니다.");
            }
        }
    }
})();

cgv.common.Share = (function () {

    function sendKakao(url, title, desc, img_url, width, height) {
        Kakao.cleanup();
        Kakao.init('0e745a30fbfe741f78ed701c9bad3ac8');
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: title,
                description: desc,
                imageUrl: img_url,
                imageWidth: 800,
                imageHeight: 800,
                link: {
                    mobileWebUrl: url,
                    webUrl: url
                }
            },
            installTalk : true
        });
    }

    return {
        Facebook: function (title, desc, image, sUrl, eventTitle) {
            var FB_APP_ID = "188113814563964";
            var fbRedirectUrl = sUrl;
            var fbName = title;
            var fbDescription = desc;
            var snsUrl = "http://www.facebook.com/sharer.php?v=4&src=bm&u=" + encodeURIComponent(sUrl) + "&t=" + encodeURIComponent(fbName);

            if (cgv.common.StandardInfo.IsWebView) {
                if (cgv.common.StandardInfo.AppVersion >= 431) {
                    CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', 'MA_이벤트', '공유하기_페이스북', eventTitle);
                }
                else {
                    CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', '기능선택', 'Click', '페이스북');
                }

                location.href = snsUrl;
            }
            else {
                ga_cgv('rollup.send', {
                    'hitType': 'event', 'eventCategory': '기능선택', 'eventAction': 'Click', 'eventLabel': '페이스북',
                    'hitCallback': function () {
                        location.href = snsUrl;
                    },
                    'hitCallbackFail': function () {
                        location.href = snsUrl;
                    }
                });
            }
        },
        Twitter: function (title, desc, sUrl, eventTitle) {
            var strDesc = title + " " + desc;

            if (cgv.common.StandardInfo.IsWebView) {
                if (cgv.common.StandardInfo.AppVersion >= 431) {
                    CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', 'MA_이벤트', '공유하기_트위터', eventTitle);
                }
                else {
                    CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', '기능선택', 'Click', '트위터');
                }

                location.href = "https://twitter.com/share?text=" + encodeURIComponent(strDesc) + "&url=" + encodeURIComponent(sUrl);
            }
            else {
                ga_cgv('rollup.send', {
                    'hitType': 'event', 'eventCategory': '기능선택', 'eventAction': 'Click', 'eventLabel': '트위터',
                    'hitCallback': function () {
                        location.href = "https://twitter.com/share?text=" + encodeURIComponent(strDesc) + "&url=" + encodeURIComponent(sUrl);
                    },
                    'hitCallbackFail': function () {
                        location.href = "https://twitter.com/share?text=" + encodeURIComponent(strDesc) + "&url=" + encodeURIComponent(sUrl);
                    }
                });
            }
        },
        KakaoTalk: function (title, desc, image, sUrl, eventTitle, width, height) {
            if (cgv.common.Constants.isIPHONE || cgv.common.Constants.isIPAD || cgv.common.Constants.isANDROID) {
                if (cgv.common.StandardInfo.IsWebView) {
                    if (cgv.common.StandardInfo.AppVersion >= 431) {
                        CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', 'MA_이벤트', '공유하기_카카오톡', eventTitle);
                    }
                    else {
                        CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', '기능선택', 'Click', '카카오톡');
                    }
                    sendKakao(sUrl, title, desc, image, width, height);
                }
                else {
                    ga_cgv('rollup.send', {
                        'hitType': 'event', 'eventCategory': '기능선택', 'eventAction': 'Click', 'eventLabel': '카카오톡',
                        'hitCallback': function () {
                            sendKakao(sUrl, title, desc, image, width, height);
                        },
                        'hitCallbackFail': function () {
                            sendKakao(sUrl, title, desc, image, width, height);
                        }
                    });
                }
            }
            else {
                alert('모바일 환경에서 이용 해 주세요.');
                return false;
            }
        },
        KakaoStory: function (title, desc, image, sUrl, eventTitle) {
            if (cgv.common.Constants.isIPHONE || cgv.common.Constants.isIPAD || cgv.common.Constants.isANDROID) {
                var urlinfo = { title: [title], desc: [desc], imageurl: [image], type: "article" };
                var linkStory = new com.kakao.talk.KakaoStoryLink(sUrl, "m.cgv.co.kr", "2.0", title, urlinfo);

                if (cgv.common.StandardInfo.IsWebView) {
                    if (cgv.common.StandardInfo.AppVersion >= 431) {
                        CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', 'MA_이벤트', '공유하기_카카오스토리', eventTitle);
                    }
                    else {
                        CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', '기능선택', 'Click', '카카오스토리');
                    }
                    linkStory.execute();
                }
                else {
                    ga_cgv('rollup.send', {
                        'hitType': 'event', 'eventCategory': '기능선택', 'eventAction': 'Click', 'eventLabel': '카카오스토리',
                        'hitCallback': function () {
                            linkStory.execute();
                        },
                        'hitCallbackFail': function () {
                            linkStory.execute();
                        }
                    });
                }
            }
            else {
                alert('모바일 환경에서 이용 해 주세요.');
                return false;
            }
        }
    }
})();

cgv.common.Util = (function () {
    return {
        goOutLink: function (url, type) {
            if (typeof (type) == "undefined")
                type = "0";

            if (cgv.common.StandardInfo.IsWebView) {
                CGVHAAppInterface.OutLink(encodeURIComponent(url), type);
            }
            else {
                if (type == "0") {
                    location.href = url;
                }
                else {
                    window.open(url);
                }
            }
        },
        sVdoPlay: function (mUrl) {
            if (cgv.common.StandardInfo.IsWebView) {
                if (cgv.common.Constants.isIPHONE) {
                    CGVHAAppInterface.OpenMoviePlayer(encodeURIComponent(mUrl));
                }
                else {
                    if (cgv.common.StandardInfo.AppVersion >= 402) {
                        CGVHAAppInterface.OpenMoviePlayer(encodeURIComponent(mUrl));
                    }
                    else {
                        location.href = mUrl;
                    }
                }
            } else {
                location.href = mUrl;
            }
        },
        posterDownload: function (url, showDialog) {
            if (cgv.common.StandardInfo.IsWebView) {
                CGVHAAppInterface.PosterDownload(url, showDialog);
            }
            else {
                window.open(url);
            }
        },
        onlyEnglishAndNumberInput: function (e, objID) {
            if (!(e.keyCode >= 37 && e.keyCode <= 40)) {
                var strReg = /^[A-Za-z0-9]+$/;
                if (!strReg.test(jQuery("#" + objID).val())) {
                    alert('영문과 숫자만 입력가능합니다.');
                    e.preventDefault();
                    jQuery("#" + objID).val("");
                }
            }
        },
        openNewWebView: function (url) {
            if (cgv.common.StandardInfo.IsWebView == true && cgv.common.StandardInfo.AppVersion >= 433) {
                CGVHAAppInterface.EventBannerCall('5', encodeURIComponent(url));
            }
            else {
                location.href = url;
            }
        },
        Debounce : function(fn, delay) {
            var timer = null;

            return function() {
                if (timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(fn, delay);
            }
        },
        Throttle : function(fn, delay) {
            var timer = null;

            return function() {
                if (!timer) {
                    timer = setTimeout(function() {
                        fn();
                        timer = null;
                    }, delay);
                }
            }
        }
    }
})();

cgv.common.Interface = function (name, methods) {
    if (arguments.length != 2) {
        throw new Error("Interface constructor called with " + arguments.length
            + "arguments, but expected exactly 2.");
    }

    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be "
                + "passed in as a string.");
        }
        this.methods.push(methods[i]);
    }
};

/*
cgv.common.Interface.ensureImplements = function (object) {
    if (arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " +
          arguments.length + "arguments, but expected at least 2.");
    }

    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if (interface.constructor !== cgv.common.Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments "
              + "two and above to be instances of Interface.");
        }

        for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object "
                  + "does not implement the " + interface.name
                  + " interface. Method " + method + " was not found.");
            }
        }
    }
};
*/


chkClickTrace = function (title) {
    try {
        /* 2012.10.08. (통계 문구 수정) */
        if (title.indexOf("Plus_") > -1) {
            title = title.replace("Plus_", "Plus/");
        }
        /* 2012.10.12. (통계 문구 수정) */
        if (title.indexOf("app_") > -1) {
            title = title.replace("app_", "app/");
        }
        trk_clickTrace("EVT", title)
    } catch (e) {
    }
    //alert(title);
}

showLayer = function (divID) {
    $Element(divID).show("block");
}
hideLayer = function (divID) {
    $Element(divID).hide();
}

layerShowHide = function (divID) {
    if ($Element(divID).css("display") == "block") {
        $Element(divID).hide();
    } else {
        $Element(divID).show("block");
    }
}


function textAreaLengthCheck(thisObj, maxLengthByte) {
    var tempByteLength = 0, cutByteLength = 0;
    for (var i = 0; i < thisObj.value.length; i++) {
        if (escape(thisObj.value.charAt(i)).length > 4) {
            tempByteLength += 2;
        } else {
            tempByteLength++;
        }

        if (tempByteLength < maxLengthByte) {
            cutByteLength++;
        }
    }

    if (tempByteLength > maxLengthByte) {
        alert(maxLengthByte + " Byte를 초과하였습니다.");
        thisObj.value = thisObj.value.substring(0, (cutByteLength % 2 == 1) ? cutByteLength : cutByteLength + 1);
    }

    return tempByteLength;
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/number/fmt-money [rev. #2]
/*
n = 123456.789
n.formatMoney() = 123.456,79
n.formatMoney(0) = 123.457
n.formatMoney(6) = 123.456,789000
n.formatMoney(2, "*", "#") = 123#456*79
*/
Number.prototype.formatMoney = function (c, d, t) {
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
    + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var resSiteMap = "";
siteMap = function (category) {
    if (category == "MAIN") { fnSendGALog('1', '', 'MW_메인', '네비게이션', ''); }
    else { fnSendGALog('0', '네비게이션/리스트', '', '', ''); }

    //var sMapBtnSrc = $Element("siteMapBtn").attr("src");
    var sMapBtnSrc = "";
    if (resSiteMap == "") {
        var siteMapUrl = "/WebApp/Common/siteMap.aspx";
        var siteMapAjax = $Ajax(siteMapUrl, {
            type: 'xhr',
            onload: function (res) {
                if (res.status() == 200) {
                    resSiteMap = res.text()
                    try {
                        $Element("siteMap").show("block");
                        focusSitemapBtn();
                    } catch (e) {
                        $Element("siteMap").show("block");
                        focusSitemapBtn();
                    }

                    //Click Log
                    try {
                        var pName = location.pathname;
                        if (pName == "/") {
                            chkClickTrace("/신규버전(ver.3.0,201501)/메인/메뉴");
                        }
                        else {
                            chkClickTrace("/신규버전(ver.3.0,201501)/메뉴");
                        }
                    } catch (e) { }

                } else {
                    alert('사이트맵 불러오기에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
                }
            }
        });
        siteMapAjax.request();
    } else {



        if ($Element("siteMap").css("display") == "block") {
            $Element('fogbg').hide();
            $Element("siteMap").hide();
        } else {
            $Element("siteMap").show("block");
            $Element("fogbg").show("block");
            focusSitemapBtn();

        }

    }
}

siteMapLoad = function () {
    if (resSiteMap == "") {
        var siteMapLoadUrl = "/WebApp/Common/siteMap.aspx";
        var siteMapLoadAjax = $Ajax(siteMapLoadUrl, {
            type: 'xhr',
            onload: function (res) {
                if (res.status() == 200) {
                    resSiteMap = res.text()

                    //alert($Element("all_wrap"));

                    if ($Element("mainHead") != null) {
                        //$Element("all_wrap").attr("id", "mainHead");
                        $Element("mainHead").afterHTML(resSiteMap);
                    } else if ($Element("headerTitle") != null) {
                        $Element("headerTitle").afterHTML(resSiteMap);
                    } else {
                        $Element("header_wrap").afterHTML(resSiteMap);
                    }

                } else {
                    //alert('사이트맵 불러오기에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
                }
            }
        });
        siteMapLoadAjax.request();
    }
}

try {
    //사이트맵 미리 로드
    if (!IsWebView_Master) {
        //siteMapLoad();
    }
} catch (e) {
    //siteMapLoad();
}

close_sitemap = function () {
    try {
        if ($Element("siteMap").css("display") == "block") {
            $Element('fogbg').hide();
            $Element("siteMap").hide();
        }
        /*
        var sMapBtnSrc = $Element("siteMapBtn").attr("src");
        if ($Element("siteMap").css("display") == "block") {
        $Element("siteMap").hide();
        //$Element("siteMapBtn").attr("src", sMapBtnSrc.replace("_on.png", ".png"));
        */

    } catch (e) {
    }
}

focusSitemapBtn = function () {
    //    if (sMapBtnSrc.indexOf("_on.png") == -1) {
    //        //$Element("siteMapBtn").attr("src", sMapBtnSrc.replace(".png", "_on.png"));
    //    }
    //    try {
    //        //close_search();
    //    } catch (e) {
    //    }
}


/* --- 숫자만 입력 가능 (onKeyDown 이벤트) --- */
function onlyNumberInput() {

    if ((event.keyCode < 48) || (event.keyCode > 57)) {

        if (event.keyCode == 13) {
            return false;
        }

        alert("숫자만 입력 가능합니다.");
        event.returnValue = false;
    }
}


// 숫자 체크
function isDigit(obj) {
    inputStr = obj;
    for (var i = 0; i < inputStr.length; i++) {
        var oneChar = inputStr.charAt(i)
        if (oneChar < '0' || oneChar > '9') { return false; }
    }
    return true;
}

function isNumber(value) {
    var numPattern = /[^(0-9)]/;

    if (numPattern.test(value)) {
        //return false; //임시변경
        return true;
    }
    //return true;
    return false;
}

function isSSN(str) {

    var num = str;
    var ssn1 = num.substring(0, 6);
    var ssn2 = num.substring(6, 13);

    if ((ssn1.length == 6) && (ssn2.length == 7)) {

        var ssn = ssn1 + ssn2;
        a = new Array(13);
        for (var i = 0; i < 13; i++) {
            a[i] = parseInt(ssn.charAt(i));
        }
        var k = 11 - (((a[0] * 2) + (a[1] * 3) + (a[2] * 4) + (a[3] * 5) + (a[4] * 6) + (a[5] * 7) + (a[6] * 8) + (a[7] * 9) + (a[8] * 2) + (a[9] * 3) + (a[10] * 4) + (a[11] * 5)) % 11);
        if (k > 9) {
            k -= 10;
        }
        if (k == a[12]) {
            //alert("올바른 주민등록번호 입니다.");
            return true;
        } else {
            //alert("잘못된 주민등록번호 입니다.\n\n다시 입력해 주세요.");
            return false;
        }
    }
}

//AppStatistics = function (tid) {
//    alert("ajax전");
//    sAjaxUrl = "http://weblog.cgv.co.kr/InsightTrk/mobile.do";
//    var woAjax = $Ajax(sAjaxUrl, {
//        type: 'xhr',
//        method: "get",
//        onload: function (res) {
//            alert(res.text());
//        },
//        onerrer: function () {
//            alert("에러");
//        }
//    });
//    woAjax.request({ TID: tid });
//}

AppStatistics = function (_TRK_CP, _TRK_PI, _TRK_AMT, _TRK_PNG, _TRK_PNC, _TRK_PNC_NM, _TRK_MBR, _TRK_SX, _TRK_AG,
                          _TRK_UVP1, _TRK_ISLOGIN, _TRK_IK, _TRK_IKWDRS, _TRK_ICMP, _TRK_ICMP_NM, strTid) {
    sAjaxUrl = "http://weblog.cgv.co.kr/InsightTrk/mobile.do";
    var woAjax = $Ajax(sAjaxUrl, {
        type: 'xhr',
        method: "get",
        onload: function (res) {
        },
        onerrer: function (res) {
        }
    });
    woAjax.request({ _TRK_CP: _TRK_CP, _TRK_PI: _TRK_PI, _TRK_AMT: _TRK_AMT, _TRK_PNG: _TRK_PNG, _TRK_PNC_NM: _TRK_PNC_NM,
        _TRK_IK: _TRK_IK, _TRK_IKWDRS: _TRK_IKWDRS, _TRK_ICMP: _TRK_ICMP, _TRK_ICMP_NM: _TRK_ICMP_NM, TID: strTid
    });
}

//콤마찍기
function numberdFormat(num) {
    var pattern = /(-?[0-9]+)([0-9]{3})/;
    while (pattern.test(num)) {
        num = num.replace(pattern, "$1,$2");
    }
    return num;
}

//콤마제거
function unNumberFormat(num) {
    return (num.replace(/\,/g, ""));
}

//로그인
function fnMoveLogin() {
    window.location.href = g_url_login;
}

//Prev Page Move
function fnMovePrevPage(page) {
    window.location.href = decodeURIComponent(page);
}

function getWidth() {
    xWidth = null;
    if (window.screen != null) { xWidth = window.screen.availWidth; }
    if (window.innerWidth != null) { xWidth = window.innerWidth; }
    if (document.body != null) { xWidth = document.body.clientWidth; }
    return xWidth;
}

function getHeight() {
    yHeight = null;
    if (window.screen != null) { yHeight = window.screen.availHeight; }
    if (window.innerWidth != null) { yHeight = window.innerHeight; }
    if (document.body != null) { yHeight = document.body.clientHeight; }
    return yHeight;
}

//자주가는 CGV 등록/삭제
function fnFavoriteCGV(TheaterCode, TheaterName, obj) {
    if (g_IsLogin == "False") {
        if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
            window.location.href = g_url_login;
        }
    }
    else {
        var f = "FAV_ADD";
        if (jQuery(obj).hasClass('on')) { f = "FAV_DEL"; }

        if (f == "FAV_DEL" && !confirm("등록된 CGV 극장을 삭제하시겠습니까?")) {
            return;
        }

        var woAjax = $Ajax("/WebApp/TheaterV4/ajaxTheater.aspx", {
            type: 'xhr',
            onload: function (res) {
                if (res.status() == 200) {
                    var txt = res.text();
                    txt = txt.replace("000000", TheaterName);
                    if (txt != "") { alert(txt); }

                    if (txt.indexOf("실패") < 0 && txt.indexOf("최대") < 0) {
                        if (jQuery(obj).hasClass('on')) {
                            jQuery(obj).removeClass("on");
                        }
                        else {
                            jQuery(obj).addClass("on");
                        }

                        try {
                            //CallBack Func
                            fnFavoriteCGV_CallBack(TheaterCode, f);
                        } catch (e) { }
                    }
                } else {
                    alert('실패했습니다.\n잠시 후에 다시 이용해 주세요.');
                }
            }
        }).request({ tc: TheaterCode, flag: f });
    }
}

//공유하기
function showSharePopup() {
    oDialog.show();
    return;
}

//공유 - 페이스북
function fnShare_FaceBook(url, title) {
    if (url == "") { url = g_reUrl; }
    else { url = encodeURIComponent(url); }
    title = encodeURIComponent(title);

    //if (IsWebView_Master && !IsWebViewIPhone_Master) {
    //    CGVHAAppInterface.SNS("f", url, title);
    //}
    //else {
    location.href = "http://www.facebook.com/sharer.php?v=4&src=bm&u=" + url + "&t=" + title;
    //}
}

//공유 - 트위터
function fnShare_Twitter(url, title, desc) {
    if (url == "") { url = g_reUrl; }
    else { url = encodeURIComponent(url); }

    var strDesc = encodeURIComponent(title + " " + desc);
    title = encodeURIComponent(title);
    desc = encodeURIComponent(desc);

    jQuery.post("/WebAPP/Common/sUrl.aspx", { url: url })
    .done(function (data) {
        url = encodeURIComponent(data);

        location.href = "https://twitter.com/share?text=" + strDesc + "&url=" + url;

        /*if (IsWebView_Master && !IsWebViewIPhone_Master) {
        CGVHAAppInterface.SNS("t", url, title);
        }
        else {
        location.href = "https://twitter.com/share?text=" + strDesc + "&url=" + url;
        }*/
    });
}

//공유 - 카카오
function fnShare_KaKao(url, title, desc, img_url) {
    if (url == "") { url = decodeURIComponent(g_reUrl); }

    //title = escape(title);
    //desc = escape(desc);

    if (typeof (img_url) != "undefined" && img_url != null) {
        //img_url = encodeURIComponent(img_url);
    }
    else {
        img_url = "";
    }

    fnSendKakao(url, title, desc, img_url);
}

function fnSendKakao(k_url, k_title, k_desc, k_img_url) {
    Kakao.cleanup();
    Kakao.init('0e745a30fbfe741f78ed701c9bad3ac8');
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: k_title,
            description: k_desc,
            imageUrl: k_img_url,
            imageWidth: 800,
            imageHeight: 800,
            link: {
                mobileWebUrl: k_url,
                webUrl: k_url
            }
        }
    });
}

function fnSendTalkLinkFull(k_url, k_top_title, k_title, k_desc, k_img_url, k_img_w, k_img_h) {
    Kakao.cleanup();
    Kakao.init('0e745a30fbfe741f78ed701c9bad3ac8');
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: k_title,
            description: k_desc,
            imageUrl: k_img_url,
            imageWidth: 800,
            imageHeight: 800,
            link: {
                mobileWebUrl: k_url,
                webUrl: k_url
            }
        }
    });
}

function fnMovePageWithLog(logTxt, u) {
    chkClickTrace(logTxt);
    location.href = u;
}

function fnMovePageFromMain(logTxt, url, unitType) {
    if (IsWebView_Master) {
        CGVHAAppInterface.MainUnitService(unitType, url);
    }
    else {
        location.href = url;
    }
}

function fnMovePhotoTicket(flag, unitType) {
    var linkUrl = "/WebApp/EventNotiV4/Event/140512_PhotoTicket/Main.aspx";
    if (flag == "app") {
        if (confirm("CGV포토티켓 App으로 이동합니다.")) {
            var iphoneLink = "http://itunes.apple.com/kr/app/pototikes/id941533508?mt=8";
            var AndroidLink = "market://details?id=kr.co.cgv.phototicket";
            var tmpUser = navigator.userAgent;

            if (tmpUser.indexOf("iPhone") > 0 || tmpUser.indexOf("iPad") > 0) {
                if (IsWebView_Master) { CGVHAAppInterface.OutLink(encodeURIComponent(iphoneLink)); } else { location.href = iphoneLink; }
            }
            else if (tmpUser.indexOf("Android") > 0) {
                if (IsWebView_Master) { CGVHAAppInterface.OutLink(encodeURIComponent(AndroidLink)); } else { location.href = AndroidLink; }
            }
            else { alert('모바일 브라우저나 CGV 앱에서 이용해주세요.'); }
        }
    }
    else {
        if (IsWebView_Master) { CGVHAAppInterface.MainUnitService(unitType, linkUrl); } else { location.href = linkUrl; }
    }
}

function fnAgreePageMove(type) {
    location.href = "/Agreement/Agreement_PInfo.aspx?AgreeType=" + type;
}

function fnVodPlay(mUrl, flag) {
    if (flag == "MOVIEDETAIL") {
        jQuery(".loading_inlayer").show();
    }
    else {
    }

    var vPlayer = document.getElementById("vid_vplayer");
    vPlayer.style.display = "block";
    vPlayer.src = mUrl;
    vPlayer.autoplay = true;
    vPlayer.load();
    vPlayer.play();
}

function fniOSversion() {
    try {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
    } catch (e) {
        return [parseInt(1), parseInt(1), parseInt(1)];
    }
}


//fnMoveAPPLink("/WebApp/EventNotiV4/Event/140512_PhotoTicket/Main.aspx", "http://itunes.apple.com/kr/app/pototikes/id941533508?mt=8", "market://details?id=kr.co.cgv.phototicket");
function fnMoveWEBAPPLink(webLink, iphoneLink, AndroidLink) {
    var tmpUser = navigator.userAgent;
    if (tmpUser.indexOf("iPhone") > 0 || tmpUser.indexOf("iPad") > 0) {
        if (IsWebView_Master) { CGVHAAppInterface.OutLink(encodeURIComponent(iphoneLink)); } else { location.href = iphoneLink; }
    }
    else if (tmpUser.indexOf("Android") > 0) {
        if (IsWebView_Master) { CGVHAAppInterface.OutLink(encodeURIComponent(AndroidLink)); } else { location.href = AndroidLink; }
    }
    else {
        location.href = webLink;
    }
}

function fnSendGALog(lType, screenName, eventCategory, eventAction, eventLabel) {
    if (lType != "") {
        if (IsWebView_Master) {
            CGVHAAppInterface.SendGoogleAnalyticsLog(lType, screenName, eventCategory, eventAction, eventLabel);
        }
        else {
        	/*
        	 * GA 작업시 
				모바일앱은 MA
				모바일웹은 MW로 넣어주시기 바랍니다. 
        	 */
        	eventCategory = eventCategory.replace("MA","MW");
            if (lType == "0") {//PageView
                ga_cgv('rollup.send', 'pageview', { 'title': screenName });
            }
            else if (lType == "1") {//Event
                ga_cgv('rollup.send', { 'hitType': 'event', 'eventCategory': eventCategory, 'eventAction': eventAction, 'eventLabel': eventLabel });
            }
        }
    }
}

function fnSendGALogCallbackPageMove(lType, screenName, eventCategory, eventAction, eventLabel, pageUrl, isNew, moveType) {
    var mType;
    try { mType = (typeof moveType == "undefined") ? "" : moveType; } catch (e) { mType = ""; }

    var lh = location.host;
    if (lh == "localhost") { location.href = pageUrl; }

    if (lType != "") {
        if (IsWebView_Master) {
            CGVHAAppInterface.SendGoogleAnalyticsLog(lType, screenName, eventCategory, eventAction, eventLabel);
            if (pageUrl != "") {
                //4.3.3 / isNew : 새창 열기
                if (isNew && AppVersion_Master >= 433) {
                    CGVHAAppInterface.EventBannerCall('5', encodeURIComponent(pageUrl));
                }
                else {
                    fnSendGALogCallbackPageMove_Exec(mType, pageUrl)
                }
            }
        }
        else {
            if (lType == "0") {//PageView
                ga_cgv('rollup.send', 'pageview', {
                    'title': screenName,
                    'hitCallback': function () {
                        if (pageUrl != "") {
                            fnSendGALogCallbackPageMove_Exec(mType, pageUrl)
                        }
                    },
                    'hitCallbackFail': function () {
                        if (pageUrl != "") {
                            fnSendGALogCallbackPageMove_Exec(mType, pageUrl)
                        }
                    }
                });
            }
            else if (lType == "1") {//Event
                ga_cgv('rollup.send', {
                    'hitType': 'event', 'eventCategory': eventCategory, 'eventAction': eventAction, 'eventLabel': eventLabel,
                    'hitCallback': function () {
                        if (pageUrl != "") {
                            fnSendGALogCallbackPageMove_Exec(mType, pageUrl)
                        }
                    },
                    'hitCallbackFail': function () {
                        if (pageUrl != "") {
                            fnSendGALogCallbackPageMove_Exec(mType, pageUrl)
                        }
                    }
                });
            }
        }
    }
}

function fnSendGALogCallbackPageMove_Exec(mType, pageUrl) {
    if (mType == "rep") {
        fnPageGroupMove(pageUrl);
    }
    else { location.href = pageUrl; }
}

function fnPageGroupMove(u) {
    //아이폰 433 보다 낮은 버전은 페이지 이동으로 적용
    if (IsWebViewIPhone_Master && AppVersion_Master < 433) {
        location.href = u;
    }
    else {
        location.replace(u);
    }
}

function fnSendGALogCallbackMainUnit(lType, screenName, eventCategory, eventAction, eventLabel, pageUrl, unitType) {
    if (lType != "") {
        if (IsWebView_Master) {
            CGVHAAppInterface.SendGoogleAnalyticsLog(lType, screenName, eventCategory, eventAction, eventLabel);
            if (pageUrl != "") {
                CGVHAAppInterface.MainUnitService(unitType, pageUrl);
            }
        }
        else {
            if (lType == "0") {//PageView
                ga_cgv('rollup.send', 'pageview', {
                    'title': screenName,
                    'hitCallback': function () {
                        if (pageUrl != "") {
                            window.location.href = pageUrl;
                        }
                    },
                    'hitCallbackFail': function () {
                        if (pageUrl != "") {
                            window.location.href = pageUrl;
                        }
                    }
                });
            }
            else if (lType == "1") {//Event
                ga_cgv('rollup.send', {
                    'hitType': 'event', 'eventCategory': eventCategory, 'eventAction': eventAction, 'eventLabel': eventLabel,
                    'hitCallback': function () {
                        if (pageUrl != "") {
                            window.location.href = pageUrl;
                        }
                    },
                    'hitCallbackFail': function () {
                        if (pageUrl != "") {
                            window.location.href = pageUrl;
                        }
                    }
                });
            }
        }
    }
}

function fnSendGALogCallbackQuickReserve(lType, screenName, eventCategory, eventAction, eventLabel, strMovieIdx, mgCD, movTitle, rateCode, rKind) {
    if (strMovieIdx == "81589") {
        if (!confirm("선택하신 영화는 드래곤 길들이기 1편입니다.")) {
            return false;
        }
    }

    if (lType != "") {
        if (IsWebView_Master) {
            CGVHAAppInterface.SendGoogleAnalyticsLog(lType, screenName, eventCategory, eventAction, eventLabel);
            CGVHAAppInterface.ReserveFromMovieInfoV4(mgCD, encodeURIComponent(movTitle), rateCode, rKind);
        }
        else {
            if (lType == "0") {//PageView
                ga_cgv('rollup.send', 'pageview', {
                    'title': screenName,
                    'hitCallback': function () {
                        window.location.href = "/quickReservation/Default.aspx?MovieIdx=" + strMovieIdx;
                    },
                    'hitCallbackFail': function () {
                        window.location.href = "/quickReservation/Default.aspx?MovieIdx=" + strMovieIdx;
                    }
                });
            }
            else if (lType == "1") {//Event
                ga_cgv('rollup.send', {
                    'hitType': 'event', 'eventCategory': eventCategory, 'eventAction': eventAction, 'eventLabel': eventLabel,
                    'hitCallback': function () {
                        window.location.href = "/quickReservation/Default.aspx?MovieIdx=" + strMovieIdx;
                    },
                    'hitCallbackFail': function () {
                        window.location.href = "/quickReservation/Default.aspx?MovieIdx=" + strMovieIdx;
                    }
                });
            }
        }
    }
}

function fnSendGALogCallbackShare(lType, screenName, eventCategory, eventAction, eventLabel, url, title, desc, img_url, shareType) {
    if (lType != "" && shareType != "") {
        if (IsWebView_Master) {
            CGVHAAppInterface.SendGoogleAnalyticsLog(lType, screenName, eventCategory, eventAction, eventLabel);
            if (shareType == "F") { fnShare_FaceBook(url, title); }
            else if (shareType == "T") { fnShare_Twitter(url, title, desc); }
            else if (shareType == "K") { fnShare_KaKao(url, title, desc, img_url); }
        }
        else {
            if (lType == "0") {//PageView
                ga_cgv('rollup.send', 'pageview', {
                    'title': screenName,
                    'hitCallback': function () {
                        if (shareType == "F") { fnShare_FaceBook(url, title); }
                        else if (shareType == "T") { fnShare_Twitter(url, title, desc); }
                        else if (shareType == "K") { fnShare_KaKao(url, title, desc, img_url); }
                    },
                    'hitCallbackFail': function () {
                        if (shareType == "F") { fnShare_FaceBook(url, title); }
                        else if (shareType == "T") { fnShare_Twitter(url, title, desc); }
                        else if (shareType == "K") { fnShare_KaKao(url, title, desc, img_url); }
                    }
                });
            }
            else if (lType == "1") {//Event
                ga_cgv('rollup.send', {
                    'hitType': 'event', 'eventCategory': eventCategory, 'eventAction': eventAction, 'eventLabel': eventLabel,
                    'hitCallback': function () {
                        if (shareType == "F") { fnShare_FaceBook(url, title); }
                        else if (shareType == "T") { fnShare_Twitter(url, title, desc); }
                        else if (shareType == "K") { fnShare_KaKao(url, title, desc, img_url); }
                    },
                    'hitCallbackFail': function () {
                        if (shareType == "F") { fnShare_FaceBook(url, title); }
                        else if (shareType == "T") { fnShare_Twitter(url, title, desc); }
                        else if (shareType == "K") { fnShare_KaKao(url, title, desc, img_url); }
                    }
                });
            }
        }
    }
}

function fnSendGALogCallbackPlayTrailer(lType, screenName, eventCategory, eventAction, eventLabel, mIdx, gIdx, mUrl) {
    if (lType != "") {
        if (IsWebView_Master) {
            CGVHAAppInterface.SendGoogleAnalyticsLog(lType, screenName, eventCategory, eventAction, eventLabel);
            if (mUrl != "") {
                sVdoPlay(mIdx, gIdx, mUrl);
            }
        }
        else {
            if (lType == "0") {//PageView
                ga_cgv('rollup.send', 'pageview', {
                    'title': screenName,
                    'hitCallback': function () {
                        if (mUrl != "") {
                            sVdoPlay(mIdx, gIdx, mUrl);
                        }
                    },
                    'hitCallbackFail': function () {
                        if (mUrl != "") {
                            sVdoPlay(mIdx, gIdx, mUrl);
                        }
                    }
                });
            }
            else if (lType == "1") {//Event
                ga_cgv('rollup.send', {
                    'hitType': 'event', 'eventCategory': eventCategory, 'eventAction': eventAction, 'eventLabel': eventLabel,
                    'hitCallback': function () {
                        if (mUrl != "") {
                            sVdoPlay(mIdx, gIdx, mUrl);
                        }
                    },
                    'hitCallbackFail': function () {
                        if (mUrl != "") {
                            sVdoPlay(mIdx, gIdx, mUrl);
                        }
                    }
                });
            }
        }
    }
}

function fnCJONEJoin() {
    if (IsWebView_Master && !IsIphone_Master) {
        CGVHAAppInterface.CJONEJoin('');
    }
    else if (IsWebViewIPhone_Master) {
        CGVHAAppInterface.OutLink(encodeURIComponent('https://m.cjone.com:8443/cjmmobile/member/meberjoinstep1.do?coopco_cd=7010&brnd_cd=1000&mcht_no=1000'));
    }
    else {
        window.location.href = 'https://m.cjone.com:8443/cjmmobile/member/meberjoinstep1.do?coopco_cd=7010&brnd_cd=1000&mcht_no=1000';
    }
}

function fnCJONEAgreement(userId) {
    if (IsWebView_Master) {
        CGVHAAppInterface.OutLink(encodeURIComponent('https://m.cgv.co.kr/Agreement/AgreementAppExternalEnc.aspx?flag=APP&userId=' + encodeURIComponent(userId)));
    }
    else {
        window.location.href = 'https://m.cgv.co.kr/Agreement/AgreementAppExternalEnc.aspx?flag=WEB&userId=' + encodeURIComponent(userId);
    }
}


var btnFaceBookWithUrl_Tag = function (title, desc, image, sUrl, eventTitle) {
    var FB_APP_ID = "188113814563964";
    var fbRedirectUrl = sUrl;
    var fbName = title;
    var fbDescription = desc;

    var snsUrl = "https://www.facebook.com/dialog/feed?app_id=" + FB_APP_ID + "&display=popup" +
        "&link=" + encodeURIComponent(sUrl) +
        "&redirect_uri=" + encodeURIComponent(fbRedirectUrl) +
        "&picture=" + encodeURIComponent(image) +
        "&name=" + encodeURIComponent(fbName) +
        "&description=" + encodeURIComponent(fbDescription);

    if (IsWebView_Master) {
        if (AppVersion_Master >= 431) {
            CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', 'MA_이벤트', '공유하기_페이스북', eventTitle);
        }
        else {
            CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', '기능선택', 'Click', '페이스북');
        }


        location.href = snsUrl;
    }
    else {
        ga_cgv('rollup.send', {
            'hitType': 'event', 'eventCategory': '기능선택', 'eventAction': 'Click', 'eventLabel': '페이스북',
            'hitCallback': function () {
                location.href = snsUrl;
            },
            'hitCallbackFail': function () {
                location.href = snsUrl;
            }
        });
    }
}
var btnTwitterWithUrl_Tag = function (title, desc, sUrl, eventTitle) {
    var strDesc = title + " " + desc;

    if (IsWebView_Master) {

        if (AppVersion_Master >= 431) {
            CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', 'MA_이벤트', '공유하기_트위터', eventTitle);
        }
        else {
            CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', '기능선택', 'Click', '트위터');
        }

        location.href = "https://twitter.com/share?text=" + encodeURIComponent(strDesc) + "&url=" + encodeURIComponent(sUrl);
    }
    else {
        ga_cgv('rollup.send', {
            'hitType': 'event', 'eventCategory': '기능선택', 'eventAction': 'Click', 'eventLabel': '트위터',
            'hitCallback': function () {
                location.href = "https://twitter.com/share?text=" + encodeURIComponent(strDesc) + "&url=" + encodeURIComponent(sUrl);
            },
            'hitCallbackFail': function () {
                location.href = "https://twitter.com/share?text=" + encodeURIComponent(strDesc) + "&url=" + encodeURIComponent(sUrl);
            }
        });
    }
}
var btnKaKaoWithUrl_Tag = function (title, desc, image, sUrl, eventTitle) {
    var tUser = navigator.userAgent;
    if (tUser.indexOf("iPhone") > 0 || tUser.indexOf("iPad") > 0 || tUser.indexOf("Android") > 0) {
        if (IsWebView_Master) {
            if (AppVersion_Master >= 431) {
                CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', 'MA_이벤트', '공유하기_카카오톡', eventTitle);
            }
            else {
                CGVHAAppInterface.SendGoogleAnalyticsLog('1', '', '기능선택', 'Click', '카카오톡');
            }
            fnSendKakao(sUrl, title, desc, image);
        }
        else {
            ga_cgv('rollup.send', {
                'hitType': 'event', 'eventCategory': '기능선택', 'eventAction': 'Click', 'eventLabel': '카카오톡',
                'hitCallback': function () {
                    fnSendKakao(sUrl, title, desc, image);
                },
                'hitCallbackFail': function () {
                    fnSendKakao(sUrl, title, desc, image);
                }
            });
        }
    }
    else {
        alert('모바일에서 이용해주세요.');
        return false;
    }
}

function fnGaProductVals_Step1() { return JSON.parse(fnGetCookie("STR_GA_PRODUCTS_STEP1").replace(/&quot;/ig, '"')); }

function fnProdStrToObj(str) {
    var ga_products_arr = [];

    if (str.indexOf("|||") > -1) {
        var tmp_arr = str.split("|||");
        var tmp_arr_row = "";

        try {
            for (var i = 0; i < tmp_arr.length; i++) {
                if (tmp_arr[i].indexOf("/|") > -1) {
                    tmp_arr_row = tmp_arr[i].split("/|");

                    //tmp_ga_products["price"] + "/|" + tmp_ga_products["quantity"] + "/|" + tmp_ga_products["dimension16"] + "/|" + tmp_ga_products["dimension17"] + "/|" + tmp_ga_products["dimension18"] + "/|" + tmp_ga_products["dimension19"] + "/|" + tmp_ga_products["dimension20"] + "/|" + tmp_ga_products["dimension21"] + "|||";
                    var tmp_ga_products = fnGaProductVals_Step1();

                    tmp_ga_products["name"] = tmp_ga_products["name"];
                    tmp_ga_products["brand"] = tmp_ga_products["brand"];
                    tmp_ga_products["variant"] = tmp_ga_products["variant"];
                    tmp_ga_products["dimension11"] = tmp_ga_products["dimension11"];
                    tmp_ga_products["dimension12"] = tmp_ga_products["dimension12"];
                    tmp_ga_products["dimension15"] = tmp_ga_products["dimension15"];
                    tmp_ga_products["dimension22"] = tmp_ga_products["dimension22"];

                    tmp_ga_products["price"] = tmp_arr_row[0];
                    tmp_ga_products["quantity"] = tmp_arr_row[1];
                    tmp_ga_products["dimension16"] = tmp_arr_row[2];
                    tmp_ga_products["dimension17"] = tmp_arr_row[3];
                    tmp_ga_products["dimension18"] = tmp_arr_row[4];
                    tmp_ga_products["dimension19"] = tmp_arr_row[5];
                    tmp_ga_products["dimension20"] = tmp_arr_row[6];
                    tmp_ga_products["dimension21"] = tmp_arr_row[7];

                    if (tmp_arr_row.length > 8) {
                        try {
                            tmp_ga_products["dimension23"] = tmp_arr_row[8];
                            tmp_ga_products["dimension24"] = tmp_arr_row[9];
                            tmp_ga_products["dimension25"] = tmp_arr_row[10];
                        } catch (e) { }
                    }

                    ga_products_arr[i] = tmp_ga_products;
                }
            }
        } catch (e) {
            ga_products_arr = [];
        }
    }

    return ga_products_arr;
}

function fnSetCookie(name, value, expires_h) {
    var nowDate = new Date();
    nowDate.setHours(nowDate.getHours() + parseInt(expires_h));

    var enc_val = escape(value);
    document.cookie = name + "=" + enc_val + "; path=/; expires=" + nowDate.toGMTString();

    //Browser Cookies Ex Handle
    if (name == "STR_GA_PRODUCTS") {
        var str_test;
        try { str_test = fnGetCookie(name); } catch (e) { str_test = ""; }
        if (typeof (str_test) == "undefined" || str_test == null || str_test == "") { document.cookie = name + "=; path=/; expires=" + nowDate.toGMTString(); }
    }
}

function fnEncoded_Chk_URIC(str) {
    try { return typeof str == "string" && decodeURIComponent(str) !== str; } catch (e) { return false; }
}

function fnEncoded_Chk_UNE(str) {
    try { return typeof str == "string" && unescape(str) !== str; } catch (e) { return false; }
}

function fnGetCookie(name) {
    var search = name + "=";
    var rt_val = "";

    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) { end = document.cookie.length; }

            rt_val = document.cookie.substring(offset, end);

            try {
                if (fnEncoded_Chk_UNE(rt_val)) { rt_val = unescape(rt_val); }
                else {
                    if (rt_val.indexOf("%") > -1) { rt_val = unescape(rt_val); }
                }
            } catch (e) { }
        }
    }

    return rt_val;
}


function basicNavigation(type, title, secondButton) {
    if (IsWebView_Master == true && AppVersion_Master >= 433) {
        var lbtnImageUrl = getNavigationIconUrl('icon_back');
        var rbtnImageUrl = getNavigationIconUrl('icon_menu');

        if (secondButton == "")
            secondButton = '|||||';

        if (type == 1)
            CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        else if (type == 2)
            CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', '|||||', '|||||');
    }
}

function basicNavigation_Case3(type, title, secondButton, thirdButton) {
    if (IsWebView_Master == true && AppVersion_Master >= 433) {
        var lbtnImageUrl = getNavigationIconUrl('icon_back');
        var rbtnImageUrl = getNavigationIconUrl('icon_menu');

        if (secondButton == "") { secondButton = '|||||'; }
        if (thirdButton == "") { thirdButton = '|||||'; }

        if (type == 1) {
            CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }
        else if (type == 2) {
            CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', '|||||', '|||||');
        }
        else if (type == 3) {
            CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', thirdButton, secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }
    }
}

function simpleCloseNavigation(title, closetype) {
    if (IsWebView_Master == true && AppVersion_Master >= 433) {
        var lbtnImageUrl = getNavigationIconUrl('icon_close');
        CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||' + closetype + '||', '|||||', '|||||', '|||||');
    }
}

function getNavigationIconUrl(name) {
    var tUser = navigator.userAgent;
    var iconUrl = '';

    if (tUser.indexOf("Android") > 0) {
        //iconUrl = 'https://img.cgv.co.kr/Webapp/Images/Common/Navigation/and/' + name + '.svg';
        iconUrl = 'https://img.cgv.co.kr/Webapp/Images/Common/Navigation/ios_big/' + name + '.png';
    }
    else {
        if (jQuery(document).width() <= 375) {
            iconUrl = 'https://img.cgv.co.kr/Webapp/Images/Common/Navigation/ios_small/' + name + '.png';
        }
        else {
            iconUrl = 'https://img.cgv.co.kr/Webapp/Images/Common/Navigation/ios_big/' + name + '.png';
        }
    }
    return iconUrl;
}


function fnMobileDeviceChk() {
    var deviceAgent = navigator.userAgent;
    deviceAgent = deviceAgent.toLowerCase();

    var agents = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'bada', 'zunewp7', 'windows phone', 'tablet'];
    var str_rt = "Other";
    for (i in agents) {
        if (deviceAgent.search(agents[i]) > -1) {
            str_rt = agents[i];
            break;
        }
    }
    return str_rt;
}

function fnMobileDeviceLangChk() {
    var type = navigator.appName;
    var lang = "";

    try {
        lang = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "ko";
        lang = lang.substr(0, 2).toLowerCase();
    } catch (e) { lang = "ko"; }

    return lang;
}

function fnAndroidVersion_Web(ua) {
    ua = (ua || navigator.userAgent).toLowerCase();
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? match[1] : false;
}

function fnAndroid_WebEngChk() {
    var strAndrVer_Web = fnAndroidVersion_Web();
    if (!isNaN(parseFloat(strAndrVer_Web)) && fnMobileDeviceLangChk() != "ko" && parseFloat(strAndrVer_Web) < 5.0) {
        return true;
    } else {
        return false;
    }
}

//좋아요,공감하기 + 모션 공통
function fnMovLikeUPD(obj, midx, cidx) {
    try {
        if (!(isLogin == "True")) {
            if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
                window.location.href = g_url_login;
            }
            return;
        }
    } catch (e) { }

    //공감 motion
    jQuery(obj).addClass('motion');
    setTimeout(function () { jQuery(obj).removeClass('motion'); }, 300);

    var sts = "like";
    if (jQuery(obj).closest(".likeit").hasClass("on")) { sts = "clike"; }

    jQuery.ajax({
        type: "GET",
        url: "/WebApp/MovieV4/cont/ajax140CommentAction.aspx",
        data: {
            chkState: sts,
            MovieIdx: midx,
            CommentIdx: cidx,
            empathytype: "1"
        },
        async: true,
        dataType: 'html',
        success: function (result) {
            var resultValue = result.split('^');
            var resultCd = resultValue[0];
            var resultMsg = resultValue[1];

            if (resultCd == "0001") {
                resultMsg = resultMsg.replace("좋아요", "공감해요");
                alert(resultMsg);
                return;
            }

            var cnt = parseInt(jQuery(obj).closest(".likeit").find(".clsLikeCnt").html());
            if (sts == "like") {
                jQuery(obj).closest(".likeit").addClass("on");
                jQuery(obj).closest(".likeit").find(".clsLikeTxt").html("공감하셨습니다");
                cnt += 1;
            }
            else {
                jQuery(obj).closest(".likeit").removeClass("on");
                jQuery(obj).closest(".likeit").find(".clsLikeTxt").html("공감해요");
                cnt -= 1;
            }
            jQuery(obj).closest(".likeit").find(".clsLikeCnt").html(cnt);

        },
        error: function (xhr, status, err) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

// 입력된 스트링의 바이트 리턴
function calculate_byte(sTargetStr) {
    var sTmpStr, sTmpChar;
    var nOriginLen = 0;
    var nStrLength = 0;

    sTmpStr = new String(sTargetStr);
    nOriginLen = sTmpStr.length;

    for (var i = 0; i < nOriginLen; i++) {
        sTmpChar = sTmpStr.charAt(i);

        if (escape(sTmpChar).length > 4) {
            nStrLength += 2;
        } else if (sTmpChar != '\r') {
            nStrLength++;
        }
    }
    return nStrLength;
}


function sendAppShareData(type) {
    if (typeof (type) == "undefined") {
        type = "detail";
    }
    var s_Image = jQuery("meta[property='og:image']").attr("content");
    var s_Title = jQuery("meta[property='og:title']").attr("content");
    var s_Description = jQuery("meta[property='og:description']").attr("content");
    var s_Url = jQuery("meta[property='og:url']").attr("content");
    CGVHAAppInterface.SendAppShareData('', s_Title, s_Description, s_Url, '', s_Image, type);
}


//sitemap
var siteMap = function () {
    $('#siteMap').show();
    $('#fogbg').show();
}

var close_sitemap = function () {
    $('#siteMap').hide();
    $('#fogbg').hide();
}



