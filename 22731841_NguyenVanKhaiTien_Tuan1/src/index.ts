class BankAccount {
  private balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    } else {
      console.log("Deposit amount must be positive!");
    }
  }
  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
    } else {
      console.log("Insufficient funds or invalid amount!");
    }
  }
  getBalance(): number {
    return this.balance;
  }
}
const b1 = new BankAccount(1000);
console.log(`Tai khoan hien co : ${b1.getBalance()}`);
b1.deposit(1000);
console.log(`Tai khoan sau khi nap`);
console.log(`Tai khoan hien co : ${b1.getBalance()}`);
b1.withdraw(500);
console.log(`Tai khoan sau khi rut`);
console.log(`Tai khoan hien co : ${b1.getBalance()}`);

