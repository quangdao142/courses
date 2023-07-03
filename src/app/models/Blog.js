const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const BlogSchema = mongoose.Blog;

const Blog = new BlogSchema({
    username: { type: String, required: true },
    blogname: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});


module.exports = mongoose.model('Blog', Blog);
