
//图片
$(function(){
	if( window.innerWidth < 767 ){
		$(".myform").append("<span>商城</span>")
	}
});
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
