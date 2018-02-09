var RobotView = function ($board) {
    var self = {},
        cssMapping = {},
        unknown = 'unknown';

    self.updateRobotView = function (viewUpdates){
        var $robotView = $board.find('#robotView'),
            update,
            $targetCell,
            i;

        if ('undefined' !== typeof $robotView && 1 === $robotView.length){
            for(i in viewUpdates){
                if (viewUpdates.hasOwnProperty(i)){
                    update = viewUpdates[i];
                    $targetCell = $robotView.find('td[data-x="' + update.coords.x + '"][data-y="' + update.coords.y + '"]');
                    if (true === $targetCell.hasClass(unknown)){
                        $targetCell.removeClass(unknown).addClass(cssMapping[update.state]);
                    }
                }
            }
        } else {
            console.error('Error in updateRobotView(), no robot view found');
        }
    };

    var init = function($board){
        var css_mapping_json = $board.data('css_mapping_json');
        try{
            cssMapping = JSON.parse(css_mapping_json.replace(/'/g, '"'));
        } catch (e){
            console.error('Exception=', e);
        }
    };

    init($board);

    return self;
};