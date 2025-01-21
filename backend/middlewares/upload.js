import fs from 'fs';
import path from 'path';

const uploadMiddleware = async (file, folder = 'uploads') => {
  try {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const resolveFile = await file;
    const { createReadStream, filename, mimetype } = resolveFile.file;

    // Kiểm tra loại file (ví dụ: chỉ chấp nhận ảnh)
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ];
    if (!allowedTypes.includes(mimetype)) {
      throw new Error(
        `Invalid file type: ${mimetype}. Allowed types are ${allowedTypes.join(', ')}`
      );
    }

    // Đường dẫn lưu trữ file
    // eslint-disable-next-line no-undef
    const uploadDir = path.join(process.cwd(), folder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);

    // Kiểm tra xem file đã tồn tại hay chưa
    if (fs.existsSync(filePath)) {
      throw new Error(
        `File with name "${filename}" already exists. Please rename the file and try again.`
      );
    }

    const stream = createReadStream();

    // Lưu file
    await new Promise((resolve, reject) => {
      const out = fs.createWriteStream(filePath);
      stream.pipe(out);
      out.on('finish', resolve);
      out.on('error', reject);
    });

    // Trả về đường dẫn URL của file
    return `/${folder}/${filename}`;
  } catch (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }
};

export default uploadMiddleware;
