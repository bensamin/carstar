var c = true;
		$(".shop-left div").each(function(){
			$(this).children("label").click(function(){
				if(c){
					$(this).siblings("p").slideUp();
					c = false;
					$(this).children("img").attr("src","../img/add.png") ;
				}else{
					$(this).siblings("p").slideDown();
					c = true;
					$(this).children("img").attr("src","../img/reduce.png") ;
				}
			});
		});
	

function change1(){
	$(".shop-content").load("open-step-1.html");
}


function change2(){
	$(".shop-content").load("shop-exchange-productSold.html");
}

function change3(){
	$(".shop-content").load("shop-exchange-comment.html");
}

function change4(){
	$(".shop-content").load("ship-deliver-goods.html");
}

function change5(){
	$(".shop-content").load("ship-shipMent.html");
}

function change6(){
	$(".shop-content").load("ship-service.html");
}

function change7(){
	$(".shop-content").load("ship-mine-ship.html");
}

function change9(){
	$(".shop-content").load("product-shopping-product.html");
}

function change10(){
	$(".shop-content").load("product-storage.html");
}


function change11(){
	$(".shop-content").load("product-health.html");
}



function change12(){
	$(".shop-content").load("costomer-service-return.html");
}

function change13(){
	$(".shop-content").load("costumer-afterManage.html");
}

function change14(){
	$(".shop-content").load("shop-costumer-report.html");
}	

function change15(){
	$(".shop-content").load("costomer-service-advice.html");
}	

