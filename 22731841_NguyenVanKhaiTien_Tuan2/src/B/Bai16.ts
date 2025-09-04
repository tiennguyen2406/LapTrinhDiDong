async function tripleAfter1Sec(num: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return num * 3;
}

async function runParallel() {
  const [result1, result2, result3] = await Promise.all([
    tripleAfter1Sec(2),
    tripleAfter1Sec(3),
    tripleAfter1Sec(4),
  ]);

  console.log("Result 1:", result1); 
  console.log("Result 2:", result2);
  console.log("Result 3:", result3);

}
runParallel();