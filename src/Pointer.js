/**
 * Represent a "pointer" to a method inside a Slave.
 */
class Pointer {
	/**
	 * An Abstract class to handle a pointer to a method inside a Slave.
	 * @param {String} name - The name of the "Pointer".
	 * @param {String} description - The description of the "Pointer".
	 * @param {JSSlave} instance - The instance of the Slave.
	 * @param {Function} method - A method inside the Slave instance.
	 * @param {Array} params - An array of EventParameter.
	 */
	constructor(name, description, instance, method, params) {
		if (new.target === Pointer) {
			throw TypeError('Abstract class "Pointer" can\'t be instantiated directly');
		}

		this.name = name;
		this.description = description;
		this.instance = instance;
		this.method = method;
		this.params = params;
	}

	/**
	 * Return the name of the "Pointer".
	 * @return {String} - The name of the "Pointer".
	 */
	getName() {
		return this.name;
	}

	/**
	 * Return the description of the "Pointer".
	 * @return {String} - The description of the "Pointer".
	 */
	getDescription() {
		return this.description;
	}

	/**
	 * Return an Array of Object, each Object correspond to a parameter.
	 * @returns {Array} - An array of every parameter.
	 */
	getParamsToJSON() {
		const result = [];
		for (const param of this.params) {
			result.push(param.toJSON());
		}
		return result;
	}
}

module.exports = Pointer;
