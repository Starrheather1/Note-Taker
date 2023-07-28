
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const fs = require('fs')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');
app.use(express.static('public'))
app.use(bodyParser.json())
// Without middleware


app.get('/notes', function (req, res) {
    const options = {
        root: path.join(__dirname)
    };

    const fileName = 'public/notes.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.get('/api/notes', function (req, res) {
    const options = {
        root: path.join(__dirname)
    };
    let rawdata = fs.readFileSync('db/db.json');
    let notes = JSON.parse(rawdata);

    res.send(notes)
});

app.post('/api/notes', function (req, res) {
    const options = {
        root: path.join(__dirname)
    };
    console.log(req.body)
    let rawdata = fs.readFileSync('db/db.json');
    let notes = JSON.parse(rawdata);
    notes = [...notes, {...req.body,id:uuidv4()}]
    fs.writeFileSync("db/db.json", JSON.stringify(notes))
    res.send(notes)
});

app.get('*', function (req, res) {
    const options = {
        root: path.join(__dirname)
    };

    const fileName = 'public/index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});