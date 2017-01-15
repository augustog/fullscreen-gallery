/**
 * Created by augusto on 4/12/16.
 */
var selectorController = function($scope, $http, connectorService){
    //Initialise and get list of galleries
    
    $scope.loading = true;
    $scope.error = false;

    $http.get('/api/albums')
        .success(function(data){
            $scope.galleries = data.photosets.photoset;
            console.log(data);

            var gallery_id = $scope.galleries[1].id;

            connectorService.changeGallery(gallery_id);

            $scope.loading = false;
        })
        .error(function(error){
            console.log('Error: ' + error);
            
            $scope.error = true;
        });
    
    
    //Handle change between galleries
    
    $scope.changeGallery = function (gallery) {
        var gallery_id = gallery.id;
        var changePromise = connectorService.changeGallery(gallery_id);
        
        $scope.loading = true;
        
        console.log('Changing to gallery: ' + gallery_id);
        
        changePromise
            .then(function(data){
                $scope.loading = false;
                console.log('Retrieved: ' + data);
            })
            .catch(function(error){
                $scope.error = true;
                console.log(error);
            });
        
    }

};

angular.module('ag-gallery')
    .controller('selectorController', selectorController);
