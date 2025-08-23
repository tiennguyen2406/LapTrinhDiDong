class Rectangle{
  width: number;
  height: number;

  constructor(width: number, height: number){
    this.width = width;
    this.height = height;
  }

  area(): number{
    return this.height*this.width;
  }
  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}
 const r1 = new Rectangle(10,5);
console.log(`Chu vi : ${r1.perimeter()}`);
console.log(`Dien tich : ${r1.area()}`);
