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