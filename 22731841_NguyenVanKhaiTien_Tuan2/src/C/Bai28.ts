function fakeTask(id: number, delay: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task ${id} finished after ${delay}ms`);
    }, delay);
  });
}
async function batchProcess() {
  console.log("Starting batch processing...");

  const tasks = [
    fakeTask(1, 1000),
    fakeTask(2, 2000),
    fakeTask(3, 1500),
    fakeTask(4, 3000),
    fakeTask(5, 2500),
  ];

  const results = await Promise.all(tasks);

  console.log("All tasks completed!");
  results.forEach((msg) => console.log(msg));
}

batchProcess();