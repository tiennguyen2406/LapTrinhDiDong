Promise.resolve(2).then((n)=>{
    const binhphuong = n * n;
    console.log("Sau khi binh phuong: ", binhphuong);
    return binhphuong;
}).then((n)=>{
    const gapdoi = n*2;
    console.log("Sau khi gap doi: ",gapdoi);
    return gapdoi;
}).then((n)=>{
    const cong = n+5;
    console.log("Sau khi cong 5 : ",cong);
    return cong;
}).then((res)=>{
    console.log("Ket qua : ",res);
});