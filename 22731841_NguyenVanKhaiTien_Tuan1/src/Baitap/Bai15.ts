class Book {
    title: string;
    author: string;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }
    getInfo(): string {
        return `"${this.title}" by ${this.author}`;
    }
}
class User1 {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
class Library {
    private books: Book[] = [];
    private users: User1[] = [];

    addBook(book: Book): void {
        this.books.push(book);
        console.log(`Added book: ${book.getInfo()}`);
    }

    addUser(user: User1): void {
        this.users.push(user);
        console.log(`Added user: ${user.name}`);
    }

    listBooks(): void {
        console.log("Books in library:");
        this.books.forEach(b => console.log(b.getInfo()));
    }

    listUsers(): void {
        console.log("Users in library:");
        this.users.forEach(u => console.log(u.name));
    }
}

const lib = new Library();

const book1 = new Book("1984", "George Orwell");
const book2 = new Book("The Hobbit", "J.R.R. Tolkien");
const user3 = new User1("Alice");
const user2 = new User1("Bob");

lib.addBook(book1);
lib.addBook(book2);
lib.addUser(user3);
lib.addUser(user2);

lib.listBooks();
lib.listUsers();