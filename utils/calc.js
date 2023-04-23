// 根据运算符进行计算
export function calc(a = 0, ope = "", b = 0) {
  switch (ope) {
      case "+":
          return Number(a) + Number(b);
      case "-":
          return a - b;
      case "×":
          return a * b;
      case "÷":
          return a / b;
      case "%":
          return a % b;
      default:
          return 0;
  }
}