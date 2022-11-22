/**
 * Main app file.  Initializes app components.
 */

var model = require( './model.js' ),
    router = require( './router.js' ),
    view = require( './view.js' );

/**
 * The main app object.
 *
 * @namespace
 */
export var spaceMindmap = {

	init: function() {
		model.init();
	}

}

spaceMindmap.init();