var LaurentEngine = function () {
    var self = {};
    var internalGrid = {
        discoveredGrid: [],
        ponderationGrid: []
    };
    var gridIsComplete = false;
    var totalMouvements = 0;

    function updateInternalGrid(){

    }

    self.getNextMove = function(neighboringCells){

        console.log(neighboringCells);
        // First init Grid table
        if(totalMouvements == 0){

        }
        return 'up';
    };

    self.isMapComplete = function (){
        var isMapComplete = false;

        return isMapComplete;
    };

    return self;
};