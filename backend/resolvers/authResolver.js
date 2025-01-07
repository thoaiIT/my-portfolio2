import userService from '../service/userService.js';

const authResolver = {
  Mutation: {
    login: async (_, { email, password }) => {
      // Đăng nhập người dùng (không cần xác thực)
      return await userService.loginUser({ email, password });
    },
  },
};

export default authResolver;
