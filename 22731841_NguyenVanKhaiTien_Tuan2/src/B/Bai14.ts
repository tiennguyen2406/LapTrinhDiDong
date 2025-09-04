async function triple(a:number): Promise<number> {
    await new Promise ((res)=> setTimeout(res,1000));
    return a*3;
}
async function runa() {
  const result = await triple(5);
  console.log(result);
}
runa();