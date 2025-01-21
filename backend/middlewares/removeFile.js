import fs from 'fs';
import path from 'path';

const removeFileMiddleware = (url) => {
  // eslint-disable-next-line no-undef
  const oldIconPath = path.join(process.cwd(), url); // Đường dẫn file cũ
  if (fs.existsSync(oldIconPath)) {
    fs.unlinkSync(oldIconPath); // Xóa file cũ
  }
};

export default removeFileMiddleware;
