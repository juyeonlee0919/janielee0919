/* 팬페이지 공통 기능. ChoiTH */

var dragonChk=false;

var naviAgent = navigator.userAgent;
//var isIPHONE = naviAgent.indexOf("iPhone") > 0 || naviAgent.indexOf("iPad") > 0;


// 사이트맵 열기. ChoiTH
function fnSiteMap(){
	$("#fogbg").show();
	$("#siteMap").show();
}

// 사이트맵 닫기. ChoiTH
function fnCloseSiteMap(){
	$("#siteMap").hide();
	//$("#fogbg").hide();
}

// 공유하기. ChoiTH
function fnShareContents(cont, idx, movieIdx, $obj, groupTitle){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_배급사팬페이지", "공유하기", groupTitle);
	}else{
		fnSendGALog("1", "", "MW_배급사팬페이지", "공유하기", groupTitle);
	}
	// 수정 Son.HW
	var url = ""
	if(idx == undefined){
		url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + movieIdx;
	} else{
		url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + movieIdx + "&fanpageReturnUrl=" + encodeURIComponent("contentsDetail?movieIdx=" + movieIdx + "_contentsIdx=" + idx);
	}
	
	if(idx == undefined){
		addUrl = window.document.location.href;
	} else{
		addUrl = "contentsDetail?movieIdx=" + movieIdx + "&contentsIdx=" + idx;
	}
	var url = gateURL + "Fanpage/Gateway.aspx?movieIdx="+movieIdx+"&fanpageReturnUrl="+ encodeURIComponent(addUrl);
	//var url = "http://devm.cgv.co.kr:8083/WebApp/Fanpage/Gateway.aspx?movieIdx="+strMovieIdx+"&fanpageReturnUrl="+window.document.location.href;
	$.ajax({
		method : "post",
		url : "/fanpage/shortURL",
		dataType : "json",
		data : {id:strUserId, realUrl:url},
		async : false,
		success : function(result){
			url = result.resultData.shortUrl;
		},
		error : function(){
			alert("처리 중 에러가 발생했습니다.\n잠시 후에 다시 이용해 주세요;")
		}
	})
	
	var bgUrl = backgroundUrl;
	
	// 팬페이지 공유하기일 경우
	if(cont == undefined || cont == ""){
		cont = movieGroupTitle;

	// 팬페이지 컨텐츠 공유하기일 경우
	}else{
		cont = cont.length > 20 ? cont.substr(0, 20) + "..." : cont;
		if($('.cover_img').eq(0).find('img').attr('src') == undefined && $('.video_box video').attr('poster') == undefined){
			bgUrl = "";
		} else if($('.cover_img').eq(0).find('img').attr('src') != undefined){
			bgUrl = $('.cover_img').eq(0).find('img').attr('src');
		} else {
			bgUrl = $('.video_box video').attr('poster');
		}
	}
	if(IsWebView_Master){
		if(AppVersion_Master >= 459){
			var stickerUrl = "http://img.cgv.co.kr/WebApp/images/common/cgv_logo_w.png";
			//alert('459VER, 영화IDX:' + strMovieIdx + ", 영화명:" + movieGroupTitle + ", 시놉시스:" + "시놉시스, url:" + url + ", 배경:" + backgroundUrl);
			CGVFanpageAppInterface.SendAppShareData(movieIdx, groupTitle, cont, url, bgUrl, stickerUrl, 'movie');
			bgUrl= "";
		} else {
			CGVFanpageAppInterface.FanPageRequestSystemShare(movieIdx, cont, url);
		}
		
		//CGVFanpageAppInterface.FanPageRequestSystemShare(strMovieIdx, cont, url);
	} 
}

//영화등급 가져오기
function fnReserveGrade(sGrade){
    switch (sGrade)
    {
        case "230": return "03";
        case "231": return "02";
        case "232": return "01";
        case "233": return "04";
        case "919": return "99";
    }

    return "99";	
}



// 예매하기.
function fnReservation(rKind, sm_type, chkYn){    
	/*if(!IsLogin){
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
			return;
		}
	}else{*/

		if(AppVersion_Master >= 448){
			fnSendGALog("1", "", "MA_팬페이지", "예매하기", movieGroupTitle);
		}else{
			fnSendGALog("1", "", "MW_팬페이지", "예매하기", movieGroupTitle);
		}
		/*}*/
		
	    if (rKind == undefined || rKind == "") {
	        rKind = "00";
	    }
	
	    
	    
	    //영화등급 가져오기
		var rateCode = fnReserveGrade(Grade);
		
		//if(jQuery(this).hasClass('reserve')) {
		if(chkYn == 'Y'){	
			var $layer = jQuery('#reserveLayerPop');
			
			$layer.addClass('on');
			$layer.show();	
			$layer.find('.fogbg').click(function() {
				$layer.removeClass('on');
			})
	
		}else{
			checkReserve(IsWebView_Master, mgCD, movieGroupTitle, rateCode, rKind, sm_type);
		}
		
	
	
			// rKind - 04 : IMAX, 03 : 4DX, 08 : SCREENX, 00 : 일반
	/*		if (IsWebView_Master == false) {
	            checkReserve(IsWebView_Master, mgCD, movieTitle, rateCode, rKind, sm_type);
	        }
	        else {
	            if (AppVersion_Master >= 417) {
	                checkReserve(IsWebView_Master, mgCD, movieTitle, rateCode, rKind, sm_type);
	            }
	            else {
	                if (rKind == "00") {
	                    checkReserve(IsWebView_Master, mgCD, movieTitle, rateCode, rKind, sm_type);
	                }
	            }
	        }*/
		
}

