const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const path = require("path");

const route = require("./routes");
const db = require("./config/db");
const expressValidator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// Connect to db
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(
	session({
		secret: "my-secret",
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: "mongodb://127.0.0.1:27017/education_dev",
		}),
		cookie: {
			expires: 600000,
		},
	})
);
app.use(function (req, res, next) {
	res.locals.session = req.session;
	next();
});

app.use(express.json());
app.use(methodOverride("_method"));

// HTTP logger
// app.use(morgan('combined'));

// template engine
app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		helpers: {
			sum: (a, b) => a + b,
		},
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
app.use(expressValidator());

// routes init

route(app);

// 127.0.0.1 - localhost
app.listen(port, () => console.log("App listening at port", port));
