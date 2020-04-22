Map = function() {
	this.map = new Object();
};
Map.prototype = {
	put : function(key, value) {
		this.map[key] = value;
	},
	get : function(key) {
		return this.map[key];
	},
	containsKey : function(key) {
		return key in this.map;
	},
	containsValue : function(value) {
		for ( var prop in this.map) {
			if (this.map[prop] == value)
				return true;
		}
		return false;
	},
	isEmpty : function(key) {
		return (this.size() == 0);
	},
	clear : function() {
		for ( var prop in this.map) {
			delete this.map[prop];
		}
	},
	remove : function(key) {
		delete this.map[key];
	},
	keys : function() {
		var keys = new Array();
		for ( var prop in this.map) {
			keys.push(prop);
		}
		return keys;
	},
	values : function() {
		var values = new Array();
		for ( var prop in this.map) {
			values.push(this.map[prop]);
		}
		return values;
	},
	size : function() {
		var count = 0;
		for ( var prop in this.map) {
			count++;
		}
		return count;
	}
};

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "AM" : "PM";
            default: return $1;
        }
    });
};


Date.prototype.is24hourDiffer = function() {
	var regdt = this;
	var regDate = new Date(regdt);
	var nowDate = new Date();
	
	var r = parseFloat(regDate.format('yyyyMMddHHmmss'));
	var d = parseFloat(nowDate.format('yyyyMMddHHmmss')) - 1000000; // 전날 뺌

	return (r > d);
};

Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
};


 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

String.prototype.startsWith = function(needle) {
    return(this.indexOf(needle) == 0);
};

//replaceAll prototype 선언
String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}


/**
 * 공백제거
 */
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/gi, "");
}

/**
 * null일경우, default값 설정
 */
function nvl(value, defaultVal) {
	return (isNull(value+""))? defaultVal:value;
}

/** 
 * string String::cut(int len)
 * 글자를 앞에서부터 원하는 바이트만큼 잘라 리턴합니다.
 * 한글의 경우 2바이트로 계산하며, 글자 중간에서 잘리지 않습니다.
 */
 String.prototype.cut = function(len) {
         var str = this;
         var l = 0;
         for (var i=0; i<str.length; i++) {
                 l += (str.charCodeAt(i) > 128) ? 2 : 1;
                 if (l > len) return str.substring(0,i) + "..";
         }
         return str;
 }

 /** 
 * bool String::bytes(void)
 * 해당스트링의 바이트단위 길이를 리턴합니다. (기존의 length 속성은 2바이트 문자를 한글자로 간주합니다)
 */
 String.prototype.getBytesLength = function() {
         var str = this;
         var l = 0;
         for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
         return l;
 }

/**
 * password validation 
 * 
 * @param val
 * @returns {Boolean}
 */
function validatePassword (pw, options) {
	// default options (allows any password)
	var o = {
		lower:    0,
		upper:    0,
		alpha:    0, /* lower + upper */
		numeric:  0,
		special:  0,
		length:   [0, Infinity],
		custom:   [ /* regexes and/or functions */ ],
		badWords: [],
		badSequenceLength: 0,
		noQwertySequences: false,
		noSequential:      false
	};

	for (var property in options)
		o[property] = options[property];

	var	re = {
			lower:   /[a-z]/g,
			upper:   /[A-Z]/g,
			alpha:   /[A-Z]/gi,
			numeric: /[0-9]/g,
			special: /[\W_]/g
		},
		rule, i;

	// enforce min/max length
	if (pw.length < o.length[0] || pw.length > o.length[1]){
		alert("비밀번호는 8자리 이상입니다.");
		return false;
	}

	// enforce lower/upper/alpha/numeric/special rules
	for (rule in re) {
		if ((pw.match(re[rule]) || []).length < o[rule]){
			alert("비밀번호는 영문자, 숫자, 특수문자 조합으로 사용가능합니다.");
			return false;
		}
	}

	// enforce word ban (case insensitive)
	for (i = 0; i < o.badWords.length; i++) {
		if (pw.toLowerCase().indexOf(o.badWords[i].toLowerCase()) > -1){
			alert("비밀번호에 아이디가 포함되어 있습니다.");
			return false;
		}
	}

	// enforce the no sequential, identical characters rule
	if (o.noSequential && /([\S\s])\1\1\1/.test(pw)){
		alert("비밀번호에 4자 이상의 반복 문자 및 숫자를 사용할 수 없습니다.");
		return false;
	}

	// enforce alphanumeric/qwerty sequence ban rules
	if (o.badSequenceLength) {
		var	lower   = "abcdefghijklmnopqrstuvwxyz",
			upper   = lower.toUpperCase(),
			numbers = "0123456789",
			qwerty  = "qwertyuiopasdfghjklzxcvbnm",
			start   = o.badSequenceLength - 1,
			seq     = "_" + pw.slice(0, start);
		for (i = start; i < pw.length; i++) {
			seq = seq.slice(1) + pw.charAt(i);
			if (
				lower.indexOf(seq)   > -1 ||
				upper.indexOf(seq)   > -1 ||
				numbers.indexOf(seq) > -1 ||
				(o.noQwertySequences && qwerty.indexOf(seq) > -1)
			) {
				alert("비밀번호에 4자 이상의 연속 문자 및 숫자를 사용할 수 없습니다.");
				return false;
			}
		}
	}

	// enforce custom regex/function rules
	for (i = 0; i < o.custom.length; i++) {
		rule = o.custom[i];
		if (rule instanceof RegExp) {
			if (!rule.test(pw))
				return false;
		} else if (rule instanceof Function) {
			if (!rule(pw))
				return false;
		}
	}

	// great success!
	return true;
}


/**
 * @type Javascript Function
 * @Desc 입력된 Html 태그를 제거한 뒤 String반환
 * 
 * @param String
 * @returns String
 */
function removeTag(input) {
	//console.log("**********************************************************");
	//console.log("<Input String>");
	//console.log("**********************************************************");
	//console.log(input);
	//console.log("**********************************************************");
	var result = "";
	// 1. 문자 제거 (개행문자 & tab문자)
	result = input.replace(new RegExp("\n|\r|\t", "gi"),"");
	// 2. 공백문자 변환
	result = result.replace(new RegExp("&nbsp;", "gi"),"");
	// 3. script Tag 제거
	result = result.replace(new RegExp("<\s*\w*\s*script.*?>(.*?)<\s*\w*\s*/script.*?>","gi"),"");
	// 4. title Tag 제거
	result = result.replace(new RegExp("<\s*\w*\s*title.*?>(.*?)<\s*\w*\s*/title.*?>","gi"),"");
	// 5. style Tag 제거
	result = result.replace(new RegExp("<\s*\w*\s*style.*?>(.*?)<\s*\w*\s*/style.*?>","gi"),"");
	// 6. form Tag 제거
	result = result.replace(new RegExp("<\s*\w*\s*form.*?>(.*?)<\s*\w*\s*/form.*?>","gi"),"");
	// 7. input Tag 제거
	result = result.replace(new RegExp("<\s*\w*\s*input.*?[>|/>]","gi"),"");
	// 8. div Tag 제거 
	result = result.replace(new RegExp("<\s*\w*\s*div.*?>(.*?)<\s*\w*\s*/div.*?>","gi"),"");
	// 9. 주석 제거
	result = result.replace(new RegExp("<!--[^>](.*?)-->","gi"),"");
	// 10. img Tag 제거
	result = result.replace(new RegExp("<\s*\w*\s*img.*?[>|/>]","gi"),"");
	//console.log("**********************************************************");
	//console.log("<Result String>");
	//console.log("**********************************************************");
	//console.log(result);
	//console.log("**********************************************************");
	return result;
}


