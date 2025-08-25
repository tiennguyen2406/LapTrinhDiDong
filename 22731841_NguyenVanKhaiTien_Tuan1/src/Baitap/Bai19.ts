class Animal{
    speak():void{
        console.log("The animal make a sound");
    }
}
class Dogo extends Animal{
    speak(): void {
        console.log("Woof");
    }
}
class Cata extends Animal{
    speak(): void {
        console.log("Meow");
    }
}
function makeAnimalSpeak(animal: Animal): void {
    animal.speak();
}
const a1: Animal = new Animal();
const a2: Animal = new Dogo();
const a3: Animal = new Cata();

makeAnimalSpeak(a1);
makeAnimalSpeak(a2); 
makeAnimalSpeak(a3);