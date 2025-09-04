async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  const apiCall = new Promise<{ id: number; name: string }>((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User_${id}` });
    }, 1000);
  });

  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out after 2s"));
    }, 2000);
  });
  return Promise.race([apiCall, timeout]);
}

async function run() {
  try {
    const user = await fetchUser(42);
    console.log("User fetched:", user);
  } catch (err) {
    console.error("Error:", (err as Error).message);
  }
}

run();
