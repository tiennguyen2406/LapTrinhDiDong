class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  displayInfo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

const p1 = new Person("Nguyen Van Khai Tien", 21);
p1.displayInfo()

class Student extends Person{
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }
  displayAllInfo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
  }
}

const s2 = new Student("Nguyen Van A", 20, "A");
s2.displayAllInfo();