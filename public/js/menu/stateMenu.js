/**
 * Created by augusto on 15/1/17.
 */
function camelCaseToWords(name) {
    var words = name.match(/[A-Za-z][a-z]*/g);

    return words.map(capitalize).join(" ");
}

function hyphenedStringToWords(name){
    var words = name.split('-')
    return words.map(capitalize).join(" ");
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

function addTitleToState (state){
    state.title = hyphenedStringToWords(state.name);
    return state;
}

function menuController ($state){
    var vm = this;
    vm.states = $state
        .get()
        .slice(1)
        .map(addTitleToState); //remove first abstract state
}


angular.module('ag-gallery')
    .component('stateMenu', {
        templateUrl: '/js/stateMenu/stateMenu.html',
        controller: menuController,
        bindings: {}
    });