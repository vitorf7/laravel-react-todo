/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


var React = require('react');
var ReactDOM = require('react-dom');
import TodosList from './components/TodosList';

ReactDOM.render(
    <TodosList />,
    document.getElementById('Todos')
);