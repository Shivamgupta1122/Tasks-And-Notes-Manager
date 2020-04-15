const sequelize = require('sequelize');

const db = new sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todo.db'
});

const Tasks = db.define('Task', {       //Initialize Tasks Schema
    Id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Title: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    Description: {
        type: sequelize.STRING(500)
    },
    DueDate: {
        type: sequelize.DATE,
        allowNull: false
    },
    Priority: {
        type: sequelize.STRING(10),
        defaultValue: "Medium"
    },
    State: {
        type: sequelize.STRING(10),
        defaultValue: "Incomplete"
    }
    
});

const Notes = db.define('Note', {        //Initialize Notes Scheme
    NotesId: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Body: {
        type: sequelize.STRING(1000),
        allowNull: false
    },
    TaskId: {
        type: sequelize.INTEGER
    }
})

const Seed2 = async function Note() {      //Add raw data to Note table
    await db.sync()
    await Notes.create({
        Body: "Complete the frontend part first",
        TaskId: 1
    })
}

const Seed = async function Task() {     //Add raw data to Tasks Table
    await db.sync()
    await Tasks.create({
        Title: "Learn  Nodejs",           //1
        Description: "Complete NodeJs Assignment",
        DueDate: "16/04/2020",
        Status: "Incomplete",
        Priority: "High"
    })
    await Tasks.create({
        Title: "Learn Angular",         //2
        Description: "Complete TypeScript till now",
        DueDate: "20/02/2020",
        Status: "Incomplete",
        Priority: "Medium"
    })
}




db.authenticate() //  check for db connection
    .then(() => {
        console.log("Connected to database...")
    })
    .catch((error) => {
        console.error("Unable to connect to database: ", error)
    })

    

module.exports = {
    db, Tasks, Notes
}

