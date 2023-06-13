import GetTasksUseCaseRepositoryInterface, {GetTasksUseCaseRepositoryCallbackInterface} from "../../Domain/GetTasksUseCase/GetTasksUseCaseRepositoryInterface";
import Task from "../../Domain/Model/Task";
import Service from "../Service";
import CreateTaskUseCaseRepositoryInterface from "../../Domain/CreateTaskUseCase/CreateTaskUseCaseRepositoryInterface";
import TaskCollectionMapper from '../Mapper/TaskCollectionMapper';
import RemoveTaskUseCaseRepositoryInterface from '../../Domain/RemoveTaskUseCase/RemoveTaskUseCaseRepositoryInterface';

export default class TaskRepository implements Service,
    GetTasksUseCaseRepositoryInterface,
    CreateTaskUseCaseRepositoryInterface,
    RemoveTaskUseCaseRepositoryInterface {
    private tasks: Task[];
    private store: Storage;

    constructor(store: Storage) {
        this.store = store;
        this.tasks = TaskCollectionMapper.map(
          JSON.parse(this.store.getItem('tasks') ?? `[]`)
        );
    }

    get(callback: GetTasksUseCaseRepositoryCallbackInterface): void {
        // setTimeout(() => {
            callback.onTasksLoaded(this.tasks)
        // }, 500);
    }

    create(task: Task): void {
        this.tasks.push(task);
        this.store.setItem('tasks', JSON.stringify(this.tasks));
    }

    remove(taskSearched: Task): void {
        this.tasks.splice(
          this.tasks.indexOf(
            this.tasks.filter(
              (task: Task) => task.getId() === taskSearched.getId()
            )[0]
          ),
          1
        )
        this.store.setItem('tasks', JSON.stringify(this.tasks));
    }

    getName(): string {
        return TaskRepository.name;
    }
}
