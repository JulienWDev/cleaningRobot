var Sensors = function (boardId) {

    var self = {},
        grid = {},
        robotView,
        failsafe,
        $board;

    self.min_X = 0;
    self.min_Y = 0;
    self.max_X = 0;
    self.max_Y = 0;

    var getCellState = function(coords){

        var cellState = 1,
        x = coords.x,
        y = coords.y;

        if (self.min_X <= x && x <= self.max_X && self.min_Y <= y && y <= self.max_Y){
            cellState = grid[y][x];
        }

        return cellState;
    };


    self.getNeighboringCells = function ($currentCell){
        var neighboringCells = {'up': 1, 'right': 1, 'bottom' : 1, 'left': 1},
            currentX,
            currentY,
            currentCoords,
            upCoords,
            rightCoords,
            bottomCoords,
            leftCoords,
            viewUpdates;

        if ('undefined' === typeof $currentCell || 0 === $currentCell.length){
            console.error('No possible move found');
            return neighboringCells;
        }

        currentX = parseInt($currentCell.data('x'), 10);
        currentY = parseInt($currentCell.data('y'), 10);

        currentCoords = {'x': currentX, 'y': currentY};
        upCoords = {'x': currentX, 'y': currentY - 1};
        rightCoords = {'x': currentX + 1, 'y': currentY};
        bottomCoords = {'x': currentX, 'y': currentY + 1};
        leftCoords = {'x': currentX - 1, 'y': currentY};

        neighboringCells.up = getCellState(upCoords);
        neighboringCells.right = getCellState(rightCoords);
        neighboringCells.bottom = getCellState(bottomCoords);
        neighboringCells.left = getCellState(leftCoords);

        viewUpdates = [
            {'coords': currentCoords, 'state': getCellState(currentCoords)},
            {'coords': upCoords, 'state': neighboringCells.up},
            {'coords': rightCoords, 'state': neighboringCells.right},
            {'coords': bottomCoords, 'state': neighboringCells.bottom},
            {'coords': leftCoords, 'state': neighboringCells.left}
            ];

        robotView.updateRobotView(viewUpdates);
        return neighboringCells;
    };

    self.getGrid = function(){
        return grid;
    };

    self.getBoard = function(){
        return $board;
    };

    self.getFailsafe = function (){
        return failsafe;
    };

    var init = function(boardId){

        $board = $('#' + boardId);

        var $coderViewBoundaries = $('#coderView_boundaries');

        console.log('Démarrage des capteurs');

        if ('undefined' === typeof $board || 0 === $board.length){
            console.error('Error in Sensors.init(), no board found');
            return false;
        }

        grid = $board.data('grid_json');
        self.max_X = $coderViewBoundaries.data('max_x');
        self.max_Y = $coderViewBoundaries.data('max_y');

        robotView = new RobotView($board);

        failsafe = (robotView.getRobotView().find('td').length) * 4;

        console.log('Capteurs fonctionnels');
        return this;
    };

    init(boardId);


    return self;
};
