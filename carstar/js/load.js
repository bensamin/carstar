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