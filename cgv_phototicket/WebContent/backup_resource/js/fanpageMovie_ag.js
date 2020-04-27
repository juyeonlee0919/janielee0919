
/* 팬페이지 화면 제어. ChoiTH */

var isPreviousContentsComplete  = "False" != "True";
var isPreviousContentscmtTab2   = "False" != "True";
var isListComplete = false;
var pageStart = 1;
var pageSize = 10;
var dataTotCnt = 0;
var cmtsPageStart = 1;

var pageSizeCont = 2;

// 네이티브에서 관련소식 페이지에서 댓글달고 상세페이지 이동을 위한 ContentsIdx 값 저장변수
var rCidx = "";

// 관련소식 컨텐츠 상세보기 화면으로 이동. ChoiTH
function fnMoveContentsDetail(url, contTxt, ContIdx, movieIdx, groupTitle){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_배급사팬페이지", "관련소식_반응보기", groupTitle+"/"+contTxt.substr(0,20));
	}else{
		fnSendGALog("1", "", "MW_배급사팬페이지", "관련소식_반응보기", groupTitle+"/"+contTxt.substr(0,20));
	}
	
	
	$.ajax({
		method: "post",
		url: "/fanpage/contentsOpt",
		dataType: "json",
		data: {optKind:"TD", movieIdx:movieIdx, contentsIdx:ContIdx},
		success: function(result){
			
		},
		error: function(){
			location.href = gateURL + "Fanpage/Gateway.aspx?agencyCd=" + strAgencyCd + "&fanpageReturnUrl="
			  + encodeURIComponent("agencyView?agencyCd=" + strAgencyCd);
		}
    });
	url = url + "&agencyCd=" + strAgencyCd;
	location.href = url;
	/*url = "http://10.66.0.66:8081" + url;
	eventLink(5, url);*/
}

// 관련소식 컨텐츠 url 외부링크로 이동. ChoiTH
function fnMoveContentsUrl(url, contTxt, ContIdx, groupTitle){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_배급사팬페이지", "관련소식_반응보기", groupTitle+"/"+contTxt.substr(0,20));
	}else{
		fnSendGALog("1", "", "MW_배급사팬페이지", "관련소식_반응보기", groupTitle+"/"+contTxt.substr(0,20));
	}
	
	
	$.ajax({
		method: "post",
		url: "/fanpage/contentsOpt",
		dataType: "json",
		data: {optKind:"TD", movieIdx:strMovieIdx, contentsIdx:ContIdx},
		success: function(result){
			
		},
		error: function(){
			location.href = gateURL + "Fanpage/Gateway.aspx?agencyCd=" + strAgencyCd + "&fanpageReturnUrl="
			  + encodeURIComponent("agencyView?agencyCd=" + strAgencyCd);
		}
    });
	
	if(url.indexOf("cgv.co.kr") == "-1" && url.indexOf("cgv.kr") == "-1"){
		goOutLink(url, 0)
	} else {
		eventLink(1, url);
	}
	
}

// 관련소식 컨텐츠 댓글 목록 전체 개수 조회. ChoiTH
function fnCommentTotCnt(){
	$.ajax({
		method: "post",
		url: "/fanpage/commentTotCnt",
		dataType: "json",
		data: {movieIdx:strMovieIdx, contentsIdx:strContentsIdx},
		success: function(result){
			dataTotCnt = result.commentTotCnt;
		},
		error: function(){
			/*alert('댓글을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');*/
		}
    });
}

// 관련소식 컨텐츠 댓글 목록에서 선택한 댓글의 대댓글 10개 미리보기 조회. ChoiTH
function fnPreviewReply(strCommentIdx, $obj){
	$obj.parent().hide();
	$obj.parent().siblings("#previewReplyArea").show();
	
	$.ajax({
		method: "post",
		url: "/fanpage/commentReplyPreviewList",
		dataType: "html",
		data: {movieIdx:strMovieIdx, contentsIdx:strContentsIdx, commentIdx:strCommentIdx},
		success: function(result){
			$obj.parent().siblings("#previewReplyArea").html(result);
			//callOptReplyLayer();
		},
		error: function(){
			location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
			+ encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "&contentsIdx=" + window.document.location.href.split('contentsIdx=')[1]);
		}
    });	
}

