
 
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
	
//产品详情 接受产品id和商品信息
function viewProduct(){
//	console.log(pid);
	var pid = XXURL();
	var p_url1 = "http://139.224.133.119:8080/CarStar/rest/goods/querygoods?goodsid="+pid;
	$.ajax({
		type:"get",
		url:p_url1,
		async:true,
		success:function(p_msg){
			detailProduct();
			insertProductInfo1(p_msg.data);
			commentProduct();
			
		}
	});
	
}

//显示商品评价
function detailProduct(){
	var pid = XXURL();
	var p_url2 = "http://139.224.133.119:8080/CarStar/rest/property/getprop?goodsid="+pid;
	$.ajax({
		type:"get",
		url:p_url2,
		async:true,
		success:function(p_msg){
//			console.log(p_msg);
			insertProductInfo2(p_msg.data);  //评价
		}
	});
}


//评价
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
	$('.shop_fuck').append(
		"<a href='shop.html?shopid="+data.shopid+"'>进入店铺</a>"
		)
	
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

var defaultstats = true;
var defaultstats2 = false;
var v=new Array();
var v1=[];
function getTotalprice(data){
	var pid = XXURL();
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
	v1 = [{
		"color":v[0],
		"materis":v[1],
		"size":v[2]
	}];
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
					document.getElementsByClassName("text1-box").item(0).value= "0";
				}else{
					document.getElementsByClassName("productPriceFont").item(0).innerHTML = msg.data[0].pprice;
					document.getElementsByClassName("productnumber").item(0).innerHTML = msg.data[0].pnumber;
					document.getElementsByClassName("text1-box").item(0).value= "1";
					v=[]
				}
			}
			
		});
	}
	//商品选择属性清空
	v=[];
}

//加入订单
function productAddOrder(){
	var pid = XXURL();   //商品id
	var userid = $.cookie("userId");   //用户id
	var num = $('#prodctNum').val();   //商品数量
	var price1 = $('.productPriceFont').text();
	var infostr =  {pid,userid,num,price1,} ;
	console.log( typeof(v1),typeof(infostr) );
//	v1.push( infostr );
//	console.log(v1[0].color);

	if( !defaultstats2 ){
		alert("请选择类型!")
	}else if( !defaultstats ){
		alert("请选择其余类型！");
	}else if( num == 0){
		alert("库存不足！")
	}else{
				window.location.href = "order.html?pid="+pid+"&userid="+userid+"&num="+num+"&property="+v1[0].color+","+v1[0].materis+","+v1[0].size+"&price="+price1;
	}
}

//立即购买订单页面----先生成订单----在付款
function order_Now(){
	var request = new Object();
		request = GetRequest();
		var pid = request['pid'];
		var userid = request['userid'];
		var num = request['num'];
		var property = request['property'];
		var price = request['price'];
		$('.order_pTotal').text( price * num );

		var b_url = "http://139.224.133.119:8080/CarStar/rest/goods/querygoods?goodsid="+pid;
		
		$.ajax({
			type:"get",
			url:b_url,
			async:true,
			success:function(msg){
				$('.order_pName').text(msg.data.goodsname) ;
				$('.order_pPrice').text(price) ;
				$('.order_pDesc').text(msg.data.des) ;
				$('.oder_pNumber').text(num) ;
				$('.order_pPar').text(property) ;
				$('.order_pService').text(msg.data.service.service0+","+msg.data.service.service1+","+msg.data.service.service2) ;
				if( msg.data.mailprice > 0 ){
					$('.order_pMail').text(msg.data.mailprice) ;
				}else{
					$('.order_pMail').text("免运费") ;
				}
			}
		});
		
}

