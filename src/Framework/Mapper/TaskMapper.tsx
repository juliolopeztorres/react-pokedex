import Task from "../../Domain/Model/Task";
import React from "react";

export default class TaskMapper {

  static mapForDivList(task: Task, onRemoveTaskCallback: (task: Task) => void = (task) => {}): JSX.Element {
    return <div key={task.getId()} className={'column is-narrow'}>
      <div className={'card has-background-danger-light'}>
        <div className={'card-content'}>
          <div className="columns is-justify-content-end has-text-right">
            <span className="button icon has-text-danger is-danger is-light" title={'Remove'} onClick={() => onRemoveTaskCallback(task)}>
              <i className="fas fa-close"></i>
            </span>
          </div>
          <p className="subtitle"><b>ID:</b> {task.getId()}</p>
          <p className="subtitle"><b>Name:</b> {task.getName()}</p>
        </div>
      </div>
    </div>;
  }

  static mapForCreate(id: string, name: string): Task {
    return new Task(id, name);
  }
}
