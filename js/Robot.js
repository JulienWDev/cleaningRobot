var Robot = (function () {
    var self = {};
    var sensors;
    var moveEngine;
    var $currentCell;

    function exploreGrid(){
        var neighboringCells,
            direction;
        // while (false === MoveEngine.isMapComplete()){
            neighboringCells = sensors.getNeighboringCells($currentCell);
            direction = moveEngine.getNextMove(neighboringCells);
            move(direction);
        // }
    }

    function move(direction){
        console.log('in move, direction=', direction);
    }

    function showOnMap($startCell){
        $startCell.addClass('robot');
    }

    function initSensor(boardId) {
        sensors = new Sensors(boardId);
        if (false === sensors){
            return false
        }
        return true;
    }

    function initMoveEngine() {
        moveEngine = new MoveEngine();
        if (false === moveEngine){
            return false
        }
        return true;
    }

    self.getSensors = function(){
      return sensors;
    };

    self.init = function (boardId, $startCell){
        console.log('Démarrage du robot, $startCell=', $startCell);
        initSensor(boardId);
        initMoveEngine();
        showOnMap($startCell);
        $currentCell = $startCell;

        exploreGrid();
    };

    return self;
})();