//提交订单，将订单的信息更新到后台同时，返回值中有订单号oi;
function orderSubmit(){
	var request = new Object();
		request = GetRequest();
		var pid = request['pid'];
		var userid = request['userid'];
		var num = request['num'];
		var property = request['property'];
		var price = request['price'];
		var msg = $('.order_pMsg').val();
		var a_url ="http://139.224.133.119:8080/CarStar/rest/goodsorder/orderadd?goodsid="+pid+"&userid="+userid+"&addrid=1&num="+num+"&property="+property+"&sell_ser=1&mail=1&message="+msg+"&price="+price;
		$.ajax({
			type:"get",
			url:a_url,
			async:true,
			success:function(data){
//				console.log(data.data.orderids);
//					orderPay(data.data.orderids);     //支付函数
					window.location.href = "pay.html?oid="+data.data.orderids;
			}
		});
}


//付款成功


//加入购物车
function addShopCart1(){
	var pid = XXURL();
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
	var pid = XXURL();
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
	if( msg.data == null ){
		$('#product-comment').text( "暂无评论！") ;
	}else{
	for(var i=0;i<msg.data.length;i++ ){
		var averageScore = Math.round( (msg.data[i].installation+msg.data[i].pricevalue+msg.data[i].quality+msg.data[i].appearance)/4 );
				$("#product-comment").append(
					"<div class='row commentDiv'>"+
					" <div class='col-md-2'> " +
						" <img src='img/A8.jpeg'/>" +
						" <div> 用户名：<span class='comment_userid'>"+msg.data[i].userid+"</span> </div>"+
					" </div>"+
					"<div class='col-md-10'>"+
						"<p>评分：<span class='commentStar"+i+"' data-score='"+averageScore+"'></span></p>"+
						"<p>内容：<span class='use-comment'>"+msg.data[i].content+"</span></p>"+
						"<p class='commentImg"+i+"'>晒图：</p>"+
						"<p>时间：<span class='commentTime"+i+" '></span></p>"+
					"</div>"+
					"</div>"
				)

//				$('.commentStar'+i).raty({
//					readOnly:true,
//					score:function(){
//						return $(this).attr('data-score');
//						}
//				});
				$('.commentStar'+i).text(averageScore);
				//时间戳
				var ctime = new Date( msg.data[i].ctime).toLocaleString();
				$('.commentTime'+i).text(ctime);
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
			addShopCart(msg.data);
		}
	});
}

function addShopCart(data){
//	console.log(data);
	$.each(data, function(i) {
		//遍历店铺
			$('.shopCart').append(
				  "<div class='shopCarta"+i+"'>" +
					  "<div class='row' style='border-bottom:1px solid #E3E3E3;padding-bottom:10px;'> " +
						  "<div class='col-md-1 shopName3'> <input type='checkbox' onclick='selectshopName(shopBox"+i+")' class='shopBox"+i+"' name='cartCheckBox'/> </div>"+
						 	 " <div class='col-md-1 shopCartStoreImg'><img class='' src=' "+ data[i].shopimg+" ' width='70' height='40'> </div>"+  
						  "	<div class='col-md-3 shopName3'> 店铺：<span> "+data[i].shopname+"</span> </div>"+
					  " </div> <div class='shopCarts'></div>"+
				  "</div>"
			)
			var pgoods = data[i].goods;
			//遍历商品	
			$.each(pgoods,function(i){
				$('.shopCarts').append(
					"<div class='row products' id='product"+i+"' data-pid='"+pgoods[i].orderid+"' >" +
						"<div class='col-md-4 col-xs-4'>" +
							"<input type='checkbox' name='cartCheckBox' onclick='just()' />"+
							"<div class='row'>"+
								"<div class='col-md-1'></div>"+
								"<div class='col-md-4'>"+
									"<img src='img/small-product.png'>"+
								"</div>"+
								"<div class='col-md-7'>"+
									"<p>"+pgoods[i].goodsname+"</p>"+
									"<p>"+pgoods[i].goodsdes+"</p>"+
								"</div>"+
							"</div>"+
						"</div>"+
						"<div class='col-md-2 col-xs-1'>"+
							"<span>"+pgoods[i].property+"</span>"+
						"</div>"+
						"<div class='col-md-1 col-xs-2'>"+
							"<span>¥</span>"+
							"<span class='text-price'>"+pgoods[i].price+"</span>"+
						"</div>"+
						"<div class='col-md-2 col-xs-2'>"+
							"<i class='disBlue subNum' onclick='changesumPnum(Pnum"+i+")'>-</i>"+
							"<input type='text' id=Pnum"+i+" class='text-box' value='"+pgoods[i].num+"' />"+
							"<i class='disBlue addNum' onclick='changeaddPnum(Pnum"+i+")'>+</i>"+
						"</div>"+
						"<div class='col-md-1 col-xs-2'>"+
							"<span style='color: red;'>¥</span> <span class='product-total' style='color: red;'></span>"+ //金额
						"</div>"+
						"<div class='col-md-1 col-xs-1'>"+
							"<a href='javascript:deleteCartp(product"+i+");'>删除</a>"+
						"</div>"+
					"</div>"	
				)
			});
	});
	testReady();
}

