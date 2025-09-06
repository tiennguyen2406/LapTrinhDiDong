async function fetchWithRetry(url: string, retries: number): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt} to fetch ${url}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(`Error on attempt ${attempt}:`, err);
      if (attempt === retries) {
        throw new Error(`Failed after ${retries} attempts`);
      }
      console.log("Retrying...");
    }
  }
}

fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3)
  .then((data) => console.log("Final result:", data))
  .catch((err) => console.error("Final error:", err));