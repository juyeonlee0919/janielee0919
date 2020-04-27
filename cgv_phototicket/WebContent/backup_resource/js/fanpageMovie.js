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

// 탭 정보 유지 필요하여 추가. 20171218
function fnMobeTab(tab){
	//document.frmMainView.iTab.value = tab;
	//document.frmMainView.submit();
	var url = "/fanpage/mainView?movieIdx=" + document.frmMainView.movieIdx.value + "&iTab=" + tab;
	
	location.replace(url);
}

// 탭 선택에 따른 화면 조회. ChoiTH
function fnTabMenu(tk){
	
	if(tk == "1") {
		if(AppVersion_Master >= 448){
			fnSendGALog("1", "", "MA_팬페이지", "관련소식", movieGroupTitle);
		}else{
			fnSendGALog("1", "", "MW_팬페이지", "관련소식", movieGroupTitle);
		}
	}else if(tk == "2") {
		if(AppVersion_Master >= 448){
			fnSendGALog("1", "", "MA_팬페이지", "실관람평", movieGroupTitle);
		}else{
			fnSendGALog("1", "", "MW_팬페이지", "실관람평", movieGroupTitle);
		}
	}else if(tk == "3") {
		if(AppVersion_Master >= 448){
			fnSendGALog("1", "", "MA_팬페이지", "영화정보", movieGroupTitle);
		}else{
			fnSendGALog("1", "", "MW_팬페이지", "영화정보", movieGroupTitle);
		}
	}
	
	isListComplete = false;
	pageStart = 1;
	cmtsPageStart = 1;
	
	if($("#fpTabCont1").length > 0){
		$("#fpTabCont1").find("div.cover_list > ul").html("<li><div class='con_loading'><img src='../images/common/loading2.gif' alt='페이지 불러오는 중' /></div></li>");
	}
	
	//$(window).off("scroll");
	
	// 관련소식
	if(tk == "310" || tk == "311" || tk == "1") {
	//if(tk == "1") {	// 영화정보 기본 노출 시
		/*if(tk == "310" || tk == "311"){
			if(strChartYN == "Y"){
				initLineChart();
			}
		}*/
		
		fnContentsTotCnt();
		
		$.ajax({
			method: "post",
			url: "/fanpage/contentsList",
			dataType: "html",
			data: {movieIdx:strMovieIdx, pageStart:pageStart, pageSize:pageSizeCont, IsRun:IsRun},
			success: function(result){
				
				$("div.cover_list > ul").html(result);
				
				fpCoverImg();
				
				// SonHW 탭이동과 동시에 10개의 관련소식 바로 불러오기
				/*if(pageStart == '1'){
					
					if (isPreviousContentsComplete) {
						$("#fpTabCont1").find("div.cover_list > ul").append("<li><div class='con_loading'><img src='../images/common/loading2.gif' alt='페이지 불러오는 중' /></div></li>");
						fnContentsList();
					}
					
					if(isListComplete) {
						//isListComplete = false;
						//alert("마지막 페이지 입니다.");
						return false;
					}
					
				} else {
					
					if(dataTotCnt > pageSize){
						$(window).off("scroll").on("scroll", function(e) {
							if (jQuery(window).scrollTop() >= (jQuery(document).height() - jQuery(window).height()) * 0.7) {
								if (isPreviousContentsComplete) {
									$("#fpTabCont1").find("div.cover_list > ul").append("<li><div class='con_loading'><img src='../images/common/loading2.gif' alt='페이지 불러오는 중' /></div></li>");
									fnContentsList();
								}
								
								if(isListComplete) {
									//isListComplete = false;
									//alert("마지막 페이지 입니다.");
									return false;
								}
							}
						});
					}
				}*/
				// 수정 소스 END
				
				// 기존 소스 START 
				if(dataTotCnt > pageSizeCont){
					$(window).off("scroll").on("scroll", function(e) {
						if (jQuery(window).scrollTop() >= (jQuery(document).height() - jQuery(window).height()) * 0.7) {
							if (isPreviousContentsComplete) {
								$("#fpTabCont1").find("div.cover_list > ul").append("<li><div class='con_loading'><img src='../images/common/loading2.gif' alt='페이지 불러오는 중' /></div></li>");
								fnContentsList();
							}
							
							if(isListComplete) {
								//isListComplete = false;
								//alert("마지막 페이지 입니다.");
								return false;
							}
						}
					});
				}
				// 기존 소스 END
			    
				fnapageVideos = document.querySelectorAll("video");
				enableVideosList();
                
			},
			error: function(){
				/*alert('관련소식을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');*/
			}
	    });
		
	// 실관람평
	} else if (tk == "201" || tk == "2") {
	//} else if (tk == "2") {		// 영화정보 기본 노출 시	
		
		$.ajax({
			method: "post",
			url: "/fanpage/movieCmtsTotCnt",
			dataType: "html",
			data: {movieIdx:strMovieIdx, pageStart:cmtsPageStart, pageSize:pageSize},
			success: function(result){
                $("#fpTabCont2").html(result);
                initRadarChart();
                
                //jQuery(window).scrollTop() = 0;
                var sTotCnt = $("#sAllCnt").val();
                
               // if(cmtsPageStart == 1){
                	fnMovieCommentsList(sTotCnt, pageStart);
				//}
            	if(sTotCnt > pageSize){
	                $(window).off("scroll").on("scroll", function(e) {
				        if (jQuery(window).scrollTop() >= (jQuery(document).height() - jQuery(window).height()) * 0.7) {
				        	//cmtsPageStart = cmtsPageStart + pageSize;
				            //	$("#fpTabCont2").find("div.cover_list > ul").append("<li><div class='con_loading'><img src='../images/common/loading2.gif' alt='페이지 불러오는 중' /></div></li>");
				            	//fnMovieCommentsList(cmtsPageStart);
			            	 if (isPreviousContentsComplete) {
			            		 pageStart = pageStart + pageSize;
				            	$("#fpTabCont2").find("div.cover_list > ul").append("<li><div class='con_loading'><img src='../images/common/loading2.gif' alt='페이지 불러오는 중' /></div></li>");
				            	fnMovieCommentsList(sTotCnt, pageStart);
			            	 }
			            	 if(isListComplete) {
				                //isListComplete = false;
				                //alert("마지막 페이지 입니다.");
				                return false;
			            	 }
						            
				        }
	                });
            	}
			},
			error: function(){
				/*alert('실관람평을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');*/
			}
	    });
		
	// 영화정보
	} else if (tk == "200" || tk == "3") {
	//} else if (tk == "200" || tk == "201" || tk == "310" || tk == "311" | tk == "3") {	// 영화정보 기본 노출 시	
		$.ajax({
			method: "post",
			url: "/fanpage/movieInfoView",
			dataType: "html",
			data: {movieIdx:strMovieIdx, pageStart:pageStart, pageSize:pageSize},
			success: function(result){
                    
                $("#fpTabCont3").html(result);
                
                /*
                if(!jQuery('.fp_tabcont').eq(2).hasClass('on')) {
                	destroySlide(jQuery('.makers_slide .owl-carousel'));
                	destroySlide(jQuery('.movie_trailer .owl-carousel'));
				}
				*/
                
                makersSlide();
				trailerSlide();
				movieGalleryList();
				//setTimeout(function(){fnShowTrailerTime();}, 2000);
                
			},
			error: function(){
				/*alert('영화정보를 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');*/
			}
	    });
		
	} else {
	    history.go(-1);
	}
}

