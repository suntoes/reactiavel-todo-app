import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from '@inertiajs/inertia-react';

import { createTodo, updateTodo, deleteTodo } from '../Utils/axios';
import TodoList from '../Components/TodoList';
import Loading from '../Components/Loading';

export default function Dashboard(props) {
    const { auth, todos: rawTodos } = usePage().props;
    const [ todos, setTodos ] = useState(rawTodos);
    const [ loading, setLoading ] = useState(false);

    const sortByDate = arr => arr.sort(function(a,b){
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

    const onAddNew = () => {
      const callback = ({data}) => {
          setLoading(false)
          if(!data) return 
          const newTodos = sortByDate([...todos, data ])
          setTodos(newTodos)
      }

      setLoading(true)
      createTodo({isDone: "no", task: "", user_id: auth.user.id}).then(callback)
    } 

    const onToggle = (isDone, id) => {
        const newTodo = {...todos.filter(({id:_id}) => _id === id )[0], isDone}
        const newTodos = todos.map(todo => todo.id === id ? newTodo : todo)
        setTodos(newTodos)

        clearTimeout(localStorage.getItem('toggle-save-delay'))
        const timer = setTimeout(() => {
            updateTodo(newTodo)
        }, 500)
        localStorage.setItem('toggle-save-delay', timer)
    }

    const onEdit = (newTask, id) => {
        const newTodo = {...todos.filter(({id:_id}) => _id === id)[0], task: newTask}
        const newTodos = todos.map(todo => todo.id === id ? newTodo : todo)
        setTodos(newTodos)

        clearTimeout(localStorage.getItem('type-save-delay'))
        const timer = setTimeout(() => {
            updateTodo(newTodo)
        }, 500)
        localStorage.setItem('type-save-delay', timer)
    }

    const onDelete = (id) => {
        if (confirm("Are you sure you want to delete this task?")) {
            const callback = ({data}) => {
                setLoading(false)                
                if(!data) return

                const newTodos = todos.filter(todo => todo.id !== id)
                setTodos(newTodos)
            }      
            setLoading(true)
            deleteTodo({id}).then(callback)
        }
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
              <div className="flex h-9 items-center justify-between">
                  <h2 className="font-semibold justify-center text-xl text-gray-800 leading-tight">Dashboard</h2>
                  <div className="justify-center select-none flex">
                      {   
                          loading
                          ?   <Loading />
                          :   <button 
                                className="py-2 px-4 shadow-md no-underline rounded-full bg-green-500 text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
                                onClick={onAddNew}
                                >
                                Add new task
                              </button>	
                      }
                  </div>
              </div>
            }
        >
            <Head title="Dashboard" />
            <TodoList 
              data={todos || []}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              />
        </AuthenticatedLayout>
    );
}
