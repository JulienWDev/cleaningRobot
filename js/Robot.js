var Robot = (function () {
    var self = {};
    var sensors;
    var $currentCell;


    function exploreGrid(){
        // while (false === MoveEngine.isMapComplete()){
            var neighboringCells = sensors.getNeighboringCells($currentCell);
            console.log('neighboringCells =', neighboringCells);
            MoveEngine.getNextMove(neighboringCells);
            // move();
        // }
    }

    function move(direction){

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

    self.getSensors = function(){
      return sensors;
    };

    self.init = function (boardId, $startCell){
        console.log('Démarrage du robot, $startCell=', $startCell);
        initSensor(boardId);
        showOnMap($startCell);
        $currentCell = $startCell;

        exploreGrid();
    };

    return self;
})();
