angular.module('app')
    .controller('MainController', function($scope) {
        $scope.tab = [];
        var maLine;

        $scope.add = function() {
            maLine = {
                group: $scope.group,
                title: $scope.title,
            };
            $scope.tab.push(maLine);
            $scope.group = '';
            $scope.title = '';
        };

        $scope.editLine = function() {
            $scope.editMe = true;
        };

        $scope.editDone = function(index, newGroup, newTitle) {
            line = {
                group: newGroup,
                title: newTitle
            };
            $scope.tab.splice(index, 1, line);
            $scope.editMe = false;
        };

        $scope.deleteLine = function(index) {
            $scope.tab.splice(index, 1);
        };
    });
