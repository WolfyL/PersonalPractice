angular.module('app')
    .service('MusicService', function($http) {
        return {
            getAll: function() {
                return $http.get('/musics');
            },
            getOne: function(id) {
                return $http.get('/musics/' + id);
            },
            create: function(music){
              return $http.post('/musics', music);
            },
            update: function(id, user) {
                return $http.put('/musics/' + id, user);
            },
            delete: function(id) {
                return $http.delete('/musics/' + id);
            }
        };
    });
