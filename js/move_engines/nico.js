var nico = function () {
    var self = {};
    var count =0;
    
    var internalGrid = [[0]];
    var position = [0, 0];
    var defaultValue = -1;
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
        }
        // Update left
        if (neighboringCells.left === 1){
            internalGrid[position[0]][position[1]-1] = defaultWallValue;
        }
        // Update down
        if (neighboringCells.bottom === 1){
            internalGrid[position[0]+1][position[1]] = defaultWallValue;
        }
        // Update right
        if (neighboringCells.right === 1){
            internalGrid[position[0]][position[1]+1] = defaultWallValue;
        }
    }
    

    self.getNextMove = function(neighboringCells){
        updateInternalGrid(neighboringCells);
        
        //count+=1;
        //if (count === 10 ) {
            refreshHiddenWall();
        //    count =0;
        //}
        
        // Check Bestway
        var up = internalGrid[position[0]-1][position[1]];
        var left = internalGrid[position[0]][position[1]-1];
        var bottom = internalGrid[position[0]+1][position[1]];
        var right = internalGrid[position[0]][position[1]+1];
        
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
        var launchRefresh = 0;
        var nbWall = nbOther = 0;
        for(var i = 0; i < internalGrid.length; i++) {
            for(var j = 0; j < internalGrid[i].length; j++) {
                // Analyse des bord et declancher le refresh si 60% ou+ des bord sont à defaultWall
                if (i === 0 || j === 0 || j === internalGrid[0].length-1 || i === internalGrid.length-1 ) {
                    if (internalGrid[i][j] === defaultWallValue){
                        nbWall++;
                    } else {
                        nbOther++;
                    }
                }
                // Detection des coins
                if ((i === 0 && j === 0) || (i === 0 && j === internalGrid[0].length-1) ||
                    (i === internalGrid.length-1 && j === 0) || (i === internalGrid.length-1 && j === internalGrid[0].length-1)) {
                    continue;
                }
            }
        }
        // 60 % ... 
        if ( ((nbWall * 100) / nbOther >= 60 ) ){ // nb Wall >= 60% ...
            launchRefresh = 1; 
        }
        
        // Refresh hidden wall 
        if (launchRefresh === 1) {
            for(var i = 0; i < internalGrid.length; i++) {
                for(var j = 0; j < internalGrid[i].length; j++) {
                    if (internalGrid[i][j] === defaultValue) {
                        if (i===0) {
                            try{// coin haut-gauche
                                if (defaultWallValue === internalGrid[i+1][j] &&
                                    defaultWallValue === internalGrid[i][j+1]){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                            try{// sur ligne haut
                                if (defaultWallValue === internalGrid[i+1][j] &&
                                    defaultWallValue === internalGrid[i][j+1] &&
                                    defaultWallValue === internalGrid[i][j-1]){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                            try{// coin haut-droit
                                if (defaultWallValue === internalGrid[i+1][j] &&
                                    defaultWallValue === internalGrid[i][j-1]){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                        }
                        if (j === internalGrid[0].length-1) {
                            try{// sur colonne droite
                                if (defaultWallValue === internalGrid[i+1][j] &&
                                    defaultWallValue === internalGrid[i-1][j] &&
                                    defaultWallValue === internalGrid[i][j-1]){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                        }
                        if (i === internalGrid.length-1) {
                            try{// sur ligne basse
                                if (defaultWallValue === internalGrid[i-1][j] &&
                                    defaultWallValue === internalGrid[i][j+1] &&
                                    defaultWallValue === internalGrid[i][j-1]){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                            try{// coin bas-droit
                                if (defaultWallValue === internalGrid[i-1][j] &&
                                    defaultWallValue === internalGrid[i][j-1]){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                        }
                        if (j === 0) {
                            try{// coin bas-gauche
                                if (defaultWallValue === internalGrid[i-1][j] &&
                                    defaultWallValue === internalGrid[i][j+1]){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                            try{// sur colonne gauche
                                if (defaultWallValue === internalGrid[i-1][j] &&
                                    defaultWallValue === internalGrid[i+1][j] &&
                                    defaultWallValue === internalGrid[i][j+1]){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                        }
                        if (i === 0 && j === 0) {
                            try{// coin haut-droit isolé
                                if (defaultWallValue === internalGrid[i+1][j+1] &&
                                    defaultWallValue === internalGrid[i][j+2] &&
                                    defaultWallValue === internalGrid[i+2][j] ){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                        }
                        if (i === 0 && j === internalGrid[0].length-1) {
                            try{// coin haut-gauche isolé
                                if (defaultWallValue === internalGrid[i+1][j-1] &&
                                    defaultWallValue === internalGrid[i][j-2] &&
                                    defaultWallValue === internalGrid[i+2][j]){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                        }
                        if (i === internalGrid.length-1 && j === internalGrid[0].length-1) {
                            try{// coin bas-gauche isolé
                                if (defaultWallValue === internalGrid[i-1][j-1] &&
                                    defaultWallValue === internalGrid[i][j-2] &&
                                    defaultWallValue === internalGrid[i-2][j]){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                        }
                        if (i === internalGrid.length-1 && j === 0) {
                            try{// coin bas-droit isolé
                                if (defaultWallValue === internalGrid[i-1][j+1] &&
                                    defaultWallValue === internalGrid[i][j+2] &&
                                    defaultWallValue === internalGrid[i-2][j]){
                                    internalGrid[i][j] = defaultWallValue;
                                }
                            } catch (error) { }
                        }
                    }
                }
            }
        }
        console.log(internalGrid);
    }

    self.isMapComplete = function (){
        var isMapComplete = true;
        var countinvisited = 0;

        for(var i = 0; i < internalGrid.length; i++) {
            for(var j = 0; j < internalGrid[i].length; j++) {
                if (internalGrid[i][j] === defaultValue) {
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