// 영화 예매 가능 여부 확인
function checkReserve(webViewFlag, mgCD, movTitle, rateCode, rKind, sm_type) {
    var result;
    
	$('#reserveLayerPop').removeClass('on');
	$('#reserveLayerPop').hide();
	
    if (rKind == "00") {
        //00은 체크하지 않는다.
        if (webViewFlag) {
        	
        	//var $layer = jQuery('#layer_pop_re');

            CGVFanpageAppInterface.ReserveFromMovieInfoV4(mgCD, encodeURIComponent(movTitle), rateCode, rKind);
        }
        else {
            //그냥 예약
            //함수 재정의가 필요하다. or window.open
            var smtype = sm_type || "";
            // 하드코딩 Son.HW
            goOutLink(ticketURL + "quickReservation/Default.aspx?MovieIdx=" + strMovieIdx + "&sm_type=" + smtype);
        }
    }
    else {
    	
    	if (webViewFlag){
    		CGVFanpageAppInterface.ReserveFromMovieInfoV4(mgCD, encodeURIComponent(movTitle), rateCode, rKind);
    	}
    	
    	else {
    		var smtype = sm_type || "";
    		goOutLink(ticketURL + "quickReservation/Default.aspx?MovieIdx=" + strMovieIdx + "&sm_type=" + smtype);
    	}

      /*  $.ajax({
			method: "get",
			url: "http://devm.cgv.co.kr:8083/WebApp/MovieV4/cont/chkReserve.aspx",
		//	processData: false, 
		//    contentType: false,  	
            dataType : "xml",
            data : "GroupCd="+mgCD+"&rKind="+rKind
    		,
    		success : function(msg) {

                //alert(resText + rKind);
                if (msg == "00000") {
                    if (webViewFlag) {
                        CGVFanpageAppInterface.ReserveFromMovieInfoV4(mgCD, encodeURIComponent(movTitle), rateCode, rKind);
                    }
                    else {
                        //그냥 예약
                        //함수 재정의가 필요하다. or window.open
                        var smtype = sm_type || "";
                        goOutLink("/quickReservation/Default.aspx?MovieIdx=" + strMovieIdx + "&sm_type=" + smtype);
                    }

                }
                else if (msg == "30031") {
                    alert("선택하신 상영타입의 예매 스케쥴은\n모두 종료되었습니다.");
                }
                else {
                    alert("선택하신 상영타입의 예매 스케쥴이\n모두 종료되었습니다.");
                }

    		},
    		error : function(){
    			result = "ERROR";
            }
        });*/
     //  return result;
       
      /*  var sAjaxUrl = "http://devm.cgv.co.kr:8083/WebApp/MovieV4/cont/chkReserve.aspx?GroupCd"+mgCD + "&rKind="+rKind;
         $Ajax(sAjaxUrl, {
            type: 'xhr',
            async: false,
            onload: function (res) {
                if (res.status() == 200) {
                    var resText = res.text().trim();
                    //alert(resText + rKind);
                    if (resText == "00000") {
                        if (webViewFlag) {
                            CGVFanpageAppInterface.ReserveFromMovieInfoV4(mgCD, encodeURIComponent(movTitle), rateCode, rKind);
                        }
                        else {
                            //그냥 예약
                            //함수 재정의가 필요하다. or window.open
                            var smtype = sm_type || "";
                            goOutLink("/quickReservation/Default.aspx?MovieIdx=" + strMovieIdx + "&sm_type=" + smtype);
                        }

                    }
                    else if (resText == "30031") {
                        alert("선택하신 상영타입의 예매 스케쥴은\n모두 종료되었습니다.");
                    }
                    else {
                        alert("선택하신 상영타입의 예매 스케쥴이\n모두 종료되었습니다.");
                    }
                }
                else {
                    result = "ERROR";
                }
            }
        }).request({ GroupCd: mgCD, rKind: rKind });*/
       //console.log(commentAjax);
        // ajax 페이지 호출
        //commentAjax.request({ GroupCd: mgCD, rKind: rKind });
         
 
    }
    return result;
}

// 외부 링크 연결. ChoiTH
function goOutLink(url, type){
    if(IsWebView_Master){
    	CGVFanpageAppInterface.OutLink(url, type);
    }else{
        location.href = url;
    }
}

//이벤트 링크 연결. 
function eventLink(type, url){
    if(IsWebView_Master){
    	CGVFanpageAppInterface.EventBannerCall(type, encodeURIComponent(url));
    }else{
        location.href = url;
    }
}

