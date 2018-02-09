var RobotCommandPanel = function (rcpId, robotToControl) {
    var self = {},
        $rcp, //robot command panel
        $rcpButtons = [],
        robot,
        validDirections = ['up', 'right', 'bottom', 'left', 'explore'];

    var detectPanelButtons = function (rcpId) {
        var direction,
            i,
            $btn;

        $rcp = $('#' + rcpId);

        if ('undefined' !== typeof $rcp && 1 === $rcp.length){
            for (i in validDirections){
                if (validDirections.hasOwnProperty(i)){
                    direction = validDirections[i];
                    $btn = $rcp.find('#btn_' + direction);
                    if('undefined' !== typeof $rcp && 1 === $rcp.length){
                        $rcpButtons.push($btn);
                    } else {
                        console.error('Error in detectPanelButtons(): No button found for direction "' + direction + '"');
                        return false;
                    }
                }
            }
        } else {
            console.error('Error in detectPanelButtons(): No command panel found');
            return false;
        }

        return true;
    };

    self.getButtons = function () {
      return $rcpButtons;
    };

    self.deactivatePanelButtons = function($buttons){
        $rcp.prop('title', 'Veuillez placer le robot sur la grille');
        $.each($buttons, function (){
            var $btn = $(this);
            $btn.prop('disabled', true);
        });
    };

    self.activatePanelButtons = function($buttons){
        $rcp.prop('title', '');
        $.each($buttons, function (){
            var $btn = $(this);
            $btn.prop('disabled', false);
        });
    };

    var onCommandClick = function ($btn) {
        var direction = $btn.data('direction'),
            engine = $('#select_engine').val(),
            stepByStep = $('#explore_step_by_step').prop('checked');

        if ('undefined' !== typeof direction && -1 !== validDirections.indexOf(direction)){
            if ('explore' === direction){
                robot.exploreGrid(engine, stepByStep);
            } else {
                robot.move(direction);
            }
        } else {
            console.error('Error in onCommandClick(): Invalid direction given');
        }
    };

    self.doBindings = function(){
        $.each($rcpButtons, function (){
            var $btn = $(this);
            $btn.on('click', function () {
                onCommandClick($(this));
            });
        });

        return true;
    };

    self.attachRobot = function(robotToControl){
        robot = robotToControl;
    };

    var init = function (rcpId){
        if (true === detectPanelButtons(rcpId)){
            self.deactivatePanelButtons($rcpButtons);
        }
    };


    init(rcpId, robotToControl);

    return self;
};
