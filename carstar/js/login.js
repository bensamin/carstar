$(".forget-password-btn1").click(function(){
	window.location.href = "use-forget.html";
});

$(".forget-password-btn2").click(function(){
	window.location.href = "store-forget.html";
});

$(document).ready(function(){
			$(".user-login").click(function(){
				$(".user-login").css("color","black");
				$(".user-text").fadeIn();
				$(".merchant-text").css("display","none");
				$(".merchant-login").css("color","#ADADAD");
			});
			$(".merchant-login").click(function(){
				$(".merchant-login").css("color","black");
				$(".user-login").css("color","#ADADAD");
				$(".user-text").css("display","none");
				$(".merchant-text").fadeIn();
			});
			$(".user-login").parent().css("border-right","1px dashed #ADADAD")
		});
$(".footer").load("footer.html");


//cookie判断是否登陆
function getCookie(){
	var userCookie = $.cookie("userId");
	if ( userCookie != "" ){
		return true;
	}else{
		window.location.href = "login.html";
		return false;
	}
}

//删除cookie，退出登录
function deleteCookie(){
	$.cookie("userId","");
	alert("退出登陆成功！")
	window.location.href ="home.html"
}

//登陆验证
function checkUser(){
		var name  = $("#username").val();
		var pwd = $("#pwd1").val();
		if (name == "" || name == null) {
	        alert("用户名不能为空");
	        return false;
	    } else if (pwd == "" || pwd == null) {
	        alert("密码不能为空");
	        return false;
	    }
	    
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
	    
		    var infoJson =   $("#login-form1").serializeObject();
		    infoJson =  JSON.stringify(infoJson);
		    
   			$.ajax({
   				cache:true,
   				type:"post",
   				contentType: "application/json; charset=utf-8",
   				url:"http://139.224.133.119:8080/CarStar/rest/sys/user/login",
   				data:infoJson,
   				dataType:"json",
   				async:false,
				success:function(date){
						if ( date.code == 0 ){
//							console.log(date.data.id);
						 	$.cookie("userId",date.data.id, {expires:1} );  //设置一个用户登陆的cookie,保存时间为1天
							window.location.href="home.html";
						}else if (date.code == 1) {
							alert("密码错误");
						}else{
							alert("用户未注册");
						}
				},
				error:function(){
   					console.log("error");
   				}
   			});

}

////密码显示隐藏
 		var isShow=true;
 		var passtext1 = document.getElementById("password-show-btn1");
 		var passtext2 = document.getElementById("password-show-btn2");
        function changepassword1(){
        	var v = document.getElementById("pwd1");
            if (isShow) {
            		v.type="text";
                passtext1.src="img/hidden.png";
                isShow=false;
            }else{
            		v.type="password";
                passtext1.src="img/show.png";
                isShow=true;
            }
        };
        function changepassword2(){
        	var v = document.getElementById("pwd2");
            if (isShow) {
            		v.type="text";
                passtext2.src="img/hidden.png";
                isShow=false;
            }else{
            		v.type="password";
                passtext2.src="img/show.png";
                isShow=true;
            }
        };
        
//忘记密码--获取验证码验证
function getRePasswordCode(){
//获取手机号码，发送验证码	
	var userLinkephone = document.getElementById("forget-input").value.trim();  //获取手机号码
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

//忘记密码----判断验证码
function checkRepasswordCode(){
	//验证验证码	
	var code_phone = document.getElementById("forget-identify").value.trim();   //获取短信验证码
		if ( msg_code != code_phone ){
			alert("验证码错误");
			return false;
		}else{
			$(".forget-find").css("display","none");
			$(".forget-reset").css("display","block");
		}
}

//重置密码
function checkRepassword(){
	var UserPassword = document.getElementById("pwd1").value;  //获取第一次输入的密码
	var UserRepassword = document.getElementById("pwd2").value;   //再一次输入的密码
	if( UserPassword != UserRepassword ){
		alert("两次密码输入不一致！")
	}else{
		ChangePassword();
//		alert("修改密码成功！");
	}
	
}

//修改密码
function ChangePassword(){
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
	    
		    var infoJson =   $(".forget-password").serializeObject();
		    infoJson =  JSON.stringify(infoJson);
		    console.log(infoJson);
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
				url:"http://139.224.133.119:8080/CarStar/rest/sys/user/update",
				data:infoJson,
	   			dataType:"json",
	   			async:false,
	   			success:function(regist){
	   				if ( regist.code == 0 ){
	   					alert("密码修改成功！")
	   					window.location.href = "home.html";
	   				}
	   			},
	   			eerror:function(){
	   				alert("用户未注册");
	   			}
			});
	
}


//商户登陆
function checkShop(){
	
	var name  = $("#shopname").val();
		var pwd = $("#pwd2").val();
		if (name == "" || name == null) {
	        alert("商户名不能为空");
	        return false;
	    } else if (pwd == "" || pwd == null) {
	        alert("密码不能为空");
	        return false;
	    }
	
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
		  var infoJson =   $("#login-form2").serializeObject();
		      infoJson =  JSON.stringify(infoJson);	
		      infoJson = eval( "(" +infoJson+ ")" );
		      infoJson.flag = "1";
//		      infoJson =  JSON.stringify(infoJson);	
		      console.log(infoJson.user_name,infoJson.password,infoJson.flag);
		      
		    var url_Shop = "http://139.224.133.119:8080/CarStar/rest/shop/login?user_name="+infoJson.user_name+"&password="+infoJson.password+"&flag="+infoJson.flag;
			
			$.ajax({
				type:"get",
				contentType: "application/json; charset=utf-8",
				url:url_Shop,
				async:false,
				success:function(msg){
					if( msg.code == 0 ){
						alert("商户登陆成功！");
						window.location.href="home.html";
					}else if (msg.code == 1){
						alert("密码错误！");
					}else {
						alert("商户未注册！");
					}
				},
				eerror:function(){
					console.log("error");	
				}
			});
}

//商户忘记密码
function getStorePassword(){
	
}
