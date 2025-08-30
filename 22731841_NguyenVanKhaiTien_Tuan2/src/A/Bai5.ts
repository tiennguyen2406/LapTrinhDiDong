function task(time: number): Promise<string>{
    return new Promise((res)=>{
        setTimeout(()=>{
            res("Task done");
        },time);
    })
}

task(3000).then((mes)=>{
    console.log(mes);
});