class User {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setName(newName: string): void {
    if (newName.trim().length === 0) {
      console.log("Tên không được để trống!");
      return;
    }
    this.name = newName;
  }
}

const user1 = new User("Nguyễn Văn A");
console.log("Tên ban đầu:", user1.getName());

user1.setName("Trần Thị B");
console.log("Tên sau khi đổi:", user1.getName());