//商品详情数量加减
function sumNum(){
	var t =$('.text1-box');
	var p = 0;   //单个商品总价
	t.val( parseInt(t.val() )-1 );
	
	if( parseInt(t.val()) < 2){
			t.val(1);
		}
}

function addNum() {
	var t = $('.text1-box');	
	var n = $('.productnumber').text();
	t.val(parseInt(t.val()) + 1) ;
	if( parseInt(t.val()) > n ){
		t.val(n);
	}
}

//购物车更新数量
function changesumPnum(PnumId){
	var pnumId = $(PnumId);
	var cartId = pnumId.parent().parent().attr("data-pid");
	var newNum;
		if( pnumId.val() <=1 ){
			alert(" 商品数量必须大于0！")
			return false;
		}else{
			newNum= parseInt(pnumId.val() )-1
			pnumId.val( newNum );
			
			//更新到后台
			$.ajax({
				type:"get",
				url:"http://139.224.133.119:8080/CarStar/rest/goodscart/modifynum?cartid="+cartId+"&num="+newNum,
				async:false,
				success:function(msg){
				}
			});
		}
		//价格更新
		var priceId = pnumId.parent().prev().find('.text-price').text();
		var totalId = pnumId.parent().next().find('.product-total');
		totalId.text( priceId * newNum );
		setNumTotal();
		setPriceTotal();
}

function changeaddPnum(PnumId){
	var pnumId = $(PnumId);
	var cartId = pnumId.parent().parent().attr("data-pid");
	var newNum = parseInt(pnumId.val() )+1;
	pnumId.val( newNum );
	
	//价格更新
		var priceId = pnumId.parent().prev().find('.text-price').text();
		var totalId = pnumId.parent().next().find('.product-total');
		totalId.text( priceId * newNum );
		
			$.ajax({
				type:"get",
				url:"http://139.224.133.119:8080/CarStar/rest/goodscart/modifynum?cartid="+cartId+"&num="+newNum,
				async:false,
				success:function(msg){
				}
			});
	setNumTotal();
	setPriceTotal();		
}

function setNumTotal(){
	var n  = 0;
	$(".text-box").each(function(){
		n += parseInt( $(this).val()  );
	});
	$(".product-num").html("0");
	$(".total-all").html( "0.00" );
}

function setPriceTotal(){
			var p = 0;
			var p_all = 0;
			
			//单个商品价格的更新
			$(".products").each(function(){
					p =  parseInt( $(this).find("input[class*=text-box]").val() ) * parseFloat( $(this).find("span[class*=text-price]").text());	
					$(this).find("span[class*=product-total]").html( p.toFixed(2) );
					p_all += p;
			}); 
}

function just(){
	var p=0,n=0,n1=0,p_all=0;
	$('.products').each(function(){
				if ( $(this).find("input[type=checkbox]").prop('checked') ){
						p =  parseInt( $(this).find("input[class*=text-box]").val() ) * parseFloat( $(this).find("span[class*=text-price]").text());	
						n =  parseInt( $(this).find("input[class*=text-box]").val() );
						p_all += p;
						n1 += n;
						console.log(n);
					}
				$(".total-all").html( p_all.toFixed(2) );	
				$(".product-num").html(n1);

		});
}