/**
 * @type Javascript Function
 * @Desc String을 자리수에 맞추어 입력된 addChar로 채워 String반환
 * 
 * @param String
 * @returns String
 */
function digits(input, cnt, addChar) { 
	var digit = "";
	if (input.length < cnt) {
		for(var i = 0; i < cnt - input.length; i++) {
			digit += addChar;
		}
	}
	return digit + input;
}



if(window.console==undefined){console={log:function(){}};}

function vaildPasswd(pwd, id) {
	
	var option = {
			length:   [8, 16],
			lower:    0,
			upper:    0,
			numeric:  1,
			special:  1,
			badWords: [id],
			badSequenceLength: 4,
			noSequential : true
		};
	
	return validatePassword (pwd, option);
}

//한글 길이 체크
function getObjectLength(obj) {
   var p, len=0;  // 한글문자열 체크를 위함
   for(p=0; p< obj.length; p++)
   {
    (obj.charCodeAt(p)  > 255) ? len+=2 : len++;  // 한글체크
   }
    return len;
 }


function getDateTimeFormat(date) {
	var result = "";
	
	var orgDt = new Date(date);
	var curDt = new Date();
	
	var orgDtStr = orgDt.format("yyyyMMdd");
	var curDtStr = curDt.format("yyyyMMdd");
		
	if (orgDtStr == curDtStr) {
		result = orgDt.format("a/p hh:mm");    			
	} else if (orgDtStr.substring(0, 4) == curDtStr.substring(0, 4)) {
		result = orgDt.format("MM월 dd일");
	} else {
		result = orgDt.format("yyyy년 MM월 dd일");
	}
		
	return result;
}

/**
 * 숫자 여부 판단
 * @returns {Boolean}
 */
function isNumber(value){
	if(value == null || value == '') return true;
	
	if(/[^0123456789]/g.test(value)) {
		//alert("숫자가 아닙니다.");
		return false;
	}
	return true;
}

/**
 * 널, 공백 여부 체크
 * @param value
 * @returns {Boolean}
 */
function isNull(value){
	value = value+'';
	if(value == null || value.trim() == '' || value.trim() == 'null' || value.trim() == 'undefined'){
		return true;
	}
	
	return false;
}

/**
 * 복사하기
 * @param value
 */
function copy(value){
	window.clipboardData.setData("Text", value);
}

String.prototype.replaceAll = function(oldStr, newStr) {
	var str = this;
    var i    = 0;
    var rStr = "";
    
    while(str.indexOf(oldStr) > -1) {
            i     = str.indexOf(oldStr);
            rStr += str.substring(0,i) + newStr;     
            str   = str.substring(i + oldStr.length);
    }
    return rStr+str;
}

/**
 * console.log 오류방지
 */
var console = window.console || { log: function() {} };


/**
 * check if string is null or empty
 */
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}


/**
 * 한글여부 체크
 * @param str
 * @returns {Boolean}
 */
function isHangul(str){
	if(isNull(str)) return false;
	
	for (var i = 0; i < str.length; i++){
		var retCode = str.charCodeAt(i);
		var retChar = str.substr(i,1).toUpperCase();
		retCode = parseInt(retCode);
		
		if((retChar < "0" || retChar > "9") && (retChar < "A" || retChar > "Z") && (retCode > 255 || retCode < 0)){
			return true
		}
	}
	return false;
}


/**
 * 날짜차이 계산함수
 * @param date1
 * @param date2
 * @returns
 */
function getDateDiff(date1,date2)
{
    var arrDate1 = date1.split(".");
    var getDate1 = new Date(parseInt(arrDate1[0]),parseInt(arrDate1[1])-1,parseInt(arrDate1[2]));
    var arrDate2 = date2.split(".");
    var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));
    
    var getDiffTime = getDate1.getTime() - getDate2.getTime();
    
    return Math.floor(getDiffTime / (1000 * 60 * 60 * 24));
}


var ONE_DAY = 1000 * 60 * 60 *24;

function datesBetweenStr(date1, date2) {
	return datesBetween(new Date(date1), new Date(date2));
}

function datesBetween(date1, date2) {
	
	var days = Math.ceil( (date2.getTime() - date1.getTime()) / ONE_DAY);
	return days;
}

/**
 * 시작일, 종료일 확인
 * 날짜 check 실패시 true, 성공시 false
 * @param startDate
 * @param endDate
 */
function checkDate(startDate,endDate){
	var tmpStart = startDate.val();
	var tmpEnd = endDate.val();
	if(isNull(tmpStart)) tmpStart = startDate.html();
	if(isNull(tmpEnd)) tmpEnd = endDate.html();
	
	if(isNull(tmpStart)){
		// 공지사항은 시작일을 입력하지 않을 수있다.
		//alert('시작일을 입력해 주세요.');
		return false;
	}
	
	if(isNull(tmpEnd)){
		//공지사항은 종료일을 입력하지 않을 수있다.
		//alert('종료일을 입력해 주세요.');
		return false;
	}
	
	if(Math.abs(tmpStart.replaceAll('.','')) > Math.abs(tmpEnd.replaceAll('.',''))){
		alert('시작일이 종료일보다 큽니다.'); 
		return true;
	}
	
	return false;
}

/**
 * popup 위치 설정
 * @param width
 * @param height
 * @returns {String}
 */
function getPopupLocation(width, height){
	var popWidth = width, popHeight = height; //팝업 창 사이즈
	 
	var mtWidth = document.body.clientWidth; //현재 브라우저가 있는 모니터의 화면 폭 사이즈
	var mtHeight = document.body.clientHeight; //현재 브라우저가 있는 모니터의 화면 높이 사이즈
	var scX = window.screenLeft; //현재 브라우저의 x 좌표(모니터 두 대를 합한 총 위치 기준)
	var scY = window.screenTop; //현재 브라우저의 y 좌표(모니터 두 대를 합한 총 위치 기준)
	 
	var winPosLeft = scX + (mtWidth - popWidth) / 2 - 50; //팝업 창을 띄울 x 위치 지정(모니터 두 대를 합한 총 위치 기준)
	var winPosTop = scY + (mtHeight - popHeight) / 2 - 50; //팝업 창을 띄울 y 위치 지정(모니터 두 대를 합한 총 위치 기준)
	
	return "width=" + width +",height="+height+",top="+winPosTop+",left="+winPosLeft;
}

/**
 * offset만큼 달을 이동하여 날짜를 리턴.
 */
