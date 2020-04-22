/* 기존 모바일 CGV util.js 참조. ChoiTH. 2017.11.13 */

function fnSendGALog(lType, screenName, eventCategory, eventAction, eventLabel) {
    if(lType != ""){
        if (IsWebView_Master) {  
            CGVHAAppInterface.SendGoogleAnalyticsLog(lType, screenName, eventCategory, eventAction, eventLabel);
        }else{
        	// PageView
            if(lType == "0"){ 
                ga_cgv("send", "pageview", { "title": screenName });
            }
            // Event
            else if(lType == "1"){   
                ga_cgv("send", { "hitType": "event", "eventCategory": eventCategory, "eventAction": eventAction, "eventLabel": eventLabel });
                ga_cgv("rollup.send", { "hitType": "event", "eventCategory": eventCategory, "eventAction": eventAction, "eventLabel": eventLabel });
            }
        }
    }
}

/**
 * 10 : 일반 뒤로가기 버튼 ,
 * 11 : ‘닫기’ 문구 버튼 ,2 : 
 * 12 : 자바 스크립트 , 
 * 13 : URL 링크 이동,
 * 14 : 무조건 페이지 닫기 (히스토리 사용하지 않음),
 * 15 : 무조건 페이지 닫기이후 웹페이지 새로고침 진행,  
 * 16 : 무조건 페이지 닫기 (히스토리 사용하지 않음) 종료 애니메이션을 왼쪽에서 오른쪽으로 Sliding (V4.4.8 이상)
 * 
 * var secondButton = "|" + encodeURIComponent(getNavigationIconUrl('icon_mycard')) + "||1|fnMoveMyList()|"
 * @param type
 * @param title
 * @param secondButton
 * @returns
 */
function basicNavigation(type, title, secondButton) {
    if(IsWebView_Master == true && AppVersion_Master >= 433){
        var lbtnImageUrl = getNavigationIconUrl('icon_back'); //뒤로가기버튼이미지
        var rbtnImageUrl = getNavigationIconUrl('icon_menu'); //오른쪽 네비메뉴오픈버튼 이미지

        if(secondButton == ""){
            secondButton = '|||||';
        }

        if(type == 1){
        	//일반뒤로가기 <- + =
            CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }else if(type == 2){
        	//뒤로가기이외에는 기능없음 <-
            CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', '|||||', '|||||');
        }else if(type == 3){
        	//무조건 페이지 닫기 (히스토리 사용하지 않음) <- + 버튼한개생성가능 +  =
        	CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||14||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }else if (type == 4) {
        	//무조건 페이지 닫기 (히스토리 사용하지 않음) 종료 애니메이션을 왼쪽에서 오른쪽으로 Sliding (V4.4.8 이상) <- + 버튼한개생성가능 + =
        	CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||16||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }
    }
}

function basicNavigation_Case3(type, title, secondButton, thirdButton) {
    if (IsWebView_Master == true && AppVersion_Master >= 433) {
        var lbtnImageUrl = getNavigationIconUrl('icon_back');
        var rbtnImageUrl = getNavigationIconUrl('icon_menu');

        if (secondButton == "") { secondButton = '|||||'; }
        if (thirdButton == "")  { thirdButton  = '|||||'; }

        if (type == 1) {
        	// 무조건 페이지 닫기 (히스토리 사용하지 않음) <- + 버튼한개생성가능 + =
            CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }
        else if (type == 2) {
        	// 무조건 페이지 닫기 (히스토리 사용하지 않음) <-
            CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', '|||||', '|||||');
        }
        else if (type == 3) {
        	// 뒤로가기 <- + 버튼 2개 생성가능
            CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||14||', thirdButton, secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }
    }
}

function basicNavigation_Case4(type, title, secondButton) {
	if (IsWebView_Master == true && AppVersion_Master >= 433) {
		var lbtnImageUrl = getNavigationIconUrl('icon_close');
		var rbtnImageUrl = getNavigationIconUrl('icon_menu');
		
		if (secondButton == "") { secondButton = '|||||'; }
		
		if (type == 1) {
			// 무조건 페이지 닫기 (히스토리 사용하지 않음) X + 버튼한개생성가능 + =
			CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
		}
		else if (type == 2) {
			// 뒤로가기 X + 버튼 2개 생성가능 + =
			CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||14||', thirdButton, secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
		}
	}
}

/**
 * 닫기버튼만 존재
 * closetype 종류
 * 14 무조건 페이지 닫기 (히스토리 사용하지 않음),
 * 15 무조건 페이지 닫기이후 웹페이지 새로고침 진행,  
 * 16 무조건 페이지 닫기 (히스토리 사용하지 않음) 종료 애니메이션을 왼쪽에서 오른쪽으로 Sliding (V4.4.8 이상)
 * @param title
 * @param closetype
 * @returns
 */
function simpleCloseNavigation(title, closetype) {
    if (IsWebView_Master == true && AppVersion_Master >= 433) {
        var lbtnImageUrl = getNavigationIconUrl('icon_close');
        CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||' + closetype + '||', '|||||', '|||||', '|||||');
    }
}

function simpleCloseNavigationWithBackBtn(title, closetype) {
    if (IsWebView_Master == true && AppVersion_Master >= 433) {
        var lbtnImageUrl = getNavigationIconUrl('icon_back');
        CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||' + closetype + '||', '|||||', '|||||', '|||||');
    }
}


function getNavigationIconUrl(name) {
    var tUser = navigator.userAgent;
    var iconUrl = '';

    if (tUser.indexOf("Android") > 0) {
        //iconUrl = 'http://img.cgv.co.kr/Webapp/Images/Common/Navigation/and/' + name + '.svg';
        iconUrl = 'http://img.cgv.co.kr/Webapp/Images/Common/Navigation/ios_big/' + name + '.png';
    }
    else {
        if (jQuery(document).width() <= 375) {
            iconUrl = 'http://img.cgv.co.kr/Webapp/Images/Common/Navigation/ios_small/' + name + '.png';
        }
        else {
            iconUrl = 'http://img.cgv.co.kr/Webapp/Images/Common/Navigation/ios_big/' + name + '.png';
        }
    }
    return iconUrl;
}

/**
 * 등록안내 이미지
 * 사용:CGV 기프트카드등록 해더에서 사용.
 * @returns
 */
function getNavigationIconUrl_Case2() {
	var tUser = navigator.userAgent;
	var iconUrl = '';
	
	if (tUser.indexOf("Android") > 0) {
		//iconUrl = 'http://img.cgv.co.kr/Webapp/Images/Common/Navigation/' + name + '.png';
		iconUrl = 'http://img.cgv.co.kr/WebApp/images/common/topBtn_infoV4_1080.png';
	}
	else {
		if (jQuery(document).width() <= 375) {
			iconUrl = 'http://img.cgv.co.kr/WebApp/images/common/topBtn_infoV4_1080.png';
		}
		else {
			iconUrl = 'http://img.cgv.co.kr/WebApp/images/common/topBtn_infoV4_1080.png';
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

/**
 * HTML 요소 element가 화면상에 표시되었는지 확인한다
 * @param element
 * @returns
 */
function fnIsElementEnterScreen(element) {
    var screenHeight = screen.height;
    var el = $(element);
    
    return (screenHeight >= el.offset().top - $(window).scrollTop())
}

/**
 * 숫자 num에 세자리마다 콤마를 찍은 포맷으로 반환한다
 * @param num
 * @returns
 */
function fnNumberFormat(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}