const newsRouter = require("./news");
const meRouter = require("./me");
const registerRouter = require("./register");
const loginRouter = require("./login");


const coursesRouter = require("./courses");
const siteRouter = require("./site");

function route(app) {
	app.use("/news", newsRouter);
	app.use("/me", meRouter);
	app.use("/", loginRouter);

	app.use("/register", registerRouter);
	app.use("/courses", coursesRouter);

	app.use("/", siteRouter);
}

module.exports = route;
