export async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { id, name: `User_${id}` };
}

async function fetchUsersSequential(ids: number[]) {
  const results = [];
  for (const id of ids) {
    const user = await fetchUser(id);
    results.push(user);
  }
  return results;
}

async function run() {
  console.log(await fetchUsersSequential([1, 2, 3]));
}

run();