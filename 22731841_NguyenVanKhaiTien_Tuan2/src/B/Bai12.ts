function simulateTask(a: number): Promise<string>{
    return new Promise((res)=>{
        setTimeout(()=>{
            res(`Task finished after ${a} ms`);
        },a);
    });
}

async function runTask() {
    const result = await simulateTask(2000);
    console.log(result);
}

runTask();