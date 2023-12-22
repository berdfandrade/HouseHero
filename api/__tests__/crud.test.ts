import { Request, Response } from "express";
import TaskController from "../src/controller/TaskController";
import Task, { ITask } from "../src/models/TaskModel";


jest.mock('../src/models/TaskModel');

describe("TaskController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createTask", () => {
    it("should create a new task", async () => {
      const taskData = {
        title: "Test Task",
        description: "Test Description",
        completed: false,
        author: "Test Author",
        colaborators: ["Collaborator 1", "Collaborator 2"],
      };
      req.body = taskData;

      const saveMock = jest.fn().mockResolvedValue(taskData as ITask);
      // @ts-ignore
      Task.mockImplementation(() => ({
        save: saveMock,
      }));

      await TaskController.createTask(req as Request, res as Response);

      expect(saveMock).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Tarefa criada com sucesso",
        task: taskData,
      });
    });

    it("should handle errors during task creation", async () => {
      const errorMessage = "Error creating task";
      const error = new Error(errorMessage);

      const saveMock = jest.fn().mockRejectedValue(error);
      // @ts-ignore
      Task.mockImplementation(() => ({
        save: saveMock,
      }));

      await TaskController.createTask(req as Request, res as Response);

      expect(saveMock).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getAllTasks', () => {
    it('should get all tasks', async () => {
      const tasksData: ITask[] = [
        // @ts-ignore
        {
          _id : 1, 
          title: 'Test Task 1',
          description: 'Test Description 1',
          completed: false,
          author: 'Test Author 1',
          colaborators: ['Collaborator 1'],
        },
        // @ts-ignore

        {
          _id : 2,
          title: 'Test Task 2',
          description: 'Test Description 2',
          completed: true,
          author: 'Test Author 2',
          colaborators: ['Collaborator 2'],
        },
      ];
  
      // Mock do método find do Task
      const findMock = jest.fn().mockResolvedValue(tasksData);
      Task.find = findMock;
  
      await TaskController.getAllTasks({} as Request, res as Response);
  
      expect(findMock).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ tasks: tasksData });
    });
  
    it('should handle errors during retrieving tasks', async () => {
      const errorMessage = 'Error retrieving tasks';
      const error = new Error(errorMessage);
  
      // Mock do método find do Task para simular um erro
      const findMock = jest.fn().mockRejectedValue(error);
      Task.find = findMock;
  
      await TaskController.getAllTasks({} as Request, res as Response);
  
      expect(findMock).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Testes para updateTask e deleteTask seguem a mesma lógica...
});
