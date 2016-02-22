var Goobers = (function() {
	"use strict";

	// Set a root
	var root = window || document || this || {};

	// Constructor
	function Goobers(code, cb) {
		// Store the code
		this.code = code.toUpperCase();

		// Set empty code data
		this.codeData = [];

		// Set empty eventData
		this.eventData = [];

		// Store the callback
		this.cb = typeof cb == 'function' ? cb : Goobers.noop;
		
		// Initialize
		this._init();
	}

	// Constructor
	Goobers.prototype.constructor = Goobers;

	// No operating function
	Goobers.noop = function(){};

	// Initialize function
	Goobers.prototype._init = function() {
		// Keep a ref to myself
		var me = this;

		// Read out the string and transform it into an
		// array w/ key codes
		for (var i = 0; i < this.code.length; i++)
			this.codeData.push(this.code.charCodeAt(i));

		// Listen to keycodes
		if (root.addEventListener) {
			root.addEventListener('keydown', function(e) {
				var keyCode = e.keyCode || e.which;

				// Track the current keycode
				me.eventData.push(keyCode);

				// Check the current key combo
				var check = Goobers.checkCodeData(me.eventData, me.codeData);

				// Are both arrays the same a.k.a. has the code
				// been entered?
				if (check && me.eventData.length == me.codeData.length) {
					// Run the callback
					me.cb();

					// Empty the eventData
					me.eventData = [];
				} else if (!check) {
					// The current key combo doesn't match the
					// code or a part of it. Remove the event data
					me.eventData = [];
				}

			}, false);
		}
	};

	Goobers.checkCodeData = function(a, b) {
		// Are they both arrays?
		if (!Array.isArray(a) || !Array.isArray(b)) return false;

		// The left array (a) should be smaller or equal
		// size as the right array (b)
		if (a.length > b.length) return false;

		// First checks done. Check if the contents match
		for (var i = 0; i < a.length; i++)
			if (a[i] !== b[i]) return false;

		// All checks passed, thus return true
		return true;
	};

	return Goobers;
})();
