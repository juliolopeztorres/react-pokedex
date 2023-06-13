import Task from '../../Domain/Model/Task';

export default class TaskMapper {
  public static map(task: {id: string, name: string}): Task
  {
    return new Task(task.id, task.name);
  }
}
