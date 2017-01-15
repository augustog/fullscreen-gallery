/**
 * Created by augusto on 24/12/16.
 */

function fullscreenImgController($element, $attrs, $timeout){
    var ctrl = this,
        image = $element.find('img');

    ctrl.done = false;
    ctrl.showBackground = false;
    ctrl.orientation = 'landscape';

    image
        .bind('load', function (event) {
            //image should be already loaded, but for portability we'll assume it's not
            img = image[0];
            var width = img.width,
                height = img.height;

            if (width > height){
                ctrl.orientation = 'landscape';
                console.log('Landscape image detected');
            } else if (height > width){
                ctrl.orientation = 'portrait';
                ctrl.showBackground = true;
                console.log('Portrait image detected');
            } else {
                throw 'Image size error:' + height + ' x ' + width;
            }
            ctrl.done = true;
            console.log(event + "and calibrated");
            $timeout(0);

        })
        .bind('error', function(error){
            ctrl.onError(error);
            console.log('error loading image: ' + error);
        })
        .attr('src', ctrl.src)
}

angular.module('ag-gallery')
    .component('fullscreenImg', {
        templateUrl: '/js/fullscreenImg/fullscreenImg.html',
        controller: fullscreenImgController,
        bindings: {
            src:'<',
            onError: '&'
        }
    });