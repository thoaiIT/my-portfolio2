import { rule, shield } from 'graphql-shield';
import jwt from 'jsonwebtoken';
import { CustomError } from './customError.js';

// Rule: Kiểm tra xác thực
const isAuthenticated = rule()(async (parent, args, context) => {
  const { req } = context;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return new CustomError(
      'Unauthorized! Token missing.',
      401,
      'TOKEN_MISSING'
    );
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return new CustomError(
      'Unauthorized! Token invalid.',
      401,
      'TOKEN_INVALID'
    );
  }

  try {
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    context.user = decoded; // Lưu thông tin user vào context
    return true;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return new CustomError(
      'Unauthorized! Token expired or invalid.',
      401,
      'UNAUTHORIZED'
    );
  }
});

// Shield: Áp dụng rule
export const permissions = shield(
  {
    Query: {
      '*': isAuthenticated, // Tất cả Query trong userResolver cần xác thực
      // users: true,
    },
    Mutation: {
      '*': isAuthenticated, // Tất cả Mutation trong userResolver cần xác thực
      login: true, // Auth resolver không cần xác thực
    },
  },
  {
    allowExternalErrors: true, // Cho phép lỗi gốc được trả về
  }
);
