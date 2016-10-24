<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::get('tasks', 'Api\\TasksController@index')->name('api.tasks.index');
Route::post('tasks', 'Api\\TasksController@store')->name('api.tasks.store');
Route::patch('tasks/{taskId}', 'Api\\TasksController@update')->name('api.tasks.update');
Route::delete('tasks/{taskId}', 'Api\\TasksController@destroy')->name('api.tasks.destroy');