// 로그인 화면 이동. ChoiTH
function fnMoveLoginPage(){
	var memberPath = "Member";
	var reUrl = encodeURIComponent(window.document.location.href);
	
	if(IsWebView_Master){
		memberPath = "MemberV4";
	}
	
	location.href = gateURL +memberPath+"/Login.aspx?RedirectUrl=" + gateURL + "Fanpage/Gateway.aspx?agencyCd="+strAgencyCd+"&fanpageReturnUrl="+reUrl;
	//location.href = "http://devm.cgv.co.kr:8083/WebApp/"+memberPath+"/Login.aspx?RedirectUrl=http://devm.cgv.co.kr:8083/WebApp/Fanpage/Gateway.aspx?movieIdx="+strMovieIdx+"&fanpageReturnUrl="+reUrl;
}

// 탭메뉴 이동. ChoiTH
function fnMyTabBtn(iTab, tabMn){
	destroySlide(jQuery('.makers_slide .owl-carousel'));
	destroySlide(jQuery('.movie_trailer .owl-carousel'));
	
	$("li[id^=tabMenu_]").removeClass("on");
	$("#tabMenu_"+iTab).addClass("on");
	$("div[id^=fpTabCont]").removeClass("on").hide();
	$("#fpTabCont"+iTab).addClass("on").show();
	
	// 임시 조건. 차후 수정 예정
	if(iTab == 1){
		fnTabMenu(tabMn);
	}else{
		fnTabMenu(iTab);
	}
}

// 팬페이지 볼래요 기능. ChoiTH
function fnAgencyWish(kind, $obj){
	if(!IsLogin){
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
			return;
        }
	}else{
		var wishFlag = $('#wishFlag').attr('data-src');
		// 볼래요 ON 일경우 만 GA 등록
		if(wishFlag == 'off'){
			if(AppVersion_Master >= 448){
				fnSendGALog("1", "", "MA_배급사팬페이지", "좋아요", strAgencyName);
			}else{
				fnSendGALog("1", "", "MW_배급사팬페이지", "좋아요", strAgencyName);
			}
		} 
		$.ajax({
			method: "post",
			url: "/fanpage/agencyWish",
			dataType: "json",
			data: {optKind:kind, agencyCd:strAgencyCd},
			success: function(result){
				
				if(result.result_code == "success"){
					var wishCnt;
					if(kind == "AG"){
						// 좋아요 눌렀을 경우
						if(result.resultCd == "0"){
							$obj.parent("li").addClass("on");
							$('#wishFlag').attr('data-src', 'on')
							wishCnt = result.WISH_CNT;
							$('#wishCnt').text(wishCnt);
							if(wishCnt == 1){ $('.like_fan_count').show(); }
							if(wishCnt < 4){
								$('.fan_count_thumb div').remove();
								for(var i=0 ; i<wishCnt ; i++){
									$obj = '<div><span><img src="http://img.cgv.co.kr' + result.agencyProfileList[i].UserSmallImage +'"></span></div>';
									$('.fan_count_thumb').append($obj);
								}
							} else {
								for(var i=0 ; i<3 ; i++){
									$('.fan_count_thumb div').eq(i).find('span>img').attr('src', "http://img.cgv.co.kr" + result.agencyProfileList[i].UserSmallImage);
								}
							}
						// 좋아요 해지할 경우 
						} else if (result.resultCd == "1"){
							$obj.parent("li").removeClass("on");
							$('#wishFlag').attr('data-src', 'off');
							wishCnt = result.WISH_CNT;
							$('#wishCnt').text(wishCnt);
							if(wishCnt == 0){ $('.like_fan_count').hide(); }
							if(wishCnt < 3){
								$('.fan_count_thumb div').remove();
								for(var i=0 ; i<wishCnt ; i++){
									$obj = '<div><span><img src="http://img.cgv.co.kr' + result.agencyProfileList[i].UserSmallImage +'"></span></div>';
									$('.fan_count_thumb').append($obj);
								}
							} else {
								for(var i=0 ; i<3 ; i++){
									$('.fan_count_thumb div').eq(i).find('span>img').attr('src', "http://img.cgv.co.kr" + result.agencyProfileList[i].UserSmallImage);
								}
							}
						}
					}
				}
				
			},
			error: function(){
				location.href = gateURL + "/Fanpage/Gateway.aspx?agencyCd=" + strAgencyCd;
			}
		});
	}
}

//내용 클립보드로 복사하기. ChoiTH
function fnCopy2clipboard(text) {
	
	new Clipboard('.copyClipboard', {
	    text: function(trigger) {
	        //return trigger.nextElementSibling;
	    	return text;
	    }
	});
	
    $('.opt_layer').removeClass('on');
    $('.opt_reply_layer').removeClass('opt_layer');
    
}

