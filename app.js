// Require Library
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

// Use Express
const app = express();

// Use BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));

// Set Static Folder
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Set Up Route

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {
    const data = req.body;
    console.log(data);
})

app.get('/test', (req, res) => {
    fs.readFile(`${__dirname}/views/test.html`, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        return res.end();
    });
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

// Set Up Connection
app.listen(3000, (req, res) => {
    console.log("Connected at port 3000");
})