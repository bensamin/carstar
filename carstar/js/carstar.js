$(document).ready(function(){
	//星星
	var z=5;
	$('.price2 li span').each(function(){
		$(this).raty({ readOnly:true,score: z} );
		z--;
	})
	priceSort();
	startRank();
	buyMouseHover();
})

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
	}

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

//五级分类的检索
function searchCar(){
	$.fn.serializeObject = function()  
		{  
		  var o = {};  
		  var a = this.serializeArray();  
			  $.each(a, function() {  
			     if (o[this.name]) {  
			         if (!o[this.name].push) {  
			             o[this.name] = [o[this.name]];  
			         }  
			         o[this.name].push(this.value || '');  
			     } else {  
			         o[this.name] = this.value || '';  
			      }  
		});  
	  return o;  
	};
			
	infoJson = $("#home_carInfo").serializeObject();
	infoJson =  JSON.stringify(infoJson);
	infoJson = eval( "(" +infoJson +")" );
	
	window.location.href = encodeURI( "fivesearch.html?year="+infoJson.year+"&make_name="+infoJson.make_name+"&model_name="+infoJson.model_name+"&output="+infoJson.output+"&type="+infoJson.type);

}
//车型搜索结果展示
function fivesearch(){
	var request = new Object();
	request = GetRequest();
	var year = request['year'];
	var make_name =request['make_name'];
	var model_name = request['model_name'];
	var output = request['output'];
	var type = decodeURI ( request['type'] );
	console.log(year,make_name,model_name,output,type );
	
	car_url = "http://139.224.133.119:8080/CarStar/rest/querygoods/allgoods?price1=1&price2=150&startNum=0&pageSize=10&shop=all&a1="+year+"&a2="+make_name+"&a3="+model_name+"&a4="+output+"&a5="+type+"&b1=all&b2=all&b3=all&brand=all&level=all"
	$.ajax({
		type:"get",
		url:car_url,
		async:true,
		success:function(data){
			console.log(data);
			searchProduct(data);
		}
	});
}

function searchCar1(){
	$.fn.serializeObject = function()  
		{  
		  var o = {};  
		  var a = this.serializeArray();  
			  $.each(a, function() {  
			     if (o[this.name]) {  
			         if (!o[this.name].push) {  
			             o[this.name] = [o[this.name]];  
			         }  
			         o[this.name].push(this.value || '');  
			     } else {  
			         o[this.name] = this.value || '';  
			      }  
		});  
	  return o;  
	};
			
	infoJson = $("#home_carInfo1").serializeObject();
	infoJson =  JSON.stringify(infoJson);
	infoJson = eval( "(" +infoJson +")" );
	
	window.location.href = encodeURI( "fivesearch.html?year="+infoJson.year+"&make_name="+infoJson.make_name+"&model_name="+infoJson.model_name+"&output="+infoJson.output+"&type="+infoJson.type);

}
//车型搜索结果展示
function fivesearch(){
	var request = new Object();
	request = GetRequest();
	var year = request['year'];
	var make_name =request['make_name'];
	var model_name = request['model_name'];
	var output = request['output'];
	var type = decodeURI ( request['type'] );
	console.log(year,make_name,model_name,output,type );
	
	car_url = "http://139.224.133.119:8080/CarStar/rest/querygoods/allgoods?price1=1&price2=10000&startNum=0&pageSize=10&shop=all&a1="+year+"&a2="+make_name+"&a3="+model_name+"&a4="+output+"&a5="+type+"&b1=all&b2=all&b3=all&brand=all&level=9"
	$.ajax({
		type:"get",
		url:car_url,
		async:true,
		success:function(data){
			console.log(data);
			searchProduct(data);
		}
	});
}

//category.html
function addBand(){
	$.ajax({
			type:"GET",
			url:"json/category_one.json",
			data:"json",
			success:function(brand){
				$.each(brand,function(index,obj){
					$(".category-brand").append(
						"<div class='col-md-3 col-xs-6'>"+
						"<img src="+obj['category_img']+"/>"+
						"<p class='text-center'>"+obj['brand']+"</p>"+
						"</div>");
				});
			}
		});
}



//获取搜索值并将其传递给search页面
function changeResult(){
	var goods = $(".search-value").val();
	console.log(goods);
	window.location.href = encodeURI( "search.html?goods="+goods );
}

