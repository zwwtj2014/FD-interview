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

baseapp.directive('buttonBar', function () {
    return {
        restrict: 'EA',
        template: '<div class="span4 well clearfix"><div class="pull-right" ng-transclude></div></div>',
        replace: true,
        transclude: true
    };
});