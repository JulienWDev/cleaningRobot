var random = function () {
    var self = {};
    var internalGrid = {};
    var gridIsComplete = false;
    var countMove = 0;
    var maxMove = 300;
    
    var direction = ['up', 'right', 'bottom', 'left'];
    
    function updateInternalGrid(){

    }
    
    function entierAleatoire(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    self.getNextMove = function(neighboringCells){
        var aleat = entierAleatoire(0,3);
        countMove++;
        return direction[aleat];
    };

    self.isMapComplete = function (){
        var isMapComplete = false;
        if (countMove === maxMove)
            isMapComplete = true;
        return isMapComplete;
    };

    return self;
};