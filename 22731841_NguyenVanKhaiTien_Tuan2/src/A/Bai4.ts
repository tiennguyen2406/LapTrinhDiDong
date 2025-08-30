const random = new Promise<number>((res)=>{
    const number = Math.floor(Math.random() * 100);
    res(number);
});
random.then((mes)=>{
    console.log(mes);
}).catch(()=>{
    console.error("Khong co so random nao");
})