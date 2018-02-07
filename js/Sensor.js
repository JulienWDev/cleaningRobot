var Sensors =(function () {
    var self = {};

    var cellExists = function(){
        var $cell = {};

        return $cell;
    };

    var getCellState = function(){

    };


    self.getNeighboringCells = function ($currentCell){
        console.log('in getNeighboringCells(), $currentCell=', $currentCell);
        var row,
            tbody,
            xCoord,
            yCoord,
            upCell,
            upCellCoords = {},
            rightCell,
            rightCellCoords = {},
            bottomCell,
            bottomCellCoords = {},
            leftCell,
            leftCellCoords = {};

        xCoord = parseInt($currentCell.parent().children().index($currentCell), 10);
        row = $currentCell.parent('tr');
        tbody = row.parent('tbody');
        yCoord = tbody.children().index(row);
        // var yCoord = $currentCell.parent().children().index($currentCell);
        console.log('xCoord =', xCoord);
        console.log('yCoord =', yCoord);

        upCellCoords = {'x': xCoord, 'y': yCoord - 1};
        rightCellCoords = {'x': xCoord + 1, 'y': yCoord};
        bottomCellCoords = {'x': xCoord, 'y': yCoord + 1};
        leftCellCoords = {'x': xCoord - 1, 'y': yCoord};

        return {'up': upCell, 'right': rightCell, 'bottom' : bottomCell, 'left': leftCell};
    };


    return self;
})();