// 배급사 링크 이동. ChoiTH
function fnMoveBiLink(agencyName, url){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_팬페이지", "배급사", agencyName);
	}else{
		fnSendGALog("1", "", "MW_팬페이지", "배급사", agencyName);
	}
	var url = gateURL  + "Fanpage/Gateway.aspx?agencyCd=" + url;
	 
	//goOutLink(url, 0);
	location.href = url;
}

// 실관람평 목록 조회
function fnMovieCommentsList(dataTotCnt, pageStart){  
	isPreviousContentsComplete = false;
	
	
	$.ajax({
		method: "post",
		url: "/fanpage/movieCmtsList",
		dataType: "html",
		data: {movieIdx:strMovieIdx, pageStart:pageStart, pageSize:pageSize},
		success: function(result){

			//alert(${TotCnt});

			$("div.comment_wrap").append(result);

			if(dataTotCnt > pageStart + pageSize){
				isPreviousContentsComplete = true;
			}else{
				isListComplete = true;
			}
		},
		error: function(){
			location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
			+ encodeURIComponent("mainView?movieIdx=" + strMovieIdx + "&iTab=2");
		}
	});	
	
	$("#fpTabCont2").find("div.comment_wrap > ul").find("div.con_loading").parent("li").parent("ul").remove();
}


// 관련소식 컨텐츠 목록 조회. ChoiTH
function fnContentsList(){
	isPreviousContentsComplete = false;
	pageStart = pageStart + pageSizeCont;
	
	$.ajax({
		method: "post",
		url: "/fanpage/contentsList",
		dataType: "html",
		data: {movieIdx:strMovieIdx, pageStart:pageStart, pageSize:pageSizeCont, IsRun:IsRun},
		success: function(result){
			
			$("div.cover_list > ul").append(result);
            
			fpCoverImg();
			
			/*if(dataTotCnt > pageStart + pageSizeCont){*/
			if(dataTotCnt > pageStart){
				isPreviousContentsComplete = true;
			}else{
				isListComplete = true;
			}
			
			$("#fpTabCont1").find("div.cover_list > ul").find("div.con_loading").parent("li").remove();
			
			fnapageVideos = document.querySelectorAll("video");
			enableVideosList();
			
		},
		error: function(){
			location.reload();
		}
    });
}

// 관련소식 컨텐츠 목록 전체 개수 조회. ChoiTH
function fnContentsTotCnt(){
	$.ajax({
		method: "post",
		url: "/fanpage/contentsTotCnt",
		dataType: "json",
		data: {movieIdx:strMovieIdx},
		success: function(result){
			dataTotCnt = result.contentsTotCnt;
			
			if(dataTotCnt == 0){
				isPreviousContentsComplete = false;
				isListComplete = true;
			}
		},
		error: function(){
			/*alert('관련소식을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');*/
		}
    });
}

