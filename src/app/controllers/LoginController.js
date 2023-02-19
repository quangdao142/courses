const User = require("../models/User");
const { mongooseToObject } = require("../../util/mongoose");
const userServices = require("../services/userServices");
const mongoose = require("../../util/mongoose");
class LoginController {
	// [GET] /login
	login(req, res, next) {
		res.render("login/login");
	}
	// [POST] /login
	async loginAuth(req, res, next) {
		try {
			const user = await User.findOne({ email: req.body.email });
			let isLogged = await userServices.isLogging(req);

			if (isLogged === true) {
				return res.status(401).send({ message: "You are logged in." });
			}
			let validator = await userServices.loginValidator(req);
			if (validator !== null) {
				return res.status(401).send({ message: validator });
			}
			let signIned = await userServices.signIn(req);
			if (signIned === false) {
				return res.send({ message: "Email or Password is incorrect" });
			} else {
				return res.status(200).redirect("/?email=" + user.email);
			}
		} catch (error) {
			return res.status(500).send({ error: "Server Error" });
		}
	}

	// GET [logout]
	async logoutAuth(req, res, next) {
		try {
			if (req.session.user) {
				req.session.user = null;
				return res.redirect("/");
			} else {
				res.redirect("/login");
			}
		} catch (error) {
			console.log()
			return res.status(500).send({ error: "Server Error" });
		}
	}
}

module.exports = new LoginController();
