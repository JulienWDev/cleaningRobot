var Robot = function (boardId, $startCell) {
    var self = {};
    var sensors;
    var moveEngine;
    var $currentCell;

    self.exploreGrid = function(){
        var neighboringCells,
            direction;
        // while (false === MoveEngine.isMapComplete()){
            neighboringCells = sensors.getNeighboringCells($currentCell);
            direction = moveEngine.getNextMove(neighboringCells);
            self.move(direction);
        // }
    };

    self.move = function (direction){
        var validDirections = ['up', 'right', 'bottom', 'left'];
        console.log('in move, direction=', direction);
        if(-1 !== validDirections.indexOf(direction)){
            console.log('moving');
        } else {
            console.error('Error in move: invalid direction given', direction);
        }

    };

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

    init = function (boardId, $startCell){
        console.log('Démarrage du robot, $startCell=', $startCell);
        initSensor(boardId);
        initMoveEngine();
        showOnMap($startCell);
        $currentCell = $startCell;
    };

    init(boardId, $startCell);

    return self;
};