//搜索结果的展示
function searchResult(){
	var thisURL = document.URL;
	var getVal = thisURL.split('?')[1];
	var goods = getVal.split("=")[1];
	console.log( decodeURI( goods ) );
	var search_url = "http://139.224.133.119:8080/CarStar/rest/goods/showgoods?goods="+goods+"&shop=all&startNum=0&pageSize=4";
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
//搜索结果产品插入
function searchProduct(data){
	pro = data.data;
	$.each(pro, function(i) {
						$(".searchResult").append(
						" <a href='product.html?goodsid=" +pro[i].id+ " '> <div class='row' style='margin:20px auto'>"+
						" <div class='col-md-3'> <img class='img-responsive' src=' " + pro[i].img1 + " ' /> </div> " +
							" <div class='col-md-5 text-left'>" +
								" <p style='color:#666'> " + pro[i].brand + " </p> " + 
								" <p style='color:#666'> " +pro[i].name + "  </p> " +
								" <span class='search_star"+i+"'></span> " +
								" <p style='color:#666'> " + pro[i].des1 + " </p> " + 
							"</div>" +
							" <div class='col-md-3'> " +
								" <span style='color:#f80000;'>¥</span> "+
								" <span style='color:#f80000; font-size:1.8rem;'> " + pro[i].price +"</span> <p></p>" +
								" <span class='category-product-list-buy'> 立即购买 </span> " +
						 	"</div> "+
							"</div>"+
						"</a> "
						)
						//产品的评论星级		
						var star_n = Math.round( pro[i].revlevel );
						$('.search_star'+i).raty({
							readOnly:true,
							score: star_n
						})
				});
}

//三级分类的展示
function clickBrand(){
	$(".prod_dd_li").unbind("click").click(function(){
		console.log( $(this).val() ); 
		var menu = $.cookie("category1");
		var brand = $(this).find("span").text();
		window.location.href = encodeURI("brand.html?menu="+menu+"&brand="+brand);
	});	
}

function onloadBrand(){
		var request = new Object();
		request = GetRequest();
		var menu = request['menu'];
		var brand = request['brand'];
		//种类
		var a = "http://139.224.133.119:8080/CarStar/rest/goods/showmenu?menu="+brand+"&startNum=0&pageSize=510";
		$.ajax({
			type:"get",
			contentType:"application/json; charset=utf-8",
			url:a,
			async:false,
			success:function(data){
				console.log("种类：",data);
				addBrand(brand,data);
			},
			error:function(){
				console.log("error");
			}
			
		});
		
		//产品
		var b = "http://139.224.133.119:8080/CarStar/rest/querygoods/allgoods?price1=1&price2=10000&startNum=0&pageSize=10&shop=all&a1=all&a2=all&a3=all&a4=all&a5=all&b1="+menu+"&b2="+brand+"&b3=all&brand=all&level=9&";
		$.ajax({
			type:"get",
			contentType:"application/json; charset=utf-8",
			url:b,
			async:false,
			success:function(data){
				console.log("产品：",data);
				addBrandProduct(data.data);
			},
			error:function(){
				console.log("error");
			}
			
		});
}

//三级分类的那些产品们
function onloadCategory(){
		addBand();
		var request = new Object();
		request = GetRequest();
		var category = request['category'];
		var a = "http://139.224.133.119:8080/CarStar/rest/querygoods/allgoods?price1=1&price2=1000000&startNum=0&pageSize=10&shop=all&a1=all&a2=all&a3=all&a4=all&a5=all&b1=all&b2=all&b3="+category+"&brand=all&level=9&";
		$.ajax({
			type:"get",
			contentType:"application/json; charset=utf-8",
			url:a,
			async:true,
			success:function(data){
				console.log(data);
				addBrandProduct(data.data);
			},
			error:function(){
				console.log("error");
			}
			
		});
}

//种类遍历
function addBrand(brand,data){
	var brands = data.data;
	$.each(brands, function(i) {
		if ( data.code == 1 ){
			document.getElementsByClassName("addBrand_append").item(0).innerHTML = decodeURI( brand ) + "无结果";
			return false;
		}else{
				$(".addBrand_append").append(
					" <a href='category.html?menu="+brands[i].n1+"&brand="+brands[i].n2+"&category="+brands[i].n3+"'> <div class='col-xs-2' > " +
					" <img class='img-responsive' src=' " + brands[i].m3 + "  '  > "  +
					" <p class='text-center'> " +  
					" <span>" + brands[i].n3 + "</span> "+
					" </p> " +
					"</div> </a>"
				)
				return true;
			}
		});
//		BrandProduct();
}



//产品遍历
function addBrandProduct(data){
	var n = getJsonLength(data) ;  // 获取json数组的长度
	for( var i=0;i<n;i++ ){
		$(".category-product").append(
			"  <a href='product.html?goodsid=" +data[i].id+ " '> <div class='col-md-4 col-xs-6 ccategory-product-list-four text-left'>" +
			" <img src='img/custom-floor-mats_ic_5.jpeg'/> " +
			" <p> " + data[i].name + " </p> " +
			" <p> "  + data[i].des1+ " </p> " +
			" <span class='brand_star"+i+"'></span>" +
			" <div class='brand-price'> <span class='productPriceColor'>¥</span> " +
			" <span class='productPriceColor'> " + data[i].price + " </span></div>  " +	
			" <span class='category-product-list-buy'>立即购买</span> " +
	 		"</div> </a>"
		)
			//产品的评论星级		
			var star_n = Math.round( data[i].revlevel );
			$('.brand_star'+i).raty({
				readOnly:true,
				score: star_n
			})
			//跳转产品详情
			$(".ccategory-product-list-four").click(function(){
			window.location.href = encodeURI(  "product.html?goodsid=" +  data[i].goods_id  );
		
	})
 }	
}
//获取json数组长度
function getJsonLength(JsonData){
	var jsonLength = 0;
	for( var item in JsonData ){
		jsonLength++;
	}
	return jsonLength;
}

//购买按钮鼠标滑过变色
function buyMouseHover(){
	 $(".category-product-list-buy").mouseenter(function(){
		$(this).css("background-color","#0E9939");
		$(this).css("color","#ffffff");
	});
						
	$(".category-product-list-buy").mouseleave(function(){
		$(this).css("background-color","#e4e5e6");
		$(this).css("color","#999999");
	});	 
}

//brand.html价格筛选-----调试出现事件重复注册的问题，用unbind去除重复点击就OK了
function priceSort(){
	$(".price1 li").unbind("click").click(function(){
		var sort = $(this).find("span").text();
		sort = sort.split("-");
		//获取URL中的内容
		var request = new Object();
		request = GetRequest();
		var menu = request['menu'];
		var brand = request['brand'];
		var category = request['category'];
		var goods = request['goods'];
		
		console.log(sort[0],sort[1]);
		$(".category-product").empty();
		
	
		var a_url = "http://139.224.133.119:8080/CarStar/rest/querygoods/allgoods?price1="+sort[0]+"&price2="+sort[1]+"&startNum=0&pageSize=10&shop=all&a1=all&a2=all&a3=all&a4=all&a5=all&b1="+menu+"&b2="+brand+"&b3=all&brand=all&level=9";
	 	//获取价格区间的产品  -------brand.html页面
	 	$.ajax({
			type:"get",
			contentType:"application/json; charset=utf-8",
			url:a_url,
			async:true,
			success:function(data){
				console.log(data);
				addBrandProduct(data.data);
			},
			error:function(){
				console.log("error");
			}
			
		});
		
	 	//获取价格区间的产品  -------category.html页面
		var b_url = "http://139.224.133.119:8080/CarStar/rest/querygoods/allgoods?price1="+sort[0]+"&price2="+sort[1]+"&startNum=0&pageSize=10&shop=all&a1=all&a2=all&a3=all&a4=all&a5=all&b1="+menu+"&b2="+brand+"&b3="+category+"&brand=all&level=9";
		$.ajax({
			type:"get",
			contentType:"application/json; charset=utf-8",
			url:b_url,
			async:true,
			success:function(data){
//				console.log(data);
				addBrandProduct(data.data);
			},
			error:function(){
				console.log("error");
			}
			
		});
		
		//获取价格区间的产品  -------search.html页面
//		var b_url = "http://139.224.133.119:8080/CarStar/rest/querygoods/allgoods?price1="+sort[0]+"&price2="+sort[1]+"&startNum=0&pageSize=10&shop=all&a1=all&a2=all&a3=all&a4=all&a5=all&b1="+menu+"&b2="+brand+"&b3="+category+"&brand=all&level=all&";
//		$.ajax({
//			type:"get",
//			contentType:"application/json; charset=utf-8",
//			url:b_url,
//			async:true,
//			success:function(data){
//			},
//			error:function(){
//				console.log("error");
//			}
//			
//		});
	});		
}

//星级筛选
function startRank(){
	$(".price2 li").unbind("click").click(function(){
		var sort = $(this).find("span").attr('data-bStar');
		var sortc = $(this).find("span").attr('data-cStar');
		var request = new Object();
		request = GetRequest();
		var menu = request['menu'];
		var brand = request['brand'];
		var category = request['category'];
		console.log(sort,sortc);
		$(".category-product").empty();
	
		var a_url = "http://139.224.133.119:8080/CarStar/rest/querygoods/allgoods?price1=0&price2=1000001&startNum=0&pageSize=10&shop=all&a1=all&a2=all&a3=all&a4=all&a5=all&b1="+menu+"&b2="+brand+"&b3=all&brand=all&level=";
	 	//获取价格区间的产品  -------brand.html页面
	 	$.ajax({
			type:"get",
			contentType:"application/json; charset=utf-8",
			url:a_url+sort,
			async:true,
			success:function(data){
				console.log(data);
				addBrandProduct(data.data);
			},
			error:function(){
				console.log("error");
			}
			
		});
		
	 	//获取评价星级区间的产品  -------category.html页面
		var b_url = "http://139.224.133.119:8080/CarStar/rest/querygoods/allgoods?price1=0&price2=100000&startNum=0&pageSize=10&shop=all&a1=all&a2=all&a3=all&a4=all&a5=all&b1="+menu+"&b2="+brand+"&b3="+category+"&brand=all&level=";
		$.ajax({
			type:"get",
			contentType:"application/json; charset=utf-8",
			url:b_url+sortc,
			async:true,
			success:function(data){
				console.log(data);
				addBrandProduct(data.data);
			},
			error:function(){
				console.log("error");
			}
			
		});
		
		
		//多种筛选
	});		
}
