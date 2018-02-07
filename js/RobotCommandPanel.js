var RobotCommandPanel = function (rcpId, robotToControl) {
    var self = {},
        robot;


    var onCommandClick = function ($btn) {
        console.log('click detected, $btn=', $btn);
    };

    var doBindings = function(rcpId){
        console.log('in doBindings, rcpId=', rcpId);
        var $rcp = $('#' + rcpId),
            validDirections = ['up', 'right', 'bottom', 'left', 'explore'],
            direction,
            i;

        if ('undefined' !== typeof $rcp && 1 === $rcp.length){
            for (i in validDirections){
                if (validDirections.hasOwnProperty(i)){
                    direction = validDirections[i];
                    $rcp.find('#btn_' + direction).on('click', function () {
                        onCommandClick($(this));
                    });
                }
            }
        } else {
            console.error('Error in doBindings(): No command panel found');
            return false;
        }

        return true;
    };

    var init = function (rcpId, robotToControl){
        if (true === doBindings(rcpId)){
            console.log('Commandes du robot activées');
        }
        robot = robotToControl;
    };


    init(rcpId, robotToControl);

    return self;
};
