angular.module('app')
    .controller('MainController', function($scope, MusicService, CurrentUser) {
        $scope.tab = [];
        $scope.editMe = [];
        var maLine;
        var userId = CurrentUser.user()._id;

        MusicService.getAll().then(function(res) {
            $scope.tab = res.data;
            console.log(res.data);
        });

        $scope.add = function() {
            maLine = {
                group: $scope.group,
                title: $scope.title,
            };
            // $scope.tab.push(maLine);
            MusicService.create({
                user: userId,
                group: $scope.group,
                title: $scope.title
            });
            MusicService.getAll().then(function(res) {
                $scope.tab = res.data;
                console.log(res.data);
            });
            $scope.group = '';
            $scope.title = '';
        };

        $scope.editLine = function(index) {
            $scope.editMe[index] = true;
        };

        $scope.editDone = function(index, line) {
            // line = {
            //     group: newGroup,
            //     title: newTitle
            // };
            // $scope.tab.splice(index, 1, line);
            console.log(line);
            MusicService.update($scope.tab[index]._id, line).then(function(res) {
                console.log("Update success");
                MusicService.getAll().then(function(res) {
                    $scope.tab = res.data;
                    console.log(res.data);
                });
            }, function(err) {
                console.log("Update failed");
            });
            $scope.editMe[index] = false;
        };

        $scope.deleteLine = function(index, line) {
            // $scope.tab.splice(index, 1);
            MusicService.delete(line._id).then(function(res) {
                console.log("Delete success");
                MusicService.getAll().then(function(res) {
                    $scope.tab = res.data;
                });
            }, function(err) {
                console.log("Delete failed");
            });
        };
    });
