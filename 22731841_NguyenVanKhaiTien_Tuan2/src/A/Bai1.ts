const promise = new Promise<string>((res)=>{
  setTimeout(()=>{
    res("Hello Async");
  },2000);
});

promise.then((mes)=>{
  console.log(mes);
});
