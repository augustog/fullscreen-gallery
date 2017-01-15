/**
 * Created by augusto on 17/12/16.
 */

//Built with a rather complex architecture in case extension is needed
function preloadingImgController($q, $scope, $element, $attrs) {
    var ctrl = this, 
        deferred = $q.defer(),
        promise = deferred.promise;

    const states = {
        WAITING: -1,
        LOADING: 0,
        LOADED: 200,
        ERROR: 400
    };
    
    ctrl.states= states;
    
    ctrl.state = states.WAITING;

    ctrl.preload = function(){

        ctrl.state = states.LOADING;

        var image = angular.element(new Image())
            .bind('load', function (event) {
                deferred.resolve(event); //Should be giving it sth different
            })
            .bind('error', function (event) {
                deferred.reject(event);
            })
            .attr('src', ctrl.src);

        promise
            .then(function(event){
                ctrl.state = states.LOADED;
                console.log('image loaded: ');
            })
            .catch(function(event){
                ctrl.state = states.ERROR;
                console.log(event);
            });
    };

    ctrl.$onChanges = function(){
        if (ctrl.doPreload)
            ctrl.preload();
    };
}



angular.module('ag-gallery')
    .component('pImg', {
        templateUrl: '/js/preloadingImg/preloadingImg.html',
        controller: preloadingImgController,
        bindings: {
            src:'<',
            doPreload: '<',
            show: '<'
        }
    });