// 관련소식 컨텐츠 상세보기 화면으로 이동. ChoiTH
function fnMoveContentsDetail(url, contTxt, ContIdx){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_팬페이지", "관련소식_반응보기", movieGroupTitle+"/"+contTxt.substr(0,20));
	}else{
		fnSendGALog("1", "", "MW_팬페이지", "관련소식_반응보기", movieGroupTitle+"/"+contTxt.substr(0,20));
	}
	
	
	$.ajax({
		method: "post",
		url: "/fanpage/contentsOpt",
		dataType: "json",
		data: {optKind:"TD", movieIdx:strMovieIdx, contentsIdx:ContIdx},
		success: function(result){
			
		},
		error: function(){
			
		}
    });
	
	location.href = url;
	/*url = "http://10.66.0.66:8081" + url;
	eventLink(5, url);*/
}

// 관련소식 컨텐츠 url 외부링크로 이동. ChoiTH
function fnMoveContentsUrl(url, contTxt, ContIdx){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_팬페이지", "관련소식_반응보기", movieGroupTitle+"/"+contTxt.substr(0,20));
	}else{
		fnSendGALog("1", "", "MW_팬페이지", "관련소식_반응보기", movieGroupTitle+"/"+contTxt.substr(0,20));
	}
	
	
	$.ajax({
		method: "post",
		url: "/fanpage/contentsOpt",
		dataType: "json",
		data: {optKind:"TD", movieIdx:strMovieIdx, contentsIdx:ContIdx},
		success: function(result){
			
		},
		error: function(){
			
		}
    });
	
	if(url.indexOf("cgv.co.kr") == "-1" && url.indexOf("cgv.kr") == "-1"){
		goOutLink(url, 0)
	} else {
		eventLink(1, url);
	}
	
}

// 관련소식 컨텐츠 댓글 목록 조회. ChoiTH
function fnCommentList(){
	isPreviousContentsComplete = false;
	pageStart = pageStart + pageSize;
	
	$.ajax({
		method: "post",
		url: "/fanpage/contentsCommentList",
		dataType: "html",
		data: {movieIdx:strMovieIdx, contentsIdx:strContentsIdx, pageStart:pageStart, pageSize:pageSize},
		success: function(result){
			
			if(dataTotCnt > pageStart + pageSize){
				isPreviousContentsComplete = true;
			}else{
				isListComplete = true;
			}
			
			$("ul.customer_con").append(result);
			
			//callOptLayer();
			
		},
		error: function(){
			/*alert('댓글을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');*/
		}
    });
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

// 영화정보 스틸컷 뷰어로 보기. ChoiTH
function fnStillcutView(iCnt){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_팬페이지", "영화정보_포토스틸컷", movieGroupTitle);
	}else{
		fnSendGALog("1", "", "MW_팬페이지", "영화정보_포토스틸컷", movieGroupTitle);
	}
	
	var url = "http://"+location.host + "/fanpage/stillCutViewer?movieIdx="+strMovieIdx+"&iCnt="+iCnt;
	
	if(IsWebView_Master){
		CGVFanpageAppInterface.EventBannerCall("5", encodeURIComponent(url));
	}else{
		location.href = url;
	}
}

// 영화정보 인물상세 화면 보기. ChoiTH
function fnMoviePersonInfoView(idx, pName){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_팬페이지", "영화정보_감독/배우", movieGroupTitle+"_"+pName);
	}else{
		fnSendGALog("1", "", "MW_팬페이지", "영화정보_감독/배우", movieGroupTitle+"_"+pName);
	}
	
	var url = "http://"+location.host + "/fanpage/moviePeopleView?PeopleIdx="+idx;
	
	if(IsWebView_Master){
		CGVFanpageAppInterface.EventBannerCall("5", encodeURIComponent(url));
	}else{
		location.href = url;
	}
}


