import Task from '../Model/Task';

export default interface RemoveTaskUseCaseRepositoryInterface {
  remove(task: Task): void;
}
