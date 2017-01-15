/**
 * Created by augusto on 4/12/16.
 */
var selectorController = function($http, connectorService){
    //Initialise and get list of galleries

    var vm = this;

    vm.loading = true;
    vm.error = false;

    $http.get('/api/albums')
        .success(function(data){
            vm.galleries = data.photosets.photoset;
            console.log(data);

            var gallery_id = vm.galleries[1].id;

            connectorService.changeGallery(gallery_id);

            vm.loading = false;
        })
        .error(function(error){
            console.log('Error: ' + error);
            
            vm.error = true;
        });
    
    
    //Handle change between galleries
    
    vm.changeGallery = function (gallery) {
        var gallery_id = gallery.id;
        var changePromise = connectorService.changeGallery(gallery_id);
        
        vm.loading = true;
        
        console.log('Changing to gallery: ' + gallery_id);
        
        changePromise
            .then(function(data){
                vm.loading = false;
                console.log('Retrieved: ' + data);
            })
            .catch(function(error){
                vm.error = true;
                console.log(error);
            });
        
    }

};

angular.module('ag-gallery')
    .controller('selectorController', selectorController)
    .component('gallerySelector', {
        templateUrl: 'js/gallerySelector/gallerySelector.html',
        controller: selectorController,
        bindings: {}, //TODO: Add bindings to export gallery object
        controllerAs: 'selector'
    });
