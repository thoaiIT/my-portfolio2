import uploadMiddleware from '../middlewares/upload.js';
import socialRepository from '../repositories/socialRepository.js';

const socialSercive = {
  getSocials: async () => {
    return await socialRepository.findAll();
  },
  getSocialById: async (id) => {
    return await socialRepository.findById(id);
  },
  getSocialByName: async (name) => {
    return await socialRepository.findByName(name);
  },
  createSocial: async (socialData) => {
    const iconUrl = await uploadMiddleware(socialData.icon, 'uploads/icons');
    return await socialRepository.create({ ...socialData, icon: iconUrl });
  },
  updateSocial: async (id, socialData) => {
    return await socialRepository.update(id, socialData);
  },
  deleteSocial: async (id) => {
    return await socialRepository.delete(id);
  },
};

export default socialSercive;
