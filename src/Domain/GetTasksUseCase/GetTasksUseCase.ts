import GetTasksUseCaseRepositoryInterface, {GetTasksUseCaseRepositoryCallbackInterface} from "./GetTasksUseCaseRepositoryInterface";
import Task from "../Model/Task";
import GetTasksUseCaseViewInterface from "./GetTasksUseCaseViewInterface";

export default class GetTasksUseCase implements GetTasksUseCaseRepositoryCallbackInterface {
    private repository: GetTasksUseCaseRepositoryInterface;
    private view: GetTasksUseCaseViewInterface;

    constructor(repository: GetTasksUseCaseRepositoryInterface, view: GetTasksUseCaseViewInterface) {
        this.view = view;
        this.repository = repository;
    }

    get(): void {
        this.repository.get(this);
    }

    onTasksLoaded(tasks: Task[]): void {
        this.view.onTasksLoaded(tasks);
    }

    onTasksLoadedError(message: string): void {
        this.view.onTasksLoadedError(message);
    }
}
