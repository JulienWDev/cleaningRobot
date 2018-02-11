var Robot = function (boardId, $startCell) {
    var self = {},
        sensors,
        moveEngine,
        movesCount = 0,
        failsafe = 10, //low default, will be updated by the sensors
        exploreMode,
        rcp, //robot command panel
        $currentCell,
        neighboringCells,
        robotCssClass = 'robot',
        validDirections = ['up', 'right', 'bottom', 'left'];

    self.exploreGrid = function(engine, mode){
        console.log('Mode d\'exploration : ', mode);

        window.engine = engine;
        if (false === initMoveEngine()){
            return false;
        }
        exploreMode = mode;

        execute_moves_loop();
    };

    var execute_moves_loop = function () {
        var direction;
        neighboringCells = sensors.getNeighboringCells($currentCell);
        direction = moveEngine.getNextMove(neighboringCells);
        self.move(direction);
        movesCount++;

        if (true === moveEngine.isMapComplete()){
            console.log('Map is complete!');
        } else {
            if (movesCount < failsafe){
                if ('auto_with_interval' === exploreMode){
                    window.setTimeout(function(){
                        execute_moves_loop();
                    }, 1000);
                } else {
                    execute_moves_loop();
                }
            } else{
                console.error('map is not complete! (failsafe of ' + failsafe + ' moves reached)');
            }
        }

        return true;
    };

    var moveIsValid = function (direction) {
        var moveIsValid = false;
        if(-1 !== validDirections.indexOf(direction)){
            if (neighboringCells[direction] === 0){
                moveIsValid = true;
            } else {
                console.error('This move is impossible:', direction);
            }
        } else {
            console.error('Error in moveIsValid(): invalid direction given', direction);
        }

        return moveIsValid;
    };

    self.move = function (direction){

        var $coderView = sensors.getBoard().find('#coderView'),

            currentX = $currentCell.data('x'),
            currentY = $currentCell.data('y'),
            nextCoords = {},
            $nextCell;

        if(-1 !== validDirections.indexOf(direction)){
            switch(direction){
                case 'up': nextCoords = {'x': currentX, 'y': currentY - 1};
                    break;
                case 'right': nextCoords = {'x': currentX + 1, 'y': currentY};
                    break;
                case 'bottom': nextCoords = {'x': currentX, 'y': currentY + 1};
                    break;
                case 'left': nextCoords = {'x': currentX - 1, 'y': currentY};
                    break;
                default: console.error('Error in move(): invalid direction given', direction);
                    break;
            }
        } else {
            console.error('Error in move: invalid direction given', direction);
        }

        if (true === moveIsValid(direction)){
            $currentCell.removeClass(robotCssClass);
            $nextCell = $coderView.find('td[data-x="' + nextCoords.x + '"][data-y="' + nextCoords.y + '"]');
            //we update the current cell
            $currentCell = $nextCell;
            $currentCell.addClass(robotCssClass);
        }

        neighboringCells = sensors.getNeighboringCells($currentCell);

    };

    function showOnMap($startCell){
        $startCell.addClass(robotCssClass);
    }

    self.attachCommandPanel = function(commandPanel){
        rcp = commandPanel;
        if (true === rcp.doBindings()){
            console.log('Commandes du robot activées');
            rcp.activatePanelButtons(rcp.getButtons());
        }
    };

    function initSensor(boardId) {
        try{
            sensors = new Sensors(boardId);
            return true;
        } catch(e){
            console.error('Error in initSensor():', e);
            return false;
        }
    }

    function initMoveEngine() {
        try{
            moveEngine = new window[engine]();

            if ('undefined' === typeof moveEngine.getNextMove){
                throw new Error('Engine is missing mandatory function "getNextMove"');
            }
            if ('undefined' === typeof moveEngine.isMapComplete){
                throw new Error('Engine is missing mandatory function "isMapComplete"');
            }
            return true;
        } catch(e){
            console.error('Error in initMoveEngine():', e);
            return false;
        }
    }

    self.getSensors = function(){
      return sensors;
    };

    init = function (boardId, $startCell){
        console.log('Démarrage du robot, $startCell=', $startCell);
        initSensor(boardId);
        failsafe = sensors.getFailsafe();
        showOnMap($startCell);
        $currentCell = $startCell;
        neighboringCells = sensors.getNeighboringCells($currentCell);
    };

    init(boardId, $startCell);

    return self;
};
