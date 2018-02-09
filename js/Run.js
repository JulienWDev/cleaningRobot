var interactiveClass = 'interactive';
var boardId = 'board';

var Run =(function () {
    var self = {},
        $message = $('#message'),
        robot,
        rcp;

    var doBindings = function(grid_id){
        var $grid = $(grid_id);
        $grid.find('td.empty').on('click', function(){
            if (true === $grid.hasClass(interactiveClass)){
                var $startCell = $(this);
                $message.text('Démarrage du Test...');
                $grid.removeClass('interactive');
                robot = new Robot(boardId, $startCell);
                robot.attachCommandPanel(rcp);
                rcp.attachRobot(robot);
            }
        });
    };

    self.init = function (grid_id){
        console.log('Démarrage du test');

        rcp = new RobotCommandPanel('robot_command_panel');

        doBindings(grid_id);

        $message.text('Veuillez sélectionner un emplacement de départ');
    };

    return self;
})($);

Run.init('#coderView.' + interactiveClass);