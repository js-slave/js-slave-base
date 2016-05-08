const Parameter = require('./Parameter.js');

/**
 * Represent a parameter needed by an event.
 */
class EventParameter extends Parameter {
	/**
	 * Create a new parameter for an event.
	 * @param {String} name - The name of the parameter.
	 * @param {String} description - The description of the parameter.
	 * @param {Object} type - The type of the parameter (for example: String, Number, etc).
	 */
	constructor(name, description, type) {
		super(name, description, type);
	}
}

module.exports = EventParameter;
