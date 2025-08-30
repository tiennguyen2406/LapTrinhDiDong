const mang :number[] = [1,2,3,4,5,6];
const a = new Promise<number[]>((res)=>{
    setTimeout(()=>{
        res(mang);
    },1000);
});

a.then((mang)=>{
    console.log("Mang ban dau: ",mang);
}).then(()=>{
    return mang.filter((n)=> n%2 ===0);
}).then((res)=>{
    console.log("Mang sau khi loc: ",res);
});
