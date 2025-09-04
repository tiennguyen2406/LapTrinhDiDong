function simulateTask1(a: number): Promise<string> {
    return new Promise((res) => {
        setTimeout(() => {
            res(`Task finished after ${a} ms`);
        }, a);
    });
}

async function runTask1() {
    try {
        const result = await simulateTask1(2000);
        console.log(result);
    } catch (err) {
        console.error("Caught an error:", (err as Error).message);
    }
}

runTask1();