// 내용 클립보드로 복사하기
function fnCopyclipboard(text) {
	text = text.replaceAll("<br>", "\n");
	
	new Clipboard('.copyClipboard', {
	    text: function(trigger) {
	        //return trigger.nextElementSibling;
	    	return text;
	    }
	});
	
	
    $('.opt_layer').removeClass('on');
    jQuery('.opt_layer').hide();
    
    $('.opt_reply_layer').removeClass('opt_layer');
    jQuery('.opt_reply_layer').hide();
    
    $('.opt_layer2').removeClass('opt_layer');
    jQuery('.opt_layer2').hide();
    
    $('.opt_reply_layer').removeClass('on');
    $('.opt_layer2').removeClass('on');	
	
}

// 컨텐츠 옵션 기능. ChoiTH
// TG : 좋아요     TS : 공유하기
function fnContentsOpt(kind, idx, $obj, contTxt, movieIdx, groupTitle){
	if(AppVersion_Master >= 448){
		if(kind == "TG"){
			fnSendGALog("1", "", "MA_배급사팬페이지", "관련소식_좋아요", groupTitle+"/"+contTxt.substr(0,20));
		}else if(kind == "TS"){
			fnSendGALog("1", "", "MA_배급사팬페이지", "관련소식_공유하기", groupTitle+"/"+contTxt.substr(0,20));
		}
	}else{
		if(kind == "TG"){
			fnSendGALog("1", "", "MW_배급사팬페이지", "관련소식_좋아요", groupTitle+"/"+contTxt.substr(0,20));
		}else if(kind == "TS"){
			fnSendGALog("1", "", "MW_배급사팬페이지", "관련소식_공유하기", groupTitle+"/"+contTxt.substr(0,20));
		}
	}
	
	
	var test = $obj.parents("div.cover_btn_list").siblings("div.cover_img").find("div.inner").eq(0);
	var x = test.find("img").attr("src");
	if(x == undefined || x == ''){
		test = $obj.parents("div.cover_btn_list").siblings("div.cover_imgwrap").find("div.cover_img").find("div.inner").eq(0);
		console.log(test);
		x = test.find("img").attr("src");
	}
	
	if(kind == "TS"){
		$.ajax({
			method: "post",
			url: "/fanpage/contentsOpt",
			dataType: "json",
			data: {optKind:kind, movieIdx:movieIdx, contentsIdx:idx},
			success: function(result){
				
				if(result.result_code == "success"){
					/*var shareNumberObj = $obj.parents("div.cover_btn_list").siblings("div.cover_footbox").find("span.contents_share_cnt");
					var shareNumber = parseInt(shareNumberObj.text());
					
					shareNumberObj.text( shareNumber + 1);*/
					var obj = $obj.parents("div.cover_btn_list").siblings("div.cover_footbox").find("span.contents_share_cnt");
					var shareNumberObj = obj.text().replaceAll(",", "");
					
					var result = changeNumberFormat(shareNumberObj);
					
					obj.text( result ); 
				}
				// 웹뷰일 경우 WebToAPP 호출
				if(IsWebView_Master){
					fnShareContents(contTxt, idx, movieIdx, $(this), groupTitle);
				} else{
					document.fnMobileShare.movieIdx.value = movieIdx;
					document.fnMobileShare.groupTitle.value = groupTitle;
					fnShare_Web('AC', idx, contTxt);
				}
			},
			error: function(){
				var url_chk = window.document.location.href;
				// 컨텐츠 상세일 경우 상세페이지로 이동
				if(url_chk.indexOf('contentsDetail') > -1){
					location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
					+ encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "&contentsIdx=" + window.document.location.href.split('contentsIdx=')[1]);
				} else {
				// 컨텐츠 상세가 아닐 경우 팬페이지 메인으로 이동
					location.reload();
				}
			}
		});
	}
	
	if(kind == "TG"){
		if(!IsLogin){
			if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
				fnMoveLoginPage();
				return;
			}
		}else{
			
			$.ajax({
				method: "post",
				url: "/fanpage/contentsOpt",
				dataType: "json",
				data: {optKind:kind, movieIdx:movieIdx, contentsIdx:idx},
				success: function(result){
					
					if(result.result_code == "success"){
						var goodNumberObj = $obj.parents("div.cover_btn_list").siblings("div.cover_footbox").find("span.contents_like_cnt");
						var goodNumber = goodNumberObj.text().replaceAll(",", "");
						
						// 컨텐츠 좋아요
						if(kind == "TG"){
							if(result.resultCd == "0"){
								$obj.parent().addClass("on");
								goodNumberObj.text( changeNumberFormat(goodNumber, 'p') );
							}else{
								$obj.parent().removeClass("on");
								goodNumberObj.text( changeNumberFormat(goodNumber, 'm') );
							}
						}
					}
					
				},
				error: function(){
					var url_chk = window.document.location.href;
					// 컨텐츠 상세일 경우 상세페이지로 이동
					if(url_chk.indexOf('contentsDetail') > -1){
						location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
						+ encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "&contentsIdx=" + window.document.location.href.split('contentsIdx=')[1]);
					} else {
					// 컨텐츠 상세가 아닐 경우 팬페이지 메인으로 이동
						location.reload();
					}
				}
			});
			
		}
	}
	
}

