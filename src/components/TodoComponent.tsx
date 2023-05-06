import React, { useState } from "react";
import { Todo } from "../types";
import { v4 as uuidv4 } from "uuid";
import X from "../assets/x.svg";

const TodoComponent = () => {
  const [todoList, setTodoList] = useState<Todo[]>([
    {
      id: uuidv4(),
      description: "Create React App",
      isDone: true,
      isEditing: false,
    },
  ]);

  const handleCheck = (id: string) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      })
    );
  };

  const handleEdit = (id: string, newState: boolean) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEditing: todo.isDone ? false : newState };
        }
        return todo;
      })
    );
  };

  const handleInputChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            description: e.target.value,
          };
        }
        return todo;
      })
    );
  };

  const createTodo = () => {
    const newTodo: Todo = {
      id: uuidv4(),
      description: "Click to edit me",
      isDone: false,
      isEditing: false,
    };
    setTodoList([...todoList, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const todoExists = () => {
    return (
      <div className="flex flex-col gap-4 relative my-4">
        {todoList.map((todo) => (
          <div className="flex flex-row gap-6 relative my-4" key={todo.id}>
            <button
              className="px-3 absolute -left-16 top-1"
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              <img src={X} alt="" />
            </button>
            <input
              type="checkbox"
              disabled={todo.isEditing}
              checked={todo.isDone}
              onChange={() => {
                handleCheck(todo.id);
              }}
              className="w-6"
            />
            {!todo.isEditing ? (
              <p
                onClick={() => {
                  handleEdit(todo.id, true);
                }}
              >
                {todo.isDone ? (
                  <s>{todo.description}</s>
                ) : (
                  <span>{todo.description}</span>
                )}
              </p>
            ) : (
              <div className="flex flex-row gap-4">
                <input
                  className="bg-gray-100 rounden-sm outline-none p-2"
                  type="text"
                  value={todo.description}
                  onChange={(e) => {
                    handleInputChange(todo.id, e);
                  }}
                />
                <button
                  onClick={() => {
                    handleEdit(todo.id, false);
                  }}
                  className="text-sm rounded-sm bg-green-200 hover:bg-green-300 p-1"
                >
                  ok
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-full my-10">
      {todoList.length > 0 ? todoExists() : <div>So empty...</div>}
      <button
        onClick={createTodo}
        className="text-lg rounded-md bg-green-200 hover:bg-green-300 p-2 my-6"
      >
        Add new
      </button>
    </div>
  );
};

export default TodoComponent;
