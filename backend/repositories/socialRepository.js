import Social from './../models/Social.js';

const socialRepository = {
  findAll: async () => await Social.find(),
  findById: async (id) => await Social.findById(id),
  findByName: async (platform) => await Social.findOne({ platform }),
  create: async (data) => {
    const social = new Social(data);
    await social.save();
    return social;
  },
  update: async (id, data) => {
    const updatedSocial = await Social.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return updatedSocial;
  },
  delete: async (id) => {
    const deletedSocial = await Social.findByIdAndDelete(id);
    return deletedSocial;
  },
};

export default socialRepository;
