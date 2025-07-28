import { FOLDER } from '../constants/store.js';
import removeFileMiddleware from '../middlewares/removeFile.js';
import uploadMiddleware from '../middlewares/upload.js';
import skillRepository from '../repositories/skillRepository.js';
import { CustomError } from '../utils/customError.js';

const skillSercive = {
  getSkills: async () => {
    return await skillRepository.findAll();
  },
  getSkillById: async (id) => {
    return await skillRepository.findById(id);
  },
  getSkillByName: async (name) => {
    return await skillRepository.findByName(name);
  },
  createSkill: async (skillData) => {
    const iconUrl = await uploadMiddleware(skillData.icon, FOLDER.ICON);

    return await skillRepository.create({ ...skillData, icon: iconUrl });
  },
  updateSkill: async (id, skillData) => {
    const { name, description, level, icon } = skillData;
    const skill = await skillSercive.getSkillById(id);
    if (!skill) {
      throw new CustomError('Skill not found', 404);
    }
    let newIconUrl = skill.icon;

    if (typeof icon === 'object') {
      newIconUrl = await uploadMiddleware(icon, FOLDER.ICON);
      if (skill.icon && newIconUrl !== skill.icon) {
        removeFileMiddleware(skill.icon);
      }
    }

    skill.name = name || skill.name;
    skill.description = description || skill.description;
    skill.level = level || skill.level;
    skill.icon = newIconUrl;
    return await skillRepository.update(id, skill);
  },
  deleteSkill: async (id) => {
    const skill = await skillSercive.getSkillById(id);
    if (!skill) {
      throw new CustomError('Skill not found', 404);
    }

    const iconUrl = skill.icon;

    if (iconUrl) {
      removeFileMiddleware(iconUrl);
    }
    return await skillRepository.delete(id);
  },
};

export default skillSercive;
