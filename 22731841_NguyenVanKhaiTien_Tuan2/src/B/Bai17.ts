async function tripleAfter1Sec(num: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return num * 3;
}

async function runForAwait() {
  const promises = [1, 2, 3, 4].map((n) => tripleAfter1Sec(n));
  
  for await (const result of promises) {
    console.log("Result:", result);
  }
}

runForAwait();
