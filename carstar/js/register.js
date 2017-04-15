 $(document).ready(function(){
 	function validateForm(){
 		if( checkUserName() && checkUserPassword() && checkUserRepassword() &&checkUserPhone() && checkUserEmail() && checkLinkName() && checkStoreShopBrand() && checkstoreShopType() && checkstoreCompanyName() && checkstoreCompanyLegalPersonal()){
 			alert("恭喜你注册成功");
 		}
 	}
 });
 
 	function validateForm(){
   			console.log( $("form").serialize() );
// 			$.ajax({
// 				cache:true,
// 				type:"post",
// 				url:"",
// 				data:$(".form-horizontal").serialize(),
// 				async:false,
//				error:function(request){
//					console.log("erroe");	
//				},
//				success:function(data){
//					console.log("success");
//				}
// 			});
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


