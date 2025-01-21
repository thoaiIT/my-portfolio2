import uploadMiddleware from '../middlewares/upload.js';
import skillSercive from '../service/skillService.js';
import { CustomError } from '../utils/customError.js';
import removeFileMiddleware from '../middlewares/removeFile.js';

const skillResolver = {
  Query: {
    skills: async () => {
      return await skillSercive.getSkills();
    },
    skill: async (_, { id }) => {
      return await skillSercive.getSkillById(id);
    },
    skillByName: async (_, { name }) => {
      return await skillSercive.getSkillByName(name);
    },
  },
  Mutation: {
    createSkill: async (_, { name, icon, level, description }) => {
      const iconUrl = await uploadMiddleware(icon, 'uploads/icons');
      return await skillSercive.createSkill({
        name,
        icon: iconUrl,
        level,
        description,
      });
    },
    updateSkill: async (_, { id, name, icon, level, description }) => {
      const skill = await skillSercive.getSkillById(id);
      if (!skill) {
        throw new CustomError('Skill not found', 404);
      }
      let newIconUrl = skill.icon;

      if (typeof icon === 'object') {
        // Upload icon mới và lấy đường dẫn URL
        newIconUrl = await uploadMiddleware(icon, 'uploads/icons');
        // Xóa icon cũ nếu tồn tại
        if (skill.icon && newIconUrl !== skill.icon) {
          removeFileMiddleware(skill.icon);
        }
      }

      skill.name = name || skill.name;
      skill.description = description || skill.description;
      skill.level = level || skill.level;
      skill.icon = newIconUrl;
      return await skillSercive.updateSkill(id, {
        ...skill,
      });
    },
    deleteSkill: async (_, { id }) => {
      const skill = await skillSercive.getSkillById(id);
      if (!skill) {
        throw new CustomError('Skill not found', 404);
      }

      const iconUrl = skill.icon;

      if (iconUrl) {
        removeFileMiddleware(iconUrl);
      }

      return await skillSercive.deleteSkill(id);
    },
  },
};
export default skillResolver;
