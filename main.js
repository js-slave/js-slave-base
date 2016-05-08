const ActionParameter	= require('./src/ActionParameter.js');
const ActionPointer		= require('./src/ActionPointer.js');
const EventParameter	= require('./src/EventParameter.js');
const EventPointer		= require('./src/EventPointer.js');

/**
 * The Abstrat class to create a JSSlave
 */
class JSSlave {
	/**
	 * Create default variables: categoryName (String), events (Array) and actions (Array).
	 */
	constructor() {
		if (new.target === JSSlave) {
			throw TypeError('Abstract class "JSSlave  can\'t be instantiated directly');
		}

		this.categoryName = 'Default';
		this.events = [];
		this.actions = [];
	}

	/**
	 * Add a new action to the action list.
	 * @param {String} name - The name of the action.
	 * @param {String} description - The description of the action.
	 * @param {Function} method - The name of the action.
	 * @param {Array} params - An array of ActionParameter.
	 */
	addAction(name, description, method, params) {
		const actionParameters = [];
		for (const param of params) {
			actionParameters.push(new ActionParameter(param.name, param.description, param.type, param.value));
		}
		this.actions.push(new ActionPointer(name, description, this, method, actionParameters));
	}

	/**
	 * Add a new event to the event list.
	 * @param {String} name - The name of the event.
	 * @param {String} description - The description of the event.
	 * @param {Function} method - The name of the event.
	 * @param {Array} params - An array of EventParameter.
	 * @param {Array} returnedParams - An array of EventParameter.
	 */
	addEvent(name, description, method, params, returnedParams) {
		const eventParameters = [];
		for (const param of params) {
			eventParameters.push(new EventParameter(param.name, param.description, param.type));
		}

		const returnedParameters = [];
		for (const returnedParam of returnedParams) {
			returnedParameters.push(new EventParameter(returnedParam.name, returnedParam.description, returnedParam.type));
		}

		this.events.push(new EventPointer(name, description, this, method, eventParameters, returnedParameters));
	}

	/**
	 * Return every action which are avaiable.
	 * @returns {Array} - An array of ActionPointer.
	 */
	getActions() {
		return this.actions;
	}

	/**
	 * Return the name of the category of the JSSlave
	 * @return {String} - The name of the category.
	 */
	getCategoryName() {
		return this.categoryName;
	}

	/**
	 * Return every event which are available.
	 * @returns {Array} - An array of EventPointer.
	 */
	getEvents() {
		return this.events;
	}
}

exports.JSSlaveError = require('./src/JSSlaveError.js');
module.exports = JSSlave;
