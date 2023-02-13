const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);


const UserSchema = mongoose.Schema;
const User = new UserSchema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});


module.exports = mongoose.model('User', User);
