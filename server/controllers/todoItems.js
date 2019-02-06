const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res){
        return TodoItem 
            .create({
                content: req.body.content,
                todoId: req.params.todoId,
            })
            .then(todoItem => res.status(201).send(todoItem))
            .catch(error => res.status(400).send(error));
    },

    // list(req, res){
    //     return TodoItem
    //         .all()
    //         .then(todoItems => res.send(200).send(todoItems))
    //         .catch(error => res.send(400).send(error))
    // }

    updateItem(req, res){
        return TodoItem
            .find({
                where: {
                    id: req.params.todoItemId,
                    todoId: req.params.todoId
                }
            })
            .then(todoItem => {
                if(!todoItem){
                    return res.status(404).send({
                        message: 'TodoItem not found',
                    });
                }
                return todoItem 
                    .update({
                        content: req.body.content || todoItem.content,
                        complete: req.body.complete || todoItem.complete,
                    })
                    .then(updated => res.status(200).send(updated))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    deleteItem(req, res){
        return TodoItem 
                .find({
                    where: {
                        id: req.params.todoItemId,
                        todoId: req.params.todoId
                    }
                })
                .then(todoItem => {
                    if(!todoItem){
                        return res.status(404).send({
                            message: 'TodoItem not found'
                        });
                    }

                    return todoItem
                        .destroy()
                        .then(() => res.status(200).send({
                            message: 'deleted'
                        }))
                        .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    }
    //for models that have large fields and we just need to update some rows, we will use:
    // update(req.body, {fields: Object.keys(req.body)})
    // Object.keys tells sequelize to update only a portion, so we dont have to be using ||

}