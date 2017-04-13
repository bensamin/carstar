
//图片
$(function(){
	if( window.innerWidth < 767 ){
		$(".myform").append("<span>商城</span>")
	}

});

$(document).ready(function(){
	
	//搜索框 div弹出
			$(".show-div").click(function(){
			$(".show-search").css("display","block")
				})
    					
			$(".show-div1").blur(function(){
				$(".show-search").css("display","none")
				});
});

//一级分类下拉框

$(document).ready(function(){
		$("li").click(function(){
			 var index = $("li").index(this);
			 $(".category-tabbox div").eq(index).toggle();
			});	
		});	
		
//左侧滑动菜单
$(function(){
	$('aside.slide-wrapper').on('touchstart', 'li', function(e){
		$(this).addClass('current').siblings('li').removeClass('current');
		console.log("123");
	});

		$('a.slide-menu').on('click', function(e){
			var wh = $('div.wrapperhove'+'rtree').height();
			$('div.slide-mask').css('height', wh).show();
			$('aside.slide-wrapper').css('height', wh).addClass('moved');
		});

	$('div.slide-mask').on('click', function(){
		$('div.slide-mask').hide();
		$('aside.slide-wrapper').removeClass('moved');
	});
	
});

$(function(){
	var v = true;
	var img = document.getElementById("left-down1");
	$(".left-allproduct").click(function(){
		if(v){
			$(".left-drop").slideDown();
			v = false;
			img.src = "img/drop-up.png";
		}else{
			$(".left-drop").slideUp();
			v = true;
			img.src = "img/left-down.png";
		}
	});
});


$(function(){
	var v = true;
	var img = document.getElementById("left-down2");
	$(".left-mine").click(function(){
		if(v){
			$(".left-minedrop").slideDown();
			v = false;
			img.src = "img/drop-up.png";
		}else{
			$(".left-minedrop").slideUp();
			v = true;
			img.src = "img/left-down.png";
		}
	});
});

//personal
$(".myform a:eq(3)").on("mouseover mouseout",function(event){
	if(event.type == "mouseover"){
		$(".nav-personal").fadeIn();
	}
	if(event.type == "mouseout"){
		$(".nav-personal").fadeOut();
	}
});
 
 //garage
$(".myform a:eq(4)").on("mouseover mouseout",function(event){
	if(event.type == "mouseover"){
		$(".nav-garage").fadeIn();
	}
	if(event.type == "mouseout"){
		$(".nav-garage").fadeOut();
	}
});

//garage
$(".myform a:eq(5)").on("mouseover mouseout",function(event){
	if(event.type == "mouseover"){
		$(".nav-collection").fadeIn();
	}
	if(event.type == "mouseout"){
		$(".nav-collection").fadeOut();
	}
});


function hover(){
		//personal
		var person_w = $(".nav-personal").width();
		var person_w1 = $(".myform a:eq(3)").width();
		
		var nav_personal = new Object();
		nav_personal.top = parseInt( $(".myform a:eq(3)").offset().top + $(".myform img:eq(3)").width() );
		nav_personal.left = parseInt( $(".myform a:eq(3)").offset().left - (person_w/2) + (person_w1 / 2)  )   ;
		console.log( nav_personal.top , nav_personal.left);		
		$(".nav-personal").css("left",nav_personal.left );
		
		//,garage
		var garage_w = $(".nav-garage").width();
		var garage_w1 = $(".myform a:eq(4)").width();
		
		var nav_garage = new Object();
		nav_garage.top = parseInt( $(".myform a:eq(4)").offset().top + $(".myform img:eq(4)").width() );
		nav_garage.left = parseInt( $(".myform a:eq(4)").offset().left - (garage_w/2) + (garage_w1 / 2)  )   ;
		console.log( nav_garage.top , nav_garage.left);		
		$(".nav-garage").css("left",nav_garage.left );
		
		//collection
		var nav_collection = new Object();
		var collection_w = $(".nav-collection").width();
		var collection_w1 = $(".myform a:eq(5)").width();
		
		var nav_collection = new Object();
		nav_collection.top = parseInt( $(".myform a:eq(5)").offset().top + $(".myform img:eq(5)").width() );
		nav_collection.left = parseInt( $(".myform a:eq(5)").offset().left - (collection_w/2) + (collection_w1 / 2)  )   ;
		console.log( nav_collection.top , nav_collection.left);		
		$(".nav-collection").css("left",nav_collection.left );
		
		
//		$(".nav-personal").top( $(".myform a:eq(3)").offset().top  )	
}
setInterval(hover,40);
