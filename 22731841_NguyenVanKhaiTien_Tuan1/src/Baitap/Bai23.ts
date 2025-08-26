interface Payment{
    pay(amount: number): void;
}

class CashPayment implements Payment{
    pay(amount: number): void {
        console.log(`Paid $${amount} in cash.`);
    }
}
class CardPayment implements Payment {
  pay(amount: number): void {
    console.log(`Paid $${amount} in card.`);
  }
}
const cash: Payment = new CashPayment();
cash.pay(100);  

const card: Payment = new CardPayment();
card.pay(250); 