class Car{
  brand: string;
  model: string;
  year: string;

  constructor(brand: string, model: string, year: string){
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  display(): void{
    console.log(`Brand : ${this.brand},Model : ${this.model},Year : ${this.year}`)
  }
}
const c1 = new Car("Toyota","Luxury1","24/06/2025");
c1.display()
