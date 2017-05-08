//添加车辆
$(function(){
	queryCar();
})

 var user_id = $.cookie("userId");  //user_id  用户id
//选择年份，获取品牌
function chooseCarYear(){
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
			
	infoJson = $("#addcar").serializeObject();
	infoJson =  JSON.stringify(infoJson);
	infoJson = eval( "(" +infoJson +")" );
	console.log(infoJson.year);
	
	addcar_url = "http://139.224.133.119:8080/CarStar/rest/car/query2?year=" + infoJson.year;
	$.ajax({
		type:"get",
		contentType: "application/json; charset=utf-8",
		url:addcar_url,
		async:false,
		success:function(date){
			carJson = date.data;
			console.log(carJson);
			
			//清空option
			makeNameId = document.getElementById("addcar-makeName");
			delectOption(makeNameId);
			
			modelNameId = document.getElementById("addcar-modelName");
			delectOption(modelNameId);
			
			 outPutId = document.getElementById("addcar-output");
			delectOption(outPutId);
			
			typeId = document.getElementById("addcar-type");
			delectOption(typeId);
			
			$.each(carJson, function(i,obj) {
				$("#addcar-makeName").append(
					"<option value="+ obj.make_name + ">"  + obj.make_name + "</option>"
				);
			});
		}
	});
	
}

//option长度归零
function delectOption(optionId){
	optionId.options.length = 1;
}

//选择品牌，获得车系
function chooseMakeName(){
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
	infoJson = $("#addcar").serializeObject();
	infoJson =  JSON.stringify(infoJson);
	infoJson = eval( "(" +infoJson +")" );
	console.log(infoJson.year,infoJson.make_name);
	
	//定义数组传送
	var infoJsonStr = {};
	infoJsonStr.year = infoJson.year;
	infoJsonStr.make_name = infoJson.make_name;
	infoJsonStr =  JSON.stringify(infoJsonStr);
	console.log(infoJsonStr);
	
	addcar_url="http://139.224.133.119:8080/CarStar/rest/car/query3";
	$.ajax({
		type:"post",
		contentType:"application/json; charset=utf-8",
		url:addcar_url,
		data:infoJsonStr,
		async:true,
		success:function(date){
			carJson = date.data;
			console.log(carJson);
			modelNameId = document.getElementById("addcar-modelName");
			delectOption(modelNameId);
			$.each(carJson, function(i,obj) {
				$("#addcar-modelName").append(
					"<option value="+ obj.model_name + ">"  + obj.model_name + "</option>"
				);
			});
		},
		error:function(){
			console.log("error");
		}
	});
}

//选择车系，获得排量
function chooseModelName(){
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
	
	infoJson = $("#addcar").serializeObject();
	infoJson =  JSON.stringify(infoJson);
	infoJson = eval( "(" +infoJson +")" );
	console.log(infoJson.year,infoJson.make_name,infoJson.model_name);
	
	var infoJsonStr = {};
	infoJsonStr.year = infoJson.year;
	infoJsonStr.make_name = infoJson.make_name;
	infoJsonStr.model_name = infoJson.model_name;
	infoJsonStr =  JSON.stringify(infoJsonStr);
	console.log(infoJsonStr);
	
	addcar_url="http://139.224.133.119:8080/CarStar/rest/car/query4";
	$.ajax({
		type:"post",
		contentType:"application/json; charset=utf-8",
		url:addcar_url,
		data:infoJsonStr,
		async:true,
		success:function(date){
			carJson = date.data;
			console.log(carJson);
			 outPutId = document.getElementById("addcar-output");
			delectOption(outPutId);
			$.each(carJson, function(i,obj) {
				$("#addcar-output").append(
					"<option value="+ obj.output + ">"  + obj.output + "</option>"
				);
			});
		},
		error:function(){
			console.log("error");
		}
	});
}

