import Task from "../Model/Task";

export default interface GetTasksUseCaseViewInterface {
    onTasksLoaded(tasks: Task[]): void;

    onTasksLoadedError(message: string): void;
}