//页面加载完毕计算价格
function testReady(){
			changesumPnum();   //计算数量
			changeaddPnum();
			setPriceTotal();  //
			setNumTotal();
}
//-----------END

//店铺选择
function selectshopName(shopcartid){
//	var a = $(shopcartid);
//	a.find("input[type=checkbox]").checked = $(shopcartid).checked;
////	deletesCrtp();
//	testReady();
}

/*复选框全选或全不选效果*/
function selectAll(){
	var oInput=document.getElementsByName("cartCheckBox");
	 for (var i=0;i<oInput.length;i++){
 	    oInput[i].checked=document.getElementById("SlectAllCbx1").checked;
	}
}

//单个删除购物车商品
function  deleteCartp(productid){
	var Index=$(productid);
	var cartid = Index.attr("data-pid");
	Index.remove();    //删除物品所在的div
//	$(".poducts").deleteRow(Index-1);
		$.ajax({
			type:"get",
			url:"http://192.168.1.106:8080/CarStar/rest/goodscart/removecart?cartids="+cartid,
			async:true,
			success:function(msg){
				console.log(msg);
			}
		});
	testReady();
}

//批量删除
function deletesCrtp(){
	var oInput=document.getElementsByName("cartCheckBox");
	var cartids = [];
	$(":checked").each(function(){
		var m = $(this).parent().parent().attr("data-pid");
		$(this).parent().parent().remove();
		cartids.push(m);
	});
	console.log(cartids,cartids[0],cartids.length);
	
	//批量删除
	var push_url = "http://139.224.133.119:8080/CarStar/rest/goodscart/removecart?cartids="+cartids;
	$.ajax({
		type:"get",
		url:push_url,
		async:true,
		success:function(msg){
			console.log(msg);
		}
	});
	testReady();
}

//购物车搜索
function searchShopcart(){
	var text = $('.search-shopcart_input').val();
	var userid = $.cookie("userId");
	
	$.ajax({
		type:"get",
		url:"http://139.224.133.119:8080/CarStar/rest/goodscart/findcart?userid="+userid+"&goodsname="+text,
		async:true,
		success:function(msg){
			console.log(msg);
			$('.shopCart').empty();
			addShopCart(msg.data);
		}
	});
}
 
//购物车提交订单
function submitCartOrder(){
	var jsonstr = {"addrid":"1","shops":[{"goods":[{"cartid":"5"}],"sellser":"售后,免费退换","message":"留言","mail":"快递"}]};
	$('.products').each(function(){
				if ( $(this).find("input[type=checkbox]").prop('checked') ){
						var cartid = $(this).attr('data-pid');
						arr = { "cartid":cartid }
						jsonstr.shops[0].goods.push(arr);

					}
		});
		jsonstr = JSON.stringify(jsonstr);
		var a_url = "http://139.224.133.119:8080/CarStar/rest/goodscart/paycart";
						
						$.ajax({
							cache:true,
							type:"post",
							contentType: "application/json; charset=utf-8",
							url:a_url,
							data:jsonstr,
				   			dataType:"json",
				   			async:false,
							success:function(msg){
								console.log(msg);
							}
			});					
}

//订单列表接口
function viewListOrder(){
	var b = $.cookie("userId");
	var a_url = "http://139.224.133.119:8080/CarStar/rest/goodsorder/orderlist?userid="+b+"&goodsname=all&startNum=0&pageSize=99&type=0";
	$.ajax({
		type:"get",
		url:a_url,
		async:true,
		success:function(msg){
			console.log(msg);
			personalAppend(msg.data);
		}
	});
}

