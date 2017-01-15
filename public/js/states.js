/**
 * Created by augusto on 14/1/17.
 */

angular.module('ag-gallery')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('main', {
                url:'/',
                template: '',
                controller: null
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: null
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html',
                controller: null
            })
            .state('purchase-prints', {
                url: '/purchase-prints',
                templateUrl: 'views/purchase-prints.html',
                controller: null
            });
    }]);