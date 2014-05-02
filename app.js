var express    = require('express'),
    exphbr     = require('express3-handlebars'), // "express3-handlebars"
    nodemailer = require('nodemailer'),

    app = express(), handlebars;

// Create `ExpressHandlebars` instance with a default layout.
handlebars = exphbr.create({
    defaultLayout: 'main',
    extname      : '.html',

    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    partialsDir: [
        'views/partials/'
    ]
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('html', handlebars.engine);
app.set('view engine', 'html');

app.use(express.bodyParser());
require("./routes")(app, express, nodemailer);

app.listen(3000);
console.log("Larry King Orchestra server listening on: 3000, Thanks to WavaMedia!");