function getDateString(offset){
	var dt = new Date();
	if(offset != null)
		dt.setMonth(dt.getMonth()-offset);
	
	return dt.getFullYear() + "." + addZero(eval(dt.getMonth()+1)) + "." + addZero(dt.getDate());
}
function addZero(i){
	var rtn = i + 100;
	return rtn.toString().substring(1,3);
}

/**
 * json Date를 String으로 변경
 * @param jsonDate
 * @returns
 */
function parseJsonDate(jsonDate) {
	var jsonDateString = jsonDate.time + '';
	var date = new Date(parseInt(jsonDateString));
	return date.format('yyyy-MM-dd hh:mm:ss');
}

function checkEmail(email){
    /* 체크사항
    - @가 2개이상일 경우
    - .이 붙어서 나오는 경우
    - @.나 .@이 존재하는 경우
    - 맨처음이 .인 경우
    - @이전에 하나이상의 문자가 있어야 함
    - @가 하나있어야 함
    - Domain명에 .이 하나 이상 있어야 함
    - Domain명의 마지막 문자는 영문자 2~4개이어야 함
     */
    var check1 = /(@.*@) | (\.\.) | (@\.) | (\.@) | (^\.)/;
    var check2 = /^[a-zA -Z0 -9\ -\.\_]+\@[a -zA -Z0 -9\ -\.]+\.([a -zA -Z]{2,4})$/;
    if (!check1.test(email) && check2.test(email)) {
    	return true;
    } else {
    	alert('E-mail을 정확하게 입력해 주세요.');
    	return false;
    }
}

