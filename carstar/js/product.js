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
		console.log( n );
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
		
//产品详情 接受产品id和商品信息
function viewProduct(){
	var thisURL =  document.URL;
	var getVal = thisURL.split('?')[1];
	var pid = getVal.split("=")[1];
	console.log(pid);
	var p_url = "http://192.168.1.106:8080/CarStar/rest/goods/querygoods?goodsid="+pid;
	
	$.ajax({
		type:"get",
		url:p_url,
		async:true,
		success:function(p_msg){
			console.log(p_msg);
			insertProductInfo(p_msg.data)
		}
	});
}

function insertProductInfo(data){
	var a = getJsonLength( data.rev_info );
	console.log(a);
	document.getElementsByClassName("productPriceFont").item(0).innerHTML = data.price;
	document.getElementsByClassName("productName").item(0).innerHTML = data.goodsname;  
	document.getElementsByClassName("productDesc").item(0).innerHTML = data.des;
	document.getElementsByClassName("productBrand").item(0).innerHTML =data.zzs;
	document.getElementsByClassName("productID").item(0).innerHTML = data.goods_id;
	document.getElementsByClassName("shopName").item(0).innerHTML = data.shopname;
	document.getElementsByClassName("productName").item(1).innerHTML = data.goodsname;
	document.getElementsByClassName("productType").item(0).innerHTML = data.des;
	document.getElementsByClassName("productOther").item(0).innerHTML = data.des;
}


//获取json数组长度
function getJsonLength(JsonData){
	var jsonLength = 0;
	for( var item in JsonData ){
		jsonLength++;
	}
	return jsonLength;
}