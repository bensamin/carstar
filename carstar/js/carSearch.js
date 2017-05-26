$(document).ready(function(){
	//切片轮播执行代码
	$('#gellery').transformer({
				__Effects:new Array('Optimus','Ironhide','Scorponok','Megatron','Starscream','Jazz'),	
				__Columns:7,
				__Rows:3,
				__Speed:5000,
				__Title_Height:100,
				__Title_Width:0,
			});
	
});

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
			
	infoJson = $("#home_carInfo").serializeObject();
	infoJson =  JSON.stringify(infoJson);
	infoJson = eval( "(" +infoJson +")" );
//	console.log(infoJson.year);
	
	addcar_url = "http://139.224.133.119:8080/CarStar/rest/car/query2?year=" + infoJson.year;
	$.ajax({
		type:"get",
		contentType: "application/json; charset=utf-8",
		url:addcar_url,
		async:false,
		success:function(date){
			carJson = date.data;
//			console.log(carJson);
			
			//清空option
			var makeNameId1 = document.getElementById("addcar-makeName1");
			delectOption(makeNameId1);
			
			var modelNameId1 = document.getElementById("addcar-modelName1");
			delectOption(modelNameId1);
			
			var outPutId1 = document.getElementById("addcar-output1");
			delectOption(outPutId1);
			
			var typeId1 = document.getElementById("addcar-type1");
			delectOption(typeId1);
			
			$.each(carJson, function(i,obj) {
				$("#addcar-makeName1").append(
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
	infoJson = $("#home_carInfo").serializeObject();
	infoJson =  JSON.stringify(infoJson);
	infoJson = eval( "(" +infoJson +")" );
//	console.log(infoJson.year,infoJson.make_name);
	
	//定义数组传送
	var infoJsonStr = {};
	infoJsonStr.year = infoJson.year;
	infoJsonStr.make_name = infoJson.make_name;
	infoJsonStr =  JSON.stringify(infoJsonStr);
//	console.log(infoJsonStr);
	
	addcar_url="http://139.224.133.119:8080/CarStar/rest/car/query3";
	$.ajax({
		type:"post",
		contentType:"application/json; charset=utf-8",
		url:addcar_url,
		data:infoJsonStr,
		async:true,
		success:function(date){
			carJson = date.data;
//			console.log(carJson);
			modelNameId1 = document.getElementById("addcar-modelName1");
			delectOption(modelNameId1);
			$.each(carJson, function(i,obj) {
				$("#addcar-modelName1").append(
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
	
	infoJson = $("#home_carInfo").serializeObject();
	infoJson =  JSON.stringify(infoJson);
	infoJson = eval( "(" +infoJson +")" );
//	console.log(infoJson.year,infoJson.make_name,infoJson.model_name);
	
	var infoJsonStr = {};
	infoJsonStr.year = infoJson.year;
	infoJsonStr.make_name = infoJson.make_name;
	infoJsonStr.model_name = infoJson.model_name;
	infoJsonStr =  JSON.stringify(infoJsonStr);
//	console.log(infoJsonStr);
	
	addcar_url="http://139.224.133.119:8080/CarStar/rest/car/query4";
	$.ajax({
		type:"post",
		contentType:"application/json; charset=utf-8",
		url:addcar_url,
		data:infoJsonStr,
		async:true,
		success:function(date){
			carJson = date.data;
//			console.log(carJson);
			 outPutId1 = document.getElementById("addcar-output1");
			delectOption(outPutId1);
			$.each(carJson, function(i,obj) {
				$("#addcar-output1").append(
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
	
	infoJson = $("#home_carInfo").serializeObject();
	infoJson =  JSON.stringify(infoJson);
	infoJson = eval( "(" +infoJson +")" );
//	console.log(infoJson.year,infoJson.make_name,infoJson.model_name,infoJson.output);
	
	var infoJsonStr = {};
	infoJsonStr.year = infoJson.year;
	infoJsonStr.make_name = infoJson.make_name;
	infoJsonStr.model_name = infoJson.model_name;
	infoJsonStr.output = infoJson.output;
	infoJsonStr =  JSON.stringify(infoJsonStr);
//	console.log(infoJsonStr);
	
	addcar_url="http://139.224.133.119:8080/CarStar/rest/car/query5";
	$.ajax({
		type:"post",
		contentType:"application/json; charset=utf-8",
		url:addcar_url,
		data:infoJsonStr,
		async:true,
		success:function(date){
			carJson = date.data;
//			console.log(carJson);
			typeId1 = document.getElementById("addcar-type1");
			delectOption(typeId1);
			$.each(carJson, function(i,obj) {
				$("#addcar-type1").append(
					"<option value=" + obj.type + ">"  + obj.type + "</option>"
				);
			});
		},
		error:function(){
			console.log("error");
		}
	});
}












///////////////////////////////////////////////////////////////


//选择年份，获取品牌
function chooseCarYear2(){
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
//	console.log(infoJson.year);
	
	addcar_url = "http://139.224.133.119:8080/CarStar/rest/car/query2?year=" + infoJson.year;
	$.ajax({
		type:"get",
		contentType: "application/json; charset=utf-8",
		url:addcar_url,
		async:false,
		success:function(date){
			carJson = date.data;
//			console.log(carJson);
			
			//清空option
			makeNameId2 = document.getElementById("addcar-makeName2");
			delectOption(makeNameId2);
			
			modelNameId2 = document.getElementById("addcar-modelName2");
			delectOption(modelNameId2);
			
			 outPutId2 = document.getElementById("addcar-output2");
			delectOption(outPutId2);
			
			typeId2 = document.getElementById("addcar-type2");
			delectOption(typeId2);
			
			$.each(carJson, function(i,obj) {
				$("#addcar-makeName2").append(
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
function chooseMakeName2(){
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
//	console.log(infoJson.year,infoJson.make_name);
	
	//定义数组传送
	var infoJsonStr = {};
	infoJsonStr.year = infoJson.year;
	infoJsonStr.make_name = infoJson.make_name;
	infoJsonStr =  JSON.stringify(infoJsonStr);
//	console.log(infoJsonStr);
	
	addcar_url="http://139.224.133.119:8080/CarStar/rest/car/query3";
	$.ajax({
		type:"post",
		contentType:"application/json; charset=utf-8",
		url:addcar_url,
		data:infoJsonStr,
		async:true,
		success:function(date){
			carJson = date.data;
//			console.log(carJson);
			modelNameId2 = document.getElementById("addcar-modelName2");
			delectOption(modelNameId2);
			$.each(carJson, function(i,obj) {
				$("#addcar-modelName2").append(
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
function chooseModelName2(){
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
//	console.log(infoJson.year,infoJson.make_name,infoJson.model_name);
	
	var infoJsonStr = {};
	infoJsonStr.year = infoJson.year;
	infoJsonStr.make_name = infoJson.make_name;
	infoJsonStr.model_name = infoJson.model_name;
	infoJsonStr =  JSON.stringify(infoJsonStr);
//	console.log(infoJsonStr);
	
	addcar_url="http://139.224.133.119:8080/CarStar/rest/car/query4";
	$.ajax({
		type:"post",
		contentType:"application/json; charset=utf-8",
		url:addcar_url,
		data:infoJsonStr,
		async:true,
		success:function(date){
			carJson = date.data;
//			console.log(carJson);
			 outPutId2 = document.getElementById("addcar-output2");
			delectOption(outPutId2);
			$.each(carJson, function(i,obj) {
				$("#addcar-output2").append(
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
function chooseOutPut2(){
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
//	console.log(infoJson.year,infoJson.make_name,infoJson.model_name,infoJson.output);
	
	var infoJsonStr = {};
	infoJsonStr.year = infoJson.year;
	infoJsonStr.make_name = infoJson.make_name;
	infoJsonStr.model_name = infoJson.model_name;
	infoJsonStr.output = infoJson.output;
	infoJsonStr =  JSON.stringify(infoJsonStr);
//	console.log(infoJsonStr);
	
	addcar_url="http://139.224.133.119:8080/CarStar/rest/car/query5";
	$.ajax({
		type:"post",
		contentType:"application/json; charset=utf-8",
		url:addcar_url,
		data:infoJsonStr,
		async:true,
		success:function(date){
			carJson = date.data;
//			console.log(carJson);
			typeId2 = document.getElementById("addcar-type2");
			delectOption(typeId2);
			$.each(carJson, function(i,obj) {
				$("#addcar-type2").append(
					"<option value=" + obj.type + ">"  + obj.type + "</option>"
				);
			});
		},
		error:function(){
			console.log("error");
		}
	});
}

