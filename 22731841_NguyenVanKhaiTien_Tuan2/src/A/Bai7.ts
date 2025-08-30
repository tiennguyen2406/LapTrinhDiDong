function Task1(time: number): Promise<string>{
    return new Promise((res)=>{
        setTimeout(()=>{
            res("Task hoan thanh sau "+ time);
        },time);
    })
}

Promise.race([
    Task1(3000),
    Task1(1000),
    Task1(5000)
]).then((res)=>{
    console.log("Task nhanh nhat: "+ res)
})