// 관련소식 컨텐츠 댓글 옵션 기능. ChoiTH
function fnCommentOpt(kind, idx, rUcd, rUtype, $obj){
	if(!IsLogin){
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
			return;
		}
	}else{
		if(kind == "CR"){
			if(!confirm("해당 글을 신고하시겠습니까?")){return;}
		}else if(kind == "CH"){
			if(!confirm("해당 글을 숨기시겠습니까?")){return;}
		}
		
		$.ajax({
			method: "post",
			url: "/fanpage/commentOpt",
			dataType: "json",
			data: {optKind:kind, movieIdx:strMovieIdx, contentsIdx:strContentsIdx, commentIdx:idx, recvUcode:rUcd, recvUtype:rUtype},
			success: function(result){
				
				if(result.result_code == "success"){
					if(kind == "CG"){
						var goodNumber = parseInt($obj.parents("div.write_day").find("span.number").text());
						$obj.parents("div.write_day").find("em").removeClass();
						
						if(result.resultCd == "0"){
							$obj.parents("div.write_day").find("em").addClass("choice_on");
							$obj.parents("div.write_day").find("span.number").text( goodNumber + 1);
						}else{
							$obj.parents("div.write_day").find("em").addClass("choice_off");
							$obj.parents("div.write_day").find("span.number").text( goodNumber - 1);
						}
					}else if(kind == "CR"){
						if(result.resultCd == "0"){
							alert("신고가 접수되었습니다."); //내용 확인 후 반영하도록 하겠습니다.
						}else{
							alert("이미 신고한 글입니다.");
						}
						$('.opt_layer').removeClass('on');
					}else if(kind == "CH"){
						if(result.resultCd == "0"){
							//alert("댓글이 숨김 처리되었습니다.");
							// 기존 소스 (@ChoiTH)
							//$("ul.customer_con").find("div.mark_comment_area").filter("[data-cidx="+idx+"]").parent("li").remove();
							
							// 수정 소스 (@SonHW)
							$("ul.customer_con").find("div.mark_comment_area").parent("li").filter("[data-cidx="+idx+"]").remove();
						}else{
							alert("이미 숨긴 글입니다.");
						}
						$('.opt_layer').removeClass('on');
					}
				}
			},
			error: function(){
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
				+ encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "&contentsIdx=" + window.document.location.href.split('contentsIdx=')[1]);
			}
	    });
	}
}

// 관련소식 컨텐츠 대댓글 옵션 기능. ChoiTH
function fnReplyOpt(kind, idx, cIdx, rUcd, rUtype, $obj, preview){
	if(!IsLogin){
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
			return;
		}
	}else{
		
		if(kind == "RR"){
			if(!confirm("해당 글을 신고하시겠습니까?")){return;}
		}else if(kind == "RH"){
			if(!confirm("해당 글을 숨기시겠습니까?")){return;}
		}
		
		if(preview != null){
			strCommentIdx = $obj.parents("#previewReplyArea").siblings("div.mark_comment_area").attr("data-cidx");
		}
		
		cIdx = cIdx == "" ? strCommentIdx : cIdx;
		
		$.ajax({
			method: "post",
			url: "/fanpage/replyOpt",
			dataType: "json",
			data: {optKind:kind, movieIdx:strMovieIdx, contentsIdx:strContentsIdx, commentIdx:cIdx, replyIdx:idx, recvUcode:rUcd, recvUtype:rUtype},
			success: function(result){
				
				if(result.result_code == "success"){
					if(kind == "RG"){
						var goodNumber = parseInt($obj.parents("div.write_day").find("span.number").text());
						$obj.parents("div.write_day").find("em").removeClass();
						
						if(result.resultCd == "0"){
							$obj.parents("div.write_day").find("em").addClass("choice_on");
							$obj.parents("div.write_day").find("span.number").text( goodNumber + 1);
						}else{
							$obj.parents("div.write_day").find("em").addClass("choice_off");
							$obj.parents("div.write_day").find("span.number").text( goodNumber - 1);
						}
					}else if(kind == "RR"){
						if(result.resultCd == "0"){
							alert("신고가 접수되었습니다."); //내용 확인 후 반영하도록 하겠습니다.
						}else{
							alert("이미 신고한 글입니다.");
						}
						$('.opt_layer').removeClass('on');
					}else if(kind == "RH"){
						if(result.resultCd == "0"){
							//alert("숨김 처리되었습니다.");
							$("div.mark_reply_area > ul > li").filter("[data-ridx="+idx+"]").remove();
						}else{
							alert("이미 숨긴 글입니다.");
						}
						$('.opt_layer').removeClass('on');
					}
				}
			},
			error: function(){
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
				+ encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "&contentsIdx=" + window.document.location.href.split('contentsIdx=')[1]);
			}
	    });
	}
}

