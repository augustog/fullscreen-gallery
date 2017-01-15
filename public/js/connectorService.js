/**
 * Created by augusto on 4/12/16.
 *
 * Factory module to handle changing between galleries and retrieving img src's
 */
angular.module('ag-gallery')
    .factory('connectorService', function($rootScope, $http, $q){
        $rootScope.currentGallery = 0;

        var connectorService = {};

        listeners = [];

        connectorService.onChange = function(callback){
            console.log('Registered listener' + callback);
            listeners.push(callback)
        };

        connectorService.broadcast = function(args){
            listeners.forEach(function(callback){
                callback(args);
                console.log('Calling' + callback);
            });
        };

        connectorService.getCurrentGallery = function(){
            console.log('Retrieving current gallery:' + $rootScope.currentGallery);
            return $rootScope.photos;

        };
        
        connectorService.changeGallery = function(gallery_id){
            $rootScope.currentGallery = gallery_id;

            var deferred = $q.defer(),
                promise = deferred.promise;

            $http.get('/api/photos/' + $rootScope.currentGallery)
                .success(function(data){
                    $rootScope.photos = data.photoset.photo;
                    console.log('Retrieved: ' + $rootScope.photos);

                    var firstImage = angular.element(new Image());
                    firstImage
                        .bind('load', function(event){
                            deferred.resolve(event); //Resolve the deferred once the first image has been loaded
                        })
                        .attr('src', $rootScope.photos[0].url_o);
                    connectorService.broadcast($rootScope.photos);
                })

                .error(function(error){
                    console.log('Error: ' + error);
                    
                    deferred.reject(error);
                });
            console.log('Changing to gallery:' + gallery_id);
            return promise;
        };


        return connectorService;

});