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
      return await skillSercive.createSkill({
        name,
        icon,
        level,
        description,
      });
    },
    updateSkill: async (_, skillData) => {
      return await skillSercive.updateSkill(skillData.id, skillData);
    },
    deleteSkill: async (_, { id }) => {
      return await skillSercive.deleteSkill(id);
    },
  },
};
export default skillResolver;