// 관련소식 컨텐츠 댓글 삭제. ChoiTH
function fnDelComment(cIdx){
	cIdx = cIdx || "";
	if(!IsLogin){
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
			return;
		}
	}else{
		if(!confirm("해당 글을 삭제하시겠습니까?")){return;}
		
		$.ajax({
			method: "post",
			url: "/fanpage/delContentsComment",
			dataType: "json",
			data: {gubun:"CD", commentIdx:cIdx, movieIdx:strMovieIdx},
			success: function(result){
				
				if(result.result_code == "success"){
					if(result.resultCd == "0"){
						alert("정상적으로 삭제되었습니다.");
						
						$("div.comment_wrap > ul > li").filter("[data-cidx="+cIdx+"]").remove();
						$('div.opt_myComment_layer').hide();
						$('div.opt_myComment_layer').removeClass('opt_layer');
						$('div.opt_myComment_layer').removeClass('on');
					}
				}
			
			},
			error: function(){
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
				+ encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "&contentsIdx=" + window.document.location.href.split('contentsIdx=')[1]);
			}
	    });
	}
}

// 관련소식 컨텐츠 대댓글 삭제. ChoiTH
function fnDelReply(rIdx){
	if(!IsLogin){
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
			return;
		}
	}else{
		if(!confirm("해당 글을 삭제하시겠습니까?")){return;}
		
		$.ajax({
			method: "post",
			url: "/fanpage/delContentsComment",
			dataType: "json",
			data: {gubun:"RD", replyIdx:rIdx, movieIdx:strMovieIdx},
			success: function(result){
				
				if(result.result_code == "success"){
					if(result.resultCd == "0"){
						alert("정상적으로 삭제되었습니다.");
						
						$("div.mark_reply_area > ul > li").filter("[data-ridx="+rIdx+"]").remove();
						$('.opt_layer').removeClass('on');
					}
				}
			
			},
			error: function(){
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
				+ encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "&contentsIdx=" + window.document.location.href.split('contentsIdx=')[1]);
			}
	    });
	}
}


// 관련소식 컨텐츠 동영상 3초/10초 이상 재생시 아이템 재생수 증가. ChoiTH
function fnContentsVideoCnt(timeKind, cIdx, iIdx, movieIdx){
	$.ajax({
		method: "post",
		url: "/fanpage/contentsVideoOpt",
		dataType: "json",
		data: {optKind:timeKind, movieIdx:movieIdx, contentsIdx:cIdx, itemIdx:iIdx},
		success: function(result){
			
		},
		error: function(){
			/*var url_chk = window.document.location.href;
			// 컨텐츠 상세일 경우 상세페이지로 이동
			if(url_chk.indexOf('contentsDetail') > -1){
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
				+ encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "&contentsIdx=" + window.document.location.href.split('contentsIdx=')[1]);
			} else {
			// 컨텐츠 상세가 아닐 경우 팬페이지 메인으로 이동
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx;
			}*/
		}
    });
}

