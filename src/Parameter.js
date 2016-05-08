/**
 * Represent a parameter needed by a Pointer.
 */
class Parameter {
	/**
	 * Create a new parameter for a Pointer.
	 * @param {String} name - The name of the parameter.
	 * @param {String} description - The description of the parameter.
	 * @param {Object} type - The type of the parameter (for example: String, Number, etc).
	 *
	 */
	constructor(name, description, type) {
		this.name = name;
		this.description = description;
		this.type = type;
	}

	/**
	 * Return an Object which represent the parameter formatted for JSON output
	 * @return {Object} An object with every attributes of the parameter.
	 */
	toJSON() {
		return {
			name: this.name,
			description: this.description,
			type: this.type.name
		};
	}
}

module.exports = Parameter;
