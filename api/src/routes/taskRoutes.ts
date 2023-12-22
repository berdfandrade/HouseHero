import express from 'express';
import TaskController from '../controller/TaskController';

const router = express.Router();

router.post('/tasks', TaskController.createTask)
      .get('/tasks', TaskController.getAllTasks)
      .put('/tasks/:id', TaskController.updateTask)
      .delete('/tasks/:id', TaskController.deleteTask)

export default router;