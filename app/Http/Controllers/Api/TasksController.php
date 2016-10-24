<?php

namespace App\Http\Controllers\Api;

use App\Task;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class TasksController extends Controller
{
    public function index()
    {
        return response()->json(
            Task::all()->transform(function ($task) {
                return [
                    'id'        => (int)$task->id,
                    'body'      => (string)$task->body,
                    'completed' => !!$task->completed
                ];
            }),
            200
        );
    }

    public function store(Request $request)
    {
        $newTask = Task::create($request->all());

        return response()->json([
            'task' => Task::findOrFail($newTask->id)->toArray()
        ], 201);
    }

    public function update($taskId, Request $request)
    {
        return response()->json(
            [
                'updated' => Task::findOrFail($taskId)->update($request->all()),
                'request' => $request->all()
            ],
            200
        );
    }

    public function destroy($taskId)
    {
        return response()->json(
            Task::findOrFail($taskId)->delete(),
            200
        );
    }
}
