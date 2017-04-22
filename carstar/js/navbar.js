
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
		var garage_w1 = $(".myform a:eq(4)").width();
		
		var nav_garage = new Object();
		nav_garage.top = parseInt( $(".myform a:eq(4)").offset().top + $(".myform img:eq(4)").width() );
		nav_garage.left = parseInt( $(".myform a:eq(4)").offset().left - (garage_w/2) + (garage_w1 / 2)  )   ;
		$(".nav-garage").css("left",nav_garage.left );
		
		//collection
		var nav_collection = new Object();
		var collection_w = $(".nav-collection").width();
		var collection_w1 = $(".myform a:eq(5)").width();
		
		var nav_collection = new Object();
		nav_collection.top = parseInt( $(".myform a:eq(5)").offset().top + $(".myform img:eq(5)").width() );
		nav_collection.left = parseInt( $(".myform a:eq(5)").offset().left - (collection_w/2) )   ;
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


$(".myform a:eq(3)").hoverDelay({
	hoverEvent:function(){
			$(".nav-personal").fadeIn();
			$(".nav-personal").next().css("display","none");
	},
	outEvent:function(){
			$(".nav-personal").fadeOut();
	}
});


$(".myform a:eq(4)").hoverDelay({
	hoverEvent:function(){
			$(".nav-garage").fadeIn();
			$(".nav-garage").prev().css("display","none");
			$(".nav-garage").next().css("display","none");
	},
	outEvent:function(){
			$(".nav-garage").fadeOut();
	}
});

$(".myform a:eq(5)").hoverDelay({
	hoverEvent:function(){
			$(".nav-collection").fadeIn();
			$(".nav-collection").prev().css("display","none");
	},
	outEvent:function(){
			$(".nav-collection").fadeOut();
	}
});




