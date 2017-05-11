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
			"<div>"+obj['category']+"</div>" +
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



//获取搜索值并将其传递给search页面
function changeResult(){
	var goods = $(".search-value").val();
	console.log(goods);
	window.location.href = "search.html?goods="+goods;
}

//搜索结果的展示
function searchResult(){
	var thisURL = document.URL;
	var getVal = thisURL.split('?')[1];
	var goods = getVal.split("=")[1];
	console.log(goods);
	var search_url = "http://192.168.1.106:8080/CarStar/rest/goods/showgoods?goods="+goods+"&shop=all&startNum=0&pageSize=4";
	$.ajax({
		type:"get",
		contentType:"application/json; charset=utf-8",
		url:search_url,
		async:false,
		success:function(data){
			//产品搜索结果插入
			searchProduct(data);
		}
	});
}

var pro = {};
//产品插入
function searchProduct(data){
	console.log(data);
	pro = data.data;
	console.log(pro);
	var i = 0;
	$.each(pro, function() {
					console.log( pro[i] );
						$(".searchResult").append(
						" <a href='product.html'> <div class='row' style='margin:20px auto'>"+
						" <div class='col-md-3'> <img class='img-responsive' src=' " + pro[0].img1 + " ' /> </div> " +
							" <div class='col-md-5 text-left'>" +
								" <p style='color:#666'> " + pro[0].b + " </p> " + 
								" <p style='color:#666'> " +pro[0].name + "  </p> " +
								" <span class='glyphicon glyphicon-star' style='color:#F7ECB5;'></span> " +
								" <span class='glyphicon glyphicon-star' style='color:#F7ECB5;'></span> " +
								" <span class='glyphicon glyphicon-star' style='color:#F7ECB5;'></span> " +
								" <span class='glyphicon glyphicon-star' style='color:#F7ECB5;'></span> " +
								" <span class='glyphicon glyphicon-star' style='color:#F7ECB5;'></span> " +
								" <p style='color:#666'> " + pro[0].des1 + " </p> " + 
							"</div>" +
							" <div class='col-md-3'> " +
								" <span style='color:#f80000;'>¥</span> "+
								" <span style='color:#f80000; font-size:1.8rem;'> " + pro[0].price +"</span> <p></p>" +
								" <span class='category-product-list-buy'> 立即购买 </span> " +
						 	"</div> "+
							"</div>"+
						"</a> "
						)
					i++;
				});
}

//三级分类的展示
function clickBrand(){
	$(".prod_dd_li").unbind("click").click(function(){
		console.log( $(this).index() ); 
		var brand = $(this).find("span").text();
		window.location.href = "brand.html?menu=" + brand;
	});	
}

function onloadBrand(){
		var thisURL = document.URL;
		var getVal = thisURL.split('?')[1];
		var brand = getVal.split("=")[1];
		console.log(brand);
		var a = "http://192.168.1.106:8080/CarStar/rest/goods/showmenu?menu="+brand+"&startNum=0&pageSize=510";
		$.ajax({
			type:"get",
			contentType:"application/json; charset=utf-8",
			url:a,
			async:false,
			success:function(data){
				console.log(data);
				addBrand(brand,data);
			},
			error:function(){
				console.log("error");
			}
			
		});
}


function addBrand(brand,data){
	var brands = data.data;
	console.log(brands);
	$.each(brands, function(i) {
		if ( brands[i].n3 == undefined ){
			document.getElementById("addBrand_append").innerHTML = brand + "无结果";
			return false;
		}else{
				$("#addBrand_append").append(
					" <div class='col-xs-2' > " +
					" <a > " + " <img class='img-responsive' src=' " + brands[i].m3 + "  '  > "  +
					" <p class='text-center'> " + 
					" <span>" + brands[i].n3 + "</span> "+
					" </p> " +
					" </a> " +
					"</div> "
				)
				return true;
			}
		});
}
