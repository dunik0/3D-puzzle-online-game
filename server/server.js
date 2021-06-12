const express = require('express');
const Datastore = require('nedb');
const path = require('path');
const app = express();
const db = new Datastore({ filename: 'db/lobbies.nedb', autoload: true });
const port = 3000;


app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'creator.html'))
})

app.get('/join', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'lobbies.html'))
})

app.post('/createLobby', (req, res) => {
    console.log(req.body)
    const lobby = {
        name: req.body.name
    };

    db.insert(lobby, (err, newDoc) => {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
    });
    res.end()
})





app.listen(port, () => {
    console.log('Server running on port ' + port);
})