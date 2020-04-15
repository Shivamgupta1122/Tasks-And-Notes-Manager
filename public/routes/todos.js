const route = require('express').Router()
const {Tasks, Notes} = require('../db')

//get all notes
route.get('/',(req,res)=>{
    Tasks.findAll()
        .then((tasks)=>{
            res.status(200).send(tasks)
        })
        .catch((error)=>{
            res.status(500).send({
                error:"Could not find the required task"
            })
        })
})
//get the specific task by id
route.get('/:id',(req,res)=>{
    const id = req.params.id
    Tasks.findByPk(id)
    .then((tasks)=>{
        res.status(200).send(tasks)
    })
    .catch((error)=>{
        res.status(500).send({
            error:"No task found for the id specified!!!!"+res.id
        })
        
    })
})



//get the notes od specified task by id
route.get('/:id/notes', async (req,res)=>{
    const id = parseInt(req.params.id)
    const notes = await Note.findAll({where: {task_id: id}})
    res.send(notes)
})

// Add a new todo
route.post('/', async (req, res) => {
   
    const newTask = await Task.create({
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        duedate: req.body.duedate,
        priority: req.body.priority
    })
    res.status(201).send({
        success: 'New task added'
    })
});

//post a note using id
route.post('/:id/notes',(req,res)=>{
    const id = parseInt(req.params.id);
    Note.create({
        note_id:id,
        note:req.body.note
        

    }).then((task)=>{
        res.status(201).send(task)
    })
    .catch((user)=>{
        res.status(501).send({
            error:"Could not add new task"
        })

    })
})

//Updating a specific task using id
route.patch('/:id',async (req,res)=>{
    const id = parseInt(req.params.id);
     await Task.update({
         
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        duedate: req.body.duedate,
        priority: req.body.priority
    },{
        where: {id: this.id}
    })
    res.status(201).send({
        success: ' task updated succesfully'
    })
})

module.exports = route