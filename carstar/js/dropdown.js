//         ******************菜单栏固定**************************
$(document).ready(function() {
          // Cache selectors for faster performance.
          var $window = $(window),
              $search_drop = $(".search-drop");
              $scroll_top = $(".scroll-top");    
          // Run this on scroll events.
        //scroll()
       //当用户滚动指定的元素时，会发生scroll事件。
       //scroll事件适用于所有可滚动的元素和window对象（浏览器窗口）
       //scroll()方法触发scroll事件，或规定当发生scroll事件时运行的函数
          $window.scroll(function(){
          	var window_top = $window.scrollTop();  //
          	var scroll_top = $scroll_top.offset().top;
          	//输出网页卷过去的高度，下拉菜单的偏移量
          	console.log("固定下拉选择："+window_top+"+"+scroll_top+"+"+window.innerWidth);
          	//输出屏幕的宽度，屏幕的高度
          	console.log(screen.width+"*"+screen.height); 
          	if( window.innerWidth > 468  &&  window_top > scroll_top){
          		$search_drop.addClass("stick");
          		$scroll_top.height($search_drop.height());
          	}else{
				$search_drop.removeClass("stick");
				$scroll_top.height(0);
          	}
          });         
      });     

// 返回顶部
$(window).scroll(function(){
	var sc = $(window).scrollTop();
	console.log("GOtotop:success");
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
	console.log("choose");
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
