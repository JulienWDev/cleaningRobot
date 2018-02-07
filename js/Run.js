var interactiveClass = 'interactive';

var Run =(function () {
    var self = {};
    var $message = $('#message');

    var doBindings = function(grid_id){
        var $grid = $(grid_id);
        $grid.find('td.empty').on('click', function(){
            if (true === $grid.hasClass(interactiveClass)){
                var $startCell = $(this);
                console.log('click!');
                $message.text('Démarrage du Test...');
                $grid.removeClass('interactive');
                Robot.init($startCell);
            }
        });
    };

    self.init = function (grid_id){
        console.log('Démarrage du test');

        doBindings(grid_id);

        $message.text('Veuillez sélectionner un emplacement de départ');
    };

    return self;
})($);

Run.init('#coderView.' + interactiveClass);