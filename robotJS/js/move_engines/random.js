var random = function () {
    var self = {};
    var internalGrid = {};
    var gridIsComplete = false;

    //var DirectionEnum = Object.freeze({1:"up", 2:"left", 3:"down", 4:"right"})
    /*var DirectionEnum = (function() {
        function ErrorValue(value, friendly) {
          this.value = value;
          this.friendly = friendly;
        }
        ErrorValue.prototype = {
          toString: function() { return this.friendly; },
          valueOf: function() { return this.value; }
        };
        return {
          'up': new ErrorValue(1, 'up'),
          'left': new ErrorValue(2, 'left'),
          'down': new ErrorValue(3, 'down'),
          'right': new ErrorValue(4, 'right'),
        };
    })();*/
    var direction = ['up', 'right', 'bottom', 'left'];
    
    function updateInternalGrid(){

    }
    
    function entierAleatoire(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    self.getNextMove = function(neighboringCells){
        var aleat = entierAleatoire(0,3);
        return direction[aleat];
    };

    self.isMapComplete = function (){
        var isMapComplete = false;

        return isMapComplete;
    };

    return self;
};