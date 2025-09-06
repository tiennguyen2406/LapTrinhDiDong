async function postData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Hello API",
        body: "This is a test POST request",
        userId: 1,
      }),
    });

    const data = await response.json();
    console.log("Response from POST:", data);
  } catch (err) {
    console.error("Error posting data:", err);
  }
}

postData();
