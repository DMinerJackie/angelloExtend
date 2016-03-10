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
            var len=toDo=inProgress=codeReview=qaReview=verified = 0;
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
                    console.log("=================" + item);
//                    $log.debug('jsonObj:', jsonObj);
                    console.log(jsonObj[item].status + "====" + jsonObj[item].type);
                    $log.debug(jsonObj[item].status + "~~~~~~~~~~~~~~" + jsonObj[item].type);
                	len++;
                }
                return len;
        }
            
            myUser.num = getJsonObjLength(myUser.stories);
            myUser.toDo = toDo;
            myUser.inProgress = inProgress;
            myUser.codeReview = codeReview;
            myUser.qaReview = qaReview;
            myUser.verified = verified;
        });
