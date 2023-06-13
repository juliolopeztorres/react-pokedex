import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import CreateTaskUseCase from '../../Domain/CreateTaskUseCase/CreateTaskUseCase';
import TaskMapper from '../Mapper/TaskMapper';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getRoute } from '../Service/RouteService';
import TaskRepository from '../../Data/Repository/TaskRepository';
import ServiceContainerInterface from '../DependencyInjection/ServiceContainerInterface';

type CreateTaskViewPropsInputType = {
  serviceContainer : ServiceContainerInterface
} & RouteComponentProps;

type CreateTaskViewStateType = {
  id : string,
  name : string
}

class CreateTaskView extends Component<CreateTaskViewPropsInputType, CreateTaskViewStateType> {
  private createTaskUseCase : CreateTaskUseCase;

  state : CreateTaskViewStateType = {
    id: '',
    name: ''
  }

  constructor(props : CreateTaskViewPropsInputType) {
    super(props);

    this.createTaskUseCase = new CreateTaskUseCase(props.serviceContainer.getService(TaskRepository.name));
    this.createTask = this.createTask.bind(this);
  }

  render() {
    const { id, name } = this.state;

    return <React.Fragment>
      <section>
        <div className="container">
          <div className="card">
            <div className="card-content">
              <h1 className={'title'}>Create new task</h1>

              <div className="columns">
                <div className="column">
                  <div className="control has-icons-left">
                    <input className={'input is-large is-dark'} data-testid={'inputId'} type="text" name="id" placeholder="Enter an id..."
                           value={id}
                           onChange={(value) => this.setState((prevState) => {
                             return { ...prevState, id: value.target.value }
                           })}/>
                    <span className="icon is-left">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                </div>
                <div className="column">
                  <div className="control has-icons-left">
                    <input className={'input is-large is-dark'} data-testid={'inputName'} type="text" name="name" placeholder="Enter a name..."
                           value={name}
                           onChange={(value) => this.setState((prevState) => {
                             return { ...prevState, name: value.target.value }
                           })}/>
                    <span className="icon is-left">
                      <i className="fas fa-tag"></i>
                    </span>
                  </div>
                </div>
                <div className="column">
                  <button
                    className={'button is-warning is-large'}
                    data-testid={'buttonCreate'} type="button" onClick={this.createTask}>Create</button>
                </div>
              </div>
              <div className="buttons are-large">
                <Link to={getRoute('listTasks')} className={'link button is-light'}>
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
      ;
  }

  createTask() {
    const { id, name } = this.state;

    this.createTaskUseCase.create(TaskMapper.mapForCreate(id, name));
    this.props.history.push(getRoute('listTasks'));
  }
}

export default hot(CreateTaskView);