// 관련소식 컨텐츠 댓글의 대댓글 목록 조회. ChoiTH
function fnReplyList(){
	isPreviousContentsComplete = false;
	pageStart = pageStart + pageSize;
	
	$.ajax({
		method: "post",
		url: "/fanpage/commentReplyList",
		dataType: "html",
		data: {movieIdx:strMovieIdx, contentsIdx:strContentsIdx, commentIdx:strCommentIdx, pageStart:pageStart, pageSize:pageSize},
		success: function(result){
			
			if(dataTotCnt > pageStart + pageSize){
				isPreviousContentsComplete = true;
			}else{
				isListComplete = true;
			}
			
			$(".mark_reply_area ul").append(result);
			
			//callCmtOptLayer();
			
		},
		error: function(){
			/*alert('대댓글을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');*/
		}
    });
}

// 관련소식 컨텐츠 댓글의 대댓글 목록 전체 개수 조회. ChoiTH
function fnReplyTotCnt(){
	$.ajax({
		method: "post",
		url: "/fanpage/replyTotCnt",
		dataType: "json",
		data: {movieIdx:strMovieIdx, contentsIdx:strContentsIdx, commentIdx:strCommentIdx},
		success: function(result){
			dataTotCnt = result.replyTotCnt;
		},
		error: function(){
			/*alert('대댓글을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');*/
		}
    });
}


//관련소식 컨텐츠 댓글/대댓글 앱에서 등록/수정 여부 체크. ChoiTH
var AppWriteContentsCommentYN = "N";
var AppWriteContentsReplyYN = "N";

// 관련소식 컨텐츠 댓글/대댓글. ChoiTH
var AppWriteContentsIdx = "";
var AppWriteContentsCommentIdx = "";

// 관련소식 컨텐츠 댓글/대댓글 등록/수정 위치. ChoiTH
var AppWriteContentsReplyInfo = "";
var AppWriteContentsReplyGubun = "";


//관련소식 컨텐츠 댓글 등록창. ChoiTH
function fnWriteContentsComment(gubun, contIdx, movieIdx, movieGroupTitle, cTxt){
	if(!IsLogin){
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
		}
	}else{
		if(AppVersion_Master >= 448){
			fnSendGALog("1", "", "MA_배급사팬페이지", "관련소식_댓글달기", movieGroupTitle+"/"+cTxt.substr(0,20));
		}else{
			fnSendGALog("1", "", "MW_배급사팬페이지", "관련소식_댓글달기", movieGroupTitle+"/"+cTxt.substr(0,20));
		}
		
		if(IsWebView_Master){
			//cTxt = cTxt.replace(/(<br>|<br\/>|<br \/>)/g, "\n");
			//cTxt = cTxt.replace(/<img[^>]*>/g, "");
			cTxt = "";
			document.frmWriteContentsComment.movieIdx.value = movieIdx;
			document.frmWriteContentsComment.contentsIdx.value = contIdx;
			document.frmWriteContentsComment.agencyCd.value = strAgencyCd;
			
			// CGVFanpageAppInterface.FanPageEditContentsComment(act, movieName, isView, nextPage, movieIdx, contentsIdx, commentIdx, commentReplyIdx, commentText, savedImageUrl, userType, userCode);
			CGVFanpageAppInterface.FanPageEditContentsComment(gubun, movieGroupTitle, "N", 'fnCallbackContentsComment', movieIdx, contIdx, "", "", cTxt, "", "U", strUcd);
			
			AppWriteContentsCommentYN = "Y";
			AppWriteContentsIdx = contIdx;
			
			$('.opt_myComment_layer').removeClass('opt_layer');
			$('.opt_myComment_layer').removeClass('on');
			$('.opt_myComment_layer').hide();
			
			selectedCommentIdx = ""; 
			selectedCommentText = "";
			selectedCommentImg = ""; 
			                         
			selectedReplyIdx = "";   
			selectedReplyText = "";  
			selectedReplyImg = "";   
			
		}else{
			//var contentsIdx = strContentsIdx || contIdx;
			
			document.frmWriteContentsComment.gubun.value = gubun;
			document.frmWriteContentsComment.movieIdx.value = movieIdx;
			document.frmWriteContentsComment.contentsIdx.value = contIdx;
			document.frmWriteContentsComment.agencyCd.value = strAgencyCd;
			document.frmWriteContentsComment.groupTitle.value = movieGroupTitle;
			document.frmWriteContentsComment.submit();
			
		}
	}
	
}

