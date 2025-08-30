function Task(time: number): Promise<string>{
    return new Promise((res)=>{
        setTimeout(()=>{
            res("Task hoan thanh sau"+ time);
        },time);
    })
}

Promise.all([
    Task(1000),
    Task(2000),
    Task(3000)
]).then((res)=>{
    console.log("Cac ket qua :" + res);
})