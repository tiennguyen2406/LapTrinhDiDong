import db from "./db";

// 🟢 Thêm giao dịch
export const addTransaction = async (title: string, amount: number, type: string, date: string) => {
  try {
    await db.runAsync(
      "INSERT INTO transactions (title, amount, type, date) VALUES (?, ?, ?, ?)",
      [title, amount, type, date]
    );
    console.log("✅ Thêm giao dịch thành công");
  } catch (error) {
    console.error("❌ Lỗi thêm giao dịch:", error);
  }
};

// 🔵 Lấy toàn bộ giao dịch
export const getAllTransactions = async () => {
  try {
    const result = await db.getAllAsync("SELECT * FROM transactions ORDER BY id DESC");
    return result;
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách:", error);
    return [];
  }
};

// 🟠 Sửa giao dịch
export const updateTransaction = async (id: number, title: string, amount: number, type: string, date: string) => {
  try {
    await db.runAsync(
      "UPDATE transactions SET title = ?, amount = ?, type = ?, date = ? WHERE id = ?",
      [title, amount, type, date, id]
    );
    console.log("✅ Cập nhật giao dịch thành công");
  } catch (error) {
    console.error("❌ Lỗi cập nhật:", error);
  }
};

// 🔴 Xóa giao dịch
export const deleteTransaction = async (id: number) => {
  try {
    await db.runAsync("DELETE FROM transactions WHERE id = ?", [id]);
    console.log("🗑️ Đã xóa giao dịch");
  } catch (error) {
    console.error("❌ Lỗi xóa:", error);
  }
};
