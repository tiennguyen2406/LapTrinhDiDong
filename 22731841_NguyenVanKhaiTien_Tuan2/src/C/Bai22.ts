async function fetchTodo(id: number) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return response.json();
}

async function runSequential() {
  console.log("Sequential calls:");
  for (let i = 1; i <= 3; i++) {
    const data = await fetchTodo(i);
    console.log(`Todo ${i}:`, data);
  }
}

runSequential();
