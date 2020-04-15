const express = require('express');
const srv = express();

const {db, Tasks} = require('./db');
const tasksRoute = require('./routes/todos');



srv.use(express.urlencoded({extended: true}))
srv.use(express.json())

srv.use(express.static(__dirname + '/public'));
srv.use('/todos', tasksRoute); 


db.sync()
    .then(() => {
        app.listen(3333, () => {
            console.log("Server started on port 3001");
        })
    })
    .catch((error) => {
        console.log("Unable to connect to database: " + error);
    })
