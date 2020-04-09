const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlPaser: true});

BlogPost.create({
    title: 'The Mythbusters Guide to Saving Money on Energy Bills',
    body: 'If you have been here a long time, you might remember when i went on ITV Tonight to despence a masterclass in saving money on energy bills.  Energy-saving is one of my favourite money topics, becaus once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists.  You start spotting them everything at this time ogf year.  They go like this: '
}, (error,blogpost) => {
    console.log(error,blogpost)
})

BlogPost.find({}, (error, blogspot) => {
    console.log(error, blogspot);
});

BlogPost.find({title: 'The Mythbusters Guide to Saving Money on Energy Bills'}, (error, blogspot) => {
    console.log(error, blogspot);
});

BlogPost.find({title: /The/}, (error, blogspot) => {
    console.log(error,blogspot);
});

const id =  "5e8e6620a95e2e28b1879415";
BlogPost.findById(id, (error, blogspot) => {
    console.log(error, blogspot);
});

BlogPost.findByIdAndUpdate(id, (error,blogspot) => {
    console.log(error,blogspot);
});

BlogPost.findByIdAndDelete(id, (error, blogspot) => {
    console.log(error,blogspot)
});