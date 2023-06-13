import Task from '../../Domain/Model/Task';
import TaskMapper from './TaskMapper';

export default class TaskCollectionMapper {
  public static map(taskArray: {id: string, name: string}[]): Task[] {
    if (taskArray.length === 0) {
      return [];
    }

    const tasks: Task[] = [];
    for (let task of taskArray) {
      tasks.push(TaskMapper.map(task));
    }

    return tasks;
  }
}
