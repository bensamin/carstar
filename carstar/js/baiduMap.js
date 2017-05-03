			// 百度地图API功能
	var map = new BMap.Map("allmap");
	var localSearch = new BMap.LocalSearch(map);
	localSearch.enableAutoViewport(); //允许自动调节窗体大小
	
	var	a = { "s1":"上海市","s2":"嘉定区","s3":"阿克苏路" }
	var b = a.s1+a.s2+a.s3;
	
	function searchByStationName() {
    　　var keyword = b;
    　　localSearch.setSearchCompleteCallback(function (searchResult) {
        　　　　var poi = searchResult.getPoi(0);
        　　　  console.log( poi.point.lng + "," + poi.point.lat ); //获取经度和纬度，将结果显示在文本框中
        　　　　map.centerAndZoom(poi.point, 13);
    　　});
    　　localSearch.search(keyword);
}
	