const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
	// [GET] /
	index(req, res, next) {
		Course.find({}).then((courses) => {
			res.render("home", {
				courses: multipleMongooseToObject(courses),
			});
		});

		// res.render('home');
	}

	search(req, res, next) {
		res.render("search");
	}
	// [GET] /search
	searchById(req, res, next) {
		Course.find({ $text: { $search: req.query.name || "" } }).then((result) => {
			if (result.length === 0) {
				Course.find({}).then((courses) => {
					res.render("home", {
						courses: multipleMongooseToObject(courses),
					});
				});
			} else {
				return res.render("home", {
					courses: multipleMongooseToObject(result),
				});
			}
		});
	}
}

module.exports = new SiteController();
