import { useContext, createContext } from "react";

export const TodoContext = createContext({
    todos: [
        { id: 1, dsc: "complete lecture 14 of chai-aur-react", completed: false },
    ],
    addTodo: (todo) => {},
    deleteTodo: (id) => {},
    toggleTodo: (id) => {},
    updateTodo: (id, todo) => {},
});

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;