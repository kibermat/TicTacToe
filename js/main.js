require(['CreateTable', 'Players'], function (Table, Players) {

    var content = $('#grid'),
        size = $("input[name='size_grid']"),
		in_player = $('.tictac_player:input'),
        table = '',
        n = 3;

	var plGroup = [],
        firstName = $(in_player[0]).attr('name');

    //Создание игроков
    $.each(in_player, function(idx, text) {
        var pl = $(in_player[idx]).attr('name'),
            name = $(in_player[idx]).attr('value');
        plGroup[pl] = new Players(name);
    });

    //При Редактировании игроков
	in_player.change(function() {
		var name = $(this).val(),
			group = $(this).attr('name');
		if (!plGroup[group]) {
			plGroup[group] = new Players(group);
		}
		plGroup[group].editData('name', name);
	});

    //При Редактировании size_grid
    size.change(function() {
        var value = Number($(this).val());
        if (value >= 3) {
            n = value;

            table = Table.renderTable(n);

            if (!table) {
                console.log('Игра не создана.');
                return;
            }

            $('.tictactoe-table', content).remove();
            content.append(table);
			
            showInfo(plGroup[firstName].getActive(), 'Первый ход');

            $('.tictactoe-table-td').click(
                //TicTac.step
				function () {
                    var self = this,
                        test_id = $(self).attr('group'),
                        msg = 'Ход';

                    var player = plGroup[firstName].getActive(),
                        next_pl = player.nextPlayer();
                    
                    if( test_id ) { return; }

                    showSelect(self, player);

                    //TODO прикрутить логику
                    // logic ...
                    
                    next_pl.editData('active', true);
                    
                    showInfo(next_pl, msg);
				}
            );

        }
    });

    function showSelect(self, user) {
        var player = user;

        $(self).addClass(player.css_class)
            .attr('group', player.id);
    }
	
	function showInfo(player, msg) {
        var info = $('#step');
        //TO DO позже переделаю!!
		var name = '[name=player%id]'.replace('%id', player.id);
		
		$('#header > .tictac_player').removeClass('player-active');
		$(name).addClass('player-active');
		
        info.text([msg, player.name].join(' - '));
    }

});
