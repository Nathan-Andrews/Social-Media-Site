const express = require('express');
const path = require('path');
const port = 4000;

const app = new express();
app.use(express.static('public'));

app.get('/', (res,req) => {
    res.sendFile(path.resolve(_dirname, 'pages/index.html'))
});
app.get('/about', (res,req) => {
    res.sendFile(path.resolve(_dirname, 'pages/about.html'))
});
app.get('/sample', (res,req) => {
    res.sendFIle(path.resolve(_dirname, 'pages/post.html'))
});
app.get('/contact', (res,req) => {
    res.sendFile(path.resolve(_dirname,'pages/post.html'))
});

app.listen(4000, () => {
    console.log(`This app is listening on port ${port}`);
})