function checkTel(value){
	if(value == null || value == '') return true;
	
	var check = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
	var regTel = /^(01[016789]{1}|070|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/;
	
	if(!check.test(value)) {
		//alert("숫자가 아닙니다.");
		return false;
	}else if(!regTel.test(value)){
		return false;
	}
	
	return true;
}

/**
 * 날짜 포맷 변경
 * @param dt
 * @returns {String}
 */
function converDateString(dt, gubun){
	return dt.getFullYear() + gubun + addZero(eval(dt.getMonth()+1)) + gubun + addZero(dt.getDate());	
}


/*
 * 쿠키값 설정
 * @param name 쿠키이름
 * @param value 쿠키값
 * @param expire 쿠키 유효기간
 */
function setCookie(name, value, expire) { 
	document.cookie = name + "=" + escape(value) + ((expire == null) ? "" : ("; path=/; expires=" + expire.toGMTString())); 
}

/*
 * 쿠키값 추출
 * @param cookieName 쿠키명
 */
function getCookie( cookieName ){
	var search = cookieName + "=";
	var cookie = document.cookie;

	// 현재 쿠키가 존재할 경우
	if( cookie.length > 0 ){
		// 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴.
		startIndex = cookie.indexOf( cookieName );

		// 만약 존재한다면
		if( startIndex != -1 ){
			// 값을 얻어내기 위해 시작 인덱스 조절
			startIndex += cookieName.length;

			// 값을 얻어내기 위해 종료 인덱스 추출
			endIndex = cookie.indexOf( ";", startIndex );

			// 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정
			if( endIndex == -1) endIndex = cookie.length;

			// 쿠키값을 추출하여 리턴
			return unescape( cookie.substring( startIndex + 1, endIndex ) );
		}else{
			// 쿠키 내에 해당 쿠키가 존재하지 않을 경우
			return false;
		}
	}else{
		// 쿠키 자체가 없을 경우
		return false;
	}
}

/**
 * 길이체크
 */
function checkLength (name, title, maxLength){ 

	var str = $(name).val();
	var length = str.length;
	
	if(length > maxLength){
		 alert(title + "은(는) " + maxLength + "자 이내로 작성해주세요.");
	 $(name).focus();
	 return true;
	}else{
		  return false;
	}
}

/**
 * 날짜 유효성 체크
 */
function checkDateFormat(date){
	var df = /[0-9]{4}[0-9]{2}[0-9]{2}/;
	var checkdate = true;
	if(date.match(df)!=null){
		checkdate = false;
	}
	return checkdate;
}

/**
 * input 박스 숫자만 입력 체크
 * @param e
 * @returns
 */
function inputNumkeyCheck(e) {
    var keyValue = event.keyCode;
    //console.log("key == " +keyValue);
    if( ((keyValue >= 48) && (keyValue <= 57)) ){
    	return true;
    }else{
    	return false;
    }
  }

/**
 * 현재 년도를 가져온다.
 * @param date
 * @returns
 */
function getDateYear() {

	var curDt = new Date();
	var curDtStr = curDt.format("yyyy");
		
	return curDtStr;
}

/**
 * 이름 마스킹 처리
 * @param strName
 * @returns
 */
function getNameMasking(strName){
	var result;
	
	if(isNull(strName)) {
		result='';
    }else{
    	
    	if(strName.length == 2){
    		var pattern = /.$/;
    		result =  strName.replace(pattern, "*");
    	}else{
    		 var temp = "";
             for (var na = 0; na < strName.length - 2; na++)
             {
                 temp += "*";
             }
             result = strName.substring(0, 1) + temp + strName.substring((strName.length)-1);
    	}
    }
    return result;
}

/**
 * 전화번호 마스킹 처리
 * @param strTel
 * @returns
 */
function getTelMasking(strTel){
	var result;
	
	if(isNull(strTel)) {
		result='';
    }else{
    	if(strTel.length == 12){
    		result = strTel.substring(0,4)+"***"+strTel.substring(7,12);    		
    	}else if(strTel.length == 13){
    		result = strTel.substring(0,4)+"****"+strTel.substring(8,13);  
    	}else{
    		result = "****";
    	}
    }
	
	return result;
}

/**
 * 이메일 마스킹 처리
 * @param strTel
 * @returns
 */
function getEmailMasking(strEmail){
	var result;
	
	if(isNull(strEmail)) {
		result='';
    }else{
    	
    	var email = strEmail.split('@');
    	
    	if(email.length == 2){
    		if(email[0].length == 1){ //@ 앞에 아이디 없을 경우
        		result = "*"+strEmail.substring(1,strName.length);
        	}else if(email[0].length == 2){
        		result = email[0].substring(0,1)+"*@"+email[1];
        	}else{
        		result = email[0].substring(0,email[0].length-2)+"**@"+email[1];
        	}
    	}else{
    		result = '';
    	}
    }
	
	return result;
}

/**
 * 글자 byte 체크
 * @param obj
 * @param maxByte
 * @returns
 */
function fnChkByte(obj, maxByte){
	var str = obj.value;
	var str_len = str.length;
	
	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";
	
	for(var i=0; i<str_len; i++){
	one_char = str.charAt(i);
	if(escape(one_char).length > 4){
	    rbyte += 2;                                         //한글2Byte
	}else{
	    rbyte++;                                            //영문 등 나머지 1Byte
	}
	
	if(rbyte <= maxByte){
	    rlen = i+1;                                          //return할 문자열 갯수
	}
	}
	
	if(rbyte > maxByte){
	    alert("한글 "+(maxByte/2)+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다.");
	    str2 = str.substr(0,rlen);                                  //문자열 자르기
	    obj.value = str2;
	    fnChkByte(obj, maxByte);
	}else{
	    document.getElementById('byteInfo').innerText = rbyte;
	}
}

function jsJsonToFormData(json) {

	var formdata = new FormData();
	var keys = Object.keys(json)

	for (var n = 0; n < keys.length; n++) {
		formdata.append(keys[n], json[keys[n]]);
	}
	return formdata;
}


/************************* [S] fanpageCommon.js 내용 **********************************************************************************/
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

// 달력 등록. ChoiTH
function fnAddCalendar() {
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_팬페이지", "캘린더", movieGroupTitle);
	}else{
		fnSendGALog("1", "", "MW_팬페이지", "캘린더", movieGroupTitle);
	}
    
    var sOpenData = $("#openDateString").text();
	sOpenData = sOpenData.split(" ");
	sOpenData = sOpenData[0];
    
    if(IsWebView_Master){
    	CGVHAAppInterface.AddToCalendar(movieGroupTitle, sOpenData, window.document.location.href);
    }
}

// 공유하기. ChoiTH
function fnShareContents(cont, idx, movieIdx, $obj){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_팬페이지", "공유하기", movieGroupTitle);
	}else{
		fnSendGALog("1", "", "MW_팬페이지", "공유하기", movieGroupTitle);
	}
	// 수정 Son.HW
	var url = ""
	if(idx == undefined){
		url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx;
	} else{
		url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&morderReturnUrl=" + encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "_contentsIdx=" + idx);
	}
	
	if(idx == undefined){
		addUrl = window.document.location.href;
	} else{
		addUrl = "contentsDetail?movieIdx=" + movieIdx + "&contentsIdx=" + idx;
	}
	var url = gateURL + "Fanpage/Gateway.aspx?movieIdx="+strMovieIdx+"&morderReturnUrl="+ encodeURIComponent(addUrl);
	//var url = "http://devm.cgv.co.kr:8083/WebApp/Fanpage/Gateway.aspx?movieIdx="+strMovieIdx+"&morderReturnUrl="+window.document.location.href;
	$.ajax({
		method : "post",
		url : "/morder/shortURL",
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
	
	// 팬페이지 공유하기일 경우
	if(cont == undefined || cont == ''){
		cont = movieGroupTitle;
	// 팬페이지 컨텐츠 공유하기일 경우
	}else{
		cont = cont.length > 20 ? cont.substr(0, 20) + "..." : cont;
		backgroundUrl = "";
		synopsis = "";
	}
	
	var stickerUrl = ""
	if(IsWebView_Master){
		// 4.5.9ver 신규 공유하기 기능 추가
		if(AppVersion_Master >= 459){
			stickerUrl = "http://img.cgv.co.kr/WebApp/images/common/cgv_logo_w.png";
			// 시놉시스 설정
			var synop = "";
			if(synopsis == undefined || synopsis == ''){
				synop = cont;
			} else {
				synop = synopsis;
			}
			
			if(backgroundUrl == ''){
				if($('.cover_img').eq(0).find('img').attr('src') == undefined && $('.video_box video').attr('poster') == undefined){
					backgroundUrl = "";
				} else if($('.cover_img').eq(0).find('img').attr('src') != undefined){
					backgroundUrl = $('.cover_img').eq(0).find('img').attr('src');
				} else {
					backgroundUrl = $('.video_box video').attr('poster');
				}
			}
			CGVHAAppInterface.SendAppShareData(strMovieIdx, movieGroupTitle, synop, url, backgroundUrl, stickerUrl, 'movie');
		} else {
			CGVHAAppInterface.FanPageRequestSystemShare(strMovieIdx, cont, url);
		}
		
		//CGVHAAppInterface.FanPageRequestSystemShare(strMovieIdx, cont, url);
	} 
} 

// 트레일러 동영상 재생. ChoiTH
function fnPlayTrailer(mUrl){
	if(AppVersion_Master >= 448){
		fnSendGALog("1", "", "MA_팬페이지", "영화정보_트레일러", movieGroupTitle);
	}else{
		fnSendGALog("1", "", "MW_팬페이지", "영화정보_트레일러", movieGroupTitle);
	}
	/*
    if(IsWebView_Master){
        if(AppVersion_Master >= 402){
            //CGVHAAppInterface.OpenMoviePlayer(encodeURIComponent(mUrl));
        	CGVHAAppInterface.OutLink(mUrl, 0);
        }else{
            location.href = mUrl;
        }
    }else{
        location.href = mUrl;
	}*/
 // Update iOS 4.5.5버전 분기처리 관련
    if(IsWebView_Master){
    	if(AppVersion_Master > 454){
    		CGVHAAppInterface.OpenMoviePlayer_455(encodeURIComponent(mUrl));
    	} else {
    		CGVHAAppInterface.OpenMoviePlayer(encodeURIComponent(mUrl));
    	}
    } else {
    	location.href = mUrl;
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
	if(strMovieIdx == 81589 && dragonChk == false){
		
		if( !confirm("선택하신 영화는 드래곤 길들이기 1편입니다.") ){
			var $layer = jQuery('#reserveLayerPop');
			dragonChk = false;
			$layer.hide();
			return;
		} else {
			dragonChk = true;
		}
	}
	
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

            CGVHAAppInterface.ReserveFromMovieInfoV4(mgCD, encodeURIComponent(movTitle), rateCode, rKind);
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
    		CGVHAAppInterface.ReserveFromMovieInfoV4(mgCD, encodeURIComponent(movTitle), rateCode, rKind);
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
                        CGVHAAppInterface.ReserveFromMovieInfoV4(mgCD, encodeURIComponent(movTitle), rateCode, rKind);
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
                            CGVHAAppInterface.ReserveFromMovieInfoV4(mgCD, encodeURIComponent(movTitle), rateCode, rKind);
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
    	CGVHAAppInterface.OutLink(url, type);
    }else{
        location.href = url;
    }
}

//이벤트 링크 연결. 
function eventLink(type, url){
    if(IsWebView_Master){
    	CGVHAAppInterface.EventBannerCall(type, encodeURIComponent(url));
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
	
	location.href = gateURL + memberPath + "/Login.aspx?RedirectUrl=" + gateURL + "MobileOrder/Gateway.aspx?cType=normal&mOrderReturnUrl="+reUrl;
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
	// 영화정보탭 기본노출 시
	//fnTabMenu(iTab);
}

// 팬페이지 볼래요 기능. ChoiTH
function fnMainOpt(kind, $obj){
	if(!IsLogin){
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			fnMoveLoginPage();
			return;
        }
	}else{
		var wishFlag = $('#wishFlag').attr('data-src');
		
		if(wishFlag == 'off'){
			if(AppVersion_Master >= 448){
				fnSendGALog("1", "", "MA_팬페이지", "볼래요", movieGroupTitle);
			}else{
				fnSendGALog("1", "", "MW_팬페이지", "볼래요", movieGroupTitle);
			}
			// 볼래요 카운팅 수
			var cnt = $obj.find("span").text().trim();
			$.ajax({
				method: "post",
				url: "/morder/mainOpt",
				dataType: "json",
				data: {optKind:kind, movieIdx:strMovieIdx, seqWish:seqWish},
				success: function(result){
					
					if(result.result_code == "success"){
						if(kind == "FG"){
							if(result.resultCd == "0"){
								
								$obj.parent("li").addClass("on");
								$('.moment_alert.see').fadeIn().delay(1000).fadeOut();
								if(cnt.indexOf("만") == -1 ){
									if(cnt == "볼래요" ){
										//$obj.find("span").text('1');
									} else if(cnt == '9,999'){
										$obj.find("span").text('1.0만');
									} else {
										var cnt2 = cnt.replace(',', '');
										cnt2++;
										cnt2 = cnt2 + "";
										if(cnt2.length == 4){
											cnt2 = cnt2.substr(0, 1) + "," + cnt2.substr(1, 4);
										}
										$obj.find("span").text(cnt2);
									}
								}
								
								// 무비로그 동기화, APP 버전 체크 
								if(IsWebView_Master){
									if(AppVersion_Master >= 417){
										CGVHAAppInterface.MovieLogRefresh(strMovieIdx, "Y", result.seqWish);
										
										/*
			                            //무비로그 이동 컨펌
			                            if(confirm("'위시리스트'에 등록되었습니다.\n상영예정작일 경우 개봉일 하루 전\n알림메시지가 발송됩니다.\n\n지금 위시리스트로 이동하시겠습니까?")){
			                            	CGVHAAppInterface.MoveWishList();
			                                window.location.reload();
			                            }
										 */
									}else{
										/*
			                            alert("'위시리스트'에 추가되었습니다.\n(위시리스트는 CGV앱과 홈페이지의 무비로그에서 확인이 가능합니다!)");
										 */
									}
								}
								$('#wishFlag').attr('data-src', 'on')
								
							}
						}
					}
					
				},
				error: function(){
					alert('처리 중 에러가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
				}
			});
		} else {
			$('.opt_layer.see').addClass("on");
		}
		
	}
}

//볼래요 해제 Onclick 이벤트
function wishDisable(){
	$obj = $('#wishFlag').find('a');
	var kind = "FG";
	$.ajax({
		method: "post",
		url: "/morder/mainOpt",
		dataType: "json",
		data: {optKind:kind, movieIdx:strMovieIdx, seqWish:seqWish},
		success: function(result){
			if(result.result_code == "success"){
				if(result.resultCd == "0"){
					
				} else {
					$obj.parent("li").removeClass("on");
					var cnt = $obj.find("span").text().trim();
					if(cnt.indexOf("만") == -1){
						if(cnt == '1'){
							$obj.find("span").text('볼래요');
						} else if(cnt == '9,999'){
							$obj.find("span").text(cnt);
						} else if(cnt == '볼래요'){
							
						} else {
							var cnt2 = $obj.find("span").text();
							cnt2 = cnt2.replace(',', '');
							cnt2--;
							cnt2 = cnt2 + "";
							if(cnt2.length == 4){
								cnt2 = cnt2.substr(0, 1) + "," + cnt2.substr(1, 4);
							}
							$obj.find("span").text(cnt2);
						}
					}
					
					// 무비로그 동기화
					if(IsWebView_Master){
						CGVHAAppInterface.MovieLogRefresh(strMovieIdx, "N", "");
					}
					$('#wishFlag').attr('data-src', 'off');
					$('.opt_layer.see').removeClass("on");
				}
			}
		},
		error: function(){
			location.reload();
		}
	});
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

// 관련소식 컨텐츠 옵션 기능. ChoiTH
// TG : 좋아요     TS : 공유하기
function fnContentsOpt(kind, idx, $obj, contTxt){
	if(AppVersion_Master >= 448){
		if(kind == "TG"){
			fnSendGALog("1", "", "MA_팬페이지", "관련소식_좋아요", movieGroupTitle+"/"+contTxt.substr(0,20));
		}else if(kind == "TS"){
			fnSendGALog("1", "", "MA_팬페이지", "관련소식_공유하기", movieGroupTitle+"/"+contTxt.substr(0,20));
		}
	}else{
		if(kind == "TG"){
			fnSendGALog("1", "", "MW_팬페이지", "관련소식_좋아요", movieGroupTitle+"/"+contTxt.substr(0,20));
		}else if(kind == "TS"){
			fnSendGALog("1", "", "MW_팬페이지", "관련소식_공유하기", movieGroupTitle+"/"+contTxt.substr(0,20));
		}
	}
	
	if(kind == "TS"){
		$.ajax({
			method: "post",
			url: "/morder/contentsOpt",
			dataType: "json",
			data: {optKind:kind, movieIdx:strMovieIdx, contentsIdx:idx},
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
					fnShareContents(contTxt, idx, strMovieIdx, $(this));
				} else{
					fnShare_Web(idx, contTxt);
				}
			},
			error: function(){
				var url_chk = window.document.location.href;
				// 컨텐츠 상세일 경우 상세페이지로 이동
				if(url_chk.indexOf('contentsDetail') > -1){
					location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&morderReturnUrl="
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
				url: "/morder/contentsOpt",
				dataType: "json",
				data: {optKind:kind, movieIdx:strMovieIdx, contentsIdx:idx},
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
						location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&morderReturnUrl="
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
			url: "/morder/commentOpt",
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
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&morderReturnUrl="
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
			url: "/morder/replyOpt",
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
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&morderReturnUrl="
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
			url: "/morder/delContentsComment",
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
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&morderReturnUrl="
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
			url: "/morder/delContentsComment",
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
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&morderReturnUrl="
				+ encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "&contentsIdx=" + window.document.location.href.split('contentsIdx=')[1]);
			}
	    });
	}
}


// 관련소식 컨텐츠 동영상 3초/10초 이상 재생시 아이템 재생수 증가. ChoiTH
function fnContentsVideoCnt(timeKind, cIdx, iIdx){
	$.ajax({
		method: "post",
		url: "/morder/contentsVideoOpt",
		dataType: "json",
		data: {optKind:timeKind, movieIdx:strMovieIdx, contentsIdx:cIdx, itemIdx:iIdx},
		success: function(result){
			
		},
		error: function(){
			/*var url_chk = window.document.location.href;
			// 컨텐츠 상세일 경우 상세페이지로 이동
			if(url_chk.indexOf('contentsDetail') > -1){
				location.href = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&morderReturnUrl="
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
	if(morderMember == "Member"){
		
		$.ajax({
			method: "post",
			url: "/morder/contentsVideoOpt",
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


// 누적관람객/당일관람객 도움말 알람. ChoiTH
function fnAlarmReferenceDate(rDate, cgvDate){
	if(rDate == ""){
		alert("CGV당일관객은\nCGV 실시간 관람객수 기준입니다.\n("+cgvDate+":00기준)");
	}else if(cgvDate == ""){
		alert("누적관객/전일관객은\n영화진흥위원회에서 제공하는\n영화입장권 통합 전산망 기준입니다.\n("+rDate+"기준)");
	}else{
		alert("누적관객/전일관객은\n영화진흥위원회에서 제공하는\n영화입장권 통합 전산망 기준입니다.\n("+rDate+"기준)\n\nCGV당일관객은\nCGV 실시간 관람객수 기준입니다.\n("+cgvDate+":00기준)");
	}
}

// 트레일러 시간 표기. ChoiTH
function fnShowTrailerTime(){
	var videoTime, hours, minutes, seconds;
	var $itemVideos = $("div.movie_trailer").find("video");
	
	for(var i = 0; i <= $itemVideos.length - 1; i++) {
		videoTime = parseInt($itemVideos.get(i).duration, 10);
		
		if(videoTime > 0){
			hours   = Math.floor(videoTime / 3600);
			minutes = Math.floor((videoTime - (hours * 3600)) / 60);
		    seconds = videoTime - (hours * 3600) - (minutes * 60);
		    
		    $itemVideos.siblings("div.etc").find("span.time").eq(i).text( minutes+":"+seconds );
		}
	}
}

// 메인 포스터 & 관련소식 컨텐츠 이미지 다운로드. ChoiTH
function fnDownloadImage(url){
	//if(IsWebView_Master){
		CGVHAAppInterface.PosterDownload(url, "1");
	//}
}

// 모바일웹 공유하기 창 오픈. SonHW
function fnShare_Web(idx, contTxt){
	if(!IsWebView_Master){
		$('.dimlaypop_wrap').addClass("on");
		if(idx != "" || idx != undefined){
			$('.dimlaypop_wrap').attr('data-src', idx);
		}
		if(contTxt != "" || contTxt != undefined){
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
	Kakao.Link.cleanup();
}

// 모바일웹 공유하기 (페이스북). SonHW
function fnShare_FaceBook(url, title){
	var data = $('.dimlaypop_wrap').attr('data-src');
	var cont = $('.dimlaypop_wrap').attr('cont-src');
	
	if( data == "" || data == undefined){
		if(url == "" || url == undefined){
			url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx;
		} 
	} else {
		url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&morderReturnUrl=" + encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "_contentsIdx=" + data);
	}
	
	//title = encodeURIComponent(title);
	
	var userId = "";
	$.ajax({
		method : "post",
		url : "/morder/shortURL",
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
	
	if( data == "" || data == undefined){
		if(url == "" || url == undefined){
			url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx;
		} 
	} else {
		url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&morderReturnUrl=" + encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "_contentsIdx=" + data);
	}
	
	//title = encodeURIComponent(title);
	
	var userId = "";
	$.ajax({
		method : "post",
		url : "/morder/shortURL",
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
function fnSendTalkLinkFull(url, title, img_url){
	var filter = "win16|win32|win64|mac";
	
	var data = $('.dimlaypop_wrap').attr('data-src');
	var cont = $('.dimlaypop_wrap').attr('cont-src');
	
	if( data == "" || data == undefined){
		if(url == "" || url == undefined){
			url = gateURL + "MovieV4/movieDetail.aspx?MovieIdx=" + strMovieIdx;
		} 
	} else {
		url = gateURL + "Fanpage/Gateway.aspx?movieIdx=" + strMovieIdx + "&morderReturnUrl=" + encodeURIComponent("contentsDetail?movieIdx=" + strMovieIdx + "_contentsIdx=" + data);
	}
	
	if( img_url == "" || img_url == undefined){
		addImgUrl = strMovieIdx;
		img_url = "http://img.cgv.co.kr/Movie/Thumbnail/Poster/0000"+addImgUrl.substr(0,2)+ "/"+addImgUrl + "/" + addImgUrl + "_1000.jpg";	
	}
	
	if(strContentsIdx != "" && strContentsIdx != undefined){
		cont = $('.reptxt').text().substr(0,20);
	} 

	if( title == "" || title == undefined){
		title = movieGroupTitle;
	}



	
	Kakao.init('0e745a30fbfe741f78ed701c9bad3ac8');
	Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: title,
            description: cont,
            imageUrl: img_url,
            imageWidth: 800,
            imageHeight: 800,
            link: {
                mobileWebUrl: url,
                webUrl: url
            }
        }
    });
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

/************************* [E] fanpageCommon.js 내용 **********************************************************************************/

/**
 * 극장선택팝업 메인
 */
var g_latitude  = 0;
var g_longitude = 0;
var CGVMorderTheather = function() {
	
	var latitude  = 0; //위도
	var longitude = 0; //경도
	var callBackFnc;   //사용자CallBackFunction
	var flag = "G";    //경로별 극장선택팝업구분자: 'G':일반, 'P':상품, 'E':기타 아직개발안되었음.
	
	var setLatitude = function(latitude) {
		this.latitude = latitude;
	}
	var setLongitude = function(longitude) {
		this.longitude = longitude;
	}
	var getLatitude = function() {
		return this.latitude;
	}
	var getLongitude = function() {
		return this.longitude;
	}
	var _setCallBackFnc = function(_callBackFnc) {
		this.callBackFnc = _callBackFnc;
	}
	var _getCallBackFnc = function() {
		return this.callBackFnc;
	}
	var _setFlag = function(_flag) {
		this.flag = _flag;
	}
	var _getFlag = function() {
		return this.flag;
	}
	
	return {
		//극장정보조회
		//극장선택팝업 오픈
		popupLayerTheatherSelect : function(_callBackFnc, _flag) {
			_setCallBackFnc(_callBackFnc);
			_setFlag(_flag);
			if(IsWebView_Master == true) {
				CGVHAAppInterface.RequestCurrentLocation();
				var loc = CGVMorderLocation.getLocationInfo();
				var clatitude  = 0;
				var clongitude = 0;
				if(typeof loc !== 'undefined') {
					clatitude  = loc.clatitude ; //위도
					clongitude = loc.clongitude; //경도
				}
				
				var params = { latitude:0 ,longitude:0 }
				try {
					if( clatitude != null && typeof clatitude !== 'undefined'  
						&& clongitude != null && typeof clongitude !== 'undefined' ) {
						setLatitude (clatitude);	//위도
						setLongitude(clongitude); //경도
						params = { latitude:clatitude ,longitude:clongitude }
					} else {
						setLatitude (0); //위도
						setLongitude(0); //경도
						params = { latitude:0 ,longitude:0 }
					}
				} catch (e) {
					setLatitude (0); //위도
					setLongitude(0); //경도
					params = { latitude:0 ,longitude:0 }
				}
				
				$("#popupTheather").load(_contextPath+"/common/getTheaterSelect", params, function(d){
					popOpenFunc('popupTheather');
				});
				
			} else {
				/* 위치정보 호출 코드 제거*/
				/*
				if (navigator.geolocation) {
					console.log("노차단!!!", navigator.geolocation);
					try {
						navigator.geolocation.getCurrentPosition(this.popupLayerTheatherSelectCallBack,this.popupLayerTheatherSelectCallBack);
					} catch (e) {
						alert("error:"+e);
					}
			    } else {
			        //error('미지원');
			    	this.popupLayerTheatherSelectCallBack();
			    }
			    */
			}
		},
		//극장선택팝업오픈 - CallBackFnc
		popupLayerTheatherSelectCallBack : function(position) {
			var params = { latitude:0 ,longitude:0 }
			try {
				if( position != null && typeof position !== 'undefined'  
				    && position.coords != null && typeof position.coords !== 'undefined' ) {
					setLatitude (position.coords.latitude);	//위도
					setLongitude(position.coords.longitude); //경도
					params = { latitude:position.coords.latitude ,longitude:position.coords.longitude }
				} else {
					setLatitude (0); //위도
					setLongitude(0); //경도
					params = { latitude:0 ,longitude:0 }
				}
			} catch (e) {
				setLatitude (0); //위도
				setLongitude(0); //경도
				params = { latitude:0 ,longitude:0 }
			}
			
			console.log("params:", params);
			
			$("#popupTheather").load(_contextPath+"/common/getTheaterSelect", params, function(d){
				popOpenFunc('popupTheather');
			});
		},
		//극장선택팝업오픈 - CallBackFnc
		popupLayerTheatherSelectV4CallBack : function(latitude, longitude) {
			//alert("popupLayerTheatherSelectV4CallBack 실행!!!");
			var params = { latitude:0 ,longitude:0 }
			try {
				if( latitude != null && typeof latitude !== 'undefined'  
					&& longitude != null && typeof longitude !== 'undefined' ) {
					setLatitude (latitude);	//위도
					setLongitude(longitude); //경도
					params = { latitude:latitude ,longitude:longitude }
				} else {
					setLatitude (0); //위도
					setLongitude(0); //경도
					params = { latitude:0 ,longitude:0 }
				}
			} catch (e) {
				setLatitude (0); //위도
				setLongitude(0); //경도
				params = { latitude:0 ,longitude:0 }
			}
			
			$("#popupTheather").load(_contextPath+"/common/getTheaterSelect", params, function(d){
				popOpenFunc('popupTheather');
			});
		},
		//극장선택-지역별극장상세내역오픈
		popupLayerTheatherSelectDetail : function (_regionCode) {
			var params = { 
				 regionCode: _regionCode
				,latitude  : getLatitude()
				,longitude : getLongitude()
			};
			$("#popupTheatherLocation").load(_contextPath+"/common/getTheaterSelectDetail",params, function(d){
				popOpenFunc('popupTheatherLocation');
			});
		},
		//극장선택 이후 CallbackFunction 호출
		setTheatherInfoAndCall: function(infoStr) {
			var infos = infoStr.split("|"); // 0:극장코드, 1:극장명, 3:거리
			var infoData = {
				code  : infos[0]
			   ,value : infos[1]
			   ,distMi: infos[2]
			   ,latitude  : getLatitude()
			   ,longitude : getLongitude()	
			}
			var callB = _getCallBackFnc();
			if(typeof callB !== 'undefined') {
				var fnc = eval(callB);
				if(typeof fnc === 'function') {
					fnc(infoData);
				}
			}
		},
		//극장선택-지역별극장리스트오픈(상품)
		popupLayerAvailableCgvByProduct : function (objId, _coCd, _prdCd) {
			var params = { 
				 coCd      : _coCd
				,prdCd     : _prdCd
				,objId     : objId
				,latitude  : getLatitude()
				,longitude : getLongitude()
			};
			console.log("params:", params);
			loadingBar.start();
			$("#"+objId).load(_contextPath+"/common/getAvailableCgvByProduct",params, function(d){
				loadingBar.stop();
				//popOpenFunc(objId);
			});
		},
		
		//극장선택팝업 오픈
		getCurrentLocation : function() {
			/* 위치정보 호출 코드 제거*/
			/*
			if (navigator.geolocation) {
				console.log("노차단!!!", navigator.geolocation);
				try {
					navigator.geolocation.getCurrentPosition(this.getCurrentLocationCallBack,this.getCurrentLocationCallBack);
				} catch (e) {
					alert("error:"+e);
				}
		    } else {
		        //error('미지원');
		    	this.popupLayerTheatherSelectCallBack();
		    } */
		},
		//극장선택팝업오픈 - CallBackFnc
		getCurrentLocationCallBack : function(position) {
			var params = { latitude:0 ,longitude:0 }
			try {
				if( position != null && typeof position !== 'undefined'  
				    && position.coords != null && typeof position.coords !== 'undefined' ) {
					params = { latitude:position.coords.latitude ,longitude:position.coords.longitude }
				} else {
					params = { latitude:0 ,longitude:0 }
				}
			} catch (e) {
				params = { latitude:0 ,longitude:0 }
			}
			return params;
		}
		
	}
}();


/**
 * 웹일때 현재위치 구하는 함수 (IsWebView_Master == false)
 * 사용법: 
 *      위도-CGVMorderLocation.getLocationInfo().clatitude
 *      경도-CGVMorderLocation.getLocationInfo().clongitude
 */
var CGVMorderLocation = function() {
	var latitude  = 0;
	var longitude = 0;
	
	if(IsWebView_Master == true) {
		CGVHAAppInterface.RequestCurrentLocation();
	} else {
		if (navigator.geolocation) {
			/* 위치정보 호출 코드 제거*/
			/* 
			console.log("CGVMorderLocation 노차단!!!", navigator.geolocation);
			try {
				navigator.geolocation.getCurrentPosition(getCurrentLocationCallBack,getCurrentLocationCallBack);
			} catch (e) {
				alert("error:"+e);
			} */
	    } else {
	        //error('미지원');
	    	this.popupLayerTheatherSelectCallBack();
	    }
	}
	
	function getCurrentLocationCallBack(position) {
		try {
			if( position != null && typeof position !== 'undefined'  
			    && position.coords != null && typeof position.coords !== 'undefined' ) {
				setLatitude (position.coords.latitude);
				setLongitude(position.coords.longitude);
			} else {
				setLatitude (0);
				setLongitude(0);
			}
		} catch (e) {
			setLatitude (0);
			setLongitude(0);
		}
	}
	
	var setLatitude = function(latitude) {
		this.latitude = latitude;
	}
	var setLongitude = function(longitude) {
		this.longitude = longitude;
	}
	var getLatitude = function() {
		return this.latitude;
	}
	var getLongitude = function() {
		return this.longitude;
	}
	
	return {
		setLocationLatitude: function(latitude) {
			setLatitude(latitude);
		},
		setLocationLongitude: function(longitude) {
			setLongitude(longitude);
		},
		getLocationInfo :function () {
			return {
				 clatitude : getLatitude()
				,clongitude: getLongitude()
			}
		}
	}	
}();

/**
 * 거리확인
 * 사용법: CGV강남 getDistance('0056', 2);
 * @param thatCd(극장코드)
 * @param checkKm(체크할 거리km)
 * @returns true/false
 */
function getDistance(thatCd, checkKm) {
	
	var rtn = false;
	var loc;
	var clatitude  = 0;
	var clongitude = 0;
	
	//alert("IsWebView_Master:" + IsWebView_Master);
	
	//현위치
	//웹일때
	if( IsWebView_Master == false ) {
		loc = CGVMorderLocation.getLocationInfo();
		clatitude  = loc.clatitude ; //위도
		clongitude = loc.clongitude; //경도
	} 
	//앱일때
	else {
		CGVHAAppInterface.RequestCurrentLocation();
		loc =  CGVMorderLocation.getLocationInfo();
		clatitude  = loc.clatitude ; //위도
		clongitude = loc.clongitude; //경도
	}
	var jsonData = { 
			TheaterCode :thatCd
		   ,clatitude   :clatitude
		   ,clongitude  :clongitude
	};
	
	//alert("jsonData.TheaterCode:" + jsonData.TheaterCode);
	//alert("jsonData.clatitude:"   + jsonData.clatitude);
	//alert("jsonData.clongitude:"  + jsonData.clongitude);
	
	console.log("@@@@@ 거리확인 조건:", jsonData);
	loadingBar.start();
	jQuery.ajax({
        type       : "POST",
        url        : _contextPath + "/common/getTheaterLocationInfoAjax",
        data       : JSON.stringify(jsonData),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        async      : false,
        success    : function (result) {
            if(result.status == '200') {
            	var dist_mi = result.data.d;
            	console.log(">>> 극장간의 거리(km):" ,dist_mi);
            	if(dist_mi == "") {
            		rtn = false;
            	} else {
            		if(dist_mi > checkKm) {
                		rtn = false;
                	} else {
                		rtn = true;
                	}
            	}
            } else {
            	alert(result.message);
		    }
        },
        complete: function (data) {
            loadingBar.stop(); // 로딩바 종료
        },
        error: function (xhr, status, err) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
            loadingBar.stop(); // 로딩바 종료
        }
    });
	
	return rtn;
}

/**
 * 위도/경도를 통한 거리계산
 * @param lat1(현위치위도)
 * @param lng1(현위치경도)
 * @param lat2(대상위도)
 * @param lng2(대상경도)
 * @returns 거리
 */
function getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lng2-lng1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

/** 바로오더 홈이동 */
function fnMoveMain() {
	window.location.href = g_url_main;
}

/** 로그인 페이지 이동 */
//function fnMoveLogin() {
//	window.location.href = g_url_login;
//}

/** 로딩바 제어 */
var loadingBar = function() {
	return {
		 start : function() { 
			jQuery("#loadingBar").show(); 
		 }
		,stop  : function() { 
			jQuery("#loadingBar").hide(); 
		}
	}
}();

/**
 * 나이계산
 * @param birth(생년월일:19990101)
 * @returns
 */
function calcAge(birth) {                 
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    var day = date.getDate();       
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    var monthDay = month + day;
    birth = birth.replace('-', '').replace('-', '');
    var birthdayy = birth.substr(0, 4);
    var birthdaymd = birth.substr(4, 4);
    var age = monthDay < birthdaymd ? year - birthdayy - 1 : year - birthdayy;
    return age;
}

/**
 * 웹/앱 로그인페이지로 이동할 경우 사용.
 * @param reUrl
 * @returns
 */
function fnMoveLogin(reUrl) {
	var memberPath   = "Member";
	if(IsWebView_Master){
		memberPath = "MemberV4";
	}
	var retUrl = '';
	if(typeof reUrl !== 'undefined') {
		retUrl = encodeURIComponent(reUrl);
	}
	if(serverMode == 'local') {
		g_url_login = _contextPath + "/login?loginMode=2&mOrderReturnUrl=" + retUrl;
	} else {
		g_url_login = g_gateway_url+memberPath + "/Login.aspx?RedirectUrl=" + encodeURIComponent(g_gateway_url+"MobileOrder/Gateway.aspx?cType=normal&mOrderReturnUrl=" + retUrl);
	}
	
	if (!IsLogin) {
		if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
			/*
			if (IsWebView) {
               CGVHAAppInterface.MoveAppLogin();
            } else {
				window.location.href = g_url_login;
            }*/
			window.location.href = g_url_login;
		}
		else {
			return false;
		}
	}
}

/**
 * 앱 해더에 장바구니 갯수노출
 * @returns
 */
function fnCartCountAppNaviShow(cartCount) {
	 //웹뷰 확인 및 앱 버전 체크(앱 버전 체크는 WebToApp 함수 지원 시작 버전 확인을 위해 사용합니다)
    if (IsWebView && AppVersion_Master >= 433) {
      //1. 기본 상단 네비게이션 세팅 
      //여기선 basicNavigation으로 공통 함수를 만들어 사용했는데 결국 CGVHAAppInterface.SetNavigationBar 메서드가 호출 됩니다(SetNavigationBar 메서드 내용은 첨부한 I/F 연동 정의서에서 확인 가능)  
        basicNavigation(1, "바로오더", "|" + encodeURIComponent(getNavigationIconUrl('icon_cart')) + "||1|fnCartMovePage()|");
       //앱 버전 체크
       if (AppVersion_Master >= 457) {
            //2. 장바구니 숫자 아이콘 위치와 노출 숫자 전달
            CGVHAAppInterface.SetStoreBasketCount(2, cartCount);
        }
     }
}

/**
 * 앱 장바구니 버튼 클릭시 
 * 장바구니페이지이동.
 * @returns
 */
function fnCartMovePage() {
	// Google Analytics Tag
    var eventCategory = "MW_홈";
    if (IsWebView) {
        eventCategory = "MA_홈";
    }
	fnSendGALog('1', '', eventCategory + '바로오더_상품상세', '장바구니_아이콘', '');
    window.location.href = _contextPath + "/my/basket/myBasketList";
}

/**
 * 극장별 나중오더사용여부 체크
 * 사용법: CGV강남 checkLaterOrdYn('A420', '0056');
 * @param coCd  (회사코드)
 * @param thatCd(극장코드)
 * @returns true/false
 */
function gfnCheckLaterOrdYn(coCd, thatCd) {
	
	var laterOrdYn = '0';
	var jsonData = { 
			coCd     :coCd
		   ,thatCd   :thatCd
	};
	
	console.log("@@@@@ 조건:", jsonData);
	loadingBar.start();
	jQuery.ajax({
        type       : "POST",
        url        : _contextPath + "/common/getLaterOrdYnAjax",
        data       : JSON.stringify(jsonData),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        async      :  false,
        success    : function (result) {
        	console.log("result:", result);
            if(result.status == '200') {
            	laterOrdYn = result.data.d;
            } else {
            	alert(result.message);
		    }
        },
        complete: function (data) {
            loadingBar.stop(); // 로딩바 종료
        },
        error: function (xhr, status, err) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
            loadingBar.stop(); // 로딩바 종료
        }
    });
	return laterOrdYn;
}

/**
 * 뒤로가기
 * @returns
 */
function gfnMoveBack() {
	history.go(-1);
}

/**
 * 상세 티켓 표시
 */
function showDetailMovieTicket(saleNo, movieCd, playNum) {
	var menuId = "INMC14";				// 티켓 상세 표시
	
	CGVHAAppInterface.showReservedMovieTicket(menuId, saleNo, movieCd, playNum);
}

/**
 * 티켓 목록 표시
 */
function showMovieTicketList() {
	var menuId = "INMC15";				// 티켓 목록 표시
	
	CGVHAAppInterface.showReservedMovieTicket(menuId, null, null, null);
}
