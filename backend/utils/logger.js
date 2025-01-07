import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'error', // Chỉ ghi log lỗi
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log' }), // Ghi log vào file
    new transports.Console(), // Hiển thị log trên console
  ],
});

export default logger;
