angular.module('Angello.Statistic')
    .controller('DataCtrl',
        function ($routeParams, user, stories, $log) {
            var myUser = this;

            myUser.userId = $routeParams['userId'];
            myUser.user = user.data;


            myUser.getAssignedStories = function (userId, stories) {
                var assignedStories = {};

                Object.keys(stories, function(key, value) {
                    if (value.assignee == userId) assignedStories[key] = stories[key];
                });

                return assignedStories;
            };

            myUser.stories = myUser.getAssignedStories(myUser.userId, stories);
            var len=0,toDo=0,inProgress=0,codeReview=0,qaReview=0,verified=0;
            function getJsonObjLength(jsonObj) {
                for (var item in jsonObj) {
                	switch (jsonObj[item].status){
	                	case "To Do":
	                		toDo++;
	                		break;
	                	case "In Progress":
	                		inProgress++;
	                		break;
	                	case "Code Review":
	                		codeReview++;
	                		break;
	                	case "QA Review":
	                		qaReview++;
	                		break;
	                	case "Verified":
	                		verified++;
	                		break;
                	}
//                    console.log("=================" + item);
//                    console.log(jsonObj[item].status + "====" + jsonObj[item].type);
//                    $log.debug(jsonObj[item].status + "~~~~~~~~~~~~~~" + jsonObj[item].type);
                	len++;
                }
                return len;
            }
            
            myUser.show = function(chartType){
            	if(chartType == "pie"){
            		pieChart();
            	}else if(chartType == "bar"){
            		barChart();
            	}
            }
            
            function pieChart(){
            	var p = d3.selectAll("svg");
            	p.remove();
    			var width = 500;
    			var height = 500;
    			var dataset = myUser.statusArr;
    			if($("svg").length >= 1){  //if exist svg in html source code return, else create 
    				return;
    			}else{
    			//	d3.select("body").attr("align", "center");
    				var svg = d3.select(".flag").attr("align", "center")// align svg to center and move svg into div
    				.append("svg").attr("width", width).attr("height", height);
    			//	var pie = d3.layout.pie();
    				var pie = d3.layout.pie()
    				.value(function(d){
    				 return d[1];
    				 });
    				var piedata = pie(dataset);
    				var outerRadius = 180; // 外半径
    				var innerRadius = 50; // 内半径，为0则中间没有空白
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
    					var percent =Number(d.value)/d3.sum(dataset,function(d){return d[1];})*100;
    					return d.data[0] + ":" + percent.toFixed(1)+"%";
    				});
    				
    				
    				arcs.append("title")
    				.text(function(d)
    				{
    					return d.data[0]+" : "+d.data[1];
    				});
    				
    			
    			//------------------------------------2.div提示框,通过设置透明度（opacity属性）实现 显示和隐藏	
    				//添加提示框的div
    				var tooltip = d3.select("body").append("div")
    							.attr("class",".tooltip") //用于css设置类样式
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
            
            function barChart(){
            	var p = d3.selectAll("svg");
            	p.remove();
            	var width = 400;  
                var height = 400;  
                var dataset = [];  
                var num = 15;  //数组的数量  
                  
                for(var i = 0; i < num ; i++){  
                    var tempnum = Math.floor( Math.random() * 50 );   // 返回 0~49 整数  
                    dataset.push(tempnum);  
                }  
                  
                var svg = d3.select("body").attr("align", "center").append("svg")  
                                        .attr("width",width)  
                                        .attr("height",height);  
                  
                var xAxisScale = d3.scale.ordinal()  
                                .domain(d3.range(dataset.length))  
                                .rangeRoundBands([0,300]);  
                                      
                var yAxisScale = d3.scale.linear()  
                                .domain([0,d3.max(dataset)])  
                                .range([300,0]);  
                                      
                var xAxis = d3.svg.axis()  
                                .scale(xAxisScale)  
                                .orient("bottom");  
                  
                var yAxis = d3.svg.axis()  
                                .scale(yAxisScale)  
                                .orient("left");  
          
                var xScale = d3.scale.ordinal()  
                                .domain(d3.range(dataset.length))  
                                .rangeRoundBands([0,300],0.05);  
                                      
                var yScale = d3.scale.linear()  
                                .domain([0,d3.max(dataset)])  
                                .range([0,300]);  
                  
                svg.selectAll("rect")  
                   .data(dataset)  
                   .enter()  
                   .append("rect")  
                   .attr("x", function(d,i){  
                        return 30 + xScale(i);  
                   } )  
                   .attr("y",function(d,i){  
                        return 50 + 300 - yScale(d) ;  
                   })  
                   .attr("width", function(d,i){  
                        return xScale.rangeBand();  
                   })  
                   .attr("height",yScale)  
                   .attr("fill","red");  
                     
                svg.selectAll("text")  
                    .data(dataset)  
                    .enter().append("text")  
                    .attr("x", function(d,i){  
                        return 30 + xScale(i);  
                   } )  
                   .attr("y",function(d,i){  
                        return 50 + 300 - yScale(d) ;  
                   })  
                    .attr("dx", function(d,i){  
                        return xScale.rangeBand()/3;  
                   })  
                    .attr("dy", 15)  
                    .attr("text-anchor", "begin")  
                    .attr("font-size", 14)  
                    .attr("fill","white")  
                    .text(function(d,i){  
                        return d;  
                    });  
                     
                svg.append("g")  
                    .attr("class","axis")  
                    .attr("transform","translate(30,550)")  
                    .call(xAxis);  
                      
                svg.append("g")  
                    .attr("class","axis")  
                    .attr("transform","translate(30,50)")  
                    .call(yAxis);   
            }
            
            myUser.hide = function(){
            	var p = d3.selectAll("svg");
            	p.remove();
            }
            
            myUser.num = getJsonObjLength(myUser.stories);
            myUser.toDo = toDo;
            myUser.inProgress = inProgress;
            myUser.codeReview = codeReview;
            myUser.qaReview = qaReview;
            myUser.verified = verified;
            myUser.statusArr = [["To Do", toDo], ["In Progress", inProgress], ["Code Review", codeReview], ["QA Review", qaReview], ["Verified", verified]];
            myUser.existed = true;
        });
