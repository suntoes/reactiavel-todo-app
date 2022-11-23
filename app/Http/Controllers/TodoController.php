<?php

namespace App\Http\Controllers;

use Auth;
use App\Http\Requests\StoreTodoRequest;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $todos = $user->posts()->get();

        return Inertia::render('Dashboard', ['todos' => $todos]);
    }

    /**
     * Store a newly created resource in storage;
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTodoRequest $request)
    {
        $newTodo = Todo::create(
            $request->validated()
        );

        return $newTodo;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreTodoRequest $request, Todo $todo)
    {
        $todo->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        $deleted = $todo->delete();

        return $deleted;
    }
}