//遍历全部订单
function personalAppend(data){
	
	$.each(data,function(i) {
		
		switch( data[i].type ){
			case -1:
					data[i].type = "交易关闭";
									$(".person_order").append(
											"<div class='row' id='order"+i+"' data-oid='"+data[i].id+"'>"+
													"<div class='col-md-0.1'>"+
														"<input type='checkbox' />"+
													"</div>"+
													"<div class='col-md-1'>"+
														"<a href='product.html'> <img class='img-responsive' src='img/small-product.png'/> </a>"+
													"</div>"+
													"<div class='col-md-3'>"+
														"<p>"+data[i].goodsname+"</p>"+
														"<p>"+data[i].goodsdesc+"</p>"+
													"</div>"+
													"<div class='col-md-1'>"+
														"<span>"+data[i].number+"</span>"+
													"</div>"+
													"<div class='col-md-1'>"+
														"<span>"+data[i].property+"</span>"+
													"</div>"+
													"<div class='col-md-1'>"+
													 	"<span>¥</span>"+
														"<span>"+data[i].price+"</span>"+
													"</div>"+
													"<div class='col-md-1'>"+
													 	"<span>¥</span>"+
														"<span>300.00</span>"+
													"</div>"+
													"<div class='col-md-1'>"+
														"<a href='refund.html'> <span>申请售后</span> </a> "+
														"<p>  <a href='order.html'> <span>订单详情</span> </a>  </p>"+
														
													"</div>"+
													"<div class='col-md-1'>"+
														"<span>"+data[i].type+"</span>"+
													"</div>"+
													"<div class='col-md-1'>"+
													"</div>"+
												"</div>"
						)
			    break;
			case 0:
			
			
			    break;
			case 1:
				data[i].type = "待付款";
							//全部订单---->待付款
							$(".person_order").append(
									"<div class='row' id='order"+i+"' data-oid='"+data[i].id+"'>"+
											"<div class='col-md-0.1'>"+
												"<input type='checkbox' />"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='product.html'> <img class='img-responsive' src='img/small-product.png'/> </a>"+
											"</div>"+
											"<div class='col-md-3'>"+
												"<p>"+data[i].goodsname+"</p>"+
												"<p>"+data[i].goodsdesc+"</p>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].number+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].property+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>"+data[i].price+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>300.00</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='refund.html'> <span>申请售后</span> </a> "+
												"<p>  <a href='order.html'> <span>订单详情</span> </a>  </p>"+
												
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].type+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='javascript:cancelOrder("+data[i].id+");'>取消订单</a>"+
												"<a href='pay.html?oid="+data[i].id+" '>付款</a>"+
											"</div>"+
										"</div>"
						)
							
							//待付款------>
							$(".person_waitPay").append(
									"<div class='row' id='order"+i+"' data-oid='"+data[i].id+"'>"+
											"<div class='col-md-0.1'>"+
												"<input type='checkbox' />"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='product.html'> <img class='img-responsive' src='img/small-product.png'/> </a>"+
											"</div>"+
											"<div class='col-md-3'>"+
												"<p>"+data[i].goodsname+"</p>"+
												"<p>"+data[i].goodsdesc+"</p>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].number+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].property+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>"+data[i].price+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>300.00</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='refund.html'> <span>申请售后</span> </a> "+
												"<p>  <a href='order.html'> <span>订单详情</span> </a>  </p>"+
												
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].type+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='javascript:cancelOrder("+data[i].id+");'>取消订单</a>"+
												"<a href='pay.html="+data[i].id+" '>付款</a>"+
											"</div>"+
										"</div>"
						)
			    break;
			case 2:
				data[i].type = "待发货";
								//全部订单----待发货
								$(".person_order").append(
										"<div class='row' id='order"+i+"' data-oid='"+data[i].id+"'>"+
												"<div class='col-md-0.1'>"+
													"<input type='checkbox' />"+
												"</div>"+
												"<div class='col-md-1'>"+
													"<a href='product.html'> <img class='img-responsive' src='img/small-product.png'/> </a>"+
												"</div>"+
												"<div class='col-md-3'>"+
													"<p>"+data[i].goodsname+"</p>"+
													"<p>"+data[i].goodsdesc+"</p>"+
												"</div>"+
												"<div class='col-md-1'>"+
													"<span>"+data[i].number+"</span>"+
												"</div>"+
												"<div class='col-md-1'>"+
													"<span>"+data[i].property+"</span>"+
												"</div>"+
												"<div class='col-md-1'>"+
												 	"<span>¥</span>"+
													"<span>"+data[i].price+"</span>"+
												"</div>"+
												"<div class='col-md-1'>"+
												 	"<span>¥</span>"+
													"<span>300.00</span>"+
												"</div>"+
												"<div class='col-md-1'>"+
													"<a href='refund.html'> <span>申请售后</span> </a> "+
													"<p>  <a href='order.html'> <span>订单详情</span> </a>  </p>"+
													
												"</div>"+
												"<div class='col-md-1'>"+
													"<span>"+data[i].type+"</span>"+
												"</div>"+
												"<div class='col-md-1'>"+
													"<span>"+data[i].type+"</span><br>"+
													"<a href='look_ship.html?oid="+data[i].id+" '>查看物流</a>"+
												"</div>"+
											"</div>"
					)
							//待发货	------->
								$(".person_waitShip").append(
									"<div class='row' id='order"+i+"' data-oid='"+data[i].id+"'>"+
											"<div class='col-md-0.1'>"+
												"<input type='checkbox' />"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='product.html'> <img class='img-responsive' src='img/small-product.png'/> </a>"+
											"</div>"+
											"<div class='col-md-3'>"+
												"<p>"+data[i].goodsname+"</p>"+
												"<p>"+data[i].goodsdesc+"</p>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].number+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].property+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>"+data[i].price+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>300.00</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='refund.html'> <span>申请售后</span> </a> "+
												"<p>  <a href='order.html'> <span>订单详情</span> </a>  </p>"+
												
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].type+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].type+"</span><br>"+
												"<a href='look_ship.html?oid="+data[i].id+" '>查看物流</a>"+
											"</div>"+
										"</div>"
						)
			    break;
			case 3:
				data[i].type = "待收货";
				
				//全部订单----->待收货
						$(".person_order").append(
								"<div class='row' id='order"+i+"' data-oid='"+data[i].id+"'>"+
										"<div class='col-md-0.1'>"+
											"<input type='checkbox' />"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<a href='product.html'> <img class='img-responsive' src='img/small-product.png'/> </a>"+
										"</div>"+
										"<div class='col-md-3'>"+
											"<p>"+data[i].goodsname+"</p>"+
											"<p>"+data[i].goodsdesc+"</p>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<span>"+data[i].number+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<span>"+data[i].property+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
										 	"<span>¥</span>"+
											"<span>"+data[i].price+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
										 	"<span>¥</span>"+
											"<span>300.00</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<a href='refund.html'> <span>申请售后</span> </a> "+
											"<p>  <a href='order.html'> <span>订单详情</span> </a>  </p>"+
											
										"</div>"+
										"<div class='col-md-1'>"+
											"<span>"+data[i].type+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<span>确认收货</span>"+
											"<a href='comment.html?orderid="+data[i].id+" '>查看物流</a>"+
										"</div>"+
									"</div>"
					)
						
						//待收货------->
						$(".person_waitReceive").append(
									"<div class='row' id='order"+i+"' data-oid='"+data[i].id+"'>"+
											"<div class='col-md-0.1'>"+
												"<input type='checkbox' />"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='product.html'> <img class='img-responsive' src='img/small-product.png'/> </a>"+
											"</div>"+
											"<div class='col-md-3'>"+
												"<p>"+data[i].goodsname+"</p>"+
												"<p>"+data[i].goodsdesc+"</p>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].number+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].property+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>"+data[i].price+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>300.00</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='refund.html'> <span>申请售后</span> </a> "+
												"<p>  <a href='order.html'> <span>订单详情</span> </a>  </p>"+
												
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].type+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>确认收货</span>"+
												"<a href='comment.html?orderid="+data[i].id+" '>查看物流</a>"+
											"</div>"+
										"</div>"
						)
						
			    break; 
			case 4:
				data[i].type = "待评价";
				//全部订单--------待评价
						$(".person_order").append(
								"<div class='row' id='order"+i+"' data-oid='"+data[i].id+"'>"+
										"<div class='col-md-0.1'>"+
											"<input type='checkbox' />"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<a href='product.html'> <img class='img-responsive' src='img/small-product.png'/> </a>"+
										"</div>"+
										"<div class='col-md-3'>"+
											"<p>"+data[i].goodsname+"</p>"+
											"<p>"+data[i].goodsdesc+"</p>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<span>"+data[i].number+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<span>"+data[i].property+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
										 	"<span>¥</span>"+
											"<span>"+data[i].price+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
										 	"<span>¥</span>"+
											"<span>300.00</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<a href='refund.html'> <span>申请售后</span> </a> "+
											"<p>  <a href='order.html'> <span>订单详情</span> </a>  </p>"+
											
										"</div>"+
										"<div class='col-md-1'>"+
											"<span>"+data[i].type+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<a href='javascript:personalDeleteOrder(order"+i+");'>删除订单</a>"+
											"<a href='comment.html?orderid="+data[i].id+" '>评价</a>"+
										"</div>"+
									"</div>"
						)
						//待评价
						$(".person_waitComment").append(
									"<div class='row' id='order"+i+"' data-oid='"+data[i].id+"'>"+
											"<div class='col-md-0.1'>"+
												"<input type='checkbox' />"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='product.html'> <img class='img-responsive' src='img/small-product.png'/> </a>"+
											"</div>"+
											"<div class='col-md-3'>"+
												"<p>"+data[i].goodsname+"</p>"+
												"<p>"+data[i].goodsdesc+"</p>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].number+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].property+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>"+data[i].price+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>300.00</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='refund.html'> <span>申请售后</span> </a> "+
												"<p>  <a href='order.html'> <span>订单详情</span> </a>  </p>"+
												
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].type+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='javascript:personalDeleteOrder(order"+i+");'>删除订单</a>"+
												"<a href='comment.html?orderid="+data[i].id+" '>评价</a>"+
											"</div>"+
										"</div>"
						)
			    break;
			case 5:
				data[i].type = "售后";
					//全部订单------->售后
						$(".person_order").append(
								"<div class='row' id='order"+i+"' data-oid='"+data[i].id+"'>"+
										"<div class='col-md-0.1'>"+
											"<input type='checkbox' />"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<a href='product.html'> <img class='img-responsive' src='img/small-product.png'/> </a>"+
										"</div>"+
										"<div class='col-md-3'>"+
											"<p>"+data[i].goodsname+"</p>"+
											"<p>"+data[i].goodsdesc+"</p>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<span>"+data[i].number+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<span>"+data[i].property+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
										 	"<span>¥</span>"+
											"<span>"+data[i].price+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
										 	"<span>¥</span>"+
											"<span>300.00</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<a href='refund.html'> <span>申请售后</span> </a> "+
											"<p>  <a href='order.html'> <span>订单详情</span> </a>  </p>"+
											
										"</div>"+
										"<div class='col-md-1'>"+
											"<span>"+data[i].type+"</span>"+
										"</div>"+
										"<div class='col-md-1'>"+
											"<a href='javascript:personalDeleteOrder(order"+i+");'>删除订单</a>"+
											"<a href='comment.html?orderid="+data[i].id+" '>评价</a>"+
										"</div>"+
									"</div>"
					)
						
						//售后
						$(".person_waitService").append(
									"<div class='row' id='order"+i+"' data-oid='"+data[i].id+"'>"+
											"<div class='col-md-0.1'>"+
												"<input type='checkbox' />"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='product.html'> <img class='img-responsive' src='img/small-product.png'/> </a>"+
											"</div>"+
											"<div class='col-md-3'>"+
												"<p>"+data[i].goodsname+"</p>"+
												"<p>"+data[i].goodsdesc+"</p>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].number+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].property+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>"+data[i].price+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
											 	"<span>¥</span>"+
												"<span>300.00</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='refund.html'> <span>申请售后</span> </a> "+
												"<p>  <a href='order.html'> <span>订单详情</span> </a>  </p>"+
												
											"</div>"+
											"<div class='col-md-1'>"+
												"<span>"+data[i].type+"</span>"+
											"</div>"+
											"<div class='col-md-1'>"+
												"<a href='javascript:personalDeleteOrder(order"+i+");'>删除订单</a>"+
												"<a href='comment.html?orderid="+data[i].id+" '>评价</a>"+
											"</div>"+
										"</div>"
						)
			    break;     
		}
		
		})	
}

