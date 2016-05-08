const Pointer = require('./Pointer.js');

/**
 * EventPointer represent a "pointer" to an event inside a JSSlave.
 */
class EventPointer extends Pointer {
	/**
	 * Create a new EventPointer to handle an event of a JSSlave.
	 * @param {String} name - The name of the event.
	 * @param {String} description - THe description of the event.
	 * @param {JSSlave} instance - The instance of the JSSlave.
	 * @param {Function} method - The method of the event inside the JSSlave.
	 * @param {Array} params - An array of EventParameter.
	 * @param {Array} returnedValues - An array of returnedValue (EventParameter).
	 */
	constructor(name, description, instance, method, params, returnedValues) {
		super(name, description, instance, method, params);
		this.returnedValues = returnedValues;
		this.stopMethod = Reflect.get(this.instance, `stop${this.method.name.charAt(0).toUpperCase() + this.method.name.slice(1)}`);
	}

	/**
	 * Return an Array of Object, each Object correspond to a returnedValue (EventParameter).
	 * @returns {Array} - An array of every returnedValue.
	 */
	getReturnedValuesToJSON() {
		const result = [];
		for (const returnedValue of this.returnedValues) {
			result.push(returnedValue.toJSON());
		}
		return result;
	}

	/**
	 * Start the event by sending an instance of ActionPointer (the callback) and parameters (UserParameters).
	 * @param {ActionPointer} actionPointer - The action.
	 * @param {UserParameters} eventParameters - The user parameters whose the event needs to start listening.
	 * @param {UserParameters} actionParameters - The user parameters whose the action needs to be executed.
	 * @throws {JSSlaveError} If the event can't start listening or if the action can't be executed.
	 */
	start(actionPointer, eventParameters, actionParameters) {
		try {
			Reflect.apply(this.method, this.instance, [actionPointer, eventParameters, actionParameters]);
		} catch(e) {
			throw e;
		}
	}

	/**
	 * Stop the event by sending the userParameters.
	 * @param {UserParameters} userParameters - The parameters that the user sent to the event.
	 * @return {Promise} - A Promise.
	 */
	stop(userParameters) {
		return Reflect.apply(this.stopMethod, this.instance, [userParameters]);
	}
}

module.exports = EventPointer;
