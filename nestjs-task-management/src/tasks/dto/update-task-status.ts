import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatus {
  @IsEnum(TaskStatus, {
    message: 'the given status is not allowed',
  })
  @IsNotEmpty()
  status: TaskStatus;
}
