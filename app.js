// Require Library
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

// Use Express
const app = express();

// Use BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));

// Set Static Folder
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Function
const saveData = (data) => {
    // set up connection to json file to save data
    fetch('https://localhost:3000/perhitungan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Set Up Route

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {
    const data = req.body;
    switch (data.bangun) {
        case "segitiga":
            const newItem1 = {
                'time': new Date().toLocaleString(),
                'jenis': data.bangun,
                'tinggi': data.tinggi,
                'alas': data.alas,
                'satuan': data.satuan,
                'luas': ((data.alas*data.tinggi)/2).toFixed(2)
            }
            saveData(newItem1);
            break;
        case "lingkaran":
            const newItem2 = {
                'time': new Date().toLocaleString(),
                'jenis': data.bangun,
                'jari-jari': data.jari_jari,
                'satuan': data.satuan,
                'luas': (3.14*Math.pow(data.jari_jari, 2)).toFixed(2)
            }
            saveData(newItem2);
            break;
        case "persegi":
            const newItem3 = {
                'time': new Date().toLocaleString(),
                'jenis': data.bangun,
                'sisi': data.sisi,
                'satuan': data.satuan,
                'luas': Math.pow(data.sisi, 2).toFixed(2)
            }
            saveData(newItem3);
            break;
    }
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

// Set Up Connection
app.listen(5050, (req, res) => {
    console.log("Connected at port 5050");
})