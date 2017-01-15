/**
 * Created by augusto on 4/12/16.
 */
function galleryController($scope, $timeout, connectorService){
    //Set up gallery
    
    var vm = $scope; //aliasing to easily adapt to controllerAs pattern later

    const PRELOAD_LENGTH = 3; //how many imgs to preload
    const AUTO_FWD_TIMEOUT = 10000;

    vm.cursor = 0;
    
    vm.photos = [];



    vm.updateCursor = function(newCursor) {

        var start = newCursor,
            last = vm.photos.length,
            end = newCursor + PRELOAD_LENGTH,
            end = end <= last ? end : last;

        //Hide current photo
        vm.photos[vm.cursor].show = false;

        //Make next photo visible
        vm.photos[start].show = true;

        //Preload next photos
        for (i = start; i <= end; i++){
            vm.photos[i].preload = true;
            //Once set to preload I want it to stay so, no need to unset
        }
        vm.cursor = newCursor;
        console.log(vm.cursor);
        //$timeout(vm.next, AUTO_FWD_TIMEOUT);
    };

    vm.next = function(){
        var newCursor = vm.cursor < vm.photos.length ? vm.cursor + 1 : 0;
        vm.updateCursor(newCursor);
        console.log('Switching to next photo: '+ newCursor + ' of '+ vm.photos.length);

    };
    
    vm.previous = function(){
        var newCursor = vm.cursor > 0 ? vm.cursor - 1 : 0;
        vm.updateCursor(newCursor);
        console.log('Switching to previous photo');
    };
    
    vm.photos = connectorService.getCurrentGallery();

    connectorService.onChange(function(photos){
        vm.photos = photos.map(function preprocessPhoto(photo){
            photo.show = false;
            photo.preload = false;
            return photo;
        });
        
        vm.updateCursor(0);
    });
    
}

angular.module('ag-gallery')
    .controller('galleryController', galleryController);
