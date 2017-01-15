/**
 * Created by augusto on 14/1/17.
 */

function overlayController($state, $timeout){
    var vm = this;

    vm.viewportVisible = (!$state.current.name == 'default');
    vm.menuVisible = true;

    vm.showMenu = function(){
        if (!vm.menuVisible)
            vm.menuVisible = true;
    };

    vm.hideMenu = function(){
        if(vm.menuVisible)
            vm.menuVisible = false;
    };

    vm.toggleMenu = function () {
        vm.menuVisible = !vm.menuVisible;
    };

    angular.element(document).ready(function(){
        $timeout(function(){
            vm.hideMenu();
        }, 700);
    });

}

angular.module('ag-gallery')
    .controller('overlayController', overlayController)
    .component('showHideMenu', {
        templateUrl: 'js/showHideMenu/showHideMenu.html',
        controller: menuController,
        bindings: {},
        controllerAs: 'menu'
    });