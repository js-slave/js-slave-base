/**
 * Reprensent an error which can happen inside a Suppler.
 */
class JSSlaveError extends Error {
	/**
	 * Create a new JSSlaveError.
	 * @param {String} message - The message of the error.
	 */
	constructor(message) {
		super(message);
		this.message = message;
		this.name = 'JSSlaveError';
	}
}

module.exports = JSSlaveError;
