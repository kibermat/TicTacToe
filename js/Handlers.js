/**
 * Created by at.mustakimov on 12.03.2015.
 */
define('Handlers', [], function() {
    return {
        addEvent: addEvent,
        showSelect: showSelect,
        showInfo: showInfo
    };

    function addEvent(elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false)
        } else {
            elem.attachEvent("on" + type, handler)
        }
    }

    function showSelect(self, user) {
        var player = user;

        $(self).addClass(player.css_class)
            .attr('group', player.id);
    }

    function showInfo(player, msg) {
        var info = $('#step');
        //TO DO позже переделаю!!
        var name_input = '[name=player%id]:input'.replace('%id', player.id);

        $('.tictac_player').removeClass('player-active');
        $(name_input).addClass('player-active');

        info.text([msg, player.name].join(' - '));
    }

});