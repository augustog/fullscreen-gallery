/**
 * Created by augusto on 18/12/16.
 */
angular.module('ag-gallery')
    .directive('bgImg', function(){
        return function(scope, element, attrs){
            var url = attrs.bgImg;
            element.css({
                'background-image': 'url(' + url + ')',
                'background-attachment': 'fixed',
                'background-repeat': 'no-repeat',
                'background-position': 'center center'
            });
        };
    });