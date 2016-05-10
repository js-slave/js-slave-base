# js-slave-base

[![dev-dependencies status](https://david-dm.org/js-slave/js-slave-base/dev-status.svg)](https://david-dm.org/js-slave/js-slave-base#info=devDependencies)

This is the base Class to create a slave for the [js-slave-manager](https://github.com/js-slave/js-slave-manager).

#### What is a slave ?

A slave is a npm module which define events and actions. In the [js-slave-manager](https://github.com/js-slave/js-slave-manager), the uer will be able to associate events with actions.

#### How can I create a slave ?

You have to extend `js-slave-base`.
Then you have to define the `categoryName` of your slave, events and actions that are available.

```javascript
const JSSlave = require('js-slave-base');

class MySlave extends JSSlave {
	constructor() {
		super();

		this.categoryName = 'The name of the category';

		this.addEvent('myEventName', 'description', this.myEvent, [
			{ name: 'eventParameterName', description: 'Description of the parameter', type: String }
		], [
			{ name: 'returnedValueName', description: 'Description of the returned value', type: String }
		]);

		this.addAction('myActionName', 'description', this.myAction, [
			{ name: 'actionParameterName', description: 'Description of the parameter', type: String },
		]);
	}

	/**
	 * Start the event.
	 * @param {ActionPointer} actionPointer - The pointer to the action (to call the action method).
	 * @param {UserParameters} eventParameters - UserParameters that will be used by the event.
	 * @param {UserParameters} actionParameters - UserParameters that will be used by the action.
	 */
	myEvent(actionPointer, eventParameters, actionParameters) {
		const eventParameterName = eventParameters.get('eventParameterName');

		/*
			the code of your event
		*/
		actionParameters.matchParameters([ // matchParameters will match your returnedValue with what the user had choosen in the js-slave-manager. More information below...
			{ name: 'returnedValueName', value: aValue }
		]);
		actionPointer.start(actionParameters); // Call an action method by Reflection.

		// You can also throw JSSlaveError in the code of the event:
		throw new JSSlave.JSSlaveError('your message'); // in the futur we will be able to add more information about the error
	}

	/**
	 * Stop the event "myEvent". This method has to be nammed exactly like your event method with "stop" before.
	 * @param {UserParameters} userParameters - UserParameters sent to myEvent.
	 * @return {Promise} Has to return a Promise.
	 */
	stopMyEvent() {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	/**
	 * This method will be called if the user associate this action with an event.
	 * @param {UserParameters} parameters - An instance of UserParameters which contains the value of "actionParameterName" define above.
	 */
	myAction(parameters) {
		console.log(parameters.get('actionParameterName'));
	}
}
```

##### matchParameters ?

In the [js-slave-manager](https://github.com/js-slave/js-slave-manager), the user will be able to associate action parameters with returned values of an event.

For example:
We can imagine there is an event named `fileCreated` which returns the `filename` and the `path` of the created file.
There is an action named `display` which can display system notification and need (or not) a `title` and a `text` for the nofitication.
And the user want to display the `filename` and the `path` in the `text` of the notification and put a custom `title`, he will have to do this:

	name  | value
	----- | -------------------------------------------
	title | My custom title
	text  | new file created named {filename} in {path}

So, the syntax is `{returnedValueName}`.

When you call `actionParameters.matchParameters(...)`, the matchParameters method will replace the content of `{returnedValueName}`.

#### Bugs ? Questions ?
Don't hesitate to create an issue if you have questions, if you don't understand how it works, if you have some propositions to improve the project, if there is a bug, etc.

#### Contributing

Don't hesitate to create a pull request to improve the project.
