class Book {
  private title: string;
  private author: string;
  private year: number;

  constructor(title: string, author: string, year: number) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  
  displayInfo(): void {
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`Year: ${this.year}`);
  }
}
const book1 = new Book("Lập Trình Java", "Nguyễn Văn A", 2021);
book1.displayInfo();
const book2 = new Book("Lập Trình JS", "Nguyễn Văn B", 2025);
book2.displayInfo();

