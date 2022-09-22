import { Injectable, Param } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  public tasks: Task[] = [
    {
      id: '7c6e7df9-4e52-4ad4-ac1f-d09d1431bee4',
      status: TaskStatus.OPEN,
      title: 'Task 2',
      description: 'This is task 2 neverbeafoollikeyou description',
    },
    {
      id: '1a557b2a-aaed-4103-833b-6360a9059a33',
      status: TaskStatus.OPEN,
      title: 'Task 3',
      description: 'This is task 3 Steven description',
    },
    {
      id: 'e5f8344c-f7ff-4385-bbed-25b011c03d37',
      status: TaskStatus.OPEN,
      title: 'Task 4',
      description: 'This is task 4 hahalolol description',
    },
  ];

  constructor() {
    console.log('TasksService is running');
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasks(filterDto: GetTaskFilterDto): Task[] {
    let tasks = this.tasks.slice();

    for (const prop in filterDto) {
      tasks = tasks.filter((task) => {
        const taskPropValue = task[prop].toLowerCase();
        const filterPropValue = filterDto[prop].toLowerCase();

        return taskPropValue.includes(filterPropValue);
      });
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const newTask = {
      id: uuidv4(),
      status: TaskStatus.OPEN,
      ...createTaskDto,
    };
    this.tasks.push(newTask);

    return newTask;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): Task {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return null;
    }

    const deletedTask = this.tasks.splice(index, 1);
    return deletedTask[0];
  }

  updateStatus(id: string, status: TaskStatus): Task {
    for (const task of this.tasks) {
      if (task.id === id) {
        task.status = status;
        return task;
      }
    }
  }
}
