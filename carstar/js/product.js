 
 $(document).ready(function(){
 })
 
 //购物车数量加减
$(".subNum").click(function(){
	var t = $(this).parent().find("input[class*=text-box]");
	var p = 0;   //单个商品总价
	t.val( parseInt(t.val() )-1 )
		if( parseInt(t.val()) < 0 ){
			t.val(0);
		}
		p = t.val() * parseFloat( $(this).parent().prev().find( "span[class*=text-price]" ).text() ) ;
		$( $(this).parent().next().find("span[class*=product-total]") ).html(p.toFixed(2));
		setPriceTotal();
		setNumTotal();
});
$(".addNum").click(function(){
	var t = $(this).parent().find("input[class*=text-box]");		
	var p = 0;
	t.val(parseInt(t.val()) +1) ;
	p = t.val() * parseFloat( $(this).parent().prev().find( "span[class*=text-price]" ).text() ) ;
	$( $(this).parent().next().find("span[class*=product-total]") ).html(p.toFixed(2));
	setPriceTotal();
	setNumTotal();
});
//-----------------END
//计算总数量
function setNumTotal(){
	var n  = 0;
	$(".text-box").each(function(){
		
		n += parseInt( $(this).val()  );
//		console.log( n );
	});
	$(".product-num").html(n);
}
//计算总价格
function setPriceTotal(){
	var p = 0;
	$(".product1").each(function(){
		p += parseInt( $(this).find("input[class*=text-box]").val() ) * parseFloat( $(this).find("span[class*=text-price]").text());	
			});
		$(".total-all").html( p.toFixed(2) );
	};
//页面加载完毕执行函数
$(document).ready(function(){
			selectAll();
			setPriceTotal();
			setNumTotal();
			
			var p = 0;
			$(".product1").each(function(){
//				p = parseFloat( $(this).find("span[class*=text-price]").text() );
			p = parseInt( $(this).find("input[class*=text-box]").val() ) * parseFloat( $(this).find("span[class*=text-price]").text());	
			$(this).find("span[class*=product-total]").html( p.toFixed(2) );
//				p += parseInt( $(this).find("input[class*=text-box]").val() ) * parseFloat( $(this).find("span[class*=text-price]").text());
			}); 
			$(".total-all").html( p.toFixed(2) );
		});
//-----------END
 
$(".btnno").click(function(){
	$(".discount-no").slideToggle();
	$(".discount-yes").css("display","none")
});
$(".btnyes").click(function(){
	$(".discount-yes").slideToggle();
	$(".discount-no").css("display","none")
});
//购物车新增地址
$(".add-address").click(function(){
	$(".new-address").slideDown();
	console.log("address");
});
$(".cancel-address").click(function(){
	$(".new-address").slideUp();
});

//购物车全选  取消全选
function selectAll(){
			
			var x = true;
			$("#selectAll").click(function(){
				if(x){
					$(":checkbox").prop("checked",true);
					x = false;
				}else{
					$(":checkbox").prop("checked",false);
					x = true;
				}
			});
			
		};
	
	var thisURL =  document.URL;
	var getVal = thisURL.split('?')[1];
	var pid = getVal.split("=")[1];	
//产品详情 接受产品id和商品信息
function viewProduct(){
//	console.log(pid);
	var p_url1 = "http://139.224.133.119:8080/CarStar/rest/goods/querygoods?goodsid="+pid;
	$.ajax({
		type:"get",
		url:p_url1,
		async:true,
		success:function(p_msg){
			console.log(p_msg);

			detailProduct();
			insertProductInfo1(p_msg.data);
			commentProduct();
			
		}
	});
	
}

function detailProduct(){
	var p_url2 = "http://139.224.133.119:8080/CarStar/rest/property/getprop?goodsid="+pid;
	$.ajax({
		type:"get",
		url:p_url2,
		async:true,
		success:function(p_msg){
			console.log(p_msg);
			insertProductInfo2(p_msg.data);
		}
	});
}

function insertProductInfo1(data){
	document.getElementsByClassName("productPriceFont").item(0).innerHTML = data.price;
	document.getElementsByClassName("font-through").item(0).innerHTML = data.price2;
	document.getElementsByClassName("productName").item(0).innerHTML = data.goodsname;  
	document.getElementsByClassName("productDesc").item(0).innerHTML = data.des;
	document.getElementsByClassName("businessAddress").item(0).innerHTML = data.address;
	document.getElementsByClassName("mailPrice").item(0).innerHTML = data.mailprice;
	document.getElementsByClassName("productBrand").item(0).innerHTML =data.zzs;
	document.getElementsByClassName("productID").item(0).innerHTML = data.goods_id;
	document.getElementsByClassName("shopName").item(0).innerHTML = data.shopname;
	document.getElementsByClassName("productName").item(1).innerHTML = data.goodsname;
	document.getElementsByClassName("productType").item(0).innerHTML = data.des;
	document.getElementsByClassName("productnumber").item(0).innerHTML = data.number+'件';
	document.getElementsByClassName("shopName2").item(0).innerHTML = data.shopname;
	
	
	$('.shopImg').append(
		" <img class='img-responsive' src=' "+data.shopimg+" '  > "
	)

	var starNum = Math.round( data.revlevel );
//	console.log(starNum);
	$('#viewStar').raty( {readOnly:true,score: starNum} );
	var n=getJsonLength(data.service);
	$.each(data.service, function(i,value) {
//		console.log(i,value);
				$('#product-service').append(
					"<span class='productService'>"+value+"</span>"
				)
	});

	
}

