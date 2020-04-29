var appinterface_reUrl = "";
CGVHAAppInterface = {
    _calliOS: function (method) {
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("src", method);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    },
    Login: function (id, pwd, autologin) {
        this._calliOS("WebToAPP:Login:" + id + ":" + pwd + ":" + autologin);

        try {
            window.WebToApp.Login(id, pwd, autologin);
        }
        catch (e) {
        }
        finally {
        }
    },
    LoginV4: function (id, pwdInter, pwdLocal, autologin) {
        this._calliOS("WebToAPP:Login:" + id + ":" + pwdInter + ":" + pwdLocal + ":" + autologin);

        try {
            window.WebToApp.Login(id, pwdInter, pwdLocal, autologin);
        }
        catch (e) {
        }
        finally {
        }
    },
    Logout: function () {
        this._calliOS("WebToAPP:Logout");

        try {
            window.WebToApp.Logout();
        }
        catch (e) {
        }
        finally {
        }
    },
    CJONEJoin: function (url) {
        //url = encodeURIComponent(url);
        this._calliOS("WebToAPP:CJONEJoin:" + url);

        try {
            window.WebToApp.CJONEJoin();
        }
        catch (e) {
        }
        finally {
        }
    },
    MainLink: function (url) {
        //url = encodeURIComponent(url);
        this._calliOS("WebToAPP:MainLink:" + url);

        try {
            window.WebToApp.MainLink(url);
        }
        catch (e) {
        }
        finally {
        }
    },
    ReserveFromMovieInfo: function (movieidx) {
        if (confirm("예매페이지로 이동하시겠습니까?")) {
            this._calliOS("WebToAPP:ReserveFromMovieInfo:" + movieidx);

            try {
                window.WebToApp.ReserveFromMovieInfo(movieidx);
            }
            catch (e) {
            }
            finally {
            }
        }
    },
    ReserveFromTheater: function (theaterCode, name, latitude, longitude, regionCode, regionName, isStandardTheater) {
        if (confirm("예매페이지로 이동하시겠습니까?")) {
            this._calliOS("WebToAPP:ReserveFromTheater:" + theaterCode + ":" + name + ":" + latitude + ":" + longitude + ":" + regionCode + ":" + regionName + ":" + isStandardTheater);

            try {
                window.WebToApp.ReserveFromTheater(theaterCode, name, regionCode, regionName, isStandardTheater)
            }
            catch (e) {
            }
            finally {
            }
        }
    },
    ReserveFromTimeTable: function (AreaCd, TheaterCd, CGVCode, movieIdx, PlayYMD, StartHHMM, PlayNum, ScreenCd, ScreenNM, PlayTimeCd, Rating, ScreenRatingCd, ScreenRatingNm, PlayTimeCdNM, MovieGroupTitle, MovieNM, TheaterName, ImageUrl, AreaName, RatingName, PlatFormNm) {
        if (confirm("예매페이지로 이동하시겠습니까?")) {
            this._calliOS("WebToApp:ReserveFromTimeTable:" + AreaCd + ":" + TheaterCd + ":" + CGVCode + ":" + movieIdx + ":" + PlayYMD + ":" + StartHHMM + ":" + PlayNum + ":" + ScreenCd + ":" + ScreenNM + ":" + PlayTimeCd + ":" + Rating + ":" + ScreenRatingCd + ":" + ScreenRatingNm + ":" + PlayTimeCdNM + ":" + MovieGroupTitle + ":" + MovieNM + ":" + TheaterName + ":" + ImageUrl + ":" + AreaName + ":" + RatingName + ":" + PlatFormNm);

            try {
                window.WebToApp.ReserveFromTimeTable(AreaCd, TheaterCd, CGVCode, movieIdx, PlayYMD, StartHHMM, PlayNum, ScreenCd, ScreenNM, PlayTimeCd, Rating, ScreenRatingCd, ScreenRatingNm, PlayTimeCdNM, MovieGroupTitle, MovieNM, TheaterName, ImageUrl, AreaName, RatingName, PlatFormNm)
            }
            catch (e) {
            }
            finally {
            }
        }
    },
    OutLink: function (url, type) {
        //url = encodeURIComponent(url);
        if (typeof (type) == "undefined")
            type = "0";

        if (AppVersion_Master >= 433)
            this._calliOS("WebToAPP:OutLink:" + url + ":" + type);
        else
            this._calliOS("WebToAPP:OutLink:" + url);

        try {
            if (AppVersion_Master >= 433)
                window.WebToApp.OutLink(url, type);
            else
                window.WebToApp.OutLink(url);
        }
        catch (e) {
        }
        finally {
        }
    },
    SendSMS: function (message) {
        //message = encodeURIComponent(message);
        this._calliOS("WebToAPP:SendSMS:" + message);

        try {
            window.WebToApp.SendSMS(message);
        }
        catch (e) {
        }
        finally {
        }
    },
    AddToCalendar: function (movieTitle, openingDate, url) {
        //movieTitle = encodeURIComponent(movieTitle);
        this._calliOS("WebToAPP:AddToCalendar:" + encodeURIComponent(movieTitle) + ":" + openingDate + ":" + encodeURIComponent(url));

        try {
            window.WebToApp.AddToCalendar(encodeURIComponent(movieTitle), openingDate, encodeURIComponent(url));
        }
        catch (e) {
        }
        finally {
        }
    },
    FanPageRequestSystemShareV2: function (movieIdx, movieName, contentsUrl) {
        this._calliOS("WebToAPP:FanPageRequestSystemShare:" + movieIdx + ":" + encodeURIComponent(movieName) + ":" + encodeURIComponent(contentsUrl));

        try {
            window.WebToApp.FanPageRequestSystemShare(movieIdx, encodeURIComponent(movieName), encodeURIComponent(contentsUrl));
        }
        catch (e) {
        }
        finally {
        }
    },
    RequestCurrentLocation: function () {
        this._calliOS("WebToAPP:RequestCurrentLocation");

        try {
            window.WebToApp.RequestCurrentLocation();
        }
        catch (e) {
        }
        finally {

        }

        // 테스트 용
        //this.RequestCurrentLocation_callback('37.481005', '126.951957');
    },
    /* 2012.10.20. (이벤트 결제) */
    EventPaymentComplete: function (successYn, bookingNo, saleNo, custBookingNo) {
        this._calliOS("WebToAPP:EventPaymentComplete:" + successYn + ":" + bookingNo + ":" + saleNo + ":" + custBookingNo);

        try {
            window.WebToApp.EventPaymentComplete(successYn, bookingNo, saleNo, custBookingNo);
        } catch (e) {
        } finally {
        }
    },

    /* 2012.10.24. (이벤트 팝업 닫기) */
    close: function () {
        this._calliOS("WebToAPP:close");

        try {
            window.WebToApp.close();
        } catch (e) {
        } finally {
        }
    },

    RequestCurrentLocation_callback: function (latitude, longitude) {
        window.location.href = "/webapp/theater/SetCurrentLocation.aspx?latitude=" + latitude + "&longitude=" + longitude + "&redirecturl=%2Fwebapp%2Ftheater%2F";

        return false;
    },
    RequestCurrentLocationV4_callback: function (latitude, longitude, gpsStateCd) {
        if (typeof (gpsStateCd) == "undefined" || gpsStateCd == "00") {
            if (appinterface_reUrl != "") {
                window.location.href = "/webapp/theaterV4/SetCurrentLocation.aspx?latitude=" + latitude + "&longitude=" + longitude + "&redirecturl=" + encodeURIComponent(appinterface_reUrl) + "&gpsStateCd=" + gpsStateCd;
            }
            //else {
            //    window.location.href = "/webapp/theaterV4/SetCurrentLocation.aspx?latitude=" + latitude + "&longitude=" + longitude + "&redirecturl=%2Fwebapp%2FtheaterV4%2F&gpsStateCd=" + gpsStateCd;
            //}
        }
        else if (gpsStateCd == "10" || gpsStateCd == "11" || gpsStateCd == "99") {
            if (IsWebViewIPhone_Master) { alert("내위치를 확인할 수 없습니다.\n스마트폰 [설정>CGV앱]에서 위치서비스를 켜주시길 바랍니다."); return false; }
            else {
                if (gpsStateCd == "11") { alert("내위치를 확인할 수 없습니다.\n스마트폰 [설정>위치정보]에서 위치서비스를 켜주시길 바랍니다."); return false; }
                else { alert("내위치를 확인할 수 없습니다.\n스마트폰 [설정>CGV앱]에서 위치서비스를 켜주시길 바랍니다."); return false; }
            }
        }

        return false;
    },
    GetCurrentLocation: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCurrentPositionnCallBack);
        } else {
            //error('미지원');
        }
    },
    //2013.12.10 V4버전
    GetCurrentLocationV4: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCurrentPositionnCallBackV4);
        } else {
            //error('미지원');
        }
    },
    //2015.04.22 ajax
    GetCurrentLocation_201504: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCurrentPositionnCallBack_201504)
        } else {
            //error('미지원');
        }
    },
    getCurrentPositionnCallBack: function (position) {
        window.location.href = "/webapp/theater/SetCurrentLocation.aspx?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&redirecturl=%2Fwebapp%2Ftheater%2F";
    },
    //2013.12.10 V4버전
    getCurrentPositionnCallBackV4: function (position) {
        if (appinterface_reUrl != "") {
            window.location.href = "/webapp/theaterV4/SetCurrentLocation.aspx?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&redirecturl=" + encodeURIComponent(appinterface_reUrl);
        }
        else {
            window.location.href = "/webapp/theaterV4/SetCurrentLocation.aspx?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&redirecturl=%2Fwebapp%2FtheaterV4%2F";
        }
    },
    //2015.04.22 ajax
    getCurrentPositionnCallBack_201504: function (position) {
        var sAjaxUrl = "/webapp/theaterV4/SetCurrentLocation.aspx?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude
        $Ajax(sAjaxUrl, {
            type: 'xhr',
            onload: function (res) {
                self.location.reload();
            }
        }).request({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    },
    OpenMoviePlayer: function (url) {
        this._calliOS("WebToAPP:PlayMovie:" + url);

        try {
            window.WebToApp.PlayMovie(url);
        }
        catch (e) {
        }
        finally {

        }
    },
    RequestAddressbook: function (targetObjectId) {

        this._calliOS("WebToAPP:RequestAddressbook:" + targetObjectId);
        try {
            window.WebToApp.RequestAddressbook(targetObjectId);
        }
        catch (e) {
        }
        finally {

        }
    },
    RequestAddressbook_459: function (targetObjectId, targetObjectNameId) {

        this._calliOS("WebToAPP:RequestAddressbook:" + targetObjectId + ":" + targetObjectNameId);
        try {
            window.WebToApp.RequestAddressbook(targetObjectId, targetObjectNameId);
        }
        catch (e) {
        }
        finally {

        }
    },
    RequestAddressbook_callback: function (mobilePhoneNumber, targetObjectId) {
        document.getElementById(targetObjectId).value = mobilePhoneNumber;
    },
    RequestAddressbook_459_callback: function (mobilePhoneNumber, name, targetObjectId, targetObjectNameId) {
        document.getElementById(targetObjectId).value = mobilePhoneNumber;
        document.getElementById(targetObjectNameId).value = name;
    },
    PushReport: function (messageId, type) {
        this._calliOS("WebToAPP:PushReport:" + messageId + ":" + type);

        try {
            window.WebToApp.PushReport(messageId, type);
        }
        catch (e) {
        }
        finally {

        }
    },
    /* 2013.11.12 (TitleSet'g) */
    TitleSetUp: function (leftBtn, leftUrl, rightBtn, rightUrl, strTitle, strSearc) {
        this._calliOS("WebToApp:SetTitle:" + leftBtn + ":" + leftUrl + ":" + rightBtn + ":" + rightUrl + ":" + strTitle + ":" + strSearc);
        //alert(leftUrl);
        try {
            window.WebToApp.SetTitle(leftBtn, leftUrl, rightBtn, rightUrl, strTitle, strSearc);
        } catch (e) {
        } finally {
        }
    },
    /* 2013.11.29 (좌측버튼) */
    ClosingWebSetUp: function (Title) {
        this._calliOS("WebToApp:ClosingWeb:" + Title);
        //alert(Title);
        try {
            window.WebToApp.ClosingWeb(Title);
        } catch (e) {
        } finally {
        }
    },
    /* 2013.11.29. (우측버튼) */
    PointSaveWebSetUp: function () {
        this._calliOS("WebToApp:PointSaveWeb");
        //alert("PointSaveWebSetUp");
        try {
            window.WebToApp.PointSaveWeb();
        } catch (e) {
        } finally {
        }
    },
    WriteRating: function (movieIndex, mName, isView, returnUrl) {
        this._calliOS("WebToApp:WriteComment:" + movieIndex + ":" + mName + ":" + isView + ":" + returnUrl);
        //alert(leftUrl);
        try {
            window.WebToApp.WriteComment(movieIndex, mName, isView, returnUrl);
        } catch (e) {
        } finally {
        }
    },
    SNS: function (type, url, title) {
        this._calliOS("WebToApp:SNS:" + type + ":" + url + ":" + title);
        try {
            window.WebToApp.SNS(type, url, title);
        } catch (e) {
        } finally {
        }
    },
    MovieChartInEventDetailCall: function (type, url) {
        this._calliOS("WebToAPP:MovieChartInEventDetailCall:" + type + ":" + url);

        try {
            window.WebToApp.MovieChartInEventDetailCall(type, url);
        }
        catch (e) {
        }
        finally {

        }
    },
    ShowTrailer: function (imgURL, mp4URL) {
        this._calliOS("WebToApp:SetTrailerImg:" + imgURL + ":" + mp4URL);
        //alert(mp4URL);
        try {
            window.WebToApp.SetTrailerImg(imgURL, mp4URL);
        } catch (e) {
        } finally {
        }
    },
    ShowStillCut: function (imgURL) {
        this._calliOS("WebToApp:SetStillCutImg:" + imgURL);
        // alert(imgURL);
        try {
            window.WebToApp.SetStillCutImg(imgURL);
        } catch (e) {
        } finally {
        }
    },
    MovieLogRefresh: function (movieIdx, type, wishSeq) {
        this._calliOS("WebToAPP:MovieLogRefresh:" + movieIdx + ":" + type + ":" + wishSeq);

        try {
            window.WebToApp.MovieLogRefresh(movieIdx, type, wishSeq);
        }
        catch (e) {
        }
        finally {

        }
    },
    /* 자주가는CGV */
    GetCurrentCGVLocationV4: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCurrentPositionnCGVCallBackV4);
        } else {
            //error('미지원');
        }
    },
    getCurrentPositionnCGVCallBackV4: function (position) {
        window.location.href = "/webapp/theaterV4/SetCurrentLocation.aspx?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&redirecturl=%2Fwebapp%2FMyCgvV4%2Fcgv_choice.aspx";
    },
    /* 예매연동 (2013.12.17) */
    ReserveFromMovieInfoV4: function (MovieGroupCd, movieName, ratingCd, rKind) {
        //if (confirm("예매페이지로 이동하시겠습니까?")) {
        if (AppVersion_Master >= 417) {
            var rKindValue = "";
            if (typeof (rKind) == "undefined" || rKind.trim() == "") rKindValue = "00"
            else rKindValue = rKind;


            this._calliOS("WebToAPP:ReserveFromMovieInfo:" + MovieGroupCd + ":" + movieName + ":" + ratingCd + ":" + rKindValue);

            try {
                window.WebToApp.ReserveFromMovieInfo(MovieGroupCd, movieName, ratingCd, rKindValue);
            }
            catch (e) {
            }
            finally {
            }
        }
        else {
            this._calliOS("WebToAPP:ReserveFromMovieInfo:" + MovieGroupCd + ":" + movieName + ":" + ratingCd);

            try {
                window.WebToApp.ReserveFromMovieInfo(MovieGroupCd, movieName, ratingCd);
            }
            catch (e) {
            }
            finally {
            }
        }
        //}
    },
    /* 예매연동 (2013.12.17) */
    ReserveFromTheaterV4: function (theaterCode, theaterName) {
        var str_confirm = decodeURIComponent(theaterName) + "의 상영시간표로 이동하시겠습니까?";
        if (confirm(str_confirm)) {
            this._calliOS("WebToAPP:ReserveFromTheater:" + theaterCode + ":" + theaterName);

            try {
                window.WebToApp.ReserveFromTheater(theaterCode, theaterName)
            }
            catch (e) {
            }
            finally {
            }
        }
    },
    /* 예매연동 (2013.12.17) */
    ReserveFromTimeTableV4: function (AreaCd, TheaterCd, CGVCode, movieIdx, PlayYMD, StartHHMM, EndHHMM, PlayNum, movieAttrNm, ScreenCd, ScreenNM, PlayTimeCd, Rating, ScreenRatingCd, ScreenRatingNm, PlayTimeCdNM, MovieGroupTitle, MovieNM, TheaterName, ImageUrl, AreaName, RatingName, PlatFormNm) {
        if (confirm("예매페이지로 이동하시겠습니까?")) {
            this._calliOS("WebToApp:ReserveFromTimeTable:" + AreaCd + ":" + TheaterCd + ":" + CGVCode + ":" + movieIdx + ":" + PlayYMD + ":" + StartHHMM + ":" + EndHHMM + ":" + PlayNum + ":" + movieAttrNm + ":" + ScreenCd + ":" + ScreenNM + ":" + PlayTimeCd + ":" + Rating + ":" + ScreenRatingCd + ":" + ScreenRatingNm + ":" + PlayTimeCdNM + ":" + MovieGroupTitle + ":" + MovieNM + ":" + TheaterName + ":" + ImageUrl + ":" + AreaName + ":" + RatingName + ":" + PlatFormNm);

            try {
                window.WebToApp.ReserveFromTimeTable(AreaCd, TheaterCd, CGVCode, movieIdx, PlayYMD, StartHHMM, EndHHMM, PlayNum, movieAttrNm, ScreenCd, ScreenNM, PlayTimeCd, Rating, ScreenRatingCd, ScreenRatingNm, PlayTimeCdNM, MovieGroupTitle, MovieNM, TheaterName, ImageUrl, AreaName, RatingName, PlatFormNm)
            }
            catch (e) {
            }
            finally {
            }
        }
    },
    IntroEventNoticeInDetailCall: function (type, url) {
        this._calliOS("WebToAPP:IntroEventNoticeInDetailCall:" + type + ":" + url);

        try {
            window.WebToApp.IntroEventNoticeInDetailCall(type, url);
        }
        catch (e) {
        }
        finally {

        }
    },
    MoveGiftshop: function (type, url) {
        this._calliOS("WebToAPP:MoveGiftshop");

        try {
            window.WebToApp.MoveGiftshop();
        }
        catch (e) {
        }
        finally {

        }
    },
    SendWebLog: function (title) {
        this._calliOS("WebToAPP:SendWebLog:" + title);

        try {
            window.WebToApp.SendWebLog(title);
        }
        catch (e) {
        }
        finally {

        }
    },
    SendWebLogMovieDetail: function (title, movieIdx, movieName) {
        this._calliOS("WebToAPP:SendWebLogMovieDetail:" + title + ":" + movieIdx + ":" + movieName);

        try {
            window.WebToApp.SendWebLogMovieDetail(title, movieIdx, movieName);
        }
        catch (e) {
        }
        finally {

        }
    },
    EventBannerCall: function (type, url) {
        this._calliOS("WebToAPP:EventBannerCall:" + type + ":" + url);

        try {
            window.WebToApp.EventBannerCall(type, url);
        }
        catch (e) {
        }
        finally {

        }
    },
    /* 푸쉬알림 수신동의 (2015.09.04) */
    CheckMarketingNotice_New: function (KeyValArr) {
        this._calliOS("WebToAPP:CheckMarketingNotice_New:" + KeyValArr);

        try {
            var temp_arr = KeyValArr.split(":");
            window.WebToApp.CheckMarketingNotice_New(temp_arr[0], temp_arr[1]);
        }
        catch (e) { }
        finally { }
    },
    /* 푸쉬알림 마케팅수신동의 (2015.03.24), state 기본값 13 */
    CheckMarketingNotice: function (pushYN, state) {
        if (typeof state == 'undefined' || state == "") {
            state = "13";
        }

        this._calliOS("WebToAPP:CheckMarketingNotice:" + pushYN + ":" + state);

        try {
            window.WebToApp.CheckMarketingNotice(pushYN, state);
        }
        catch (e) { }
        finally { }
    },
    ExecutePushMessage: function (messageId, type, alert, eventUrl, menuId, movieGroupCd, movieIdx, menuUrl, customData) {
        if (AppVersion_Master < 470) {
            this._calliOS("WebToAPP:ExecutePushMessage:" + messageId + ":" + type + ":" + encodeURIComponent(alert) + ":" + encodeURIComponent(eventUrl) + ":" + menuId + ":" + movieGroupCd + ":" + movieIdx + ":" + encodeURIComponent(menuUrl));

            try {
                window.WebToApp.ExecutePushMessage(messageId, type, encodeURIComponent(alert), encodeURIComponent(eventUrl), menuId, movieGroupCd, movieIdx, encodeURIComponent(menuUrl));
            }
            catch (e) {
            }
            finally {

            }
        }
        else {
            this._calliOS("WebToAPP:ExecutePushMessage:" + messageId + ":" + type + ":" + encodeURIComponent(alert) + ":" + encodeURIComponent(eventUrl) + ":" + menuId + ":" + movieGroupCd + ":" + movieIdx + ":" + encodeURIComponent(menuUrl) + ":" + encodeURIComponent(customData));

            try {
                window.WebToApp.ExecutePushMessage(messageId, type, encodeURIComponent(alert), encodeURIComponent(eventUrl), menuId, movieGroupCd, movieIdx, encodeURIComponent(menuUrl), encodeURIComponent(customData));
            }
            catch (e) {
            }
            finally {

            }
        }

    },
    SendNoticeCount: function (count) {
        this._calliOS("WebToAPP:SendNoticeCount:" + count);

        try {
            window.WebToApp.SendNoticeCount(count);
        }
        catch (e) {
        }
        finally {

        }
    },
    MoveNoticeSetting: function () {
        this._calliOS("WebToAPP:MoveNoticeSetting");

        try {
            window.WebToApp.MoveNoticeSetting();
        }
        catch (e) {
        }
        finally {

        }
    },
    SendAnsimAuthData: function (resultCd, safe_card_no, cavv, xid, eci) {
        this._calliOS("WebToAPP:SendAnsimAuthData:" + resultCd + ":" + encodeURIComponent(safe_card_no) + ":" + encodeURIComponent(cavv) + ":" + encodeURIComponent(xid) + ":" + encodeURIComponent(eci));

        try {
            window.WebToApp.SendAnsimAuthData(resultCd, encodeURIComponent(safe_card_no), encodeURIComponent(cavv), encodeURIComponent(xid), encodeURIComponent(eci));
        }
        catch (e) {
        }
        finally {

        }
    },
    SendCheckAuthData: function (resultCd, ipinCI, birthdate) {
        this._calliOS("WebToAPP:SendCheckAuthData:" + resultCd + ":" + encodeURIComponent(ipinCI) + ":" + birthdate);

        try {
            window.WebToApp.SendCheckAuthData(resultCd, encodeURIComponent(ipinCI), birthdate);
        }
        catch (e) {
        }
        finally {

        }
    },
    PosterDownload: function (url, showDialog) {
        if (AppVersion_Master >= 417) {

            this._calliOS("WebToAPP:PosterDownload:" + encodeURIComponent(url) + ":" + showDialog);

            try {
                window.WebToApp.PosterDownload(encodeURIComponent(url), showDialog);
            }
            catch (e) {
            }
            finally {

            }
        }
        else {

            this._calliOS("WebToAPP:PosterDownload:" + encodeURIComponent(url));

            try {
                window.WebToApp.PosterDownload(encodeURIComponent(url));
            }
            catch (e) {
            }
            finally {

            }
        }
    },
    SendPhonePayAuthData: function (resultCd, resultMsg, mobileNumber, teleComuProviderCode, mobileTransactionNumber, mobileVerifyNumber, mobileID, mobilePayComCode) {
        this._calliOS("WebToAPP:SendPhonePayAuthData:" + resultCd + ":" + encodeURIComponent(resultMsg) + ":" + mobileNumber + ":" + teleComuProviderCode + ":" + mobileTransactionNumber + ":" + mobileVerifyNumber + ":" + mobileID + ":" + mobilePayComCode);

        try {
            window.WebToApp.SendPhonePayAuthData(resultCd, encodeURIComponent(resultMsg), mobileNumber, teleComuProviderCode, mobileTransactionNumber, mobileVerifyNumber, mobileID, mobilePayComCode);
        }
        catch (e) {
        }
        finally {

        }
    },
    ReserveBySeat: function (theaterCd, movieCd, screenCd, playYmd, playNum) {
        if (g_IsLogin == "True") {
            this._calliOS("WebToAPP:ReserveBySeat:" + theaterCd + ":" + movieCd + ":" + screenCd + ":" + playYmd + ":" + playNum);

            try {
                window.WebToApp.ReserveBySeat(theaterCd, movieCd, screenCd, playYmd, playNum);
            }
            catch (e) {
            }
            finally {

            }
        }
        else {
            if (confirm("회원 로그인 후 확인하실 수 있습니다.\n로그인 화면으로 이동합니다.")) {
                if (IsWebView_Master)
                    location.href = "/WebApp/MemberV4/Login.aspx?RedirectURL=" + g_reUrl;
                else
                    location.href = "/WebApp/Member/Login.aspx?RedirectURL=" + g_reUrl;
                return false;
            }
            else {
                return false;
            }
        }
    },
    ReserveBySeatHotDeal: function (theaterCd, movieCd, screenCd, playYmd, playNum, hotdealST, attrCD, attrNM, groupCD, engNM, korNM, ratingCD, ratingNM, theaterNM, kidsType, screenNM, screenRatingCD, screenRatingNM, playEndTime, playStartTime, playTimeCD, saleEndTime) {
        this._calliOS("WebToAPP:ReserveBySeatHotDeal:" + theaterCd + ":" + movieCd + ":" + screenCd + ":" + playYmd + ":" + playNum + ":" + hotdealST + ":" + attrCD + ":" + attrNM + ":" + groupCD + ":" + engNM + ":" + korNM + ":" + ratingCD + ":" + ratingNM + ":" + theaterNM + ":" + kidsType + ":" + screenNM + ":" + screenRatingCD + ":" + screenRatingNM + ":" + playEndTime + ":" + playStartTime + ":" + playTimeCD + ":" + saleEndTime);

        try {
            window.WebToApp.ReserveBySeatHotDeal(theaterCd, movieCd, screenCd, playYmd, playNum, hotdealST, attrCD, attrNM, groupCD, engNM, korNM, ratingCD, ratingNM, theaterNM, kidsType, screenNM, screenRatingCD, screenRatingNM, playEndTime, playStartTime, playTimeCD, saleEndTime);
        }
        catch (e) {
        }
        finally {

        }
    },
    EditComment: function (movieIdx, movieName, isView, isShowView, myPoint, commentText, commentIdx, nextPage) {
        if (AppVersion_Master >= 417) {
            this._calliOS("WebToApp:EditComment:" + movieIdx + ":" + movieName + ":" + isView + ":" + isShowView + ":" + myPoint + ":" + commentText + ":" + commentIdx + ":" + nextPage);

            try {
                window.WebToApp.EditComment(movieIdx, movieName, isView, isShowView, myPoint, commentText, commentIdx, nextPage);
            } catch (e) {
            } finally {
            }
        }
    },
    MoveWishList: function () {
        this._calliOS("WebToApp:MoveWishList");

        try {
            window.WebToApp.MoveWishList();
        } catch (e) {
        } finally {
        }

    },
    SendWebLogPageIdentity: function (pageId) {
        this._calliOS("WebToApp:SendWebLogPageIdentity:" + pageId);

        try {
            window.WebToApp.SendWebLogPageIdentity(pageId);
        } catch (e) {
        } finally {
        }

    },
    SendWebLogEvent: function (title) {
        this._calliOS("WebToApp:SendWebLogEvent:" + title);

        try {
            window.WebToApp.SendWebLogEvent(title);
        } catch (e) {
        } finally {
        }

    },
    ReserveFromSpecialTheater: function (theaterCode, theaterName, screenRatingCd, isSpecialType, menuFlag) {
        var cd_nm = "";
        if (menuFlag == "theaterdetail") {
            switch (screenRatingCd) {
                case "02": cd_nm = "IMAX "; break;
                case "04": cd_nm = "GOLD CLASS "; break;
                case "11": cd_nm = "4DX "; break;
                case "18": cd_nm = "SPHERE X "; break;
            }
        }

        if (IsWebViewIPhone_Master) { //아이폰
            var str_confirm = decodeURIComponent(theaterName) + "의 " + cd_nm + "상영시간표로 이동하시겠습니까?";
            if (confirm(str_confirm)) {
                this._calliOS("WebToAPP:ReserveFromSpecialTheater:" + theaterCode + ":" + theaterName + ":" + screenRatingCd);

                try {
                    window.WebToApp.ReserveFromSpecialTheater(theaterCode, theaterName, screenRatingCd)
                }
                catch (e) {
                }
                finally {
                }
            }
        }
        else if (!IsWebViewIPhone_Master) { //안드로이드
            var str_confirm = decodeURIComponent(theaterName) + "의 " + cd_nm + "상영시간표로 이동하시겠습니까?";
            if (confirm(str_confirm)) {
                this._calliOS("WebToAPP:ReserveFromSpecialTheaterWithType:" + theaterCode + ":" + theaterName + ":" + screenRatingCd + ":" + isSpecialType);

                try {
                    window.WebToApp.ReserveFromSpecialTheaterWithType(theaterCode, theaterName, screenRatingCd, isSpecialType)
                }
                catch (e) {
                }
                finally {
                }
            }
        }
        //if ((IsWebViewIPhone_Master && AppVersion_Master >= 420) || (!IsWebViewIPhone_Master && AppVersion_Master >= 418)) {
        //    var str_confirm = decodeURIComponent(theaterName) + "의 " + cd_nm + "상영시간표로 이동하시겠습니까?";
        //    if (confirm(str_confirm)) {
        //        this._calliOS("WebToAPP:ReserveFromSpecialTheaterWithType:" + theaterCode + ":" + theaterName + ":" + screenRatingCd + ":" + isSpecialType);

        //        try {
        //            window.WebToApp.ReserveFromSpecialTheaterWithType(theaterCode, theaterName, screenRatingCd, isSpecialType)
        //        }
        //        catch (e) {
        //        }
        //        finally {
        //        }
        //    }
        //}
        //else if (IsWebViewIPhone_Master && AppVersion_Master >= 419) {
        //    var str_confirm = decodeURIComponent(theaterName) + "의 " + cd_nm + "상영시간표로 이동하시겠습니까?";
        //    if (confirm(str_confirm)) {
        //        this._calliOS("WebToAPP:ReserveFromSpecialTheater:" + theaterCode + ":" + theaterName + ":" + screenRatingCd);

        //        try {
        //            window.WebToApp.ReserveFromSpecialTheater(theaterCode, theaterName, screenRatingCd)
        //        }
        //        catch (e) {
        //        }
        //        finally {
        //        }
        //    }
        //}
        //else {
        //    CGVHAAppInterface.ReserveFromTheaterV4(theaterCode, theaterName);
        //}
    },
    MainUnitService: function (unitType, url) {
        this._calliOS("WebToApp:MainUnitService:" + unitType + ":" + encodeURIComponent(url));

        try {
            window.WebToApp.MainUnitService(unitType, encodeURIComponent(url));
        } catch (e) {
        } finally {
        }

    },
    SendKakaoPayAuthData: function (resultCd, resultMsg, KAKAOPAYTotalAmount, KAKAOPAYMerchantNum, KAKAOPAYVerifyKey, KAKAOPAYVerifyToken, MPayKey) {
        this._calliOS("WebToApp:SendKakaoPayAuthData:" + resultCd + ":" + encodeURIComponent(resultMsg) + ":" + encodeURIComponent(KAKAOPAYTotalAmount) + ":" + encodeURIComponent(KAKAOPAYMerchantNum) + ":" + encodeURIComponent(KAKAOPAYVerifyKey) + ":" + encodeURIComponent(KAKAOPAYVerifyToken) + ":" + encodeURIComponent(MPayKey));

        try {
            window.WebToApp.SendKakaoPayAuthData(resultCd, encodeURIComponent(resultMsg), encodeURIComponent(KAKAOPAYTotalAmount), encodeURIComponent(KAKAOPAYMerchantNum), encodeURIComponent(KAKAOPAYVerifyKey), encodeURIComponent(KAKAOPAYVerifyToken), encodeURIComponent(MPayKey));
        } catch (e) {
        } finally {
        }
    },
    ReloadView: function (type) {
        this._calliOS("WebToApp:ReloadView:" + type);

        try {
            window.WebToApp.ReloadView(type);
        } catch (e) {
        } finally {
        }
    },
    SendGoogleAnalyticsLog: function (lType, screenName, eventCategory, eventAction, eventLabel) {
        this._calliOS("WebToApp:SendGoogleAnalyticsLog:" + lType + ":" + encodeURIComponent(screenName) + ":" + encodeURIComponent(eventCategory) + ":" + encodeURIComponent(eventAction) + ":" + encodeURIComponent(eventLabel));

        try {
            window.WebToApp.SendGoogleAnalyticsLog(lType, encodeURIComponent(screenName), encodeURIComponent(eventCategory), encodeURIComponent(eventAction), encodeURIComponent(eventLabel));
        } catch (e) {
        } finally {
        }
    },
    SendPaymentData: function (pType, resultCd, resultMsg, pData1, pData2, pData3, pData4, pData5, pData6, pData7, pData8, pData9, pData10) {
        this._calliOS("WebToApp:SendPaymentData:" + pType + ":" + resultCd + ":" + encodeURIComponent(resultMsg) + ":" + encodeURIComponent(pData1) + ":" + encodeURIComponent(pData2) + ":" + encodeURIComponent(pData3) + ":" + encodeURIComponent(pData4) + ":" + encodeURIComponent(pData5) + ":" + encodeURIComponent(pData6) + ":" + encodeURIComponent(pData7) + ":" + encodeURIComponent(pData8) + ":" + encodeURIComponent(pData9) + ":" + encodeURIComponent(pData10));

        try {
            window.WebToApp.SendPaymentData(pType, resultCd, encodeURIComponent(resultMsg), encodeURIComponent(pData1), encodeURIComponent(pData2), encodeURIComponent(pData3), encodeURIComponent(pData4), encodeURIComponent(pData5), encodeURIComponent(pData6), encodeURIComponent(pData7), encodeURIComponent(pData8), encodeURIComponent(pData9), encodeURIComponent(pData10));
        } catch (e) {
        } finally {
        }
    },
    SendClientLog: function (type, time) {
        this._calliOS("WebToAPP:SendClientLog:" + type + ":" + time);

        try {
            window.WebToApp.SendClientLog(type, time);
        }
        catch (e) { }
        finally { }
    },
    SetAlarmSound: function (sound) {
        //url = encodeURIComponent(url);
        this._calliOS("WebToAPP:SetAlarmSound:" + sound);

        try {
            window.WebToApp.SetAlarmSound(sound);
        }
        catch (e) {
        }
        finally {
        }
    },
    SetNavigationBar: function (title, lbtn, rbtn1, rbtn2, rbtn3) {
        this._calliOS("WebToAPP:SetNavigationBar:" + encodeURIComponent(title) + ":" + lbtn + ":" + rbtn1 + ":" + rbtn2 + ":" + rbtn3);

        try {
            window.WebToApp.SetNavigationBar(encodeURIComponent(title), lbtn, rbtn1, rbtn2, rbtn3);
        }
        catch (e) {
        }
        finally {
        }

    },
    PageOut_Reload: function (type) {
        this._calliOS("WebToAPP:PageOut_Reload:" + type);

        try {
            window.WebToApp.PageOut_Reload(type);
        }
        catch (e) {
        }
        finally {
        }

    },
    ClosingWebSetUp_Navi: function (type) {
        this._calliOS("WebToAPP:ClosingWebSetUp:" + type);

        try {
            window.WebToApp.ClosingWebSetUp(type);
        }
        catch (e) {
        }
        finally {
        }

    },
    RequestAppInfo: function () {
        this._calliOS("WebToAPP:RequestAppInfo");

        try { window.WebToApp.RequestAppInfo(); }
        catch (e) { }
        finally { }
    },
    RequestAppInfo_callback: function (ver, model, telecom) {
        var AppInfo_AppVersion = ver.replace(/(\s*)/g, "").replace(/\./g, "");
        AppInfo_AppVersion = parseInt(AppInfo_AppVersion);
        try {
            fnRequestAppInfo_callback(AppInfo_AppVersion, model, telecom);
        } catch (e) { }
    },
    SendLocationAgreeState: function (type) { //위치 서비스 동의 완료 후 완료 여부 전송
        this._calliOS("WebToAPP:SendLocationAgreeState:" + type);

        try {
            window.WebToApp.SendLocationAgreeState(type);
        }
        catch (e) {
        }
        finally {
        }
    },
    CallWebViewNonHeader: function (url, type) {
        this._calliOS("WebToAPP:CallWebViewNonHeader:" + encodeURIComponent(url) + ":" + type);

        try {
            window.WebToApp.CallWebViewNonHeader(encodeURIComponent(url), type);
        }
        catch (e) {
        }
        finally {
        }
    },
    KidsClubMemberCheck: function (type) {
        this._calliOS("WebToAPP:KidsClubMemberCheck:" + type);

        try {
            window.WebToApp.KidsClubMemberCheck(type);
        }
        catch (e) {
        }
        finally {
        }
    },
    NoblesseClubMemberCheck: function (type) {
        this._calliOS("WebToAPP:NoblesseClubMemberCheck:" + type);

        try {
            window.WebToApp.NoblesseClubMemberCheck(type);
        }
        catch (e) {
        }
        finally {
        }
    },
    CGV4DXRedCardRegister: function (type) {
        this._calliOS("WebToAPP:CGV4DXRedCardRegister:" + type);

        try {
            window.WebToApp.CGV4DXRedCardRegister(type);
        }
        catch (e) {
        }
        finally {
        }
    },
    GetVideoAutoPlayType: function () {
        this._calliOS("WebToAPP:GetVideoAutoPlayType");

        try {
            window.WebToApp.GetVideoAutoPlayType();
        }
        catch (e) {
        }
        finally {
        }
    },
    GetVideoAutoPlayType_callback: function (type) {
        if (typeof GetVideoAutoPlayType_callback === "function") {
            GetVideoAutoPlayType_callback(type);
        }
    },
    SetVideoAutoPlayType: function (type) {
        this._calliOS("WebToAPP:SetVideoAutoPlayType:" + type);

        try {
            window.WebToApp.SetVideoAutoPlayType(type);
        }
        catch (e) {
        }
        finally {
        }
    },
    ExecuteBarcodeScan: function (title) {   // 바코드 스캔 결과값 2018.05.08
        this._calliOS("WebToAPP:ExecuteBarcodeScan:" + encodeURIComponent(title));

        try {
            window.WebToApp.ExecuteBarcodeScan(encodeURIComponent(title));
        }
        catch (e) {
        }
        finally {
        }
    },
    ExecuteBarcodeScan_callback: function (result) {
        if (typeof ExecuteBarcodeScan_callback === "function") {
            ExecuteBarcodeScan_callback(result);
        }
    },
    SubmitPaymentSucces: function (bookingNo, saleNo, discountNames, paymentTypeName, paymentCardName) {
        this._calliOS("WebToAPP:SubmitPaymentSucces:" + bookingNo + ":" + saleNo + ":" + encodeURIComponent(discountNames) + ":" + encodeURIComponent(paymentTypeName) + ":" + encodeURIComponent(paymentCardName));

        try {
            window.WebToApp.SubmitPaymentSucces(bookingNo, saleNo, encodeURIComponent(discountNames), encodeURIComponent(paymentTypeName), encodeURIComponent(paymentCardName));
        }
        catch (e) {
            $.ajax({
                type: "POST",
                url: "/WebApp/MPG/Final/PaymentFinalRequest.aspx/SetSubmitPaymentResultLog",
                async: false,
                data: "{ bookingNo: '" + bookingNo + "', text: '" + encodeURIComponent(e.message) + "', data: ''}",
                dataType: "JSON",
                contentType: "application/json"
            });
        }
        finally {
            $.ajax({
                type: "POST",
                url: "/WebApp/MPG/Final/PaymentFinalRequest.aspx/SetSubmitPaymentResultLog",
                async: false,
                data: "{ bookingNo: '" + bookingNo + "', text: '" + encodeURIComponent("최종결제 SubmitPaymentSucces Finally") + "', data: ''}",
                dataType: "JSON",
                contentType: "application/json"
            });
        }
    },
    MoveUserProfileSetting: function () {
        this._calliOS("WebToAPP:MoveUserProfileSetting");

        try {
            window.WebToApp.MoveUserProfileSetting();
        }
        catch (e) {
        }
        finally {
        }
    },
    MoveWatchMovieList: function () {
        this._calliOS("WebToAPP:MoveWatchMovieList");

        try {
            window.WebToApp.MoveWatchMovieList();
        }
        catch (e) {
        }
        finally {
        }
    },
    MoveRegistMovie: function () {
        this._calliOS("WebToAPP:MoveRegistMovie");

        try {
            window.WebToApp.MoveRegistMovie();
        }
        catch (e) {
        }
        finally {
        }
    },
    MoveSetting: function () {
        this._calliOS("WebToAPP:MoveSetting");

        try {
            window.WebToApp.MoveSetting();
        }
        catch (e) {
        }
        finally {
        }
    },
    MoveWishList: function () {
        this._calliOS("WebToAPP:MoveWishList");

        try {
            window.WebToApp.MoveWishList();
        }
        catch (e) {
        }
        finally {
        }
    },
    MoveAppLogin: function () {
        this._calliOS("WebToAPP:MoveAppLogin");

        try {
            window.WebToApp.MoveAppLogin();
        }
        catch (e) {
        }
        finally {
        }
    },
    CouplingClubMemberCheck: function (type) {
        this._calliOS("WebToAPP:CouplingClubMemberCheck:" + type);

        try {
            window.WebToApp.CouplingClubMemberCheck(type);
        }
        catch (e) {
        }
        finally {
        }
    },
    SetStoreBasketCount: function (btnPos, itemCount) { // 스토어 장바구니 추가 18.10.22    
        this._calliOS("WebToAPP:SetStoreBasketCount:" + btnPos + ":" + itemCount);
        try {
            window.WebToApp.SetStoreBasketCount(btnPos, itemCount);  // 0 : 왼쪽 버튼, 1 : 오른쪽 첫번째 버튼, 2: 오른쪽 두번째 버튼, 3 : 오른쪽 세번째 버튼
        }
        catch (e) {
        }
        finally {
        }
    },
    SendAppShareData: function (movieIdx, title, description, contentsUrl, backgroundUrl, stickerUrl, pageType) {
        this._calliOS("WebToAPP:SendAppShareData:" + movieIdx + ":" + encodeURIComponent(title) + ":" + encodeURIComponent(description) + ":" + encodeURIComponent(contentsUrl) + ":" + encodeURIComponent(backgroundUrl) + ":" + encodeURIComponent(stickerUrl) + ":" + encodeURIComponent(pageType));

        try {
            window.WebToApp.SendAppShareData(movieIdx, encodeURIComponent(title), encodeURIComponent(description), encodeURIComponent(contentsUrl), encodeURIComponent(backgroundUrl), encodeURIComponent(stickerUrl), encodeURIComponent(pageType));
        }
        catch (e) {
        }
        finally {
        }
    },
    NonmemberLogin: function (phoneNum, birth, password, isAutologin, isShowMobileTicket, residentNumber) {
        if (AppVersion_Master >= 472) {
            this._calliOS("WebToAPP:NonmemberLogin:" + phoneNum + ":" + birth + ":" + password + ":" + isAutologin + ":" + isShowMobileTicket + ":" + residentNumber);

            try {
                window.WebToApp.NonmemberLogin(phoneNum, birth, password, isAutologin, isShowMobileTicket, residentNumber);
            }
            catch (e) {
            }
            finally {
            }
        }
        else {
            this._calliOS("WebToAPP:NonmemberLogin:" + phoneNum + ":" + birth + ":" + password + ":" + isAutologin + ":" + isShowMobileTicket);

            try {
                window.WebToApp.NonmemberLogin(phoneNum, birth, password, isAutologin, isShowMobileTicket);
            }
            catch (e) {
            }
            finally {
            }
        }
    },
    RequestAppUpdate: function () {
        this._calliOS("WebToAPP:RequestAppUpdate");

        try {
            window.WebToApp.RequestAppUpdate();
        }
        catch (e) {
        }
        finally {
        }
    },
    SetSwipeRefreshOnOff: function (isUse) { //2019-11-12  Refresh 여부 적용, Y : 사용(기본값) / N( : (사용안함)
        this._calliOS("WebToAPP:SetSwipeRefreshOnOff:" + isUse);

        try {
            window.WebToApp.SetSwipeRefreshOnOff(isUse);
        }
        catch (e) {
        }
        finally {
        }
    },
    ShowQReserve: function (yN) {
        
        if (AppVersion_Master >= 474)
        {
            //지금예매 퀵버튼 노출여부
            this._calliOS("WebToAPP:ShowQReserve:" + yN);

            try {
                window.WebToApp.ShowQReserve(yN);
            }
            catch (e) {
            }
            finally {
            }
        }
        
    },
    ExecuteCreditCardRecognizer: function (title) {
        this._calliOS("WebToAPP:ExecuteCreditCardRecognizer");

        try {
            window.WebToApp.ExecuteCreditCardRecognizer();
        }
        catch (e) {
        }
        finally {
        }
    },
    ExecuteCreditCardRecognizer_callback: function (number, month, year) {
        if (typeof ExecuteCreditCardRecognizer_callback === "function") {
            ExecuteCreditCardRecognizer_callback(number, month, year);
        }
    },
    GoMainAndSelectTab: function (index) {
        this._calliOS("WebToAPP:GoMainAndSelectTab:" + index);

        try {
            window.WebToApp.GoMainAndSelectTab(index);
        }
        catch (e) {
        }
        finally {
        }
    },
    GoMainAndSelectTabFromKey: function (menuKey, URL) {
        this._calliOS("WebToAPP:GoMainAndSelectTabFromKey:" + menuKey + ":" + URL);

        try {
            window.WebToApp.GoMainAndSelectTabFromKey(menuKey, URL);
        }
        catch (e) {
        }
        finally {
        }
    },
    CallScheduleMiniMap: function (theaterCd, screenCd, playYMD, playStartTm, playNum, movieGroupCd, movieCd, movieAttrCd, movieAttrNm, movieRatingCd, screenRatingCd, timeNotice) {
        //2020-02-25 빠른예매(비교예매)에서 미니맵 호출
        this._calliOS("WebToAPP:ShowMiniMap:" + theaterCd + ":" + screenCd + ":" + playYMD + ":" + playStartTm + ":" + playNum + ":" + movieGroupCd + ":" + movieCd + ":" + movieAttrCd + ":" + movieAttrNm + ":" + movieRatingCd + ":" + screenRatingCd + ":" + timeNotice);

        try {
            window.WebToApp.ShowMiniMap(theaterCd, screenCd, playYMD, playStartTm, playNum, movieGroupCd, movieCd, movieAttrCd, movieAttrNm, movieRatingCd, screenRatingCd, timeNotice);
        }
        catch (e) {
        }
        finally {
        }
    },
    SetScheldulePlayDayZoneFixed: function (fixYN) {
        //2020-03-02 빠른예매(비교예매) - 앱에서 스케쥴 스크롤링할때 상단 날짜영역 고정/해제되는 시점에 스타일적용하기 위해 해당 이벤트를 호출
        this._calliOS("WebToAPP:SetScheldulePlayDayZoneFixed:" + fixYN);

        try {
            window.WebToApp.SetScheldulePlayDayZoneFixed(fixYN);
        }
        catch (e) {
        }
        finally {
        }
    },
    MoveQuickResult: function (movieGroupCd, theaterCd, playYMD, playStartTm, playEndTm, fromMainYN) {
        //2020-03-10 빠른예매(비교예매) - 앱 비교예매 조회 화면에서 "조회하기" 버튼 클릭했을때 호출
        this._calliOS("WebToAPP:MoveQuickResult:"+movieGroupCd+":"+theaterCd+":"+playYMD+":"+playStartTm+":"+playEndTm+":"+fromMainYN);

        try {
            window.WebToApp.MoveQuickResult(movieGroupCd, theaterCd, playYMD, playStartTm, playEndTm, fromMainYN);
        }
        catch (e) {
        }
        finally {
        }
    },
};

