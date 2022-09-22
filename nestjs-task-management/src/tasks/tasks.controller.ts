import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto) {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasks(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    return this.tasksService.createTask({ title, description });
  }

  @Get('/:id')
  getTask(@Param('id') taskId: string): Task {
    return this.tasksService.getTaskById(taskId);
  }

  @Delete('/:id')
  deleteTask(@Param('id') taskId: string): Task {
    return this.tasksService.deleteTaskById(taskId);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() status: TaskStatus) {
    return this.tasksService.updateStatus(id, status);
  }
}
