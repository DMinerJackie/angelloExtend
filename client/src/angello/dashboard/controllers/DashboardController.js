angular.module('Angello.Dashboard')
    .controller('DashboardCtrl',
    function (StoriesModel, STORY_STATUSES, STORY_TYPES, $log) {
        var dashboard = this;
        dashboard.types = STORY_TYPES;
        dashboard.statuses = STORY_STATUSES;
        dashboard.stories = [];

        StoriesModel.all()
            .then(function (stories) {
                var arr = [];
                for (var key in stories) {
                    arr.push(stories[key]);
                    $log.debug("第" + key + "个元素为：" ,stories[key]);
                }
                dashboard.stories = arr;
            });
    });