// 관련소식 컨텐츠 대댓글 등록창. ChoiTH
function fnWriteContentsReply(gubun, contIdx, cIdx, rIdx, rTxt, imgUrl, rUcd, rUtype){
	rIdx = rIdx || "";
	rTxt = rTxt || "";
	imgUrl = imgUrl || "";
	
	if(!IsLogin){
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
        }
	}else{
		if(IsWebView_Master){
			rTxt = rTxt.replace(/(<br>|<br\/>|<br \/>)/g, "\n");
			rTxt = rTxt.replace(/<img[^>]*>/g, "");
			
			if(imgUrl == "" || imgUrl == null){
			}else{
				imgUrl = imgUrl.replaceAll("http://img.cgv.co.kr", "");
				imgUrl = "http://img.cgv.co.kr" + imgUrl; 
			}
			
			// CGVFanpageAppInterface.FanPageEditContentsComment(act, movieName, isView, nextPage, movieIdx, contentsIdx, commentIdx, commentReplyIdx, commentText, savedImageUrl, userType, userCode);
			CGVFanpageAppInterface.FanPageEditContentsComment(gubun, movieGroupTitle, "N", 'fnCallbackContentsReply', strMovieIdx, contIdx, cIdx, rIdx, rTxt, imgUrl, "U", strUcd);
			
			AppWriteContentsReplyYN = "Y";
			AppWriteContentsIdx = contIdx;
			AppWriteContentsCommentIdx = cIdx;
			AppWriteContentsReplyGubun = gubun;
			AppWriteContentsReplyInfo = {gubun:gubun, movieIdx:strMovieIdx, contentsIdx:contIdx, commentIdx:cIdx, replyIdx:rIdx, recvUcode:rUcd, recvUtype:rUtype};
			
			$('.opt_myReply_layer').removeClass('opt_layer');
			$('.opt_myReply_layer').removeClass('on');
			$('.opt_myReply_layer').hide();
			
			selectedCommentIdx = ""; 
			selectedCommentText = "";
			selectedCommentImg = ""; 
			                         
			selectedReplyIdx = "";   
			selectedReplyText = "";  
			selectedReplyImg = "";   
			
		}else{
			//var contentsIdx = strContentsIdx || contIdx;
			
			document.frmWriteContentsComment.gubun.value = gubun;
			document.frmWriteContentsComment.movieIdx.value = strMovieIdx;
			document.frmWriteContentsComment.contentsIdx.value = contIdx;
			document.frmWriteContentsComment.commentIdx.value = cIdx;
			document.frmWriteContentsComment.replyIdx.value = rIdx;
			document.frmWriteContentsComment.recvUcode.value = rUcd;
			document.frmWriteContentsComment.recvUtype.value = rUtype;
			
			document.frmWriteContentsComment.submit();
			
		}
	}
}

// 네이티브에서 관련소식 컨텐츠 댓글을 등록/수정했을 경우 callback. ChoiTH
function fnCallbackContentsComment(){
	
	//location.href = "/fanpage/contentsDetail?movieIdx="+strMovieIdx+"&contentsIdx="+AppWriteContentsIdx+"#comment_wrap";
	//location.href = window.document.location.href + "#comment_wrap";
	//alert("fnCallbackContentsComment");
	//관련소식 리스트에서 등록했을 경우 상세페이지로 이동
	var url = "/fanpage/contentsDetail?movieIdx=" + document.frmWriteContentsComment.movieIdx.value + "&contentsIdx=" + document.frmWriteContentsComment.contentsIdx.value
			+ "&agencyCd=" + document.frmWriteContentsComment.agencyCd.value;
	location.href = url;
	
	AppWriteContentsCommentYN = "N";
	AppWriteContentsIdx = "";
}