//删除订单
function personalDeleteOrder(orderid){
	var orderdiv =$(orderid);
	var oid = orderdiv.attr("data-oid");
	orderdiv.remove();
	var a_url = "http://139.224.133.119:8080/CarStar/rest/goodsorder/remove?orderid="+oid;
	$.ajax({
		type:"get",
		url:a_url,
		async:true,
		success:function(msg){
//			console.log(msg);
		}
	});
}

//订单-------取消订单
function cancelOrder(oid){
	var a_url = "http://139.224.133.119:8080/CarStar/rest/goodsorder/cancorder?orderid=";
	$.ajax({
		type:"get",
		url:a_url+oid,
		async:true,
		success:function(msg){
			console.log(msg);
			alert("取消订单成功！");
		}
	});
}

//订单-----已生成订单，直接传入订单号付款
function orderPay(){
	var oid = XXURL();
	var c_url = "http://139.224.133.119:8080/CarStar/rest/goodsorder/payorder?orderids="+oid;
		$.ajax({
			type:"get",
			url:c_url,
			async:true,
			success:function(msg){
				alert("支付成功！");
				window.location.href = "order-finish.html?oid="+oid;
			}
	});
}

//订单------->评价comment.html
//获取订单的信息

//将订单的信息显示在页面上
function viewOrderinfo(){
	var a_url = "http://139.224.133.119:8080/CarStar/rest/goodsorder/query?orderid=";
	var iteminfo =  getItemInfo(a_url);
	console.log(iteminfo);
}

