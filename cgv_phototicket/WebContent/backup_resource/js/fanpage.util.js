/* 기존 모바일 CGV util.js 참조. ChoiTH. 2017.11.13 */


function fnSendGALog(lType, screenName, eventCategory, eventAction, eventLabel) {
    if(lType != ""){
        if (IsWebView_Master) {  
            CGVFanpageAppInterface.SendGoogleAnalyticsLog(lType, screenName, eventCategory, eventAction, eventLabel);
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

function basicNavigation(type, title, secondButton) {
    if(IsWebView_Master == true && AppVersion_Master >= 433){
        var lbtnImageUrl = getNavigationIconUrl('icon_back');
        var rbtnImageUrl = getNavigationIconUrl('icon_menu');

        if(secondButton == ""){
            secondButton = '|||||';
        }

        if(type == 1){
            CGVFanpageAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }else if(type == 2){
            CGVFanpageAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', '|||||', '|||||');
        }else if(type == 3){
        	CGVFanpageAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||14||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }else if (type == 4) {
        	CGVFanpageAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||16||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }
    }
}

function basicNavigation_Case3(type, title, secondButton, thirdButton) {
    if (IsWebView_Master == true && AppVersion_Master >= 433) {
        var lbtnImageUrl = getNavigationIconUrl('icon_back');
        var rbtnImageUrl = getNavigationIconUrl('icon_menu');

        if (secondButton == "") { secondButton = '|||||'; }
        if (thirdButton == "") { thirdButton = '|||||'; }

        if (type == 1) {
            CGVFanpageAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }
        else if (type == 2) {
            CGVFanpageAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||10||', '|||||', '|||||', '|||||');
        }
        else if (type == 3) {
            CGVFanpageAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||14||', thirdButton, secondButton, '|' + encodeURIComponent(rbtnImageUrl) + '||2||');
        }
    }
}

function simpleCloseNavigation(title, closetype) {
    if (IsWebView_Master == true && AppVersion_Master >= 433) {
        var lbtnImageUrl = getNavigationIconUrl('icon_close');
        CGVFanpageAppInterface.SetNavigationBar(title, '|' + encodeURIComponent(lbtnImageUrl) + '||' + closetype + '||', '|||||', '|||||', '|||||');
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