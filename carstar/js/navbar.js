//弹出框隐藏
function clickSearch(){
			$(".show-search").css("display","block");
//			console.log("1");
}

//弹出框隐藏
 $(".show-search").click(function(e){
		if( !$( e.target ).closest(".search-value").length ){
			$(".show-search").hide();
			console.log("3");
		}
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
	$(".left-allproduct").click(function(){
		if(v){
			$(".left-drop").slideDown();
			v = false;
			$(".left-down1").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
		}else{
			$(".left-drop").slideUp();
			v = true;
			$(".left-down1").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
		}
	});
});

$(function(){
	var v =true;
});

$(function(){
	var v = true;
	$(".left-mine").click(function(){
		if(v){
			$(".left-minedrop").slideDown();
			v = false;
			$(".left-down2").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
		}else{
			$(".left-minedrop").slideUp();
			v = true;
			$(".left-down2").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
		}
	});
});

$(function(){
	var v = true;
	$(".left-car").click(function(){
		if(v){
			$(".left-choose-car").slideDown();
			v = false;
			$(".left-down3").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
		}else{
			$(".left-choose-car").slideUp();
			v = true;
			$(".left-down3").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
		}
	});
});

$(function(){
	var v = true;
	$(".left-help").click(function(){
		if(v){
			$(".left-help-content").slideDown();
			v = false;
			$(".left-down5").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
		}else{
			$(".left-help-content").slideUp();
			v = true;
			$(".left-down5").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
		}
	});
});

$(function(){
	var v = true;
	$(".left-collection").click(function(){
		if(v){
			$(".left-collection-content").slideDown();
			v = false;
			$(".left-down4").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
		}else{
			$(".left-collection-content").slideUp();
			v = true;
			$(".left-down").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
		}
	});
});

function hover(){
		//personal
		var person_w = $(".nav-personal").width();
		var person_w1 = $(".myform a:eq(3)").width();
		
		var nav_personal = new Object();
		nav_personal.top = parseInt( $(".myform a:eq(3)").offset().top + $(".myform img:eq(3)").width() );
		nav_personal.left = parseInt( $(".myform a:eq(3)").offset().left - (person_w/2) + (person_w1 / 2)  )   ;
		$(".nav-personal").css("left",nav_personal.left );
		
		//,garage
		var garage_w = $(".nav-garage").width();
		var garage_w1 = $(".myform a:eq(5)").width();
		
		var nav_garage = new Object();
		nav_garage.top = parseInt( $(".myform a:eq(5)").offset().top + $(".myform img:eq(5)").width() );
		nav_garage.left = parseInt( $(".myform a:eq(5)").offset().left - (garage_w/2) + (garage_w1 / 2)  )   ;
		$(".nav-garage").css("left",nav_garage.left );
		
		//collection
		var nav_collection = new Object();
		var collection_w = $(".nav-collection").width();
		var collection_w1 = $(".myform a:eq(4)").width();
		
		var nav_collection = new Object();
		nav_collection.top = parseInt( $(".myform a:eq(4)").offset().top + $(".myform img:eq(4)").width() );
		nav_collection.left = parseInt( $(".myform a:eq(4)").offset().left - (collection_w/2) )   ;
		$(".nav-collection").css("left",nav_collection.left );
		
		
//		$(".nav-personal").top( $(".myform a:eq(3)").offset().top  )	
}
setInterval(hover,40);


(function($){
    $.fn.hoverDelay = function(options){
        var defaults = {
            hoverDuring: 20,
            outDuring: 2000,
            hoverEvent: function(){
                $.noop();
            },
            outEvent: function(){
                $.noop();    
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer, outTimer, that = this;
        return $(this).each(function(){
            $(this).hover(function(){
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function(){sets.hoverEvent.apply(that)}, sets.hoverDuring);
            },function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function(){sets.outEvent.apply(that)}, sets.outDuring);
            });    
        });
    }      
})(jQuery);

//个人中心
$(".myform a:eq(3)").hoverDelay({
	hoverEvent:function(){
			$(".nav-personal").fadeIn();
			$(".nav-personal").next().css("display","none");
	},
	outEvent:function(){
			$(".nav-personal").fadeOut();
	}
});


//收藏
$(".myform a:eq(4)").hoverDelay({
	hoverEvent:function(){
			$(".nav-collection").fadeIn();
			$(".nav-collection").prev().css("display","none");
			$(".nav-collection").next().css("display","none");
	},
	outEvent:function(){
			$(".nav-collection").fadeOut();
	}
});

//爱车
$(".myform a:eq(5)").hoverDelay({
	hoverEvent:function(){
			$(".nav-garage").fadeIn();
			$(".nav-garage").prev().css("display","none");
	},
	outEvent:function(){
			$(".nav-garage").fadeOut();
	}
});


//点击一级分类载入二级分类
var categoryOne = new Array();
	categoryOne[0] = "车内部件";
	categoryOne[1] = "车外部件";
	categoryOne[2] = "汽车性能";
	categoryOne[3] = "灯光";
	categoryOne[4] = "车轮";
	categoryOne[5] = "音频";
	categoryOne[6] = "修理";
	categoryOne[7] = "工具";
	
$(document).ready(function(){
	$(".nav-category li").click(function(){
		var num = $(this).index() - 1 ;
		$.cookie("category1","");
		var category1 = $.cookie("category1",categoryOne[num]);
		var a = "http://139.224.133.119:8080/CarStar/rest/goods/showmenu?menu="+ categoryOne[num] +"&startNum=0&pageSize=11";
			$.ajax({
				type:"get",
				contentType:"application/json; charset=utf-8",
				url:a,
				async:true,
				success:function(msg){
					console.log(msg);
					var data1 = msg.data;
					$("#one"+num).children().empty();
					for( var i =0 ; i< data1.length;i++ ){
						$("#one"+num).children().append(
//						" <div class='category-nav'> " +	
						"	<div class='col-md-3 prod_dd_li'>" +
	    		  					" <a  onclick='clickBrand()'> " + " <div class='prod_dd_img'> " +
	    		  					" <img class='img-responsive' src=' img/exhaust.png '/> </div>" +
	    		  					" <div class='prod_dd_span'> " +
	    		  					" <span class='prod_dd_t' >" + data1[i].n2  +  "</span> </div> </a>" +
	    		  				"</div>"
						)}
					},
				error:function(){
					console.log("error");
				}
				
			});
	});
})


//首页分类列表
//function viewListHome(){
//	$.each(categoryOne, function(i,value) {
//		$('.product').append(
//			
//		)
//	});
//}
