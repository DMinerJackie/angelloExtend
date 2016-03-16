angular.module("Angello.Statistic").directive(
		"d3chart",
		function() {
			return {
				restrict : 'EA',
				scope : {
					statusArr : "=",
					existed: "="
				},
				link : function($scope, $element, $attrs) {// link or controller
						var width = 500;
						var height = 500;
						var dataset = $scope.statusArr;
						if($("svg").length >= 1){  //if exist svg in html source code return, else create 
							return;
						}else{
//							d3.select("body").attr("align", "center");
							var svg = d3.select(".flag").attr("align", "center")// align svg to center and move svg into div
							.append("svg").attr("width", width).attr("height", height);
//							var pie = d3.layout.pie();
							var pie = d3.layout.pie()
    						.value(function(d){
    						 return d[1];
    						 });
							var piedata = pie(dataset);
							var outerRadius = 150; // 外半径
							var innerRadius = 60; // 内半径，为0则中间没有空白
							var arc = d3.svg.arc() // 弧生成器
							.innerRadius(innerRadius) // 设置内半径
							.outerRadius(outerRadius); // 设置外半径
							var color = d3.scale.category10();
							var arcs = svg.selectAll("g").data(piedata).enter()
									.append("g").attr(
											"transform",
											"translate(" + (width / 2) + ","
													+ (width / 2) + ")");
							arcs.append("path").attr("fill", function(d, i) {
								return color(i);
							}).attr("d", function(d) {
								return arc(d);
							});
							arcs.append("text").attr("transform", function(d) {
								return "translate(" + arc.centroid(d) + ")";
							}).attr("text-anchor", "middle").text(function(d) {
								return d.data[0];
							});
						}
						
					}
			}
			$scope.existed = false;
		});