// 영화정보 인물상세 포토갤러리 뷰어로 보기. ChoiTH
function fnMoviePeoplePhotoView(iCnt, pIdx){
	var url = "http://"+location.host + "/fanpage/searchMoviePeoplePhotoViewer?movieIdx="+strMovieIdx+"&PeopleIdx="+pIdx+"&iCnt="+iCnt;
	
	if(IsWebView_Master){
		CGVFanpageAppInterface.EventBannerCall("5", encodeURIComponent(url));
	}else{
		location.href = url;
	}
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
function fnWriteContentsComment(gubun, contIdx, cIdx, cTxt, imgUrl){
	cIdx = cIdx || "";
	cTxt = cTxt || "";
	imgUrl = imgUrl || "";
	
	if(!IsLogin){
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
		}
	}else{
		if(AppVersion_Master >= 448){
			fnSendGALog("1", "", "MA_팬페이지", "관련소식_댓글달기", movieGroupTitle+"/"+cTxt.substr(0,20));
		}else{
			fnSendGALog("1", "", "MW_팬페이지", "관련소식_댓글달기", movieGroupTitle+"/"+cTxt.substr(0,20));
		}
		
		if(IsWebView_Master){
			cTxt = cTxt.replace(/(<br>|<br\/>|<br \/>)/g, "\n");
			cTxt = cTxt.replace(/<img[^>]*>/g, "");
			
			// CGVFanpageAppInterface.FanPageEditContentsComment(act, movieName, isView, nextPage, movieIdx, contentsIdx, commentIdx, commentReplyIdx, commentText, savedImageUrl, userType, userCode);
			CGVFanpageAppInterface.FanPageEditContentsComment(gubun, movieGroupTitle, "N", 'fnCallbackContentsComment', strMovieIdx, contIdx, cIdx, "", cTxt, imgUrl, "U", strUcd);
			
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
			document.frmWriteContentsComment.movieIdx.value = strMovieIdx;
			document.frmWriteContentsComment.contentsIdx.value = contIdx;
			document.frmWriteContentsComment.commentIdx.value = cIdx;
			
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
	if(strContentsIdx == "" || strContentsIdx == undefined){
		location.href = "http://moviestory.cgv.co.kr/fanpage/contentsDetail?movieIdx=" + strMovieIdx + "&contentsIdx=" + AppWriteContentsIdx + "#comment_wrap";
		//location.reload()
	} else{ // 상세페이지에서 등록했을 경우 페이지 새로고침
		//location.href = window.document.location.href;
		//location.replace("/fanpage/contentsDetail?movieIdx="+strMovieIdx+"&contentsIdx="+AppWriteContentsIdx+"#comment_wrap");
		location.reload()
		
	}
	
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












//실관람평 공감 건수 증가감 처리
function fnInsComtsGood(commentIdx, $obj, cmtsRegId){  
	var sAct = "";
	var sId = ""
	// 굿리뷰어인지 아닌지 판단
	if($obj.parents("span.likeit").length == 0){
		sId  = $obj.parents("div.write_day").find("em").attr("class");
		if(sId == "choice_on"){
			sAct = "S02";
		}else if(sId == "choice_off"){
			sAct = "S01";
		}
	} else {
		if( $obj.parents("span.on").length == 0){
			sAct = "S01";
		} else{
			sAct = "S02";
		}
	}
	//var sUserID = "test";
	//로그인 여부 체크 로직 추가
	
	//공감 하기 클릭했을 경우 

	
	if(!IsLogin){		//로그인 여부 체크
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
		}
	}else{
		if(AppVersion_Master >= 448){
			fnSendGALog("1", "", "MA_팬페이지", "실관람평_공감하기", movieGroupTitle);
		}else{
			fnSendGALog("1", "", "MW_팬페이지", "실관람평_공감하기", movieGroupTitle);
		}
		
		
		$.ajax({
			method: "post",
			url: "/fanpage/saveMovieCmtsOpt",
			dataType: "json",
			data: {movieIdx:strMovieIdx, commentIdx:commentIdx, gubun:sAct, cmtsRegId:cmtsRegId},
			success: function(result){  
				//alert(result.resultData.sympathyCnt + "::" + result.resultData.goodTotCnt + "::" + result.resultData.replyContents);
				//굿리뷰 클릭인지 아닌지 판단.
				if($obj.parents("span.likeit").length == 0){
					$obj.parents("div.write_day").find("em").removeClass();
					
					if(result.resultData.sympathyCnt == 1){
						$obj.parents("div.write_day").find("em").addClass("choice_on");
					}else if(result.resultData.sympathyCnt == 0){
						$obj.parents("div.write_day").find("em").addClass("choice_off");
					}
					
					//console.log("value : " + result.resultData.goodTotCnt);
					$obj.parents("div.write_day").find("span.number").text( result.resultData.goodTotCnt);				
				} else{
					var cnt = $obj.parents("span.likeit").find("span.count").text();
					cnt = Number(cnt.replace("명", ""));
					if(result.resultData.sympathyCnt == 1){
						cnt++;
						$obj.parents("span.likeit").addClass("on");
						$obj.parents("span.likeit").find("span.count").text(cnt + "명");
					} else if(result.resultData.sympathyCnt == 0){
						cnt--; 
						$obj.parents("span.likeit").removeClass("on");
						$obj.parents("span.likeit").find("span.count").text(cnt + "명");
					}
					//$obj.parents("span.likeit").find("span.count").text(result.resultData.goodTotCnt+"명");
				}
			},
			error: function(){
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
				+ encodeURIComponent("mainView?movieIdx=" + strMovieIdx + "&iTab=2");
			}
	  });	 
	}
}




//실관람평 답글 공감 건수 증가감 처리
function fnInsComtsGoodReply( commentIdx, replyIdx, $obj, cmtsRegId, totCnt){
	var sId  = $obj.parents("div.write_day").find("em").attr("class");
	var sAct = "";
	//var sUserID = "test";
	//로그인 여부 체크 로직 추가
	
	//공감 이미지 체크
	if(sId == "choice_on"){
		sAct = "S04";
	}else if(sId == "choice_off"){
		sAct = "S03";
	}
	
	
	if(!IsLogin){		//로그인 여부 체크
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
		}
	}else{  	
	
		$.ajax({
			method: "post",
			url: "/fanpage/saveMovieCmtsOpt",
			dataType: "json",
			data: {movieIdx:strMovieIdx, commentIdx:commentIdx, replyIdx:replyIdx, gubun:sAct, cmtsRegId:cmtsRegId, replyCnt:totCnt},
			success: function(result){  
				$obj.parents("div.write_day").find("em").removeClass();
				
				//alert(result.resultData.likeCnt);
				if(result.resultData.likeCnt == 1){
					$obj.parents("div.write_day").find("em").addClass("choice_on");
				}else {
					$obj.parents("div.write_day").find("em").addClass("choice_off");
				}
				console.log("value : "+result.resultData.goodTotCnt);
				$obj.parents("div.write_day").find("span.number").text( result.resultData.goodTotCnt);				
			},
			error: function(){
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
				+ encodeURIComponent("mainView?movieIdx=" + strMovieIdx + "&iTab=2");
			}
	  });	 
	}
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


//실관람평 답글 내용을 클릭했을 경우 (수정하기 , 삭제하기 또는 신고하기 , 숨기기 보이기)
function fnGoReplyOpt(idx, replyIdx, userId, $obj, fileUrl){  
	//selectedReplyText = $.trim($obj.html());
	selectedReplyText = $.trim($obj.html());
	var myRegExp = /(<|<\/)span([\s.'"=a-zA-Z]*)>/gi;
	selectedReplyText = selectedReplyText.replace(myRegExp, "");
	selectedReplyText = selectedReplyText.replace(/<img[^>]*>/g,"")
	

	var $optReplyLayer;
	
    $('.opt_layer').removeClass('on');
    $('.opt_reply_layer').removeClass('opt_layer');
    $('.opt_layer2').removeClass('opt_layer');
	
    $('.opt_reply_layer').removeClass('on');
    $('.opt_layer2').removeClass('on');	     
	if(userId == strUserId){ 
		$optReplyLayer = jQuery('.opt_layer2');
	}else{   
		$optReplyLayer = jQuery('.opt_reply_layer');
	}

	$optReplyLayer.addClass('opt_layer');
	$optReplyLayer.addClass('on');		
	$optReplyLayer.show();
	
	event.preventDefault();
	    
	document.forms[0].commentIdx.value  	= idx;
	document.forms[0].replyIdx.value  		= replyIdx;
	document.forms[0].replyFileUrl.value  	= fileUrl;
	document.forms[0].cmtsGubun.value  		= '2';	//1.실관람평, 2.답글
	
/*	sFormId.commentIdx.value 		= idx;
	sFormId.replyIdx.value 		= replyIdx;
	sFormId.replyFileUrl.value 	= fileUrl;
	sFormId.cmtsGubun.value 		= '2';	//1.실관람평, 2.답글
*/}		


//실관람평을 클릭했을 경우 (수정하기 , 삭제하기 또는 신고하기 , 숨기기 보이기)
function fnGoOpt(idx , userId, $obj, point, fileUrl){  
	
	//selectedReplyText = $.trim($obj.find("span").remove().end().html());
	selectedReplyText = $.trim($obj.html());
	var myRegExp = /(<|<\/)span([\s.'"=a-zA-Z]*)>/gi;
	selectedReplyText = selectedReplyText.replace(myRegExp, "");

	selectedReplyText = selectedReplyText.replace(/<img[^>]*>/g,"")
	
	var $optReplyLayer;

    $('.opt_layer').removeClass('on');
    $('.opt_reply_layer').removeClass('opt_layer');
    $('.opt_layer2').removeClass('opt_layer');
    
    $('.opt_reply_layer').removeClass('on');
    $('.opt_layer2').removeClass('on');	 
    
	if(userId == strUserId){ 
		$optReplyLayer = jQuery('.opt_layer');
	}else{   
		$optReplyLayer = jQuery('.opt_reply_layer');
	}

	$optReplyLayer.addClass('opt_layer');
	$optReplyLayer.addClass('on');		
	$optReplyLayer.show();
	
	
	event.preventDefault();
	
	document.forms[0].commentIdx.value  	= idx;
	document.forms[0].point.value  			= point;
	document.forms[0].fileUrl.value  		= fileUrl;
	document.forms[0].cmtsGubun.value  		= '1';	//1.실관람평, 2.답글
	
/*	document.getElementById("commentIdx").value = idx;
	document.getElementById("point").value 		= point;
	document.getElementById("fileUrl").value 	= fileUrl;
	document.getElementById("cmtsGubun").value 	= '1';   //1.실관람평, 2.답글
*/}


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




var cameraClickYn 	= "N";
/* 	구분자에 따라 화면 이동
C 등록 , R 상세, U 수정, D 삭제, SC e 답글 등록*/
/* camera : 카메라이미지 눌렀을 경우 Y */
function fnUpdCmt(gubun, camera){  
	var nextPage = window.document.location.href;	//평점 작성 완료 후 이동할 페이지
	// '취소'를 눌렀을 경우
	if(gubun == 'E'){
		jQuery('.opt_layer').removeClass('on');
		jQuery('.opt_layer').hide();
		
		jQuery('.opt_layer2').removeClass('on');
		jQuery('.opt_layer2').hide();
		
		jQuery('.opt_reply_layer').removeClass('on');
		jQuery('.opt_reply_layer').hide();			
	    
	    $('.opt_reply_layer').removeClass('opt_layer');
	    $('.opt_layer2').removeClass('opt_layer');
	    
	}else{
		if(!IsLogin){		//로그인 여부 체크
			if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
				fnMoveLoginPage();
			}
		}else{  
			var commentIdx 		= document.forms[0].commentIdx.value; //document.getElementById("commentIdx").value;
			
			
			// '삭제하기' 눌렀을 경우
			if(gubun == 'D'){
				
				var sData = {gubun:gubun, movieIdx:strMovieIdx, commentIdx:commentIdx};	
				
				if(!confirm("관람평을 삭제하실 경우\n지급된 포인트는 차감됩니다.\n삭제하시겠습니까?")) return;
			    
		     	$.ajax({
					method: "post",
					url: "/fanpage/saveMovieCmtsView",
					processData: false, 
				    contentType: false,        			
					dataType: "json",
					data: jsJsonToFormData(sData),
					success: function(result){  
						
						alert(result.resultMsg);
						
						if (result.hmResultCd == "0000" || result.hmResultCd == "0001") {
							
		    			    $('.opt_layer').removeClass('on');
		    			    $('.opt_reply_layer').removeClass('opt_layer');
		    			    $('.opt_layer2').removeClass('opt_layer');
		    			    
		    			    $('.opt_reply_layer').removeClass('on');
		    			    $('.opt_layer2').removeClass('on');	 
		    			    event.preventDefault();
		    			    
		    			    var sCheck = checkSpecial(nextPage);
		    			    
		    			   // alert("sCheck=>"+sCheck);
		    			    if(sCheck == true){
		    			    	location.href = nextPage;
		    			    }else{
		    			    	document.forms[0].action = nextPage;
		    					document.forms[0].submit();		    			    	
		    			    }
							
		 					jQuery("#charmWriteForm").fadeOut();
		 					jQuery("#writeForm").fadeOut(); 							
						}
					},
					error: function(){
						//alert('140자평 삭제에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
						location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
						+ encodeURIComponent("mainView?movieIdx=" + strMovieIdx + "&iTab=2");
					}
			    });	 
		     	
	     	// '삭제하기' 외 처리
			}else{	//alert(IsWebView_Master + ":::::"+ gubun);
				//관람객일 경우만
				if(IsView == "N") {
					alert("실관람객이 아닙니다.");
					return;
				}else{
					// 웹뷰일 경우
					if(IsWebView_Master){
						if(gubun == 'C'){			//실관람평 등록
							if(AppVersion_Master >= 448){
								fnSendGALog("1", "", "MA_팬페이지", "실관람평_등록", movieGroupTitle);
							}else{
								fnSendGALog("1", "", "MW_팬페이지", "실관람평_등록", movieGroupTitle);
							}
							
							/*$('.btn_photo').click(function(){  
								cameraClickYn 	= "Y";
							});*/
							if(camera == 'Y') {
								cameraClickYn 	= "Y";
							};
							
							//console.log("cameraClickYn :: ", cameraClickYn);
							
							/* FanPageRealShowWriteComment(영화 Index, 영화명(한글), 관람여부, 평점 작성 완료 후 이동할 페이지
									, 카메라버튼이눌려서 실관람평 작성이 호출되었는지에 대한 여부, 통합회원코드) */
							CGVFanpageAppInterface.FanPageRealShowWriteComment(strMovieIdx, movieGroupTitle, IsView, 'fnCmtsCallBack', cameraClickYn, strUcd);					
						}else if(gubun == 'SC'){	//실관람평 답글 등록

							if(AppVersion_Master >= 448){
								fnSendGALog("1", "", "MA_팬페이지", "실관람평_답글", movieGroupTitle);
							}else{
								fnSendGALog("1", "", "MW_팬페이지", "실관람평_답글", movieGroupTitle);
							}
							
							//alert(strMovieIdx + "="+ commentIdx);
							/*FanPageEditContentsComment(처리구분, 영화명(한글), 관람여부, 평점 작성 완료 후 이동할 페이지, 영화 Index, 
							  컨텐츠 일련번호, 컨텐츠 댓글 일련번호, 컨텐츠 대댓글 일련번호, 댓글 대댓글 내용, 
							  댓글 수정 대댓글 수정일 때 이미지가 있을 경우 해당 이미지의 url 주소, 회원타입, 통합회원코드)*/
							CGVFanpageAppInterface.FanPageEditContentsComment
								("01",  movieGroupTitle, IsView
								, 'fnCmtsReplyCallBack', strMovieIdx
								, "", commentIdx, "",  "",  "", "U", strUcd);		
							
							
						}else if(gubun == 'R'){		//상세보기
							
							var sPoint 		= document.forms[0].point.value; //document.getElementById("point").value;
							var sFileUrl 	= document.forms[0].fileUrl.value;//document.getElementById("fileUrl").value
							// Son.HW 추가
							if(sFileUrl == "" || sFileUrl == null){
							}else{
								sFileUrl = sFileUrl.replaceAll("http://img.cgv.co.kr", "");
								sFileUrl = "http://img.cgv.co.kr" + sFileUrl; 
							}
							//alert(sPoint + ":"+ selectedReplyText + ":"+sFileUrl);
							
							selectedReplyText = selectedReplyText.replace(/(<br>|<br\/>|<br \/>)/g, '\n');
							if(selectedReplyText.charAt(selectedReplyText.length-1) == "\n"){
								selectedReplyText = selectedReplyText.slice(0, -1);
							}
							
							/*
							FanPageRealShowModifyComment(영화 Index, 영화명(한글), 관람여부, 실관람객 노출여부 (Y/N),  내 평점(1~10)
							, 평점 내용, 평점 Key, 평점 작성 완료 후 이동할 페이지, 이전 실관람평에 이미지가 있을 경우, 해당 이미지의 url 주소
							, 통합회원코드)
							*/
							CGVFanpageAppInterface.FanPageRealShowModifyComment(
									  strMovieIdx
									, movieGroupTitle
									, IsView
									, "Y"
									, sPoint
									, selectedReplyText
									, commentIdx
									, 'fnCmtsCallBack'
									, sFileUrl
									, strUcd);	
						}
					}else{
						// 웹뷰가 아닐경우
						//실관람평등록 및 답글등록 및 수정(상세보기)
						if(gubun == 'C' || gubun == 'SC' || gubun == 'R'){   
							//document.getElementById("gubun").value    = gubun;
							if(camera == 'Y'){
								cameraClickYn 	= "Y";
							}  
							
							if(gubun == 'C'){ //실관람평 등록
								// 앱버전 체크
								if(AppVersion_Master >= 448){
									fnSendGALog("1", "", "MA_팬페이지", "실관람평_등록", movieGroupTitle);
								}else{
								// 모바일웹일 경우
									//alert("카메라클릭여부 : " + cameraClickYn);
									fnSendGALog("1", "", "MW_팬페이지", "실관람평_등록", movieGroupTitle);
								}
							}else if(gubun == 'SC'){ //실관람평 답글 등록
								if(AppVersion_Master >= 448){
									fnSendGALog("1", "", "MA_팬페이지", "실관람평_답글", movieGroupTitle);
								}else{
									fnSendGALog("1", "", "MW_팬페이지", "실관람평_답글", movieGroupTitle);
								}
							}
							
							document.forms[0].gubun.value = gubun;
							
							if(gubun == 'SC'){
								var sAction= '/fanpage/movieCmtsReplyList'; 
								document.forms[0].action = sAction;						
							}
							document.forms[0].submit();			
						}					
					}						
				}
			}
		
		}		
	}	

}	

// 네이티브에서 실관람평 등록취소 또는 실관람형 댓글 등록 취소할 경우 카메라 버튼 플래그 초기화
function fnCamBack(){
	cameraClickYn = "N";
};

//네이티브에서 실관람평 등록 또는 수정했을 경우 callback
function fnCmtsCallBack(commentIdx, commentContent, hashGubun){
	
	var sCommentContent = decodeURIComponent(commentContent);
	cameraClickYn 		= "N";
	/*실관람평일련번호, 실관람평내용, 등록,수정 구분코드*/
	var sData = {gubun:"1", movieIdx:strMovieIdx, commentIdx:commentIdx
			, commentContent:sCommentContent, hashGubun:hashGubun};	
	
	
	var nextPage = window.document.location.href;	//평점 작성 완료 후 이동할 페이지
	var sCheck = checkSpecial(nextPage);
	 
	//alert(commentIdx + ":" + hashGubun);
	
	if(commentIdx != ""){
		$.ajax({
			method: "post",
			url: "/fanpage/saveMovieCmtsHashTag",
			processData: false, 
		    contentType: false,        			
			dataType: "json",
			data: jsJsonToFormData(sData),
			success: function(result){  
				
			    $('.opt_layer').removeClass('on');
			    $('.opt_reply_layer').removeClass('opt_layer');
			    $('.opt_layer2').removeClass('opt_layer');
			    
			    $('.opt_reply_layer').removeClass('on');
			    $('.opt_layer2').removeClass('on');	 
			    
			   // alert(nextPage + "::"+sCheck);
			    
			    if(sCheck == true){
			    	location.href = nextPage;
			    }else{
			    	document.forms[0].action = nextPage;
					document.forms[0].submit();		    			    	
			    }
	
			},
			error: function(){
				/*alert('실패했습니다.\n잠시 후에 다시 이용해 주세요.');*/
			}
		});	 	
	}else{
		
	    $('.opt_layer').removeClass('on');
	    $('.opt_reply_layer').removeClass('opt_layer');
	    $('.opt_layer2').removeClass('opt_layer');
	    
	    $('.opt_reply_layer').removeClass('on');
	    $('.opt_layer2').removeClass('on');	 
	    
	    if(sCheck == true){
	    	location.href = nextPage;
	    }else{
	    	document.forms[0].action = nextPage;
			document.forms[0].submit();		    			    	
	    }	
	}
}


//네이티브에서 실관람평 답글 등록 또는 수정했을 경우 callback
function fnCmtsReplyCallBack(commentContent, replyIdx, hashGubun){
	
	var commentIdx 		= document.forms[0].commentIdx.value; 
	var sCommentContent = decodeURIComponent(commentContent);
	var cmtsRegId 		= document.forms[0].cmtsRegId.value; 
	var nextPage 		= window.document.location.href;	//평점 작성 완료 후 이동할 페이지
	
	/*실관람평일련번호, 실관람평내용, 등록,수정 구분코드*/
	var sData = {gubun:"2", movieIdx:strMovieIdx, commentIdx:replyIdx
			, commentContent:sCommentContent, parentCmtIdx:commentIdx, hashGubun:hashGubun
			, cmtsRegId:cmtsRegId, replyCnt:0};	
	
	var sCheck = checkSpecial(nextPage);
	//alert(commentIdx + ":"+ replyIdx + ":" + sCommentContent + ":"+ hashGubun + ":"+ 0);
	if(replyIdx != ""){
		
		$.ajax({
			method: "post",
			url: "/fanpage/saveMovieCmtsHashTag",
			processData: false, 
		    contentType: false,        			
			dataType: "json",
			data: jsJsonToFormData(sData),
			success: function(result){ 
			    
			    $('.opt_layer').removeClass('on');
			    $('.opt_reply_layer').removeClass('opt_layer');
			    $('.opt_layer2').removeClass('opt_layer');
			    
			    $('.opt_reply_layer').removeClass('on');
			    $('.opt_layer2').removeClass('on');	 
			    
			    if(sCheck == true){
			    	location.href = nextPage;
			    }else{
			    	document.forms[0].action = nextPage;
					document.forms[0].submit();		    			    	
			    }
			},
			error: function(){
				/*alert('실패했습니다.\n잠시 후에 다시 이용해 주세요.');*/
			}
	  });	 	
	}else{
		
	    $('.opt_layer').removeClass('on');
	    $('.opt_reply_layer').removeClass('opt_layer');
	    $('.opt_layer2').removeClass('opt_layer');
	    
	    $('.opt_reply_layer').removeClass('on');
	    $('.opt_layer2').removeClass('on');	 
	    
	    if(sCheck == true){
	    	location.href = nextPage;
	    }else{
	    	document.forms[0].action = nextPage;
			document.forms[0].submit();		    			    	
	    }		
	}
}


//답글 펼치기 10개 미리보기 조회
function fnCmtsPreviewReply(sCommentIdx, $obj, sReplyTotcnt){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_팬페이지", "실관람평_대댓글보기", movieGroupTitle);
	}else{
		fnSendGALog("1", "", "MW_팬페이지", "실관람평_대댓글보기", movieGroupTitle);
	}
	
	
	$obj.parent().hide();
	$obj.parent().siblings("#previewReplyArea").show();
	
	$.ajax({
		method: "post",
		url: "/fanpage/movieCmtsReplyList",
		dataType: "html",
		data: {movieIdx:strMovieIdx, commentIdx:sCommentIdx, replyTotcnt:sReplyTotcnt, gubun:'SP'},
		success: function(result){

			$obj.parent().siblings("#previewReplyArea").html(result);
			
		},
		error: function(){
			location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&fanpageReturnUrl="
			+ encodeURIComponent("mainView?movieIdx=" + strMovieIdx + "&iTab=2");
		}
    });			
}	


//답글등록
function fnReplyCmts(commentIdx, cmtsRegId){    
	
	document.forms[0].commentIdx.value  = commentIdx;
	document.forms[0].gubun.value       = 'SC';
	document.forms[0].cmtsRegId.value   = cmtsRegId;
	
	if(!IsLogin){		//로그인 여부 체크
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
		}
	}else{
		if(AppVersion_Master >= 448){
			fnSendGALog("1", "", "MA_팬페이지", "실관람평_답글", movieGroupTitle);
		}else{
			fnSendGALog("1", "", "MW_팬페이지", "실관람평_답글", movieGroupTitle);
		}
		
		
		if(IsWebView_Master){
			/*FanPageEditContentsComment(처리구분, 영화명(한글), 관람여부, 평점 작성 완료 후 이동할 페이지, 영화 Index, 
			  컨텐츠 일련번호, 컨텐츠 댓글 일련번호, 컨텐츠 대댓글 일련번호, 댓글 대댓글 내용, 
			  댓글 수정 대댓글 수정일 때 이미지가 있을 경우 해당 이미지의 url 주소, 회원타입, 통합회원코드)*/
			CGVFanpageAppInterface.FanPageEditContentsComment
				("01",  movieGroupTitle, IsView, 'fnCmtsReplyCallBack', strMovieIdx
				, "", commentIdx, "",  "",  "", "U", strUcd);	
			
		}else{
			var sAction= '/fanpage/movieCmtsReplyList'; 
			document.forms[0].action 		= sAction;	
			document.forms[0].submit();	
		}
	}		

}	

//카메라 클릭여부
function fnCameraClickYn(){
	document.forms[0].cameraClickYn.value  = "Y";
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


//해시태그 상세화면 이동
function fnHashTagView(sTag){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_팬페이지", "실관람평_태그", movieGroupTitle + "_" + sTag);
	}else{
		fnSendGALog("1", "", "MW_팬페이지", "실관람평_태그", movieGroupTitle + "_" + sTag);
	}
	
	var url = "http://"+location.host + "/fanpage/hashtagCommentView?Hashtag=" + sTag;

	if(IsWebView_Master){
		CGVFanpageAppInterface.EventBannerCall("5", encodeURIComponent(url));
		
	} else {
		document.forms[0].Hashtag.value = sTag;
		var sAction= '/fanpage/hashtagCommentView'; 
		document.forms[0].action 		= sAction;	
		document.forms[0].submit();
	}
}

//해시 태그 관련 실관람평 목록 조회. 
function fnHashTagViewNextPage(tag){
	
	var sTotCnt = document.forms[0].totCnt.value ;
	pageStart = pageStart + pageSize;
	
	if(sTotCnt >= pageStart){
		$.ajax({
			method: "post",
			url: "/fanpage/hashtagCommentDtl",
			dataType: "html",
			data: {movieIdx:strMovieIdx
					 , pageStart:pageStart
					 , pageSize:pageSize
					 , Hashtag:tag},
			success: function(result){ //alert(result);
				
				$("div.comment_wrap").append(result);
				$("div.comment_wrap").find("div.con_loading").parent("li").parent("ul").remove();
			},
			error: function(){
				/*alert(tag + ' 관람평 목록을 불러올 수 없습니다.');*/
			}
		});
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