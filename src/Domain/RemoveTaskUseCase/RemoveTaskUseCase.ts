import RemoveTaskUseCaseRepositoryInterface from './RemoveTaskUseCaseRepositoryInterface';
import Task from '../Model/Task';

export default class RemoveTaskUseCase {
  private repository: RemoveTaskUseCaseRepositoryInterface;

  constructor(repository: RemoveTaskUseCaseRepositoryInterface) {
    this.repository = repository;
  }

  public removeTask(task: Task): void
  {
    this.repository.remove(task);
  }
}
