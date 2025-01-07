export class CustomError extends Error {
  constructor(message, status = 400, code = 'BAD_REQUEST') {
    super(message); // Gọi constructor của lớp cha (Error)
    this.status = status; // HTTP status code
    this.code = code; // Mã lỗi tùy chỉnh
  }
}
