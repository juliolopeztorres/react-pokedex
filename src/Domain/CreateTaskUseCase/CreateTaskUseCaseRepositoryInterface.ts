import Task from "../Model/Task";

export default interface CreateTaskUseCaseRepositoryInterface {
    create(task: Task): void;
}