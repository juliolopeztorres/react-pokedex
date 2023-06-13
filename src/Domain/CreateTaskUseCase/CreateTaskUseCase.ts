import CreateTaskUseCaseRepositoryInterface from "./CreateTaskUseCaseRepositoryInterface";
import Task from "../Model/Task";

export default class CreateTaskUseCase {
    // TODO: Bind to the view
    private repository: CreateTaskUseCaseRepositoryInterface;

    constructor(repository: CreateTaskUseCaseRepositoryInterface) {
        this.repository = repository;
    }

    create(task: Task): void {
        this.repository.create(task);
    }
}
