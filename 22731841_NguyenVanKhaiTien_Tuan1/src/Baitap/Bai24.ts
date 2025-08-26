abstract class Appliance {
    abstract turnOn(): void;
}
class Fan extends Appliance {
    turnOn(): void {
        console.log("Fan is now running.");
    }
}
class AirConditioner extends Appliance {
    turnOn(): void {
        console.log("Air Conditioner is now cooling.");
    }
}
const fan = new Fan();
fan.turnOn(); 

const ac = new AirConditioner();
ac.turnOn();