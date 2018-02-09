var MoveEngine = function () {
    var self = {};
    var internalGrid = {};
    var gridIsComplete = false;

    function updateInternalGrid(){

    }

    self.getNextMove = function(neighboringCells){

        console.log(neighboringCells);
        // First init table
        if(internalGrid.count() == 0){

        }
        return 'up';
    };

    self.isMapComplete = function (){
        var isMapComplete = false;

        return isMapComplete;
    };

    return self;
};