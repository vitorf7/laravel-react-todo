import React from 'react';

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
    }

    submitTask(e) {
        e.preventDefault();

        this.props.createTask(
            this.refs.taskBody.value
        );

        this.refs.taskBody.value = '';
    }

    render() {
        return (
            <div className="clearfix">
                <h4>Add New Todo</h4>
                <form onSubmit={this.submitTask.bind(this)}>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="task_body"
                               placeholder="New Todo Task Text"
                               ref="taskBody"
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-sm pull-right">Add New Todo Task</button>
                    </div>
                </form>
            </div>
        );
    }
}