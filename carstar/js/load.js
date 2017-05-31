	$(document).ready(function(){
		//载入头部
		$(".header").load("nav.html");
		//载入底部
		$(".footer").load("footer.html");
		//订单
		$(".add-order1").load("order.html");
		//产品参数
		$(".add-parameters").load("parameters.html");
		//添加 类名
	});    

function XXURL(){
	var thisURL =  document.URL;
	var getVal = thisURL.split('?')[1];
	var pid = getVal.split("=")[1];	
	return pid;
}


//分割URL中的参数
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
	var str = url.substr(1);
		strs = str.split("&");
	for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
		}
}
return theRequest;
}


//get请求通过URL中的orderid即订单id,获取返回值信息，有去有回
//是否将获取url上的信息修改一下，变成xxURL函数？
function getItemInfo(url){
	var request = new Object();
		request = GetRequest();
		var id = request['orderid'];
		var a;
		var a_url = url+id;
			$.ajax({
				type:"get",
				url:a_url,
				async:false,
				success:function(msg){
					a = msg;
				}
			});
		return a;
		
}

// 传入url+id 删除某个信息，例如购物车，订单或者地址等等
function deleteInfo(url){
	$.ajax({
		type:"get",
		url:url,
		async:false,
		success:function(msg){
			alert("删除成功!");
		}
	});
}

var nameRegex = /^[^@#]{3,16}$/;    //姓名检测
var passwordRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;   //账号密码检测
var phoneRegex = /^1[358][0123456789]\d{8}$/;   //电话号码检测

function checkInputNameValue(name) {
	if( !nameRegex.test(name) ){
//			alert("姓名为3～16个字符，且不能包含 “@”,“#”,“_”,“%”等字符 ");
 			return false;
	 	}else{
	 		return true;
	 	}
}

function checkInputPhonevalue(phone){
	if( !phoneRegex.test(phone) ){
//		alert("请输入正确的手机号码!");
		return false;
	}else{
		return true;
	}
}
