	    //切片轮播
$(function(){
			$('#gellery').transformer({
				__Effects:new Array('Optimus','Ironhide','Scorponok','Megatron','Starscream','Jazz'),	
				__Columns:7,
				__Rows:3,
				__Speed:5000,
				__Title_Height:100,
				__Title_Width:0,
			});
	});
 	
	//店铺轮播图
 $(document).ready(function() {
      $("#owl-demo").owlCarousel({
        navigation : true
      });
    });
    
    
   //获取产品数据  home页面
$(function(){
		$.ajax({
			type:"GET",
			url:"json/product.json",
			data:"json",
			success:function(result){
				addBox(result);
			},
			error:function(){
			}
		});
		$.getJSON("json/product.json",function(data){
			addBox(data);
		});
});
	function addBox(result){
		$.each(result,function(index,obj){
			$(".home-product").append(
			"<div class='col-md-3 col-xs-6'>"+	
			"<img src="+obj['img']+"/>"+
			"<p>"+obj['price']+"</p>" +
			"<p>"+obj['name']+"</p>" + 
			"</div> " );
		});
	}
//$(function(){
//		$.ajax({
//			type:"GET",
//			url:"json/year.json",
//			data:"json",
//			success:function(year){
////				var yearobj = eval( "( "+year+" )" );
//				addYear(year);
//			},
//			error:function(){
//			}
//		});
//	});	
function addYear(year){
	$.each(year,function(index,obj){
		$(".home-year").append(
			"<option>"+obj['year']+"</option>"
		);
		$(".home-brand").append(
			"<option>"+obj['brand']+"</option>"
		);
		$(".home-model").append(
			"<option>"+obj['model']+"</option>"
		);
	});
}

//category.html

$(function(){
		$.ajax({
			type:"GET",
			url:"json/category_one.json",
			data:"json",
			success:function(brand){
//				var yearobj = eval( "( "+year+" )" );
				addBand(brand);
			},
			error:function(){
			}
		});
	});	
function addBand(brand){
	$.each(brand,function(index,obj){
		
		$(".category-brand").append(
			"<div class='col-md-3 col-xs-6'>"+
			"<img src="+obj['category_img']+"/>"+
			"<p class='text-center'>"+obj['brand']+"</p>"+
			"</div>");
	});
}
