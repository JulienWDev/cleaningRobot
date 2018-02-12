var nico = function () {
    var self = {};
    var count =0;
    
    var internalGrid = [[0]];
    var position = [0, 0];
    var defaultValue = 0;
    var defaultWallValue = 5000;
    
    function addUp() {
        internalGrid.unshift( initTab(internalGrid[0].length) ) ;
        position[0] += 1;
    }

    function addDown() {
        internalGrid.push( initTab(internalGrid[0].length) ) ;
    }

    function addLeft() {
        for(var i = 0; i < internalGrid.length; i++) {
            internalGrid[i].unshift(defaultValue);
        }
        position[1] += 1;
    }

    function addRigth() {
        for(var i = 0; i < internalGrid.length; i++) {
            internalGrid[i].push(defaultValue);
        }
    }

    function initTab(size) {
        var tab = new Array(size);
        tab.fill(defaultValue) ;
        return tab;
    }

    
    function updateInternalGrid(neighboringCells){
        // Update actual position
        internalGrid[position[0]][position[1]] += 1;
        
        /// Update Grid form
        // Update Up
        if (position[0] === 0 ) {
            addUp();
        }
        // Update left
        if (position[1] === 0) {
            addLeft();
        }
        // Update down
        if (position[0] === internalGrid.length-1) {
            addDown();
        }
        // Update right
        if (position[1] === internalGrid[0].length-1) {
            addRigth();
        }
        
        /// Update Wall Case
        // Update Up
        if (neighboringCells.up === 1){
            internalGrid[position[0]-1][position[1]] = defaultWallValue;
            //getOrSetUpValue(defaultWallValue);
        }
        // Update left
        if (neighboringCells.left === 1){
            internalGrid[position[0]][position[1]-1] = defaultWallValue;
            //getOrSetLeftValue(defaultWallValue);
        }
        // Update down
        if (neighboringCells.bottom === 1){
            internalGrid[position[0]+1][position[1]] = defaultWallValue;
            //getOrSetDownValue(defaultWallValue);
        }
        // Update right
        if (neighboringCells.right === 1){
            internalGrid[position[0]][position[1]+1] = defaultWallValue;
            //getOrSetRightValue(defaultWallValue);
        }
    }
    
    /*function getOrSetValue(col, line, addValue) {
        //if (typeof addValue !== 'undefined') {
        if (addValue) {
            if (internalGrid[col][line] !== defaultWallValue){
                internalGrid[col][line] += addValue;
            }
        return internalGrid[col][line];
    }
    
    function getOrSetUpValue(addValue) {
        return getOrSetValue(position[0]-1, position[1], addValue);
    }
    
    function getOrSetLeftValue(addValue) {
        return getOrSetValue(position[0], position[1]-1, addValue);
    }
    
    function getOrSetDownValue(addValue) {
        return getOrSetValue(position[0]+1, position[1], addValue);
    }
    
    function getOrSetRightValue(addValue) {
        return getOrSetValue(position[0], position[1]+1, addValue);
    }*/

    self.getNextMove = function(neighboringCells){
        //console.log("next run ", position);
        //console.log(neighboringCells.up,neighboringCells.left,neighboringCells.bottom,neighboringCells.right);
        updateInternalGrid(neighboringCells);
        
        count+=1;
        if (count === 10 ) {
            refreshHiddenWall();
            count =0;
            //exit();
        }
        
        // Check Bestway
        var up = internalGrid[position[0]-1][position[1]];
        var left = internalGrid[position[0]][position[1]-1];
        var bottom = internalGrid[position[0]+1][position[1]];
        var right = internalGrid[position[0]][position[1]+1];
        
        //console.log("up",up,"left",left,"bottom",bottom,"right",right);
        if (up <= left && up <= bottom && up <= right ){
            position[0] -=  1;
            return "up";
        } else if (left <= bottom && left <= right){
            position[1] -=  1;
            return "left";
        } else if (bottom <= right){
            position[0] +=  1;
            return "bottom";
        } else {
            position[1] +=  1;
            return "right";
        }
        
    };
    
    function refreshHiddenWall(){
        console.log("Refresh wall");
        for(var i = 0; i < internalGrid.length; i++) {
            for(var j = 0; j < internalGrid[i].length; j++) {
                if (internalGrid[i][j] === 0) {
                    if (i===0) {
                        try{// coin haut-gauche
                            if (defaultWallValue === internalGrid[i+1][j] &&
                                defaultWallValue === internalGrid[i][j+1]){
                                console.log(internalGrid);
                                internalGrid[i][j] = defaultWallValue;
                            }
                        } catch (error) { }
                        try{// sur ligne haut
                            if (defaultWallValue === internalGrid[i+1][j] &&
                                defaultWallValue === internalGrid[i][j+1] &&
                                defaultWallValue === internalGrid[i][j-1]){
                                console.log(internalGrid);
                                internalGrid[i][j] = defaultWallValue;
                            }
                        } catch (error) { }
                        try{// coin haut-droit
                            if (defaultWallValue === internalGrid[i+1][j] &&
                                defaultWallValue === internalGrid[i][j-1]){
                                console.log(internalGrid);
                                internalGrid[i][j] = defaultWallValue;
                            }
                        } catch (error) { }
                    }
                    if (j === internalGrid[0].length-1) {
                        try{// sur colonne droite
                            if (defaultWallValue === internalGrid[i+1][j] &&
                                defaultWallValue === internalGrid[i-1][j] &&
                                defaultWallValue === internalGrid[i][j-1]){
                                console.log(internalGrid);
                                internalGrid[i][j] = defaultWallValue;
                            }
                        } catch (error) { }
                    }
                    if (i === internalGrid.length-1) {
                        try{// sur ligne basse
                            if (defaultWallValue === internalGrid[i-1][j] &&
                                defaultWallValue === internalGrid[i][j+1] &&
                                defaultWallValue === internalGrid[i][j-1]){
                                console.log(internalGrid);
                                internalGrid[i][j] = defaultWallValue;
                            }
                        } catch (error) { }
                        try{// coin bas-droit
                            if (defaultWallValue === internalGrid[i-1][j] &&
                                defaultWallValue === internalGrid[i][j-1]){
                                console.log(internalGrid);
                                internalGrid[i][j] = defaultWallValue;
                            }
                        } catch (error) { }
                    }
                    if (j === 0) {
                        try{// coin bas-gauche
                            if (defaultWallValue === internalGrid[i-1][j] &&
                                defaultWallValue === internalGrid[i][j+1]){
                                console.log(internalGrid);
                                internalGrid[i][j] = defaultWallValue;
                            }
                        } catch (error) { }
                        try{// sur colonne gauche
                            if (defaultWallValue === internalGrid[i-1][j] &&
                                defaultWallValue === internalGrid[i+1][j] &&
                                defaultWallValue === internalGrid[i][j+1]){
                                console.log(internalGrid);
                                internalGrid[i][j] = defaultWallValue;
                            }
                        } catch (error) { }
                    }
                }
            }
        }   
    }

    self.isMapComplete = function (){
        var isMapComplete = true;
        var countinvisited = 0;

        for(var i = 0; i < internalGrid.length; i++) {
            for(var j = 0; j < internalGrid[i].length; j++) {
                if (internalGrid[i][j] === 0) {
                    countinvisited += 1;
                }
            }
        }
        if (countinvisited != 0)
            isMapComplete = false;
            
        return isMapComplete;
    };

    return self;
};