define('Players', ['lib/doT'], function (doT) {
	
	var Players = function Players (name) {
		var id = 0;
	//	this.css_class = 'ui-selecting-%id';
		this.css_class = 'icon-player-%id';
        this.css_class_player = 'tictac_player';
		this.name = name;
		this.active = false;
        this.parent_id = 'people';
        this.count = function() { return this.arrPlayer.length; };
		this.addPlayer();

	};

    var tmplAddPlayer = doT.template(
        '<input name="{{=it.name}}" class="{{=it.css_class_player}} {{=it.css_class}}" value="{{=it.name}}" type="text" size="12" tabindex="{{=it.id}}"/>'
    );

	Players.prototype = {
        constructor : Players,
        _destruct : function() {
            this.renderPlayer(true);
            this.arrPlayer.splice(this.arrPlayer.indexOf(this.name), 1);
        },
		arrPlayer : [],
		addPlayer : function() {
			var success = false;
			if (this.arrPlayer.indexOf(this.name) === -1) {
				this.arrPlayer.push(this);
				this.id = this.arrPlayer.length;
				this.css_class = this.css_class.replace('%id', this.id);
                //Нарисовать поле игрока
                this.renderPlayer(false);
				success = true;
			}
			return success;
		},
        renderPlayer: function(delet) {
            var tmpl = $(tmplAddPlayer(this));
            if (!delet) {
                $('#' + this.parent_id).append(tmpl);
            } else {
                $('.'.concat(this.css_class, ':input')).remove();
            }
            return tmpl;
        },
		editData : function(opt, val) {
			var success = false;
			if (this.hasOwnProperty(opt) && typeof this.opt !== 'function' && val) {				
				if(opt === 'name') {
					this.arrPlayer[this.arrPlayer.indexOf(this.name)] = val;
                    this.name = val;
				} else if (opt = 'active') {
					//	this.nextPlayer().active = !val; 
					//  TODO  Players > 2
					for(var idx in this.arrPlayer) {
						this.arrPlayer[idx].active = !val;
					}   val = !!val; 
				}
				this[opt] = val; 
				success = true;
			}
			return success;
		},
		nextPlayer: function() {
			var arr = this.arrPlayer;
			return arr[this.id] || arr[0];
		},
		getActive: function() {
			var arr = this.arrPlayer;
			for(var idx in arr) {
				if (arr[idx].active) { return arr[idx]; }
			}
			this.active = true; 
			return this;
		},
		getId : function() { return this.id; }
	};
	

	return Players;
});
