import React from 'react';

export default class TodoTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            completed: props.initialCompleted,
            completeIcon: props.initialCompleted ? 'glyphicon-remove' : 'glyphicon-ok',
            completeTitle: props.initialCompleted ? 'Un Complete Task' : 'Complete Task',
        }
    }

    isCompleted() {
        return (this.state.completed) ? 'is-completed' : '';
    }

    getCompleteIcon() {
        return (this.state.completed) ? 'glyphicon-remove' : 'glyphicon-ok';
    }

    getCompleteTitle() {
        return (this.state.completed) ? 'Un Complete Task' : 'Complete Task'
    }

    completeTask() {
        jQuery.ajax({
            url: LaravelApp.siteUrl + '/api/tasks/' + this.props.todoTask.id,
            method: 'PATCH',
            data: {
                _token: LaravelApp.csrfToken,
                completed: this.state.completed ? 0 : 1
            }
        }).done((data) => {
            var isCompleted = !this.state.completed;
            this.setState({completed: isCompleted});
        });
    }

    deleteTask() {
        if (confirm('Are you sure you want to delete this task?')) {
            this.props.deleteTask(this.props.todoTask.id);
        }
    }

    render() {
        return (
            <li className={this.isCompleted() + " list-group-item Task"}>
                {this.props.todoTask.body}

                <a href="#"
                   onClick={this.deleteTask.bind(this)}
                   className="Task__DeleteButton"
                >
                    <i className="pull-right glyphicon glyphicon-trash" title="Delete Task"></i>
                </a>

                <a href="#"
                   onClick={this.completeTask.bind(this)}
                   className="Task__CompleteTask"
                >
                    <i className={"pull-right glyphicon " + this.getCompleteIcon()} title={this.getCompleteTitle()}></i>
                </a>
            </li>
        );
    }
}