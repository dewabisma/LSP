// Require Library
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const {
    getMaxListeners
} = require('process');

// Variable
let rawData = fs.readFileSync(`${__dirname}/db.json`);
let arrayData = JSON.parse(rawData);

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
const luas = (bangun, nilai1, nilai2) => {
    // Menentukan jenis bangun datar
    switch (bangun) {
        case "segitiga":
            // Menhitung luas lalu dikembalikan hasilnya
            return ((nilai1 * nilai2) / 2).toFixed(2);
            break;
        case "lingkaran":
            // Menhitung luas lalu dikembalikan hasilnya
            return (3.14 * Math.pow(nilai1, 2)).toFixed(2);
            break;
        case "persegi":
            // Menhitung luas lalu dikembalikan hasilnya
            return Math.pow(nilai1, 2).toFixed(2);
            break;
    }
}

const hitungJumlahOperasi = (bangun) => {
    let count = 0;
    // loop array
    arrayData.forEach(x => {
        // jika sesuai dengan jenis bangun maka menambah hitungan
        count = x.jenis === bangun ? count += 1 : count += 0;
    })
    // Mengeluarkan hasil
    return count;
}

const getMax = () => {
    let maxVal = 0;
    // Loop array
    arrayData.forEach(x => {
        // Jika nilai luas saat ini lebih besar dari max value saat ini ganti nilai max value dengan luas saat ini
        maxVal = x.luas > maxVal ? x.luas : maxVal;
    })
    // Mengeluarkan hasil
    return maxVal;
}

const getMin = () => {
    let minVal = Number.MAX_SAFE_INTEGER;
    // Loop array
    arrayData.forEach(x => {
        // Jika nilai luas saat ini lebih kecil dari min value saat ini ganti nilai min value dengan luas saat ini
        minVal = x.luas < minVal ? x.luas : minVal;
    })
    // Mengeluarkan hasil
    return minVal;
}

const getRatio = (bangun) => {
    // Menentukan jenis bangun datar
    switch (bangun) {
        // Menghitung persetanse bersadarkan jenis bangun datar
        case 'segitiga':
            return ((hitungJumlahOperasi('segitiga') / arrayData.length) * 100).toFixed(2);
            break;
        case 'persegi':
            return ((hitungJumlahOperasi('persegi') / arrayData.length) * 100).toFixed(2);
            break;
        case 'lingkaran':
            return ((hitungJumlahOperasi('lingkaran') / arrayData.length) * 100).toFixed(2);
            break;
    }
}

// Set Up Route

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {
    // Mengambil data dari form yang telah disubmit
    const data = req.body;

    // Menentukan jenis bangun datar 
    switch (data.bangun) {
        case "segitiga":
            // Membuat Object Baru untuk disimpan ke dalam file JSON
            const newItem1 = {
                'time': new Date().toLocaleString(),
                'jenis': data.bangun,
                'tinggi': data.tinggi,
                'alas': data.alas,
                'satuan': data.satuan,
                'luas': luas(data.bangun, data.alas, data.tinggi)
            }
            // Memasukan Object ke array
            arrayData.push(newItem1);
            // Membuat object menjadi tipe JSON
            let dataBaru1 = JSON.stringify(arrayData, null, 2);
            // Menyimpan data yang telah menjadi JSON ke file bernama db.json
            fs.writeFileSync(`${__dirname}/db.json`, dataBaru1);
            break;
        case "lingkaran":
            // Membuat Object Baru untuk disimpan ke dalam file JSON
            const newItem2 = {
                'time': new Date().toLocaleString(),
                'jenis': data.bangun,
                'jari-jari': data.jari_jari,
                'satuan': data.satuan,
                'luas': luas(data.bangun, data.jari_jari)
            }
            // Memasukan Object ke array
            arrayData.push(newItem2);
            // Membuat object menjadi tipe JSON
            let dataBaru2 = JSON.stringify(arrayData, null, 2);
            // Menyimpan data yang telah menjadi JSON ke file bernama db.json
            fs.writeFileSync(`${__dirname}/db.json`, dataBaru2);
            break;
        case "persegi":
            // Membuat Object Baru untuk disimpan ke dalam file JSON
            const newItem3 = {
                'time': new Date().toLocaleString(),
                'jenis': data.bangun,
                'sisi': data.sisi,
                'satuan': data.satuan,
                'luas': luas(data.bangun, data.sisi)
            }
            // Memasukan Object ke array
            arrayData.push(newItem3);
            // Membuat object menjadi tipe JSON
            let dataBaru3 = JSON.stringify(arrayData, null, 2);
            // Menyimpan data yang telah menjadi JSON ke file bernama db.json
            fs.writeFileSync(`${__dirname}/db.json`, dataBaru3);
            break;
    }
    res.redirect('/');
})

app.get('/dashboard', (req, res) => {
    const totalSegitiga = [hitungJumlahOperasi('segitiga'), getRatio('segitiga')];
    const totalPersegi = [hitungJumlahOperasi('persegi'), getRatio('persegi')];
    const totalLingkaran = [hitungJumlahOperasi('lingkaran'), getRatio('lingkaran')];

    res.render('dashboard', {
        userData: arrayData,
        segitiga: totalSegitiga,
        persegi: totalPersegi,
        lingkaran: totalLingkaran,
        maximum_value: getMax(),
        minimum_value: getMin()
    });
})

// Set Up Connection
app.listen(5050, (req, res) => {
    console.log("Connected at port 5050");
})