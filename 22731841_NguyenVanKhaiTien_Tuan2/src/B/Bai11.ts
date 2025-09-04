export async function run() {
    const mess = await new Promise<string>((res)=>{
        setTimeout(()=>{
            res("Hello Async");
        },2000);
    });
    console.log(mess);
}

run();