var Robot = (function () {
    var self = {};
    var sensors;
    var $currentCell;


    function exploreGrid(){
        while (false === isMapComplete()){
            var neighboringCells;
            getNextMove();
        }
    }

    function move(direction){

    }

    function updateInternalGrid(){

    }

    self.lookAround = function(){
        Sensors.getNeighboringCells($currentCell);
    };

    function showOnMap($startCell){
        $startCell.addClass('robot');
    }

    function initSensor() {
        sensors = new Sensors();
    }

    self.init = function ($startCell){
        console.log('Démarrage du robot, $startCell=', $startCell);
        showOnMap($startCell);
        $currentCell = $startCell;

        exploreGrid();
    };

    return self;
})();
