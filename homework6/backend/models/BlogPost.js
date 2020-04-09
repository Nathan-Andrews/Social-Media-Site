const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogPostSchema = new Schema({
    title:String,
    body:String,
});
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;