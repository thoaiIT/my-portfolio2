import userRepository from '../repositories/userRepository.js';
import generateToken from '../utils/generateToken.js';
import { CustomError } from '../utils/customError.js';

const userService = {
  getUsers: async () => await userRepository.findAll(),
  getUserById: async (id) => await userRepository.findById(id),
  getUserByEmail: async (email) => await userRepository.findByEmail(email),
  createUser: async (userData) => {
    const exUser = await userRepository.findByEmail(userData.email);

    if (exUser) {
      throw new CustomError('User already exists!', 400);
    }

    return await userRepository.create(userData);
  },
  loginUser: async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError('Invalid user!', 404);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new CustomError('Wrong password', 500);
    }

    const token = generateToken(user);

    return { user, token };
  },
};

export default userService;
