import skillSercive from '../service/skillService.js';

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
      return await skillSercive.createSkill({ name, icon, level, description });
    },
    updateSkill: async (_, { id, name, icon, level, description }) => {
      return await skillSercive.updateSkill(id, {
        name,
        icon,
        level,
        description,
      });
    },
    deleteSkill: async (_, { id }) => {
      return await skillSercive.deleteSkill(id);
    },
  },
};
export default skillResolver;
