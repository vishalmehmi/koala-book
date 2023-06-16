const express = require('express');
const Datastore = require('nedb');
const app = express();

app.listen(3000, () => {console.log('Listening on port 3000')});

app.set('view engine', 'ejs');
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

app.post('/del', (req, res) => {
    const data = req.body;
    database.remove({bookTitle: data.delName})
    res.json(data);
    console.log(data.delName);
});

app.post('/dup', (req, res) => {
    const data = req.body;
    database.find({bookTitle: data.dupName}, (err, book) => {
        if (err) {
            console.log(err);
            res.end();
            return;
        }
        console.log(book);
        const bookTitle = book[0].bookTitle;
        const author = book[0].author;
        const noPages = book[0].noPages;
        dupData = {bookTitle, author, noPages};
        console.log(dupData)
        database.insert(dupData);
    });
    res.json(dupData);
});