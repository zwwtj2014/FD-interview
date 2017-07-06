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
        template: '<div class="span4 well clearfix"><div class="primary-block pull-right"></div><div class="secondary-block"></div></div>',
        replace: true,
        transclude: true,
        compile: function(elem, attrs, transcludeFn) {
            return function (scope, element, attrs) {
                transcludeFn(scope, function(clone) {
                    var primaryBlock = elem.find('div.primary-block');
                    var secondaryBlock = elem.find('div.secondary-block');
                    var transcludedButtons = clone.filter(':button');
                    angular.forEach(transcludedButtons, function(e) {
                        if (angular.element(e).hasClass('primary')) {
                            primaryBlock.append(e);
                        } else if (angular.element(e).hasClass('secondary')) {
                            secondaryBlock.append(e);
                        }
                    });
                });
            };
        }
    };
});