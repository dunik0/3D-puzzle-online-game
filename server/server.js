const express = require('express');
var exphbs = require('express-handlebars');
const Datastore = require('nedb');
const path = require('path');
const app = express();
const db = new Datastore({ filename: 'db/lobbies.nedb', autoload: true });
const port = 3000;
var hbs = exphbs.create({ /* config */ });
// const modulePath = require('app-module-path')
// console.log(path.join(__dirname, '../'))
// // modulePath.addPath();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.get('/', function (req, res) {
    res.render('index');
});

app.get('/create', function (req, res) {
    res.render('create');
});

app.post('/createLobby', (req, res) => {
    const lobby = {
        name: req.body.name,
        player1: req.body.player1,
        player2: null,
        started: false,
        player1Time: null,
        player2Time: null
    };

    db.insert(lobby, (err, newDoc) => {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        console.log(newDoc)
        res.send(newDoc._id)
    });

})

app.get('/lobby', function (req, res) {
    db.find({ "_id": req.query.id }, (err, docs) => {
        if (docs[0]) {
            res.render('lobby', {
                player1: docs[0].player1,
                player2: docs[0].player2
            });
        } else {
            res.send('lobby does not exist')
        }

    })

});

app.post('/lobby', (req, res) => {
    db.find({ "_id": req.query.id }, (err, docs) => {
        if (docs[0]) {
            res.send(docs[0])
        } else {
            res.send(JSON.stringify('lobby does not exist'))
        }

    })
})

app.get('/join', function (req, res) {
    if (req.query.id) {
        res.render('join', { lobby: req.query.id })
    } else {
        db.find({ player2: null }, (err, docs) => {
            res.render('lobbies', { lobbies: docs });
        });
    }

});

app.post('/join', (req, res) => {
    console.log(req.body)
    db.update(
        { _id: req.body.lobby },
        { $set: { player2: req.body.nick } },
        {},
        function (err, numReplaced) {
            console.log("replaced---->" + numReplaced);
        }
    );
    res.send('ok')
})

app.get('/deleted', function (req, res) {
    res.render('delete');
});

app.post('/delete', (req, res) => {
    db.remove({ _id: req.query.id },
        {}, function (err, numRemoved) {
            console.log('removed' + numRemoved)
        })
    res.send('deleted lobby')
})

app.post('/leave', (req, res) => {
    db.update(
        { _id: req.query.id },
        { $set: { player2: null } },
        {},
        function (err, numReplaced) {
            console.log("replaced---->" + numReplaced);
        }
    );
    res.send('left lobby')
})

app.post('/start', async (req, res) => {
    db.find({ _id: req.query.id }, (err, docs) => {
        console.log(docs)
        if (docs[0].player2) {
            db.update(
                { _id: req.query.id },
                { $set: { started: true } },
                {},
                function (err, numReplaced) {
                    console.log("replaced---->" + numReplaced);
                }
            );
            res.send('started game')
        } else {
            res.send('wait')
        }
    });
})

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'game', 'index.html'))
})

app.post('/end', (req, res) => {
    db.find({ _id: req.body.lobby }, (err, docs) => {
        console.log(docs)
        switch (req.body.nick) {
            case docs[0].player1:
                db.update(
                    { _id: req.body.lobby },
                    { $set: { player1Time: req.body.time } },
                    {},
                    function (err, numReplaced) {
                        console.log("replaced---->" + numReplaced);
                    }
                );
                break;
            case docs[0].player2:
                db.update(
                    { _id: req.body.lobby },
                    { $set: { player2Time: req.body.time } },
                    {},
                    function (err, numReplaced) {
                        console.log("replaced---->" + numReplaced);
                    }
                );
                break;
        }
        res.send('saved')
    });
})

app.get('/scoreboard', (req, res) => {
    // db.find({ _id: req.query.id }, (err, docs) => {
    //     const players = []
    //     if (docs[0].player1Time && docs[0].player2Time) {
    //         if (docs[0].player1Time < docs[0].player2Time) {
    //             players.push({ name: docs[0].player1, time: docs[0].player1Time })
    //             players.push({ name: docs[0].player2, time: docs[0].player2Time })
    //         } else {
    //             players.push({ name: docs[0].player2, time: docs[0].player2Time })
    //             players.push({ name: docs[0].player1, time: docs[0].player1Time })
    //         }

    //     } else if (docs[0].player1Time) {
    //         players.push({ name: docs[0].player1, time: docs[0].player1Time })
    //     } else if (docs[0].player2Time) {
    //         players.push({ name: docs[0].player2, time: docs[0].player2Time })
    //     }
    //     console.log(docs)

    res.render('scoreboard')
    // });
})
// app.get('/create', (req, res) => {
//     res.sendFile(path.join(__dirname, 'static', 'creator.html'))
// })


// app.get('/join', (req, res) => {
//     res.sendFile(path.join(__dirname, 'static', 'lobbies.html'))
// })





// // app.route({
// //     method: 'GET',
// //     path: '/{filename*}',
// //     handler: {
// //         directory: {
// //             path: __dirname + '/static',
// //             listing: false,
// //             index: false
// //         }
// //     }
// // });

// app.route({
//     method: 'GET',
//     path: '/',
//     handler: function (request, reply) {
//         reply.view('home');
//     }
// });

app.use(express.static('static'));
app.listen(port, () => {
    console.log('Server running on port ' + port);
})