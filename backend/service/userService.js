import userRepository from '../repositories/userRepository.js';
import generateToken from '../utils/generateToken.js';
import { CustomError } from '../utils/customError.js';

const userService = {
  getUsers: async () => await userRepository.findAll(),
  getUserById: async (id) => await userRepository.findById(id),
  getUserByEmail: async (email) => await userRepository.findByEmail(email),
  createUser: async (userData) => await userRepository.create(userData),
  loginUser: async ({ email, password }) => {
    console.log('loginnnnnnnn');
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError('Invalid user!', 404);
    }

    const isMatch = user.comparePassword(password);

    if (!isMatch) {
      throw new CustomError('Wrong password', 500);
    }

    const token = generateToken(user);

    return { user, token };
  },
};

export default userService;
