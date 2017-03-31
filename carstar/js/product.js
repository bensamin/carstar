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
		setTotal();
});
$(".addNum").click(function(){
	var t = $(this).parent().find("input[class*=text-box]");		
	var p = 0;
	t.val(parseInt(t.val()) +1) ;
	p = t.val() * parseFloat( $(this).parent().prev().find( "span[class*=text-price]" ).text() ) ;
	$( $(this).parent().next().find("span[class*=product-total]") ).html(p.toFixed(2));
	setTotal();
});
//-----------------END
//计算总价格
function setTotal(){
	var p = 0;
	$(".product1").each(function(){
		p += parseInt( $(this).find("input[class*=text-box]").val() ) * parseFloat( $(this).find("span[class*=text-price]").text());	
			});
		$(".total-all").html( p.toFixed(2) );
		console.log("计算总价格" +p);
	};
//页面加载完毕的价格
$(document).ready(function(){
			var p = 0;
			$(".product1").each(function(){
//				p = parseFloat( $(this).find("span[class*=text-price]").text() );
			p = parseInt( $(this).find("input[class*=text-box]").val() ) * parseFloat( $(this).find("span[class*=text-price]").text());	
			$(this).find("span[class*=product-total]").html( p.toFixed(2) );
				console.log("page:"+p);
//				p += parseInt( $(this).find("input[class*=text-box]").val() ) * parseFloat( $(this).find("span[class*=text-price]").text());
			}); 
			$(".total-all").html( p.toFixed(2) );
				console.log("计算总价格" +p);
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
$(".select-btn").click(function(){
	$("input[name='select']").attr("checked",true);
	console.log("yes");
});
$(".cancel-btn").click(function(){
	$("input[name='select']").removeAttr("checked",false);
	console.log("no");
});