// 관련소식 컨텐츠 동영상 사용자별 재생 시간 집계. ChoiTH
function fnContentsVideoEndTime(cIdx, iIdx, playtime){
	if(fanpageMember == "Member"){
		
		$.ajax({
			method: "post",
			url: "/fanpage/contentsVideoOpt",
			dataType: "json",
			data: {optKind:"TVEND", movieIdx:strMovieIdx, contentsIdx:cIdx, itemIdx:iIdx, playtime:playtime},
			success: function(result){
				
			},
			error: function(){
				alert('처리 중 에러가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
			}
		});
	}
}


// 메인 포스터 & 관련소식 컨텐츠 이미지 다운로드. ChoiTH
function fnDownloadImage(url){
	//if(IsWebView_Master){
		CGVFanpageAppInterface.PosterDownload(url, "1");
	//}
}

// 모바일웹 전용 공유하기 창 오픈. SonHW
function fnShare_Web(gubun, idx, contTxt){
	if(gubun == 'AM'){
	}
	if(!IsWebView_Master){
		$('.dimlaypop_wrap').addClass("on");
		document.fnMobileShare.gubun.value = gubun;
		if(idx != "" || idx != undefined){
			$('.dimlaypop_wrap').attr('data-src', idx);
		}
		if(contTxt != undefined){
			fnSendGALog("1", "", "MW_배급사팬페이지", "공유하기", strAgencyName);
			contTxt = contTxt.length > 20 ? contTxt.substr(0, 20) + "..." : contTxt;
			$('.dimlaypop_wrap').attr('cont-src', contTxt);
		} else {
			contTxt = "";
		}
	}
}

function fnShare_Close(){
	$('.dimlaypop_wrap').removeClass("on");
	$('.dimlaypop_wrap').attr('data-src', '');
	$('.dimlaypop_wrap').attr('cont-src', '');
	
	Kakao.cleanup()
	//Kakao.Link.cleanup();
}

// 모바일웹 공유하기 (페이스북). SonHW
function fnShare_FaceBook(url, title){
	var data = $('.dimlaypop_wrap').attr('data-src');
	var cont = $('.dimlaypop_wrap').attr('cont-src');
	var movieIdx = document.fnMobileShare.movieIdx.value;
	
	if( data == "" || data == undefined){
		if(url == "" || url == undefined){
			url = gateURL + "Fanpage/Gateway.aspx?agencyCd=" + strAgencyCd;
		} 
	} else {
		url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + movieIdx + "&fanpageReturnUrl=" + encodeURIComponent("contentsDetail?movieIdx=" + movieIdx + "_contentsIdx=" + data);
	}
	
	//title = encodeURIComponent(title);
	
	var userId = "";
	$.ajax({
		method : "post",
		url : "/fanpage/shortURL",
		dataType : "json",
		data : {id:strUserId, realUrl:url},
		async : false,
		success : function(result){
			url = result.resultData.shortUrl;
		},
		error : function(){
			alert("처리 중 에러가 발생했습니다.\n잠시 후에 다시 이용해 주세요;")
		}
	})
	
	/*var FB_APP_ID = "188113814563964";
	var fbRedirectUrl = url;
    var fbName = title;
    var fbDescription = "";
    var snsUrl = "https://www.facebook.com/dialog/feed?app_id=" + FB_APP_ID + "&display=popup" +
			    "&link=" + encodeURIComponent(url) +
			    "&redirect_uri=" + encodeURIComponent(fbRedirectUrl) +
			    "&picture=" + encodeURIComponent(image) +
			    "&name=" + encodeURIComponent(fbName) +
			    "&description=" + encodeURIComponent(fbDescription);
		
    location.href = snsUrl;*/
	title = cont;
    
	location.href = "http://www.facebook.com/sharer.php?v=4&src=bm&u=" + url + "&t=" + title;
}


// 모바일웹 공유하기 (트위터). SonHW
function fnShare_Twitter(url, title){
	var data = $('.dimlaypop_wrap').attr('data-src');
	var cont = $('.dimlaypop_wrap').attr('cont-src');
	var movieIdx = document.fnMobileShare.movieIdx.value;
	
	if( data == "" || data == undefined){
		if(url == "" || url == undefined){
			url = gateURL + "Fanpage/Gateway.aspx?agencyCd=" + strAgencyCd;
		} 
	} else {
		url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + movieIdx + "&fanpageReturnUrl=" + encodeURIComponent("contentsDetail?movieIdx=" + movieIdx + "_contentsIdx=" + data);
	}
	
	//title = encodeURIComponent(title);
	
	var userId = "";
	$.ajax({
		method : "post",
		url : "/fanpage/shortURL",
		dataType : "json",
		data : {id:strUserId, realUrl:url},
		async : false,
		success : function(result){
			url = result.resultData.shortUrl;
		},
		error : function(){
			alert("처리 중 에러가 발생했습니다.\n잠시 후에 다시 이용해 주세요;")
		}
	})
	
	title = cont;
	
	location.href = "https://twitter.com/share?text=" + title + "&url=" + url;
}

// 모바일웹 공유하기 (카카오톡). SonHW
function fnSendTalkLinkFull(){
	var gubun = document.fnMobileShare.gubun.value;
	var filter = "win16|win32|win64|mac";
	var data = "";	// 컨텐츠 IDX
	var cont = "";	// 컨텐츠 내용
	var url = gateURL + "Fanpage/Gateway.aspx?agencyCd=" + strAgencyCd;
	var movieIdx = document.fnMobileShare.movieIdx.value;
	var title = document.fnMobileShare.groupTitle.value;
	var img_url="";
	
	// 배급사 팬페이지 공유하기일 경우
	if(gubun == 'AM'){
		title = strAgencyName;
		img_url = backgroundUrl;
		//console.log(img_url);
	// 컨텐츠에 대한 공유하기일 경우
	} else if(gubun == 'AC'){
		data = $('.dimlaypop_wrap').attr('data-src');
		cont = $('.dimlaypop_wrap').attr('cont-src');
		//img_url = "http://img.cgv.co.kr/Movie/Thumbnail/Poster/0000"+movieIdx.substr(0,2)+ "/"+movieIdx + "/" + movieIdx + "_1000.jpg";
		if($('.cover_img').eq(0).find('img').attr('src') == undefined && $('.video_box video').attr('poster') == undefined){
			img_url = "";
		} else if($('.cover_img').eq(0).find('img').attr('src') != undefined){
			img_url = $('.cover_img').eq(0).find('img').attr('src');
		} else {
			img_url = $('.video_box video').attr('poster');
		}
		url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + movieIdx + "&fanpageReturnUrl=" + encodeURIComponent("contentsDetail?movieIdx=" + movieIdx + "_contentsIdx=" + data);
	}
	
	/*data = $('.dimlaypop_wrap').attr('data-src');
	cont = $('.dimlaypop_wrap').attr('cont-src');
	if(data == '' || data == undefined){
		title = strAgencyName;
		img_url = backgroundUrl;
	} else {
		data = $('.dimlaypop_wrap').attr('data-src');
		cont = $('.dimlaypop_wrap').attr('cont-src');
		img_url = "http://img.cgv.co.kr/Movie/Thumbnail/Poster/0000"+movieIdx.substr(0,2)+ "/"+movieIdx + "/" + movieIdx + "_1000.jpg";
		url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + movieIdx + "&fanpageReturnUrl=" + encodeURIComponent("contentsDetail?movieIdx=" + movieIdx + "_contentsIdx=" + data);
	}*/
	
	var bi_img = $('#shareImg').attr("src", img_url);
	//console.log(bi_img.width());
	//console.log(bi_img.height());
		
	// URL확인용 알럿 (오픈전에 제거)
	//alert(url);
	
	Kakao.init('0e745a30fbfe741f78ed701c9bad3ac8');
	Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: title,
            description: cont,
            imageUrl: img_url,
            imageWidth: bi_img.width(),
            imageHeight: bi_img.height(),
            link: {
                mobileWebUrl: url,
                webUrl: url
            }
        }
    });
	img_url = "";
}

