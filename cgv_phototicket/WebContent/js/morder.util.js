/* 기존 모바일 CGV util.js 참조. ChoiTH. 2017.11.13 */

function fnSendGALog(lType, screenName, eventCategory, eventAction, eventLabel) {
    if(lType != ""){
        if (IsWebView_Master) {  
            CGVHAAppInterface.SendGoogleAnalyticsLog(lType, screenName, eventCategory, eventAction, eventLabel);
        }else{
        	/*
        	 * GA 작업시 
				모바일앱은 MA
				모바일웹은 MW로 넣어주시기 바랍니다. 
        	 */
        	eventCategory = eventCategory.replace("MA","MW");
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
        }else if (type == 5) {
        	// <- 타이틀 =
        	CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||12|gfnBackMove()|', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }else if (type == 6) {
        	// <- 타이틀
        	CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||12|gfnBackMove()|', '|||||', '|||||', '|||||');
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
function basicNavigationNew(type, title, secondButton) {
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
		// <- = 에 뒤로가기 이벤트
		else if (type == 5) {
			// <- 타이틀 =
			CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||12|gfnBackMove()|', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
		}
		//뒤로가기버튼 이후 이벤트
		else if (type == 6) {
			// <- 타이틀
			CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||12|gfnBackMove()|', '|||||', '|||||', '|||||');
		}
		//닫기 이후 페이지이동
		else if (type == 7) {
			lbtnImageUrl = getNavigationIconUrl('icon_close');
			// X 타이틀
			CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||12|gfnBackMove()|', '|||||', '|||||', '|||||');
		}
		//나만의메뉴
		else if (type == 8) {
			lbtnImageUrl = getNavigationIconUrl('icon_back'); 	//뒤로가기버튼이미지
	        rbtnImageUrl = getNavigationIconUrl_Case3(); 		//오른쪽 네비메뉴오픈버튼 이미지
	        secondButton = '|||||';
	        CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||12|gfnBackMove()|', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||1|fnMymenuAdd()|');
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
 * 나만의메뉴
 * @param type
 * @param title
 * @param secondButton
 * @returns
 */
function basicNavigation_Case5(title) {
	if(IsWebView_Master == true && AppVersion_Master >= 433){
        var lbtnImageUrl = getNavigationIconUrl('icon_back'); 	//뒤로가기버튼이미지
        var rbtnImageUrl = getNavigationIconUrl_Case3(); 		//오른쪽 네비메뉴오픈버튼 이미지
        secondButton = '|||||';
        CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||1|fnMymenuAdd()|');
    }
}

/**
 * CGV 기프트카드등록 해더제어.(!)버튼
 * @param type
 * @param title
 * @param secondButton
 * @returns
 */
function basicNavigation_Case6(title, leftFuncName, rightFuncName) {
	if(IsWebView_Master == true && AppVersion_Master >= 433){
		var lbtnImageUrl = getNavigationIconUrl('icon_close'); 	//닫기버튼이미지
		var rbtnImageUrl = getNavigationIconUrl_Case4(); 		//오른쪽 네비메뉴오픈버튼 이미지
		secondButton = '|||||';
		CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||12|'+leftFuncName+'()|', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||1|'+rightFuncName+'()|');
	}
}

/**
 * CGV 결제버튼(X + =)
 * @param type
 * @param title
 * @param secondButton
 * @returns
 */
function basicNavigation_Case7(title, leftFuncName) {
	if(IsWebView_Master == true && AppVersion_Master >= 433){
		var lbtnImageUrl = getNavigationIconUrl('icon_close'); 	//닫기버튼이미지
		var rbtnImageUrl = getNavigationIconUrl('icon_menu'); 	//오른쪽 네비메뉴오픈버튼 이미지
		secondButton = '|||||';
		CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||12|'+leftFuncName+'()|', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
	}
}



/**
 * 앱일때
 * 나만의메뉴해더(+)버튼에서 호출주소로 이동.
 * @param moveUrl
 * @returns
 */
function gfnAllMenuMovePage() {
	location.href = serverUrl + _contextPath + "/menu/productList/productList?myMenuYn=Y";
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
function simpleCloseNavigation2(title, closetype, closeFuncName) {
	if (IsWebView_Master == true && AppVersion_Master >= 433) {
		var lbtnImageUrl = getNavigationIconUrl('icon_close');
		CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||' + closetype + '|'+closeFuncName+'()|', '|||||', '|||||', '|||||');
	}
}

/**
 * 싱글버튼 닫기 이벤트
 * @param title
 * @param leftFuncName
 * @returns
 */
function simpleCloseNavigation3(title) {
	if(IsWebView_Master == true && AppVersion_Master >= 433){
		var lbtnImageUrl = getNavigationIconUrl('icon_close'); 	//닫기버튼이미지
		secondButton = '|||||';
		CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||14||', '|||||', secondButton, '|' + '|||||' + '|||||');
	}
}

/**
 * 뒤로가기 타입1 (< 타이틀 =)
 * @param type
 * @param title
 * @param secondButton
 * @returns
 */
var g_history_back_url= serverUrl + _contextPath + "/mordermain";
function basicNavigationType1(title, returnUrl) {
	if(IsWebView_Master == true && AppVersion_Master >= 433){
        var lbtnImageUrl = getNavigationIconUrl('icon_back'); 	//뒤로가기버튼이미지
        var rbtnImageUrl = getNavigationIconUrl_Case3(); 		//오른쪽 네비메뉴오픈버튼 이미지
        if( isNull(returnUrl) ) {
        	returnUrl = serverUrl + _contextPath + "/mordermain";
        }
        CGVHAAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||12|gfnBackBtn(\''+returnUrl+'\')|', '|||||', '|||||', '|' + encodeURIComponent(rbtnImageUrl) + '||1|fnMymenuAdd()|');
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

/**
 * 등록안내 이미지
 * 사용:CGV 기프트카드등록 해더에서 사용.
 * @returns
 */
function getNavigationIconUrl_Case2() {
	var tUser = navigator.userAgent;
	var iconUrl = '';
	
	if (tUser.indexOf("Android") > 0) {
		//iconUrl = 'https://img.cgv.co.kr/Webapp/Images/Common/Navigation/' + name + '.png';
		iconUrl = 'https://img.cgv.co.kr/WebApp/images/common/topBtn_infoV4_1080.png';
	}
	else {
		if (jQuery(document).width() <= 375) {
			iconUrl = 'https://img.cgv.co.kr/WebApp/images/common/topBtn_infoV4_1080.png';
		}
		else {
			iconUrl = 'https://img.cgv.co.kr/WebApp/images/common/topBtn_infoV4_1080.png';
		}
	}
	return iconUrl;
}

/**
 * 등록안내 이미지
 * 사용:CGV 나만의메뉴 해더에서 사용.
 * @returns
 */
function getNavigationIconUrl_Case3() {
	var tUser = navigator.userAgent;
	var iconUrl = '';
	
	if (tUser.indexOf("Android") > 0) {
		iconUrl = 'https://img.cgv.co.kr/WebApp/images/common/Navigation/ios_small/icon_plus_2x.png';
	}
	else {
		if (jQuery(document).width() <= 375) {
			iconUrl = 'https://img.cgv.co.kr/WebApp/images/common/Navigation/ios_small/icon_plus_2x.png';
		}
		else {
			iconUrl = 'https://img.cgv.co.kr/WebApp/images/common/Navigation/ios_big/icon_plus_3x.png';
		}
	}
	return iconUrl;
}

/**
 * 등록안내 이미지
 * 사용:CGV 기프트카드등록 해더에서 사용.
 * @returns
 */
function getNavigationIconUrl_Case4() {
	var tUser = navigator.userAgent;
	var iconUrl = '';
	
	if (tUser.indexOf("Android") > 0) {
		iconUrl = 'https://img.cgv.co.kr/Webapp/Images/Common/Navigation/ios_big/icon_info.png';
	}
	else {
		if (jQuery(document).width() <= 375) {
			iconUrl = 'https://img.cgv.co.kr/Webapp/Images/Common/Navigation/ios_big/icon_info.png';
		}
		else {
			iconUrl = 'https://img.cgv.co.kr/Webapp/Images/Common/Navigation/ios_big/icon_info.png';
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
 * 앱 새로고침 on/off기능
 * @param _yn ('Y'/'N')
 * @returns
 */
function gfnSetSwipeRefreshOnOff(_yn) {
	if(IsWebView) {
		CGVHAAppInterface.SetSwipeRefreshOnOff(_yn);
	}
}