// 네이티브에서 관련소식 컨텐츠 대댓글을 등록/수정했을 경우 callback. ChoiTH
function fnCallbackContentsReply(){
	
	if(AppWriteContentsReplyGubun == "RI"){
		$.ajax({
			method: "post",
			url: "/fanpage/sendContentsPush",
			processData: false, 
			contentType: false,  				
			dataType: "json",
			data: jsJsonToFormData(AppWriteContentsReplyInfo),
			success: function(result){
				
				AppWriteContentsReplyInfo = "";
				
			},
			error: function(){
				// alert('처리 중 에러가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
			}
		});
	}
	
	//location.href = "/fanpage/contentsCommentDetail?movieIdx="+strMovieIdx+"&contentsIdx="+AppWriteContentsIdx+"&commentIdx="+AppWriteContentsCommentIdx+"#mark_reply_area";
	//location.href = window.document.location.href + "#mark_reply_area";
	//location.href = window.document.location.href + "#c_" + AppWriteContentsIdx;
	location.reload();
		
	
	AppWriteContentsReplyYN = "N";
	AppWriteContentsIdx = "";
	AppWriteContentsCommentIdx = "";
}

/*
SR 답글 상세, SD 답글 삭제
*/
function fnUpdCmtReply(gubun){  
	
	//로그인 여부 체크 로직 추가
	var commentIdx 		= document.forms[0].commentIdx.value;		//실관람평일련번호
	var replyIdx   		= document.forms[0].replyIdx.value;			//답글일련번호  
	var replyFileUrl	= document.forms[0].replyFileUrl.value;		//답글 파일
	var sData      		= "";
	var sFormId         = document.forms[0];
	var nextPage = window.document.location.href;	//평점 작성 완료 후 이동할 페이지
	

	if(!IsLogin){		//로그인 여부 체크
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
		}
	}else{  
		
		if(gubun == 'SR'){   //수정(답글 상세보기)
		 	document.getElementById("gubun").value    	= gubun;
			
		 	selectedReplyText = selectedReplyText.replace(/(<br>|<br\/>|<br \/>)/g, '\n');
		 	if(selectedReplyText.length >= 2000){
		 		selectedReplyText = selectedReplyText.substr(0, 2000);
		 	}
		 	
		 	//alert(commentIdx +":" + replyIdx +":" +   selectedReplyText +":" +  replyFileUrl);
		 	if(IsWebView_Master){
		 		
		 		if(replyFileUrl == "" || replyFileUrl == null){
		 		} else {
		 			replyFileUrl = replyFileUrl.replaceAll("http://img.cgv.co.kr", "");
		 			replyFileUrl = "http://img.cgv.co.kr" + replyFileUrl; 
		 		}
		 		
				/*FanPageEditContentsComment(처리구분, 영화명(한글), 관람여부, 평점 작성 완료 후 이동할 페이지, 영화 Index, 
				  컨텐츠 일련번호, 컨텐츠 댓글 일련번호, 컨텐츠 대댓글 일련번호, 댓글 대댓글 내용, 
				  댓글 수정 대댓글 수정일 때 이미지가 있을 경우 해당 이미지의 url 주소, 회원타입, 통합회원코드)*/
				CGVFanpageAppInterface.FanPageEditContentsComment
					("02",  movieGroupTitle, IsView, 'fnCmtsReplyCallBack', strMovieIdx
					, "", commentIdx, replyIdx,  selectedReplyText,  replyFileUrl, "U", strUcd);	
		
		 	}else{ 
		 		
				var sAction= '/fanpage/movieCmtsReplyList'; 
				
				document.forms[0].action = sAction;
				//$("#frmView").attr("action", action);
				document.forms[0].submit();			 		
		 	}

		}else{				//삭제 : SD  
			
			if(!confirm("삭제하시겠습니까?")) return;
		
			sData = {movieIdx:strMovieIdx, commentIdx:commentIdx, gubun:gubun, replyIdx:replyIdx};
			
			$.ajax({
				method: "post",
				url: "/fanpage/saveMovieCmtsReply",
    			processData: false, 
    		    contentType: false,  				
				dataType: "json",
				data: jsJsonToFormData(sData),
				success: function(result){    
    				alert(result.resultMsg);

    			    $('.opt_layer').removeClass('on');
    			    $('.opt_reply_layer').removeClass('opt_layer');
    			    $('.opt_layer2').removeClass('opt_layer');
    			    
    			    $('.opt_reply_layer').removeClass('on');
    			    $('.opt_layer2').removeClass('on');	 
    			    
    			    var sCheck = checkSpecial(nextPage);
    			    
    			    if(sCheck == true){
    			    	location.href = nextPage;
    			    }else{
    			    	document.forms[0].action = nextPage;
    					document.forms[0].submit();		    			    	
    			    }
					
 					jQuery("#charmWriteForm").fadeOut();
 					jQuery("#writeForm").fadeOut(); 

				},
				error: function(){
					location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
					+ encodeURIComponent("mainView?movieIdx=" + strMovieIdx + "&iTab=2");
				}
		  });	 			
		}
		
	}	
}


