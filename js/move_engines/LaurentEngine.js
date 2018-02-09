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

        //console.log(internalGrid.discoveredGrid);
        //console.log(internalGrid.ponderationGrid);
        setVisited(neighboringCells);
        totalMove++;

        throw new Error('========= STOP =========');
        return direction.up;
    };

    function setVisited(neighboringCells){
        console.log(neighboringCells);
        for(var x in internalGrid.discoveredGrid){
            var subGrid = internalGrid.discoveredGrid[x];
            //console.log(subGrid);
            for(var y in subGrid){
                if(x == position.x && y == (position.y - 1) ){
                    console.log('UP x:' + x + ' y:'+ y);
                    internalGrid.discoveredGrid[x][y] = neighboringCells.up;
                }

                if(x == position.x && y == (position.y + 1) ){
                    console.log('UP x:' + x + ' y:'+ y);
                    internalGrid.discoveredGrid[x][y] = neighboringCells.bottom;
                }

                if(x == (position.x - 1) && y == position.y ){
                    console.log('UP x:' + x + ' y:'+ y);
                    internalGrid.discoveredGrid[x][y] = neighboringCells.left;
                }

                if(x == (position.x + 1) && y == position.y ){
                    console.log('UP x:' + x + ' y:'+ y);
                    internalGrid.discoveredGrid[x][y] = neighboringCells.right;
                }
                console.log('x:' + x + ' y:'+ y);
            }
        }

        console.log(internalGrid.discoveredGrid);
    }

    self.isMapComplete = function (){
        var isMapComplete = false;

        return isMapComplete;
    };

    return self;
};