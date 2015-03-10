define('Players', [], function () {
	
	var Players = function Players (name) {
		var id = 0;
		this.css_class = 'ui-selecting-%id';
		this.name = name;
		this.active = false;
		this.addPlayer();
	};

	Players.prototype = {
        constructor : Players,
		arrPlayer : [],
		addPlayer : function() {
			var success = false;
			if (this.arrPlayer.indexOf(this.name) === -1) {
				this.arrPlayer.push(this);
				this.id = this.arrPlayer.length;
				this.css_class = this.css_class.replace('%id', this.id); 
				success = true;
			}
			return success;
		},
		editData : function(opt, val) {
			var success = false;
			if (this.hasOwnProperty(opt) && typeof this.opt !== 'function' && val) {				
				if(opt === 'name') {
					this.arrPlayer[this.arrPlayer.indexOf(this.name)] = val;
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
