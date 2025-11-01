import * as SQLite from "expo-sqlite";

// Mở (hoặc tạo) database có tên ExpenseTracker.db
const db = SQLite.openDatabaseSync("ExpenseTracker.db");

// Hàm tạo bảng nếu chưa tồn tại
export const createTables = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL,     -- 'income' hoặc 'expense'
        date TEXT NOT NULL
      );
    `);
    console.log("✅ Database & table created successfully");
  } catch (error) {
    console.error("❌ Error creating table:", error);
  }
};

// Xuất database để file khác dùng
export default db;