//신고, 숨기기 증가감 처리
function fnInsComtsSpoiler(gubun){  
	
	var sAct = "";
	//var sUserID = "test";
	//로그인 여부 체크 로직 추가
/*	var commentIdx = document.getElementById("commentIdx").value;	//실관람평일련번호
	var replyIdx   = document.getElementById("replyIdx").value;		//답글일련번호
	var cmtsGubun  = document.getElementById("cmtsGubun").value;	//1.실관람평, 2.답글
*/	
	var commentIdx = document.forms[0].commentIdx.value;	//실관람평일련번호
	var replyIdx   = document.forms[0].replyIdx.value;		//답글일련번호
	var cmtsGubun  = document.forms[0].cmtsGubun.value;		//1.실관람평, 2.답글	
	var sData      = "";
	
	var confirmChk = "";
	
	if(!IsLogin){		//로그인 여부 체크
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
		}
	}else{ 
		// 추가 소스 (@SonHW)
		if(gubun == "RT"){
			if(!confirm("평점 내용에 스포일러 또는 비방/욕설이 포함되어 있습니까?")){return;}
			confirmChk = "Y";
			//alert("신고가 접수되었습니다. 내용 확인 후 반영하도록 하겠습니다.")
		}else if(gubun == "RH"){
			if(!confirm("해당 글을 숨기시겠습니까?")){return;}
		}
		/*                                                     */
		
		if(cmtsGubun == '1'){
			sData = {movieIdx:strMovieIdx, commentIdx:commentIdx, gubun:gubun};
		}else{
			gubun = 'S' + gubun;
			sData = {movieIdx:strMovieIdx, commentIdx:commentIdx, gubun:gubun, replyIdx:replyIdx};
		}
		
		$.ajax({
			method: "post",
			url: "/fanpage/saveMovieCmtsOpt",
			dataType: "json",
			data: sData,
			success: function(result){    
				//alert(result.resultData.sympathyCnt + "::" + result.resultData.result_cd + "::" + result.resultData.result_msg);
				if(result.resultData.sympathyCnt == 0){
					alert(result.resultData.result_msg);
				}else{
					
	/*				action= '${ctx}' + '/fanpage/mainView'; 
					$("#frmView").attr("action", action);
					document.frmView.submit();	*/
					
/*					var sAction= '/fanpage/mainView'; 
					document.forms[0].action = sAction;
					document.forms[0].submit();			*/			
				}
				//var $optReplyLaer = jQuery('.opt_reply_layer');

				
			    $('.opt_layer').removeClass('on');
			    $('.opt_reply_layer').removeClass('opt_layer');
			    $('.opt_layer2').removeClass('opt_layer');
			    
			    $('.opt_reply_layer').removeClass('on');
			    $('.opt_layer2').removeClass('on');	
			    
			    // SonHW 추가
			    $('.opt_reply_layer').hide();
			    if(gubun=="RH"){
			    	$('ul.customer_con').find("div.mark_comment_area").parent("li").filter("[data-sIdx="+commentIdx+"]").remove();
			    }
			    
			    if(confirmChk == 'Y'){
			    	alert("신고가 접수되었습니다. 내용 확인 후 반영하도록 하겠습니다.");
			    }
			},
			error: function(){
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
				+ encodeURIComponent("mainView?movieIdx=" + strMovieIdx + "&iTab=2");
			}
	  });	 
	}
}




