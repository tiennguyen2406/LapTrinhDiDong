async function tripleAfter1Sec(num: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return num * 3;
}

async function runSequential() {
  const result1 = await tripleAfter1Sec(2);
  console.log("Result 1:", result1);

  const result2 = await tripleAfter1Sec(3);
  console.log("Result 2:", result2);

  const result3 = await tripleAfter1Sec(4);
  console.log("Result 3:", result3);

}


runSequential();