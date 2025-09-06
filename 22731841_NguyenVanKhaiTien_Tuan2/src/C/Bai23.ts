async function fetchCompletedTodos() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await response.json();

    const completed = todos.filter((todo: any) => todo.completed === true);
    console.log("Completed todos:", completed);
  } catch (err) {
    console.error("Error:", err);
  }
}

fetchCompletedTodos();
