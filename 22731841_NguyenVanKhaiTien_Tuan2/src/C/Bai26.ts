function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function simulateWait() {
  console.log("Waiting for 5 seconds...");
  await wait(5000);
  console.log("Done waiting!");
}

simulateWait();
