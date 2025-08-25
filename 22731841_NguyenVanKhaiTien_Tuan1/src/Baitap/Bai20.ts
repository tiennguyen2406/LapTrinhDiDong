interface Vehicle {
    start(): void;
    stop(): void;
}
class Bike implements Vehicle {
    private speed: number = 0;
    start(): void {
        this.speed = 20;
        console.log("Bike started. Speed is " + this.speed + " km/h.");
    }
    stop(): void {
        this.speed = 0;
        console.log("Bike stopped.");
    }
}
class Car implements Vehicle{
    private speed: number = 0;
    start(): void {
        this.speed = 40;
        console.log("Car started. Speed is " + this.speed + " km/h.");
    }
    stop(): void {
        this.speed = 0;
        console.log("Car stopped.");
    }
}

let myCar: Vehicle = new Car();
let myBike: Vehicle = new Bike();

myCar.start();

myCar.stop();

myBike.start();  
myBike.stop();