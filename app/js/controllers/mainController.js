angular.module('app')
    .controller('MainController', function($scope, MusicService, CommentService, CurrentUser) {
        $scope.tab = [];
        $scope.editMe = [];
        $scope.comments = [];
        var maLine;

        MusicService.getAll().then(function(res) {
            $scope.tab = res.data;
        });

        CommentService.getAll().then(function(res) {
            $scope.comments = res.data;
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
            });
            $scope.group = '';
            $scope.title = '';
        };

        $scope.editLine = function(index) {
            $scope.editMe[index] = true;
        };

        $scope.editDone = function(index, id, newLine) {
            MusicService.update(id, newLine).then(function(res) {
                console.log("Update success");
                MusicService.getAll().then(function(res) {
                    $scope.tab = res.data;
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

        $scope.randomMusic = function() {
            MusicService.getAll().then(function(res) {
                var i = Math.floor(Math.random(0, 101) * $scope.tab.length);
                $scope.randomGroup = res.data[i].group;
                $scope.randomTitle = res.data[i].title;
            });
        };

        $scope.addComment = function() {
            // $scope.comments.push($scope.comment);
            CommentService.create({
                userPseudo: CurrentUser.user().email,
                comment: $scope.comment,
                like: []
            });
            CommentService.getAll().then(function(res){
              $scope.comments = res.data;
              console.log($scope.comments);
            });
            $scope.comment = "";
        };

    });
