const User = require("../models/User");

let raiseErr = async (req) => {
	let errors = await req.getValidationResult();
	if (!errors.isEmpty()) {
		let err = errors.array();
		let firstError = err.map((error) => error.msg)[0];
		return firstError;
	}
	return null;
};

let signIn = async (req) => {
	let user = await User.findOne({ email: req.body.email });
	if (!user || user.password != req.body.password) {
		return false;
	} else {
		req.session.user = user;
		return true;
	}
};

let isLogging = async (req) => {
	if (req.session && req.session.user) {
		return true;
	} else {
		return false;
	}
};

let loginValidator = async (req) => {
	req.check("email", "email is required.").not().isEmpty();
	req.check("email", "Invalid email.").isEmail();
	req.check("password", "password is required.").not().isEmpty();
	//check for errors
	return await raiseErr(req);
};

module.exports = {
	isLogging,
	loginValidator,
	signIn,
};
