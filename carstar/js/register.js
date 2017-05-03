 $(document).ready(function(){
 	function validateForm(){
 		if( checkUserName() && checkUserPassword() && checkUserRepassword() &&checkUserPhone() && checkUserEmail() && checkLinkName() && checkStoreShopBrand() && checkstoreShopType() && checkstoreCompanyName() && checkstoreCompanyLegalPersonal()){
 			alert("恭喜你注册成功");
 		}
 	}
 });
 
 	function validateForm(){
   			console.log( $("form").serialize() );
   			$.ajax({
   				cache:true,
   				type:"post",
   				url:"",
   				data:$(".form-horizontal").serialize(),
   				async:false,
				error:function(request){
					console.log("error");	
				},
				success:function(data){
					console.log("success");
				}
   			});
 	}	
 var nameRegex = /^[^@#]{3,16}$/;
 var passwordRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
 
 //用户名检测
 function checkUserName(){
 	var storeUserName = document.getElementById("store-user-name").value.trim(); //用户名
	 	//用户名
	 	if( !nameRegex.test(storeUserName) ){
	 		document.getElementById("store-user-name-Info").innerHTML = "用户名为3～16个字符，且不能包含 “@”,“#”,“_”,“%”等字符 ";
	 	}else{
	 		document.getElementById("store-user-name-Info").innerHTML = "";
	 		return true;
	 	}
 	 }
 	
 function checkLinkName(){
 		var storeLinkName = document.getElementById("store-link-Name").value.trim();  //联系人姓名
	 	//联系人姓名
	 	if( !nameRegex.test(storeLinkName) ){
	 		document.getElementById("store-link-Name-Info").innerHTML = "联系人姓名为3～16个字符，且不能包含 “@”,“#”,“_”,“%”等字符 ";
	 	}else{
	 		document.getElementById("store-link-Name-Info").innerHTML = "";
	 		return true;
	 	}
 	}
 	//店铺品牌
 function checkStoreShopBrand(){
 		var storeShopBrand = document.getElementById("store-shop-brand").value.trim(); //店铺品牌
 		if( !nameRegex.test(storeShopBrand) ){
 			document.getElementById("store-shop-brand-Info").innerHTML = "店铺品牌名为3～16个字符，且不能包含 “@”,“#”,“_”,“%”等字符 ";
	 	}else{
	 		document.getElementById("store-shop-brand-Info").innerHTML = "";
	 		return true;
	 	}
 	}
 	//店铺类型
 function checkstoreShopType(){
 		var storeShopType = document.getElementById("store-shop-type").value.trim();  //店铺类型
 		if( !nameRegex.test(storeShopType) ){
 			document.getElementById("store-shop-type-Info").innerHTML = "店铺类型名为3～16个字符，且不能包含 “@”,“#”,“_”,“%”等字符 ";
	 	}else{
	 		document.getElementById("store-shop-type-Info").innerHTML = "";
	 		return true;
	 	}
 	}
 	 //公司名称
 function checkstoreCompanyName(){
 		var storeCompanyName = document.getElementById("store-company-name").value.trim();  //公司名称
 		if( !nameRegex.test(storeCompanyName) ){
 			document.getElementById("store-company-name-Info").innerHTML = "用户名为3～16个字符，且不能包含 “@”,“#”,“_”,“%”等字符 ";
	 	}else{
	 		document.getElementById("store-company-name-Info").innerHTML = "";
	 		return true;
	 	}
 	}
 	//法人姓名
 function checkstoreCompanyLegalPersonal(){
 	var storeCompanyLegalPersonal = document.getElementById("store-company-legalPersonal").value.trim();  //法人姓名
 		if( !nameRegex.test(storeCompanyLegalPersonal) ){
 			document.getElementById("store-company-legalPersonal-Info").innerHTML = "法人姓名为3～16个字符，且不能包含 “@”,“#”,“_”,“%”等字符 ";
	 	}else{
	 		document.getElementById("store-company-legalPersonal-Info").innerHTML = "";
	 		return true;
	 	}
 	}

//密码检测
function checkUserPassword(){
	var storeUserPassword = document.getElementById("store-user-password").value.trim();
	if(!passwordRegex.test(storeUserPassword)){
		document.getElementById("store-user-password-Info").innerHTML = "密码长度必须是在6-21个字符,不能是纯数字或纯英文";
	}else{
		document.getElementById("store-user-password-Info").innerHTML = "";
	}
	return true;
}

//再输一次密码验证
function checkUserRepassword(){
	var storeUserPassword = document.getElementById("store-user-password").value;
	var storeUserRepassword = document.getElementById("store-user-repassword").value;
	console.log( storeUserPassword,storeUserRepassword );
	if( storeUserPassword == storeUserRepassword ){
		return true;
	}else{
		document.getElementById("store-user-repassword-Info").innerHTML = "两次输入的密码不一致";
		return false;
	}
}

//电话号码验证
function checkUserPhone(){
	var storeLinkephone = document.getElementById("store-link-phone").value.trim();
	var phoneRegex = /^1[358][0123456789]\d{8}$/;
	if( !phoneRegex.test(storeLinkephone) ){
		document.getElementById("store-link-phone-Info").innerHTML = "请输入有效的手机号码";
		return false;
	}else{
		document.getElementsByClassName("store-link-phone-Info").innerHTML = "";
		return true;
	}
}

//邮箱地址验证
function checkUserEmail(){
	var storeLinkEmail = document.getElementById("store-link-email").value.trim();
	var emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	if( !emailRegex.test(storeLinkEmail) ){
		document.getElementById("store-link-email-Info").innerHTML = "请输入正确的邮箱地址";
	}else{
		document.getElementById("store-link-email-Info").innerHTML = "";
	}
}

//用户注册判断
var msg_code
function checkUserRegistCode(){
	var userLinkephone = document.getElementById("user-RegistPhone").value.trim();  //获取手机号码
	
	var phoneRegex = /^1[3587][0123456789]\d{8}$/;
	if( !phoneRegex.test(userLinkephone) ){
		alert("请输入正确的手机号码");
		return false;
	}else{
		
			code_phone= "http://139.224.133.119:8080/CarStar/rest/sms/send/"+userLinkephone,
			$.ajax({
				type:"get",
				contentType: "application/json; charset=utf-8",
				url:code_phone,
				async:false,
				success:function(msg){
					msg_code = msg.data;
					alert("验证码发送成功！")
					console.log(msg);
				}
			});
	
	}
}
function checkUserRegist(){
	var code_phone = document.getElementById("user-RegistCode").value.trim();   //获取短信验证码
	var UserPassword = document.getElementById("pwd1").value;  //获取第一次输入的密码
	var UserRepassword = document.getElementById("pwd2").value;   //再一次输入的密码
		console.log(code_phone,UserPassword,UserRepassword);
		if ( msg_code != code_phone ){
			alert("验证码错误")
			return false;
		}else if ( UserPassword != UserRepassword ){
			alert("两次密码输入不一致");
			return false;
		}else if(  !$("#regist-check").prop("checked") ){
			alert("未同意用户注册协议！");
			return false;
		}else{
			registChange();
		}
}

function registChange(){
	//json格式转化
		$.fn.serializeObject = function()  
			{  
			   var o = {};  
			   var a = this.serializeArray();  
			   $.each(a, function() {  
			       if (o[this.name]) {  
			           if (!o[this.name].push) {  
			               o[this.name] = [o[this.name]];  
			           }  
			           o[this.name].push(this.value || '');  
			       } else {  
			           o[this.name] = this.value || '';  
			       }  
			   });  
			   return o;  
			};
	    
		    var infoJson =   $("#regist-form1").serializeObject();
		    infoJson =  JSON.stringify(infoJson);
		    infoJson = eval( "(" +infoJson +")" );
		    infoJson.image_path = " ";
		    infoJson.name = " ";
		    infoJson.sex = " ";
		    infoJson.balance = " ";
		    infoJson.coin= " ";
		    infoJson =  JSON.stringify(infoJson);
		    console.log(infoJson);
		
			$.ajax({
				cache:true,
				type:"post",
				contentType: "application/json; charset=utf-8",
				url:"http://139.224.133.119:8080/CarStar/rest/sys/user/insert",
				data:infoJson,
	   			dataType:"json",
	   			async:false,
	   			success:function(regist){
	   				if ( regist.code == 0 ){
	   					alert("注册成功！")
	   					window.location.href = "home.html";
	   				}
	   			},
	   			eerror:function(){
	   				alert("注册失败");
	   			}
			});
	
}

