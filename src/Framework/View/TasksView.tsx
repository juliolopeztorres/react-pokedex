import GetTasksUseCaseViewInterface from "../../Domain/GetTasksUseCase/GetTasksUseCaseViewInterface";
import Task from "../../Domain/Model/Task";
import GetTasksUseCase from "../../Domain/GetTasksUseCase/GetTasksUseCase";
import { Component } from 'react';
import React from "react";
import { hot } from 'react-hot-loader/root';
import TaskCollectionMapper from '../Mapper/TaskCollectionMapper';
import { Link } from "react-router-dom";
import { getRoute } from '../Service/RouteService';
import TaskRepository from '../../Data/Repository/TaskRepository';
import ServiceContainerInterface from '../DependencyInjection/ServiceContainerInterface';
import RemoveTaskUseCase from '../../Domain/RemoveTaskUseCase/RemoveTaskUseCase';

type TasksViewPropsInputType = {
  serviceContainer: ServiceContainerInterface
}

type TasksViewStateType = {
  tasks: Task[],
  errors: string[]
}

class TasksView extends Component<TasksViewPropsInputType, TasksViewStateType> implements GetTasksUseCaseViewInterface {
  private getTasksUseCase: GetTasksUseCase;
  private removeTaskUseCase: RemoveTaskUseCase;

  state: TasksViewStateType = {
    tasks: [],
    errors: []
  }

  constructor(props: TasksViewPropsInputType) {
    super(props);

    this.getTasksUseCase = new GetTasksUseCase(props.serviceContainer.getService(TaskRepository.name), this);
    this.removeTaskUseCase = new RemoveTaskUseCase(props.serviceContainer.getService(TaskRepository.name));
    this.onRemoveTaskCallback = this.onRemoveTaskCallback.bind(this);
  }

  componentDidMount(): void {
    this.getTasksUseCase.get();
  }

  onTasksLoaded(tasks: Task[]): void {
    this.setState(() => {
      let errors = [];
      if (tasks.length === 0) {
        errors.push('No tasks were found!');
      }

      return {
        tasks: tasks,
        errors: errors
      }
    });
  }

  onTasksLoadedError(message: string): void {
    this.setState((prevState) => {
      return {errors: [...prevState.errors, message]}
    })
  }

  onRemoveTaskCallback(task: Task): void {
    this.removeTaskUseCase.removeTask(task);
    this.setState({tasks: []}, () => {
      this.getTasksUseCase.get()
    });
  }

  render() {
    const {errors, tasks} = this.state

    return <React.Fragment>
      <section>
        <div className="container">
          <div className="card">
            <div className="card-content">
              <h1 className={'title'}>Listing tasks</h1>

              <div
                className={`columns ${errors.length > 0 ? '' : 'is-hidden'}`}
              >
                <div className="column has-text-danger content">
                  <h3 className={'has-text-danger'}>Errors:</h3>
                  <ul>
                    {errors.map((error) => <li key={error}>{error}</li>)}
                  </ul>
                </div>
              </div>

              <div style={{display: tasks.length === 0 && errors.length === 0 ? 'block' : 'none'}}>Loading...</div>
              <div id={'div-tasks'} className={`columns ${tasks.length > 0 ? '' : 'is-hidden'}`}>
                {TaskCollectionMapper.mapForDivList(tasks, this.onRemoveTaskCallback)}
              </div>
              <div className="buttons are-large">
                <Link to={getRoute('home')} className={'button is-light'}>
                  Back
                </Link>
                <Link to={getRoute('createTask')} className={'button is-warning'}>
                  Create
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>;
  }
}

export default hot(TasksView);