//选择排量，获得款型
function chooseOutPut(){
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
	
	infoJson = $("#addcar").serializeObject();
	infoJson =  JSON.stringify(infoJson);
	infoJson = eval( "(" +infoJson +")" );
	console.log(infoJson.year,infoJson.make_name,infoJson.model_name,infoJson.output);
	
	var infoJsonStr = {};
	infoJsonStr.year = infoJson.year;
	infoJsonStr.make_name = infoJson.make_name;
	infoJsonStr.model_name = infoJson.model_name;
	infoJsonStr.output = infoJson.output;
	infoJsonStr =  JSON.stringify(infoJsonStr);
	console.log(infoJsonStr);
	
	addcar_url="http://139.224.133.119:8080/CarStar/rest/car/query5";
	$.ajax({
		type:"post",
		contentType:"application/json; charset=utf-8",
		url:addcar_url,
		data:infoJsonStr,
		async:true,
		success:function(date){
			carJson = date.data;
			console.log(carJson);
			typeId = document.getElementById("addcar-type");
			delectOption(typeId);
			$.each(carJson, function(i,obj) {
				$("#addcar-type").append(
					"<option value=" + obj.type + ">"  + obj.type + "</option>"
				);
			});
		},
		error:function(){
			console.log("error");
		}
	});
}

//提交车辆信息
function submitCarInfo(){
	
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
	
	infoJson = $("#addcar").serializeObject();
	infoJson =  JSON.stringify(infoJson);
	infoJson = eval( "(" +infoJson +")" );
	console.log(infoJson);
	infoJson.user_id = user_id;
	
	infoJson =  JSON.stringify(infoJson);
	console.log(infoJson);
	
	$.ajax({
		type:"post",
		contentType:"application/json; charset=utf-8",
		url:"http://139.224.133.119:8080/CarStar/rest/mycar/insert",
		data:infoJson,
		async:true,
		success:function(date){
			console.log(date);
			infoJson = eval( "(" +infoJson +")" );
			console.log(infoJson.year);
			$(".myCar-append").append(
				"	<div class='row my-car'> " + 
				"	<div class='col-md-1' style='text-align:right' >" +"<input type='radio' name='radio' />" +  "</div> " +
				"	<div class='col-md-2 col-xs-3'><span>"    
						+infoJson.year+       "</span></div>"  +
				"	<div class='col-md-2  col-xs-3'><span>  " 
						+infoJson.make_name +  "</span></div>" +
				"	<div class='col-md-2  col-xs-3'> <span>"  
						+ infoJson.model_name+  " </span></div> " +
				"	<div class='col-md-2  col-xs-3'><span>"   +
				         infoJson.output		 +   "</span></div>"    + 
				"	<div class='col-md-2  col-xs-3'><span>"   +
						infoJson.type  		 +    "</span></div>"   +
				"	<div class='col-md-1'></div></div>	");
			setTimeout( alert("添加成功！"), 1000 );
			$(".addcar-container").css("display","none");
		},
		error:function(){
			console.log("error");
		}
	});
	
}

var carId = {};   //存放汽车id的数组
//查询汽车信息
function queryCar(){
	var user_id = $.cookie("userId");
	query_url = "http://139.224.133.119:8080/CarStar/rest/mycar/query/"+user_id;
	$.ajax({
		type:"get",
		contentType:"application/json; charset=utf-8",
		url:query_url,
		async:false,
		success:function(msg){
//			console.log(msg.data[1]);
			var  infoJson = msg.data;
//			console.log(infoJson);
			$.each(infoJson, function(i) {
				carId[i] = infoJson[i].id;  //汽车id存在全局数组中
//				console.log(carId);
			});
		}
		
	});
}


var i = 0;

//删除车辆---获取id，user_id
function getCarId(){
	i = 0;  
	$(".myCar-append input").each(function(){
		if( $(this).prop("checked") ){
			console.log(carId,i);
			console.log(carId[i]);
		 	 deleteCar();
//			if (msg.code == 0){
//				alert("删除成功");
//			}
			$(this).parent().parent().remove();
		}
		i++;
	});
}

//删除车辆--传递user_id,id
function deleteCar(){
	console.log(carId[i],user_id);
	var infoJson = {}; 
	infoJson.user_id = user_id ;
	infoJson.id = carId[i];
	infoJson =  JSON.stringify(infoJson);
	console.log(infoJson);
	deleteCar_url = "http://139.224.133.119:8080/CarStar/rest/mycar/delete";
	$.ajax({
		type:"post",
		contentType:"application/json; charset=utf-8",
		url:deleteCar_url,
		data:infoJson,
		dataType:"json",
		async:false,
		success:function(msg){
			console.log(msg);
			return msg.code;
		}
	});
}
