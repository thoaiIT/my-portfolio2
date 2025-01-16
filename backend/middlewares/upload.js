import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Xác định thư mục lưu trữ dựa trên field name
    const uploadPath = `uploads/${file.fieldname}s`; // Ví dụ: icon -> uploads/icons
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Tạo tên file duy nhất
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Lấy đuôi file (vd: .png, .jpg)
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Lọc loại file (chỉ cho phép ảnh)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'),
      false
    );
  }
};

// Middleware upload
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file 5MB
  fileFilter,
});

// Hàm middleware nhận tên field cần upload
export const uploadMiddleware = (fieldName) => upload.single(fieldName);

export const uploadMultipleMiddleware = (fields) =>
  multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
  }).fields(fields); // fields là mảng { name: <fieldName>, maxCount: <số lượng ảnh> }
