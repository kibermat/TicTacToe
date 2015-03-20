require(['CreateTable', 'Players', 'Handlers'], function (Table, Players, Handlers) {

//    var tmplPlayer = doT.template(['{{~it.people :value:index}}',
//        '<input name={{=value.name}} class={{=it.css_class}} num={{=index}} value={{=value.value}} type={{=it.type}} size={{=it.size}} tabindex={{=value.tabindex}}/>',
//        '{{? index === it.count() - 1}}',
//            '<image id="addPlayer" class="img-tool-player" src="./resources/images/add.png" style="width:20px; height:20px; vertical-align: sub;"></button>',
//            '{{? it.count() > 2}}',
//                '<image id="delPlayer" class="img-tool-player" src="./resources/images/del.png" style="width:20px; height:20px; vertical-align: sub;"></button>',
//            '{{?}}',
//        '{{?}}',
//        '{{~}}'].join(''));

    var playerTools = [
        '<image id="addPlayer" class="img-tool-player" src="./resources/images/add.png" style="width:20px; height:20px; vertical-align: sub;"></button>',
        '<image id="delPlayer" class="img-tool-player" src="./resources/images/del.png" style="width:20px; height:20px; vertical-align: sub;"></button>'].join('');

    var content = $('#grid'),
        size = $('input[name="size_grid"]'),
        table = '',
        n = 3;

    var plGroup = [];

    try { //Создание базовых игроков
        plGroup.push(new Players('player1'), new Players('player2'));
    } catch(e) {
        console.error('Ошибка при создании игроков!', e);
        return;
    }

    //Кнопки Добавить\Удалить игрока
    $('.player-tools').append(playerTools);

    //Подпишемся на изменения инпут игрока
    onChangePlayer();

    //Старт игры по дефолту
    startGame.call(size);

    //При Редактировании size_grid
    $(size).change(startGame);

    $('#addPlayer').click(function(){
        var new_id =  Number(plGroup[0].arrPlayer.length) + 1;
        plGroup.push( new Players('player%id'.replace('%id', new_id) ));
        onChangePlayer();
    });

    $('#delPlayer').click(function(){
        if(plGroup[0].count() > 2) {
            var msg = '%dell_play - удален! Ход';
            var dell_play = plGroup.pop(),
                curr_play = dell_play.getActive(),
                next_play = ( curr_play === dell_play ) ?  curr_play.nextPlayer() : curr_play;
            msg = msg.replace('%dell_play', dell_play.name);
            Handlers.showInfo(next_play, msg);
            dell_play._destruct();
            delete dell_play;
        }
    });

    function onChangePlayer()  {
        $('.' + plGroup[0].css_class_player).change( function () {
            var id  = Number(this.getAttribute('tabindex')) - 1;
            plGroup[id].editData('name', $(this).val());
        });
    }

    function startGame() {
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

            Handlers.showInfo(plGroup[0].getActive(), 'Первый ход');

            $('.tictactoe-table-td').click(
                //TicTac.step
                function () {
                    var self = this,
                        test_id = $(self).attr('group'),
                        msg = 'Ход';

                    var player = plGroup[0].getActive(),
                        next_pl = player.nextPlayer();

                    if (test_id) {
                        return;
                    }

                    Handlers.showSelect(self, player);

                    //TODO прикрутить логику
                    // logic ...

                    next_pl.editData('active', true);

                    Handlers.showInfo(next_pl, msg);
                }
            );

        }
    }

});