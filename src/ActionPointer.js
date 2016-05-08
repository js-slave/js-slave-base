const Pointer = require('./Pointer.js');

/**
 * ActionPointer represent a "pointer" to an action inside a JSSlave.
 */
class ActionPointer extends Pointer {
	/**
	 * Create a new ActionPointer to handle an action of a JSSlave.
	 * @param {String} name - The name of the action.
	 * @param {String} description - THe description of the action.
	 * @param {JSSlave} instance - The instance of the JSSlave.
	 * @param {Function} method - The method of the action inside the JSSlave.
	 * @param {Array} params - An array of EventParameter.
	 */
	constructor(name, description, instance, method, params) {
		super(name, description, instance, method, params);
	}

	/**
	* Start the action.
	 * @param {Object} parameters - Parameters to send to the action.
	 * @throws {JSSlaveError} If the actin can't be started.
	 */
	start(parameters) {
		try {
			Reflect.apply(this.method, this.instance, [parameters]);
		} catch(e) {
			throw e;
		}
	}
}

module.exports = ActionPointer;
