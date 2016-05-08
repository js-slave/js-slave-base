const Parameter = require('./Parameter.js');

/**
 * Represent a parameter needed by an action.
 */
class ActionParameter extends Parameter {
	/**
	 * Create a new parameter for an action.
	 * @param {String} name - The name of the parameter.
	 * @param {String} description - The description of the parameter.
	 * @param {Object} type - The type of the parameter (for example: String, Number, etc).
	 * @param {Array} value - An array with default values for the parameter.
	 */
	constructor(name, description, type, value) {
		super(name, description, type);
		this.value = value;
	}

	/**
	 * Return an Object which represent the parameter formatted for JSON output
	 * @override
	 * @return {Object} An object with every attributes of the parameter.
	 */
	toJSON() {
		return {
			name: this.name,
			description: this.description,
			type: this.type.name,
			value: this.value
		};
	}
}

module.exports = ActionParameter;