// 컨텐츠 좋아요. 공유하기 숫자포멧 변경 (0 ~ 9,999까지 / 10,000 부터는 1.0만 표기 / 만단위 부터는 가공X)
// type : p(증가), m(감소)
function changeNumberFormat(num, type){
	var result = "";
	var resultNum = "";
	if(num.indexOf("만") != -1){	// '만'이 들어있을 경우
		result = num;
	} else {
		if(type == 'p' || type == null) { num = parseInt(num) + 1; }
		else if(type == 'm') { num = parseInt(num) - 1; }
		resultNum = String(num);
		var numLeng = resultNum.length;
		if(num >= 1000 && num < 10000){ result = resultNum.substr(0, numLeng -3) + "," + resultNum.substr(numLeng - 3, 3); }
		else { result = resultNum; }
	}
	return result;
}

//배급사 팬페이지 예매 가능여부 확인
function agencyReservation(movieIdx, movieCd, groupTitle, grade, contTxt){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_배급사팬페이지", "관련소식_지금예매", groupTitle + "/" + contTxt.substr(0,20));
	}else{
		fnSendGALog("1", "", "MW_배급사팬페이지", "관련소식_지금예매", groupTitle + "/" + contTxt.substr(0,20));
	}
	
	var rateCode = fnReserveGrade(grade);
	strMovieIdx = movieIdx;
	Grade = grade;
	mgCD = movieCd;
	movieGroupTitle = groupTitle;
	
	$.ajax({
		method : "post",
		url : "/fanpage/agencyReserve",
		dataType : "json",
		data : {movieIdx: movieIdx, grade: grade},
		async : false,
		success : function(result){
			$obj = $("#reserveLayerPop ul");
			if(result.MovieTypeList.imaxYn == 'Y'){ $obj.find(".rImax").show();	}
			if(result.MovieTypeList.m4dxYn == 'Y'){ $obj.find(".r4dx").show(); }
			if(result.MovieTypeList.screenxYn == 'Y'){ $obj.find(".rScx").show(); }
			if(result.MovieTypeList.m3dYn == 'Y'){ $obj.find(".r3d").show(); }
			if(result.MovieTypeList.m2dYn == 'Y'){ $obj.find(".r2d").show(); }
			$("#reserveLayerPop em").addClass(result.GradeStyle);
			$("#reserveLayerPop em").text(result.GradeText);
			$("#reserveLayerPop").addClass("on");
		},
		error : function(){
			//alert("처리 중 에러가 발생했습니다.\n잠시 후에 다시 이용해 주세요;")
			location.href = gateURL + "Fanpage/Gateway.aspx?agencyCd=" + strAgencyCd;
		}
	})
	
	/*if (IsWebView_Master) {
    	
    	//var $layer = jQuery('#layer_pop_re');

        CGVFanpageAppInterface.ReserveFromMovieInfoV4(movieCd, encodeURIComponent(movieTitle), rateCode, '00');
    }
    else {
        //그냥 예약
        // 하드코딩 Son.HW
        //goOutLink(ticketURL + "quickReservation/Default.aspx?MovieIdx=" + movieIdx + "&sm_type=" + "");
        goOutLink("http://stm.cgv.co.kr/" + "quickReservation/Default.aspx?MovieIdx=" + movieIdx + "&sm_type=" + "");
    }	*/
	
}

function agencyShare(agencyCd, agencyName){
	movieGroupTitle = agencyName;
	var url = gateURL + "Fanpage/Gateway.aspx?agencyCd=" + agencyCd; 
	if(IsWebView_Master){
		if(AppVersion_Master >= 459){
			var stickerUrl = "http://img.cgv.co.kr/WebApp/images/common/cgv_logo_w.png";
			//alert('459VER, 영화IDX:' + strMovieIdx + ", 영화명:" + movieGroupTitle + ", 시놉시스:" + "시놉시스, url:" + url + ", 배경:" + backgroundUrl);
			CGVFanpageAppInterface.SendAppShareData(agencyCd, movieGroupTitle, movieGroupTitle, url, backgroundUrl, stickerUrl, 'movie');
		} else {
			CGVFanpageAppInterface.FanPageRequestSystemShare(agencyCd, movieGroupTitle, url);
		}
		
		//CGVFanpageAppInterface.FanPageRequestSystemShare(strMovieIdx, cont, url);
	} 
}