var productcolor;
function insertProductInfo2(data){
	console.log(data.colors);
	
	if( data.colors.length > 0 ){
		$('.product-sku').append("<div class='clearfix'> <dt>颜色</dt> <ul class='product-color-choose'></ul> </div>");
		$.each(data.colors, function(i,value) {
			$('.product-color-choose').append( "<li> <a href='javascript:;'> <span class='product-color'>"+value+"</span> </a> </li>" );
		});
	}
	
	if( data.materis.length > 0 ){
		$('.product-sku').append(" <div class='clearfix'> <dt>材质</dt> <ul class='product-maters-choose'></ul> </div>");
		$.each(data.materis, function(i,value){
			$('.product-maters-choose').append( "<li> <a href='javascript:;'><span class='product-color'>"+value+"</span> </a> </li>" );
		});
	}

	if( data.sizes.length > 0 ){
		$('.product-sku').append("<div class='clearfix'> <dt>尺寸</dt> <ul class='product-size-choose'></ul> </div>");
		$.each(data.sizes, function(i,value) {
			$('.product-size-choose').append( "<li> <a href='javascript:;'> <span class='product-color'>"+value+"</span> </a> </li>" );
		});
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


//商品评价
function commentProduct(){
	var a_url = "http://139.224.133.119:8080/CarStar/rest/goodsrev/revinfo?goodsid="+pid+"&startNum=0&pageSize=5";
	$.ajax({
		type:"get",
		url:a_url,
		async:false,
		success:function(msg){
			testStar(msg);
		}
	});
				
}


function testStar(msg){
//$.each(msg.data,function(i){
//	console.log(msg.data.length);
	if( msg.data == null ){
		$('#product-comment').text( "暂无评论！") ;
	}else{
	for(var i=0;i<msg.data.length;i++ ){
				$("#product-comment").append(
					"<div class='row commentDiv'>"+
					" <div class='col-md-2'> " +
						" <img src='img/A8.jpeg'/>" +
						" <div> 用户名：<span class='comment_userid'>"+msg.data[i].userid+"</span> </div>"+
					" </div>"+
					"<div class='col-md-10'>"+
						"<p>评分：<span class='commentStar"+i+" '></span></p>"+
						"<p>内容：<span class='use-comment'>"+msg.data[i].content+"</span></p>"+
						"<p class='commentImg"+i+"'>晒图：</p>"+
						"<p>时间：<span class='commentTime"+i+" '></span></p>"+
					"</div>"+
					"</div>"
				)
				var averageScore = Math.round( (msg.data[i].installation+msg.data[i].pricevalue+msg.data[i].quality+msg.data[i].appearance)/4 );
				$('.commentStar'+i).text(averageScore);
//				$('.commentStar'+i).raty({readOnly:true,score:averageScore});
				//时间戳
				var ctime = new Date( msg.data[i].ctime).toLocaleString();
				$('.commentTime'+i).text(ctime);
//				console.log( msg.data[i].revimg.length);
				//图片
				for(var j=0;j < msg.data[i].revimg.length;j++ ){
				$('.commentImg'+i).append( "<img class='img-responsive commentImg ' src=' "+msg.data[i].revimg[j]+" ' >" )
				}

			}
	}
			//评分
//				var averageScore = Math.round( (msg.data[i].installation+msg.data[i].pricevalue+msg.data[i].quality+msg.data[i].appearance)/4 );
//				jQuery('#commentStar'+i).raty({readOnly:true,score:averageScore});
			
	
}
//加入购物车
function addShopCart(){
	if( productcolor == undefined ){
		alert("请选择颜色!")
	}else{
		var userid = $.cookie("userId");
		var num = $('#prodctNum').val();
		var p_url = "http://139.224.133.119:8080/CarStar/rest/goodscart/cartadd?userid="+userid+"&goodsid="+pid+"&num="+num+"&property="+productcolor;
		$.ajax({
			type:"get",
			url:p_url,
			async:true,
			success:function(msg){
				console.log(msg,productcolor);
				alert("加入购物车成功！");
			}
		});
	}

	
}

//查询购物车数据
function listShopCart(){
	var userid = $.cookie('userId');
	var l_url = "http://139.224.133.119:8080/CarStar/rest/goodscart/getcartinfo?userid="+userid+"&startNum=0&pageSize=133"
	
	$.ajax({
		type:"get",
		url:l_url,
		async:true,
		success:function(msg){
			console.log(msg);
			addShopCart(msg.data);
		}
	});
}

function addShopCart(data){
	console.log(data);
	$.each(data, function(i) {
		//遍历店铺
			$('.shopCart').append(
				  "<div class='row' style='border-bottom:1px solid #E3E3E3;padding-bottom:10px;'> " +
				  "<div class='col-md-1 shopName3'> <input type='checkbox' /> </div>"+
				 	 " <div class='col-md-1 shopCartStoreImg'><img class='' src=' "+ data[i].shopimg+" ' width='70' height='40'> </div>"+  
				  "	<div class='col-md-1 shopName3'> <span> "+data[i].shopname+"</span> </div> </div>"
			)
		//遍历商品	
		$.each(data.goods,function(i){
			
		});
	});
	
}
