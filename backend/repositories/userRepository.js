import User from '../models/User.js';

const userRepository = {
  findAll: async () => await User.find(),
  findById: async (id) => await User.findById(id),
  findByEmail: async (email) => await User.findOne({ email }),
  create: async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
  },
};

export default userRepository;
