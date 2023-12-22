import { Request, Response } from 'express';
import Task, { ITask } from '../models/TaskModel';
import mongoose from 'mongoose';

class TaskController {

    static createTask(req: Request, res: Response): void {
        const { title, description, completed, author, colaborators } = req.body || {};
        
        if (!title || !description || !author) {
          res.status(400).json({ error: 'Por favor, forneça title, description e author.' });
          return;
        }
        
        const task: ITask = new Task({ title, description, completed, author, colaborators });
      
        task
          .save()
          .then((savedTask: ITask) => {
            res.status(201).json({ message: 'Tarefa criada com sucesso', task: savedTask });
          })
          .catch((err: Error) => {
            // Aqui você pode tratar os erros específicos ao salvar a task
            if (err instanceof mongoose.Error.ValidationError) {
              res.status(400).json({ error: 'Erro de validação ao salvar a tarefa.' });
            } else {
              res.status(500).json({ error: 'Erro ao criar a tarefa no banco de dados.' });
            }
          });
      }
  
      static getAllTasks(_req: Request, res: Response) {
        Task.find()
          .then((tasks: ITask[]) => {
            res.status(200).json({ tasks });
          })
          .catch((err: Error) => {
            res.status(500).json({ error: 'Error retrieving tasks' });
          });
      }      
  
    static updateTask(req: Request, res: Response): void {
      const { id } = req.params;
      const { title, description, completed, author, colaborators } = req.body;
  
      Task.findByIdAndUpdate(id, { title, description, completed, author, colaborators }, { new: true })
        .then((updatedTask: ITask | null) => {
          res.status(200).json({ message: 'Tarefa atualizada com sucesso', task: updatedTask });
        })
        .catch((err: Error) => {
          res.status(500).json({ error: err.message });
        });
    }
  
    static deleteTask(req: Request, res: Response): void {
      const { id } = req.params;
  
      Task.findByIdAndDelete(id)
        .then(() => {
          res.status(200).json({ message: 'Tarefa deletada com sucesso' });
        })
        .catch((err: Error) => {
          res.status(500).json({ error: err.message });
        });
    }
  }
  
  export default TaskController;