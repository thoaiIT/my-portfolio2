import { FOLDER } from '../constants/store.js';
import removeFileMiddleware from '../middlewares/removeFile.js';
import uploadMiddleware from '../middlewares/upload.js';
import socialRepository from '../repositories/socialRepository.js';
import { CustomError } from '../utils/customError.js';

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
    const iconUrl = await uploadMiddleware(socialData.icon, FOLDER.ICON);
    return await socialRepository.create({ ...socialData, icon: iconUrl });
  },
  updateSocial: async (id, socialData) => {
    const { platform, url, icon } = socialData;

    const social = await socialSercive.getSocialById(id);
    if (!social) {
      throw new CustomError('Social not found', 404);
    }

    let newIconUrl = social.icon;

    if (typeof icon === 'object') {
      newIconUrl = await uploadMiddleware(icon, FOLDER.ICON);
      if (social.icon && newIconUrl !== social.icon) {
        removeFileMiddleware(social.icon);
      }
    }

    social.platform = platform || social.platform;
    social.url = url || social.url;
    social.icon = newIconUrl;

    return await socialRepository.update(id, social);
  },
  deleteSocial: async (id) => {
    const social = await socialSercive.getSocialById(id);
    if (!social) {
      throw new CustomError('Social not found', 404);
    }

    const iconUrl = social.icon;

    if (iconUrl) {
      removeFileMiddleware(iconUrl);
    }
    return await socialRepository.delete(id);
  },
};

export default socialSercive;
