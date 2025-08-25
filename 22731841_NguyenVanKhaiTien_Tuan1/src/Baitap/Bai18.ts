class MathUtil {
    static add(a: number, b: number): number {
        return a + b;
    }

    static subtract(a: number, b: number): number {
        return a - b;
    }

    static multiply(a: number, b: number): number {
        return a * b;
    }

    static divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Khong the chia cho 0");
        }
        return a / b;
    }
}

console.log("Cong:", MathUtil.add(10, 5));
console.log("Tru:", MathUtil.subtract(10, 5));
console.log("Nhan:", MathUtil.multiply(10, 5));
console.log("Chia:", MathUtil.divide(10, 5));     
