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
								console.log(d);
								return d.data[0];
							});
							
							
							arcs.append("title")
				    		.text(function(d)
				    		{
				    			return d.data[0]+" : "+d.data[1];
				    		});
				    		
				    	
				    	//------------------------------------2.div提示框,通过设置透明度（opacity属性）实现 显示和隐藏	
				    		//添加提示框的div
				    		var tooltip = d3.select("body").append("div")
//				    					.attr("class","tooltip") //用于css设置类样式
				    					.attr("opacity",0.0);
				    		
				    		//响应事件
				    			//-鼠标移入事件
				    		arcs.on("mouseover",function(d)
				    		{	
				    			//设置tooltip文字
				    			tooltip.html(d.data[0]+" : "+d.data[1])
				    			//设置tooltip的位置(left,top 相对于页面的距离) 
				    					.style("left",(d3.event.pageX)+"px")
				    					.style("top",(d3.event.pageY+20)+"px")
				    					.style("opacity",1.0);
				    		})
				    		//--鼠标移出事件
				    		.on("mouseout",function(d)
				    		{
				    			tooltip.style("opacity",0.0);
				    		}); 
				    		
				    		//-----------------------------------3.svg中的text标签提示框
				    	 	arcs.on("mouseover",function(d)
				    		{
				    			var x =d3.event.pageX;
				    			var y =d3.event.pageY+30;
								//添加标签
				    			svg.append("text")
				    				.attr("id","tooltip")    				
				    				.attr("x",x)
				    				.attr("y",y) 
				    				.attr("text-anchor","middle")  
									.attr("font-family","sans-setif")  
									.attr("font-size","11px")  
									.attr("font-weight","bold")  
									.attr("fill","black")  
									//文本内容
				    				.text("item number:"+d.value); 							
				    		})
				    		//鼠标移出时通过ID移除标签
				    	 	.on("mouseout",function(d)
				    		{
				    			d3.select("#tooltip").remove();
				    		});  
						}
						
					}
			}
			$scope.existed = false;
		});