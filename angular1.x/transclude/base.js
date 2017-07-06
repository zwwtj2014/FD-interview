var baseapp = angular.module('baseapp', []);

baseapp.controller('parentController', ['$scope', '$window', function ($scope, $window) {
    console.log('parentController scope id = ', $scope.$id);
    $scope.primary1Label = 'Prime1';

    $scope.onPrimary1Click = function () {
        $window.alert('Primary1 clicked');
    };
}]);

baseapp.directive('primary', function () {
    return {
        restrict: 'C',
        link: function (scope, ele, attr) {
            ele.addClass('btn btn-primary');
        }
    };
});

baseapp.directive('secondary', function () {
    return {
        restrict: 'C',
        link: function (scope, ele, attr) {
            ele.addClass('btn');
        }
    };
});

baseapp.directive('buttonBar', function () {
    return {
        restrict: 'EA',
        template: '<div class="span4 well clearfix"><div class="primary-block pull-right"></div><div class="secondary-block"></div><div class="transcluded" ng-transclude></div></div>',
        replace: true,
        transclude: true,
        link: function (scope, ele, attrs) {
            var primaryBlock = ele.find('div.primary-block');
            var secondaryBlock = ele.find('div.secondary-block');
            var transcludedBlock = ele.find('div.transcluded');
            var transcludeButtons = transcludedBlock.children().filter(':button');

            angular.forEach(transcludeButtons,function(btn){
                if(angular.element(btn).hasClass('primary')){
                    primaryBlock.append(btn);
                } else if(angular.element(btn).hasClass('secondary')){
                    secondaryBlock.append(btn);
                }
            });

            transcludedBlock.remove();
        }
    };
});