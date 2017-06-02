//         ******************页面加载完成**************************
$(document).ready(function(){
			//产品轮播图  显示个数
			if( window.innerWidth > 756 ){
					    $('#home-searchContent').addClass('home-searchContent1');
					    $('.search-choose').addClass('search-choose1');
					    $('.home_test').addClass('home_test1');
					      //产品css响应式
					   
						$('.product').addClass('product1');
						$('.product').removeClass('product2');
						$('.search-go').addClass('search-go_one');
						
					}else{
						$('.background-img').append( "<img class='img-responsive' src='img/banner-s.jpg' />" )
						 $('.search-go').addClass('search-go_two');
						 $('.search-choose').addClass('search-choose2');
						 $('.home_test').addClass('home_test2');
						 $('#home-searchContent').addClass('home-searchContent2');
						   //产品css响应式
						$('.shop').css('padding','15px');
						$('.product').addClass('product2');
						$('.product').removeClass('product1');
						$('.category-product-list-buy').addClass('list-buy2');
						
			}
			$(".row").addClass("text-center");
			$("#home-searchAll ul li").addClass("text-center");
			$("th").addClass("text-center");
			
			$(".nav-tabs li").each(function(){
    				$(this).click(function(){
    					document.getElementById("home-drop").style.top = "670px";
    				});
    			});
		});
		
// 返回顶部按钮
$(window).scroll(function(){
	var sc = $(window).scrollTop();
	var rwidth = $(window).width();
	if(sc > 0){
		$(".goToBtn").css("display","block");
		$(".goToBtn").css("left",(rwidth-36)+"px");
	}else{
		$(".goToBtn").css("display","none");
	}	
});
$(".goToBtn").click(function(){
	var sc = $(window).scrollTop();
	$("body,html").animate( {scrollTop:0},500 );
});

//价格，评论，品牌分类下拉按
$(document).ready(function(){
	$(".add1").click(function(){
   		$(".add1").css("display","none");
		$(".reduce1").css("display","inline");
		$(".price1").slideToggle();
	});
	$(".reduce1").click(function(){
		$(".reduce1").css("display","none");
		$(".add1").css("display","inline");
		$(".price1").slideToggle();
	});

	$(".add2").click(function(){
   		$(".add2").css("display","none");
		$(".reduce2").css("display","inline");
		$(".price2").slideToggle();
	});
	$(".reduce2").click(function(){
		$(".reduce2").css("display","none");
		$(".add2").css("display","inline");
		$(".price2").slideToggle();
	});
	
	$(".add3").click(function(){
   		$(".add3").css("display","none");
		$(".reduce3").css("display","inline");
		$(".price3").slideToggle();
	});
	$(".reduce3").click(function(){
		$(".reduce3").css("display","none");
		$(".add3").css("display","inline");
		$(".price3").slideToggle();
	});

});
//鼠标点击变色


//查询
$("#home-searchContent form").each(function(){
	var a = $(this);
	var b = $(this).index();
	$("#home-searchAll ul li").click(function(){
		$(this).css("bsckground-color","#000000");
		var c = $(this).index();
		if( b == c ){
			a.css("display","block");
		}else{
			a.css("display","none");
		}
	});
});


$("#home-searchAll ul li").click(function(){
	$(this).css("background","#49525f");
	$(this).siblings().css("background","#5c6675")
});


$(function(){
	var c ;
	$("#home-searchAll ul li").each(function(){
		 c =  $(this).index() + 1 ;
	});
	var w = $("#home-searchAll").width();
	var wd = parseInt( w/c );
	$("#home-searchAll ul li").width(wd-15);
	
});
