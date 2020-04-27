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

