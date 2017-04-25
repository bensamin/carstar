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


//function addCookie(name,value,days,path){
//	var name = escape(name);
//	var value = escape(value);
//	var expires = new Date();
//	expires.setTime(expires.getTime()+ days*3600*24);
//	path = path == ""?"":";path= "+path;
//}

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
//	    		addCookie("userName",name,1,"/");
//	    		addCookie("pwd",userPass,1,"/");
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
