var Robot = function (boardId, $startCell) {
    var self = {},
        sensors,
        moveEngine,
        failsafe = 500,
        rcp, //robot command panel
        $currentCell,
        neighboringCells,
        robotCssClass = 'robot',
        validDirections = ['up', 'right', 'bottom', 'left'];

    self.exploreGrid = function(){
            var direction,
                moves = 0;
        while (false === moveEngine.isMapComplete() && moves < failsafe){
            neighboringCells = sensors.getNeighboringCells($currentCell);
            direction = moveEngine.getNextMove(neighboringCells);
            self.move(direction);
            moves++;
        }

        if (true === moveEngine.isMapComplete()){
           console.log('Carte complète!');
        } else {
            console.error('Carte incomplète!');
        }
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
        sensors = new Sensors(boardId);
        if (false === sensors){
            return false
        }

        return true;
    }

    function initMoveEngine() {
        moveEngine = new LaurentEngine();
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
        neighboringCells = sensors.getNeighboringCells($currentCell);
    };

    init(boardId, $startCell);

    return self;
};