//接受评价分数----只弄明白了数组的方式，json的以后再想想吧
//var scoreall = { "pricevalue":"1","appearance":"1","installation":"1","quality":"1" };
var scoreall = [ {},{},{},{} ]
function starScore(arr,i){
	scoreall[i] = arr;
}

//评价提交
function commentSubmit(imgpath){

	var a_url = "http://139.224.133.119:8080/CarStar/rest/goodsorder/query?orderid=";
	var iteminfo =  getItemInfo(a_url);
//	console.log(iteminfo);
	
	//商品id，用户id，评论内容content
	var userid = $.cookie('userId');   //用户id
	var pid = iteminfo.data[0].goodsid;   //商品id
	var content = $('.comment_content').val();  //评论内容
	var imgpath;
//	console.log("用户信息："+userid,pid,content);
	//图片提交获取图片URL
//	console.log(imgpath);
	//评价分数
//	console.log("分数："+scoreall[0].pricevalue);
	
	//提交评价
	var c_url = "http://139.224.133.119:8080/CarStar/rest/goodsrev/revadd?goodsid=";
	$.ajax({
		type:"get",
		url:c_url+pid+"&userid="+userid+"&content="+content+"&appearance="+scoreall[1].appearance+"&installation="+scoreall[2].installation+"&pricevalue="+scoreall[0].pricevalue+"&quality="+scoreall[3].quality+"&imgpaths="+imgpath,                                                     
		async:true,
		success:function(msg){
			console.log(msg);
		}
	});
}

//pay.html-----
function payOrder(){
	var oid = XXURL();
	var o_url = "http://139.224.133.119:8080/CarStar/rest/goodsorder/query?orderid="+oid;
	var msg = getItemInfo(o_url);
	console.log(msg);
	document.getElementsByClassName("order_number").item(0).innerHTML = msg.data.id;
	document.getElementsByClassName("order_payMoney").item(0).innerHTML = (msg.data.price) * (msg.data.number);
}




