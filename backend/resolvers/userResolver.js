import userService from '../service/userService.js';

const userResolver = {
  Query: {
    users: async () => {
      // Lấy danh sách người dùng (yêu cầu xác thực từ Shield)
      return await userService.getUsers();
    },
    user: async (_, { id }) => {
      // Lấy thông tin người dùng theo ID (yêu cầu xác thực từ Shield)
      return await userService.getUserById(id);
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      // Tạo người dùng mới (không cần xác thực)
      return await userService.createUser({ name, email, password });
    },
  },
};

export default userResolver;
