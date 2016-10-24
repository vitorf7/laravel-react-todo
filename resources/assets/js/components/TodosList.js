import React from 'react';
import TodoTask from './TodoTask';
import TodoForm from './TodoForm';

export default class TodosList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        var myInit = {
            method: 'GET'
        };

        jQuery.ajax({
            url: LaravelApp.siteUrl + "/api/tasks",
            method: 'GET'
        }).done((data) => {
            this.setState({tasks: data});
        });
    }

    handleNewTask(task) {

        jQuery.ajax({
            url: LaravelApp.siteUrl + '/api/tasks',
            method: 'POST',
            data: {
                _token: LaravelApp.csrfToken,
                body: task
            }
        }).done(data => {
            var newTask = data.task;
            this.state.tasks.push({
                id: newTask.id,
                body: newTask.body,
                completed: newTask.completed == 0 ? false : true
            });

            this.setState({tasks: this.state.tasks});
        });
    }

    handleDeleteTask(taskId) {
        jQuery.ajax({
            url: LaravelApp.siteUrl + '/api/tasks/' + taskId,
            method: "DELETE",
            data: {
                _token: LaravelApp.csrfToken
            }
        }).done(data => {
            var newTasks = this.state.tasks.filter((task) => {
                return task.id !== taskId
            });

            this.setState({tasks: newTasks});
        });
    }

    render() {
        if (this.state.tasks.length <= 0) {
            return(
                <div>
                    <p>No Todo Tasks</p>

                    <TodoForm createTask={this.handleNewTask.bind(this)} />
                </div>
            );
        }

        return (
            <div>
                <ul className="list-group">
                    {
                        this.state.tasks.map((task) => {
                            return <TodoTask deleteTask={this.handleDeleteTask.bind(this)} todoTask={task} initialCompleted={task.completed} key={task.id}/>
                        })
                    }
                </ul>

                <TodoForm createTask={this.handleNewTask.bind(this)} />
            </div>
        );
    }
}