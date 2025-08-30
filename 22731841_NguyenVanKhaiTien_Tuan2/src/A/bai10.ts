
function getnumber1(): Promise<number>{
    return new Promise((res)=>{
        setTimeout(()=>{
            res(10);
        },1000);
    });
}
getnumber1().then((mes)=>{
    console.log(mes);
}).catch((err)=>{
    console.error("Loi: ",err);
}).finally(()=>{
    console.log("Done");
})