
export async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id,
    name: `User_${id}`,
  };
}

async function run() {
  const user = await fetchUser(101);
  console.log("User fetched:", user);
}

run();
