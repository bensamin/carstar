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


	//get请求通过URL中的orderid即订单id获取信息
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

	function checkInputValue() {

	}