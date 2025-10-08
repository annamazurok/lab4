import { useTodos } from "../hooks/useTodos";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import LimitSelector from "./LimitSelector";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export default function TodoListForm() {
  const { todos, isLoading, error, deleteTodo, toggleTodo, addTodo,
    editTodoTitle, searchTerm, setSearchTerm, currentPage, goToNextPage,
    goToPrevPage, limitPerPage, setLimit, totalPages } = useTodos();

  if (isLoading)
    return <p>Loading...</p>;

  if (error)
    return <p style={{ color: "red" }}>{error}</p>;

  return(
    <>
    <div className="todo-list-container">
      <h1>Todo List</h1>

      <SearchBar
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      </SearchBar>

      <AddTodoForm onAdd={addTodo}></AddTodoForm>

      <TodoList
      todos={todos}
      deleteTodo={deleteTodo}
      toggleTodo={toggleTodo}
      editTodoTitle={editTodoTitle}>
      </TodoList>

      <Pagination currentPage={currentPage}
      goToNextPage={goToNextPage}
      goToPrevPage={goToPrevPage}
      totalPages={totalPages}></Pagination>

      <LimitSelector limit={limitPerPage} setLimit={setLimit}></LimitSelector>
    </div>
    </>
  )
}