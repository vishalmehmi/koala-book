const express = require('express');
const Datastore = require('nedb');
const app = express();

app.listen(3000, () => {console.log('Listening on port 3000')});

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('bookdir.db');
database.loadDatabase();

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
            return;
        }
        res.json(data);
    });
});

app.post('/api', (req, res) => {
    const data = req.body;
    database.insert(data);
    res.json(data);
    console.log(data);
});