//이전페이지 url 구분값 조회
function fnGetQuerystring(_tempUrl, paramName){ 
	
	var sCheck = checkSpecial(_tempUrl);
	
	if(sCheck == true){
		var _tempArray = _tempUrl.split('&'); 				// '&'을 기준으로 분리하기 
		//alert(_tempArray + "::"+_tempArray.length);
		for(var i = 0; _tempArray.length; i++) {
			
			if(_tempArray[i].split('=') != undefined ){
				var _keyValuePair = _tempArray[i].split('='); 	// '=' 을 기준으로 분리하기 
				if(_keyValuePair[0] == paramName){				// _keyValuePair[0] : 파라미터 명 // _keyValuePair[1] : 파라미터 값 
					return _keyValuePair[1]; 
				}
			}
		}		
	}else{
		return "";
	}

}


//특수 문자가 있나 없나 체크 
function checkSpecial(str) { 
	var special_pattern = /[&]/; 
	if(special_pattern.test(str) == true) { 
		return true; 
	} 
	else { 
		return false; 
	} 
}


//엣지쿠폰 발급
function fnEdgeCoupon(contractNo, $obj){
	if(!IsLogin){
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
		}
	}else{
		$obj = $obj.parents('.edge_coupon_area');
		var edgeIdx = $obj.attr("eidx");
		var userCouponCnt = $obj.attr("ucnt");
		var eventStart = $obj.attr("sdate");
		var eventEnd = $obj.attr("edate");
		
		//console.log("EDGE IDX : " + edgeIdx + ", USER COUPON CNT : " + userCouponCnt + ", EVENT START DATE : " + eventStart + ", EVENT END DATE : " + eventEnd);
		
		var param = {
				"edgeIdx"		  : edgeIdx,				
				"contractNo"	  : contractNo,
				"userId"		  : strUserId,
				"userCouponCnt"   : userCouponCnt,
				"eventStart"	  : eventStart,
				"eventEnd"		  : eventEnd
			};
			
		var formdata = jsJsonToFormData(param);
		
		$.ajax({
			method: "post",
			url: "/fanpage/edgeCoupon",
			processData: false,
			contentType: false,
			dataType: "json",
			data: formdata,
			success: function(data){
				console.log("Edge Coupon result code : " + data.result_code);
				console.log("Edge Coupon result msg : " + data.result_msg);
				if(data.result_code=='success'){
					alert('쿠폰이 발급되었습니다.\n발급된 쿠폰으로 영화를 예매하세요!');
				} else {
					alert(data.result_msg);
				}
			},
			error: function(){
				console.log("Ajax Failed");
			}
		});
		
	}
	
}

// 컨텐츠 기능 - 상단 좌측 영화프로필 이미지 클릭 시
function fnGoFanpage(movieIdx, groupTitle, contTxt){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_배급사팬페이지", "관련소식_영화상세", groupTitle + "/" + contTxt.substr(0,20));
	}else{
		fnSendGALog("1", "", "MW_배급사팬페이지", "관련소식_영화상세", groupTitle + "/" + contTxt.substr(0,20));
	}
	location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + movieIdx;
}

// 컨텐츠 기능 - 상세보기
function fnGoDetail(movieIdx, contIdx, groupTitle, contTxt){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_배급사팬페이지", "관련소식_상세보기", groupTitle + "/" + contTxt.substr(0,20));
	}else{
		fnSendGALog("1", "", "MW_배급사팬페이지", "관련소식_상세보기", groupTitle + "/" + contTxt.substr(0,20));
	}
	var url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + movieIdx + "&fanpageReturnUrl="
			+ encodeURIComponent("contentsDetail?movieIdx=" + movieIdx + "&contentsIdx=" + contIdx);
	location.href = url;
}