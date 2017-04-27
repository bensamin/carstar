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

//将用户登陆信息保存到cookie中
function saveCookie(){
	var userName = document.getElementById("username").value;
	var pwd1 = document.getElementById("pwd1").value;
	console.log(userName + pwd1);
	
	var userDate = new Date();
	userDate.setTime(userDate.getTime() +5000 );
	setCookie("userName",userName,userDate.toGMTString(),"","","");
	setCookie("pwd1",pwd1,userDate.toGMTString(),"","","");
	getCookie();
}
//设置cookie
function setCookie(name,value,expries,path,domain,secure){
	document.cookie = name + "=" +encodeURI(value) + 
	((expries) ? "; expries" + expries: "" ) +
	( (path) ? ";path" +path: "" ) +
	( (domain) ? ";domain" + domain: "") +
	( (secure) ? ";secure" +secure: "" );
}

//获取cookie
function getCookie(cname){
	var m = document.cookie;
	if(m){
		return true;
	}else{
		window.location.href = "login.html";
		return false;
	}
	var coookieString = decodeURI(document.cookie);
	var cookieArray = coookieString.split(";");
	console.log(cookieArray.length);
	for(var i = 0;i< cookieArray.length; i++ ){
		var cookieNum = cookieArray[i].split("=");
		console.log(cookieNum.toString());
		
		var cookieName = cookieNum[0];
		var cookieValue = cookieNum[1];
		
		if(cookieName == cname){
			return cookieValue;
		}
	}
	return false;
}

function checkUser(){
		var name  = $("#username").val();
		var pwd = $("#pwd1").val();
		if (name == "" || name == null) {
	        alert("用户名不能为空");
	        return false;
	    } else if (pwd == "" || pwd == null) {
	        alert("密码不能为空");
	        return false;
	    } else if(name == "admin" & pwd == "123456"){
	    		window.location.href = "home.html";
	        return true;
	    }else{
	    		alert("账户名或密码错误！")
	    		return false;
	    }
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
        
$(".forget-password-btn1").click(function(){
	window.location.href = "use-forget.html";
});
$(".forget-password-btn2").click(function(){
	window.location.href = "store-forget.html";
});
