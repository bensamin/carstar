
//图片
//$(function(){
//	if(window.innerWidth < 767 ){
//		$(".myform").append("<span>商城</span>")
//	}
//});
//搜索框 div弹出
$(document).ready(function(){
			$(".show-div").click(function(){
			$(".show-search").css("display","block")
				})
    					
			$(".show-div1").blur(function(){
				$(".show-search").css("display","none")
				});
				
			
});

//一级分类下拉框

$(document).ready(function(){
			console.log("navbar.js")
////			$(".category-tabmenu li").each(function(){
////				$(this).click(function(){
////				console.log( $(this).index() );
//////				$(".category-tabbox div").eq( $(this).index() ).slideDown().siblings().slideUp();	
//////				$(".category-menu").slideDown();
////				$(".category-tabbox").
////				});
//			});
		$("li").click(function(){
			 var index = $("li").index(this);
			 console.log(  index );
			 $(".category-tabbox div").eq(index).toggle();
			});	
		});	