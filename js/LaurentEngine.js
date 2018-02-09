var LaurentEngine = function () {
    var self = {};
    var internalGrid = {
        discoveredGrid : [],
        ponderationGrid : [],
    };
    var direction = { up: 'up', down: 'down', left:'left', right:'right' };
    var gridIsComplete = false;
    var totalMove = 0;
    var position = {
        x: 0,
        y: 0
    }

    function updateSizeGrids(grid){

    }

    self.getNextMove = function(neighboringCells){

        if(totalMove == 0){
            position.x = 1;
            position.y = 1;

            // initalize grids
            for(var i = 0 ; i < 3 ; i++){
                internalGrid.discoveredGrid.push([0,0,0]);
                internalGrid.ponderationGrid.push([0,0,0]);
            }
        }

        console.log(internalGrid.discoveredGrid);
        console.log(internalGrid.ponderationGrid);
        setVisited(neighboringCells);
        totalMove++;

        throw new Error('========= STOP =========');
        return direction.up;
    };

    function setVisited(neighboringCells){
        for(var i in internalGrid.ponderationGrid){
            var subGrid = internalGrid.ponderationGrid[i];
            //console.log(subGrid);
            for(var j in subGrid){
                console.log(subGrid[j]);
            }
        }
    }

    self.isMapComplete = function (){
        var isMapComplete = false;

        return isMapComplete;
    };

    return self;
};