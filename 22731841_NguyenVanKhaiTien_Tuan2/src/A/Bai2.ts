function getnumber(): Promise<number>{
    return new Promise((res)=>{
        setTimeout(()=>{
            res(10);
        },1000);
    });
}
getnumber().then((mes)=>{
    console.log(mes);
})