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

function checkUser(){
		var name  = $("#username").val();
		var pwd = $("#pwd").val();
		if (name == "" || name == null) {
        alert("用户名不能为空");
        return false;
    } else if (pwd == "" || pwd == null) {
        alert("密码不能为空");
        return false;
    } else if(name == "admin" & pwd == "123456"){
    		$.cookie(name);
    		$.cookie(pwd);
        return true;
    }else{
    		alert("账户名或密码错误！")
    		return false;
    }
    $.cookie(name);
}


