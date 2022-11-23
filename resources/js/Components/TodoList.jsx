import React, { useEffect, useRef } from 'react'

const DynamicTextArea = ({ value, isDone, onInput }) => {
  const textAreaRef = useRef()

  useEffect(() => {
    if(textAreaRef?.current) {
      textAreaRef.current.style.height = '0px'
      const scrollHeight = textAreaRef.current.scrollHeight
      textAreaRef.current.style.height = scrollHeight + 'px'
    }
  }, [value])

  return (
      <textarea 
          ref={textAreaRef} 
          placeholder="Type here..." 
          value={value}
          onInput={onInput}
          className={`w-full ${isDone ? "opacity-70 line-through" : ""} p-0 border-none overflow-auto outline-none resize-none text-gray-900`} />
  )
}

const TodoList = ({data, onToggle, onEdit, onDelete}) => (
    <div className="py-12">
        {
            data.map(({id, task, isDone}, index) => (
                <div key={`task-${index}`} className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-2">
                    <div className="group flex px-6 py-6 items-center justify-between bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center w-full">
                            <input 
                                className="mr-6" 
                                type="checkbox" 
                                checked={isDone === "yes"} 
                                onChange={() => onToggle(isDone === "yes" ? "no" : "yes", id)} 
                                />
                            <DynamicTextArea 
                                value={task || ""}
                                isDone={isDone === "yes"}
                                onInput={(e) => onEdit(e.target.value, id)} 
                                />
                        </div>
                        <div className="flex -my-6 pl-6">
                            <div className="invisible group-hover:visible justify-center select-none flex">
                                <button 
                                    className="py-2 px-4 shadow-md no-underline rounded-full bg-red-500 text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
                                    onClick={() => onDelete(id)}>
                                    Delete
                                </button>	
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
)

export default TodoList
