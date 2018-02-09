var Broken = function () {
    var self = {};
    var internalGrid = {};
    var gridIsComplete = false;

    function updateInternalGrid(){

    }

    self.getNextMove = function(neighboringCells){
        return 'up';
    };

    self.isMapComplete = function (){
        var isMapComplete = false;

        return isMapComplete;
    };

    console.log('in Broken.js');

    return self;
};