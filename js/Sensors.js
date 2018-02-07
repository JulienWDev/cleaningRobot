var Sensors = function (boardId) {

    var self = {},
        grid = {};

    self.min_X = 0;
    self.min_Y = 0;
    self.max_X = 0;
    self.max_Y = 0;

    var getCellState = function(x, y){
        var cellState = 1;
        if (self.min_X <= x && x <= self.max_X && self.min_Y <= y && y <= self.max_Y){
            cellState = grid[y][x];
        }
        return cellState;
    };


    self.getNeighboringCells = function ($currentCell){
        var neighboringCells = {'up': 1, 'right': 1, 'bottom' : 1, 'left': 1},
            currentX,
            currentY;

        if ('undefined' === typeof $currentCell || 0 === $currentCell.length){
            console.error('No possible move found');
            return neighboringCells;
        }

        currentX = parseInt($currentCell.data('x'), 10);
        currentY = parseInt($currentCell.data('y'), 10);

        neighboringCells.up = getCellState(currentX, currentY - 1);
        neighboringCells.right = getCellState(currentX + 1, currentY);
        neighboringCells.bottom = getCellState(currentX,  currentY + 1);
        neighboringCells.left = getCellState(currentX - 1, currentY);

        return neighboringCells;
    };

    self.getGrid = function(){
        return grid;
    };

    var init = function(boardId){
        var $board = $('#' + boardId),
            $coderViewBoundaries = $('#coderView_boundaries');

        console.log('Démarrage des capteurs');

        if ('undefined' === typeof $board || 0 === $board.length){
            console.error('Error in Sensors.init(), no board found');
            return false;
        }

        grid = $board.data('grid_json');
        self.max_X = $coderViewBoundaries.data('max_x');
        self.max_Y = $coderViewBoundaries.data('max_y');

        console.log('Capteurs fonctionnels');
        return this;
    };

    init(boardId);


    return self;
};
