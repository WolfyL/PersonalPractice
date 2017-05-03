angular.module('app')
    .service('CommentService', function($http) {
        return {
            getAll: function() {
                return $http.get('/comments');
            },
            getOne: function(id) {
                return $http.get('/comments/' + id);
            },
            create: function(comment){
              return $http.post('/comments', comment);
            },
            update: function(id, user) {
                return $http.put('/comments/' + id, user);
            },
            delete: function(id) {
                return $http.delete('/comments/' + id);
            }
        };
    });
