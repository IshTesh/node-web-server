const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/pertial');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var agent = req.headers['user-agent'];
    var method = req.method;
    var url = req.url;
    var time = new Date().toString();

    var log = `${time}: ${agent} ${method} ${url}`;
    fs.appendFileSync('server.log', log + '\n');
    console.log(`${method} ${url}`);
    next();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        welcome: 'Welcome To Our Home Page',
        pageTitle: 'Home Page For Life',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/service', (req, res) => {
    res.render('service.hbs',{
        pageTitle: 'Service Page'
    });
});

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});