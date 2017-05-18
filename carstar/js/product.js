 
 $(document).ready(function(){
 })
 
 //商品数量加减
$(".subNum").click(function(){
	var t = $(this).parent().find("input[class*=text-box]");
	var p = 0;   //单个商品总价
	t.val( parseInt(t.val() )-1 );
	
	if( parseInt(t.val()) < 2){
			t.val(1);
		}
	
		p = t.val() * parseFloat( $(this).parent().prev().find( "span[class*=text-price]" ).text() ) ;
		$( $(this).parent().next().find("span[class*=product-total]") ).html(p.toFixed(2));
		setPriceTotal();
		setNumTotal();
});

$(".addNum").click(function(){
	var t = $(this).parent().find("input[class*=text-box]");		
	var p = 0;
	var n = $('.productnumber').text();
	
	t.val(parseInt(t.val()) + 1) ;
	
	if( parseInt(t.val()) > n ){
		t.val(n);
	}
	
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
//			console.log(p_msg);

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
//			console.log(p_msg);
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
	document.getElementsByClassName("productnumber").item(0).innerHTML = data.number;
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

function insertProductInfo2(data){
	
	if( data.colors.length > 0 ){
		$('.product-sku').append("<dl class='clearfix iteminfo_parameter'> <dt>颜色：</dt> <dd> <ul class='product-color-choose sys_spec_text'></ul> </dd> </dl>");
		$.each(data.colors, function(i,value) {
			$('.product-color-choose').append( "<li data-aid='"+value+"' > <a href='javascript:;'>"+value+"<i></i> </a> </li>" );
		});
	}
	
	if( data.materis.length > 0 ){
		$('.product-sku').append(" <dl class='clearfix iteminfo_parameter'> <dt>材质：</dt> <dd> <ul class='product-maters-choose sys_spec_text'></ul> </dd> </dl>");
		$.each(data.materis, function(i,value){
			$('.product-maters-choose').append( "<li data-aid='"+value+"'> <a href='javascript:;'>"+value+"<i></i> </a> </li>" );
		});
	}

	if( data.sizes.length > 0 ){
		$('.product-sku').append("<dl class='clearfix iteminfo_parameter'> <dt>尺寸：</dt> <dd>  <ul class='product-size-choose sys_spec_text'></ul> </dd> </dl>");
		$.each(data.sizes, function(i,value) {
			$('.product-size-choose').append( "<li data-aid='"+value+"'> <a href='javascript:;'>"+value+"<i></i> </a> </li>" );
		});
	}
	
	//商品规格选择
	$('.iteminfo_parameter').each(function(){
		var i =$(this);
		var p = i.find('ul>li');
		var w = new Array();
		p.click(function(){
			if( !!$(this).hasClass('selected') ){
				$(this).removeClass('selected');
				i.removeAttr('data-attrval');
			}else{
				$(this).addClass('selected').siblings('li').removeClass('selected');
				i.attr('data-attrval',$(this).attr('data-aid') );
				var wa = i.attr('data-attrval');
				w.push(wa);
//				pullPdata(w);
			}
			getTotalprice(data);
		})
	})
	
	
}

function pullPdata(){
//	var a_url = "http://139.224.133.119:8080/CarStar/rest/property/getprinum?goodsid="+pid+"&property="+v[0]+","+v[1];
}

var defaultstats = true;
var defaultstats2 = false;
var v=new Array();
var v1=new Array();
function getTotalprice(data){
	defaultstats2 = true;
	$('.iteminfo_parameter').each(function(){
		var i = $(this);
		var _val = i.attr('data-attrval');
		if(!_val){
			defaultstats = false;
		}else{
			 v.push(_val);
			 defaultstats = true;
//			 console.log(v);
		}
	})
	v1 = v;
	if(defaultstats){ 
		var a_url = "http://139.224.133.119:8080/CarStar/rest/property/getprinum?goodsid="+pid+"&property="+v[0]+","+v[1]+","+v[2];
		$.ajax({
			type:"get",
			url:a_url,
			async:true,
			success:function(msg){
				if( msg.data == null ){
					document.getElementsByClassName("productPriceFont").item(0).innerHTML = "0";
					document.getElementsByClassName("productnumber").item(0).innerHTML = "0";
					document.getElementsByClassName("text-box").item(0).value= "0";
				}else{
					document.getElementsByClassName("productPriceFont").item(0).innerHTML = msg.data[0].pprice;
					document.getElementsByClassName("productnumber").item(0).innerHTML = msg.data[0].pnumber;
					document.getElementsByClassName("text-box").item(0).value= "1";
					v=[]
				}
			}
			
		});
	}
	//商品选择属性清空
	v=[];
}

//加入购物车
function addShopCart1(){
	var userid = $.cookie("userId");
	var num = $('#prodctNum').val();
	if( !defaultstats2 ){
		alert("请选择类型!")
	}else if( !defaultstats ){
		alert("请选择其余类型！");
	}else if( num == 0){
		alert("库存不足！")
	}else{
//		console.log(v1);
		var p_url = "http://139.224.133.119:8080/CarStar/rest/goodscart/cartadd?userid="+userid+"&goodsid="+pid+"&num="+num+"&property="+v1[0]+","+v1[1]+","+v1[2];
		$.ajax({
			type:"get",
			url:p_url,
			async:true,
			success:function(msg){
				alert("加入购物车成功！");
			}
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
